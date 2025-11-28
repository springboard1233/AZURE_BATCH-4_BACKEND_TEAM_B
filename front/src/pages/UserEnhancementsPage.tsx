import { useState } from 'react';
import { Bell, HelpCircle, Search, Globe, Palette, Sparkles, MessageCircle, Star, Zap, Moon, Sun } from 'lucide-react';
import AnimatedModal from '../components/AnimatedModal';
import { Link } from '../context/NavigationContext';

const notifications = [
  { type: 'success', message: 'Model training completed successfully', time: '2 min ago' },
  { type: 'warning', message: 'CPU usage prediction shows 95% peak in 3 hours', time: '15 min ago' },
  { type: 'error', message: 'API rate limit approaching (85% used)', time: '1 hour ago' },
  { type: 'info', message: 'New forecast data available for EU-Central region', time: '2 hours ago' },
];

const microInteractions = [
  { name: 'Button Hover', demo: 'Glow effect on hover' },
  { name: 'Card Elevation', demo: '3D lift on mouse enter' },
  { name: 'Ripple Effect', demo: 'Click ripple animation' },
  { name: 'Smooth Transitions', demo: 'Color and size morphing' },
];

export default function UserEnhancementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-3">
          User Interaction Enhancements
        </h1>
        <p className="text-[#9EA7B8] text-lg">
          Personalization settings and UX improvement center
        </p>
      </div>

      {/* Notification Center */}
      <div className="glass-card p-6 rounded-xl border border-white/10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2EBFFF] opacity-5 blur-3xl rounded-full"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EBFFF] to-[#1DA1E0] flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <h2 className="text-2xl">Notification Center</h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm text-[#9EA7B8]">Enable</span>
              <div
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-12 h-6 rounded-full transition-all ${
                  notificationsEnabled ? 'bg-[#2EBFFF]' : 'bg-white/10'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-all transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  } mt-0.5`}
                ></div>
              </div>
            </label>
          </div>

          <div className="space-y-3">
            {notifications.map((notif, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-all hover:scale-[1.02] cursor-pointer ${
                  notif.type === 'success'
                    ? 'bg-[#B2FF59]/10 border-[#B2FF59]/30'
                    : notif.type === 'warning'
                    ? 'bg-[#FFA500]/10 border-[#FFA500]/30'
                    : notif.type === 'error'
                    ? 'bg-[#FF3D71]/10 border-[#FF3D71]/30'
                    : 'bg-[#2EBFFF]/10 border-[#2EBFFF]/30'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    notif.type === 'success'
                      ? 'bg-[#B2FF59]'
                      : notif.type === 'warning'
                      ? 'bg-[#FFA500]'
                      : notif.type === 'error'
                      ? 'bg-[#FF3D71]'
                      : 'bg-[#2EBFFF]'
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-white mb-1">{notif.message}</p>
                  <p className="text-[#9EA7B8] text-sm">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Filtering */}
      <div className="glass-card p-6 rounded-xl border border-white/10 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#AE71FF] to-[#8E51DF] flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <h2 className="text-2xl">Search & Filtering</h2>
        </div>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search forecasts, models, regions..."
            className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white focus:border-[#2EBFFF] focus:outline-none transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9EA7B8]" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {['CPU Forecasts', 'Storage Trends', 'LSTM Model', 'US-EAST', 'Critical Alerts'].map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-[#2EBFFF] hover:bg-[#2EBFFF]/10 transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Personalization Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Language Selector */}
        <div className="glass-card p-6 rounded-xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2EBFFF] opacity-10 blur-3xl rounded-full"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EBFFF] to-[#1DA1E0] flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-xl">Language</h3>
            </div>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#2EBFFF] focus:outline-none"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="glass-card p-6 rounded-xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#AE71FF] opacity-10 blur-3xl rounded-full"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#AE71FF] to-[#8E51DF] flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-xl">Theme</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Dark', value: 'dark', icon: Moon, color: '#0B0F15' },
                { name: 'Light', value: 'light', icon: Sun, color: '#F8FAFC' },
                { name: 'Neon', value: 'neon', icon: Sparkles, color: '#2EBFFF' },
              ].map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => setSelectedTheme(theme.value)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedTheme === theme.value
                      ? 'border-[#2EBFFF] bg-[#2EBFFF]/10'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div
                    className="w-full h-12 rounded-lg mb-2"
                    style={{ backgroundColor: theme.color }}
                  ></div>
                  <p className="text-sm">{theme.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltips System */}
      <div className="glass-card p-6 rounded-xl border border-white/10 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#B2FF59] to-[#92DF39] flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-black" />
          </div>
          <h2 className="text-2xl">Interactive Tooltips</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'RMSE', tooltip: 'Root Mean Square Error - measures prediction accuracy' },
            { label: 'Forecast Horizon', tooltip: 'Time period for future predictions' },
            { label: 'Confidence Interval', tooltip: 'Range where actual value is likely to fall' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative p-4 bg-black/40 border border-white/10 rounded-lg hover:border-[#2EBFFF] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-white">{item.label}</span>
                <HelpCircle className="w-4 h-4 text-[#9EA7B8]" />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[#2EBFFF] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
                <p className="text-sm">{item.tooltip}</p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-8 border-transparent border-t-[#2EBFFF]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Micro-interactions Gallery */}
      <div className="glass-card p-6 rounded-xl border border-white/10 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#AE71FF] to-[#8E51DF] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl">Micro-interactions Preview</h2>
          </div>
          <Link 
            to="/modal-animations"
            className="px-4 py-2 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] rounded-lg hover:opacity-80 transition-all text-sm"
          >
            View All Animations
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {microInteractions.map((interaction, idx) => (
            <div
              key={idx}
              className="group p-6 bg-gradient-to-br from-[#2EBFFF]/10 to-[#AE71FF]/10 border border-white/10 rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(46,191,255,0.3)] transition-all cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#2EBFFF] to-[#AE71FF] rounded-lg mb-3 group-hover:rotate-12 transition-all"></div>
              <h3 className="mb-2">{interaction.name}</h3>
              <p className="text-sm text-[#9EA7B8]">{interaction.demo}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Onboarding Tutorial */}
      <div className="glass-card p-6 rounded-xl border border-white/10 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#B2FF59] to-[#92DF39] flex items-center justify-center">
              <Star className="w-5 h-5 text-black" />
            </div>
            <h2 className="text-2xl">Onboarding Tutorial</h2>
          </div>
          <button
            onClick={() => setShowOnboarding(!showOnboarding)}
            className="px-4 py-2 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] rounded-lg hover:opacity-80 transition-all"
          >
            {showOnboarding ? 'Hide' : 'Show'} Tutorial
          </button>
        </div>
        {showOnboarding && (
          <div className="space-y-4">
            {[
              { step: 1, title: 'Welcome to Cloud Forecasting', desc: 'Get started with AI-powered predictions' },
              { step: 2, title: 'Choose Your Region', desc: 'Select the data center you want to monitor' },
              { step: 3, title: 'Select Forecasting Model', desc: 'Pick ARIMA, LSTM, or XGBoost based on your needs' },
              { step: 4, title: 'View Your Dashboard', desc: 'Explore interactive charts and insights' },
            ].map((tutorial) => (
              <div
                key={tutorial.step}
                className="flex items-start gap-4 p-4 bg-black/40 border border-white/10 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#2EBFFF] to-[#AE71FF] rounded-full flex items-center justify-center shrink-0">
                  {tutorial.step}
                </div>
                <div>
                  <h3 className="mb-1">{tutorial.title}</h3>
                  <p className="text-sm text-[#9EA7B8]">{tutorial.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className="glass-card w-80 h-96 rounded-xl border border-white/10 mb-4 flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>AI Assistant</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:opacity-80">
                ✕
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm">Hello! I'm your AI assistant. How can I help you today?</p>
                </div>
                <div className="bg-[#2EBFFF]/20 rounded-lg p-3 ml-8">
                  <p className="text-sm">Show me CPU forecasts for US-East</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm">Here's the latest CPU forecast for US-East region...</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-white/10">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-[#2EBFFF] focus:outline-none"
              />
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* User Feedback Form */}
      <div className="glass-card p-6 rounded-xl border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EBFFF] to-[#1DA1E0] flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-2xl">Feedback & Suggestions</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#9EA7B8] mb-2">How would you rate your experience?</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg hover:border-[#B2FF59] hover:bg-[#B2FF59]/10 transition-all"
                >
                  <Star className="w-5 h-5 mx-auto" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#9EA7B8] mb-2">Additional comments</label>
            <textarea
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#2EBFFF] focus:outline-none resize-none"
              rows={4}
              placeholder="Share your thoughts..."
            ></textarea>
          </div>
          <button className="w-full px-4 py-3 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] rounded-lg hover:opacity-80 transition-all">
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}