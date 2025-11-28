import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Smooth Dropdown Reveal
interface DropdownProps {
  trigger: ReactNode;
  items: { label: string; onClick: () => void; icon?: ReactNode }[];
  className?: string;
}

export function AnimatedDropdown({ trigger, items, className = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 glass-card rounded-lg hover:bg-white/10 transition-colors"
      >
        {trigger}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-2 min-w-[200px] glass-card-premium rounded-xl border border-white/20 overflow-hidden z-50"
            initial={{ height: 0, opacity: 0, filter: 'blur(4px)' }}
            animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
            exit={{ height: 0, opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.24, ease: [0.165, 0.84, 0.44, 1] }}
          >
            {items.map((item, index) => (
              <motion.button
                key={index}
                className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-white/5 transition-colors"
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                whileHover={{ x: 4 }}
              >
                {item.icon && <span className="text-[#2EBFFF]">{item.icon}</span>}
                <span>{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Filter Chip Selection
interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  icon?: ReactNode;
}

export function FilterChip({ label, isSelected, onClick, icon }: FilterChipProps) {
  return (
    <motion.button
      className={`relative px-4 py-2 rounded-full transition-all ${
        isSelected 
          ? 'text-white' 
          : 'text-[#9EA7B8] glass-card'
      }`}
      onClick={onClick}
      animate={{
        scale: isSelected ? 1 : 0.95,
        background: isSelected 
          ? 'linear-gradient(135deg, #2EBFFF 0%, #AE71FF 100%)' 
          : 'rgba(255, 255, 255, 0.05)'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow Ring */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: [0, 0.6, 0],
            scale: [1, 1.2, 1.4]
          }}
          transition={{ duration: 0.6 }}
          style={{
            boxShadow: '0 0 20px rgba(46, 191, 255, 0.8)'
          }}
        />
      )}
      
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {label}
      </span>
    </motion.button>
  );
}

// Search Input Activation
export function AnimatedSearchInput({ 
  placeholder = 'Search...', 
  onSearch,
  className = '' 
}: { 
  placeholder?: string; 
  onSearch?: (value: string) => void;
  className?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        width: isFocused ? '100%' : '240px'
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.div
        className="relative"
        animate={{
          boxShadow: isFocused 
            ? '0 0 30px rgba(46, 191, 255, 0.4)' 
            : '0 0 0px rgba(46, 191, 255, 0)'
        }}
        style={{ borderRadius: '0.75rem' }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onSearch?.(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 glass-card rounded-xl border border-white/10 bg-transparent focus:outline-none focus:border-[#2EBFFF]/50 transition-colors"
        />
        
        {/* Search Icon */}
        <motion.svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
          animate={{
            color: isFocused ? '#2EBFFF' : '#9EA7B8'
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </motion.svg>

        {/* Placeholder Animation */}
        <AnimatePresence>
          {isFocused && !value && (
            <motion.span
              className="absolute left-12 top-1/2 -translate-y-1/2 text-[#9EA7B8] pointer-events-none"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {placeholder}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// Toggle Switch Animation
export function AnimatedToggle({ 
  isOn, 
  onToggle, 
  label,
  className = '' 
}: { 
  isOn: boolean; 
  onToggle: () => void; 
  label?: string;
  className?: string;
}) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-3 ${className}`}
    >
      {label && <span className="text-[#9EA7B8]">{label}</span>}
      
      <motion.div
        className="relative w-14 h-8 rounded-full cursor-pointer"
        animate={{
          background: isOn 
            ? 'linear-gradient(135deg, #2EBFFF 0%, #AE71FF 100%)' 
            : 'rgba(255, 255, 255, 0.1)'
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Neon Flash */}
        <AnimatePresence>
          {isOn && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ 
                opacity: [0.8, 0],
                scale: [1, 1.3]
              }}
              transition={{ duration: 0.4 }}
              style={{
                boxShadow: '0 0 20px rgba(46, 191, 255, 0.8)'
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
          animate={{
            x: isOn ? 24 : 0,
            rotate: isOn ? 360 : 0
          }}
          transition={{ 
            type: 'spring',
            stiffness: 500,
            damping: 30
          }}
        />
      </motion.div>
    </button>
  );
}

// Range Slider with Glow
export function AnimatedRangeSlider({
  min = 0,
  max = 100,
  value,
  onChange,
  label,
  className = ''
}: {
  min?: number;
  max?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  className?: string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-[#9EA7B8]">{label}</span>
          <motion.span
            className="text-[#2EBFFF]"
            animate={{ scale: isDragging ? 1.1 : 1 }}
          >
            {value}
          </motion.span>
        </div>
      )}
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #2EBFFF ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`
          }}
        />
        
        {/* Glow Effect */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-4 rounded-full pointer-events-none blur-md"
          style={{
            left: `${percentage}%`,
            width: '20px',
            background: 'rgba(46, 191, 255, 0.6)'
          }}
          animate={{
            opacity: isDragging ? 1 : 0,
            scale: isDragging ? 1.5 : 1
          }}
        />
      </div>
    </div>
  );
}

// Checkbox with Animation
export function AnimatedCheckbox({
  isChecked,
  onChange,
  label,
  className = ''
}: {
  isChecked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
}) {
  return (
    <button
      onClick={onChange}
      className={`flex items-center gap-3 ${className}`}
    >
      <motion.div
        className="relative w-6 h-6 rounded border-2 flex items-center justify-center"
        animate={{
          borderColor: isChecked ? '#2EBFFF' : 'rgba(255, 255, 255, 0.2)',
          background: isChecked 
            ? 'linear-gradient(135deg, #2EBFFF 0%, #AE71FF 100%)' 
            : 'transparent'
        }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence>
          {isChecked && (
            <motion.svg
              className="w-4 h-4 text-white"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
      
      {label && <span className="text-[#9EA7B8]">{label}</span>}
    </button>
  );
}

// Radio Button Group
export function AnimatedRadioGroup({
  options,
  selected,
  onChange,
  className = ''
}: {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className="flex items-center gap-3 w-full"
        >
          <motion.div
            className="relative w-6 h-6 rounded-full border-2 flex items-center justify-center"
            animate={{
              borderColor: selected === option.value ? '#2EBFFF' : 'rgba(255, 255, 255, 0.2)'
            }}
          >
            <AnimatePresence>
              {selected === option.value && (
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #2EBFFF 0%, #AE71FF 100%)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
          
          <span className={selected === option.value ? 'text-white' : 'text-[#9EA7B8]'}>
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}
