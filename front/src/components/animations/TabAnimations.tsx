import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, useState } from 'react';

// Tab Transition Types
interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface AnimatedTabsProps {
  tabs: TabItem[];
  variant?: 'slide-glow' | '3d-flip' | 'liquid-gradient';
  className?: string;
  defaultTab?: string;
}

// Smooth Slide + Glow Tab Animation
export function AnimatedTabs({ 
  tabs, 
  variant = 'slide-glow',
  className = '',
  defaultTab 
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

  return (
    <div className={className}>
      {/* Tab Bar */}
      <div className="relative flex border-b border-white/10">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-3 transition-colors duration-200 ${
              activeTab === tab.id ? 'text-[#2EBFFF]' : 'text-[#9EA7B8]'
            }`}
          >
            <div className="flex items-center gap-2">
              {tab.icon}
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
        
        {/* Animated Indicator */}
        {variant === 'slide-glow' && (
          <motion.div
            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF]"
            initial={false}
            animate={{
              left: `${activeIndex * (100 / tabs.length)}%`,
              width: `${100 / tabs.length}%`
            }}
            transition={{ duration: 0.24, ease: [0.33, 1, 0.68, 1] }}
            style={{
              boxShadow: '0 0 20px rgba(46, 191, 255, 0.6)'
            }}
          />
        )}
      </div>

      {/* Tab Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {tabs.map(tab => 
            tab.id === activeTab && (
              <motion.div
                key={tab.id}
                initial={getInitialAnimation(variant)}
                animate={getAnimateAnimation(variant)}
                exit={getExitAnimation(variant)}
                transition={getTransition(variant)}
              >
                {tab.content}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 3D Flip Tab
export function FlipTab({ tabs, className = '', defaultTab }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={className}>
      <div className="flex gap-2 mb-4">
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] text-white' 
                : 'glass-card text-[#9EA7B8]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      <div style={{ perspective: '1000px' }}>
        <AnimatePresence mode="wait">
          {tabs.map(tab =>
            tab.id === activeTab && (
              <motion.div
                key={tab.id}
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.68, -0.55, 0.265, 1.55] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Holographic Highlight */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '200%', opacity: [0, 1, 0] }}
                  transition={{ duration: 0.35 }}
                />
                {tab.content}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Liquid Gradient Tab
export function LiquidGradientTab({ tabs, className = '', defaultTab }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

  return (
    <div className={className}>
      <div className="relative">
        {/* Liquid Gradient Background */}
        <motion.div
          className="absolute inset-0 h-full rounded-lg opacity-30 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #2EBFFF 0%, #AE71FF 50%, #FF3D71 100%)',
            backgroundSize: '200% 100%'
          }}
          animate={{
            backgroundPosition: [`${activeIndex * 50}% 0%`, `${(activeIndex + 1) * 50}% 0%`]
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        <div className="relative flex gap-2">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onHoverStart={() => setHoveredTab(tab.id)}
              onHoverEnd={() => setHoveredTab(null)}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeTab === tab.id ? 'text-white' : 'text-[#9EA7B8]'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <AnimatePresence mode="wait">
          {tabs.map(tab =>
            tab.id === activeTab && (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.24 }}
              >
                {tab.content}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Helper Functions
function getInitialAnimation(variant: string) {
  switch (variant) {
    case 'slide-glow':
      return { opacity: 0, y: 10 };
    case '3d-flip':
      return { rotateY: -90, opacity: 0 };
    case 'liquid-gradient':
      return { opacity: 0, scale: 0.96 };
    default:
      return { opacity: 0, y: 10 };
  }
}

function getAnimateAnimation(variant: string) {
  switch (variant) {
    case 'slide-glow':
      return { opacity: 1, y: 0 };
    case '3d-flip':
      return { rotateY: 0, opacity: 1 };
    case 'liquid-gradient':
      return { opacity: 1, scale: 1 };
    default:
      return { opacity: 1, y: 0 };
  }
}

function getExitAnimation(variant: string) {
  switch (variant) {
    case 'slide-glow':
      return { opacity: 0, y: -10 };
    case '3d-flip':
      return { rotateY: 90, opacity: 0 };
    case 'liquid-gradient':
      return { opacity: 0, scale: 1.04 };
    default:
      return { opacity: 0, y: -10 };
  }
}

function getTransition(variant: string) {
  switch (variant) {
    case 'slide-glow':
      return { duration: 0.24, ease: [0.33, 1, 0.68, 1] };
    case '3d-flip':
      return { duration: 0.35, ease: [0.68, -0.55, 0.265, 1.55] };
    case 'liquid-gradient':
      return { duration: 0.28, ease: 'easeOut' };
    default:
      return { duration: 0.24, ease: 'easeOut' };
  }
}
