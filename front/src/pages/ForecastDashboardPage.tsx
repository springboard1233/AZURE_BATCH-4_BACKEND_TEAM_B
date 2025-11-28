import { useEffect, useMemo, useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Activity,
  BarChart3,
  Download,
  RefreshCcw,
  Database,
} from 'lucide-react';
import { KPICard } from '../components/KPICard';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useBackendData } from '../hooks/useBackendData';
import { formatPercent, mean, standardDeviation, toNumber } from '../utils/metrics';

const horizonPresets: Record<string, number> = {
  '3M': 3,
  '6M': 6,
  '12M': 12,
};

type HorizonKey = keyof typeof horizonPresets;

interface ForecastSeriesPoint {
  time: string;
  historical: number | null;
  predicted: number;
  lower: number;
  upper: number;
}

export default function ForecastDashboardPage() {
  const [horizon, setHorizon] = useState<HorizonKey>('6M');
  const [region, setRegion] = useState<string>('');
  const [metric, setMetric] = useState<string>('');
  const [model, setModel] = useState('LSTM');

  const { data, loading, error, refresh } = useBackendData();
  const { kpis, usageTrends, regions, capacity, insights } = data;

  const regionOptions = useMemo(() => {
    const uniqueRegions = Array.from(new Set(regions.map((entry) => entry.region))).filter(Boolean);
    return ['Global', ...uniqueRegions];
  }, [regions]);

  useEffect(() => {
    if (!regionOptions.length) return;
    if (!region || !regionOptions.includes(region)) {
      setRegion(regionOptions[0]);
    }
  }, [region, regionOptions]);

  const metricOptions = useMemo(() => {
    const uniqueMetrics = Array.from(new Set(capacity.map((entry) => entry.name))).filter(Boolean);
    return uniqueMetrics.length ? uniqueMetrics : ['CPU Utilization'];
  }, [capacity]);

  useEffect(() => {
    if (!metricOptions.length) return;
    if (!metric || !metricOptions.includes(metric)) {
      setMetric(metricOptions[0]);
    }
  }, [metric, metricOptions]);

  const trendWindow = useMemo(() => {
    if (!usageTrends.length) return 0;
    const preset = horizonPresets[horizon];
    return preset ? Math.min(preset, usageTrends.length) : usageTrends.length;
  }, [horizon, usageTrends.length]);

  const trimmedUsage = useMemo(() => {
    if (!usageTrends.length) return [];
    return usageTrends.slice(-trendWindow || usageTrends.length);
  }, [trendWindow, usageTrends]);

  const forecastSeries: ForecastSeriesPoint[] = useMemo(() => {
    if (!trimmedUsage.length) return [];
    const futureStart = Math.max(trimmedUsage.length - Math.ceil(trimmedUsage.length * 0.35), 0);

    return trimmedUsage.map((point, index, arr) => {
      const cpu = toNumber(point.cpu);
      const prev = index === 0 ? cpu : toNumber(arr[index - 1].cpu);
      const next = index === arr.length - 1 ? cpu : toNumber(arr[index + 1].cpu);
      const predicted = (cpu * 0.5 + prev * 0.25 + next * 0.25);
      const spread = Math.max(predicted * 0.1, 3);

      return {
        time: point.month,
        historical: index < futureStart ? cpu : null,
        predicted: Number(predicted.toFixed(2)),
        lower: Number(Math.max(predicted - spread, 0).toFixed(2)),
        upper: Number((predicted + spread).toFixed(2)),
      };
    });
  }, [trimmedUsage]);

  const usageValues = useMemo(() => usageTrends.map((point) => toNumber(point.cpu)), [usageTrends]);
  const avgCpu = useMemo(() => mean(usageValues), [usageValues]);
  const peakCpu = useMemo(() => (usageValues.length ? Math.max(...usageValues) : 0), [usageValues]);
  const deviation = useMemo(() => standardDeviation(usageValues), [usageValues]);
  const totalDemand = useMemo(
    () => regions.reduce((sum, entry) => sum + toNumber(entry.demand), 0),
    [regions],
  );

  const regionDetails = useMemo(() => {
    if (!regions.length) {
      return { name: 'Global', demand: 0, share: 100 };
    }

    if (region === 'Global' || !region) {
      return {
        name: 'Global',
        demand: mean(regions.map((entry) => toNumber(entry.demand)), 0),
        share: 100,
      };
    }

    const record = regions.find((entry) => entry.region === region);
    const demand = toNumber(record?.demand);
    const share = totalDemand ? Number(((demand / totalDemand) * 100).toFixed(1)) : 0;
    return {
      name: region,
      demand,
      share,
    };
  }, [region, regions, totalDemand]);

  const capacityMetric = useMemo(() => {
    if (!capacity.length) return null;
    return capacity.find((entry) => entry.name === metric) ?? capacity[0];
  }, [capacity, metric]);

  const trendDirection = useMemo(() => {
    if (usageValues.length < 2) return 'Stable';
    const first = usageValues[0];
    const last = usageValues[usageValues.length - 1];
    const delta = last - first;

    if (delta > 5) return 'Upward';
    if (delta < -5) return 'Downward';
    return 'Stable';
  }, [usageValues]);

  const riskLevel = useMemo(() => {
    if (deviation > 10) return { label: 'High', trend: 'up' as const };
    if (deviation > 5) return { label: 'Medium', trend: 'up' as const };
    return { label: 'Low', trend: 'down' as const };
  }, [deviation]);

  const forecastStability = useMemo(() => {
    if (!deviation) return 100;
    return Math.max(0, Math.min(100, 100 - deviation * 4));
  }, [deviation]);

  const datasetSummary = useMemo(
    () => ({
      utilization: insights?.average_utilization_ratio
        ? formatPercent(insights.average_utilization_ratio * 100, 1)
        : '—',
      efficiency: insights?.average_storage_efficiency
        ? formatPercent(insights.average_storage_efficiency * 100, 1)
        : '—',
      peak: insights?.peak_usage_date ?? '—',
      hottest: insights?.highest_temp_day ?? '—',
      total: insights?.total_records ?? 0,
    }),
    [insights],
  );

  const displayPeak = usageValues.length ? Number(peakCpu.toFixed(1)) : 0;
  const displayAverage = usageValues.length ? Number(avgCpu.toFixed(1)) : 0;
  const riskScore = Math.min(100, deviation * 6);

  const kpiCards = [
    {
      icon: TrendingUp,
      title: 'Expected Peak',
      value: displayPeak,
      suffix: usageValues.length ? '%' : '',
      glowColor: '#2EBFFF',
    },
    {
      icon: Activity,
      title: 'Expected Average',
      value: displayAverage,
      suffix: usageValues.length ? '%' : '',
      glowColor: '#AE71FF',
    },
    {
      icon: AlertTriangle,
      title: 'Risk Signal',
      value: Number(riskScore.toFixed(1)),
      suffix: `% · ${riskLevel.label}`,
      glowColor: riskLevel.label === 'High' ? '#FF5252' : '#F9A825',
      variant: 'glow-pulse' as const,
    },
  ];

  const handleExport = () => {
    if (!forecastSeries.length) return;
    const blob = new Blob([JSON.stringify({ horizon, region, metric, data: forecastSeries }, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `forecast-${region}-${horizon}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-3">
            Forecast Dashboard
          </h1>
          <p className="text-[#9EA7B8] text-lg">
            {loading ? 'Syncing with FastAPI backend…' : 'Live FastAPI data powering the demand outlook'}
          </p>
        </div>
        <button
          onClick={refresh}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:border-[#2EBFFF] transition-all text-sm"
        >
          <RefreshCcw className="w-4 h-4" />
          Refresh data
        </button>
      </div>

      {error && (
        <div className="mb-8 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4 rounded-xl border border-white/10">
          <label className="block text-sm text-[#9EA7B8] mb-2">Forecast Horizon</label>
          <select
            value={horizon}
            onChange={(e) => setHorizon(e.target.value as HorizonKey)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#2EBFFF] focus:outline-none transition-all"
          >
            <option value="3M">3 Months</option>
            <option value="6M">6 Months</option>
            <option value="12M">12 Months</option>
          </select>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/10">
          <label className="block text-sm text-[#9EA7B8] mb-2">Region</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#2EBFFF] focus:outline-none transition-all"
            disabled={!regionOptions.length}
          >
            {regionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/10">
          <label className="block text-sm text-[#9EA7B8] mb-2">Metric</label>
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#2EBFFF] focus:outline-none transition-all"
            disabled={!metricOptions.length}
          >
            {metricOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/10">
          <label className="block text-sm text-[#9EA7B8] mb-2">Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#2EBFFF] focus:outline-none transition-all"
          >
            <option value="ARIMA">ARIMA</option>
            <option value="LSTM">LSTM Neural Network</option>
            <option value="XGBOOST">XGBoost</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {kpiCards.map((card) => (
          <KPICard key={card.title} {...card} />
        ))}
      </div>

      <div className="glass-card p-6 rounded-xl border border-white/10 mb-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-1">
              {metric} Forecast · {regionDetails.name}
            </h2>
            <p className="text-[#9EA7B8]">Using {model} model · {horizon} horizon</p>
          </div>
          <button
            onClick={handleExport}
            disabled={!forecastSeries.length}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] rounded-lg hover:opacity-80 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={forecastSeries}>
            <defs>
              <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2EBFFF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2EBFFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.25} />
            <XAxis dataKey="time" stroke="#9EA7B8" />
            <YAxis stroke="#9EA7B8" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
              }}
              formatter={(value: number | null, name) => {
                if (value == null) {
                  return ['n/a', name];
                }
                return [`${value.toFixed(2)}%`, name];
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="url(#confidenceBand)"
              name="Confidence band"
            />
            <Line
              type="monotone"
              dataKey="historical"
              stroke="#9EA7B8"
              strokeWidth={2}
              name="Historical"
              dot={{ r: 3 }}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#2EBFFF"
              strokeWidth={3}
              name="Predicted"
              dot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          icon={<BarChart3 className="w-5 h-5" />}
          title="Forecast Stability"
          value={`${forecastStability.toFixed(1)}%`}
          description="Variance-adjusted confidence"
          accent="from-[#2EBFFF] to-[#1DA1E0]"
        />
        <SummaryCard
          icon={<Activity className="w-5 h-5" />}
          title="Model Performance"
          value={`${(kpis?.forecast_accuracy ?? 0).toFixed(1)}%`}
          description="Backend reported accuracy"
          accent="from-[#AE71FF] to-[#8E51DF]"
        />
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5 text-black" />}
          title="Trend Direction"
          value={trendDirection}
          description={
            usageValues.length
              ? `${usageValues[usageValues.length - 1].toFixed(1)}% latest`
              : 'Awaiting data'
          }
          accent="from-[#B2FF59] to-[#92DF39]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EBFFF] to-[#1DA1E0] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg">Dataset Snapshot</h3>
          </div>
          <ul className="space-y-3 text-[#9EA7B8]">
            <li className="flex items-center justify-between">
              <span>Total records</span>
              <span className="text-white">{datasetSummary.total || '—'}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Average utilization</span>
              <span className="text-white">{datasetSummary.utilization}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Storage efficiency</span>
              <span className="text-white">{datasetSummary.efficiency}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Peak usage date</span>
              <span className="text-white">{datasetSummary.peak}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Hottest weather day</span>
              <span className="text-white">{datasetSummary.hottest}</span>
            </li>
          </ul>
        </div>

        <div className="glass-card p-6 rounded-xl border border-white/10">
          <h3 className="text-lg mb-4">Region focus</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-[#9EA7B8]">Region</p>
              <p className="text-xl">{regionDetails.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#9EA7B8]">Demand share</p>
              <p className="text-2xl text-[#2EBFFF]">{regionDetails.share.toFixed(1)}%</p>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 p-4">
            <p className="text-sm text-[#9EA7B8] mb-1">Avg demand (CPU)</p>
            <p className="text-3xl">{regionDetails.demand.toFixed(2)}%</p>
          </div>
          {capacityMetric && (
            <div className="mt-4">
              <p className="text-sm text-[#9EA7B8]">Focus metric</p>
              <p className="text-xl">
                {capacityMetric.name} · {capacityMetric.value.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  title,
  value,
  description,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  accent: string;
}) {
  return (
    <div className="glass-card p-6 rounded-xl border border-white/10 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-all bg-gradient-to-br ${accent}`} />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg glass-card flex items-center justify-center">{icon}</div>
          <h3 className="text-lg">{title}</h3>
        </div>
        <div className="text-3xl mb-2">{value}</div>
        <p className="text-[#9EA7B8] text-sm">{description}</p>
      </div>
    </div>
  );
}
