from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import random

app = FastAPI(title="Azure Demand Forecasting API")

# Configure CORS to allow frontend requests
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

@app.get("/")
def root():
    """Root endpoint with API information"""
    return {
        "message": "Azure Demand Forecasting API",
        "version": "1.0.0",
        "endpoints": {
            "historical": "/api/historical",
            "forecast": "/api/forecast",
            "recommendations": "/api/recommendations",
            "kpis": "/api/kpis",
            "usage_trends": "/api/usage-trends",
            "forecast_insights": "/api/forecast-insights",
            "capacity_planning": "/api/capacity-planning",
            "reports_insights": "/api/reports-insights",
        },
        "docs": "/docs"
    }

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


# --- 4️⃣ KPIs Endpoint ---
@app.get("/api/kpis")
def get_kpis():
    """Get KPI metrics for dashboard"""
    return {
        "status": "success",
        "kpis": {
            "active_regions": 18,
            "forecast_accuracy": 92,
            "avg_cpu_load": 64,
            "cost_efficiency": 87
        }
    }


# --- 5️⃣ Usage Trends Endpoint ---
@app.get("/api/usage-trends")
def get_usage_trends():
    """Get historical usage trends over months"""
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    data = []
    for month in months:
        data.append({
            "month": month,
            "cpu": round(random.uniform(30, 110), 0)
        })
    return {"status": "success", "data": data}


# --- 6️⃣ Forecast Insights Endpoint ---
@app.get("/api/forecast-insights")
def get_forecast_insights():
    """Get forecast data by region"""
    regions = ["East US", "West US", "North Europe", "Southeast Asia"]
    data = []
    for region in regions:
        data.append({
            "region": region,
            "demand": round(random.uniform(60, 120), 0)
        })
    return {"status": "success", "data": data}


# --- 7️⃣ Capacity Planning Endpoint ---
@app.get("/api/capacity-planning")
def get_capacity_planning():
    """Get capacity distribution data"""
    return {
        "status": "success",
        "data": [
            {"name": "Compute", "value": 35},
            {"name": "Storage", "value": 25},
            {"name": "Networking", "value": 20},
            {"name": "Database", "value": 20},
            {"name": "AI/ML", "value": 15},
            {"name": "Analytics", "value": 10},
            {"name": "DevOps", "value": 10},
            {"name": "Security", "value": 5},
            {"name": "IoT", "value": 5},
            {"name": "Other", "value": 5},
        ]
    }


# --- 8️⃣ Reports & Insights Endpoint ---
@app.get("/api/reports-insights")
def get_reports_insights():
    """Get efficiency scores for radar chart"""
    return {
        "status": "success",
        "data": [
            {"metric": "Scalability", "score": 80},
            {"metric": "Reliability", "score": 70},
            {"metric": "Cost", "score": 65},
            {"metric": "Performance", "score": 85},
            {"metric": "Utilization", "score": 75},
            {"metric": "Latency", "score": 60},
            {"metric": "Security", "score": 90},
            {"metric": "Flexibility", "score": 70},
            {"metric": "Support", "score": 80},
            {"metric": "Innovation", "score": 75},
            {"metric": "Efficiency", "score": 85},
        ]
    }
