// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Type definitions
export interface KPIData {
  peak_cpu: number;
  avg_cpu: number;
  peak_cpu_details: {
    date: string;
    region: string;
    resource_type: string;
  };
  max_storage: number;
  avg_storage: number;
  max_storage_details: {
    date: string;
    region: string;
    resource_type: string;
  };
  peak_users: number;
  avg_users: number;
  peak_users_details: {
    date: string;
    region: string;
    resource_type: string;
  };
  holiday_impact: {
    percentage: number;
  };
  total_regions: number;
  total_resource_types: number;
  data_points: number;
  date_range: {
    start: string;
    end: string;
    days: number;
  };
}

export interface SparklineData {
  cpu_trend: { date: string; usage_cpu: number }[];
  storage_trend: { date: string; usage_storage: number }[];
  users_trend: { date: string; users_active: number }[];
}

export interface RawDataPoint {
  date: string;
  region: string;
  resource_type: string;
  usage_cpu: number;
  usage_storage: number;
  users_active: number;
  economic_index: number;
  cloud_market_demand: number;
  holiday: number;
}

export interface ForecastParams {
  metric: 'cpu' | 'storage' | 'users';
  model: 'best' | 'arima' | 'lightgbm' | 'lstm';
  region: string;
  service: string;
  horizon: number;
}

export interface ForecastDataPoint {
  date: string;
  forecast_value: number;
  actual_value: number | null;
  lower_ci: number;
  upper_ci: number;
}

export interface CapacityPlanningParams {
  region?: string;
  service: string;
  horizon: number;
}

export interface CapacityPlanItem {
  region: string;
  service: string;
  forecast_demand: number;
  available_capacity: number;
  recommended_adjustment: string;
  risk_level: 'low' | 'medium' | 'high';
}

export interface FilterOptions {
  regions: string[];
  resource_types: string[];
  date_range: {
    min_date: string;
    max_date: string;
  };
}

// API Client Class
class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, String(params[key]));
        }
      });
    }

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request<{ status: string; rows: number }>('/health');
  }

  // Get filter options
  async getFilterOptions() {
    return this.request<FilterOptions>('/filters/options');
  }

  // Get KPIs
  async getKPIs() {
    return this.request<KPIData>('/kpis');
  }

  // Get sparklines (30-day trends)
  async getSparklines() {
    return this.request<SparklineData>('/sparklines');
  }

  // Get raw data
  async getRawData() {
    return this.request<RawDataPoint[]>('/data/raw');
  }

  // Get time series data
  async getTimeSeries(params?: {
    metric?: 'usage_cpu' | 'usage_storage' | 'users_active';
    region?: string;
    resource_type?: string;
    aggregation?: 'daily' | 'weekly' | 'monthly';
  }) {
    return this.request<{ date: string; value: number }[]>('/time-series', params);
  }

  // Get forecast
  async getForecast(params: ForecastParams) {
    return this.request<ForecastDataPoint[]>('/forecast', params);
  }

  // Get model comparison
  async getModelComparison(metric?: 'cpu' | 'storage' | 'users') {
    return this.request<any[]>('/model-comparison', metric ? { metric } : undefined);
  }

  // Get capacity planning
  async getCapacityPlanning(params: CapacityPlanningParams) {
    return this.request<CapacityPlanItem[]>('/capacity-planning', params);
  }

  // Get monitoring data
  async getMonitoring(params?: { metric?: string; windowDays?: number }) {
    return this.request<any>('/monitoring', params);
  }
}

// Export singleton instance
export const apiClient = new APIClient(API_BASE_URL);

// Export convenience functions
export const fetchKPIs = () => apiClient.getKPIs();
export const fetchSparklines = () => apiClient.getSparklines();
export const fetchTimeSeries = (params?: Parameters<typeof apiClient.getTimeSeries>[0]) => 
  apiClient.getTimeSeries(params);
export const fetchForecast = (params: ForecastParams) => apiClient.getForecast(params);
export const fetchCapacityPlanning = (params: CapacityPlanningParams) => 
  apiClient.getCapacityPlanning(params);
export const fetchFilterOptions = () => apiClient.getFilterOptions();
export const fetchModelComparison = (metric?: 'cpu' | 'storage' | 'users') => 
  apiClient.getModelComparison(metric);
export const fetchMonitoring = (params?: { metric?: string; windowDays?: number }) =>
  apiClient.getMonitoring(params);
export async function fetchRawData() {
  const res = await fetch("http://localhost:5000/api/data/raw");
  if (!res.ok) throw new Error("Failed to fetch raw data");
  return res.json();
}
