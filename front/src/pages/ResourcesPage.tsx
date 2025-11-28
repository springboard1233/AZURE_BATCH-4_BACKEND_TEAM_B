import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, Download, ExternalLink, Code } from 'lucide-react';

const documentation = [
  {
    category: 'Getting Started',
    icon: <BookOpen className="w-6 h-6 text-[#2EBFFF]" />,
    items: [
      { title: 'Quick Start Guide', type: 'Guide', time: '5 min read' },
      { title: 'Installation & Setup', type: 'Tutorial', time: '10 min read' },
      { title: 'First Forecast', type: 'Tutorial', time: '15 min read' },
      { title: 'Dashboard Overview', type: 'Guide', time: '8 min read' },
    ],
  },
  {
    category: 'API Documentation',
    icon: <Code className="w-6 h-6 text-[#AE71FF]" />,
    items: [
      { title: 'REST API Reference', type: 'Reference', time: 'Full docs' },
      { title: 'GraphQL Schema', type: 'Reference', time: 'Full docs' },
      { title: 'Authentication Guide', type: 'Guide', time: '12 min read' },
      { title: 'Rate Limits & Quotas', type: 'Guide', time: '6 min read' },
    ],
  },
  {
    category: 'Advanced Topics',
    icon: <FileText className="w-6 h-6 text-[#B2FF59]" />,
    items: [
      { title: 'Custom Model Training', type: 'Tutorial', time: '25 min read' },
      { title: 'Multi-Region Setup', type: 'Guide', time: '18 min read' },
      { title: 'Optimization Strategies', type: 'Guide', time: '20 min read' },
      { title: 'Security Best Practices', type: 'Guide', time: '15 min read' },
    ],
  },
];

const videos = [
  {
    title: 'Platform Overview & Demo',
    duration: '12:45',
    thumbnail: '🎬',
    description: 'Complete walkthrough of all platform features',
  },
  {
    title: 'Setting Up Your First Forecast',
    duration: '8:30',
    thumbnail: '📊',
    description: 'Step-by-step guide to creating forecasts',
  },
  {
    title: 'Understanding ML Models',
    duration: '15:20',
    thumbnail: '🤖',
    description: 'Deep dive into ARIMA, LSTM, and XGBoost',
  },
  {
    title: 'Cost Optimization Techniques',
    duration: '10:15',
    thumbnail: '💰',
    description: 'Best practices for reducing cloud costs',
  },
];

const whitepapers = [
  {
    title: 'The Future of Cloud Resource Forecasting',
    description: 'How AI and ML are transforming cloud infrastructure management',
    pages: '24 pages',
    size: '2.4 MB',
    icon: '📄',
  },
  {
    title: 'Cost Optimization in Multi-Cloud Environments',
    description: 'Strategies for reducing spend across Azure, AWS, and GCP',
    pages: '18 pages',
    size: '1.8 MB',
    icon: '📊',
  },
  {
    title: 'Machine Learning for Cloud Operations',
    description: 'Technical deep-dive into our ML pipeline and models',
    pages: '32 pages',
    size: '3.2 MB',
    icon: '🔬',
  },
];

const codeExamples = [
  {
    language: 'Python',
    title: 'Get CPU Forecast',
    code: `import requests

response = requests.get(
  'https://api.aicloudforecast.com/v1/forecast/cpu',
  headers={'Authorization': 'Bearer YOUR_API_KEY'}
)

forecast = response.json()
print(forecast['predictions'])`,
  },
  {
    language: 'Node.js',
    title: 'Trigger Model Training',
    code: `const axios = require('axios');

const response = await axios.post(
  'https://api.aicloudforecast.com/v1/model/train',
  { region: 'us-east', model_type: 'lstm' },
  { headers: { 'Authorization': 'Bearer YOUR_API_KEY' } }
);

console.log(response.data);`,
  },
];

export default function ResourcesPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="mb-4 neon-text">Resources & Documentation</h1>
          <p className="text-[#9EA7B8] max-w-2xl mx-auto">
            Everything you need to get started and master the platform
          </p>
        </motion.div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <QuickLink icon={<BookOpen className="w-8 h-8" />} title="Documentation" count="120+ articles" />
          <QuickLink icon={<Video className="w-8 h-8" />} title="Video Tutorials" count="25+ videos" />
          <QuickLink icon={<FileText className="w-8 h-8" />} title="Whitepapers" count="12+ papers" />
          <QuickLink icon={<Code className="w-8 h-8" />} title="Code Examples" count="50+ snippets" />
        </div>

        {/* Documentation Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8">Documentation</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {documentation.map((section, index) => (
              <DocumentationSection key={section.category} section={section} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Video Tutorials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8">Video Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <VideoCard key={video.title} video={video} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Whitepapers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8">Whitepapers & Research</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whitepapers.map((paper, index) => (
              <WhitepaperCard key={paper.title} paper={paper} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-8">Code Examples</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {codeExamples.map((example, index) => (
              <CodeExampleCard key={example.title} example={example} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function QuickLink({ icon, title, count }: { icon: React.ReactNode; title: string; count: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card-premium p-6 rounded-xl text-center hover-lift cursor-pointer"
    >
      <div className="flex justify-center mb-4 text-[#2EBFFF]">{icon}</div>
      <h3 className="mb-2">{title}</h3>
      <p className="text-[#9EA7B8]">{count}</p>
    </motion.div>
  );
}

function DocumentationSection({ section, delay }: { section: typeof documentation[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="glass-card rounded-xl p-6 hover-lift"
    >
      <div className="flex items-center gap-3 mb-4">
        {section.icon}
        <h3>{section.category}</h3>
      </div>
      <ul className="space-y-3">
        {section.items.map((item, idx) => (
          <li key={idx} className="flex items-start justify-between gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="flex-1">
              <div className="mb-1 group-hover:text-[#2EBFFF] transition-colors">{item.title}</div>
              <div className="text-xs text-[#9EA7B8]">{item.type} • {item.time}</div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#9EA7B8] group-hover:text-[#2EBFFF] transition-colors flex-shrink-0 mt-1" />
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function VideoCard({ video, delay }: { video: typeof videos[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-xl p-6 hover-lift cursor-pointer group"
    >
      <div className="text-6xl mb-4">{video.thumbnail}</div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="group-hover:text-[#2EBFFF] transition-colors">{video.title}</h3>
        <div className="flex items-center gap-1 text-[#9EA7B8]">
          <Video className="w-4 h-4" />
          <span className="text-xs">{video.duration}</span>
        </div>
      </div>
      <p className="text-[#9EA7B8]">{video.description}</p>
    </motion.div>
  );
}

function WhitepaperCard({ paper, delay }: { paper: typeof whitepapers[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-xl p-6 hover-lift"
    >
      <div className="text-5xl mb-4">{paper.icon}</div>
      <h3 className="mb-2">{paper.title}</h3>
      <p className="text-[#9EA7B8] mb-4">{paper.description}</p>
      <div className="flex items-center justify-between text-xs text-[#9EA7B8] mb-4">
        <span>{paper.pages}</span>
        <span>{paper.size}</span>
      </div>
      <button className="btn-secondary w-full">
        <Download className="w-4 h-4" />
        <span>Download PDF</span>
      </button>
    </motion.div>
  );
}

function CodeExampleCard({ example, delay }: { example: typeof codeExamples[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="glass-card rounded-xl p-6 hover-lift"
    >
      <div className="flex items-center justify-between mb-4">
        <h3>{example.title}</h3>
        <span className="px-3 py-1 rounded-full bg-[#2EBFFF]/20 text-[#2EBFFF] text-xs">
          {example.language}
        </span>
      </div>
      <pre className="bg-black/40 rounded-lg p-4 overflow-x-auto">
        <code className="text-[#B2FF59] text-sm">{example.code}</code>
      </pre>
    </motion.div>
  );
}
