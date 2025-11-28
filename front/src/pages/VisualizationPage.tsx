import { useState } from 'react';
import { Download, Calendar, TrendingUp } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const historicalVsPredicted = [
  { month: 'Jan', historical: 65, predicted: 67 },
  { month: 'Feb', historical: 72, predicted: 70 },
  { month: 'Mar', historical: 78, predicted: 80 },
  { month: 'Apr', historical: 85, predicted: 84 },
  { month: 'May', historical: 82, predicted: 85 },
  { month: 'Jun', historical: 90, predicted: 89 },
  { month: 'Jul', historical: null, predicted: 93 },
  { month: 'Aug', historical: null, predicted: 96 },
];

const regionComparison = [
  { time: 'Week 1', usEast: 75, usWest: 68, euCentral: 82, asiaPacific: 71 },
  { time: 'Week 2', usEast: 82, usWest: 74, euCentral: 85, asiaPacific: 76 },
  { time: 'Week 3', usEast: 88, usWest: 79, euCentral: 90, asiaPacific: 82 },
  { time: 'Week 4', usEast: 92, usWest: 85, euCentral: 93, asiaPacific: 88 },
];

const peakPeriods = [
  { hour: 0, day: 'Mon', value: 45, size: 450 },
  { hour: 8, day: 'Mon', value: 82, size: 820 },
  { hour: 12, day: 'Mon', value: 95, size: 950 },
  { hour: 18, day: 'Mon', value: 78, size: 780 },
  { hour: 0, day: 'Tue', value: 42, size: 420 },
  { hour: 8, day: 'Tue', value: 85, size: 850 },
  { hour: 12, day: 'Tue', value: 98, size: 980 },
  { hour: 18, day: 'Tue', value: 81, size: 810 },
  { hour: 0, day: 'Wed', value: 48, size: 480 },
  { hour: 8, day: 'Wed', value: 88, size: 880 },
  { hour: 12, day: 'Wed', value: 92, size: 920 },
  { hour: 18, day: 'Wed', value: 76, size: 760 },
];

const heatmapData = [
  { day: 'Mon', '00h': 35, '04h': 28, '08h': 72, '12h': 95, '16h': 88, '20h': 65 },
  { day: 'Tue', '00h': 32, '04h': 25, '08h': 75, '12h': 98, '16h': 85, '20h': 62 },
  { day: 'Wed', '00h': 38, '04h': 30, '08h': 78, '12h': 92, '16h': 82, '20h': 68 },
  { day: 'Thu', '00h': 40, '04h': 32, '08h': 80, '12h': 96, '16h': 90, '20h': 70 },
  { day: 'Fri', '00h': 36, '04h': 28, '08h': 76, '12h': 93, '16h': 87, '20h': 72 },
  { day: 'Sat', '00h': 45, '04h': 38, '08h': 65, '12h': 80, '16h': 75, '20h': 68 },
  { day: 'Sun', '00h': 48, '04h': 42, '08h': 62, '12h': 78, '16h': 72, '20h': 65 },
];

export default function VisualizationPage() {
  const [duration, setDuration] = useState('30D');
  const [metric, setMetric] = useState('CPU');

  const getHeatColor = (value: number) => {
    if (value >= 90) return '#FF3D71';
    if (value >= 70) return '#FFA500';
    if (value >= 50) return '#2EBFFF';
    return '#4A5568';
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-3">
          Visualization of Forecasts
        </h1>
        <p className="text-[#9EA7B8] text-lg">
          Immersive interactive charts and analytics
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        {/* Duration Toggle */}
        <div className="flex items-center gap-2 glass-card p-1 rounded-lg border border-white/10">
          {['7D', '14D', '30D', '90D'].map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`px-4 py-2 rounded-lg transition-all ${
                duration === d
                  ? 'bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] text-white'
                  : 'text-[#9EA7B8] hover:text-white'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Metric Switcher */}
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="glass-card px-4 py-2 rounded-lg border border-white/10 text-white focus:border-[#2EBFFF] focus:outline-none"
        >
          <option value="CPU">CPU Usage</option>
          <option value="STORAGE">Storage</option>
          <option value="USERS">Active Users</option>
        </select>

        {/* Download Button */}
        <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] rounded-lg hover:opacity-80 transition-all">
          <Download className="w-4 h-4" />
          Download Charts
        </button>
      </div>

      {/* Historical vs Predicted Chart */}
      <div className="glass-card p-6 rounded-xl border border-white/10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2EBFFF] opacity-5 blur-3xl rounded-full"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EBFFF] to-[#1DA1E0] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
                Historical vs Predicted
              </h2>
              <p className="text-[#9EA7B8] text-sm">Comparing actual data with AI predictions</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={historicalVsPredicted}>
              <defs>
                <linearGradient id="historicalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9EA7B8" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#9EA7B8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2EBFFF" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2EBFFF" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="historical"
                stroke="#9EA7B8"
                strokeWidth={2}
                fill="url(#historicalGrad)"
                name="Historical Data"
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="#2EBFFF"
                strokeWidth={3}
                fill="url(#predictedGrad)"
                name="Predicted"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Region Comparison Chart */}
      <div className="glass-card p-6 rounded-xl border border-white/10 mb-8">
        <h2 className="text-2xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-6">
          Region Comparison
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={regionComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#9EA7B8" />
            <YAxis stroke="#9EA7B8" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="usEast" stroke="#2EBFFF" strokeWidth={2} name="US East" />
            <Line type="monotone" dataKey="usWest" stroke="#AE71FF" strokeWidth={2} name="US West" />
            <Line type="monotone" dataKey="euCentral" stroke="#FF3D71" strokeWidth={2} name="EU Central" />
            <Line type="monotone" dataKey="asiaPacific" stroke="#B2FF59" strokeWidth={2} name="Asia Pacific" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bubble Chart - Peak Periods */}
      <div className="glass-card p-6 rounded-xl border border-white/10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#AE71FF] opacity-5 blur-3xl rounded-full"></div>
        <div className="relative z-10">
          <h2 className="text-2xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-6">
            Peak Period Analysis
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="hour" type="number" name="Hour" stroke="#9EA7B8" />
              <YAxis dataKey="value" name="Usage %" stroke="#9EA7B8" />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Scatter name="Peak Periods" data={peakPeriods} fill="#2EBFFF">
                {peakPeriods.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value > 90 ? '#FF3D71' : entry.value > 70 ? '#FFA500' : '#2EBFFF'} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heatmap - Resource Load Calendar */}
      <div className="glass-card p-6 rounded-xl border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#AE71FF] to-[#8E51DF] flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
              Resource Load Heatmap
            </h2>
            <p className="text-[#9EA7B8] text-sm">Weekly patterns visualization</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2 text-[#9EA7B8]">Day</th>
                <th className="text-center p-2 text-[#9EA7B8]">00h</th>
                <th className="text-center p-2 text-[#9EA7B8]">04h</th>
                <th className="text-center p-2 text-[#9EA7B8]">08h</th>
                <th className="text-center p-2 text-[#9EA7B8]">12h</th>
                <th className="text-center p-2 text-[#9EA7B8]">16h</th>
                <th className="text-center p-2 text-[#9EA7B8]">20h</th>
              </tr>
            </thead>
            <tbody>
              {heatmapData.map((row) => (
                <tr key={row.day}>
                  <td className="p-2">{row.day}</td>
                  {(['00h', '04h', '08h', '12h', '16h', '20h'] as const).map((time) => (
                    <td key={time} className="p-2">
                      <div
                        className="w-16 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                        style={{
                          backgroundColor: getHeatColor(row[time]),
                          boxShadow: row[time] > 90 ? `0 0 20px ${getHeatColor(row[time])}` : 'none',
                        }}
                      >
                        <span className="text-sm">{row[time]}%</span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#4A5568' }}></div>
            <span className="text-sm text-[#9EA7B8]">Low (0-50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#2EBFFF' }}></div>
            <span className="text-sm text-[#9EA7B8]">Medium (50-70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFA500' }}></div>
            <span className="text-sm text-[#9EA7B8]">High (70-90%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FF3D71' }}></div>
            <span className="text-sm text-[#9EA7B8]">Critical (90%+)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
