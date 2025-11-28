import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Map, Thermometer, Calendar, DollarSign, Cpu, RefreshCw } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="mb-6 neon-text">Platform Features Overview</h1>
          <p className="text-[#9EA7B8] max-w-3xl mx-auto">
            Comprehensive AI-powered cloud intelligence with advanced forecasting, optimization, and analytics capabilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <FeatureDetailCard
            icon={<TrendingUp className="w-12 h-12 text-[#2EBFFF]" />}
            title="Real-Time Forecasting"
            description="Advanced time-series prediction using ARIMA, LSTM, and XGBoost models"
            features={[
              'CPU utilization forecasting',
              'Storage demand prediction',
              'Active user trend analysis',
              '19-day forecast horizon',
              'Confidence interval calculations'
            ]}
            gradient="from-[#2EBFFF]/20 to-[#2EBFFF]/5"
          />

          <FeatureDetailCard
            icon={<BarChart3 className="w-12 h-12 text-[#AE71FF]" />}
            title="Trend Analysis"
            description="Deep dive into historical patterns and emerging trends"
            features={[
              'Weekly pattern detection',
              'Monthly trend analysis',
              'Year-over-year comparison',
              'Anomaly detection',
              'Peak usage identification'
            ]}
            gradient="from-[#AE71FF]/20 to-[#AE71FF]/5"
          />

          <FeatureDetailCard
            icon={<Map className="w-12 h-12 text-[#B2FF59]" />}
            title="Regional Performance"
            description="Multi-region analytics with intelligent insights"
            features={[
              'Region-specific forecasts',
              'Cross-region comparison',
              'Geographic heat mapping',
              'Regional efficiency scoring',
              'Latency optimization'
            ]}
            gradient="from-[#B2FF59]/20 to-[#B2FF59]/5"
          />

          <FeatureDetailCard
            icon={<Thermometer className="w-12 h-12 text-[#FF5252]" />}
            title="Correlation Heatmaps"
            description="Visualize relationships between different metrics"
            features={[
              'CPU-Storage correlation',
              'User-Resource mapping',
              'Temporal dependency analysis',
              'Multi-metric interactions',
              'Predictive correlations'
            ]}
            gradient="from-[#FF5252]/20 to-[#FF5252]/5"
          />

          <FeatureDetailCard
            icon={<Calendar className="w-12 h-12 text-[#2EBFFF]" />}
            title="Seasonal Behavior Analysis"
            description="Understand cyclical patterns and seasonal variations"
            features={[
              'Weekly seasonality',
              'Monthly patterns',
              'Holiday impact analysis',
              'Business cycle tracking',
              'Seasonal decomposition'
            ]}
            gradient="from-[#2EBFFF]/20 to-[#2EBFFF]/5"
          />

          <FeatureDetailCard
            icon={<DollarSign className="w-12 h-12 text-[#4CAF50]" />}
            title="Cost-Savings Estimator"
            description="Calculate potential savings through optimization"
            features={[
              'Resource waste detection',
              'Optimization recommendations',
              'ROI calculations',
              'Budget forecasting',
              'Cost-benefit analysis'
            ]}
            gradient="from-[#4CAF50]/20 to-[#4CAF50]/5"
          />

          <FeatureDetailCard
            icon={<Cpu className="w-12 h-12 text-[#AE71FF]" />}
            title="Resource Optimization Engine"
            description="AI-driven resource allocation and scaling"
            features={[
              'Auto-scaling recommendations',
              'Load balancing optimization',
              'Resource right-sizing',
              'Performance tuning',
              'Capacity planning'
            ]}
            gradient="from-[#AE71FF]/20 to-[#AE71FF]/5"
          />

          <FeatureDetailCard
            icon={<RefreshCw className="w-12 h-12 text-[#B2FF59]" />}
            title="Intelligent Model Retraining"
            description="Automated model updates and performance optimization"
            features={[
              'Continuous learning',
              'Performance monitoring',
              'Auto model selection',
              'Drift detection',
              'Version management'
            ]}
            gradient="from-[#B2FF59]/20 to-[#B2FF59]/5"
          />
        </div>

        {/* Interactive 3D Feature Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card-premium rounded-2xl p-12 text-center mt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="99%" label="Accuracy" color="text-[#4CAF50]" />
            <StatCard number="12+" label="Models" color="text-[#2EBFFF]" />
            <StatCard number="19" label="Day Horizon" color="text-[#AE71FF]" />
            <StatCard number="24/7" label="Monitoring" color="text-[#B2FF59]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureDetailCard({ 
  icon, 
  title, 
  description, 
  features, 
  gradient 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  features: string[]; 
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`glass-card rounded-xl p-8 hover-lift bg-gradient-to-br ${gradient}`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-xl glass-card">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="mb-2">{title}</h3>
          <p className="text-[#9EA7B8]">{description}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-[#9EA7B8]">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF]"></div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function StatCard({ number, label, color }: { number: string; label: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`metric-value ${color} mb-2`}>{number}</div>
      <div className="text-[#9EA7B8]">{label}</div>
    </div>
  );
}
