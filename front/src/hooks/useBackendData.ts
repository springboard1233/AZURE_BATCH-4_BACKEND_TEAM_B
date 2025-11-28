import { useCallback, useEffect, useRef, useState } from 'react';
import {
  backendApi,
  CapacityPlanningRecord,
  FeatureRecord,
  ForecastInsight,
  InsightsResponse,
  KpisResponse,
  ReportInsightMetric,
  UsageTrendPoint,
} from '../api/backend';

interface BackendData {
  kpis: KpisResponse['kpis'] | null;
  usageTrends: UsageTrendPoint[];
  regions: ForecastInsight[];
  capacity: CapacityPlanningRecord[];
  reports: ReportInsightMetric[];
  insights: InsightsResponse | null;
  features: FeatureRecord[];
  lastUpdated: number | null;
}

const defaultData: BackendData = {
  kpis: null,
  usageTrends: [],
  regions: [],
  capacity: [],
  reports: [],
  insights: null,
  features: [],
  lastUpdated: null,
};

interface UseBackendDataOptions {
  includeFeatures?: boolean;
  autoLoad?: boolean;
}

export function useBackendData(options?: UseBackendDataOptions) {
  const { includeFeatures = false, autoLoad = true } = options ?? {};
  const [data, setData] = useState<BackendData>(defaultData);
  const [loading, setLoading] = useState<boolean>(autoLoad);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const requests: Promise<unknown>[] = [
        backendApi.getKpis(),
        backendApi.getUsageTrends(),
        backendApi.getForecastInsights(),
        backendApi.getCapacityPlanning(),
        backendApi.getReportInsights(),
        backendApi.getInsights(),
      ];

      if (includeFeatures) {
        requests.push(backendApi.getFeatures());
      }

      const [
        kpiRes,
        usageRes,
        forecastRes,
        capacityRes,
        reportRes,
        insightRes,
        featuresRes,
      ] = await Promise.all(requests);

      if (!mountedRef.current) return;

      setData((prev) => ({
        kpis: (kpiRes as KpisResponse).kpis,
        usageTrends: (usageRes as { data: UsageTrendPoint[] }).data,
        regions: (forecastRes as { data: ForecastInsight[] }).data,
        capacity: (capacityRes as { data: CapacityPlanningRecord[] }).data,
        reports: (reportRes as { data: ReportInsightMetric[] }).data,
        insights: insightRes as InsightsResponse,
        features: includeFeatures
          ? ((featuresRes as FeatureRecord[]) ?? [])
          : prev.features,
        lastUpdated: Date.now(),
      }));
      setError(null);
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err instanceof Error ? err.message : 'Failed to load backend data.');
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [includeFeatures]);

  useEffect(() => {
    if (autoLoad) {
      fetchData();
    }
  }, [autoLoad, fetchData]);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
  };
}

