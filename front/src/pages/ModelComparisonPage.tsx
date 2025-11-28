import { Trophy, Zap, Shield, TrendingUp } from 'lucide-react';
import { LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const modelPredictions = [
  { month: 'Jan', arima: 65, lstm: 67, xgboost: 66, actual: 65 },
  { month: 'Feb', arima: 70, lstm: 72, xgboost: 71, actual: 72 },
  { month: 'Mar', arima: 76, lstm: 78, xgboost: 79, actual: 78 },
  { month: 'Apr', arima: 83, lstm: 85, xgboost: 84, actual: 85 },
  { month: 'May', arima: 88, lstm: 89, xgboost: 90, actual: 89 },
  { month: 'Jun', arima: 92, lstm: 95, xgboost: 93, actual: 94 },
];

const radarData = [
  { metric: 'Accuracy', arima: 85, lstm: 96, xgboost: 92 },
  { metric: 'Speed', arima: 95, lstm: 70, xgboost: 88 },
  { metric: 'Stability', arima: 90, lstm: 85, xgboost: 93 },
  { metric: 'Scalability', arima: 80, lstm: 92, xgboost: 95 },
  { metric: 'Interpretability', arima: 95, lstm: 60, xgboost: 75 },
];

const errorByRegion = [
  { region: 'US East', arima: 4.2, lstm: 2.1, xgboost: 2.8 },
  { region: 'US West', arima: 3.8, lstm: 1.9, xgboost: 2.5 },
  { region: 'EU Central', arima: 5.1, lstm: 2.4, xgboost: 3.2 },
  { region: 'Asia Pacific', arima: 4.6, lstm: 2.3, xgboost: 2.9 },
];

const modelData = [
  {
    name: 'ARIMA',
    color: '#2EBFFF',
    rmse: 4.2,
    mae: 3.1,
    trainingTime: '2 min',
    dataReq: 'Low',
    strengths: ['Fast training', 'Good for linear trends', 'Easy to interpret'],
    weaknesses: ['Limited on non-linear data', 'Requires stationarity'],
  },
  {
    name: 'LSTM',
    color: '#AE71FF',
    rmse: 2.1,
    mae: 1.6,
    trainingTime: '45 min',
    dataReq: 'High',
    strengths: ['Excellent accuracy', 'Captures complex patterns', 'Handles seasonality well'],
    weaknesses: ['Slow training', 'Requires large datasets', 'Black box model'],
  },
  {
    name: 'XGBoost',
    color: '#B2FF59',
    rmse: 2.8,
    mae: 2.0,
    trainingTime: '8 min',
    dataReq: 'Medium',
    strengths: ['Fast inference', 'Good accuracy', 'Feature importance'],
    weaknesses: ['May overfit', 'Sensitive to hyperparameters'],
  },
];

export default function ModelComparisonPage() {
  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-3">
          Model Comparison Dashboard
        </h1>
        <p className="text-[#9EA7B8] text-lg">
          Side-by-side analysis of ML forecasting models
        </p>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {modelData.map((model) => (
          <div
            key={model.name}
            className="glass-card p-6 rounded-xl border border-white/10 relative overflow-hidden group hover:border-opacity-50 transition-all"
            style={{ borderColor: model.color }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-all"
              style={{ backgroundColor: model.color }}
            ></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl" style={{ color: model.color }}>{model.name}</h3>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${model.color}20` }}
                >
                  <TrendingUp className="w-6 h-6" style={{ color: model.color }} />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-[#9EA7B8] text-sm mb-1">RMSE Score</p>
                  <p className="text-2xl">{model.rmse}</p>
                </div>
                <div>
                  <p className="text-[#9EA7B8] text-sm mb-1">MAE</p>
                  <p className="text-2xl">{model.mae}</p>
                </div>
                <div>
                  <p className="text-[#9EA7B8] text-sm mb-1">Training Time</p>
                  <p className="text-lg">{model.trainingTime}</p>
                </div>
                <div>
                  <p className="text-[#9EA7B8] text-sm mb-1">Data Required</p>
                  <p className="text-lg">{model.dataReq}</p>
                </div>
              </div>

              {/* Strengths */}
              <div className="mb-3">
                <p className="text-[#9EA7B8] text-sm mb-2">Strengths</p>
                <ul className="space-y-1">
                  {model.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-[#B2FF59] mt-1">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div>
                <p className="text-[#9EA7B8] text-sm mb-2">Weaknesses</p>
                <ul className="space-y-1">
                  {model.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-[#FF3D71] mt-1">✗</span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Multi-line Overlay - All Models */}
      <div className="glass-card p-6 rounded-xl border border-white/10 mb-8">
        <h2 className="text-2xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-6">
          Model Predictions Overlay
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={modelPredictions}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#9EA7B8" />
            <YAxis stroke="#9EA7B8" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="actual" stroke="#9EA7B8" strokeWidth={3} strokeDasharray="5 5" name="Actual Data" />
            <Line type="monotone" dataKey="arima" stroke="#2EBFFF" strokeWidth={2} name="ARIMA" />
            <Line type="monotone" dataKey="lstm" stroke="#AE71FF" strokeWidth={2} name="LSTM" />
            <Line type="monotone" dataKey="xgboost" stroke="#B2FF59" strokeWidth={2} name="XGBoost" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart - Model Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6 rounded-xl border border-white/10">
          <h2 className="text-2xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-6">
            Performance Radar
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#333" />
              <PolarAngleAxis dataKey="metric" stroke="#9EA7B8" />
              <PolarRadiusAxis stroke="#9EA7B8" />
              <Radar name="ARIMA" dataKey="arima" stroke="#2EBFFF" fill="#2EBFFF" fillOpacity={0.3} />
              <Radar name="LSTM" dataKey="lstm" stroke="#AE71FF" fill="#AE71FF" fillOpacity={0.3} />
              <Radar name="XGBoost" dataKey="xgboost" stroke="#B2FF59" fill="#B2FF59" fillOpacity={0.3} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Error by Region */}
        <div className="glass-card p-6 rounded-xl border border-white/10">
          <h2 className="text-2xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-6">
            Error Rates by Region
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={errorByRegion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="region" stroke="#9EA7B8" />
              <YAxis stroke="#9EA7B8" label={{ value: 'RMSE', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="arima" fill="#2EBFFF" name="ARIMA" />
              <Bar dataKey="lstm" fill="#AE71FF" name="LSTM" />
              <Bar dataKey="xgboost" fill="#B2FF59" name="XGBoost" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-xl border border-white/10 relative overflow-hidden group hover:border-[#B2FF59] transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#B2FF59] opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#B2FF59] to-[#92DF39] flex items-center justify-center">
                <Trophy className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-lg">Best for CPU</h3>
            </div>
            <div className="text-3xl mb-2">LSTM</div>
            <p className="text-[#9EA7B8] text-sm">Lowest error rate: 2.1 RMSE</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-white/10 relative overflow-hidden group hover:border-[#AE71FF] transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#AE71FF] opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#AE71FF] to-[#8E51DF] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg">Best for Storage</h3>
            </div>
            <div className="text-3xl mb-2">XGBoost</div>
            <p className="text-[#9EA7B8] text-sm">Fast and accurate predictions</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-white/10 relative overflow-hidden group hover:border-[#2EBFFF] transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2EBFFF] opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EBFFF] to-[#1DA1E0] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg">Most Stable</h3>
            </div>
            <div className="text-3xl mb-2">XGBoost</div>
            <p className="text-[#9EA7B8] text-sm">93% stability score globally</p>
          </div>
        </div>
      </div>
    </div>
  );
}
