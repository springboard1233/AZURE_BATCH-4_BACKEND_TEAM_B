from fastapi import FastAPI
from datetime import datetime, timedelta
import random

app = FastAPI(title="Azure Demand Forecasting Dummy API")

# --- 1️⃣ Historical Data Endpoint ---
@app.get("/api/historical")
def get_historical():
    today = datetime.today()
    data = []
    for i in range(10):
        day = today - timedelta(days=i)
        data.append({
            "date": day.strftime("%Y-%m-%d"),
            "usage": round(random.uniform(50, 120), 2)
        })
    return {"status": "success", "data": data[::-1]}  # oldest first


# --- 2️⃣ Forecast Endpoint ---
@app.get("/api/forecast")
def get_forecast():
    today = datetime.today()
    forecast = []
    for i in range(7):
        day = today + timedelta(days=i+1)
        forecast.append({
            "date": day.strftime("%Y-%m-%d"),
            "predicted_demand": round(random.uniform(80, 150), 2)
        })
    return {"status": "success", "forecast": forecast}


# --- 3️⃣ Recommendations Endpoint ---
@app.get("/api/recommendations")
def get_recommendations():
    recs = [
        {"action": "Increase server capacity", "reason": "Forecast shows 20% higher demand next week"},
        {"action": "Scale down non-critical resources", "reason": "Weekend demand drop expected"},
        {"action": "Enable autoscaling in Azure VM", "reason": "Handle fluctuating workloads efficiently"}
    ]
    return {"status": "success", "recommendations": recs}
