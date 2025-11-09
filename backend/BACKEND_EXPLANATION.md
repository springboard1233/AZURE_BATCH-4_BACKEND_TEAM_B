# Backend Architecture & How It Works

## 📋 Overview

This project has **TWO backend implementations**:

1. **FastAPI Backend** (`app.py`) - Simple, lightweight API for basic functionality
2. **Flask Backend** (`optimised_backend_app.py`) - Advanced, full-featured API with ML models

---

## 🚀 Backend 1: FastAPI (`app.py`)

### What It Does
A simple REST API built with FastAPI that provides demo data for the frontend dashboard.

### How It Works

#### 1. **Framework Setup**
```python
app = FastAPI(title="Azure Demand Forecasting API")
```
- Creates a FastAPI application instance
- FastAPI automatically generates interactive API docs at `/docs`

#### 2. **CORS Configuration**
```python
app.add_middleware(CORSMiddleware, ...)
```
- Allows frontend (React app) to make API requests
- Configures allowed origins, methods, and headers
- Prevents browser security errors when frontend calls backend

#### 3. **API Endpoints**
The backend provides 8 endpoints that return JSON data:

| Endpoint | Purpose | Returns |
|----------|---------|---------|
| `GET /` | Root/info | API information and available endpoints |
| `GET /api/historical` | Historical data | Last 10 days of usage data |
| `GET /api/forecast` | Forecasts | 7-day future demand predictions |
| `GET /api/recommendations` | Recommendations | Actionable suggestions |
| `GET /api/kpis` | Key metrics | Dashboard KPIs (regions, accuracy, CPU, cost) |
| `GET /api/usage-trends` | Monthly trends | 12 months of CPU usage data |
| `GET /api/forecast-insights` | Regional forecasts | Forecast by region |
| `GET /api/capacity-planning` | Capacity data | Resource distribution |
| `GET /api/reports-insights` | Efficiency scores | Metrics for radar chart |

#### 4. **Data Generation**
Currently uses **random data** for demonstration:
```python
data.append({
    "date": day.strftime("%Y-%m-%d"),
    "usage": round(random.uniform(50, 120), 2)  # Random value
})
```

### Request Flow
```
Frontend Request → CORS Check → Endpoint Handler → Generate Data → Return JSON
```

### Example Request/Response
**Request:**
```bash
GET http://localhost:8000/api/kpis
```

**Response:**
```json
{
  "status": "success",
  "kpis": {
    "active_regions": 18,
    "forecast_accuracy": 92,
    "avg_cpu_load": 64,
    "cost_efficiency": 87
  }
}
```

---

## 🎯 Backend 2: Flask (`optimised_backend_app.py`)

### What It Does
A production-ready, optimized API with:
- **Real ML models** (ARIMA, XGBoost, LSTM)
- **Real data processing** from CSV files
- **Caching** for performance
- **Parallel processing** for forecasts
- **45+ endpoints** for analytics

### Architecture Overview

```
┌─────────────────────────────────────────┐
│         Flask Application               │
│  (optimised_backend_app.py)             │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐  │
│  │  1. Data Loading                 │  │
│  │     - Load CSV files             │  │
│  │     - Optimize data types        │  │
│  │     - Pre-compute aggregations   │  │
│  └─────────────────────────────────┘  │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │  2. ML Models                    │  │
│  │     - Load trained models        │  │
│  │     - ARIMA, XGBoost, LSTM       │  │
│  │     - Model scalers              │  │
│  └─────────────────────────────────┘  │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │  3. Caching System               │  │
│  │     - In-memory cache            │  │
│  │     - Time-based expiration      │  │
│  │     - Thread-safe locks          │  │
│  └─────────────────────────────────┘  │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │  4. API Endpoints                │  │
│  │     - KPIs, Forecasts            │  │
│  │     - Analytics, Reports         │  │
│  └─────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### How It Works - Step by Step

#### 1. **Startup Phase**
```python
# Load data at startup
df = load_data_optimized()  # Loads CSV file

# Pre-compute expensive calculations
common_stats = precompute_aggregations()

# Load ML models
loaded_models = load_all_models()
```

**What happens:**
- Reads `data/processed/cleaned_merged.csv`
- Optimizes data types (float32, int8, etc.) to save memory
- Pre-calculates aggregations (regional data, stats)
- Loads trained ML models from disk
- Creates thread pool for parallel processing

#### 2. **Data Loading** (`load_data_optimized()`)
```python
df = pd.read_csv('data/processed/cleaned_merged.csv',
                dtype={
                    'usage_cpu': 'float32',      # Smaller than float64
                    'usage_storage': 'float32',
                    'users_active': 'int32',
                    'region': 'category',        # Efficient string storage
                })
```

**Optimizations:**
- Uses specific data types to reduce memory by ~50%
- C engine for faster CSV parsing
- Pre-computes date features (month, quarter, weekend)

#### 3. **Caching System**
```python
cache_dict = {}  # Stores cached responses
cache_times = {} # Stores cache expiration times
cache_lock = RLock()  # Thread-safe access

CACHE_TIMEOUT = {
    'fast': 120,      # 2 minutes
    'medium': 600,    # 10 minutes
    'slow': 1800,     # 30 minutes
}
```

**How caching works:**
1. First request → Calculate result → Store in cache
2. Subsequent requests → Return cached result (if not expired)
3. After timeout → Recalculate and update cache

**Benefits:**
- Fast response times
- Reduces CPU usage
- Prevents redundant calculations

#### 4. **ML Model Loading**
```python
# Lazy loading - only import when needed
if lazy_import_ml():
    # Load TensorFlow, XGBoost, Statsmodels
    model = load_model(f'{region}_LSTM.h5')
    scaler = pickle.load(open(f'{region}_scaler.pkl'))
```

**Models used:**
- **ARIMA** - Time series forecasting
- **XGBoost** - Gradient boosting for complex patterns
- **LSTM** - Deep learning for sequential data

#### 5. **Request Processing Flow**

```
HTTP Request
    ↓
CORS Check (Flask-CORS)
    ↓
Check Cache (if endpoint cached)
    ├─ Cache Hit → Return cached data
    └─ Cache Miss ↓
        ↓
Execute Endpoint Function
    ├─ Load Data (if needed)
    ├─ Process Data
    ├─ Run ML Models (if forecast)
    └─ Calculate Results
        ↓
Store in Cache (if cacheable)
    ↓
Return JSON Response
```

#### 6. **Example: Forecast Endpoint**

```python
@app.route('/api/forecast/predict')
def generate_forecasts():
    # 1. Get parameters
    forecast_days = request.args.get('days', 30)
    region_filter = request.args.get('region', None)
    
    # 2. Load regional data
    region_data = region_dfs[region]
    
    # 3. Get appropriate model for region
    model_type = FINAL_SELECTION[region]  # e.g., 'LSTM'
    model = loaded_models[region]
    
    # 4. Prepare features
    features = prepare_features(region_data)
    
    # 5. Generate forecast
    predictions = model.predict(features)
    
    # 6. Return results
    return jsonify({'forecast': predictions})
```

#### 7. **Parallel Processing**
```python
# Use thread pool for multiple regions
with ThreadPoolExecutor(max_workers=6) as executor:
    futures = [
        executor.submit(forecast_region, region)
        for region in regions
    ]
    results = [f.result() for f in futures]
```

**Benefits:**
- Forecast multiple regions simultaneously
- Faster response times
- Better resource utilization

### Key Features

#### 1. **Intelligent Model Selection**
- Automatically selects best model (ARIMA/XGBoost/LSTM) per region
- Tracks model performance in SQLite database
- Retrains models when data changes

#### 2. **Data Analytics**
- Regional comparisons
- Trend analysis
- Correlation matrices
- Holiday impact analysis
- Resource utilization metrics

#### 3. **Capacity Planning**
- Uses ML forecasts
- Calculates optimal capacity
- Provides recommendations
- Multi-service support (CPU, Storage, Users)

#### 4. **Monitoring & Reporting**
- Model accuracy tracking
- Automated report generation
- Health check endpoints
- Cache statistics

---

## 🔄 How Data Flows Through the System

### FastAPI Backend Flow:
```
Client Request
    ↓
FastAPI App
    ↓
Endpoint Handler
    ↓
Generate Random Data
    ↓
Return JSON Response
```

### Flask Backend Flow:
```
Client Request
    ↓
Flask App
    ↓
Cache Check
    ├─ Hit → Return Cached
    └─ Miss → Continue
        ↓
Load Data (if needed)
    ↓
Process/Calculate
    ↓
Run ML Models (if forecast)
    ↓
Format Response
    ↓
Cache Result (if cacheable)
    ↓
Return JSON Response
```

---

## 🛠️ Technologies Used

### FastAPI Backend:
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **CORS** - Cross-Origin Resource Sharing

### Flask Backend:
- **Flask** - Web framework
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **TensorFlow** - Deep learning models
- **XGBoost** - Gradient boosting
- **Statsmodels** - ARIMA models
- **SQLite** - Model performance database
- **Threading** - Parallel processing
- **Caching** - Performance optimization

---

## 📊 Performance Optimizations

### Flask Backend Optimizations:

1. **Memory Optimization**
   - Optimized data types (float32 vs float64)
   - Category types for strings
   - Efficient date handling

2. **Speed Optimizations**
   - Pre-computed aggregations
   - In-memory caching
   - Parallel processing
   - Lazy ML imports

3. **Scalability**
   - Thread pool for concurrent requests
   - Thread-safe caching
   - Efficient data structures

---

## 🚦 How to Use

### Run FastAPI Backend:
```bash
cd backend
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### Run Flask Backend:
```bash
cd backend
python optimised_backend_app.py
```

### Access API Documentation:
- FastAPI: `http://localhost:8000/docs` (Swagger UI)
- Flask: Check endpoint list at `/health`

---

## 🔍 Debugging & Monitoring

### Health Check:
```bash
GET http://localhost:5000/health
```
Returns:
- Server status
- Models loaded
- Cache statistics
- Data records count

### Cache Statistics:
```bash
GET http://localhost:5000/api/cache/stats
```

### Clear Cache:
```bash
GET http://localhost:5000/api/cache/clear
```

---

## 📝 Summary

**FastAPI Backend (`app.py`):**
- ✅ Simple, lightweight
- ✅ Perfect for demo/development
- ✅ Fast setup
- ❌ Random data (not real)

**Flask Backend (`optimised_backend_app.py`):**
- ✅ Production-ready
- ✅ Real ML models
- ✅ Real data processing
- ✅ Advanced analytics
- ✅ Optimized performance
- ❌ More complex setup

Choose **FastAPI** for quick demos, **Flask** for production with real data and ML models.

