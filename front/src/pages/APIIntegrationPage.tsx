import { useState } from 'react';
import { Key, Copy, Terminal, CheckCircle, XCircle, Clock, Send } from 'lucide-react';

const endpoints = [
  {
    method: 'GET',
    path: '/forecast/cpu',
    description: 'Get CPU usage forecast',
    params: ['region', 'horizon'],
  },
  {
    method: 'GET',
    path: '/forecast/storage',
    description: 'Get storage demand forecast',
    params: ['region', 'horizon'],
  },
  {
    method: 'GET',
    path: '/forecast/users',
    description: 'Get active users forecast',
    params: ['region', 'horizon'],
  },
  {
    method: 'POST',
    path: '/forecast/retrain',
    description: 'Trigger model retraining',
    params: ['model_type', 'dataset_id'],
  },
  {
    method: 'GET',
    path: '/model/status',
    description: 'Check model health status',
    params: ['model_id'],
  },
];

const codeExamples = {
  python: `import requests

# API Configuration
API_KEY = "your_api_key_here"
BASE_URL = "https://api.cloudforecast.ai/v1"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# Get CPU forecast
response = requests.get(
    f"{BASE_URL}/forecast/cpu",
    headers=headers,
    params={
        "region": "US-EAST",
        "horizon": "7D"
    }
)

forecast_data = response.json()
print(forecast_data)`,

  javascript: `// API Configuration
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.cloudforecast.ai/v1';

// Get CPU forecast
async function getCPUForecast() {
  const response = await fetch(
    \`\${BASE_URL}/forecast/cpu?region=US-EAST&horizon=7D\`,
    {
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  const data = await response.json();
  console.log(data);
}

getCPUForecast();`,

  curl: `# Get CPU forecast
curl -X GET "https://api.cloudforecast.ai/v1/forecast/cpu?region=US-EAST&horizon=7D" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json"

# Trigger model retraining
curl -X POST "https://api.cloudforecast.ai/v1/forecast/retrain" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model_type": "LSTM",
    "dataset_id": "dataset_12345"
  }'`,
};

const apiLogs = [
  { timestamp: '2025-11-27 14:32:15', endpoint: '/forecast/cpu', status: 200, duration: '142ms' },
  { timestamp: '2025-11-27 14:31:58', endpoint: '/forecast/storage', status: 200, duration: '156ms' },
  { timestamp: '2025-11-27 14:31:42', endpoint: '/model/status', status: 200, duration: '89ms' },
  { timestamp: '2025-11-27 14:31:25', endpoint: '/forecast/users', status: 200, duration: '134ms' },
  { timestamp: '2025-11-27 14:31:08', endpoint: '/forecast/retrain', status: 500, duration: '2340ms' },
];

export default function APIIntegrationPage() {
  const [selectedLang, setSelectedLang] = useState<'python' | 'javascript' | 'curl'>('python');
  const [apiKey, setApiKey] = useState('sk_live_1234567890abcdef');
  const [copied, setCopied] = useState(false);
  const [testEndpoint, setTestEndpoint] = useState('/forecast/cpu');
  const [testResponse, setTestResponse] = useState('');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTest = () => {
    setTestResponse(JSON.stringify({
      success: true,
      data: {
        region: 'US-EAST',
        forecast: [
          { timestamp: '2025-11-28', value: 78.5 },
          { timestamp: '2025-11-29', value: 82.3 },
          { timestamp: '2025-11-30', value: 85.1 },
        ],
        model: 'LSTM',
        confidence: 0.94
      }
    }, null, 2));
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-3">
          API Integration Center
        </h1>
        <p className="text-[#9EA7B8] text-lg">
          Developer tools and documentation for AI Cloud Forecasting API
        </p>
      </div>

      {/* API Key Section */}
      <div className="glass-card p-6 rounded-xl border border-white/10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2EBFFF] opacity-5 blur-3xl rounded-full"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EBFFF] to-[#1DA1E0] flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <h2 className="text-2xl">API Key</h2>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={apiKey}
              readOnly
              className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-mono text-[#2EBFFF]"
            />
            <button
              onClick={() => handleCopy(apiKey)}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] rounded-lg hover:opacity-80 transition-all"
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-[#9EA7B8] text-sm mt-3">
            Keep your API key secure. Do not share it publicly or commit it to version control.
          </p>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="glass-card p-6 rounded-xl border border-white/10 mb-8">
        <h2 className="text-2xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-6">
          Available Endpoints
        </h2>
        <div className="space-y-3">
          {endpoints.map((endpoint, idx) => (
            <div
              key={idx}
              className="bg-black/40 border border-white/10 rounded-lg p-4 hover:border-[#2EBFFF] transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-mono ${
                      endpoint.method === 'GET'
                        ? 'bg-[#B2FF59]/20 text-[#B2FF59]'
                        : 'bg-[#2EBFFF]/20 text-[#2EBFFF]'
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-[#2EBFFF] font-mono">{endpoint.path}</code>
                </div>
              </div>
              <p className="text-[#9EA7B8] text-sm mb-2">{endpoint.description}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-[#9EA7B8]">Parameters:</span>
                {endpoint.params.map((param, pIdx) => (
                  <span key={pIdx} className="text-xs px-2 py-1 bg-white/5 rounded font-mono text-[#AE71FF]">
                    {param}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <div className="glass-card p-6 rounded-xl border border-white/10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#AE71FF] opacity-5 blur-3xl rounded-full"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#AE71FF] to-[#8E51DF] flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <h2 className="text-2xl">Code Examples</h2>
            </div>
            <div className="flex items-center gap-2">
              {(['python', 'javascript', 'curl'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedLang === lang
                      ? 'bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] text-white'
                      : 'text-[#9EA7B8] hover:text-white'
                  }`}
                >
                  {lang === 'python' ? 'Python' : lang === 'javascript' ? 'JavaScript' : 'cURL'}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <pre className="bg-black/60 border border-white/10 rounded-lg p-6 overflow-x-auto">
              <code className="text-sm font-mono text-[#B2FF59]">{codeExamples[selectedLang]}</code>
            </pre>
            <button
              onClick={() => handleCopy(codeExamples[selectedLang])}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* API Tester */}
      <div className="glass-card p-6 rounded-xl border border-white/10 mb-8">
        <h2 className="text-2xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-6">
          Interactive API Tester
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-[#9EA7B8] mb-2">Select Endpoint</label>
            <select
              value={testEndpoint}
              onChange={(e) => setTestEndpoint(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white font-mono mb-4"
            >
              {endpoints.map((ep, idx) => (
                <option key={idx} value={ep.path}>
                  {ep.method} {ep.path}
                </option>
              ))}
            </select>
            <button
              onClick={handleTest}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] rounded-lg hover:opacity-80 transition-all"
            >
              <Send className="w-4 h-4" />
              Send Request
            </button>
          </div>
          <div>
            <label className="block text-sm text-[#9EA7B8] mb-2">Response</label>
            <pre className="bg-black/60 border border-white/10 rounded-lg p-4 h-40 overflow-auto">
              <code className="text-sm font-mono text-[#B2FF59]">
                {testResponse || '// Response will appear here...'}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Status & Rate Limits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6 rounded-xl border border-white/10">
          <h3 className="text-xl mb-4">API Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#9EA7B8]">All Systems</span>
              <span className="flex items-center gap-2 text-[#B2FF59]">
                <CheckCircle className="w-4 h-4" />
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#9EA7B8]">Uptime (30d)</span>
              <span className="text-white">99.98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#9EA7B8]">Avg Response</span>
              <span className="text-white">124ms</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-white/10">
          <h3 className="text-xl mb-4">Rate Limits</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#9EA7B8]">Requests/minute</span>
              <span className="text-white">1,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#9EA7B8]">Daily quota</span>
              <span className="text-white">100,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#9EA7B8]">Current usage</span>
              <span className="text-[#2EBFFF]">2,453 / 100,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* API Logs */}
      <div className="glass-card p-6 rounded-xl border border-white/10">
        <h2 className="text-2xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-6">
          Recent API Logs
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-[#9EA7B8]">Timestamp</th>
                <th className="text-left py-3 px-4 text-[#9EA7B8]">Endpoint</th>
                <th className="text-left py-3 px-4 text-[#9EA7B8]">Status</th>
                <th className="text-left py-3 px-4 text-[#9EA7B8]">Duration</th>
              </tr>
            </thead>
            <tbody>
              {apiLogs.map((log, idx) => (
                <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-all">
                  <td className="py-3 px-4 text-[#9EA7B8] font-mono text-sm">{log.timestamp}</td>
                  <td className="py-3 px-4 font-mono text-sm text-[#2EBFFF]">{log.endpoint}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`flex items-center gap-2 ${
                        log.status === 200 ? 'text-[#B2FF59]' : 'text-[#FF3D71]'
                      }`}
                    >
                      {log.status === 200 ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#9EA7B8] font-mono text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {log.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
