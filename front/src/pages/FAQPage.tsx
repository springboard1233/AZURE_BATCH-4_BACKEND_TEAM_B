import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Search, HelpCircle, MessageCircle } from 'lucide-react';

const faqCategories = [
  {
    category: 'Getting Started',
    icon: '🚀',
    questions: [
      {
        q: 'How quickly can I get started with the platform?',
        a: 'You can be up and running in under 10 minutes. Simply sign up, connect your Azure account via our secure OAuth integration, and our AI will automatically start analyzing your cloud resources. The first forecast will be ready within 15 minutes.',
      },
      {
        q: 'Do I need machine learning expertise to use this platform?',
        a: 'Not at all! Our platform is designed for cloud engineers and DevOps teams without requiring ML expertise. The AI models are pre-trained and automatically optimize themselves. You simply configure your preferences and review the insights.',
      },
      {
        q: 'What cloud providers are supported?',
        a: 'We currently support Microsoft Azure, AWS, and Google Cloud Platform. Multi-cloud environments are fully supported, allowing you to monitor and forecast across all your cloud infrastructure from a single dashboard.',
      },
      {
        q: 'Is there a free trial available?',
        a: 'Yes! We offer a 14-day free trial with full access to all Professional tier features. No credit card required to start. You can test all forecasting models, integrations, and optimization features during your trial.',
      },
    ],
  },
  {
    category: 'Technical & Integration',
    icon: '⚙️',
    questions: [
      {
        q: 'How does the platform integrate with my existing infrastructure?',
        a: 'Integration is seamless and non-invasive. We use read-only API connections to your cloud providers monitoring services (Azure Monitor, CloudWatch, etc.). No agents to install, no code changes required. Setup takes 5-10 minutes via our guided wizard.',
      },
      {
        q: 'What data does the platform collect?',
        a: 'We collect only performance and usage metrics: CPU utilization, memory usage, storage consumption, network traffic, and cost data. We never access your application data, code, or customer information. All data is encrypted in transit and at rest.',
      },
      {
        q: 'Can I use my own machine learning models?',
        a: 'Enterprise customers can upload custom models or fine-tune our existing models with their specific data. Our platform supports TensorFlow, PyTorch, and scikit-learn models. Contact our team for custom model integration.',
      },
      {
        q: 'What is the API rate limit?',
        a: 'Rate limits vary by plan: Professional (1,000 requests/hour), Business (5,000 requests/hour), Enterprise (unlimited with custom quotas). All plans include burst capacity for short-term spikes.',
      },
    ],
  },
  {
    category: 'Forecasting & Accuracy',
    icon: '📊',
    questions: [
      {
        q: 'How accurate are the forecasts?',
        a: 'Our ensemble ML models achieve 99%+ accuracy for short-term forecasts (1-7 days) and 95%+ for medium-term forecasts (8-19 days). Accuracy varies by metric type and historical data availability. We provide confidence intervals with every prediction.',
      },
      {
        q: 'How far into the future can you forecast?',
        a: 'Standard forecasts extend 14 days. Enterprise customers can request extended 30-day or 90-day forecasts. For seasonal planning, we offer special holiday and event-based forecasting up to 6 months ahead.',
      },
      {
        q: 'What happens if the forecast is wrong?',
        a: 'Our models automatically detect prediction errors and retrain when accuracy drops below threshold. We also provide confidence intervals so you can see prediction uncertainty. Historical accuracy reports help you understand model performance over time.',
      },
      {
        q: 'Can the system predict sudden traffic spikes?',
        a: 'Yes! Our anomaly detection algorithms identify unusual patterns and potential spikes. Combined with holiday/event calendars, we can predict most traffic surges. For unpredictable events, we offer real-time alerting and automatic scaling recommendations.',
      },
    ],
  },
  {
    category: 'Security & Compliance',
    icon: '🔒',
    questions: [
      {
        q: 'Is the platform SOC 2 compliant?',
        a: 'Yes, we are SOC 2 Type II certified. We undergo annual audits and maintain compliance with industry security standards including ISO 27001, GDPR, and HIPAA (for healthcare customers). Full audit reports available on request.',
      },
      {
        q: 'Where is my data stored?',
        a: 'Data is stored in Azure data centers in your chosen region. Enterprise customers can specify exact geographic locations. We support data residency requirements for EU, UK, Canada, Australia, and other regions.',
      },
      {
        q: 'Can I control who has access to forecasts?',
        a: 'Absolutely. Our platform includes role-based access control (RBAC) with granular permissions. You can create custom roles, restrict access by team or region, and integrate with your existing identity providers (Azure AD, Okta, OneLogin).',
      },
      {
        q: 'How do you handle data encryption?',
        a: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). API keys are hashed and salted. We support customer-managed encryption keys (CMEK) for Enterprise customers. Regular penetration testing ensures ongoing security.',
      },
    ],
  },
  {
    category: 'Pricing & Billing',
    icon: '💰',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards, ACH/wire transfers, and purchase orders for annual contracts. Enterprise customers can choose annual or multi-year contracts with custom payment terms.',
      },
      {
        q: 'Can I change my plan at any time?',
        a: 'Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately. Downgrades take effect at the start of your next billing cycle. No cancellation fees.',
      },
      {
        q: 'Are there any hidden fees?',
        a: 'No hidden fees. All costs are clearly outlined in our pricing page. Additional charges only apply for: data transfer above included limits, premium support (if selected), and custom development work (optional).',
      },
      {
        q: 'Do you offer volume discounts?',
        a: 'Yes! Business and Enterprise plans include volume discounts. For organizations with 100+ cloud resources or multiple teams, contact our sales team for custom pricing with significant discounts.',
      },
    ],
  },
  {
    category: 'Support & Training',
    icon: '🎓',
    questions: [
      {
        q: 'What support channels are available?',
        a: 'Professional: Email support (24-hour response). Business: Email + chat support (8-hour response) + phone during business hours. Enterprise: 24/7 phone, email, chat, dedicated Slack channel, and assigned customer success manager.',
      },
      {
        q: 'Do you provide training for my team?',
        a: 'Yes! All plans include access to our video tutorials, documentation, and webinars. Business and Enterprise plans include live onboarding sessions. Enterprise customers receive customized training programs for their teams.',
      },
      {
        q: 'Can you help with the initial setup?',
        a: 'Absolutely. Professional customers get setup assistance via chat/email. Business customers get a guided onboarding call. Enterprise customers receive white-glove setup service with dedicated implementation engineer.',
      },
      {
        q: 'What is your SLA for platform uptime?',
        a: '99.9% uptime SLA for all plans, with 99.99% SLA available for Enterprise. If we miss our SLA, you receive automatic service credits. Real-time status monitoring available at status.aicloudforecast.com.',
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      q =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="mb-4 neon-text">Frequently Asked Questions</h1>
          <p className="text-[#9EA7B8] max-w-2xl mx-auto mb-8">
            Find answers to common questions about our platform, features, and pricing
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9EA7B8]" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1f2e] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-[#9EA7B8] focus:border-[#2EBFFF] focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{category.icon}</span>
                <h2>{category.category}</h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((item, index) => {
                  const itemId = `${category.category}-${index}`;
                  const isExpanded = expandedItems.includes(itemId);

                  return (
                    <motion.div
                      key={itemId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-card rounded-xl overflow-hidden hover-lift"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <HelpCircle className="w-5 h-5 text-[#2EBFFF] flex-shrink-0 mt-1" />
                          <h3 className="text-white">{item.q}</h3>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-[#9EA7B8] flex-shrink-0" />
                        </motion.div>
                      </button>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? 'auto' : 0,
                          opacity: isExpanded ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="pl-8 text-[#9EA7B8] border-l-2 border-[#2EBFFF]/30">
                            {item.a}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-[#9EA7B8] mb-4">No results found for "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="btn-secondary"
            >
              Clear Search
            </button>
          </motion.div>
        )}

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card-premium rounded-2xl p-12 text-center mt-16"
        >
          <MessageCircle className="w-16 h-16 text-[#2EBFFF] mx-auto mb-6" />
          <h2 className="mb-4">Still Have Questions?</h2>
          <p className="text-[#9EA7B8] mb-8 max-w-2xl mx-auto">
            Our team is here to help. Get in touch and we'll respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              <MessageCircle className="w-5 h-5" />
              <span>Contact Support</span>
            </button>
            <button className="btn-secondary">
              <span>Schedule a Demo</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
