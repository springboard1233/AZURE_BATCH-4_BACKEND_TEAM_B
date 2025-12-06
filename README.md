# Azure Batch Forecasting System - Backend Team B

A comprehensive machine learning pipeline for forecasting Azure cloud resource demand with interactive dashboarding and RAG chatbot capabilities.

## 🎯 Project Overview

This project provides an intelligent forecasting system for Azure cloud resource utilization across multiple regions and resource types. It combines:

- **Data Processing Pipeline**: Clean and feature-engineer raw Azure usage data
- **ML Model Training**: ARIMA, XGBoost, and LSTM models for time-series forecasting
- **REST API Backend**: Flask-based API for serving predictions and analytics
- **Interactive Dashboard**: Streamlit-powered UI with real-time visualizations
- **RAG Chatbot**: LLM-powered chatbot with Ollama integration for intelligent queries

## 📋 Project Structure

```
.
├── backend_app.py                 # Flask REST API (data endpoints & forecasting)
├── dashboard_app.py               # Streamlit dashboard with chatbot integration
├── model_training_pipeline.py     # ML pipeline with ARIMA/XGBoost/LSTM models
├── optimised_backend_app.py       # Optimized FastAPI server alternative
├── start_pipeline.py              # Service starter script
├── requirements.txt               # Python dependencies
│
├── data/
│   ├── raw/                       # Original Azure usage data
│   │   ├── azure_usage.csv
│   │   └── external_factors.csv
│   │
│   └── processed/                 # Cleaned and feature-engineered data
│       ├── cleaned_merged.csv
│       ├── feature_importance.csv
│       ├── final_featured_dataset.csv
│       ├── xgboost_test_results.csv
│       │
│       └── featured-dataset-specific models/
│           ├── dataset_for_arima.csv
│           ├── dataset_for_lstm.csv
│           └── dataset_for_xgboost.csv
│
├── models/                        # Trained ML models
│   ├── cpu_forecasting_models/
│   │   └── SoutheastAsia_LSTMmodel_cpu.h5
│   ├── storage_forecasting_models/
│   └── users_active_forecasting_models/
│       └── EastUS_LSTMmodel_users.h5
│
├── notebooks/                     # Jupyter notebooks for analysis & experiments
│   ├── azure_correlation_analysis.csv
│   ├── azure_daily_summary.csv
│   └── notebook files/
│       ├── Milestone_01_Data_cleaning.ipynb
│       ├── Milestone_01_Basic_Exploratory_Analysis_and_Visualization.ipynb
│       ├── Milestone_02_Feature_Engineering.ipynb
│       ├── Milestone_03_modeling.ipynb
│       ├── Milestone_04_Forecast_Integration_&_Capacity_Planning.ipynb
│       ├── approach_1_model_Training_and_Evalution.ipynb
│       ├── approach_2_model_Training_and_Evalution.ipynb
│       ├── approach_3.ipynb
│       ├── improved_active_users_model_training.ipynb
│       ├── improved_cpu-usage_model_Training_and_Evalution.ipynb
│       └── advanced_visualisation.ipynb
│
├── scripts/                       # Utility scripts
│   ├── EDA.py                     # Exploratory Data Analysis
│   └── utils.py                   # Utility functions
│
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- pip or conda
- Ollama for RAG chatbot functionality

### Installation

1. **Clone/Setup the repository**
   ```bash
   cd AZURE_BATCH-4_BACKEND_TEAM_B-main
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Prepare data** (ensure data files are in `data/` directory)
   - Place raw Azure data in `data/raw/`
   - Or generate processed data through the pipeline

### Running the System

#### Option 1: Start All Services
```bash
python start_pipeline.py
```

This starts:
- Backend API server (Flask) on `http://localhost:5000`
- Model training scheduler in the background

#### Option 2: Run Components Individually

**1. Backend API Server:**
```bash
python backend_app.py
# API available at http://localhost:5000/api
```

**2. Dashboard (in another terminal):**
```bash
streamlit run dashboard_app.py
# Dashboard available at http://localhost:8501
```

**3. Model Training Pipeline (optional):**
```bash
python model_training_pipeline.py
```

## 📊 Key Components

### 1. Backend API (`backend_app.py`)

Flask REST API providing:
- **Data Endpoints**: Historical data retrieval with filtering
- **Forecast Endpoints**: Predictions for CPU, storage, and active users
- **Analytics Endpoints**: KPIs, trends, and capacity planning
- **CORS Support**: Cross-origin requests for frontend compatibility

**Key Routes:**
- `GET /api/data` - Retrieve historical data
- `GET /api/forecast` - Get predictions
- `GET /api/kpis` - Performance metrics
- `GET /api/capacity-planning` - Capacity recommendations

### 2. Dashboard (`dashboard_app.py`)

Streamlit interactive dashboard featuring:
- **Multiple Tabs**: Overview, detailed analytics, forecasting, capacity planning
- **Real-time Visualizations**: Plotly charts for insights
- **Data Filters**: Region, resource type, date range selections
- **RAG Chatbot**: LLM-powered Q&A with local Ollama integration
- **Export Features**: Download filtered data and reports

### 3. Model Training Pipeline (`model_training_pipeline.py`)

Intelligent ML pipeline with:
- **Multiple Models**: ARIMA, XGBoost, LSTM
- **Automatic Model Selection**: Chooses best-performing model per metric
- **Cross-validation**: Ensures model reliability
- **Scheduling**: Automated retraining on schedule
- **Metrics Tracking**: Comprehensive evaluation and logging

**Supported Models:**
- **ARIMA**: Statistical time-series forecasting
- **XGBoost**: Gradient boosting for high-accuracy predictions
- **LSTM**: Deep learning for complex temporal patterns

### 4. Data Processing

**Raw Data → Processing Flow:**
1. Data Cleaning (Milestone 1)
   - Handle missing values
   - Remove outliers
   - Format standardization

2. Feature Engineering (Milestone 2)
   - Create temporal features
   - Lag features for historical context
   - External factor integration

3. Model-Specific Preparation
   - Scaled data for neural networks
   - Stationarized data for ARIMA
   - Proper format for XGBoost

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Backend
FLASK_HOST=localhost
FLASK_PORT=5000

# Dashboard
STREAMLIT_PORT=8501

# Ollama (for RAG chatbot)
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=mistral
USE_OLLAMA_EMBEDDINGS=false

# Data paths (optional, defaults provided)
DATA_DIR=./data/processed
MODEL_DIR=./models
```

### Model Training Configuration

In `model_training_pipeline.py`, adjust:
- Data paths for your environment
- Retraining schedule
- Model hyperparameters
- Logging directory

## 📈 Forecasting Metrics

The system tracks:
- **MAE (Mean Absolute Error)**: Average prediction deviation
- **RMSE (Root Mean Squared Error)**: Penalizes larger errors
- **MAPE (Mean Absolute Percentage Error)**: Percentage accuracy
- **Model Performance Scores**: Comparative rankings

## 💬 RAG Chatbot Features

When Ollama is configured:
- Ask natural language questions about Azure usage
- Get insights from historical data
- Receive forecasting explanations
- Capacity planning recommendations

**Requirements:**
- Ollama running locally (`http://localhost:11434`)
- Model downloaded (e.g., `ollama pull mistral`)

## 📚 Jupyter Notebooks

Explore the analysis journey through:

- **Milestone 01**: Data cleaning and initial exploration
- **Milestone 02**: Feature engineering techniques
- **Milestone 03**: Model development and comparison
- **Milestone 04**: Forecasting integration and capacity planning
- **Approach Files**: Different modeling strategies (1, 2, 3)
- **Specialized Notebooks**: LSTM and CPU usage model improvements

## 🔍 API Usage Examples

### Get Historical Data
```bash
curl "http://localhost:5000/api/data?region=EastUS&start_date=2023-01-01&end_date=2023-12-31"
```

### Get Forecast
```bash
curl "http://localhost:5000/api/forecast?region=EastUS&days_ahead=30"
```

### Get KPIs
```bash
curl "http://localhost:5000/api/kpis?region=EastUS"
```

## 🛠 Troubleshooting

### Port Already in Use
```bash
# Find and kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Missing Data Files
- Ensure `data/raw/` contains Azure usage data
- Run data cleaning pipeline first
- Check file paths in configuration

### Ollama Connection Issues
- Verify Ollama is running: `curl http://localhost:11434/api/tags`
- Check firewall settings
- Ensure correct model is downloaded

### Model Loading Errors
- Verify TensorFlow/Keras versions match training environment
- Check `.h5` model files exist in `models/` directory
- Rebuild models if incompatible versions

## 📦 Dependencies

Core packages:
- **Streamlit**: Interactive dashboard
- **Flask**: REST API server
- **Pandas/NumPy**: Data processing
- **Scikit-learn**: ML utilities
- **TensorFlow/Keras**: LSTM models
- **XGBoost**: Gradient boosting
- **Statsmodels**: ARIMA implementation
- **Plotly**: Interactive visualizations
- **Requests**: HTTP communication
- **python-dotenv**: Environment configuration

See `requirements.txt` for complete list and versions.

## 👥 Team Information

**Project**: Azure Batch Forecasting System
**Team**: Backend Team B
**Context**: Infosys Springboard M4 Project

## 📝 License

[Specify your project license here]

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test with provided notebooks
4. Submit results

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review relevant Jupyter notebooks
3. Check API logs in `pipelogs` directory
4. Verify data files and model paths

---

**Last Updated**: December 2025
**Version**: 1.0
