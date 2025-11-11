# Backend - Azure Demand Forecasting API

This folder contains all backend services including FastAPI, Flask, Streamlit, and ML training pipelines.

## Structure

```
backend/
├── app.py                          # FastAPI main application
├── optimised_backend_app.py        # Flask optimized backend API
├── dashboard_app.py                # Streamlit dashboard
├── model_training_pipeline.py      # ML model training pipeline
├── start_pipeline.py               # Pipeline starter script
├── requirements.txt                # Python dependencies
├── data/                           # Data files
│   ├── raw/                        # Raw data files
│   └── processed/                  # Processed/cleaned data
├── scripts/                        # Utility scripts
│   ├── EDA.py                      # Exploratory Data Analysis
│   └── utils.py                    # Helper functions
├── reports/                        # Generated reports
└── notebooks/                      # Jupyter notebooks for analysis
```

## Installation

1. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

## Running the Services

### FastAPI Server
```bash
cd backend
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### Flask API Server
```bash
cd backend
python optimised_backend_app.py
```

### Streamlit Dashboard
```bash
cd backend
streamlit run dashboard_app.py
```

### Model Training Pipeline
```bash
cd backend
python start_pipeline.py
```

Or run the training pipeline directly:
```bash
python model_training_pipeline.py --now    # Run immediately
python model_training_pipeline.py --force   # Force training
python model_training_pipeline.py --status # Check status
```

## API Endpoints

### FastAPI (app.py)
- `GET /` - API root with endpoint information
- `GET /api/historical` - Get historical usage data
- `GET /api/forecast` - Get demand forecast
- `GET /api/recommendations` - Get recommendations
- `GET /api/kpis` - Get KPI metrics for dashboard
- `GET /api/usage-trends` - Get monthly usage trends
- `GET /api/forecast-insights` - Get forecast by region
- `GET /api/capacity-planning` - Get capacity distribution
- `GET /api/reports-insights` - Get efficiency scores
- `GET /docs` - Interactive API documentation (Swagger UI)

### Frontend Integration

The API is configured with CORS to allow requests from:
- `http://localhost:3000` (Vite dev server)
- `http://localhost:5173` (Alternative Vite port)

Make sure CORS origins match your frontend URL.

### Flask (optimised_backend_app.py)
- Multiple endpoints for data, forecasts, analytics, and reports
- See the file for complete API documentation

## Data Files

- Raw data should be placed in `data/raw/`
- Processed data will be saved to `data/processed/`
- Model performance database: `model_performance.db`

## Notes

- All file paths in scripts are relative to the `backend/` directory
- The ML models are trained using ARIMA, XGBoost, and LSTM algorithms
- Training results and reports are saved in `reports/`

