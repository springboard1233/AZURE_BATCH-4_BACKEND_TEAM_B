import { motion } from 'framer-motion';
import { Users, TrendingUp, Calendar, BarChart3, Sparkles, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const seasonalTrends = [
  { month: 'Jan', users: 1420, growth: 2.3 },
  { month: 'Feb', users: 1580, growth: 11.3 },
  { month: 'Mar', users: 1650, growth: 4.4 },
  { month: 'Apr', users: 1720, growth: 4.2 },
  { month: 'May', users: 1890, growth: 9.9 },
  { month: 'Jun', users: 2100, growth: 11.1 },
  { month: 'Jul', users: 1950, growth: -7.1 },
  { month: 'Aug', users: 1880, growth: -3.6 },
  { month: 'Sep', users: 2050, growth: 9.0 },
  { month: 'Oct', users: 2180, growth: 6.3 },
  { month: 'Nov', users: 2350, growth: 7.8 },
  { month: 'Dec', users: 2520, growth: 7.2 },
];

const holidayImpact = [
  { period: 'New Year', regular: 1450, holiday: 2100, impact: 44.8 },
  { period: 'Easter', regular: 1620, holiday: 1880, impact: 16.0 },
  { period: 'Summer', regular: 1750, holiday: 1520, impact: -13.1 },
  { period: 'Thanksgiving', regular: 2100, holiday: 2680, impact: 27.6 },
  { period: 'Black Friday', regular: 2150, holiday: 3200, impact: 48.8 },
  { period: 'Christmas', regular: 2200, holiday: 2900, impact: 31.8 },
];

const dailyActivity = [
  { hour: '00:00', activity: 320 },
  { hour: '03:00', activity: 180 },
  { hour: '06:00', activity: 450 },
  { hour: '09:00', activity: 1200 },
  { hour: '12:00', activity: 1850 },
  { hour: '15:00', activity: 1650 },
  { hour: '18:00', activity: 1420 },
  { hour: '21:00', activity: 980 },
];

const behavioralMetrics = [
  { metric: 'Predictability', value: 87 },
  { metric: 'Consistency', value: 92 },
  { metric: 'Volatility', value: 34 },
  { metric: 'Growth', value: 78 },
  { metric: 'Retention', value: 94 },
  { metric: 'Engagement', value: 82 },
];

export default function BehaviorIntelligencePage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="mb-4 neon-text">User Behavior Intelligence</h1>
          <p className="text-[#9EA7B8] max-w-2xl mx-auto">
            Advanced analytics on user patterns, seasonal trends, and behavioral insights
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            icon={<Users className="w-8 h-8 text-[#2EBFFF]" />}
            title="Active Users"
            value="2,520"
            change="+7.2%"
            color="from-[#2EBFFF] to-[#1a8acc]"
          />
          <MetricCard
            icon={<TrendingUp className="w-8 h-8 text-[#4CAF50]" />}
            title="Predictability Score"
            value="87%"
            change="+3.1%"
            color="from-[#4CAF50] to-[#2d7a32]"
          />
          <MetricCard
            icon={<Sparkles className="w-8 h-8 text-[#AE71FF]" />}
            title="Peak-to-Trough Ratio"
            value="5.8x"
            change="-0.4x"
            color="from-[#AE71FF] to-[#7b4db3]"
          />
          <MetricCard
            icon={<Calendar className="w-8 h-8 text-[#B2FF59]" />}
            title="Seasonal Variation"
            value="±18%"
            change="+2.1%"
            color="from-[#B2FF59] to-[#7db338]"
          />
        </div>

        {/* Seasonal Trends */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-6 rounded-xl mb-8 hover-lift"
        >
          <h2 className="mb-6">Seasonal User Trends</h2>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={seasonalTrends}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2EBFFF" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2EBFFF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
              <XAxis dataKey="month" stroke="#9EA7B8" />
              <YAxis stroke="#9EA7B8" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #333', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="users" stroke="#2EBFFF" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Holiday Impact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-6 rounded-xl mb-8 hover-lift"
        >
          <h2 className="mb-6">Holiday vs Regular Usage</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={holidayImpact}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
              <XAxis dataKey="period" stroke="#9EA7B8" />
              <YAxis stroke="#9EA7B8" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #333', borderRadius: '8px' }} />
              <Bar dataKey="regular" fill="#9EA7B8" radius={[8, 8, 0, 0]} name="Regular Days" />
              <Bar dataKey="holiday" fill="#2EBFFF" radius={[8, 8, 0, 0]} name="Holiday Period" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Daily Activity and Behavioral Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Activity Variation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl hover-lift"
          >
            <h2 className="mb-6">Daily Activity Variation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                <XAxis dataKey="hour" stroke="#9EA7B8" />
                <YAxis stroke="#9EA7B8" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #333', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="activity" stroke="#AE71FF" strokeWidth={3} dot={{ fill: '#AE71FF', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Behavioral Metrics Radar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl hover-lift"
          >
            <h2 className="mb-6">Behavioral Metrics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={behavioralMetrics}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="metric" stroke="#9EA7B8" />
                <PolarRadiusAxis stroke="#9EA7B8" />
                <Radar name="Score" dataKey="value" stroke="#B2FF59" fill="#B2FF59" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #333', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Insights Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <InsightCard
            icon={<TrendingUp className="w-8 h-8 text-[#4CAF50]" />}
            title="Growth Pattern"
            insight="Consistent month-over-month growth with Q4 showing strongest performance"
            trend="positive"
          />
          <InsightCard
            icon={<Clock className="w-8 h-8 text-[#2EBFFF]" />}
            title="Peak Hours"
            insight="Maximum activity between 12:00-15:00, lowest during early morning (03:00-06:00)"
            trend="neutral"
          />
          <InsightCard
            icon={<Calendar className="w-8 h-8 text-[#AE71FF]" />}
            title="Holiday Impact"
            insight="Black Friday shows highest spike (+48.8%), Summer shows decline (-13.1%)"
            trend="positive"
          />
        </motion.div>
      </div>
    </div>
  );
}

function MetricCard({ 
  icon, 
  title, 
  value, 
  change, 
  color 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  change: string;
  color: string;
}) {
  const isPositive = change.startsWith('+');
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`glass-card-premium rounded-xl p-6 bg-gradient-to-br ${color}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl glass-card">
          {icon}
        </div>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-[#4CAF50]' : 'text-[#FF5252]'}`}>
          <TrendingUp className={`w-4 h-4 ${!isPositive ? 'rotate-180' : ''}`} />
          <span>{change}</span>
        </div>
      </div>
      <div className="text-[#9EA7B8] mb-1">{title}</div>
      <div className="metric-value">{value}</div>
    </motion.div>
  );
}

function InsightCard({ 
  icon, 
  title, 
  insight, 
  trend 
}: { 
  icon: React.ReactNode; 
  title: string; 
  insight: string;
  trend: 'positive' | 'negative' | 'neutral';
}) {
  const trendColors = {
    positive: 'from-[#4CAF50]/10 to-[#4CAF50]/5',
    negative: 'from-[#FF5252]/10 to-[#FF5252]/5',
    neutral: 'from-[#2EBFFF]/10 to-[#2EBFFF]/5',
  };

  return (
    <div className={`glass-card rounded-xl p-6 bg-gradient-to-br ${trendColors[trend]} hover-lift`}>
      <div className="mb-4">{icon}</div>
      <h3 className="mb-3">{title}</h3>
      <p className="text-[#9EA7B8]">{insight}</p>
    </div>
  );
}
