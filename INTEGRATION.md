# Frontend-Backend Integration Guide

## ✅ Integration Complete

The frontend and backend have been successfully integrated! The frontend now fetches real data from the backend API instead of using static data.

## 🔧 What Was Changed

### Backend (`backend/app.py`)
1. ✅ Added CORS middleware to allow frontend requests
2. ✅ Added new API endpoints:
   - `/api/kpis` - KPI metrics
   - `/api/usage-trends` - Monthly usage trends
   - `/api/forecast-insights` - Regional forecasts
   - `/api/capacity-planning` - Capacity distribution
   - `/api/reports-insights` - Efficiency metrics
3. ✅ Added root endpoint `/` with API information

### Frontend (`frontend/src/`)
1. ✅ Created API service (`src/services/api.ts`):
   - Centralized API configuration
   - Type-safe API calls
   - Error handling
   - Support for environment variables

2. ✅ Updated `App.tsx`:
   - Fetches real data from backend on mount
   - Loading states with spinner
   - Error handling with user-friendly messages
   - Dynamic data rendering in charts

## 🚀 How to Run

### Step 1: Start the Backend
```bash
cd backend
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`

### Step 2: Start the Frontend
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Step 3: Verify Integration
1. Open the frontend in your browser
2. Check the browser console for any errors
3. Verify that data is loading (you'll see a loading spinner initially)
4. Check that charts display real data from the backend

## 📡 API Endpoints Used by Frontend

| Endpoint | Purpose | Used In |
|----------|---------|---------|
| `/api/kpis` | Get KPI metrics | KPI Cards |
| `/api/usage-trends` | Get monthly usage data | Usage Trends Chart |
| `/api/forecast-insights` | Get regional forecasts | Forecast Insights Chart |
| `/api/capacity-planning` | Get capacity distribution | Capacity Planning Pie Chart |
| `/api/reports-insights` | Get efficiency metrics | Reports & Insights Radar Chart |

## 🔍 Troubleshooting

### Frontend shows "Failed to load data" error
1. **Check if backend is running**: Visit `http://localhost:8000` in your browser
2. **Check CORS settings**: Make sure backend allows requests from `http://localhost:3000`
3. **Check API URL**: Verify `VITE_API_URL` in frontend `.env` file (or use default `http://localhost:8000`)
4. **Check browser console**: Look for CORS errors or network errors

### Data not updating
- The backend currently generates random data for demonstration
- To use real data, update the backend endpoints to read from your database/files
- The Flask backend (`optimised_backend_app.py`) has more advanced endpoints with real data

### CORS Errors
If you see CORS errors:
1. Make sure the frontend URL matches one in the CORS allow_origins list
2. Update `backend/app.py` to add your frontend URL to the CORS middleware

## 📝 Next Steps

### To Use Real Data Instead of Random Data:

1. **Update Backend Endpoints**: Modify `backend/app.py` to read from your database:
   ```python
   # Example: Read from CSV file
   df = pd.read_csv('data/processed/cleaned_merged.csv')
   
   # Example: Read from database
   # Use your existing database connection
   ```

2. **Connect to Flask Backend**: The `optimised_backend_app.py` has more endpoints with real data. You can:
   - Update frontend API service to point to Flask backend (port 5000)
   - Or integrate Flask endpoints into FastAPI app

### To Add More Features:

1. **Add Data Refresh**: Add a refresh button to fetch latest data
2. **Add Filters**: Allow users to filter by region, date range, etc.
3. **Add Real-time Updates**: Use WebSockets for live data updates
4. **Add Error Retry**: Implement automatic retry for failed API calls

## 🎯 Testing

### Test Backend API:
```bash
# Test root endpoint
curl http://localhost:8000/

# Test KPI endpoint
curl http://localhost:8000/api/kpis

# Test usage trends
curl http://localhost:8000/api/usage-trends
```

### Test Frontend:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh the page
4. Verify API calls are being made
5. Check responses for data

## 📚 Additional Resources

- Backend API Docs: Visit `http://localhost:8000/docs` for Swagger UI
- Frontend README: See `frontend/README.md`
- Backend README: See `backend/README.md`

