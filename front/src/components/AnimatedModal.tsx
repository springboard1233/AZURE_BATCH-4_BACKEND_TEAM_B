import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export type ModalAnimationType = 
  | 'scale-blur-glow'
  | 'slide-up'
  | '3d-depth'
  | 'ripple-light'
  | 'elastic-bounce'
  | 'fade-bloom'
  | 'scale-dissolve'
  | 'slide-down-blur'
  | 'light-scan'
  | 'parallax-glow';

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  animationType?: ModalAnimationType;
  width?: string;
}

const animations = {
  'scale-blur-glow': {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 0.6 },
      exit: { opacity: 0 },
      transition: { duration: 0.32, ease: [0.165, 0.84, 0.44, 1] }
    },
    modal: {
      initial: { scale: 0.85, opacity: 0, y: 14, filter: 'blur(10px)' },
      animate: { 
        scale: 1, 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        boxShadow: '0 0 60px rgba(46, 191, 255, 0.4), 0 0 120px rgba(46, 191, 255, 0.2)'
      },
      exit: { scale: 0.85, opacity: 0, filter: 'blur(10px)' },
      transition: { duration: 0.32, ease: [0.165, 0.84, 0.44, 1] }
    }
  },
  'slide-up': {
    overlay: {
      initial: { opacity: 0, backdropFilter: 'blur(0px)' },
      animate: { opacity: 0.6, backdropFilter: 'blur(8px)' },
      exit: { opacity: 0, backdropFilter: 'blur(0px)' },
      transition: { duration: 0.28 }
    },
    modal: {
      initial: { y: 40, opacity: 0 },
      animate: { 
        y: 0, 
        opacity: 1,
        boxShadow: '0 0 40px rgba(174, 113, 255, 0.5), 0 0 80px rgba(174, 113, 255, 0.3)'
      },
      exit: { y: 40, opacity: 0 },
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
    }
  },
  '3d-depth': {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 0.6 },
      exit: { opacity: 0 },
      transition: { duration: 0.36 }
    },
    modal: {
      initial: { 
        scale: 0.9, 
        opacity: 0, 
        rotateX: -4,
        transformPerspective: 1200
      },
      animate: { 
        scale: 1, 
        opacity: 1, 
        rotateX: 0,
        transformPerspective: 1200,
        boxShadow: '0 20px 80px rgba(46, 191, 255, 0.4), 0 0 60px rgba(174, 113, 255, 0.3)'
      },
      exit: { scale: 0.9, opacity: 0, rotateX: 4 },
      transition: { duration: 0.36, ease: [0.175, 0.885, 0.32, 1.275] }
    }
  },
  'ripple-light': {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 0.55 },
      exit: { opacity: 0 },
      transition: { duration: 0.42 }
    },
    modal: {
      initial: { scale: 0.7, opacity: 0 },
      animate: { 
        scale: 1, 
        opacity: 1,
        boxShadow: [
          '0 0 0px rgba(46, 191, 255, 0)',
          '0 0 80px rgba(46, 191, 255, 0.6), 0 0 120px rgba(174, 113, 255, 0.4)',
          '0 0 40px rgba(46, 191, 255, 0.3), 0 0 60px rgba(174, 113, 255, 0.2)'
        ]
      },
      exit: { scale: 0.7, opacity: 0 },
      transition: { duration: 0.42, ease: [0.33, 1, 0.68, 1] }
    }
  },
  'elastic-bounce': {
    overlay: {
      initial: { opacity: 0, filter: 'blur(0px)' },
      animate: { opacity: 0.6, filter: 'blur(4px)' },
      exit: { opacity: 0, filter: 'blur(0px)' },
      transition: { duration: 0.38 }
    },
    modal: {
      initial: { y: -30, opacity: 0 },
      animate: { 
        y: 0, 
        opacity: 1,
        boxShadow: '0 0 50px rgba(46, 191, 255, 0.3)'
      },
      exit: { y: -30, opacity: 0 },
      transition: { 
        duration: 0.38, 
        ease: [0.68, -0.55, 0.265, 1.55],
        opacity: { duration: 0.2 }
      }
    }
  },
  'fade-bloom': {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 0.6 },
      exit: { opacity: 0 },
      transition: { duration: 0.28 }
    },
    modal: {
      initial: { opacity: 0, filter: 'blur(20px)' },
      animate: { 
        opacity: 1,
        filter: 'blur(0px)',
        boxShadow: [
          '0 0 0px rgba(46, 191, 255, 0)',
          '0 0 100px rgba(46, 191, 255, 0.5)',
          '0 0 40px rgba(46, 191, 255, 0.3)'
        ]
      },
      exit: { opacity: 0, filter: 'blur(20px)' },
      transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] }
    }
  },
  'scale-dissolve': {
    overlay: {
      initial: { opacity: 0.6 },
      animate: { opacity: 0.6 },
      exit: { opacity: 0 },
      transition: { duration: 0.22 }
    },
    modal: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 1, opacity: 1 },
      exit: { 
        scale: 0.92, 
        opacity: 0,
        boxShadow: '0 0 0px rgba(46, 191, 255, 0)'
      },
      transition: { duration: 0.22, ease: [0.895, 0.03, 0.685, 0.22] }
    }
  },
  'slide-down-blur': {
    overlay: {
      initial: { opacity: 0.6 },
      animate: { opacity: 0.6 },
      exit: { opacity: 0 },
      transition: { duration: 0.26 }
    },
    modal: {
      initial: { y: 0, opacity: 1, filter: 'blur(0px)' },
      animate: { y: 0, opacity: 1, filter: 'blur(0px)' },
      exit: { y: 40, opacity: 0, filter: 'blur(8px)' },
      transition: { duration: 0.26, ease: [0.55, 0.085, 0.68, 0.53] }
    }
  },
  'light-scan': {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 0.6 },
      exit: { opacity: 0 },
      transition: { duration: 0.45 }
    },
    modal: {
      initial: { scale: 0.85, opacity: 0 },
      animate: { 
        scale: 1, 
        opacity: 1,
        boxShadow: [
          '0 0 0px rgba(46, 191, 255, 0)',
          '100px 0 80px rgba(46, 191, 255, 0.4), -100px 0 80px rgba(255, 61, 113, 0.4)',
          '0 0 50px rgba(46, 191, 255, 0.3), 0 0 70px rgba(174, 113, 255, 0.2)'
        ]
      },
      exit: { scale: 0.85, opacity: 0 },
      transition: { duration: 0.45, ease: [0.28, 0.84, 0.42, 1] }
    }
  },
  'parallax-glow': {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 0.6 },
      exit: { opacity: 0 },
      transition: { duration: 0.4 }
    },
    modal: {
      initial: { scale: 0.95, opacity: 0, y: 8 },
      animate: { 
        scale: 1, 
        opacity: 1, 
        y: 0,
        boxShadow: '0 0 60px rgba(46, 191, 255, 0.4), 0 0 100px rgba(174, 113, 255, 0.3)'
      },
      exit: { scale: 0.95, opacity: 0, y: 8 },
      transition: { duration: 0.4, ease: [0.165, 0.84, 0.44, 1] }
    }
  }
};

export default function AnimatedModal({
  isOpen,
  onClose,
  children,
  title,
  animationType = 'scale-blur-glow',
  width = 'max-w-2xl'
}: AnimatedModalProps) {
  const animation = animations[animationType];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
            {...animation.overlay}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className={`${width} w-full pointer-events-auto relative`}
              {...animation.modal}
            >
              {/* Parallax Background Layer (for parallax-glow animation) */}
              {animationType === 'parallax-glow' && (
                <motion.div
                  className="absolute inset-0 glass-card rounded-2xl border border-white/10"
                  initial={{ scale: 0.98, opacity: 0, y: 12 }}
                  animate={{ scale: 1, opacity: 0.3, y: 0 }}
                  exit={{ scale: 0.98, opacity: 0, y: 12 }}
                  transition={{ duration: 0.4, delay: 0.01 }}
                />
              )}

              {/* Main Modal Content */}
              <div className="glass-card rounded-2xl border border-white/10 overflow-hidden relative">
                {/* Ripple Effect Background (for ripple-light animation) */}
                {animationType === 'ripple-light' && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] opacity-20"
                    initial={{ scale: 0, opacity: 0.6 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 0.42, ease: 'easeOut' }}
                    style={{ transformOrigin: 'center center' }}
                  />
                )}

                {/* Light Scan Effect (for light-scan animation) */}
                {animationType === 'light-scan' && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2EBFFF]/30 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 0.45, ease: [0.28, 0.84, 0.42, 1] }}
                  />
                )}

                {/* Header */}
                {title && (
                  <motion.div 
                    className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-[#2EBFFF]/10 to-[#AE71FF]/10"
                    {...(animationType === 'parallax-glow' ? {
                      initial: { opacity: 0, y: -4 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -4 },
                      transition: { duration: 0.4, delay: 0.05 }
                    } : {})}
                  >
                    <h2 className="text-2xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
                      {title}
                    </h2>
                    <button
                      onClick={onClose}
                      className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group"
                    >
                      <X className="w-5 h-5 text-[#9EA7B8] group-hover:text-white transition-colors" />
                    </button>
                  </motion.div>
                )}

                {/* Content */}
                <motion.div 
                  className="p-6"
                  {...(animationType === 'parallax-glow' ? {
                    initial: { opacity: 0, y: 4 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 4 },
                    transition: { duration: 0.4, delay: 0.08 }
                  } : {})}
                >
                  {children}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
