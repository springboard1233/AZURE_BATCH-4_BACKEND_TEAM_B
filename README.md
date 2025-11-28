# Azure Demand Forecasting Platform

This workspace contains a FastAPI backend (`back/`) and a Vite/React frontend (`front/`) that renders live analytics from the processed Azure usage dataset. The project goal is to show decision-makers an interactive dashboard powered entirely by the feature-engineered CSV pipeline.

## Repository Layout

| Path  | Description |
| --- | --- |
| `back/` | FastAPI service, data pipeline scripts, notebooks, and processed CSVs. Key app entry points: `app.py`, `dashboard_app.py`, and `optimised_backend_app.py`. |
| `front/` | Vite React SPA with shadcn/ui components, animations, and backend-aware pages such as Forecast Dashboard and API Integration Center. |

## Prerequisites

- Python 3.10+ with `pip`
- Node.js 18+ with `npm`
- (Optional) `uvicorn` or another ASGI server for FastAPI

## Backend Setup

```bash
cd back
python -m venv .venv
.venv\Scripts\activate  # or source .venv/bin/activate on macOS/Linux
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

The API exposes:
- `/api/insights`, `/api/kpis`, `/api/usage-trends`
- `/api/forecast-insights`, `/api/capacity-planning`
- `/api/reports-insights`, `/api/features`

The endpoints read `data/processed/feature_engineered.csv`, so refresh that file to inject new analytics.

## Frontend Setup

```bash
cd front
npm install
npm run dev
```

Environment variables:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_API_KEY=sk_local_fastapi_demo
```

Adjust the base URL if the backend runs on a different host or port.

## Development Notes

- `front/src/hooks/useBackendData.ts` handles all API calls, keeping dashboards in sync.
- `front/src/pages/ForecastDashboardPage.tsx` now computes KPI cards, forecast bands, and summaries directly from backend responses.
- `front/src/pages/APIIntegrationPage.tsx` documents the FastAPI endpoints and ships a built-in tester pointed at the current base URL.

Run `npm run build` in `front/` and `uvicorn app:app` in `back/` for production-style builds/tests. Update this README when deployment instructions change.

