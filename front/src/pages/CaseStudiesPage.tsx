import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Zap, Users, ArrowRight } from 'lucide-react';
import { Link } from '../context/NavigationContext';

const caseStudies = [
  {
    company: 'TechCorp Global',
    industry: 'SaaS Technology',
    logo: '🚀',
    challenge: 'Managing cloud costs across 15 regions with unpredictable usage patterns',
    solution: 'Implemented AI-powered forecasting with intelligent auto-scaling',
    results: [
      { metric: 'Cost Reduction', value: '32%', icon: <DollarSign className="w-5 h-5" /> },
      { metric: 'Efficiency Gain', value: '45%', icon: <Zap className="w-5 h-5" /> },
      { metric: 'Forecast Accuracy', value: '97.2%', icon: <TrendingUp className="w-5 h-5" /> },
    ],
    testimonial: 'The platform transformed our cloud operations. We reduced costs by $180K monthly while improving performance.',
    author: 'Sarah Chen, CTO',
    color: 'from-[#2EBFFF]/10 to-[#2EBFFF]/5',
  },
  {
    company: 'CloudScale Industries',
    industry: 'E-commerce',
    logo: '🛒',
    challenge: 'Handling massive traffic spikes during seasonal sales events',
    solution: 'Deployed ML models with holiday impact analysis and predictive scaling',
    results: [
      { metric: 'Uptime', value: '99.99%', icon: <Zap className="w-5 h-5" /> },
      { metric: 'Cost Savings', value: '$250K/yr', icon: <DollarSign className="w-5 h-5" /> },
      { metric: 'Response Time', value: '-40%', icon: <TrendingUp className="w-5 h-5" /> },
    ],
    testimonial: 'Black Friday went flawlessly. The AI predicted our traffic surge with incredible accuracy.',
    author: 'Michael Rodriguez, VP Engineering',
    color: 'from-[#AE71FF]/10 to-[#AE71FF]/5',
  },
  {
    company: 'DataFlow Systems',
    industry: 'Data Analytics',
    logo: '📊',
    challenge: 'Optimizing compute resources for unpredictable data processing workloads',
    solution: 'Integrated real-time forecasting with automated resource optimization',
    results: [
      { metric: 'Processing Speed', value: '+55%', icon: <Zap className="w-5 h-5" /> },
      { metric: 'Cost Per Query', value: '-28%', icon: <DollarSign className="w-5 h-5" /> },
      { metric: 'Resource Utilization', value: '89%', icon: <TrendingUp className="w-5 h-5" /> },
    ],
    testimonial: 'Our data pipelines are now 55% faster and significantly more cost-effective.',
    author: 'Emily Watson, DevOps Lead',
    color: 'from-[#B2FF59]/10 to-[#B2FF59]/5',
  },
  {
    company: 'FinTech Solutions',
    industry: 'Financial Services',
    logo: '💰',
    challenge: 'Meeting compliance requirements while optimizing cloud infrastructure costs',
    solution: 'Enterprise deployment with custom models and dedicated support',
    results: [
      { metric: 'Compliance Score', value: '100%', icon: <TrendingUp className="w-5 h-5" /> },
      { metric: 'Annual Savings', value: '$420K', icon: <DollarSign className="w-5 h-5" /> },
      { metric: 'Model Accuracy', value: '98.5%', icon: <Zap className="w-5 h-5" /> },
    ],
    testimonial: 'Security and optimization together - exactly what we needed for our regulated environment.',
    author: 'David Park, Chief Architect',
    color: 'from-[#4CAF50]/10 to-[#4CAF50]/5',
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="mb-4 neon-text">Customer Success Stories</h1>
          <p className="text-[#9EA7B8] max-w-2xl mx-auto">
            See how leading companies transformed their cloud operations with AI-powered forecasting
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          <StatCard title="Companies Served" value="500+" color="from-[#2EBFFF] to-[#1a8acc]" />
          <StatCard title="Total Cost Savings" value="$50M+" color="from-[#4CAF50] to-[#2d7a32]" />
          <StatCard title="Average ROI" value="380%" color="from-[#AE71FF] to-[#7b4db3]" />
          <StatCard title="Customer Satisfaction" value="98%" color="from-[#B2FF59] to-[#7db338]" />
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.company} study={study} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card-premium rounded-2xl p-12 text-center mt-16"
        >
          <h2 className="mb-4">Ready to Join These Success Stories?</h2>
          <p className="text-[#9EA7B8] mb-8 max-w-2xl mx-auto">
            Start your journey to optimized cloud operations with AI-powered forecasting
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/pricing" className="btn-secondary">
              <span>View Pricing</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`glass-card-premium rounded-xl p-6 bg-gradient-to-br ${color}`}
    >
      <div className="metric-value mb-2">{value}</div>
      <div className="text-[#9EA7B8]">{title}</div>
    </motion.div>
  );
}

function CaseStudyCard({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`glass-card rounded-2xl p-8 bg-gradient-to-br ${study.color}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="lg:col-span-1">
          <div className="text-6xl mb-4">{study.logo}</div>
          <h2 className="mb-2">{study.company}</h2>
          <div className="text-[#2EBFFF] mb-6">{study.industry}</div>
          
          <div className="space-y-4">
            <div>
              <div className="text-[#9EA7B8] mb-1">Challenge</div>
              <p>{study.challenge}</p>
            </div>
            <div>
              <div className="text-[#9EA7B8] mb-1">Solution</div>
              <p>{study.solution}</p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          <h3 className="mb-6">Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {study.results.map((result, idx) => (
              <div key={idx} className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2 text-[#2EBFFF]">
                  {result.icon}
                  <span className="text-[#9EA7B8]">{result.metric}</span>
                </div>
                <div className="metric-value">{result.value}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="glass-card p-6 rounded-xl">
            <p className="text-[#9EA7B8] italic mb-4">"{study.testimonial}"</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div>{study.author}</div>
                <div className="text-[#9EA7B8]">{study.company}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
