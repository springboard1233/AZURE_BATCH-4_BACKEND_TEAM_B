import { motion } from 'framer-motion';
import { useState } from 'react';
import { Activity, CheckCircle, Clock, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const modelStatuses = [
  { region: 'US-East', arima: 'Active', lstm: 'Active', xgboost: 'Active', health: 99.2 },
  { region: 'US-West', arima: 'Active', lstm: 'Active', xgboost: 'Active', health: 98.8 },
  { region: 'EU-Central', arima: 'Active', lstm: 'Active', xgboost: 'Active', health: 99.5 },
  { region: 'Asia-Pacific', arima: 'Active', lstm: 'Active', xgboost: 'Active', health: 99.1 },
];

const trainingHistory = [
  { date: '2025-01-15', accuracy: 94.2, duration: 12 },
  { date: '2025-02-10', accuracy: 95.5, duration: 11 },
  { date: '2025-03-08', accuracy: 96.1, duration: 10 },
  { date: '2025-04-12', accuracy: 96.8, duration: 9 },
  { date: '2025-05-15', accuracy: 97.2, duration: 9 },
  { date: '2025-06-20', accuracy: 97.8, duration: 8 },
];

const performanceMetrics = [
  { model: 'ARIMA', accuracy: 94.2, latency: 45, throughput: 1200 },
  { model: 'LSTM', accuracy: 96.8, latency: 82, throughput: 980 },
  { model: 'XGBoost', accuracy: 95.5, latency: 58, throughput: 1100 },
];

export default function ModelHealthPage() {
  const [isTraining, setIsTraining] = useState(false);

  const handleTriggerTraining = () => {
    setIsTraining(true);
    setTimeout(() => setIsTraining(false), 3000);
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
          <h1 className="mb-4 neon-text">Model Training & Health Monitoring</h1>
          <p className="text-[#9EA7B8] max-w-2xl mx-auto">
            Real-time monitoring and intelligent training management
          </p>
        </motion.div>

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatusCard
            icon={<Activity className="w-8 h-8 text-[#4CAF50]" />}
            title="Status"
            value="Active"
            color="from-[#4CAF50] to-[#2d7a32]"
          />
          <StatusCard
            icon={<Zap className="w-8 h-8 text-[#2EBFFF]" />}
            title="Selection Method"
            value="Intelligent"
            color="from-[#2EBFFF] to-[#1a8acc]"
          />
          <StatusCard
            icon={<Clock className="w-8 h-8 text-[#AE71FF]" />}
            title="Last Check"
            value="2 min ago"
            color="from-[#AE71FF] to-[#7b4db3]"
          />
          <StatusCard
            icon={<CheckCircle className="w-8 h-8 text-[#B2FF59]" />}
            title="Active Models"
            value="12/12"
            color="from-[#B2FF59] to-[#7db338]"
          />
        </div>

        {/* Trigger Training */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card-premium rounded-xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="mb-2">Intelligent Model Training</h2>
              <p className="text-[#9EA7B8]">
                Automatically retrain models when performance degradation is detected or new patterns emerge
              </p>
            </div>
            <button
              onClick={handleTriggerTraining}
              disabled={isTraining}
              className="btn-primary"
            >
              {isTraining ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Training...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Trigger Intelligent Training</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Model Status Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-6 rounded-xl mb-8 overflow-x-auto hover-lift"
        >
          <h2 className="mb-6">Regional Model Status</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4">Region</th>
                <th className="text-left py-4 px-4">ARIMA</th>
                <th className="text-left py-4 px-4">LSTM</th>
                <th className="text-left py-4 px-4">XGBoost</th>
                <th className="text-left py-4 px-4">Health Score</th>
              </tr>
            </thead>
            <tbody>
              {modelStatuses.map((status, index) => (
                <motion.tr
                  key={status.region}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4">{status.region}</td>
                  <td className="py-4 px-4">
                    <StatusBadge status={status.arima} />
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={status.lstm} />
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={status.xgboost} />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#4CAF50] to-[#B2FF59]"
                          style={{ width: `${status.health}%` }}
                        ></div>
                      </div>
                      <span className="text-[#4CAF50]">{status.health}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Training History & Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl hover-lift"
          >
            <h2 className="mb-6">Training History</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trainingHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                <XAxis dataKey="date" stroke="#9EA7B8" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#9EA7B8" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #333', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="accuracy" stroke="#2EBFFF" strokeWidth={3} dot={{ fill: '#2EBFFF', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl hover-lift"
          >
            <h2 className="mb-6">Performance Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                <XAxis dataKey="model" stroke="#9EA7B8" />
                <YAxis stroke="#9EA7B8" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #333', borderRadius: '8px' }} />
                <Bar dataKey="accuracy" fill="#2EBFFF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Training Logs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-6 rounded-xl hover-lift"
        >
          <h2 className="mb-6">Recent Training Logs</h2>
          <div className="space-y-3">
            <LogEntry
              type="success"
              message="LSTM model training completed for US-East region"
              time="2 hours ago"
            />
            <LogEntry
              type="success"
              message="XGBoost model accuracy improved to 95.5%"
              time="5 hours ago"
            />
            <LogEntry
              type="info"
              message="ARIMA model retraining scheduled for EU-Central"
              time="8 hours ago"
            />
            <LogEntry
              type="success"
              message="All models passed health check validation"
              time="12 hours ago"
            />
            <LogEntry
              type="warning"
              message="Performance drift detected in Asia-Pacific LSTM model"
              time="1 day ago"
            />
          </div>
        </motion.div>

        {/* Scalability Readiness */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card-premium rounded-xl p-8 mt-8"
        >
          <h2 className="mb-6">Scalability Readiness</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScalabilityMetric
              title="Compute Capacity"
              value="78%"
              status="Healthy"
            />
            <ScalabilityMetric
              title="Memory Usage"
              value="62%"
              status="Healthy"
            />
            <ScalabilityMetric
              title="Model Throughput"
              value="1,250 req/s"
              status="Optimal"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatusCard({ icon, title, value, color }: { icon: React.ReactNode; title: string; value: string; color: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`glass-card-premium rounded-xl p-6 bg-gradient-to-br ${color}`}
    >
      <div className="mb-4">{icon}</div>
      <div className="text-[#9EA7B8] mb-1">{title}</div>
      <div className="metric-value">{value}</div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status === 'Active';
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${isActive ? 'bg-[#4CAF50]/20' : 'bg-[#FF5252]/20'}`}>
      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#4CAF50]' : 'bg-[#FF5252]'} animate-pulse`}></div>
      <span className={isActive ? 'text-[#4CAF50]' : 'text-[#FF5252]'}>{status}</span>
    </div>
  );
}

function LogEntry({ type, message, time }: { type: 'success' | 'info' | 'warning'; message: string; time: string }) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[#4CAF50]" />,
    info: <Activity className="w-5 h-5 text-[#2EBFFF]" />,
    warning: <AlertCircle className="w-5 h-5 text-[#FF9800]" />,
  };

  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      {icons[type]}
      <div className="flex-1">
        <p className="text-white">{message}</p>
        <p className="text-[#9EA7B8] mt-1">{time}</p>
      </div>
    </div>
  );
}

function ScalabilityMetric({ title, value, status }: { title: string; value: string; status: string }) {
  return (
    <div className="text-center">
      <div className="text-[#9EA7B8] mb-2">{title}</div>
      <div className="metric-value mb-2">{value}</div>
      <div className="text-[#4CAF50]">{status}</div>
    </div>
  );
}
