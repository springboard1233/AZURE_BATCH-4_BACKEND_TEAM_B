import { X, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Info, Download, BarChart3, MapPin, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LucideIcon } from "lucide-react";

interface KPIModalData {
  title: string;
  icon: LucideIcon;
  currentValue: number;
  unit: string;
  average: number;
  peak: number;
  trend: number; // percentage change
  volatility: number; // percentage
  regionRanking: number;
  totalRegions: number;
  anomalyCount: number;
  forecastValue: number;
  trendData: { time: string; value: number }[];
  comparisonData: { label: string; value: number; color: string }[];
  distributionData: { range: string; count: number }[];
  insights: {
    positive: string[];
    neutral: string[];
    risk: string[];
  };
}

interface KPIModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: KPIModalData;
}

export function KPIModal({ isOpen, onClose, data }: KPIModalProps) {
  const getTrendIcon = () => {
    if (data.trend > 0) return <TrendingUp className="w-5 h-5 text-green-400" />;
    if (data.trend < 0) return <TrendingDown className="w-5 h-5 text-red-400" />;
    return <Minus className="w-5 h-5 text-gray-400" />;
  };

  const getTrendColor = () => {
    if (data.trend > 0) return "text-green-400";
    if (data.trend < 0) return "text-red-400";
    return "text-gray-400";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Translucent Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, type: "spring", damping: 25 }}
              className="w-full max-w-5xl max-h-[90vh] overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glassmorphism Modal Card */}
              <div 
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(15, 20, 30, 0.95)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(46, 191, 255, 0.3)",
                  boxShadow: `
                    0 0 60px rgba(46, 191, 255, 0.3),
                    0 0 100px rgba(174, 113, 255, 0.2),
                    inset 0 1px 1px rgba(255, 255, 255, 0.1)
                  `
                }}
              >
                {/* Neon Glow Top Border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />
                
                {/* Header */}
                <div className="relative p-6 border-b border-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="p-3 rounded-xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(46, 191, 255, 0.15), rgba(174, 113, 255, 0.15))",
                          border: "1px solid rgba(46, 191, 255, 0.3)",
                          boxShadow: "0 0 20px rgba(46, 191, 255, 0.3)"
                        }}
                      >
                        <data.icon className="w-7 h-7 text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl text-white mb-1">{data.title}</h2>
                        <p className="text-sm text-gray-400">Real-time Performance Analytics</p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-red-400/50 group"
                    >
                      <X className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-180px)] custom-scrollbar">
                  {/* KPI Summary Metrics */}
                  <div className="p-6 border-b border-white/10">
                    <h3 className="text-sm uppercase tracking-wider text-cyan-400 mb-4">Key Performance Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {/* Current Value */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(46, 191, 255, 0.1), rgba(174, 113, 255, 0.05))",
                          border: "1px solid rgba(46, 191, 255, 0.2)"
                        }}
                      >
                        <p className="text-xs text-gray-400 mb-1">Current</p>
                        <p className="text-2xl text-white">{data.currentValue}{data.unit}</p>
                      </div>

                      {/* Average */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <p className="text-xs text-gray-400 mb-1">Average</p>
                        <p className="text-2xl text-gray-300">{data.average}{data.unit}</p>
                      </div>

                      {/* Peak */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <p className="text-xs text-gray-400 mb-1">Peak</p>
                        <p className="text-2xl text-purple-300">{data.peak}{data.unit}</p>
                      </div>

                      {/* Trend */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <p className="text-xs text-gray-400 mb-1">Trend (7d)</p>
                        <div className="flex items-center gap-2">
                          {getTrendIcon()}
                          <p className={`text-2xl ${getTrendColor()}`}>{Math.abs(data.trend)}%</p>
                        </div>
                      </div>

                      {/* Volatility */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <p className="text-xs text-gray-400 mb-1">Volatility</p>
                        <p className="text-2xl text-orange-300">{data.volatility}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Mini Charts Section */}
                  <div className="p-6 border-b border-white/10">
                    <h3 className="text-sm uppercase tracking-wider text-cyan-400 mb-4">Visual Analytics</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Trend Line Chart */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <p className="text-sm text-gray-300 mb-3">7-Day Trend</p>
                        <ResponsiveContainer width="100%" height={150}>
                          <AreaChart data={data.trendData}>
                            <defs>
                              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2EBFFF" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#2EBFFF" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="time" stroke="#6B7280" fontSize={10} />
                            <YAxis stroke="#6B7280" fontSize={10} />
                            <Tooltip 
                              contentStyle={{ 
                                background: "rgba(15, 20, 30, 0.95)", 
                                border: "1px solid rgba(46, 191, 255, 0.3)",
                                borderRadius: "8px",
                                color: "#fff"
                              }} 
                            />
                            <Area 
                              type="monotone" 
                              dataKey="value" 
                              stroke="#2EBFFF" 
                              strokeWidth={2}
                              fill="url(#trendGradient)" 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Comparison Bar Chart */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <p className="text-sm text-gray-300 mb-3">Regional Comparison</p>
                        <ResponsiveContainer width="100%" height={150}>
                          <BarChart data={data.comparisonData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="label" stroke="#6B7280" fontSize={10} />
                            <YAxis stroke="#6B7280" fontSize={10} />
                            <Tooltip 
                              contentStyle={{ 
                                background: "rgba(15, 20, 30, 0.95)", 
                                border: "1px solid rgba(46, 191, 255, 0.3)",
                                borderRadius: "8px",
                                color: "#fff"
                              }} 
                            />
                            <Bar dataKey="value" fill="#AE71FF" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Distribution Chart */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <p className="text-sm text-gray-300 mb-3">Value Distribution</p>
                        <ResponsiveContainer width="100%" height={150}>
                          <LineChart data={data.distributionData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="range" stroke="#6B7280" fontSize={10} />
                            <YAxis stroke="#6B7280" fontSize={10} />
                            <Tooltip 
                              contentStyle={{ 
                                background: "rgba(15, 20, 30, 0.95)", 
                                border: "1px solid rgba(46, 191, 255, 0.3)",
                                borderRadius: "8px",
                                color: "#fff"
                              }} 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="count" 
                              stroke="#4ECDC4" 
                              strokeWidth={2}
                              dot={{ fill: "#4ECDC4", r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* AI Insights Panel */}
                  <div className="p-6 border-b border-white/10">
                    <h3 className="text-sm uppercase tracking-wider text-cyan-400 mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      AI-Powered Insights
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Positive Insights */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(34, 197, 94, 0.02))",
                          border: "1px solid rgba(34, 197, 94, 0.2)"
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <p className="text-sm text-green-400">Positive</p>
                        </div>
                        <ul className="space-y-2">
                          {data.insights.positive.map((insight, idx) => (
                            <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                              <span className="text-green-400 mt-0.5">•</span>
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Neutral Insights */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.02))",
                          border: "1px solid rgba(59, 130, 246, 0.2)"
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Info className="w-5 h-5 text-blue-400" />
                          <p className="text-sm text-blue-400">Observations</p>
                        </div>
                        <ul className="space-y-2">
                          {data.insights.neutral.map((insight, idx) => (
                            <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                              <span className="text-blue-400 mt-0.5">•</span>
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Risk Insights */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.02))",
                          border: "1px solid rgba(239, 68, 68, 0.2)"
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <p className="text-sm text-red-400">Risks</p>
                        </div>
                        <ul className="space-y-2">
                          {data.insights.risk.map((insight, idx) => (
                            <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                              <span className="text-red-400 mt-0.5">•</span>
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Supporting Data */}
                  <div className="p-6">
                    <h3 className="text-sm uppercase tracking-wider text-cyan-400 mb-4">Additional Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Region Ranking */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-purple-400" />
                          <p className="text-xs text-gray-400">Region Ranking</p>
                        </div>
                        <p className="text-xl text-white">
                          #{data.regionRanking} <span className="text-sm text-gray-400">of {data.totalRegions}</span>
                        </p>
                      </div>

                      {/* Anomaly Count */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-orange-400" />
                          <p className="text-xs text-gray-400">Anomalies Detected</p>
                        </div>
                        <p className="text-xl text-orange-300">{data.anomalyCount}</p>
                      </div>

                      {/* Forecast Value */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-cyan-400" />
                          <p className="text-xs text-gray-400">Next Week Forecast</p>
                        </div>
                        <p className="text-xl text-cyan-300">{data.forecastValue}{data.unit}</p>
                      </div>

                      {/* Model Confidence */}
                      <div 
                        className="p-4 rounded-xl"
                        style={{
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="w-4 h-4 text-green-400" />
                          <p className="text-xs text-gray-400">Model Confidence</p>
                        </div>
                        <p className="text-xl text-green-300">94.2%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div 
                  className="p-6 border-t border-white/10"
                  style={{
                    background: "rgba(15, 20, 30, 0.8)"
                  }}
                >
                  <div className="flex flex-wrap items-center justify-end gap-3">
                    <button
                      onClick={onClose}
                      className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-all"
                    >
                      Close
                    </button>
                    <button
                      className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-purple-400/30 text-purple-300 hover:border-purple-400/50 transition-all flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Report
                    </button>
                    <button
                      className="px-6 py-3 rounded-lg transition-all flex items-center gap-2"
                      style={{
                        background: "linear-gradient(135deg, #2EBFFF, #AE71FF)",
                        boxShadow: "0 0 20px rgba(46, 191, 255, 0.4)"
                      }}
                    >
                      <BarChart3 className="w-4 h-4" />
                      View Full Dashboard
                    </button>
                  </div>
                </div>

                {/* Neon Glow Bottom Border */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-70" />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
