import { motion } from 'framer-motion';
import { Cloud, Cpu, Database, GitBranch, Server, Layers, Zap, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="mb-4 neon-text">About the Platform</h1>
          <p className="text-[#9EA7B8] max-w-3xl mx-auto">
            Enterprise-grade cloud intelligence powered by advanced AI and machine learning
          </p>
        </motion.div>

        {/* Platform Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card-premium rounded-2xl p-12 mb-12"
        >
          <h2 className="mb-6 text-center">Cloud-Native Architecture</h2>
          <p className="text-[#9EA7B8] text-center max-w-3xl mx-auto mb-12">
            Our platform leverages cutting-edge cloud technologies and AI/ML models to provide 
            real-time forecasting, optimization, and behavioral intelligence for modern cloud infrastructure.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ArchitectureCard
              icon={<Cloud className="w-10 h-10 text-[#2EBFFF]" />}
              title="Cloud-Native"
              description="Built on Azure with global distribution"
            />
            <ArchitectureCard
              icon={<Cpu className="w-10 h-10 text-[#AE71FF]" />}
              title="AI/ML Pipeline"
              description="ARIMA, LSTM, and XGBoost models"
            />
            <ArchitectureCard
              icon={<Database className="w-10 h-10 text-[#B2FF59]" />}
              title="Real-Time Data"
              description="PostgreSQL with streaming analytics"
            />
            <ArchitectureCard
              icon={<Shield className="w-10 h-10 text-[#4CAF50]" />}
              title="Enterprise Security"
              description="SOC 2 compliant with encryption"
            />
          </div>
        </motion.div>

        {/* ML Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="mb-8 text-center">Machine Learning Pipeline</h2>
          <div className="glass-card p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <PipelineStep
                number="1"
                title="Data Ingestion"
                description="Collect metrics from cloud resources"
                icon={<Database className="w-6 h-6" />}
              />
              <PipelineStep
                number="2"
                title="Preprocessing"
                description="Clean and normalize data"
                icon={<Layers className="w-6 h-6" />}
              />
              <PipelineStep
                number="3"
                title="Model Training"
                description="Train multiple ML models"
                icon={<Cpu className="w-6 h-6" />}
              />
              <PipelineStep
                number="4"
                title="Validation"
                description="Test accuracy and performance"
                icon={<Shield className="w-6 h-6" />}
              />
              <PipelineStep
                number="5"
                title="Deployment"
                description="Deploy to production"
                icon={<Zap className="w-6 h-6" />}
              />
            </div>
          </div>
        </motion.div>

        {/* API Layer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="mb-8 text-center">API Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <APICard
              title="Forecasting APIs"
              endpoints={[
                'GET /forecast/cpu',
                'GET /forecast/storage',
                'GET /forecast/users',
                'GET /forecast/region/{name}',
                'POST /forecast/retrain',
              ]}
              color="from-[#2EBFFF]/10 to-[#2EBFFF]/5"
            />
            <APICard
              title="Analytics APIs"
              endpoints={[
                'GET /trends',
                'GET /region/performance',
                'GET /correlations',
                'GET /seasonal',
                'GET /behavior/metrics',
              ]}
              color="from-[#AE71FF]/10 to-[#AE71FF]/5"
            />
            <APICard
              title="Monitoring APIs"
              endpoints={[
                'GET /model/status',
                'GET /pipeline/logs',
                'POST /model/train',
                'GET /health',
                'GET /metrics/system',
              ]}
              color="from-[#B2FF59]/10 to-[#B2FF59]/5"
            />
          </div>
        </motion.div>

        {/* Data Schema */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-xl mb-12"
        >
          <h2 className="mb-8 text-center">Database Schema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SchemaCard table="usage_cpu" description="CPU utilization metrics" />
            <SchemaCard table="usage_storage" description="Storage consumption data" />
            <SchemaCard table="active_users" description="User activity tracking" />
            <SchemaCard table="regions" description="Regional configuration" />
            <SchemaCard table="models" description="ML model metadata" />
            <SchemaCard table="forecasts" description="Prediction results" />
            <SchemaCard table="optimization_suggestions" description="AI recommendations" />
            <SchemaCard table="training_logs" description="Model training history" />
          </div>
        </motion.div>

        {/* Microservices */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card-premium rounded-2xl p-12"
        >
          <h2 className="mb-8 text-center">Microservices Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Server className="w-8 h-8 text-[#2EBFFF]" />}
              title="Data Collection Service"
              description="Ingests metrics from cloud resources using Azure Monitor and custom agents"
            />
            <ServiceCard
              icon={<Cpu className="w-8 h-8 text-[#AE71FF]" />}
              title="ML Training Service"
              description="Manages model training, validation, and version control with automated pipelines"
            />
            <ServiceCard
              icon={<GitBranch className="w-8 h-8 text-[#B2FF59]" />}
              title="Prediction Service"
              description="Serves real-time forecasts using optimized model inference endpoints"
            />
            <ServiceCard
              icon={<Zap className="w-8 h-8 text-[#4CAF50]" />}
              title="Optimization Engine"
              description="Analyzes resource utilization and generates cost-saving recommendations"
            />
            <ServiceCard
              icon={<Shield className="w-8 h-8 text-[#2EBFFF]" />}
              title="API Gateway"
              description="Handles authentication, rate limiting, and request routing"
            />
            <ServiceCard
              icon={<Database className="w-8 h-8 text-[#AE71FF]" />}
              title="Analytics Service"
              description="Processes behavioral data and generates insights"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ArchitectureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card p-6 rounded-xl text-center hover-lift"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="mb-2">{title}</h3>
      <p className="text-[#9EA7B8]">{description}</p>
    </motion.div>
  );
}

function PipelineStep({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] flex items-center justify-center mb-4 glow-effect">
          {icon}
        </div>
        <div className="glass-card px-4 py-2 rounded-lg mb-2">
          <span className="text-[#2EBFFF]">Step {number}</span>
        </div>
        <h3 className="mb-2">{title}</h3>
        <p className="text-[#9EA7B8]">{description}</p>
      </div>
    </div>
  );
}

function APICard({ title, endpoints, color }: { title: string; endpoints: string[]; color: string }) {
  return (
    <div className={`glass-card rounded-xl p-6 bg-gradient-to-br ${color} hover-lift`}>
      <h3 className="mb-4">{title}</h3>
      <div className="space-y-2">
        {endpoints.map((endpoint, index) => (
          <div key={index} className="font-mono text-[#9EA7B8] bg-black/20 px-3 py-2 rounded">
            {endpoint}
          </div>
        ))}
      </div>
    </div>
  );
}

function SchemaCard({ table, description }: { table: string; description: string }) {
  return (
    <div className="glass-card p-4 rounded-lg hover-lift">
      <div className="flex items-center gap-2 mb-2">
        <Database className="w-4 h-4 text-[#2EBFFF]" />
        <span className="font-mono text-[#B2FF59]">{table}</span>
      </div>
      <p className="text-[#9EA7B8]">{description}</p>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 rounded-xl"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="mb-3">{title}</h3>
      <p className="text-[#9EA7B8]">{description}</p>
    </motion.div>
  );
}
