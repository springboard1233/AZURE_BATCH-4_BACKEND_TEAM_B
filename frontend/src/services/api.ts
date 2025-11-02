// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Types
export interface HistoricalData {
  date: string;
  usage: number;
}

export interface ForecastData {
  date: string;
  predicted_demand: number;
}

export interface Recommendation {
  action: string;
  reason: string;
}

export interface KPIs {
  active_regions: number;
  forecast_accuracy: number;
  avg_cpu_load: number;
  cost_efficiency: number;
}

export interface UsageTrend {
  month: string;
  cpu: number;
}

export interface ForecastInsight {
  region: string;
  demand: number;
}

export interface CapacityPlan {
  name: string;
  value: number;
}

export interface ReportInsight {
  metric: string;
  score: number;
}

// API Response wrapper
interface ApiResponse<T> {
  status: string;
  data?: T;
  forecast?: T;
  recommendations?: T;
  kpis?: T;
  error?: string;
}

// Generic fetch function with error handling
async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse<T> = await response.json();
    
    if (data.status === 'success') {
      return (data.data || data.forecast || data.recommendations || data.kpis || data) as T;
    }
    
    throw new Error(data.error || 'Unknown error occurred');
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// API Functions
export const api = {
  // Historical usage data
  getHistorical: async (): Promise<HistoricalData[]> => {
    return fetchApi<HistoricalData[]>('/api/historical');
  },

  // Forecast data
  getForecast: async (): Promise<ForecastData[]> => {
    return fetchApi<ForecastData[]>('/api/forecast');
  },

  // Recommendations
  getRecommendations: async (): Promise<Recommendation[]> => {
    return fetchApi<Recommendation[]>('/api/recommendations');
  },

  // KPIs
  getKPIs: async (): Promise<KPIs> => {
    return fetchApi<KPIs>('/api/kpis');
  },

  // Usage trends
  getUsageTrends: async (): Promise<UsageTrend[]> => {
    return fetchApi<UsageTrend[]>('/api/usage-trends');
  },

  // Forecast insights by region
  getForecastInsights: async (): Promise<ForecastInsight[]> => {
    return fetchApi<ForecastInsight[]>('/api/forecast-insights');
  },

  // Capacity planning
  getCapacityPlanning: async (): Promise<CapacityPlan[]> => {
    return fetchApi<CapacityPlan[]>('/api/capacity-planning');
  },

  // Reports & insights
  getReportsInsights: async (): Promise<ReportInsight[]> => {
    return fetchApi<ReportInsight[]>('/api/reports-insights');
  },
};

export default api;

