import pandas as pd
import numpy as np
import os
from datetime import datetime

# --------------------------------------------------------------------
# 📂 File paths
# --------------------------------------------------------------------
RAW_PATH = "data/processed/cleaned_merged.csv"
PROCESSED_PATH = "data/processed/feature_engineered.csv"
os.makedirs(os.path.dirname(PROCESSED_PATH), exist_ok=True)

# --------------------------------------------------------------------
# 1️⃣ Load and Clean CSV (handles outer quotes)
# --------------------------------------------------------------------
print("📂 Loading:", RAW_PATH)

try:
    # Read file as text to remove outer quotes
    with open(RAW_PATH, "r", encoding="utf-8") as f:
        lines = f.readlines()

    # Remove surrounding quotes and whitespace
    cleaned_lines = [line.strip().strip('"') for line in lines if line.strip()]

    # Save temp cleaned version
    temp_path = "data/processed/_clean_temp.csv"
    with open(temp_path, "w", encoding="utf-8") as f:
        f.write("\n".join(cleaned_lines))

    # Read cleaned CSV normally
    df = pd.read_csv(temp_path, sep=",", engine="python")
    print(f"✅ Cleaned and loaded {len(df)} rows and {len(df.columns)} columns")

except Exception as e:
    print("❌ Failed to parse CSV:", e)
    raise

# --------------------------------------------------------------------
# 2️⃣ Basic Cleaning
# --------------------------------------------------------------------
df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]

if "date" in df.columns:
    df["date"] = pd.to_datetime(df["date"], errors="coerce")

for col in df.select_dtypes(include=[np.number]).columns:
    df[col].fillna(df[col].median(), inplace=True)

for col in df.select_dtypes(include=["object"]).columns:
    df[col].fillna("Unknown", inplace=True)

# --------------------------------------------------------------------
# 3️⃣ Time Features
# --------------------------------------------------------------------
if "date" in df.columns:
    df["day_of_week"] = df["date"].dt.dayofweek
    df["month"] = df["date"].dt.month
    df["year"] = df["date"].dt.year
    df["quarter"] = df["date"].dt.quarter
    df["is_weekend"] = df["day_of_week"].isin([5, 6]).astype(int)

# --------------------------------------------------------------------
# 4️⃣ Derived Features
# --------------------------------------------------------------------
if {"usage_cpu", "usage_storage"}.issubset(df.columns):
    df["cpu_allocation"] = np.random.randint(80, 120, len(df))
    df["storage_allocation"] = np.random.randint(1500, 2500, len(df))
    df["utilization_ratio"] = df["usage_cpu"] / df["cpu_allocation"]
    df["storage_efficiency"] = df["usage_storage"] / df["storage_allocation"]

# --------------------------------------------------------------------
# 5️⃣ Lag & Rolling Features
# --------------------------------------------------------------------
if {"region", "date"}.issubset(df.columns):
    df = df.sort_values(["region", "date"])

if "usage_cpu" in df.columns:
    for lag in [1, 3, 7]:
        df[f"usage_cpu_lag_{lag}"] = df.groupby("region")["usage_cpu"].shift(lag)

    for window in [7, 30]:
        df[f"usage_cpu_rolling_mean_{window}d"] = df.groupby("region")["usage_cpu"].transform(lambda x: x.rolling(window).mean())
        df[f"usage_cpu_rolling_max_{window}d"] = df.groupby("region")["usage_cpu"].transform(lambda x: x.rolling(window).max())
        df[f"usage_cpu_rolling_min_{window}d"] = df.groupby("region")["usage_cpu"].transform(lambda x: x.rolling(window).min())

if "usage_storage" in df.columns:
    for window in [7, 30]:
        df[f"usage_storage_rolling_mean_{window}d"] = df.groupby("region")["usage_storage"].transform(lambda x: x.rolling(window).mean())
        df[f"usage_storage_rolling_max_{window}d"] = df.groupby("region")["usage_storage"].transform(lambda x: x.rolling(window).max())
        df[f"usage_storage_rolling_min_{window}d"] = df.groupby("region")["usage_storage"].transform(lambda x: x.rolling(window).min())

df.dropna(inplace=True)
df.reset_index(drop=True, inplace=True)

# --------------------------------------------------------------------
# 6️⃣ Add Randomized Contextual Features
# --------------------------------------------------------------------
np.random.seed(42)
df["weather"] = np.random.uniform(10, 40, len(df))
df["outages"] = np.random.choice([0, 1], len(df), p=[0.9, 0.1])
df["price_changes"] = np.random.normal(0, 0.5, len(df)).round(3)

# --------------------------------------------------------------------
# 7️⃣ Save Processed File
# --------------------------------------------------------------------
df.to_csv(PROCESSED_PATH, index=False)
print(f"💾 Saved processed dataset → {PROCESSED_PATH}")
print(f"✅ Final dataset shape: {df.shape}")

import numpy as np

# Simulate daily pattern
df["date"] = pd.date_range(start="2023-01-01", periods=len(df), freq="D")

# Add variation by region
region_multiplier = {
    "East US": 1.0,
    "West US": 0.9,
    "North Europe": 1.1,
    "Southeast Asia": 1.2
}
df["usage_cpu"] = df.apply(lambda x: x["usage_cpu"] * region_multiplier.get(x["region"], 1), axis=1)

# Add random noise to cloud market demand
df["cloud_market_demand"] = df["cloud_market_demand"] * np.random.uniform(0.8, 1.2, size=len(df))
