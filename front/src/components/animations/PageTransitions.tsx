import { motion, AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';

// Page Transition Wrapper
interface PageTransitionProps {
  children: ReactNode;
  variant?: 'slide-blur' | 'fade-scale' | 'cyber-scan';
  routeKey?: string;
}

// Slide-in + Blur Transition
export function SlideBlurTransition({ children, routeKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{ x: 40, opacity: 0, filter: 'blur(4px)' }}
        animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
        exit={{ x: -40, opacity: 0, filter: 'blur(4px)' }}
        transition={{ duration: 0.42, ease: [0.165, 0.84, 0.44, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Fade + Scale Entry
export function FadeScaleTransition({ children, routeKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.04 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {/* Neon Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            boxShadow: [
              '0 0 0px rgba(46, 191, 255, 0)',
              '0 0 40px rgba(46, 191, 255, 0.6)',
              '0 0 0px rgba(46, 191, 255, 0)'
            ]
          }}
          transition={{ duration: 0.6 }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Cyber Scan Page Reveal
export function CyberScanTransition({ children, routeKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Scanline Effect */}
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none"
          initial={{ y: '-100%' }}
          animate={{ y: '100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="w-full h-2 bg-gradient-to-b from-transparent via-[#2EBFFF] to-transparent" 
               style={{ boxShadow: '0 0 20px rgba(46, 191, 255, 0.8)' }} />
        </motion.div>

        {/* Tech Grid Overlay */}
        <motion.div
          className="absolute inset-0 z-40 pointer-events-none bg-grid"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Universal Page Transition
export function PageTransition({ 
  children, 
  variant = 'slide-blur',
  routeKey 
}: PageTransitionProps) {
  switch (variant) {
    case 'slide-blur':
      return <SlideBlurTransition routeKey={routeKey}>{children}</SlideBlurTransition>;
    case 'fade-scale':
      return <FadeScaleTransition routeKey={routeKey}>{children}</FadeScaleTransition>;
    case 'cyber-scan':
      return <CyberScanTransition routeKey={routeKey}>{children}</CyberScanTransition>;
    default:
      return <SlideBlurTransition routeKey={routeKey}>{children}</SlideBlurTransition>;
  }
}

// Route Change Animation Wrapper
interface RouteChangeProps {
  children: ReactNode;
  currentRoute: string;
  variant?: 'slide-blur' | 'fade-scale' | 'cyber-scan';
}

export function RouteChangeAnimation({ 
  children, 
  currentRoute,
  variant = 'slide-blur' 
}: RouteChangeProps) {
  return (
    <PageTransition variant={variant} routeKey={currentRoute}>
      {children}
    </PageTransition>
  );
}
