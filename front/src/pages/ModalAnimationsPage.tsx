import { useState } from 'react';
import AnimatedModal, { ModalAnimationType } from '../components/AnimatedModal';
import { Sparkles, Zap, Layers, Waves, Move, Blend, Minimize2, ArrowDown, Scan, Layout } from 'lucide-react';

interface AnimationDemo {
  type: ModalAnimationType;
  name: string;
  description: string;
  icon: any;
  duration: string;
  easing: string;
  color: string;
}

const animations: AnimationDemo[] = [
  {
    type: 'scale-blur-glow',
    name: 'Scale + Blur Glow',
    description: 'Smooth scale from 85% to 100% with expanding neon cyan glow and floating effect',
    icon: Sparkles,
    duration: '320ms',
    easing: 'ease-out-quart',
    color: '#2EBFFF'
  },
  {
    type: 'slide-up',
    name: 'Slide-Up Transition',
    description: 'Modal slides upward from 40px offset with intensifying neon purple outline',
    icon: ArrowDown,
    duration: '280ms',
    easing: 'cubic-bezier',
    color: '#AE71FF'
  },
  {
    type: '3d-depth',
    name: '3D Depth Expand',
    description: '3D rotation from -4° with Z-depth and holographic projection effect',
    icon: Layers,
    duration: '360ms',
    easing: 'ease-out-back',
    color: '#2EBFFF'
  },
  {
    type: 'ripple-light',
    name: 'Ripple Light Entrance',
    description: 'Neon ripple expands from center with cyan-to-purple gradient glow pulse',
    icon: Waves,
    duration: '420ms',
    easing: 'ease-out-cubic',
    color: '#FF3D71'
  },
  {
    type: 'elastic-bounce',
    name: 'Elastic Bounce Drop',
    description: 'Modal drops from -30px with overshoot and elastic settling motion',
    icon: Move,
    duration: '380ms',
    easing: 'ease-out-elastic',
    color: '#B2FF59'
  },
  {
    type: 'fade-bloom',
    name: 'Fade + Glow Bloom',
    description: 'Gentle fade with soft neon cyan bloom expanding elegantly',
    icon: Blend,
    duration: '280ms',
    easing: 'linear-out-slow',
    color: '#2EBFFF'
  },
  {
    type: 'scale-dissolve',
    name: 'Scale Dissolve Exit',
    description: 'Closing animation: scales to 92% while dissolving with retracting glow',
    icon: Minimize2,
    duration: '220ms',
    easing: 'ease-in-quart',
    color: '#9EA7B8'
  },
  {
    type: 'slide-down-blur',
    name: 'Slide Down + Blur',
    description: 'Exit animation sliding 40px down with increasing Gaussian blur',
    icon: ArrowDown,
    duration: '260ms',
    easing: 'ease-in-cubic',
    color: '#9EA7B8'
  },
  {
    type: 'light-scan',
    name: 'Cyberpunk Light Scan',
    description: 'Horizontal neon scan line materializes modal with cyan + magenta effects',
    icon: Scan,
    duration: '450ms',
    easing: 'cubic-bezier',
    color: '#FF3D71'
  },
  {
    type: 'parallax-glow',
    name: 'Parallax Layers',
    description: 'Layered depth animation with staggered content and neon border expansion',
    icon: Layout,
    duration: '400ms',
    easing: 'ease-out-quart',
    color: '#AE71FF'
  }
];

export default function ModalAnimationsPage() {
  const [activeModal, setActiveModal] = useState<ModalAnimationType | null>(null);

  const openModal = (type: ModalAnimationType) => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-3">
          Modal Animation Gallery
        </h1>
        <p className="text-[#9EA7B8] text-lg">
          Futuristic modal transitions with neon effects, 3D depth, and holographic animations
        </p>
      </div>

      {/* Animation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {animations.map((anim) => {
          const Icon = anim.icon;
          return (
            <div
              key={anim.type}
              className="glass-card p-6 rounded-xl border border-white/10 relative overflow-hidden group hover:border-opacity-50 transition-all cursor-pointer"
              style={{ borderColor: anim.color }}
              onClick={() => openModal(anim.type)}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-all"
                style={{ backgroundColor: anim.color }}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${anim.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: anim.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ color: anim.color }}>{anim.name}</h3>
                    <p className="text-xs text-[#9EA7B8]">{anim.duration} • {anim.easing}</p>
                  </div>
                </div>

                <p className="text-sm text-[#9EA7B8] mb-4">{anim.description}</p>

                <button
                  className="w-full py-2 rounded-lg border transition-all hover:scale-105"
                  style={{
                    borderColor: `${anim.color}40`,
                    backgroundColor: `${anim.color}10`,
                    color: anim.color
                  }}
                >
                  Preview Animation
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Specifications */}
      <div className="glass-card p-6 rounded-xl border border-white/10 mb-8">
        <h2 className="text-2xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-6">
          Animation Technical Specs
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-[#9EA7B8]">Animation</th>
                <th className="text-left py-3 px-4 text-[#9EA7B8]">Duration</th>
                <th className="text-left py-3 px-4 text-[#9EA7B8]">Easing Function</th>
                <th className="text-left py-3 px-4 text-[#9EA7B8]">Effects</th>
              </tr>
            </thead>
            <tbody>
              {animations.map((anim, idx) => (
                <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-all">
                  <td className="py-3 px-4" style={{ color: anim.color }}>{anim.name}</td>
                  <td className="py-3 px-4 text-[#9EA7B8]">{anim.duration}</td>
                  <td className="py-3 px-4 font-mono text-sm text-[#2EBFFF]">{anim.easing}</td>
                  <td className="py-3 px-4 text-[#9EA7B8] text-sm">
                    {anim.description.split(' ').slice(0, 6).join(' ')}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Best Practices */}
      <div className="glass-card p-6 rounded-xl border border-white/10">
        <h2 className="text-2xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-6">
          Best Practices for Modal Animations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg text-[#B2FF59] mb-3">✓ Do's</h3>
            <ul className="space-y-2 text-[#9EA7B8]">
              <li className="flex items-start gap-2">
                <span className="text-[#B2FF59] mt-1">•</span>
                <span>Keep animations under 500ms for responsiveness</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B2FF59] mt-1">•</span>
                <span>Use ease-out curves for entrance animations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B2FF59] mt-1">•</span>
                <span>Add subtle glow effects to enhance depth</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B2FF59] mt-1">•</span>
                <span>Maintain consistent animation style across app</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg text-[#FF3D71] mb-3">✗ Don'ts</h3>
            <ul className="space-y-2 text-[#9EA7B8]">
              <li className="flex items-start gap-2">
                <span className="text-[#FF3D71] mt-1">•</span>
                <span>Avoid animations longer than 600ms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF3D71] mt-1">•</span>
                <span>Don't use linear easing for complex motions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF3D71] mt-1">•</span>
                <span>Avoid too many simultaneous glow effects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF3D71] mt-1">•</span>
                <span>Don't mix conflicting animation styles</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Render Active Modal */}
      {activeModal && (
        <AnimatedModal
          isOpen={true}
          onClose={closeModal}
          title={animations.find(a => a.type === activeModal)?.name}
          animationType={activeModal}
        >
          <div className="space-y-4">
            <p className="text-[#9EA7B8]">
              {animations.find(a => a.type === activeModal)?.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 p-4 bg-black/40 rounded-lg border border-white/10">
              <div>
                <p className="text-sm text-[#9EA7B8] mb-1">Duration</p>
                <p className="text-lg">{animations.find(a => a.type === activeModal)?.duration}</p>
              </div>
              <div>
                <p className="text-sm text-[#9EA7B8] mb-1">Easing</p>
                <p className="text-lg">{animations.find(a => a.type === activeModal)?.easing}</p>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-[#2EBFFF]/10 to-[#AE71FF]/10 rounded-lg border border-white/10">
              <p className="text-sm text-[#9EA7B8] mb-2">Animation Features:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2EBFFF]"></span>
                  <span>Neon glow effects</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#AE71FF]"></span>
                  <span>Glassmorphism backdrop</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B2FF59]"></span>
                  <span>Smooth transitions</span>
                </li>
              </ul>
            </div>

            <button
              onClick={closeModal}
              className="w-full py-3 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] rounded-lg hover:opacity-80 transition-all"
            >
              Close Modal
            </button>
          </div>
        </AnimatedModal>
      )}
    </div>
  );
}