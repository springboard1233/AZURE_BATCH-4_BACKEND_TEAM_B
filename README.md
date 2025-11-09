# AZURE_BATCH-4_BACKEND_TEAM_B

Azure Demand Forecasting Project - ML-based forecasting for Azure Compute & Storage demand

## 📁 Project Structure

```
AZURE_BATCH-4_BACKEND_TEAM_B-main/
│
├── backend/                  # Backend services (Python)
│   ├── app.py               # FastAPI application
│   ├── optimised_backend_app.py  # Flask API
│   ├── dashboard_app.py     # Streamlit dashboard
│   ├── model_training_pipeline.py  # ML training pipeline
│   ├── requirements.txt      # Python dependencies
│   ├── data/                 # Data files
│   ├── scripts/              # Utility scripts
│   ├── reports/             # Generated reports
│   └── notebooks/           # Jupyter notebooks
│
├── frontend/                 # Frontend application (React/TypeScript)
│   ├── src/                 # React source files
│   ├── package.json         # Node.js dependencies
│   ├── vite.config.ts       # Vite configuration
│   └── index.html           # HTML template
│
└── README.md                # This file
```

## 🚀 Quick Start

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run FastAPI server:
```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

Or run Flask API:
```bash
python optimised_backend_app.py
```

Or run Streamlit dashboard:
```bash
streamlit run dashboard_app.py
```

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📋 Features

### Backend
- **FastAPI** - Modern Python web framework
- **Flask** - Alternative REST API
- **Streamlit** - Interactive dashboard
- **ML Models** - ARIMA, XGBoost, LSTM for demand forecasting
- **Data Processing** - EDA, cleaning, feature engineering

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Radix UI** - Accessible components

## 🛠️ Technologies

### Backend
- Python 3.13+
- FastAPI, Flask, Streamlit
- Pandas, NumPy
- TensorFlow, XGBoost, Statsmodels
- Scikit-learn

### Frontend
- React 18.3.1
- TypeScript 5.3.0
- Vite 6.3.5
- Tailwind CSS 4.1.3
- Recharts 2.15.2

## 📖 Documentation

- [Backend README](backend/README.md) - Backend setup and API documentation
- [Frontend README](frontend/README.md) - Frontend setup and development guide

## 📝 Development

### Running Backend Services

```bash
# FastAPI (Port 8000)
cd backend
uvicorn app:app --reload

# Flask API (Port 5000)
cd backend
python optimised_backend_app.py

# Streamlit Dashboard
cd backend
streamlit run dashboard_app.py

# ML Training Pipeline
cd backend
python model_training_pipeline.py --now
```

### Running Frontend

```bash
cd frontend
npm run dev    # Development server
npm run build  # Production build
```

## 📊 Data Flow

1. **Data Collection** → Raw data in `backend/data/raw/`
2. **Data Processing** → Cleaned data in `backend/data/processed/`
3. **Model Training** → Models saved in `backend/models/`
4. **API Serving** → Backend APIs serve predictions
5. **Frontend Display** → React app visualizes data

## 🤝 Contributing

1. Backend code goes in `backend/`
2. Frontend code goes in `frontend/`
3. Follow the existing folder structure
4. Update documentation as needed

## 📄 License

[Your License Here]
