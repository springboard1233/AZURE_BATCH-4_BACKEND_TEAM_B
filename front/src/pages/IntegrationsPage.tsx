import { motion } from 'framer-motion';
import { Cloud, Database, Zap, Shield, Code, CheckCircle } from 'lucide-react';

const integrations = [
  {
    name: 'Microsoft Azure',
    logo: '☁️',
    description: 'Native integration with Azure Monitor, App Insights, and Resource Manager',
    features: [
      'Azure Monitor integration',
      'App Insights metrics',
      'Resource Manager API',
      'Azure Functions support',
      'Cosmos DB connectivity',
    ],
    status: 'Available',
    color: 'from-[#2EBFFF]/10 to-[#2EBFFF]/5',
  },
  {
    name: 'Amazon AWS',
    logo: '🔶',
    description: 'Seamless connection to CloudWatch, EC2, and AWS Cost Explorer',
    features: [
      'CloudWatch metrics',
      'EC2 Auto Scaling',
      'Cost Explorer data',
      'Lambda functions',
      'S3 storage integration',
    ],
    status: 'Available',
    color: 'from-[#FF9900]/10 to-[#FF9900]/5',
  },
  {
    name: 'Google Cloud Platform',
    logo: '🌐',
    description: 'Integration with Cloud Monitoring, Compute Engine, and BigQuery',
    features: [
      'Cloud Monitoring API',
      'Compute Engine metrics',
      'BigQuery analytics',
      'Cloud Functions',
      'Cloud Storage',
    ],
    status: 'Available',
    color: 'from-[#4285F4]/10 to-[#4285F4]/5',
  },
  {
    name: 'Kubernetes',
    logo: '⚓',
    description: 'Monitor and optimize containerized workloads',
    features: [
      'Pod metrics collection',
      'Cluster resource tracking',
      'Namespace monitoring',
      'Auto-scaling integration',
      'Helm chart deployment',
    ],
    status: 'Available',
    color: 'from-[#326CE5]/10 to-[#326CE5]/5',
  },
  {
    name: 'Datadog',
    logo: '🐶',
    description: 'Enhanced observability with Datadog metrics and APM',
    features: [
      'Custom metrics import',
      'APM trace data',
      'Log aggregation',
      'Dashboard sync',
      'Alert integration',
    ],
    status: 'Available',
    color: 'from-[#632CA6]/10 to-[#632CA6]/5',
  },
  {
    name: 'Prometheus',
    logo: '🔥',
    description: 'Time-series data ingestion from Prometheus',
    features: [
      'PromQL query support',
      'Metric scraping',
      'Alert manager',
      'Grafana integration',
      'Service discovery',
    ],
    status: 'Available',
    color: 'from-[#E6522C]/10 to-[#E6522C]/5',
  },
  {
    name: 'Slack',
    logo: '💬',
    description: 'Real-time notifications and alerts',
    features: [
      'Alert notifications',
      'Report delivery',
      'Interactive commands',
      'Workflow automation',
      'Channel integration',
    ],
    status: 'Available',
    color: 'from-[#4A154B]/10 to-[#4A154B]/5',
  },
  {
    name: 'PagerDuty',
    logo: '🚨',
    description: 'Incident management and alerting',
    features: [
      'Incident creation',
      'On-call scheduling',
      'Alert routing',
      'Escalation policies',
      'Status dashboard',
    ],
    status: 'Available',
    color: 'from-[#06AC38]/10 to-[#06AC38]/5',
  },
  {
    name: 'Terraform',
    logo: '🏗️',
    description: 'Infrastructure as Code integration',
    features: [
      'Resource provisioning',
      'State management',
      'Module support',
      'Policy enforcement',
      'Cost estimation',
    ],
    status: 'Coming Soon',
    color: 'from-[#7B42BC]/10 to-[#7B42BC]/5',
  },
];

export default function IntegrationsPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="mb-4 neon-text">Integrations & Partners</h1>
          <p className="text-[#9EA7B8] max-w-2xl mx-auto">
            Connect with your existing cloud infrastructure and tools seamlessly
          </p>
        </motion.div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <BenefitCard
            icon={<Cloud className="w-8 h-8 text-[#2EBFFF]" />}
            title="Multi-Cloud"
            description="Azure, AWS, GCP support"
          />
          <BenefitCard
            icon={<Zap className="w-8 h-8 text-[#B2FF59]" />}
            title="Real-Time Sync"
            description="Instant data updates"
          />
          <BenefitCard
            icon={<Shield className="w-8 h-8 text-[#4CAF50]" />}
            title="Secure APIs"
            description="Enterprise-grade security"
          />
          <BenefitCard
            icon={<Code className="w-8 h-8 text-[#AE71FF]" />}
            title="Easy Setup"
            description="5-minute integration"
          />
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {integrations.map((integration, index) => (
            <IntegrationCard key={integration.name} integration={integration} delay={index * 0.1} />
          ))}
        </div>

        {/* API Documentation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card-premium rounded-2xl p-12 mb-16"
        >
          <h2 className="mb-8 text-center">API & SDK Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <APISupport
              title="REST API"
              description="Full-featured REST API with OpenAPI documentation"
              features={['JSON responses', 'Authentication', 'Rate limiting', 'Webhooks']}
            />
            <APISupport
              title="GraphQL"
              description="Flexible GraphQL API for complex queries"
              features={['Type safety', 'Real-time subs', 'Batching', 'Caching']}
            />
            <APISupport
              title="SDKs"
              description="Official SDKs for popular languages"
              features={['Python', 'Node.js', 'Go', 'Java']}
            />
          </div>
        </motion.div>

        {/* Custom Integration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-12 text-center"
        >
          <Database className="w-16 h-16 text-[#2EBFFF] mx-auto mb-6" />
          <h2 className="mb-4">Need a Custom Integration?</h2>
          <p className="text-[#9EA7B8] mb-8 max-w-2xl mx-auto">
            Our team can build custom integrations for your specific infrastructure and tools
          </p>
          <button className="btn-primary">
            <span>Contact Integration Team</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card p-6 rounded-xl text-center"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="mb-2">{title}</h3>
      <p className="text-[#9EA7B8]">{description}</p>
    </motion.div>
  );
}

function IntegrationCard({ integration, delay }: { integration: typeof integrations[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className={`glass-card rounded-xl p-6 bg-gradient-to-br ${integration.color} hover-lift`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-5xl">{integration.logo}</div>
        <div className={`px-3 py-1 rounded-full text-xs ${
          integration.status === 'Available' 
            ? 'bg-[#4CAF50]/20 text-[#4CAF50]' 
            : 'bg-[#FF9800]/20 text-[#FF9800]'
        }`}>
          {integration.status}
        </div>
      </div>

      <h3 className="mb-2">{integration.name}</h3>
      <p className="text-[#9EA7B8] mb-4">{integration.description}</p>

      <ul className="space-y-2">
        {integration.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-[#9EA7B8]">
            <CheckCircle className="w-4 h-4 text-[#4CAF50] flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function APISupport({ title, description, features }: { title: string; description: string; features: string[] }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] flex items-center justify-center mx-auto mb-4 glow-effect">
        <Code className="w-8 h-8" />
      </div>
      <h3 className="mb-2">{title}</h3>
      <p className="text-[#9EA7B8] mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {features.map((feature, idx) => (
          <span key={idx} className="px-3 py-1 rounded-full bg-white/10 text-xs">
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
}
