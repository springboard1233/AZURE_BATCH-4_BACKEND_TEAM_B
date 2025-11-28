import { motion } from 'framer-motion';
import { useState } from 'react';
import { Code, Copy, Check, Terminal, Book, Zap } from 'lucide-react';

const apiEndpoints = [
  {
    category: 'Forecasting',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/forecast',
        description: 'Generate a new forecast',
        params: ['region', 'model', 'metric', 'horizon'],
        example: `{
  "region": "us-east",
  "model": "lstm",
  "metric": "cpu",
  "horizon": 14
}`,
        response: `{
  "forecast_id": "fct_abc123",
  "predictions": [...],
  "accuracy": 98.5,
  "confidence_interval": [95, 99]
}`,
      },
      {
        method: 'GET',
        path: '/v1/forecast/:id',
        description: 'Retrieve a specific forecast',
        params: ['id'],
        example: '',
        response: `{
  "forecast_id": "fct_abc123",
  "status": "completed",
  "predictions": [...],
  "created_at": "2025-01-15T10:30:00Z"
}`,
      },
    ],
  },
  {
    category: 'Models',
    endpoints: [
      {
        method: 'GET',
        path: '/v1/models',
        description: 'List all available ML models',
        params: [],
        example: '',
        response: `{
  "models": [
    {"id": "arima", "name": "ARIMA", "accuracy": 96.5},
    {"id": "lstm", "name": "LSTM", "accuracy": 98.2},
    {"id": "xgboost", "name": "XGBoost", "accuracy": 97.8}
  ]
}`,
      },
      {
        method: 'POST',
        path: '/v1/models/:id/train',
        description: 'Trigger model retraining',
        params: ['id', 'dataset'],
        example: `{
  "dataset": "historical_30d",
  "auto_deploy": true
}`,
        response: `{
  "training_id": "trn_xyz789",
  "status": "started",
  "estimated_time": "15 minutes"
}`,
      },
    ],
  },
  {
    category: 'Metrics',
    endpoints: [
      {
        method: 'GET',
        path: '/v1/metrics',
        description: 'Get current resource metrics',
        params: ['region', 'metric_type', 'timeframe'],
        example: '',
        response: `{
  "metrics": [
    {"timestamp": "2025-01-15T10:00:00Z", "value": 75.3},
    {"timestamp": "2025-01-15T11:00:00Z", "value": 78.1}
  ]
}`,
      },
    ],
  },
];

const codeExamples = [
  {
    language: 'cURL',
    code: `curl -X POST https://api.aicloudforecast.com/v1/forecast \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "region": "us-east",
    "model": "lstm",
    "metric": "cpu",
    "horizon": 14
  }'`,
  },
  {
    language: 'Python',
    code: `import requests

response = requests.post(
    'https://api.aicloudforecast.com/v1/forecast',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'region': 'us-east',
        'model': 'lstm',
        'metric': 'cpu',
        'horizon': 14
    }
)

forecast = response.json()
print(f"Accuracy: {forecast['accuracy']}%")`,
  },
  {
    language: 'Node.js',
    code: `const axios = require('axios');

const response = await axios.post(
  'https://api.aicloudforecast.com/v1/forecast',
  {
    region: 'us-east',
    model: 'lstm',
    metric: 'cpu',
    horizon: 14
  },
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);

console.log('Forecast:', response.data);`,
  },
];

export default function APIDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('cURL');

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] flex items-center justify-center glow-effect">
              <Code className="w-10 h-10" />
            </div>
          </div>
          <h1 className="mb-4 neon-text">API Documentation</h1>
          <p className="text-[#9EA7B8] max-w-2xl mx-auto">
            Complete REST API reference for the AI Cloud Forecasting Platform
          </p>
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card-premium rounded-2xl p-8 mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-[#B2FF59]" />
            <h2>Quick Start</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <QuickStartStep
              number="1"
              title="Get API Key"
              description="Generate your API key from the dashboard"
            />
            <QuickStartStep
              number="2"
              title="Make Request"
              description="Send authenticated requests to our endpoints"
            />
            <QuickStartStep
              number="3"
              title="Process Response"
              description="Parse JSON responses and use the data"
            />
          </div>
          <div className="glass-card p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#9EA7B8]">Base URL</span>
              <button
                onClick={() => copyCode('https://api.aicloudforecast.com', 'base-url')}
                className="text-[#2EBFFF] hover:text-[#AE71FF] transition-colors"
              >
                {copiedCode === 'base-url' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <code className="text-[#B2FF59]">https://api.aicloudforecast.com</code>
          </div>
        </motion.div>

        {/* Authentication */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-6">Authentication</h2>
          <div className="glass-card rounded-xl p-6">
            <p className="text-[#9EA7B8] mb-4">
              All API requests require authentication using Bearer tokens in the Authorization header:
            </p>
            <div className="bg-black/40 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#9EA7B8]">Authorization Header</span>
                <button
                  onClick={() => copyCode('Authorization: Bearer YOUR_API_KEY', 'auth-header')}
                  className="text-[#2EBFFF] hover:text-[#AE71FF] transition-colors"
                >
                  {copiedCode === 'auth-header' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <code className="text-[#B2FF59]">Authorization: Bearer YOUR_API_KEY</code>
            </div>
          </div>
        </motion.div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-6">Code Examples</h2>
          <div className="glass-card rounded-xl p-6">
            <div className="flex gap-2 mb-4">
              {codeExamples.map((example) => (
                <button
                  key={example.language}
                  onClick={() => setSelectedLanguage(example.language)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedLanguage === example.language
                      ? 'bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] text-white'
                      : 'glass-card text-[#9EA7B8] hover:text-white'
                  }`}
                >
                  {example.language}
                </button>
              ))}
            </div>
            {codeExamples.map((example) => (
              selectedLanguage === example.language && (
                <div key={example.language} className="bg-black/40 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#B2FF59]" />
                      <span className="text-[#9EA7B8]">{example.language} Example</span>
                    </div>
                    <button
                      onClick={() => copyCode(example.code, example.language)}
                      className="text-[#2EBFFF] hover:text-[#AE71FF] transition-colors flex items-center gap-2"
                    >
                      {copiedCode === example.language ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-[#B2FF59] text-sm overflow-x-auto">{example.code}</pre>
                </div>
              )
            ))}
          </div>
        </motion.div>

        {/* API Endpoints */}
        {apiEndpoints.map((category, catIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="mb-6">{category.category} API</h2>
            <div className="space-y-6">
              {category.endpoints.map((endpoint, index) => (
                <EndpointCard key={index} endpoint={endpoint} copiedCode={copiedCode} copyCode={copyCode} />
              ))}
            </div>
          </motion.div>
        ))}

        {/* Rate Limits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-6">Rate Limits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RateLimitCard tier="Professional" limit="1,000/hour" burst="2,000" />
            <RateLimitCard tier="Business" limit="5,000/hour" burst="10,000" />
            <RateLimitCard tier="Enterprise" limit="Unlimited" burst="Unlimited" />
          </div>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card-premium rounded-2xl p-12 text-center"
        >
          <Book className="w-16 h-16 text-[#2EBFFF] mx-auto mb-6" />
          <h2 className="mb-4">Need Help?</h2>
          <p className="text-[#9EA7B8] mb-8 max-w-2xl mx-auto">
            Check out our interactive API playground or contact our developer support team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              <Terminal className="w-5 h-5" />
              <span>Try API Playground</span>
            </button>
            <button className="btn-secondary">
              <span>Contact Support</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function QuickStartStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] flex items-center justify-center mx-auto mb-4 glow-effect">
        <span className="text-xl">{number}</span>
      </div>
      <h3 className="mb-2">{title}</h3>
      <p className="text-[#9EA7B8]">{description}</p>
    </div>
  );
}

function EndpointCard({ endpoint, copiedCode, copyCode }: { endpoint: any; copiedCode: string | null; copyCode: (code: string, id: string) => void }) {
  const methodColor = endpoint.method === 'GET' ? 'text-[#4CAF50]' : 'text-[#2EBFFF]';
  
  return (
    <div className="glass-card rounded-xl p-6 hover-lift">
      <div className="flex items-start gap-4 mb-4">
        <span className={`px-3 py-1 rounded-lg glass-card ${methodColor} font-mono`}>
          {endpoint.method}
        </span>
        <div className="flex-1">
          <code className="text-[#B2FF59]">{endpoint.path}</code>
          <p className="text-[#9EA7B8] mt-2">{endpoint.description}</p>
        </div>
      </div>

      {endpoint.params.length > 0 && (
        <div className="mb-4">
          <div className="text-[#9EA7B8] mb-2">Parameters:</div>
          <div className="flex flex-wrap gap-2">
            {endpoint.params.map((param: string) => (
              <span key={param} className="px-2 py-1 rounded bg-white/10 text-xs font-mono">
                {param}
              </span>
            ))}
          </div>
        </div>
      )}

      {endpoint.example && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#9EA7B8]">Request Body:</span>
            <button
              onClick={() => copyCode(endpoint.example, `example-${endpoint.path}`)}
              className="text-[#2EBFFF] hover:text-[#AE71FF] transition-colors"
            >
              {copiedCode === `example-${endpoint.path}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <pre className="bg-black/40 rounded-lg p-4 text-[#B2FF59] text-sm overflow-x-auto">
            {endpoint.example}
          </pre>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#9EA7B8]">Response:</span>
          <button
            onClick={() => copyCode(endpoint.response, `response-${endpoint.path}`)}
            className="text-[#2EBFFF] hover:text-[#AE71FF] transition-colors"
          >
            {copiedCode === `response-${endpoint.path}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <pre className="bg-black/40 rounded-lg p-4 text-[#B2FF59] text-sm overflow-x-auto">
          {endpoint.response}
        </pre>
      </div>
    </div>
  );
}

function RateLimitCard({ tier, limit, burst }: { tier: string; limit: string; burst: string }) {
  return (
    <div className="glass-card p-6 rounded-xl text-center">
      <h3 className="mb-4">{tier}</h3>
      <div className="metric-value text-[#2EBFFF] mb-2">{limit}</div>
      <p className="text-[#9EA7B8] mb-4">Requests per hour</p>
      <div className="glass-card p-3 rounded-lg">
        <div className="text-xs text-[#9EA7B8] mb-1">Burst Capacity</div>
        <div className="text-[#B2FF59]">{burst}</div>
      </div>
    </div>
  );
}
