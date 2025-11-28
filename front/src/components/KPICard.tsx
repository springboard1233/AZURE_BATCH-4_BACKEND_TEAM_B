import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface KPICardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  suffix?: string;
  duration?: number;
  onClick?: () => void;
  variant?: 'default' | 'scanline' | 'gradient-drift' | 'glow-pulse';
  glowColor?: string;
}

export function KPICard({ 
  icon: Icon, 
  title, 
  value, 
  suffix = "", 
  duration = 1000, 
  onClick,
  variant = 'default',
  glowColor = '#2EBFFF'
}: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      setDisplayValue(Math.floor(easeOut * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration]);

  const handleClick = () => {
    setIsExpanded(true);
    setTimeout(() => setIsExpanded(false), 80);
    onClick?.();
  };

  // Base card content
  const cardContent = (
    <>
      {/* Scanline effect for scanline variant */}
      {variant === 'scanline' && (
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
      )}

      {/* Gradient drift background for gradient-drift variant */}
      {variant === 'gradient-drift' && (
        <motion.div
          className="absolute inset-0 opacity-20 rounded-lg pointer-events-none"
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
      )}

      {/* Glow pulse for glow-pulse variant */}
      {variant === 'glow-pulse' && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
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
      )}

      <div className="relative z-10 flex items-center gap-4">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Icon className="w-7 h-7 text-accent" />
        </motion.div>
        <div>
          <h3 className="opacity-80">{title}</h3>
          <motion.span
            className="text-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {displayValue}
            {suffix}
          </motion.span>
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      className="bg-card rounded-lg p-5 shadow-md relative overflow-hidden cursor-pointer"
      onClick={handleClick}
      animate={{
        scale: isExpanded ? 1.06 : 1
      }}
      whileHover={{
        scale: 1.04,
        boxShadow: `0 12px 40px ${glowColor}40, 0 0 60px ${glowColor}20`,
        y: -6
      }}
      transition={{ duration: 0.18, ease: [0.165, 0.84, 0.44, 1] }}
    >
      {cardContent}
    </motion.div>
  );
}