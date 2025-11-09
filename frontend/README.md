# Frontend - React TypeScript Dashboard

This folder contains the React + TypeScript frontend application built with Vite.

## Structure

```
frontend/
├── src/                    # Source files
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Entry point
│   ├── index.css          # Global styles
│   └── components/        # React components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       ├── KPICard.tsx
│       ├── ChartSection.tsx
│       └── ui/            # UI component library
├── index.html             # HTML template
├── vite.config.ts        # Vite configuration
├── package.json           # Node.js dependencies
└── package-lock.json      # Locked dependencies
```

## Installation

1. Install Node.js dependencies:
```bash
cd frontend
npm install
```

## Development

Start the development server:
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

## Build for Production

Build the production bundle:
```bash
cd frontend
npm run build
```

The built files will be in the `build/` directory.

## Technologies

- **React 18.3.1** - UI framework
- **TypeScript 5.3.0** - Type safety
- **Vite 6.3.5** - Build tool and dev server
- **Tailwind CSS 4.1.3** - Styling
- **Radix UI** - Accessible component primitives
- **Recharts** - Data visualization
- **Lucide React** - Icons

## Features

- Responsive dashboard design
- Dark/Light theme support
- Interactive charts and visualizations
- KPI cards and metrics display
- Modern UI components

## API Integration

The frontend connects to the backend API. Make sure the backend server is running before starting the frontend.

### Backend Configuration

Default backend URL: `http://localhost:8000` (FastAPI) or `http://localhost:5000` (Flask)

You can configure the API URL by creating a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:8000
```

### Running Both Frontend and Backend

1. **Start Backend** (in `backend/` folder):
```bash
cd backend
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

2. **Start Frontend** (in `frontend/` folder):
```bash
cd frontend
npm run dev
```

The frontend will automatically connect to the backend API and display real-time data.

### Available API Endpoints

- `/api/historical` - Historical usage data
- `/api/forecast` - Demand forecast predictions
- `/api/recommendations` - Actionable recommendations
- `/api/kpis` - Key Performance Indicators
- `/api/usage-trends` - Monthly usage trends
- `/api/forecast-insights` - Regional forecast insights
- `/api/capacity-planning` - Capacity distribution data
- `/api/reports-insights` - Efficiency metrics

