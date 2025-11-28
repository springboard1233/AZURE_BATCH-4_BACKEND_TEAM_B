import { motion, useMotionValue, useTransform } from 'motion/react';
import { ReactNode, useState } from 'react';

// 3D Flip Card
interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}

export function FlipCard({ front, back, className = '' }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`relative ${className}`} 
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 backface-hidden glass-card-premium rounded-2xl p-6 border border-white/20"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Metallic Highlight Sweep */}
          {isFlipped && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'
              }}
            />
          )}
          {front}
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 backface-hidden glass-card-premium rounded-2xl p-6 border border-white/20"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}

// 3D Tilt Hover Card
export function TiltHoverCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const rotateX = mousePosition.y * -6;
  const rotateY = mousePosition.x * 6;

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{
          rotateX: isHovering ? rotateX : 0,
          rotateY: isHovering ? rotateY : 0,
          scale: isHovering ? 1.05 : 1
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic Shadow */}
        <motion.div
          className="absolute -inset-4 rounded-2xl blur-2xl pointer-events-none"
          animate={{
            background: isHovering
              ? `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, rgba(46, 191, 255, 0.4), transparent 60%)`
              : 'transparent',
            opacity: isHovering ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
        />
        
        <div className="glass-card-premium rounded-2xl p-6 border border-white/20 relative">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Multi-Layer Parallax Flip Card
export function ParallaxFlipCard({ 
  layers, 
  className = '' 
}: { 
  layers: { content: ReactNode; depth: number }[]; 
  className?: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full glass-card-premium rounded-2xl border border-white/20 overflow-hidden"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Hologram Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isFlipped
              ? 'linear-gradient(135deg, rgba(46, 191, 255, 0.1), rgba(174, 113, 255, 0.1))'
              : 'transparent'
          }}
          style={{
            backgroundSize: '200% 200%',
            backgroundPosition: `${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%`
          }}
        />

        {/* Layers with Parallax */}
        {layers.map((layer, index) => {
          const offsetX = mousePosition.x * layer.depth * 20;
          const offsetY = mousePosition.y * layer.depth * 20;

          return (
            <motion.div
              key={index}
              className="absolute inset-0 p-6"
              animate={{
                x: isFlipped ? offsetX : 0,
                y: isFlipped ? offsetY : 0,
                rotateY: isFlipped ? 180 : 0
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
            >
              {layer.content}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

// Hover Expand Info Card
export function HoverExpandCard({ 
  preview, 
  details, 
  className = '' 
}: { 
  preview: ReactNode; 
  details: ReactNode; 
  className?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={`glass-card-premium rounded-2xl border border-white/20 overflow-hidden cursor-pointer ${className}`}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      animate={{
        height: isExpanded ? 'auto' : '200px'
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="p-6">
        {preview}
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mt-4 pt-4 border-t border-white/10">
                {details}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Rotating Info Card
export function RotatingCard({ 
  faces, 
  autoRotate = false,
  interval = 5000,
  className = '' 
}: { 
  faces: ReactNode[]; 
  autoRotate?: boolean;
  interval?: number;
  className?: string;
}) {
  const [currentFace, setCurrentFace] = useState(0);

  // Auto-rotate functionality
  useState(() => {
    if (autoRotate) {
      const timer = setInterval(() => {
        setCurrentFace((prev) => (prev + 1) % faces.length);
      }, interval);
      return () => clearInterval(timer);
    }
  });

  const rotation = (360 / faces.length) * currentFace;

  return (
    <div className={`relative ${className}`} style={{ perspective: '1000px' }}>
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: rotation }}
        transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {faces.map((face, index) => {
          const faceRotation = (360 / faces.length) * index;
          const translateZ = 200; // Distance from center

          return (
            <div
              key={index}
              className="absolute inset-0 backface-hidden glass-card-premium rounded-2xl p-6 border border-white/20"
              style={{
                backfaceVisibility: 'hidden',
                transform: `rotateY(${faceRotation}deg) translateZ(${translateZ}px)`
              }}
            >
              {face}
            </div>
          );
        })}
      </motion.div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {faces.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentFace(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentFace === index 
                ? 'bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] w-6' 
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
