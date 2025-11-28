import { motion } from 'framer-motion';
import { Cloud, Server, GitBranch, Zap, Shield, CheckCircle, Terminal, Settings } from 'lucide-react';

const deploymentOptions = [
  {
    name: 'Azure App Service',
    icon: '☁️',
    description: 'Fully managed platform with auto-scaling',
    features: [
      'One-click deployment',
      'Auto-scaling built-in',
      'Integrated monitoring',
      'SSL certificates included',
    ],
    difficulty: 'Easy',
    time: '10 minutes',
    color: 'from-[#2EBFFF]/10 to-[#2EBFFF]/5',
  },
  {
    name: 'Azure Container Apps',
    icon: '🐳',
    description: 'Serverless containers with Kubernetes',
    features: [
      'Container-based deployment',
      'Event-driven scaling',
      'Microservices ready',
      'KEDA integration',
    ],
    difficulty: 'Medium',
    time: '20 minutes',
    color: 'from-[#AE71FF]/10 to-[#AE71FF]/5',
  },
  {
    name: 'Docker Compose',
    icon: '🔧',
    description: 'Self-hosted with full control',
    features: [
      'Full customization',
      'On-premise deployment',
      'Multi-container setup',
      'Custom networking',
    ],
    difficulty: 'Advanced',
    time: '30 minutes',
    color: 'from-[#B2FF59]/10 to-[#B2FF59]/5',
  },
];

const cicdSteps = [
  {
    step: '1',
    title: 'Connect Repository',
    description: 'Link your GitHub, GitLab, or Azure DevOps repository',
    icon: <GitBranch className="w-6 h-6" />,
  },
  {
    step: '2',
    title: 'Configure Pipeline',
    description: 'Set up automated testing and deployment workflows',
    icon: <Settings className="w-6 h-6" />,
  },
  {
    step: '3',
    title: 'Deploy to Staging',
    description: 'Automatic deployment to staging environment',
    icon: <Server className="w-6 h-6" />,
  },
  {
    step: '4',
    title: 'Production Release',
    description: 'Blue-green deployment with zero downtime',
    icon: <Zap className="w-6 h-6" />,
  },
];

const monitoringTools = [
  {
    name: 'Application Insights',
    features: ['Performance monitoring', 'Error tracking', 'Custom metrics', 'Distributed tracing'],
    icon: '📊',
  },
  {
    name: 'Azure Monitor',
    features: ['Infrastructure metrics', 'Log analytics', 'Alerting rules', 'Dashboard creation'],
    icon: '📈',
  },
  {
    name: 'Log Analytics',
    features: ['Centralized logging', 'Query language', 'Log retention', 'Compliance reports'],
    icon: '📝',
  },
];

export default function DeploymentPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="mb-4 neon-text">Deployment Guide</h1>
          <p className="text-[#9EA7B8] max-w-2xl mx-auto">
            Multiple deployment options with enterprise-grade CI/CD and monitoring
          </p>
        </motion.div>

        {/* Deployment Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center">Choose Your Deployment Method</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {deploymentOptions.map((option, index) => (
              <DeploymentCard key={option.name} option={option} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card-premium rounded-2xl p-8 mb-16"
        >
          <h2 className="mb-6">Quick Start with Azure</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="mb-4">Prerequisites</h3>
              <ul className="space-y-2">
                <ChecklistItem text="Azure subscription" />
                <ChecklistItem text="Azure CLI installed" />
                <ChecklistItem text="Docker installed (optional)" />
                <ChecklistItem text="API keys configured" />
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Deployment Command</h3>
              <div className="bg-black/40 rounded-lg p-4">
                <code className="text-[#B2FF59] text-sm">
                  {`# Deploy to Azure App Service
az webapp create \\
  --resource-group myResourceGroup \\
  --plan myAppServicePlan \\
  --name myForecastingApp \\
  --deployment-source-url \\
  https://github.com/user/repo`}
                </code>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CI/CD Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center">CI/CD with GitHub Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {cicdSteps.map((step, index) => (
              <CICDStep key={step.step} step={step} delay={index * 0.1} />
            ))}
          </div>
          <div className="glass-card rounded-xl p-6">
            <h3 className="mb-4">Sample GitHub Actions Workflow</h3>
            <div className="bg-black/40 rounded-lg p-4 overflow-x-auto">
              <pre className="text-[#B2FF59] text-sm">
{`name: Deploy to Azure

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build Docker image
        run: docker build -t forecasting-app .
      
      - name: Push to Azure Container Registry
        run: |
          docker tag forecasting-app \\
            myregistry.azurecr.io/forecasting-app
          docker push myregistry.azurecr.io/forecasting-app
      
      - name: Deploy to Azure Container Apps
        run: |
          az containerapp update \\
            --name forecasting-app \\
            --resource-group myResourceGroup \\
            --image myregistry.azurecr.io/forecasting-app:latest`}
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Monitoring & Observability */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center">Monitoring & Observability</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monitoringTools.map((tool, index) => (
              <MonitoringCard key={tool.name} tool={tool} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Security & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card-premium rounded-2xl p-8 mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-[#4CAF50]" />
            <h2>Security & Compliance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SecurityFeature
              title="SSL/TLS"
              description="End-to-end encryption"
              icon="🔒"
            />
            <SecurityFeature
              title="API Keys"
              description="Secure authentication"
              icon="🔑"
            />
            <SecurityFeature
              title="Network Security"
              description="VNet integration"
              icon="🛡️"
            />
            <SecurityFeature
              title="Compliance"
              description="SOC 2, GDPR ready"
              icon="✅"
            />
          </div>
        </motion.div>

        {/* Environment Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-8"
        >
          <h2 className="mb-6">Environment Configuration</h2>
          <div className="bg-black/40 rounded-lg p-4">
            <code className="text-[#B2FF59] text-sm">
              {`# .env file
AZURE_SUBSCRIPTION_ID=your-subscription-id
AZURE_RESOURCE_GROUP=myResourceGroup
DATABASE_URL=postgresql://user:pass@host:5432/forecasting
API_KEY=your-api-key
ML_MODEL_PATH=/models
REDIS_URL=redis://localhost:6379
LOG_LEVEL=info
NODE_ENV=production`}
            </code>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DeploymentCard({ option, delay }: { option: typeof deploymentOptions[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className={`glass-card rounded-xl p-6 bg-gradient-to-br ${option.color} hover-lift`}
    >
      <div className="text-5xl mb-4">{option.icon}</div>
      <h3 className="mb-2">{option.name}</h3>
      <p className="text-[#9EA7B8] mb-4">{option.description}</p>
      
      <div className="flex items-center gap-4 mb-4 text-xs">
        <span className="px-2 py-1 rounded bg-white/10">{option.difficulty}</span>
        <span className="text-[#9EA7B8]">⏱️ {option.time}</span>
      </div>

      <ul className="space-y-2">
        {option.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-[#9EA7B8]">
            <CheckCircle className="w-4 h-4 text-[#4CAF50] flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function CICDStep({ step, delay }: { step: typeof cicdSteps[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="glass-card p-6 rounded-xl text-center"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] flex items-center justify-center mx-auto mb-4 glow-effect">
        {step.icon}
      </div>
      <div className="glass-card px-3 py-1 rounded-lg mb-3 inline-block">
        <span className="text-[#2EBFFF]">Step {step.step}</span>
      </div>
      <h3 className="mb-2">{step.title}</h3>
      <p className="text-[#9EA7B8]">{step.description}</p>
    </motion.div>
  );
}

function MonitoringCard({ tool, delay }: { tool: typeof monitoringTools[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-xl p-6 hover-lift"
    >
      <div className="text-4xl mb-4">{tool.icon}</div>
      <h3 className="mb-4">{tool.name}</h3>
      <ul className="space-y-2">
        {tool.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-[#9EA7B8]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2EBFFF]"></div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2">
      <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
      <span>{text}</span>
    </li>
  );
}

function SecurityFeature({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="glass-card p-4 rounded-lg text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="mb-1">{title}</h3>
      <p className="text-[#9EA7B8]">{description}</p>
    </div>
  );
}
