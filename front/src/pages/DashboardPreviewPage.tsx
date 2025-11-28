import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { TrendingUp, Database, Cpu, Activity, Zap } from 'lucide-react';
import { useBackendData } from '../hooks/useBackendData';
import { formatPercent, toNumber } from '../utils/metrics';

export default function DashboardPreviewPage() {
  const { data, loading, error } = useBackendData();
  const { kpis, usageTrends, regions, capacity, reports, insights } = data;

  const cpuTrendData = useMemo(() => {
    if (!usageTrends.length) return [];

    return usageTrends.map((point, index, arr) => {
      const cpu = toNumber(point.cpu);
      const prev = index === 0 ? cpu : toNumber(arr[index - 1].cpu);
      const forecast = cpu * 0.6 + prev * 0.4;

      return {
        date: point.month,
        cpu,
        forecast: Number(forecast.toFixed(2)),
      };
    });
  }, [usageTrends]);

  const regionChartData = useMemo(
    () =>
      regions.map((record) => ({
        region: record.region,
        cpu: Number(toNumber(record.demand).toFixed(2)),
      })),
    [regions],
  );

  const capacityChartData = useMemo(
    () =>
      capacity.map((record) => ({
        name: record.name,
        value: Number(toNumber(record.value).toFixed(2)),
      })),
    [capacity],
  );

  const radarData = useMemo(() => {
    if (reports.length) {
      return reports.map((metric) => ({
        metric: metric.metric,
        value: metric.score,
        target: 100,
      }));
    }

    return [
      { metric: 'CPU', value: 0, target: 100 },
      { metric: 'Storage', value: 0, target: 100 },
      { metric: 'Network', value: 0, target: 100 },
    ];
  }, [reports]);

  const topRegions = useMemo(() => {
    if (!insights) return [];
    return Object.entries(insights.top_regions_by_cpu_usage ?? {}).map(([region, cpu]) => ({
      region,
      cpu: Number(toNumber(cpu).toFixed(2)),
    }));
  }, [insights]);

  const kpiCards = [
    {
      icon: <Cpu className="w-8 h-8 text-[#2EBFFF]" />,
      title: 'Average CPU Load',
      value: kpis ? `${kpis.avg_cpu_load.toFixed(1)}%` : loading ? 'Loading…' : '—',
      change: insights?.total_records ? `${insights.total_records} records` : undefined,
      trend: 'up' as const,
    },
    {
      icon: <Activity className="w-8 h-8 text-[#AE71FF]" />,
      title: 'Forecast Accuracy',
      value: kpis ? `${kpis.forecast_accuracy.toFixed(1)}%` : loading ? 'Loading…' : '—',
      change: insights?.average_utilization_ratio ? formatPercent(insights.average_utilization_ratio * 100) : undefined,
      trend: 'up' as const,
    },
    {
      icon: <Database className="w-8 h-8 text-[#B2FF59]" />,
      title: 'Active Regions',
      value: kpis ? `${kpis.active_regions}` : loading ? 'Loading…' : '—',
      change: topRegions.length ? `${topRegions[0].region} leads` : undefined,
      trend: 'up' as const,
    },
    {
      icon: <Zap className="w-8 h-8 text-[#F9A825]" />,
      title: 'Cost Efficiency',
      value: kpis ? `${kpis.cost_efficiency.toFixed(1)}%` : loading ? 'Loading…' : '—',
      change: insights?.average_storage_efficiency
        ? formatPercent(insights.average_storage_efficiency * 100)
        : undefined,
      trend: 'up' as const,
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="mb-4 neon-text">Dashboard Preview</h1>
          <p className="text-[#9EA7B8] max-w-2xl mx-auto">
            {loading ? 'Syncing with FastAPI backend…' : 'Real-time analytics and forecasting insights across all metrics'}
          </p>
        </motion.div>

        {error && (
          <div className="mb-10 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpiCards.map((card, index) => (
            <KPICard key={card.title} {...card} />
          ))}
        </div>

        {/* CPU Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-6 rounded-xl mb-8 hover-lift"
        >
          <div className="flex items-center justify-between mb-6">
            <h2>CPU Utilization Trend</h2>
            <div className="flex items-center gap-4 text-sm text-[#9EA7B8]">
              <span className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-[#2EBFFF]" />
                Actual
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-[#AE71FF]" />
                Smoothed Forecast
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={cpuTrendData}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2EBFFF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2EBFFF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#AE71FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#AE71FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
              <XAxis dataKey="date" stroke="#9EA7B8" />
              <YAxis stroke="#9EA7B8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #333', borderRadius: '8px' }}
                formatter={(value: number) => [`${value.toFixed(2)}%`, 'CPU']}
              />
              <Area type="monotone" dataKey="cpu" stroke="#2EBFFF" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="#AE71FF"
                fillOpacity={1}
                fill="url(#colorForecast)"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Capacity & Regional charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl hover-lift"
          >
            <h2 className="mb-6">Resource Capacity Mix</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={capacityChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                <XAxis dataKey="name" stroke="#9EA7B8" />
                <YAxis stroke="#9EA7B8" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #333', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="value" fill="#2EBFFF" radius={[8, 8, 0, 0]} name="Avg CPU Load" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl hover-lift"
          >
            <h2 className="mb-6">Forecast Demand by Region</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                <XAxis type="number" stroke="#9EA7B8" />
                <YAxis type="category" dataKey="region" stroke="#9EA7B8" width={140} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #333', borderRadius: '8px' }} />
                <Bar dataKey="cpu" fill="#AE71FF" radius={[0, 8, 8, 0]} name="Demand score" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl hover-lift"
          >
            <h2 className="mb-4">Dataset Snapshot</h2>
            <ul className="space-y-3 text-[#9EA7B8]">
              <li className="flex items-center justify-between">
                <span>Total records</span>
                <span className="text-white">{insights?.total_records ?? '—'}</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Average utilization</span>
                <span className="text-white">
                  {formatPercent((insights?.average_utilization_ratio ?? 0) * 100)}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Avg storage efficiency</span>
                <span className="text-white">
                  {formatPercent((insights?.average_storage_efficiency ?? 0) * 100)}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Peak usage date</span>
                <span className="text-white">{insights?.peak_usage_date ?? '—'}</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Hottest weather day</span>
                <span className="text-white">{insights?.highest_temp_day ?? '—'}</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl hover-lift"
          >
            <h2 className="mb-4">Top Regions by CPU Usage</h2>
            <div className="space-y-3">
              {topRegions.map((region) => (
                <div key={region.region} className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                  <div>
                    <p className="font-semibold">{region.region}</p>
                    <p className="text-xs text-[#9EA7B8]">Avg CPU (backend)</p>
                  </div>
                  <span className="text-lg text-[#2EBFFF]">{region.cpu.toFixed(2)}%</span>
                </div>
              ))}
              {!topRegions.length && <p className="text-sm text-[#9EA7B8]">No regional data available.</p>}
            </div>
          </motion.div>
        </div>

        {/* Performance Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl hover-lift"
          >
            <h2 className="mb-6">Report Metrics Heatmap</h2>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="metric" stroke="#9EA7B8" />
                <PolarRadiusAxis stroke="#9EA7B8" />
                <Radar name="Current" dataKey="value" stroke="#2EBFFF" fill="#2EBFFF" fillOpacity={0.3} />
                <Radar name="Target" dataKey="target" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.2} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #333', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value.toFixed(2)} pts`, 'Score']}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl hover-lift"
          >
            <h2 className="mb-4">Live Data Notes</h2>
            <p className="text-[#9EA7B8] mb-4">
              All charts above are populated by the FastAPI backend (`/api/*` routes). Update the CSV in
              `back/data/processed/feature_engineered.csv` and refresh to see new insights reflected instantly.
            </p>
            <ul className="space-y-3 text-sm text-[#9EA7B8]">
              <li>• KPIs ← `/api/kpis`</li>
              <li>• Trends ← `/api/usage-trends`</li>
              <li>• Regions ← `/api/forecast-insights`</li>
              <li>• Capacity ← `/api/capacity-planning`</li>
              <li>• Reports ← `/api/reports-insights`</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function KPICard({
  icon,
  title,
  value,
  change,
  trend = 'up',
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
}) {
  return (
    <motion.div whileHover={{ scale: 1.02, y: -5 }} className="glass-card-premium p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl glass-card">{icon}</div>
        {change && (
          <div className={`flex items-center gap-1 ${trend === 'up' ? 'text-[#4CAF50]' : 'text-[#FF5252]'}`}>
            <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="text-[#9EA7B8] mb-1">{title}</div>
      <div className="metric-value">{value}</div>
    </motion.div>
  );
}
