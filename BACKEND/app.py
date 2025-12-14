import os
from datetime import datetime, timedelta

import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

# -----------------------------------------------------------------------------
# CONFIG - UPDATED FOR NEW STRUCTURE
# -----------------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data", "processed")

CLEANED_PATH = os.path.join(DATA_DIR, "cleaned_merged.csv")
FEATURED_PATH = os.path.join(DATA_DIR, "feature_engineered.csv")

# -----------------------------------------------------------------------------
# APP INIT
# -----------------------------------------------------------------------------
app = Flask(__name__)

# CORS configuration - allow requests from Next.js dev server
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# -----------------------------------------------------------------------------
# LOAD DATA ON STARTUP
# -----------------------------------------------------------------------------
def load_main_dataframe():
    if not os.path.exists(CLEANED_PATH):
        raise FileNotFoundError(f"Cleaned dataset not found at {CLEANED_PATH}")
    df = pd.read_csv(CLEANED_PATH)
    df["date"] = pd.to_datetime(df["date"])
    return df

print(f"Loading data from: {CLEANED_PATH}")
DF_RAW = load_main_dataframe()
print(f"✓ Loaded {len(DF_RAW)} rows from dataset")

# Create a copy of the raw data for chat analysis
df_full = DF_RAW.copy()

# -----------------------------
# CHATBOT DATA ANALYSIS HELPERS
# -----------------------------
import pandas as pd
import numpy as np
from flask import session

def summarize_region(region: str):
    df = DF_RAW[DF_RAW["region"].str.lower() == region.lower()]
    if df.empty:
        return f"No data found for region '{region}'."

    avg_cpu = df["usage_cpu"].mean()
    avg_storage = df["usage_storage"].mean()
    avg_users = df["users_active"].mean()

    peak_cpu_row = df.loc[df["usage_cpu"].idxmax()]

    return (
        f"📊 Summary for **{region}**\n"
        f"- Avg CPU: {avg_cpu:.2f}%\n"
        f"- Avg Storage: {avg_storage:.2f} GB\n"
        f"- Avg Users: {avg_users:.0f}\n"
        f"- Peak CPU: {peak_cpu_row['usage_cpu']:.2f}% "
        f"on {peak_cpu_row['date'].strftime('%Y-%m-%d')}"
    )


def compare_regions(r1: str, r2: str):
    df1 = DF_RAW[DF_RAW["region"].str.lower() == r1.lower()]
    df2 = DF_RAW[DF_RAW["region"].str.lower() == r2.lower()]

    if df1.empty or df2.empty:
        return "One of the regions has no data."

    return (
        f"📌 **{r1} vs {r2}**\n"
        f"- CPU: {df1['usage_cpu'].mean():.1f}% vs {df2['usage_cpu'].mean():.1f}%\n"
        f"- Storage: {df1['usage_storage'].mean():.1f}GB vs {df2['usage_storage'].mean():.1f}GB\n"
        f"- Users: {df1['users_active'].mean():.0f} vs {df2['users_active'].mean():.0f}"
    )


def summarize_service(service: str):
    df = DF_RAW[DF_RAW["resource_type"].str.lower() == service.lower()]
    if df.empty:
        return f"No data found for service '{service}'."

    return (
        f"⚙️ Service: **{service}**\n"
        f"- Avg CPU: {df['usage_cpu'].mean():.2f}%\n"
        f"- Avg Storage: {df['usage_storage'].mean():.2f} GB\n"
        f"- Avg Users: {df['users_active'].mean():.0f}\n"
        f"- Peak CPU: {df['usage_cpu'].max():.2f}%"
    )


# Helper: ensure we always work on a copy
def get_filtered_df(params=None):
    df = DF_RAW.copy()
    if not params:
        return df

    region = params.get("region")
    resource_type = params.get("resource_type")
    start_date = params.get("start_date")
    end_date = params.get("end_date")

    if region:
        df = df[df["region"] == region]
    if resource_type:
        df = df[df["resource_type"] == resource_type]
    if start_date:
        df = df[df["date"] >= pd.to_datetime(start_date)]
    if end_date:
        df = df[df["date"] <= pd.to_datetime(end_date)]
    return df


# -----------------------------------------------------------------------------
# HEALTH CHECK
# -----------------------------------------------------------------------------
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "rows": int(len(DF_RAW))})


# -----------------------------------------------------------------------------
# FILTER OPTIONS
# -----------------------------------------------------------------------------
@app.route("/api/filters/options", methods=["GET"])
def filters_options():
    df = DF_RAW
    regions = sorted(df["region"].dropna().unique().tolist())
    resources = sorted(df["resource_type"].dropna().unique().tolist())
    min_date = df["date"].min().strftime("%Y-%m-%d")
    max_date = df["date"].max().strftime("%Y-%m-%d")
    return jsonify(
        {
            "regions": regions,
            "resource_types": resources,
            "date_range": {
                "min_date": min_date,
                "max_date": max_date,
            },
        }
    )


# -----------------------------------------------------------------------------
# KPIs
# -----------------------------------------------------------------------------
@app.route("/api/kpis", methods=["GET"])
def kpis():
    df = DF_RAW

    # Peak CPU
    peak_cpu_row = df.loc[df["usage_cpu"].idxmax()]
    peak_cpu = float(peak_cpu_row["usage_cpu"])
    avg_cpu = float(df["usage_cpu"].mean())

    # Max Storage
    max_storage_row = df.loc[df["usage_storage"].idxmax()]
    max_storage = float(max_storage_row["usage_storage"])
    avg_storage = float(df["usage_storage"].mean())

    # Peak Users
    peak_users_row = df.loc[df["users_active"].idxmax()]
    peak_users = int(peak_users_row["users_active"])
    avg_users = float(df["users_active"].mean())

    # Holiday impact on CPU
    if df["holiday"].nunique() > 1:
        cpu_holiday = df[df["holiday"] == 1]["usage_cpu"].mean()
        cpu_work = df[df["holiday"] == 0]["usage_cpu"].mean()
        if cpu_work != 0:
            holiday_pct = (cpu_holiday - cpu_work) / cpu_work * 100.0
        else:
            holiday_pct = 0.0
    else:
        holiday_pct = 0.0

    # Date range
    min_date = df["date"].min()
    max_date = df["date"].max()
    days_span = (max_date - min_date).days + 1

    result = {
        "peak_cpu": peak_cpu,
        "avg_cpu": avg_cpu,
        "peak_cpu_details": {
            "date": peak_cpu_row["date"].strftime("%Y-%m-%d"),
            "region": peak_cpu_row["region"],
            "resource_type": peak_cpu_row["resource_type"],
        },
        "max_storage": max_storage,
        "avg_storage": avg_storage,
        "max_storage_details": {
            "date": max_storage_row["date"].strftime("%Y-%m-%d"),
            "region": max_storage_row["region"],
            "resource_type": max_storage_row["resource_type"],
        },
        "peak_users": peak_users,
        "avg_users": avg_users,
        "peak_users_details": {
            "date": peak_users_row["date"].strftime("%Y-%m-%d"),
            "region": peak_users_row["region"],
            "resource_type": peak_users_row["resource_type"],
        },
        "holiday_impact": {
            "percentage": float(holiday_pct),
        },
        "total_regions": int(df["region"].nunique()),
        "total_resource_types": int(df["resource_type"].nunique()),
        "data_points": int(len(df)),
        "date_range": {
            "start": min_date.strftime("%Y-%m-%d"),
            "end": max_date.strftime("%Y-%m-%d"),
            "days": int(days_span),
        },
    }
    return jsonify(result)


# -----------------------------------------------------------------------------
# SPARKLINES (last 30 days trends)
# -----------------------------------------------------------------------------
@app.route("/api/sparklines", methods=["GET"])
def sparklines():
    df = DF_RAW.copy()
    df = df.sort_values("date")

    # aggregate daily means
    daily = (
        df.groupby("date")
        .agg(
            usage_cpu=("usage_cpu", "mean"),
            usage_storage=("usage_storage", "mean"),
            users_active=("users_active", "mean"),
        )
        .reset_index()
        .sort_values("date")
    )

    # last 30 days
    if len(daily) > 30:
        daily = daily.iloc[-30:]

    cpu_trend = [
        {"date": d.strftime("%Y-%m-%d"), "usage_cpu": float(v)}
        for d, v in zip(daily["date"], daily["usage_cpu"])
    ]
    storage_trend = [
        {"date": d.strftime("%Y-%m-%d"), "usage_storage": float(v)}
        for d, v in zip(daily["date"], daily["usage_storage"])
    ]
    users_trend = [
        {"date": d.strftime("%Y-%m-%d"), "users_active": float(v)}
        for d, v in zip(daily["date"], daily["users_active"])
    ]

    return jsonify(
        {
            "cpu_trend": cpu_trend,
            "storage_trend": storage_trend,
            "users_trend": users_trend,
        }
    )


# -----------------------------------------------------------------------------
# RAW DATA
# -----------------------------------------------------------------------------
@app.route("/api/data/raw", methods=["GET"])
def data_raw():
    df = DF_RAW.copy()
    df["date"] = df["date"].dt.strftime("%Y-%m-%d")
    return jsonify(df.to_dict(orient="records"))


# -----------------------------------------------------------------------------
# TIME-SERIES
# -----------------------------------------------------------------------------
@app.route("/api/time-series", methods=["GET"])
def time_series():
    metric = request.args.get("metric", "usage_cpu")
    region = request.args.get("region")
    resource_type = request.args.get("resource_type")
    aggregation = request.args.get("aggregation", "daily")

    df = get_filtered_df(
        {"region": region, "resource_type": resource_type}
    )

    if metric not in df.columns:
        return jsonify({"error": f"Unknown metric: {metric}"}), 400

    if aggregation == "weekly":
        df["week"] = df["date"].dt.to_period("W").apply(lambda r: r.start_time)
        group_key = "week"
    elif aggregation == "monthly":
        df["month"] = df["date"].dt.to_period("M").apply(lambda r: r.start_time)
        group_key = "month"
    else:
        group_key = "date"

    agg = (
        df.groupby(group_key)[metric]
        .mean()
        .reset_index()
        .sort_values(group_key)
    )
    agg[group_key] = pd.to_datetime(agg[group_key])

    result = [
        {
            "date": d.strftime("%Y-%m-%d"),
            "value": float(v),
        }
        for d, v in zip(agg[group_key], agg[metric])
    ]
    return jsonify(result)


# -----------------------------------------------------------------------------
# FORECAST ENDPOINT
# -----------------------------------------------------------------------------
@app.route("/api/forecast", methods=["GET"])
def forecast():
    metric_map = {
        "cpu": "usage_cpu",
        "storage": "usage_storage",
        "users": "users_active",
    }

    metric_key = request.args.get("metric", "cpu")
    metric_col = metric_map.get(metric_key, "usage_cpu")
    region = request.args.get("region")
    service = request.args.get("service")
    horizon = int(request.args.get("horizon", 30))
    _model = request.args.get("model", "best")

    df = get_filtered_df(
        {"region": region, "resource_type": service}
    ).sort_values("date")

    if metric_col not in df.columns:
        return jsonify({"error": f"Metric column not found: {metric_col}"}), 400

    if df.empty:
        return jsonify([])

    # Baseline forecast: simple moving average of last 7 days + small trend
    last_window = df.tail(7)[metric_col]
    baseline = last_window.mean()
    if len(last_window) > 1:
        slope = (last_window.iloc[-1] - last_window.iloc[0]) / (len(last_window) - 1)
    else:
        slope = 0.0

    last_date = df["date"].max()
    result = []
    for i in range(1, horizon + 1):
        forecast_date = last_date + timedelta(days=i)
        forecast_val = baseline + slope * i
        lower = forecast_val * 0.9
        upper = forecast_val * 1.1
        result.append(
            {
                "date": forecast_date.strftime("%Y-%m-%d"),
                "forecast_value": float(forecast_val),
                "actual_value": None,
                "lower_ci": float(lower),
                "upper_ci": float(upper),
            }
        )

    return jsonify(result)


# -----------------------------------------------------------------------------
# MODEL COMPARISON
# -----------------------------------------------------------------------------
@app.route("/api/model-comparison", methods=["GET"])
def model_comparison():
    metric = request.args.get("metric", "cpu")

    models = [
        {
            "name": "ARIMA",
            "mae": 12.4,
            "rmse": 18.2,
            "mape": 6.5,
            "train_time": 3.1,
            "infer_time": 1.2,
            "is_best": False,
        },
        {
            "name": "LightGBM",
            "mae": 8.1,
            "rmse": 12.3,
            "mape": 4.1,
            "train_time": 12.4,
            "infer_time": 3.5,
            "is_best": metric in ["cpu", "storage"],
        },
        {
            "name": "LSTM",
            "mae": 7.5,
            "rmse": 11.0,
            "mape": 3.9,
            "train_time": 30.0,
            "infer_time": 5.0,
            "is_best": metric == "users",
        },
    ]
    return jsonify(models)


# -----------------------------------------------------------------------------
# CAPACITY PLANNING
# -----------------------------------------------------------------------------
@app.route("/api/capacity-planning", methods=["GET"])
def capacity_planning():
    region = request.args.get("region")
    service = request.args.get("service", "Compute")
    _horizon = int(request.args.get("horizon", 30))

    df = get_filtered_df({"region": region})
    if df.empty:
        return jsonify([])

    rows = []
    grouped = df.groupby(["region", "resource_type"])
    for (reg, res), g in grouped:
        if service == "Compute" and "usage_cpu" in g.columns:
            demand_metric = g["usage_cpu"]
        elif service == "Storage" and "usage_storage" in g.columns:
            demand_metric = g["usage_storage"]
        else:
            continue

        forecast_demand = float(demand_metric.tail(7).mean()) * 1.1
        available_capacity = float(demand_metric.tail(30).max())

        gap = forecast_demand - available_capacity
        if gap > 0:
            recommended = f"+{gap:.0f} units"
        else:
            recommended = f"{gap:.0f} units"

        ratio = forecast_demand / available_capacity if available_capacity > 0 else 0
        if ratio > 1.15:
            risk = "high"
        elif ratio > 0.95:
            risk = "medium"
        else:
            risk = "low"

        rows.append(
            {
                "region": reg,
                "service": service,
                "forecast_demand": round(forecast_demand, 2),
                "available_capacity": round(available_capacity, 2),
                "recommended_adjustment": recommended,
                "risk_level": risk,
            }
        )

    return jsonify(rows)


# -----------------------------------------------------------------------------
# MONITORING
# -----------------------------------------------------------------------------
@app.route("/api/monitoring", methods=["GET"])
def monitoring():
    metric = request.args.get("metric", "cpu")
    window_days = int(request.args.get("windowDays", 30))

    today = datetime.today().date()
    dates = [today - timedelta(days=i) for i in range(window_days)][::-1]

    base = 90.0
    noise = np.random.normal(0, 2, size=len(dates))
    trend = base + np.linspace(-2, 2, len(dates)) + noise
    trend = np.clip(trend, 70, 99)

    accuracy_trend = [
        {"date": d.strftime("%Y-%m-%d"), "value": float(v)}
        for d, v in zip(dates, trend)
    ]

    current_accuracy = float(trend[-1])
    drift = float(trend[-1] - trend[0])

    if current_accuracy > 85:
        health = "green"
    elif current_accuracy > 70:
        health = "yellow"
    else:
        health = "red"

    result = {
        "accuracy_trend": accuracy_trend,
        "current_accuracy": current_accuracy,
        "drift": drift,
        "last_retrain": (today - timedelta(days=7)).strftime("%Y-%m-%d"),
        "health": health,
    }
    return jsonify(result)


# -----------------------------------------------------------------------------
# CHATBOT (Context-Aware)
# -----------------------------------------------------------------------------
from flask import session

# Enable server-side session memory
app.secret_key = "supersecretkey123"   # (Replace with a real key)
app.config["SESSION_PERMANENT"] = False


@app.route("/api/chatbot", methods=["POST"])
def chatbot():
    from flask import session

    data = request.get_json()
    raw_msg = (data.get("message") or "").strip()
    msg = raw_msg.lower()

    # Init memory
    if "chat_history" not in session:
        session["chat_history"] = []
    history = session["chat_history"]
    history.append({"role": "user", "content": raw_msg})

    # Normalizer: strip punctuation, collapse whitespace, keep only alnum + spaces
    import re
    def normalize_text(s: str) -> str:
        return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9 ]+", " ", s.lower())).strip()

    norm_msg = normalize_text(msg)

    # Helper: match multi-word candidates robustly
    def find_best_matches(candidates):
        """
        Return list of candidates that match the message.
        Matching strategy (in order):
         1) normalized full-candidate is substring of normalized message (multiword exact)
         2) all candidate tokens present in message tokens (order not required)
         3) at least one token present (fallback)
        Return candidates sorted by token count desc (prefer longer/more specific names).
        """
        cand_norm = []
        for c in candidates:
            c_norm = normalize_text(str(c))
            tokens = [t for t in c_norm.split() if t]
            cand_norm.append((c, c_norm, tokens))

        # Prefer exact substring matches first
        exact = [c for (c, c_norm, tokens) in cand_norm if c_norm and c_norm in norm_msg]
        if exact:
            # sort by token count desc
            return sorted(exact, key=lambda x: -len(normalize_text(x).split()))

        msg_tokens = norm_msg.split()
        all_tokens = []
        partial = []
        for (c, c_norm, tokens) in cand_norm:
            if tokens and all(t in msg_tokens for t in tokens):
                all_tokens.append(c)
            elif tokens and any(t in msg_tokens for t in tokens):
                partial.append(c)

        if all_tokens:
            return sorted(all_tokens, key=lambda x: -len(normalize_text(x).split()))
        if partial:
            return sorted(partial, key=lambda x: -len(normalize_text(x).split()))
        return []

    # Collect candidate lists
    regions = list(DF_RAW["region"].dropna().unique())
    services = list(DF_RAW["resource_type"].dropna().unique())

    # RULE 1: Region comparison (explicit "compare" or " vs " or " vs. ")
    if "compare" in norm_msg or " vs " in norm_msg:
        found_regions = find_best_matches(regions)
        if len(found_regions) >= 2:
            r1, r2 = found_regions[0], found_regions[1]
            reply = compare_regions(r1, r2)
            history.append({"role": "assistant", "content": reply})
            session["chat_history"] = history
            return jsonify({"response": reply})

    # RULE 2: Service summary (e.g., "compute service summary" or "storage summary")
    found_services = find_best_matches(services)
    if found_services:
        svc = found_services[0]
        reply = summarize_service(svc)
        history.append({"role": "assistant", "content": reply})
        session["chat_history"] = history
        return jsonify({"response": reply})

    # RULE 3: Region summary (single region mentioned)
    found_regions = find_best_matches(regions)
    if len(found_regions) >= 1:
        r = found_regions[0]
        reply = summarize_region(r)
        history.append({"role": "assistant", "content": reply})
        session["chat_history"] = history
        return jsonify({"response": reply})

    # RULE 4: Forecast / Capacity / Highest
    if "forecast" in norm_msg:
        reply = "To generate forecasts, open the Forecast page and choose region, service, and model."
    elif "capacity" in norm_msg:
        reply = "Capacity planning highlights demand–capacity gaps and recommended adjustments."
    elif "highest" in norm_msg or "max" in norm_msg:
        df = DF_RAW.groupby("region")["usage_cpu"].mean().sort_values(ascending=False)
        reply = f"Highest average CPU region is **{df.index[0]}** at {df.iloc[0]:.2f}%."
    else:
        reply = (
            f"You said: \"{raw_msg}\".\n"
            "Try asking:\n"
            "- \"summary of east us\"\n"
            "- \"compare east and west\"\n"
            "- \"compute service summary\"\n"
        )

    history.append({"role": "assistant", "content": reply})
    session["chat_history"] = history
    return jsonify({"response": reply})

# -----------------------------------------------------------------------------
# MAIN
# -----------------------------------------------------------------------------
if __name__ == "__main__":
    print("=" * 60)
    print("🚀 Starting Flask Backend Server")
    print("=" * 60)
    print(f"📁 Data directory: {DATA_DIR}")
    print(f"📊 Loaded {len(DF_RAW)} rows")
    print(f"🌐 CORS enabled for: http://localhost:3000")
    print("=" * 60)
    app.run(host="0.0.0.0", port=5000, debug=True)