import { motion, MotionProps } from 'motion/react';
import { ReactNode, useState } from 'react';

// Hover Scale and Glow Animation
interface AnimatedHoverCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  scaleAmount?: number;
}

export function AnimatedHoverCard({ 
  children, 
  className = '', 
  glowColor = '#2EBFFF',
  scaleAmount = 1.04,
  ...props 
}: AnimatedHoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: scaleAmount,
        y: -6,
        boxShadow: `0 12px 40px ${glowColor}40, 0 0 60px ${glowColor}20`
      }}
      transition={{ duration: 0.16, ease: [0.165, 0.84, 0.44, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Hover Glow Beam Effect
export function AnimatedGlowBeam({ 
  children, 
  className = '',
  ...props 
}: AnimatedHoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      {...props}
    >
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2EBFFF]/30 to-transparent pointer-events-none"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}
      {children}
    </motion.div>
  );
}

// Hover Ripple Effect
export function AnimatedRipple({ 
  children, 
  className = '',
  ...props 
}: AnimatedHoverCardProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples([...ripples, { x, y, id }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleHover}
      {...props}
    >
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full bg-gradient-to-r from-[#2EBFFF]/40 to-[#AE71FF]/40 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }}
          animate={{ width: 300, height: 300, x: -150, y: -150, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      {children}
    </motion.div>
  );
}

// Hover Depth Parallax
export function AnimatedParallax({ 
  children, 
  className = '',
  ...props 
}: AnimatedHoverCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`,
        transition: 'transform 0.2s ease-out'
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Animated Button Component
interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

export function AnimatedButton({ 
  children, 
  className = '', 
  onClick,
  variant = 'primary',
  disabled = false
}: AnimatedButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg transition-all relative overflow-hidden';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] text-white',
    secondary: 'bg-white/10 border border-white/20 text-white',
    ghost: 'bg-transparent hover:bg-white/5 text-white'
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ 
        scale: 1.04,
        boxShadow: '0 0 30px rgba(46, 191, 255, 0.4)'
      }}
      whileTap={{ 
        scale: 0.94
      }}
      transition={{ 
        duration: 0.14,
        ease: [0.165, 0.84, 0.44, 1]
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Pulsing Glow Button
export function PulsingGlowButton({ 
  children, 
  className = '', 
  onClick,
  disabled = false
}: AnimatedButtonProps) {
  return (
    <motion.button
      className={`px-6 py-3 rounded-lg bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] text-white relative ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg bg-[#2EBFFF]"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Neon Border Expand Button
export function NeonBorderButton({ 
  children, 
  className = '', 
  onClick,
  disabled = false
}: AnimatedButtonProps) {
  return (
    <motion.button
      className={`px-6 py-3 rounded-lg bg-transparent text-white relative ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover="hover"
      whileTap={{ scale: 0.94 }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg border"
        variants={{
          hover: {
            borderWidth: '3px',
            borderColor: ['#2EBFFF', '#AE71FF', '#2EBFFF']
          }
        }}
        transition={{
          borderColor: { duration: 1, repeat: Infinity },
          borderWidth: { duration: 0.2 }
        }}
        style={{ borderWidth: '1px', borderColor: '#2EBFFF' }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
