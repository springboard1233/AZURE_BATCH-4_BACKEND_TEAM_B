import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, useState } from 'react';

// Animated Sidebar Component
interface AnimatedSidebarProps {
  children: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  variant?: 'slide-fade' | '3d-accordion' | 'hover-expand';
  className?: string;
}

// Slide + Fade Sidebar
export function AnimatedSidebar({ 
  children, 
  isExpanded, 
  onToggle,
  variant = 'slide-fade',
  className = '' 
}: AnimatedSidebarProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        width: isExpanded ? 280 : 72
      }}
      transition={{ duration: 0.42, ease: [0.165, 0.84, 0.44, 1] }}
    >
      {/* Neon Border Glow */}
      {isExpanded && (
        <motion.div
          className="absolute inset-0 rounded-r-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            boxShadow: '2px 0 20px rgba(46, 191, 255, 0.3)'
          }}
        />
      )}
      
      {children}
    </motion.div>
  );
}

// Sidebar Item with Staggered Animation
interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  isExpanded: boolean;
  isActive?: boolean;
  onClick?: () => void;
  delay?: number;
}

export function AnimatedSidebarItem({ 
  icon, 
  label, 
  isExpanded, 
  isActive = false,
  onClick,
  delay = 0 
}: SidebarItemProps) {
  return (
    <motion.button
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-gradient-to-r from-[#2EBFFF]/20 to-[#AE71FF]/20 text-[#2EBFFF]' 
          : 'text-[#9EA7B8] hover:bg-white/5'
      }`}
      onClick={onClick}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.96 }}
    >
      <motion.div
        animate={{ scale: isExpanded ? 1 : 1.2 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, delay: delay * 0.05 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// 3D Accordion Sidebar
export function AccordionSidebar({ 
  children, 
  isExpanded, 
  className = '' 
}: Omit<AnimatedSidebarProps, 'onToggle'>) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        width: isExpanded ? 280 : 72,
        rotateY: isExpanded ? 0 : -12
      }}
      transition={{ 
        duration: 0.42, 
        ease: [0.68, -0.55, 0.265, 1.55]
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {children}
    </motion.div>
  );
}

// Hover Expand Mini-Sidebar
export function HoverExpandSidebar({ 
  children, 
  className = '' 
}: { children: ReactNode; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        width: isHovered ? 280 : 72
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Glassmorphism Preview Panel */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 glass-card rounded-r-2xl pointer-events-none"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          style={{
            boxShadow: '4px 0 30px rgba(0, 0, 0, 0.3)'
          }}
        />
      )}
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Collapsible Sidebar Section
interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  isExpanded: boolean;
  defaultOpen?: boolean;
}

export function CollapsibleSidebarSection({ 
  title, 
  children, 
  isExpanded,
  defaultOpen = false 
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-2">
      {isExpanded && (
        <motion.button
          className="flex items-center justify-between w-full px-4 py-2 text-sm text-[#9EA7B8] hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ x: 2 }}
        >
          <span>{title}</span>
          <motion.svg
            className="w-4 h-4"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>
      )}
      
      <AnimatePresence>
        {(isOpen || !isExpanded) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sidebar Toggle Button
export function SidebarToggleButton({ 
  isExpanded, 
  onToggle 
}: { isExpanded: boolean; onToggle: () => void }) {
  return (
    <motion.button
      className="flex items-center justify-center w-10 h-10 rounded-lg glass-card hover:bg-white/10"
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.svg
        className="w-6 h-6 text-[#2EBFFF]"
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
      </motion.svg>
    </motion.button>
  );
}
