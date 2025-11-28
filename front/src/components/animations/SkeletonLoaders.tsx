import { motion } from 'motion/react';

// Shimmer Loader
export function ShimmerLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#1A1A1A] rounded ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent"
        animate={{ x: ['-100%', '200%'] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(46, 191, 255, 0.1) 50%, transparent 100%)'
        }}
      />
    </div>
  );
}

// Chart Skeleton Bars
export function ChartSkeletonBars({ bars = 8 }: { bars?: number }) {
  return (
    <div className="glass-card rounded-xl p-6">
      <ShimmerLoader className="h-6 w-1/3 mb-6" />
      
      <div className="flex items-end justify-between gap-2 h-48">
        {Array.from({ length: bars }).map((_, i) => {
          const height = Math.random() * 60 + 40; // Random height 40-100%
          return (
            <motion.div
              key={i}
              className="flex-1 bg-gradient-to-t from-[#2EBFFF]/30 to-[#AE71FF]/30 rounded-t"
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: `${height}%`, 
                opacity: [0.4, 0.9, 0.4] 
              }}
              transition={{
                height: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
                opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
            />
          );
        })}
      </div>
      
      <div className="flex justify-between mt-4">
        {Array.from({ length: bars }).map((_, i) => (
          <ShimmerLoader key={i} className="h-3 w-8" />
        ))}
      </div>
    </div>
  );
}

// Line Chart Skeleton Wave
export function LineChartSkeletonWave() {
  return (
    <div className="glass-card rounded-xl p-6">
      <ShimmerLoader className="h-6 w-1/3 mb-6" />
      
      <div className="relative h-48">
        <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
          <motion.path
            d="M 0 100 Q 100 50, 200 80 T 400 100 T 600 70 T 800 100"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              pathLength: { duration: 1.5, ease: 'easeOut' },
              opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
          
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2EBFFF" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#AE71FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2EBFFF" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Pulsing Glow */}
        <motion.div
          className="absolute inset-0 blur-xl"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(46, 191, 255, 0.2), transparent 70%)'
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
      
      <div className="flex gap-4 mt-4">
        <ShimmerLoader className="h-3 w-20" />
        <ShimmerLoader className="h-3 w-20" />
        <ShimmerLoader className="h-3 w-20" />
      </div>
    </div>
  );
}

// Card Skeleton Blocks (KPI Cards)
export function CardSkeletonBlocks({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="glass-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          {/* Icon Skeleton */}
          <motion.div
            className="w-12 h-12 rounded-lg mb-4"
            style={{
              background: 'linear-gradient(135deg, rgba(46, 191, 255, 0.2), rgba(174, 113, 255, 0.2))'
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          
          {/* Title Skeleton */}
          <ShimmerLoader className="h-4 w-2/3 mb-3" />
          
          {/* Number Skeleton */}
          <ShimmerLoader className="h-8 w-1/2 mb-3" />
          
          {/* Badge Skeleton */}
          <ShimmerLoader className="h-6 w-16" />
        </motion.div>
      ))}
    </div>
  );
}

// Table Skeleton
export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/10 p-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <ShimmerLoader key={i} className="h-4" />
          ))}
        </div>
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <motion.div
          key={rowIndex}
          className="border-b border-white/5 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: rowIndex * 0.1 }}
        >
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <ShimmerLoader key={colIndex} className="h-4" />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Heatmap Skeleton
export function HeatmapSkeleton({ rows = 7, columns = 24 }: { rows?: number; columns?: number }) {
  return (
    <div className="glass-card rounded-xl p-6">
      <ShimmerLoader className="h-6 w-1/4 mb-6" />
      
      <div className="grid gap-2" style={{ 
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`
      }}>
        {Array.from({ length: rows * columns }).map((_, i) => {
          const intensity = Math.random();
          return (
            <motion.div
              key={i}
              className="aspect-square rounded"
              style={{
                background: `rgba(46, 191, 255, ${intensity * 0.6})`
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1
              }}
              transition={{
                duration: 0.3,
                delay: (i / (rows * columns)) * 0.5
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// Full Page Skeleton
export function FullPageSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <ShimmerLoader className="h-10 w-1/3" />
        <ShimmerLoader className="h-6 w-1/2" />
      </div>
      
      {/* KPI Cards */}
      <CardSkeletonBlocks count={4} />
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeletonBars bars={6} />
        <LineChartSkeletonWave />
      </div>
      
      {/* Table */}
      <TableSkeleton rows={5} columns={4} />
    </div>
  );
}

// Pulsing Dot Loader
export function PulsingDotLoader({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dotSize = size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3';
  
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`${dotSize} rounded-full bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF]`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}

// Circular Progress Loader
export function CircularProgressLoader({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="url(#progress-gradient)"
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 0, rotate: 0 }}
        animate={{ 
          pathLength: [0, 0.8, 0],
          rotate: 360 
        }}
        transition={{
          pathLength: { duration: 2, ease: 'easeInOut', repeat: Infinity },
          rotate: { duration: 2, ease: 'linear', repeat: Infinity }
        }}
        style={{ transformOrigin: '50% 50%' }}
      />
      
      <defs>
        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2EBFFF" />
          <stop offset="100%" stopColor="#AE71FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
