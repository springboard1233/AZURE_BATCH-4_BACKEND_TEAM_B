import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, createContext, useContext, useState } from 'react';

// Modal Stack Context
interface ModalStackContextType {
  modals: string[];
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

const ModalStackContext = createContext<ModalStackContextType | undefined>(undefined);

export function ModalStackProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<string[]>([]);

  const openModal = (id: string) => {
    setModals(prev => [...prev, id]);
  };

  const closeModal = (id: string) => {
    setModals(prev => prev.filter(modalId => modalId !== id));
  };

  const closeAllModals = () => {
    setModals([]);
  };

  return (
    <ModalStackContext.Provider value={{ modals, openModal, closeModal, closeAllModals }}>
      {children}
    </ModalStackContext.Provider>
  );
}

export function useModalStack() {
  const context = useContext(ModalStackContext);
  if (!context) {
    throw new Error('useModalStack must be used within ModalStackProvider');
  }
  return context;
}

// Stacked Modal Component
interface StackedModalProps {
  id: string;
  children: ReactNode;
  title?: string;
  onClose?: () => void;
  variant?: 'lift-up' | 'depth-blur' | 'slide-tier';
  className?: string;
}

// Stacked Modal Lift Up
export function StackedModal({ 
  id, 
  children, 
  title,
  onClose,
  variant = 'lift-up',
  className = '' 
}: StackedModalProps) {
  const { modals, closeModal } = useModalStack();
  const isOpen = modals.includes(id);
  const stackIndex = modals.indexOf(id);
  const hasModalAbove = stackIndex < modals.length - 1;

  const handleClose = () => {
    closeModal(id);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: hasModalAbove ? 0.3 : 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{ zIndex: 50 + stackIndex }}
          />

          {/* Modal */}
          <motion.div
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl glass-card-premium rounded-2xl border border-white/20 ${className}`}
            initial={getModalInitial(variant, stackIndex)}
            animate={getModalAnimate(variant, stackIndex, hasModalAbove)}
            exit={getModalExit(variant)}
            transition={{ duration: 0.26, ease: [0.165, 0.84, 0.44, 1] }}
            style={{ 
              zIndex: 51 + stackIndex,
              filter: hasModalAbove ? 'blur(3px)' : 'blur(0px)'
            }}
          >
            {/* Neon Glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                boxShadow: hasModalAbove 
                  ? '0 0 20px rgba(46, 191, 255, 0.2)'
                  : '0 0 40px rgba(46, 191, 255, 0.5), 0 0 80px rgba(174, 113, 255, 0.3)'
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
                  {title}
                </h2>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg glass-card hover:bg-white/10 flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Content */}
            <motion.div
              className="p-6"
              animate={{ opacity: hasModalAbove ? 0.7 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Slide-in Tier Modal
export function TierModal({ 
  id, 
  children, 
  title,
  onClose,
  direction = 'top-right',
  className = '' 
}: StackedModalProps & { direction?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' }) {
  const { modals, closeModal } = useModalStack();
  const isOpen = modals.includes(id);
  const stackIndex = modals.indexOf(id);

  const handleClose = () => {
    closeModal(id);
    onClose?.();
  };

  const getDirectionOffset = () => {
    switch (direction) {
      case 'top-right':
        return { x: 100, y: -100 };
      case 'top-left':
        return { x: -100, y: -100 };
      case 'bottom-right':
        return { x: 100, y: 100 };
      case 'bottom-left':
        return { x: -100, y: 100 };
    }
  };

  const offset = getDirectionOffset();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{ zIndex: 50 + stackIndex }}
          />

          <motion.div
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl glass-card-premium rounded-2xl border ${className}`}
            initial={{ x: offset.x, y: offset.y, opacity: 0, scale: 0.9 }}
            animate={{ x: '-50%', y: '-50%', opacity: 1, scale: 1 }}
            exit={{ x: offset.x, y: offset.y, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ 
              zIndex: 51 + stackIndex,
              borderColor: ['#2EBFFF', '#AE71FF', '#FF3D71', '#B2FF59'][stackIndex % 4]
            }}
          >
            {/* Neon Rim Light */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                boxShadow: `0 0 40px ${['#2EBFFF', '#AE71FF', '#FF3D71', '#B2FF59'][stackIndex % 4]}80`
              }}
            />

            {title && (
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl">{title}</h2>
                <button onClick={handleClose} className="w-8 h-8 rounded-lg glass-card hover:bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <div className="p-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Helper Functions
function getModalInitial(variant: string, stackIndex: number) {
  switch (variant) {
    case 'lift-up':
      return { y: 20, opacity: 0, scale: 0.95 };
    case 'depth-blur':
      return { scale: 0.85, opacity: 0 };
    case 'slide-tier':
      return { x: 100 * (stackIndex % 2 === 0 ? 1 : -1), opacity: 0 };
    default:
      return { y: 20, opacity: 0, scale: 0.95 };
  }
}

function getModalAnimate(variant: string, stackIndex: number, hasModalAbove: boolean) {
  const baseY = stackIndex * -10;
  
  switch (variant) {
    case 'lift-up':
      return { 
        y: baseY, 
        opacity: hasModalAbove ? 0.7 : 1, 
        scale: hasModalAbove ? 0.95 : 1 
      };
    case 'depth-blur':
      return { 
        scale: hasModalAbove ? 0.95 : 1, 
        opacity: hasModalAbove ? 0.6 : 1 
      };
    case 'slide-tier':
      return { 
        x: 0, 
        opacity: 1 
      };
    default:
      return { y: baseY, opacity: 1, scale: 1 };
  }
}

function getModalExit(variant: string) {
  switch (variant) {
    case 'lift-up':
      return { y: -20, opacity: 0, scale: 0.9 };
    case 'depth-blur':
      return { scale: 0.8, opacity: 0 };
    case 'slide-tier':
      return { x: -100, opacity: 0 };
    default:
      return { y: -20, opacity: 0, scale: 0.9 };
  }
}
