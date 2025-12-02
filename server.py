# server.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
import logging

# ------------------------
# 1. Initialize FastAPI
# ------------------------
app = FastAPI(title="Azure Demand Forecast API")

# ------------------------
# 2. Setup logging
# ------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ------------------------
# 3. Load trained model & encoders
# ------------------------
try:
    # Your trained model
    model = joblib.load("model.pkl")

    # Optional: If you have encoders for categorical features
    region_encoder = joblib.load("region_encoder.pkl")  # e.g., LabelEncoder
    service_encoder = joblib.load("service_encoder.pkl")  # e.g., LabelEncoder

    logger.info("Model and encoders loaded successfully.")
except Exception as e:
    logger.error(f"Failed to load model or encoders: {e}")
    raise e

# ------------------------
# 4. Define request schema
# ------------------------
class ForecastRequest(BaseModel):
    region: str
    service: str
    horizon: int = 30  # forecast horizon in days

# ------------------------
# 5. Helper function: preprocess input
# ------------------------
def preprocess_input(region: str, service: str, horizon: int):
    """
    Convert raw input into model-ready features
    """
    try:
        # Encode categorical features
        region_encoded = region_encoder.transform([region])[0]
        service_encoded = service_encoder.transform([service])[0]

        # Combine features into 2D array
        feature_vector = np.array([[region_encoded, service_encoded, horizon]])

        return feature_vector
    except Exception as e:
        logger.error(f"Error in preprocessing input: {e}")
        raise HTTPException(status_code=400, detail=f"Invalid input: {e}")

# ------------------------
# 6. Define API endpoint
# ------------------------
@app.post("/api/forecast")
def get_forecast(request: ForecastRequest):
    """
    Returns forecast for given region, service, and horizon
    """
    try:
        # Preprocess inputs
        features = preprocess_input(request.region, request.service, request.horizon)

        # Generate prediction
        forecast = model.predict(features)

        # Return JSON
        return {
            "region": request.region,
            "service": request.service,
            "horizon": request.horizon,
            "forecast": forecast.tolist()
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Forecasting failed: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# ------------------------
# 7. Run server (for local testing)
# ------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)