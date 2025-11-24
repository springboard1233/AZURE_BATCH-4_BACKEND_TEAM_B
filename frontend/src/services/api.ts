const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function safeFetch<T>(path: string) {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

export type KPIs = {
  active_regions: number;
  forecast_accuracy: number;
  avg_cpu_load: number;
  cost_efficiency: number;
};

export type UsageTrend = { month: string; cpu: number };
export type ForecastInsight = { region: string; demand: number };
export type CapacityPlan = { name: string; value: number };
export type ReportInsight = { metric: string; score: number };

export default {
  getKPIs: async (): Promise<KPIs> => {
    try {
      const json = await safeFetch<{ status?: string; kpis?: KPIs }>("/api/kpis");
      return json.kpis ?? ({} as KPIs);
    } catch (e) {
      console.error(e);
      return { active_regions: 10, forecast_accuracy: 90, avg_cpu_load: 60, cost_efficiency: 85 };
    }
  },

  getUsageTrends: async (): Promise<UsageTrend[]> => {
    try {
      const json = await safeFetch<{ status?: string; data?: UsageTrend[] }>("/api/usage-trends");
      return json.data ?? [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  getForecastInsights: async (): Promise<ForecastInsight[]> => {
    try {
      const json = await safeFetch<{ status?: string; data?: ForecastInsight[] }>("/api/forecast-insights");
      return json.data ?? [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  getCapacityPlanning: async (): Promise<CapacityPlan[]> => {
    try {
      const json = await safeFetch<{ status?: string; data?: CapacityPlan[] }>("/api/capacity-planning");
      return json.data ?? [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  getReportsInsights: async (): Promise<ReportInsight[]> => {
    try {
      const json = await safeFetch<{ status?: string; data?: ReportInsight[] }>("/api/reports-insights");
      return json.data ?? [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  // Milestone 2 endpoints:
  getFeatures: async (): Promise<Record<string, any>[]> => {
    try {
      const json = await safeFetch<Record<string, any>[] | { status?: string; data?: Record<string, any>[] }>("/api/features");
      if ((json as any).data) return (json as any).data;
      return Array.isArray(json) ? (json as any) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  getInsights: async (): Promise<Record<string, any>> => {
    try {
      const json = await safeFetch<Record<string, any>>("/api/insights");
      return json ?? {};
    } catch (e) {
      console.error(e);
      return {};
    }
  }
};
