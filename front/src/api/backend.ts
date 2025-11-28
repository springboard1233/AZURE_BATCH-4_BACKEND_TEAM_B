const DEFAULT_BASE_URL = 'http://127.0.0.1:8000';

const sanitizeBaseUrl = (url: string) => url.replace(/\/+$/, '');

export const API_BASE_URL = sanitizeBaseUrl(
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? DEFAULT_BASE_URL,
);

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(`Request failed (${response.status}): ${message}`);
  }

  return (await response.json()) as T;
}

export interface InsightsResponse {
  average_utilization_ratio: number | null;
  average_storage_efficiency: number | null;
  peak_usage_date: string | null;
  highest_temp_day: string | null;
  top_regions_by_cpu_usage: Record<string, number>;
  total_records: number;
}

export interface KpisResponse {
  status: string;
  kpis: {
    active_regions: number;
    forecast_accuracy: number;
    avg_cpu_load: number;
    cost_efficiency: number;
  };
}

export interface UsageTrendPoint {
  month: string;
  cpu: number;
}

export interface UsageTrendResponse {
  status: string;
  data: UsageTrendPoint[];
}

export interface ForecastInsight {
  region: string;
  demand: number;
}

export interface ForecastInsightsResponse {
  status: string;
  data: ForecastInsight[];
}

export interface CapacityPlanningRecord {
  name: string;
  value: number;
}

export interface CapacityPlanningResponse {
  status: string;
  data: CapacityPlanningRecord[];
}

export interface ReportInsightMetric {
  metric: string;
  score: number;
}

export interface ReportsInsightsResponse {
  status: string;
  data: ReportInsightMetric[];
}

export type FeatureRecord = Record<string, string | number | null>;

export const backendApi = {
  getInsights: () => request<InsightsResponse>('/api/insights'),
  getKpis: () => request<KpisResponse>('/api/kpis'),
  getUsageTrends: () => request<UsageTrendResponse>('/api/usage-trends'),
  getForecastInsights: () => request<ForecastInsightsResponse>('/api/forecast-insights'),
  getCapacityPlanning: () => request<CapacityPlanningResponse>('/api/capacity-planning'),
  getReportInsights: () => request<ReportsInsightsResponse>('/api/reports-insights'),
  getFeatures: () => request<FeatureRecord[]>('/api/features'),
};

