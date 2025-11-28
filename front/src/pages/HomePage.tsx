import { useState, useEffect } from 'react';
import { Link } from '../context/NavigationContext';
import { ArrowRight, Cloud, Cpu, Users, TrendingUp, Zap, Shield, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'AI-Powered Demand Forecasting & Capacity Optimization';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section with 3D Elements */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-cloud"></div>
          <div className="floating-cloud" style={{ animationDelay: '2s', top: '60%', left: '70%' }}></div>
          <div className="floating-cloud" style={{ animationDelay: '4s', top: '30%', left: '20%' }}></div>

          {/* Animated Grid */}
          <div className="absolute inset-0 bg-grid opacity-20"></div>

          {/* Glowing Orbs */}
          <div className="glow-orb" style={{ top: '20%', left: '10%', background: '#2EBFFF' }}></div>
          <div className="glow-orb" style={{ top: '60%', right: '10%', background: '#AE71FF' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* 3D Holographic Cloud */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <Cloud className="w-32 h-32 text-[#2EBFFF] mx-auto hologram-effect" />
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] opacity-50 animate-pulse"></div>
            </div>
          </motion.div>

          {/* Typewriter Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6 min-h-[8rem]"
          >
            <span className="neon-text">{typedText}</span>
            <span className="animate-blink">|</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[#9EA7B8] mb-12 max-w-3xl mx-auto"
          >
            Predict, monitor, and optimize global cloud workloads using real-time AI models. 
            Enterprise-grade forecasting powered by ARIMA, LSTM, and XGBoost.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/dashboard" className="btn-primary group">
              <span>Launch Analytics Platform</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="btn-secondary group">
              <span>Download Whitepaper</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Animated Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <MetricCard
              icon={<TrendingUp className="w-8 h-8" />}
              value="19-Day"
              label="Forecast Horizon"
              color="from-[#2EBFFF] to-[#1a8acc]"
            />
            <MetricCard
              icon={<Shield className="w-8 h-8" />}
              value="99%"
              label="Model Health Score"
              color="from-[#4CAF50] to-[#2d7a32]"
            />
            <MetricCard
              icon={<Cpu className="w-8 h-8" />}
              value="Multi-Model AI"
              label="ARIMA, LSTM, XGBoost"
              color="from-[#AE71FF] to-[#7b4db3]"
            />
          </motion.div>
        </div>
      </section>

      {/* Quick Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
              Platform Capabilities
            </h2>
            <p className="text-[#9EA7B8] max-w-2xl mx-auto">
              Enterprise-grade cloud intelligence with advanced AI/ML forecasting
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Cloud className="w-10 h-10 text-[#2EBFFF]" />}
              title="Real-Time Forecasting"
              description="Predict CPU, storage, and user demands with 99% accuracy"
            />
            <FeatureCard
              icon={<Globe className="w-10 h-10 text-[#AE71FF]" />}
              title="Regional Analytics"
              description="Multi-region insights with intelligent model selection"
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10 text-[#B2FF59]" />}
              title="Auto Optimization"
              description="AI-driven resource allocation and cost savings"
            />
            <FeatureCard
              icon={<Users className="w-10 h-10 text-[#2EBFFF]" />}
              title="Behavior Intelligence"
              description="Track seasonal patterns and user activity trends"
            />
          </div>
        </div>
      </section>

      {/* Floating Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card-premium rounded-2xl p-12 text-center"
        >
          <h2 className="mb-4">Ready to Transform Your Cloud Operations?</h2>
          <p className="text-[#9EA7B8] mb-8">
            Join enterprise teams using AI-powered forecasting to optimize their cloud infrastructure
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            <span>Get Started Today</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

function MetricCard({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <div className="glass-card-premium p-6 rounded-xl hover-lift">
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 mx-auto glow-effect`}>
        {icon}
      </div>
      <div className="metric-value mb-2">{value}</div>
      <div className="text-[#9EA7B8]">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card p-6 rounded-xl hover-lift group"
    >
      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="mb-2">{title}</h3>
      <p className="text-[#9EA7B8]">{description}</p>
    </motion.div>
  );
}
