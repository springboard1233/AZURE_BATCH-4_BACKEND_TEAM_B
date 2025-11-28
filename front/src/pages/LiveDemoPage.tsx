import { motion } from 'framer-motion';
import { useState } from 'react';
import { Play, RefreshCw, Download, Settings, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const regions = ['US-East', 'US-West', 'EU-Central', 'Asia-Pacific'];
const models = ['ARIMA', 'LSTM', 'XGBoost', 'Ensemble'];
const metrics = ['CPU', 'Storage', 'Users'];

const generateMockData = () => {
  return Array.from({ length: 14 }, (_, i) => ({
    day: `Day ${i + 1}`,
    actual: Math.floor(Math.random() * 30) + 50,
    predicted: Math.floor(Math.random() * 30) + 50,
  }));
};

export default function LiveDemoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);
  const [chartData, setChartData] = useState(generateMockData());
  const [accuracy, setAccuracy] = useState(96.5);

  const runForecast = () => {
    setIsLoading(true);
    setTimeout(() => {
      setChartData(generateMockData());
      setAccuracy(Math.random() * 5 + 95);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="mb-4 neon-text">Live Interactive Demo</h1>
          <p className="text-[#9EA7B8] max-w-2xl mx-auto">
            Experience the platform's forecasting capabilities in real-time
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card-premium rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-[#2EBFFF]" />
            <h2>Forecast Configuration</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-[#9EA7B8] mb-2">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-[#1a1f2e] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#2EBFFF] focus:outline-none transition-colors"
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#9EA7B8] mb-2">ML Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-[#1a1f2e] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#2EBFFF] focus:outline-none transition-colors"
              >
                {models.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#9EA7B8] mb-2">Metric</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="w-full bg-[#1a1f2e] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#2EBFFF] focus:outline-none transition-colors"
              >
                {metrics.map(metric => (
                  <option key={metric} value={metric}>{metric}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={runForecast}
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Generating Forecast...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Run Forecast</span>
                </>
              )}
            </button>
            <button className="btn-secondary">
              <Download className="w-5 h-5" />
              <span>Export Results</span>
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ResultCard
            title="Model Accuracy"
            value={`${accuracy.toFixed(1)}%`}
            color="from-[#4CAF50] to-[#2d7a32]"
            icon={<Zap className="w-6 h-6" />}
          />
          <ResultCard
            title="Forecast Horizon"
            value="14 Days"
            color="from-[#2EBFFF] to-[#1a8acc]"
            icon={<Zap className="w-6 h-6" />}
          />
          <ResultCard
            title="Confidence Level"
            value="95%"
            color="from-[#AE71FF] to-[#7b4db3]"
            icon={<Zap className="w-6 h-6" />}
          />
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 rounded-xl mb-8 hover-lift"
        >
          <div className="flex items-center justify-between mb-6">
            <h2>Forecast Visualization</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#4CAF50]"></div>
                <span className="text-[#9EA7B8]">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2EBFFF]"></div>
                <span className="text-[#9EA7B8]">Predicted</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
              <XAxis dataKey="day" stroke="#9EA7B8" />
              <YAxis stroke="#9EA7B8" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #333', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="actual" stroke="#4CAF50" strokeWidth={3} dot={{ fill: '#4CAF50', r: 5 }} />
              <Line type="monotone" dataKey="predicted" stroke="#2EBFFF" strokeWidth={3} strokeDasharray="5 5" dot={{ fill: '#2EBFFF', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* API Example */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-8 mb-8"
        >
          <h2 className="mb-4">API Request Example</h2>
          <div className="bg-black/40 rounded-lg p-4 overflow-x-auto">
            <pre className="text-[#B2FF59] text-sm">
{`curl -X POST https://api.aicloudforecast.com/v1/forecast \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "region": "${selectedRegion}",
    "model": "${selectedModel}",
    "metric": "${selectedMetric}",
    "horizon": 14
  }'`}
            </pre>
          </div>
        </motion.div>

        {/* Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card-premium rounded-2xl p-8"
        >
          <h2 className="mb-6 text-center">Try More Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureDemo
              title="Cost Optimization"
              description="Identify savings opportunities"
              icon="💰"
            />
            <FeatureDemo
              title="Anomaly Detection"
              description="Spot unusual patterns"
              icon="🔍"
            />
            <FeatureDemo
              title="Multi-Region Analysis"
              description="Compare across regions"
              icon="🌍"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ResultCard({ title, value, color, icon }: { title: string; value: string; color: string; icon: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`glass-card-premium rounded-xl p-6 bg-gradient-to-br ${color}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl glass-card">
          {icon}
        </div>
      </div>
      <div className="text-[#9EA7B8] mb-1">{title}</div>
      <div className="metric-value">{value}</div>
    </motion.div>
  );
}

function FeatureDemo({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card p-6 rounded-xl text-center hover-lift cursor-pointer"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="mb-2">{title}</h3>
      <p className="text-[#9EA7B8]">{description}</p>
    </motion.div>
  );
}
