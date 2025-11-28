import { motion } from 'motion/react';
import { ReactNode, useState } from 'react';

// KPI Hover Pulse Animation
interface KPIAnimatedCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  glowColor?: string;
}

export function KPIAnimatedCard({ 
  children, 
  className = '',
  onClick,
  glowColor = '#2EBFFF'
}: KPIAnimatedCardProps) {
  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{
        scale: 1.04,
        boxShadow: `0 12px 40px ${glowColor}40, 0 0 60px ${glowColor}20`
      }}
      whileTap={{
        scale: 1.06
      }}
      transition={{ duration: 0.18, ease: [0.165, 0.84, 0.44, 1] }}
    >
      {children}
    </motion.div>
  );
}

// KPI with Scanline Animation
export function KPIScanlineCard({ 
  children, 
  className = '',
  onClick
}: KPIAnimatedCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 1.06 }}
    >
      {/* Scanline Effect */}
      <motion.div
        className="absolute inset-0 h-[2px] bg-gradient-to-r from-transparent via-[#2EBFFF]/60 to-transparent pointer-events-none"
        animate={{ y: ['-100%', '400%'] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 2
        }}
      />
      {children}
    </motion.div>
  );
}

// KPI with Background Gradient Drift
export function KPIGradientDriftCard({ 
  children, 
  className = '',
  onClick
}: KPIAnimatedCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
    >
      {/* Gradient Drift Background */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #2EBFFF 0%, #AE71FF 50%, #2EBFFF 100%)',
          backgroundSize: '200% 200%'
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Animated KPI Number Counter
interface AnimatedKPINumberProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  delay?: number;
}

export function AnimatedKPINumber({ 
  value, 
  duration = 0.9, 
  suffix = '', 
  prefix = '',
  decimals = 0,
  className = '',
  delay = 0
}: AnimatedKPINumberProps) {
  const [displayValue, setDisplayValue] = useState(0);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      onAnimationComplete={() => {
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / (duration * 1000), 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(value * easeOut);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        animate();
      }}
    >
      {prefix}{displayValue.toFixed(decimals)}{suffix}
    </motion.div>
  );
}

// KPI Click Expand Effect
export function KPIClickExpand({ 
  children, 
  className = '',
  onClick,
  isExpanded = false
}: KPIAnimatedCardProps & { isExpanded?: boolean }) {
  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      animate={{
        scale: isExpanded ? 1.1 : 1
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 1.06 }}
      transition={{ duration: 0.08 }}
    >
      {children}
    </motion.div>
  );
}

// KPI Glow Pulse Effect
export function KPIGlowPulse({ 
  children, 
  className = '',
  onClick,
  glowColor = '#2EBFFF'
}: KPIAnimatedCardProps) {
  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
    >
      {/* Pulsing Glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          boxShadow: `0 0 0px ${glowColor}`
        }}
        animate={{
          boxShadow: [
            `0 0 0px ${glowColor}`,
            `0 0 40px ${glowColor}80, 0 0 80px ${glowColor}40`,
            `0 0 0px ${glowColor}`
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      {children}
    </motion.div>
  );
}

// Staggered KPI Grid
interface StaggeredKPIGridProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggeredKPIGrid({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: StaggeredKPIGridProps) {
  return (
    <motion.div
      className={className}
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

export function StaggeredKPIItem({ 
  children, 
  className = '' 
}: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.165, 0.84, 0.44, 1]
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// KPI Status Badge Animation
interface KPIBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info';
  children: ReactNode;
  className?: string;
}

export function AnimatedKPIBadge({ status, children, className = '' }: KPIBadgeProps) {
  const colors = {
    success: '#4CAF50',
    warning: '#FFA726',
    error: '#EF5350',
    info: '#2EBFFF'
  };

  return (
    <motion.div
      className={`px-3 py-1 rounded-full text-sm ${className}`}
      style={{ 
        backgroundColor: `${colors[status]}20`,
        color: colors[status]
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.3,
        type: 'spring',
        stiffness: 200
      }}
    >
      <motion.div
        animate={{
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
