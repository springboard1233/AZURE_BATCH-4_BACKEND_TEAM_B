from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta, date as date_type

import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from sklearn.metrics import mean_absolute_error, mean_squared_error

# If not installed: pip install xgboost fastapi uvicorn scikit-learn pandas numpy
from xgboost import XGBRegressor


DATA_PATH = "feature_engineered.csv"
TARGET_COL = "usage_cpu"

# ---------------------------
# Utility & data preparation
# ---------------------------

def load_and_prepare_data(path: str) -> pd.DataFrame:
    df = pd.read_csv(path)

    # Parse date (adjust format if needed)
    df["date"] = pd.to_datetime(df["date"], format="%d-%m-%Y", errors="coerce")
    if df["date"].isna().any():
        raise ValueError("Some dates could not be parsed. Check the date format in CSV.")

    df = df.sort_values("date").reset_index(drop=True)

    # One-hot encode categorical columns
    cat_cols = []
    for col in ["region", "resource_type"]:
        if col in df.columns and df[col].dtype == "object":
            cat_cols.append(col)

    if cat_cols:
        df = pd.get_dummies(df, columns=cat_cols, drop_first=True)

    return df


def time_based_split(df: pd.DataFrame, train_frac: float = 0.7, val_frac: float = 0.2):
    """Split using time order based on 'date' column."""
    if "date" not in df.columns:
        raise ValueError("'date' column missing after preparation.")

    df = df.sort_values("date").reset_index(drop=True)
    n = len(df)
    train_end = int(n * train_frac)
    val_end = int(n * (train_frac + val_frac))

    train = df.iloc[:train_end]
    val = df.iloc[train_end:val_end]
    test = df.iloc[val_end:]

    return train, val, test


def build_feature_target(df: pd.DataFrame, target_col: str):
    if target_col not in df.columns:
        raise ValueError(f"Target column '{target_col}' not found in data.")

    # Drop non-feature columns
    drop_cols = ["date"]  # we keep region/resource_type via one-hot encoding already applied
    for c in drop_cols:
        if c not in df.columns:
            # ignore silently
            pass

    feature_cols = [c for c in df.columns if c not in drop_cols + [target_col]]

    X = df[feature_cols].astype(float)
    y = df[target_col].astype(float)

    return X, y, feature_cols


def compute_metrics(y_true: np.ndarray, y_pred: np.ndarray) -> Dict[str, float]:
    mae = mean_absolute_error(y_true, y_pred)

    # Manual RMSE calculation (works on all sklearn versions)
    rmse = mean_squared_error(y_true, y_pred) ** 0.5

    # Avoid division by zero in MAPE
    non_zero_mask = y_true != 0
    if non_zero_mask.sum() == 0:
        mape = float("nan")
    else:
        mape = np.mean(np.abs((y_true[non_zero_mask] - y_pred[non_zero_mask]) / y_true[non_zero_mask])) * 100.0

    # Forecast bias
    bias = float(np.mean(y_pred - y_true))

    return {
        "MAE": float(mae),
        "RMSE": float(rmse),
        "MAPE": float(mape),
        "Bias": bias,
    }



# ---------------------------
# Training models at startup
# ---------------------------

class ModelRegistry:
    def __init__(self):
        self.feature_cols: List[str] = []
        self.xgb_model: Optional[XGBRegressor] = None
        self.metrics: Dict[str, Dict[str, float]] = {}
        self.backtest_results: List[Dict[str, Any]] = []
        self.raw_df: Optional[pd.DataFrame] = None
        self.prepared_df: Optional[pd.DataFrame] = None

    def train_all(self, csv_path: str):
        self.raw_df = load_and_prepare_data(csv_path)
        df = self.raw_df.copy()

        # Step 1: time-based split
        train_df, val_df, test_df = time_based_split(df)

        X_train, y_train, feature_cols = build_feature_target(train_df, TARGET_COL)
        X_val, y_val, _ = build_feature_target(val_df, TARGET_COL)
        X_test, y_test, _ = build_feature_target(test_df, TARGET_COL)

        self.feature_cols = feature_cols

        # Step 2: Model – XGBoost (as ML model)
        xgb = XGBRegressor(
            n_estimators=300,
            max_depth=5,
            learning_rate=0.05,
            subsample=0.8,
            colsample_bytree=0.8,
            objective="reg:squarederror",
            random_state=42,
        )
        xgb.fit(
            pd.concat([X_train, X_val], axis=0),
            pd.concat([y_train, y_val], axis=0),
        )
        self.xgb_model = xgb

        # Step 3: Evaluation on test set
        xgb_pred = xgb.predict(X_test)
        xgb_metrics = compute_metrics(y_test.values, xgb_pred)
        self.metrics["XGBoost"] = xgb_metrics

        # Baseline model → last value (classical style)
        last_train_val_value = float(pd.concat([y_train, y_val]).iloc[-1])
        naive_pred = np.full_like(y_test.values, fill_value=last_train_val_value, dtype=float)
        naive_metrics = compute_metrics(y_test.values, naive_pred)
        self.metrics["NaiveLastValue"] = naive_metrics

        # Step 4: Backtesting (rolling origin) for XGBoost
        self.backtest_results = self._rolling_backtest(df)

        self.prepared_df = df

    def _rolling_backtest(self, df: pd.DataFrame, train_min_days: int = 90, horizon_days: int = 30):
        df = df.sort_values("date").reset_index(drop=True)
        results = []
        dates = df["date"].unique()
        if len(dates) < train_min_days + horizon_days:
            return results  # not enough data for backtesting

        start_idx = train_min_days
        while start_idx + horizon_days < len(dates):
            train_end_date = dates[start_idx - 1]
            test_end_date = dates[start_idx + horizon_days - 1]

            train_mask = df["date"] <= train_end_date
            test_mask = (df["date"] > train_end_date) & (df["date"] <= test_end_date)

            train_df = df.loc[train_mask]
            test_df = df.loc[test_mask]
            if len(test_df) == 0:
                break

            X_train, y_train, feature_cols = build_feature_target(train_df, TARGET_COL)
            X_test, y_test, _ = build_feature_target(test_df, TARGET_COL)

            model = XGBRegressor(
                n_estimators=200,
                max_depth=4,
                learning_rate=0.05,
                subsample=0.8,
                colsample_bytree=0.8,
                objective="reg:squarederror",
                random_state=42,
            )
            model.fit(X_train, y_train)
            preds = model.predict(X_test)
            metrics = compute_metrics(y_test.values, preds)

            results.append(
                {
                    "train_end": train_end_date.date().isoformat(),
                    "test_start": test_df["date"].min().date().isoformat(),
                    "test_end": test_df["date"].max().date().isoformat(),
                    "metrics": metrics,
                }
            )

            # Move origin forward by horizon_days
            start_idx += horizon_days

        return results

    # -------- Forecasting for Step 6 --------
    def forecast_next_30_days(self, region: str, resource_type: str) -> pd.DataFrame:
        if self.prepared_df is None or self.xgb_model is None:
            raise RuntimeError("Models not trained yet.")

        df = self.prepared_df.copy()
        df = df.sort_values("date").reset_index(drop=True)
        last_row = df.iloc[-1].copy()
        last_date = last_row["date"]

        # NOTE: This simple example ignores the region/resource_type filter for the model.
        # For a project report, you can mention that this can be extended to
        # train per-(region, resource_type) models or filter raw data before training.

        future_rows = []
        for i in range(1, 31):
            new_row = last_row.copy()
            new_date = last_date + timedelta(days=i)
            new_row["date"] = new_date

            # Update simple calendar features if they exist
            if "day_of_week" in new_row.index:
                new_row["day_of_week"] = new_date.weekday()  # Monday=0
            if "month" in new_row.index:
                new_row["month"] = new_date.month
            if "year" in new_row.index:
                new_row["year"] = new_date.year
            if "quarter" in new_row.index:
                new_row["quarter"] = (new_date.month - 1) // 3 + 1
            if "is_weekend" in new_row.index:
                new_row["is_weekend"] = 1 if new_date.weekday() >= 5 else 0
            if "holiday" in new_row.index:
                # Simple assumption: set to 0 for future dates
                new_row["holiday"] = 0

            # For lag/rolling features we keep last known values.
            # (In a more advanced version you would recompute using recursive forecasts.)
            future_rows.append(new_row)

        future_df = pd.DataFrame(future_rows)

        # Make sure feature columns align with model
        feature_cols = self.feature_cols
        for col in feature_cols:
            if col not in future_df.columns:
                future_df[col] = 0.0
        X_future = future_df[feature_cols].astype(float)

        preds = self.xgb_model.predict(X_future)
        future_df[TARGET_COL] = preds

        return future_df[["date", TARGET_COL]]


# ---------------------------
# FastAPI Schemas & App
# ---------------------------

class ForecastItem(BaseModel):
    date: date_type
    predicted_usage_cpu: float


class ForecastResponse(BaseModel):
    region: str
    resource_type: str
    horizon_days: int
    forecasts: List[ForecastItem]


class ModelMetric(BaseModel):
    model_name: str
    MAE: float
    RMSE: float
    MAPE: float
    Bias: float


class ModelMetricsResponse(BaseModel):
    metrics: List[ModelMetric]


class BacktestWindow(BaseModel):
    train_end: str
    test_start: str
    test_end: str
    MAE: float
    RMSE: float
    MAPE: float
    Bias: float


class ModelComparisonRow(BaseModel):
    model_name: str
    MAE: float
    RMSE: float
    MAPE: float


class ModelComparisonResponse(BaseModel):
    comparison: List[ModelComparisonRow]


app = FastAPI(title="Cloud Demand Forecasting API")

registry = ModelRegistry()


@app.on_event("startup")
def startup_event():
    try:
        registry.train_all(DATA_PATH)
        print("Models trained successfully.")
    except Exception as e:
        print(f"Error training models at startup: {e}")


# Step 6: REST endpoints

@app.get("/api/forecast/{region}/{resource_type}", response_model=ForecastResponse)
def get_forecast(region: str, resource_type: str):
    try:
        future_df = registry.forecast_next_30_days(region, resource_type)
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating forecast: {e}")

    items = [
        ForecastItem(
            date=row["date"].date(),
            predicted_usage_cpu=float(row[TARGET_COL]),
        )
        for _, row in future_df.iterrows()
    ]

    return ForecastResponse(
        region=region,
        resource_type=resource_type,
        horizon_days=len(items),
        forecasts=items,
    )


@app.get("/api/model-metrics", response_model=ModelMetricsResponse)
def get_model_metrics():
    if not registry.metrics:
        raise HTTPException(status_code=500, detail="Models not trained or metrics unavailable.")

    metrics_list = [
        ModelMetric(
            model_name=name,
            MAE=vals["MAE"],
            RMSE=vals["RMSE"],
            MAPE=vals["MAPE"],
            Bias=vals["Bias"],
        )
        for name, vals in registry.metrics.items()
    ]

    return ModelMetricsResponse(metrics=metrics_list)


@app.get("/api/model-comparison", response_model=ModelComparisonResponse)
def get_model_comparison():
    if not registry.metrics:
        raise HTTPException(status_code=500, detail="Models not trained or metrics unavailable.")

    comparison_rows = [
        ModelComparisonRow(
            model_name=name,
            MAE=vals["MAE"],
            RMSE=vals["RMSE"],
            MAPE=vals["MAPE"],
        )
        for name, vals in registry.metrics.items()
    ]

    return ModelComparisonResponse(comparison=comparison_rows)


@app.get("/")
def root():
    return {
        "message": "Cloud Demand Forecasting API is running.",
        "endpoints": [
            "/api/forecast/{region}/{resource_type}",
            "/api/model-metrics",
            "/api/model-comparison",
        ],
    }
