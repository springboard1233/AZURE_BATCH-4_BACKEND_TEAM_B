import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, Users, Award, Globe, Clock, Sparkles } from 'lucide-react';

const advantages = [
  {
    icon: <Zap className="w-12 h-12 text-[#B2FF59]" />,
    title: 'Industry-Leading Accuracy',
    description: '99%+ forecast accuracy using advanced ensemble ML models',
    stats: [
      { label: 'Model Accuracy', value: '99.2%' },
      { label: 'Prediction Confidence', value: '97.8%' },
    ],
    color: 'from-[#B2FF59]/10 to-[#B2FF59]/5',
  },
  {
    icon: <Shield className="w-12 h-12 text-[#4CAF50]" />,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified with bank-level encryption',
    stats: [
      { label: 'Compliance Score', value: '100%' },
      { label: 'Security Rating', value: 'A+' },
    ],
    color: 'from-[#4CAF50]/10 to-[#4CAF50]/5',
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-[#2EBFFF]" />,
    title: 'Proven ROI',
    description: 'Average 380% ROI within first 6 months',
    stats: [
      { label: 'Avg Cost Savings', value: '32%' },
      { label: 'Payback Period', value: '3 months' },
    ],
    color: 'from-[#2EBFFF]/10 to-[#2EBFFF]/5',
  },
  {
    icon: <Clock className="w-12 h-12 text-[#AE71FF]" />,
    title: 'Real-Time Intelligence',
    description: 'Live monitoring and instant insights 24/7',
    stats: [
      { label: 'Update Frequency', value: '< 1 sec' },
      { label: 'Uptime SLA', value: '99.99%' },
    ],
    color: 'from-[#AE71FF]/10 to-[#AE71FF]/5',
  },
];

const differentiators = [
  {
    title: 'Multi-Model AI Approach',
    description: 'We use ensemble learning with ARIMA, LSTM, and XGBoost to ensure the highest accuracy',
    icon: '🤖',
  },
  {
    title: 'Intelligent Auto-Retraining',
    description: 'Models automatically retrain when drift is detected, ensuring continuous accuracy',
    icon: '🔄',
  },
  {
    title: 'Explainable AI',
    description: 'Understand why predictions are made with transparent model insights',
    icon: '🔍',
  },
  {
    title: 'Regional Optimization',
    description: 'Unique models trained for each region considering local patterns',
    icon: '🌍',
  },
  {
    title: 'Holiday Intelligence',
    description: 'Special handling for holidays and seasonal events with historical impact analysis',
    icon: '📅',
  },
  {
    title: 'Cost-Benefit Analysis',
    description: 'Every recommendation includes ROI calculations and savings projections',
    icon: '💰',
  },
];

const comparisonData = [
  {
    feature: 'Forecast Accuracy',
    us: '99.2%',
    competitor1: '94.5%',
    competitor2: '91.8%',
  },
  {
    feature: 'Model Types',
    us: '3 (ARIMA, LSTM, XGBoost)',
    competitor1: '1 (ARIMA)',
    competitor2: '2 (ARIMA, LSTM)',
  },
  {
    feature: 'Auto-Retraining',
    us: 'Intelligent',
    competitor1: 'Scheduled',
    competitor2: 'Manual',
  },
  {
    feature: 'Regional Support',
    us: 'Unlimited',
    competitor1: '5 regions',
    competitor2: '10 regions',
  },
  {
    feature: 'API Response Time',
    us: '< 100ms',
    competitor1: '< 500ms',
    competitor2: '< 300ms',
  },
];

export default function WhyChooseUsPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="mb-4 neon-text">Why Choose Us</h1>
          <p className="text-[#9EA7B8] max-w-2xl mx-auto">
            The most advanced AI-powered cloud forecasting platform trusted by 500+ enterprises
          </p>
        </motion.div>

        {/* Key Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {advantages.map((advantage, index) => (
            <AdvantageCard key={advantage.title} advantage={advantage} delay={index * 0.1} />
          ))}
        </div>

        {/* What Sets Us Apart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center">What Sets Us Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((diff, index) => (
              <DifferentiatorCard key={diff.title} diff={diff} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Competitive Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center">How We Compare</h2>
          <div className="glass-card rounded-xl p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4">Feature</th>
                  <th className="text-center py-4 px-4 bg-gradient-to-r from-[#2EBFFF]/10 to-[#AE71FF]/10">
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#2EBFFF]" />
                      <span>Our Platform</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 text-[#9EA7B8]">Competitor A</th>
                  <th className="text-center py-4 px-4 text-[#9EA7B8]">Competitor B</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={row.feature} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">{row.feature}</td>
                    <td className="py-4 px-4 text-center bg-gradient-to-r from-[#2EBFFF]/5 to-[#AE71FF]/5">
                      <span className="text-[#4CAF50]">{row.us}</span>
                    </td>
                    <td className="py-4 px-4 text-center text-[#9EA7B8]">{row.competitor1}</td>
                    <td className="py-4 px-4 text-center text-[#9EA7B8]">{row.competitor2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center">Awards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <AwardCard
              icon="🏆"
              title="Best AI Platform 2025"
              organization="Cloud Innovation Awards"
            />
            <AwardCard
              icon="⭐"
              title="Top Rated Solution"
              organization="G2 Crowd"
            />
            <AwardCard
              icon="🎖️"
              title="SOC 2 Type II"
              organization="Security Certified"
            />
            <AwardCard
              icon="🌟"
              title="Leader in Forecasting"
              organization="Gartner Magic Quadrant"
            />
          </div>
        </motion.div>

        {/* Customer Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card-premium rounded-2xl p-12"
        >
          <h2 className="mb-8 text-center">Trusted by Industry Leaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="500+" label="Enterprise Customers" />
            <StatCard number="$50M+" label="Total Savings Generated" />
            <StatCard number="98%" label="Customer Satisfaction" />
            <StatCard number="24/7" label="Expert Support" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AdvantageCard({ advantage, delay }: { advantage: typeof advantages[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className={`glass-card rounded-xl p-8 bg-gradient-to-br ${advantage.color} hover-lift`}
    >
      <div className="mb-6">{advantage.icon}</div>
      <h3 className="mb-3">{advantage.title}</h3>
      <p className="text-[#9EA7B8] mb-6">{advantage.description}</p>
      <div className="grid grid-cols-2 gap-4">
        {advantage.stats.map((stat, idx) => (
          <div key={idx} className="glass-card p-3 rounded-lg">
            <div className="text-[#9EA7B8] text-xs mb-1">{stat.label}</div>
            <div className="metric-value text-xl">{stat.value}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function DifferentiatorCard({ diff, delay }: { diff: typeof differentiators[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-xl p-6 hover-lift"
    >
      <div className="text-4xl mb-4">{diff.icon}</div>
      <h3 className="mb-2">{diff.title}</h3>
      <p className="text-[#9EA7B8]">{diff.description}</p>
    </motion.div>
  );
}

function AwardCard({ icon, title, organization }: { icon: string; title: string; organization: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card p-6 rounded-xl text-center hover-lift"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="mb-2">{title}</h3>
      <p className="text-[#9EA7B8]">{organization}</p>
    </motion.div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="metric-value mb-2 text-[#2EBFFF]">{number}</div>
      <div className="text-[#9EA7B8]">{label}</div>
    </div>
  );
}
