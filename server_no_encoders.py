# server_no_encoders.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
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
# 3. Load trained model
# ------------------------
try:
    model = joblib.load("model.pkl")
    logger.info("Model loaded successfully.")
except Exception as e:
    logger.error(f"Failed to load model: {e}")
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
    Convert raw input into model-ready features using simple hash encoding.
    """
    try:
        # Simple numeric encoding for demo purposes
        region_encoded = hash(region) % 1000
        service_encoded = hash(service) % 1000

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
        features = preprocess_input(request.region, request.service, request.horizon)
        forecast = model.predict(features)

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
