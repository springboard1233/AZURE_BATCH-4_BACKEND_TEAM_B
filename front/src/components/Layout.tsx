import { ReactNode, useState } from 'react';
import { Link, useLocation } from '../context/NavigationContext';
import { Menu, X, Cloud, TrendingUp, BarChart3, Activity, Lightbulb, Info, Moon, Sun, LineChart, GitCompare, Code, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', label: 'Home', icon: Cloud },
    { path: '/features', label: 'Features', icon: TrendingUp },
    { path: '/live-demo', label: 'Live Demo', icon: Activity },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/forecast-dashboard', label: 'Forecasts', icon: LineChart },
    { path: '/model-comparison', label: 'Models', icon: GitCompare },
    { path: '/api-integration', label: 'API', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F15] via-[#1a1f2e] to-[#0B0F15] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <Cloud className="w-8 h-8 text-[#2EBFFF]" />
                <div className="absolute inset-0 blur-xl bg-[#2EBFFF] opacity-50"></div>
              </div>
              <span className="bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
                AI Cloud Forecasting
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg glass-card hover:bg-white/10 transition-all"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-[#B2FF59]" /> : <Moon className="w-5 h-5 text-[#2EBFFF]" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg glass-card"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden glass-card m-4 rounded-xl border border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`nav-link w-full justify-start ${isActive ? 'nav-link-active' : ''}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <button
                onClick={toggleTheme}
                className="nav-link w-full justify-start"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>Toggle Theme</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Cloud className="w-8 h-8 text-[#2EBFFF]" />
                <span className="bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
                  AI Cloud Forecasting Platform
                </span>
              </div>
              <p className="text-[#9EA7B8] max-w-md">
                Predict, monitor, and optimize global cloud workloads using real-time AI models. Enterprise-grade forecasting for modern cloud infrastructure.
              </p>
            </div>
            <div>
              <h3 className="mb-4">Platform</h3>
              <ul className="space-y-2 text-[#9EA7B8]">
                <li><Link to="/features" className="hover:text-[#2EBFFF] transition-colors">Features</Link></li>
                <li><Link to="/dashboard" className="hover:text-[#2EBFFF] transition-colors">Dashboard</Link></li>
                <li><Link to="/forecast-dashboard" className="hover:text-[#2EBFFF] transition-colors">Forecasts</Link></li>
                <li><Link to="/visualization" className="hover:text-[#2EBFFF] transition-colors">Visualizations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Resources</h3>
              <ul className="space-y-2 text-[#9EA7B8]">
                <li><Link to="/model-comparison" className="hover:text-[#2EBFFF] transition-colors">Model Comparison</Link></li>
                <li><Link to="/api-integration" className="hover:text-[#2EBFFF] transition-colors">API Integration</Link></li>
                <li><Link to="/user-enhancements" className="hover:text-[#2EBFFF] transition-colors">User Enhancements</Link></li>
                <li><Link to="/modal-animations" className="hover:text-[#2EBFFF] transition-colors">Modal Animations</Link></li>
                <li><Link to="/animations-showcase" className="hover:text-[#2EBFFF] transition-colors">Animations Showcase</Link></li>
                <li><Link to="/ui-transitions-showcase" className="hover:text-[#2EBFFF] transition-colors">UI Transitions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Company</h3>
              <ul className="space-y-2 text-[#9EA7B8]">
                <li><Link to="/about" className="hover:text-[#2EBFFF] transition-colors">About</Link></li>
                <li><Link to="/partners" className="hover:text-[#2EBFFF] transition-colors">Partners</Link></li>
                <li><Link to="/security" className="hover:text-[#2EBFFF] transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-[#9EA7B8]">
            <p>&copy; 2025 Azure Intelligent Cloud Forecasting Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}