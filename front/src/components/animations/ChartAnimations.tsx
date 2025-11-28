import { motion } from 'motion/react';
import { ReactNode } from 'react';

// Line Chart Draw Animation Wrapper
interface ChartAnimationProps {
  children: ReactNode;
  delay?: number;
}

export function AnimatedLineChart({ children, delay = 0 }: ChartAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Area Chart Fade + Rise Animation
export function AnimatedAreaChart({ children, delay = 0 }: ChartAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Bar Chart Grow Animation
export function AnimatedBarChart({ children, delay = 0 }: ChartAnimationProps) {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.68, -0.55, 0.265, 1.55] // Bounce easing
      }}
      style={{ transformOrigin: 'bottom' }}
    >
      {children}
    </motion.div>
  );
}

// Heatmap Fade-In with Blur→Sharp
export function AnimatedHeatmap({ children, delay = 0 }: ChartAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(6px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.48, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Forecast Band Expansion
export function AnimatedForecastBand({ children, delay = 0 }: ChartAnimationProps) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 0.4 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      style={{ transformOrigin: 'left' }}
    >
      {children}
    </motion.div>
  );
}

// Staggered Chart Container
interface StaggeredChartProps {
  children: ReactNode;
  staggerDelay?: number;
}

export function StaggeredChartContainer({ children, staggerDelay = 0.1 }: StaggeredChartProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Chart Section Reveal
export function ChartSectionReveal({ children, delay = 0 }: ChartAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.165, 0.84, 0.44, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Loading Skeleton for Charts
export function ChartLoadingSkeleton() {
  return (
    <div className="w-full h-64 glass-card rounded-xl p-4 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
      <div className="space-y-3">
        <div className="h-4 bg-white/10 rounded w-1/3" />
        <div className="h-40 bg-white/5 rounded" />
        <div className="flex gap-2">
          <div className="h-3 bg-white/10 rounded w-1/4" />
          <div className="h-3 bg-white/10 rounded w-1/4" />
          <div className="h-3 bg-white/10 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

// Number Count Up Animation
interface CountUpProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUpAnimation({ 
  value, 
  duration = 0.9, 
  suffix = '', 
  prefix = '',
  className = ''
}: CountUpProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        initial={{ textContent: 0 }}
        animate={{ textContent: value }}
        transition={{ duration, ease: 'easeOut' }}
      >
        {(v: any) => `${prefix}${Math.round(v.textContent)}${suffix}`}
      </motion.span>
    </motion.span>
  );
}
