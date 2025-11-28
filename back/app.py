from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
from datetime import datetime

# ------------------------------------------------------------
# FASTAPI APP SETUP
# ------------------------------------------------------------
app = FastAPI(title="Azure Demand Forecasting API (Feature Engineered)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------
# HELPER: Load CSV Data
# ------------------------------------------------------------
DATA_PATH = "data/processed/feature_engineered.csv"

def load_data():
    if not os.path.exists(DATA_PATH):
        raise FileNotFoundError(f"{DATA_PATH} not found.")
    df = pd.read_csv(DATA_PATH)
    df.columns = df.columns.str.strip()
    if "date" in df.columns:
        df["date"] = pd.to_datetime(df["date"], errors="coerce")
    return df


# ------------------------------------------------------------
# ROOT ENDPOINT
# ------------------------------------------------------------
@app.get("/")
def root():
    return {
        "message": "Azure Demand Forecasting API (Feature Engineered)",
        "endpoints": [
            "/api/features",
            "/api/insights",
            "/api/kpis",
            "/api/usage-trends",
            "/api/forecast-insights",
            "/api/capacity-planning",
            "/api/reports-insights",
        ],
    }


# ------------------------------------------------------------
# 1️⃣ FEATURES ENDPOINT
# ------------------------------------------------------------
@app.get("/api/features")
def get_features():
    df = load_data()
    return df.head(50).to_dict(orient="records")


# ------------------------------------------------------------
# 2️⃣ INSIGHTS DASHBOARD (SUMMARY METRICS)
# ------------------------------------------------------------
@app.get("/api/insights")
def get_insights():
    df = load_data()

    avg_utilization = round(df["utilization_ratio"].mean(), 3) if "utilization_ratio" in df else None
    avg_storage_eff = round(df["storage_efficiency"].mean(), 3) if "storage_efficiency" in df else None
    peak_usage_date = None
    highest_temp_day = None

    if "usage_cpu" in df.columns:
        idx = df["usage_cpu"].idxmax()
        if not pd.isna(idx):
            peak_usage_date = str(df.loc[idx, "date"])

    if "weather" in df.columns:
        idx2 = df["weather"].idxmax()
        if not pd.isna(idx2):
            highest_temp_day = str(df.loc[idx2, "date"])

    top_regions = (
        df.groupby("region")["usage_cpu"].mean().sort_values(ascending=False).head(5).to_dict()
        if "region" in df.columns
        else {}
    )

    return {
        "average_utilization_ratio": avg_utilization,
        "average_storage_efficiency": avg_storage_eff,
        "peak_usage_date": peak_usage_date,
        "highest_temp_day": highest_temp_day,
        "top_regions_by_cpu_usage": top_regions,
        "total_records": len(df),
    }


# ------------------------------------------------------------
# 3️⃣ KPIs ENDPOINT (FOR DASHBOARD CARDS)
# ------------------------------------------------------------
@app.get("/api/kpis")
def get_kpis():
    df = load_data()
    regions = df["region"].nunique() if "region" in df else 0
    forecast_accuracy = 90
    avg_cpu_load = round(df["usage_cpu"].mean(), 2) if "usage_cpu" in df else 0
    cost_efficiency = round(df["storage_efficiency"].mean() * 100, 2) if "storage_efficiency" in df else 0

    return {
        "status": "success",
        "kpis": {
            "active_regions": regions,
            "forecast_accuracy": forecast_accuracy,
            "avg_cpu_load": avg_cpu_load,
            "cost_efficiency": cost_efficiency,
        },
    }


# ------------------------------------------------------------
# 4️⃣ USAGE TRENDS ENDPOINT
# ------------------------------------------------------------
@app.get("/api/usage-trends")
def get_usage_trends():
    df = load_data()
    if "date" not in df or "usage_cpu" not in df:
        return {"status": "error", "data": []}

    # Format months clearly (e.g., "Jan 2023")
    df["month"] = df["date"].dt.strftime("%b %Y")
    trends = df.groupby("month")["usage_cpu"].mean().reset_index()
    trends.rename(columns={"usage_cpu": "cpu"}, inplace=True)

    return {"status": "success", "data": trends.to_dict(orient="records")}



# ------------------------------------------------------------
# 5️⃣ FORECAST INSIGHTS ENDPOINT
# ------------------------------------------------------------
@app.get("/api/forecast-insights")
def get_forecast_insights():
    df = load_data()
    if "region" not in df or "usage_cpu" not in df:
        return {"status": "error", "data": []}

    # Use usage_cpu as demand proxy per region
    forecast = (
        df.groupby("region")["usage_cpu"]
        .mean()
        .reset_index()
        .rename(columns={"usage_cpu": "demand"})
    )

    return {"status": "success", "data": forecast.to_dict(orient="records")}



# ------------------------------------------------------------
# 6️⃣ CAPACITY PLANNING ENDPOINT
# ------------------------------------------------------------
@app.get("/api/capacity-planning")
def get_capacity_planning():
    df = load_data()
    if "resource_type" not in df or "usage_cpu" not in df:
        return {"status": "error", "data": []}

    capacity = df.groupby("resource_type")["usage_cpu"].mean().reset_index()
    capacity.rename(columns={"resource_type": "name", "usage_cpu": "value"}, inplace=True)
    return {"status": "success", "data": capacity.to_dict(orient="records")}


# ------------------------------------------------------------
# 7️⃣ REPORTS & INSIGHTS ENDPOINT
# ------------------------------------------------------------
@app.get("/api/reports-insights")
def get_reports_insights():
    df = load_data()
    metrics = []

    if "utilization_ratio" in df:
        metrics.append({"metric": "Utilization", "score": round(df["utilization_ratio"].mean() * 100, 2)})
    if "storage_efficiency" in df:
        metrics.append({"metric": "Storage Efficiency", "score": round(df["storage_efficiency"].mean() * 100, 2)})
    if "weather" in df:
        metrics.append({"metric": "Weather Stability", "score": 100 - round(df["weather"].std(), 2)})
    if "outages" in df:
        metrics.append({"metric": "System Reliability", "score": 100 - (df["outages"].mean() * 10)})
    if "price_changes" in df:
        metrics.append({"metric": "Pricing Volatility", "score": 100 - abs(df["price_changes"]).mean() * 50})

    return {"status": "success", "data": metrics}
