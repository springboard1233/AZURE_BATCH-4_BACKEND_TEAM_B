from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import os

# ------------------------------------------------------------
# FastAPI Application Setup
# ------------------------------------------------------------
app = FastAPI(title="Azure Demand Forecasting - Feature Engineered API")

# Enable CORS (to allow frontend access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------
# 1️⃣ Generate Dummy Raw Data
# ------------------------------------------------------------
def generate_dummy_data():
    start_date = datetime(2024, 1, 1)
    days = 180  # 6 months of data
    regions = ["East", "West", "North", "South"]

    data = []
    for i in range(days):
        date = start_date + timedelta(days=i)
        for region in regions:
            cpu_total = 100
            cpu_used = random.uniform(30, 100)
            storage_alloc = random.uniform(500, 1000)
            storage_used = random.uniform(100, storage_alloc)
            weather_temp = random.uniform(10, 40)
            power_outage = random.choice([0, 0, 0, 1])  # rare outages
            price_factor = random.uniform(0.8, 1.2)

            data.append({
                "date": date,
                "region": region,
                "cpu_used": round(cpu_used, 2),
                "cpu_total": cpu_total,
                "storage_used": round(storage_used, 2),
                "storage_allocated": round(storage_alloc, 2),
                "weather_temp": round(weather_temp, 2),
                "power_outage": power_outage,
                "price_factor": round(price_factor, 2)
            })

    df = pd.DataFrame(data)
    return df

# ------------------------------------------------------------
# 2️⃣ Feature Engineering
# ------------------------------------------------------------
def feature_engineering(df):
    # --- Time-based features ---
    df['day_of_week'] = df['date'].dt.dayofweek
    df['month'] = df['date'].dt.month
    df['quarter'] = df['date'].dt.quarter
    df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)

    # --- Derived metrics ---
    df['utilization_ratio'] = df['cpu_used'] / df['cpu_total']
    df['storage_efficiency'] = df['storage_used'] / df['storage_allocated']

    # --- Lag and Rolling features ---
    df = df.sort_values(['region', 'date'])
    df['cpu_usage'] = df['cpu_used']

    for lag in [1, 3, 7]:
        df[f'cpu_lag_{lag}'] = df.groupby('region')['cpu_usage'].shift(lag)

    for window in [7, 30]:
        df[f'cpu_roll_mean_{window}'] = df.groupby('region')['cpu_usage'].transform(lambda x: x.rolling(window).mean())
        df[f'cpu_roll_max_{window}'] = df.groupby('region')['cpu_usage'].transform(lambda x: x.rolling(window).max())
        df[f'cpu_roll_min_{window}'] = df.groupby('region')['cpu_usage'].transform(lambda x: x.rolling(window).min())

    df.dropna(inplace=True)
    return df

# ------------------------------------------------------------
# 3️⃣ Save Processed Dataset
# ------------------------------------------------------------
def save_processed_data(df):
    os.makedirs("data/processed", exist_ok=True)
    path = "data/processed/feature_engineered.csv"
    df.to_csv(path, index=False)
    return path

# ------------------------------------------------------------
# 4️⃣ /api/features Endpoint - Return Feature Engineered Data
# ------------------------------------------------------------
@app.get("/api/features")
def get_features():
    raw_df = generate_dummy_data()
    processed_df = feature_engineering(raw_df)
    save_processed_data(processed_df)
    return processed_df.head(15).to_dict(orient="records")

# ------------------------------------------------------------
# 5️⃣ /api/insights Endpoint - Return Summary Insights
# ------------------------------------------------------------
@app.get("/api/insights")
def get_insights():
    path = "data/processed/feature_engineered.csv"
    if not os.path.exists(path):
        raw_df = generate_dummy_data()
        processed_df = feature_engineering(raw_df)
        save_processed_data(processed_df)
    else:
        processed_df = pd.read_csv(path)

    insights = {
        "top_regions_by_cpu_usage": processed_df.groupby("region")["cpu_used"].mean().sort_values(ascending=False).head(3).to_dict(),
        "peak_usage_date": str(processed_df.loc[processed_df['cpu_used'].idxmax(), 'date']),
        "average_utilization_ratio": round(processed_df['utilization_ratio'].mean(), 3),
        "average_storage_efficiency": round(processed_df['storage_efficiency'].mean(), 3),
        "highest_temp_day": str(processed_df.loc[processed_df['weather_temp'].idxmax(), 'date']),
        "total_records": len(processed_df)
    }

    return insights

# ------------------------------------------------------------
# 6️⃣ Root Endpoint - Welcome Message
# ------------------------------------------------------------
@app.get("/")
def home():
    return {
        "message": "Azure Demand Forecasting API",
        "endpoints": ["/api/features", "/api/insights"]
    }
