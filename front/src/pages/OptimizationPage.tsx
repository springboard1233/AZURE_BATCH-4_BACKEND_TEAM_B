import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, DollarSign, TrendingUp, Zap, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const overloadedResources = [
  { resource: 'US-East CPU Pool A', utilization: 94, recommendation: 'Scale up by 2 instances', savings: -240 },
  { resource: 'EU-Central Storage-01', utilization: 89, recommendation: 'Add 500GB capacity', savings: -180 },
  { resource: 'Asia-Pacific Network', utilization: 92, recommendation: 'Upgrade bandwidth', savings: -320 },
];

const underutilizedResources = [
  { resource: 'US-West CPU Pool B', utilization: 23, recommendation: 'Scale down by 3 instances', savings: 480 },
  { resource: 'South America Storage-02', utilization: 31, recommendation: 'Reduce capacity by 300GB', savings: 120 },
  { resource: 'EU-North Load Balancer', utilization: 18, recommendation: 'Consolidate instances', savings: 280 },
];

const savingsData = [
  { month: 'Jan', actual: 12400, optimized: 10200 },
  { month: 'Feb', actual: 13100, optimized: 10800 },
  { month: 'Mar', actual: 12800, optimized: 10500 },
  { month: 'Apr', actual: 14200, optimized: 11600 },
  { month: 'May', actual: 13900, optimized: 11400 },
  { month: 'Jun', actual: 15100, optimized: 12300 },
];

const efficiencyData = [
  { name: 'Optimized', value: 68, color: '#4CAF50' },
  { name: 'Underutilized', value: 22, color: '#FF9800' },
  { name: 'Overloaded', value: 10, color: '#FF5252' },
];

export default function OptimizationPage() {
  const totalSavings = underutilizedResources.reduce((sum, r) => sum + r.savings, 0);
  const additionalCosts = overloadedResources.reduce((sum, r) => sum + Math.abs(r.savings), 0);
  const netSavings = totalSavings - additionalCosts;

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="mb-4 neon-text">Resource Optimization</h1>
          <p className="text-[#9EA7B8] max-w-2xl mx-auto">
            AI-driven recommendations for optimal resource allocation and cost savings
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <SummaryCard
            icon={<DollarSign className="w-8 h-8 text-[#4CAF50]" />}
            title="Potential Monthly Savings"
            value={`$${netSavings.toLocaleString()}`}
            color="from-[#4CAF50] to-[#2d7a32]"
          />
          <SummaryCard
            icon={<TrendingUp className="w-8 h-8 text-[#2EBFFF]" />}
            title="Efficiency Score"
            value="86.5%"
            color="from-[#2EBFFF] to-[#1a8acc]"
          />
          <SummaryCard
            icon={<Zap className="w-8 h-8 text-[#B2FF59]" />}
            title="Active Recommendations"
            value="12"
            color="from-[#B2FF59] to-[#7db338]"
          />
        </div>

        {/* Overloaded Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-6 rounded-xl mb-8 hover-lift"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-[#FF5252]" />
            <h2>Overloaded Resources</h2>
          </div>
          <div className="space-y-4">
            {overloadedResources.map((resource, index) => (
              <ResourceCard
                key={index}
                resource={resource.resource}
                utilization={resource.utilization}
                recommendation={resource.recommendation}
                savings={resource.savings}
                type="overloaded"
              />
            ))}
          </div>
        </motion.div>

        {/* Underutilized Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-6 rounded-xl mb-8 hover-lift"
        >
          <div className="flex items-center gap-3 mb-6">
            <ArrowDownCircle className="w-6 h-6 text-[#FF9800]" />
            <h2>Underutilized Resources</h2>
          </div>
          <div className="space-y-4">
            {underutilizedResources.map((resource, index) => (
              <ResourceCard
                key={index}
                resource={resource.resource}
                utilization={resource.utilization}
                recommendation={resource.recommendation}
                savings={resource.savings}
                type="underutilized"
              />
            ))}
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Cost Savings Projection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl hover-lift"
          >
            <h2 className="mb-6">Cost Savings Projection</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                <XAxis dataKey="month" stroke="#9EA7B8" />
                <YAxis stroke="#9EA7B8" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #333', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="actual" stroke="#FF5252" strokeWidth={3} name="Current Cost" />
                <Line type="monotone" dataKey="optimized" stroke="#4CAF50" strokeWidth={3} name="Optimized Cost" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Efficiency Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl hover-lift"
          >
            <h2 className="mb-6">Resource Efficiency Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={efficiencyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {efficiencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #333', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Action Items */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card-premium rounded-xl p-8"
        >
          <h2 className="mb-6">Recommended Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActionItem
              title="Immediate Actions"
              items={[
                'Scale down US-West CPU Pool B',
                'Consolidate EU-North Load Balancer',
                'Review storage allocation in South America'
              ]}
              priority="high"
            />
            <ActionItem
              title="Scheduled Optimizations"
              items={[
                'Implement auto-scaling for US-East',
                'Schedule capacity review for Q3',
                'Configure cost alerts and thresholds'
              ]}
              priority="medium"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SummaryCard({ icon, title, value, color }: { icon: React.ReactNode; title: string; value: string; color: string }) {
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

function ResourceCard({ 
  resource, 
  utilization, 
  recommendation, 
  savings, 
  type 
}: { 
  resource: string; 
  utilization: number; 
  recommendation: string; 
  savings: number;
  type: 'overloaded' | 'underutilized';
}) {
  const isOverloaded = type === 'overloaded';
  const color = isOverloaded ? '#FF5252' : '#FF9800';

  return (
    <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="mb-2">{resource}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${isOverloaded ? 'bg-[#FF5252]' : 'bg-[#FF9800]'}`}
                style={{ width: `${utilization}%` }}
              ></div>
            </div>
            <span className="text-[#9EA7B8]">{utilization}%</span>
          </div>
          <p className="text-[#9EA7B8]">{recommendation}</p>
        </div>
        <div className={`ml-4 flex items-center gap-2 px-3 py-1 rounded-lg ${savings > 0 ? 'bg-[#4CAF50]/20' : 'bg-[#FF5252]/20'}`}>
          {savings > 0 ? (
            <ArrowDownCircle className="w-4 h-4 text-[#4CAF50]" />
          ) : (
            <ArrowUpCircle className="w-4 h-4 text-[#FF5252]" />
          )}
          <span className={savings > 0 ? 'text-[#4CAF50]' : 'text-[#FF5252]'}>
            ${Math.abs(savings)}
          </span>
        </div>
      </div>
    </div>
  );
}

function ActionItem({ title, items, priority }: { title: string; items: string[]; priority: 'high' | 'medium' }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h3>{title}</h3>
        <span className={`px-2 py-1 rounded text-xs ${priority === 'high' ? 'bg-[#FF5252]/20 text-[#FF5252]' : 'bg-[#FF9800]/20 text-[#FF9800]'}`}>
          {priority.toUpperCase()}
        </span>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
            <span className="text-[#9EA7B8]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
