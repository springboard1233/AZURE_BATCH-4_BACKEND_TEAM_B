import { useState } from 'react';
import { 
  AnimatedHoverCard, 
  AnimatedGlowBeam, 
  AnimatedRipple, 
  AnimatedParallax,
  AnimatedButton,
  PulsingGlowButton,
  NeonBorderButton
} from '../components/animations/HoverAnimations';
import { 
  AnimatedLineChart,
  AnimatedAreaChart,
  AnimatedBarChart,
  AnimatedHeatmap,
  ChartSectionReveal,
  CountUpAnimation
} from '../components/animations/ChartAnimations';
import { 
  KPIAnimatedCard,
  KPIScanlineCard,
  KPIGradientDriftCard,
  KPIGlowPulse,
  AnimatedKPINumber,
  StaggeredKPIGrid,
  StaggeredKPIItem,
  AnimatedKPIBadge
} from '../components/animations/KPIAnimations';
import { TrendingUp, Users, Cpu, Zap, Activity, BarChart3 } from 'lucide-react';

export default function AnimationsShowcasePage() {
  const [selectedAnimation, setSelectedAnimation] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-3">
          Animations Showcase
        </h1>
        <p className="text-[#9EA7B8] text-lg">
          Interactive demonstrations of all micro-interactions, hover effects, and loading animations
        </p>
      </div>

      {/* Hover Animations Section */}
      <ChartSectionReveal delay={0}>
        <div className="mb-12">
          <h2 className="text-3xl mb-6 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
            🔵 Hover Animations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Scale & Glow */}
            <AnimatedHoverCard className="glass-card p-6 rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2EBFFF] to-[#1a8acc] rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg mb-2">Scale & Glow</h3>
              <p className="text-sm text-[#9EA7B8]">Hover for 3D lift effect with neon glow expansion</p>
            </AnimatedHoverCard>

            {/* Glow Beam */}
            <AnimatedGlowBeam className="glass-card p-6 rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-[#AE71FF] to-[#8E51DF] rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg mb-2">Glow Beam</h3>
              <p className="text-sm text-[#9EA7B8]">Neon beam sweeps across on hover</p>
            </AnimatedGlowBeam>

            {/* Ripple Effect */}
            <AnimatedRipple className="glass-card p-6 rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-[#B2FF59] to-[#7CB342] rounded-lg flex items-center justify-center mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg mb-2">Ripple Effect</h3>
              <p className="text-sm text-[#9EA7B8]">Cyan-purple gradient ripple from cursor</p>
            </AnimatedRipple>

            {/* Parallax Depth */}
            <AnimatedParallax className="glass-card p-6 rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF3D71] to-[#C62368] rounded-lg flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg mb-2">Parallax Depth</h3>
              <p className="text-sm text-[#9EA7B8]">3D tilt effect following mouse movement</p>
            </AnimatedParallax>
          </div>
        </div>
      </ChartSectionReveal>

      {/* Button Animations Section */}
      <ChartSectionReveal delay={0.1}>
        <div className="mb-12">
          <h2 className="text-3xl mb-6 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
            🔥 Button Interactions
          </h2>
          
          <div className="glass-card p-8 rounded-xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Standard Animated Button */}
              <div className="text-center">
                <AnimatedButton variant="primary">
                  Click Compression
                </AnimatedButton>
                <p className="text-sm text-[#9EA7B8] mt-3">Scale 100% → 94% on click</p>
              </div>

              {/* Pulsing Glow Button */}
              <div className="text-center">
                <PulsingGlowButton>
                  Glowing Pulse
                </PulsingGlowButton>
                <p className="text-sm text-[#9EA7B8] mt-3">Continuous cyan glow pulse</p>
              </div>

              {/* Neon Border Button */}
              <div className="text-center">
                <NeonBorderButton>
                  Neon Border
                </NeonBorderButton>
                <p className="text-sm text-[#9EA7B8] mt-3">Border expands & color shifts</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatedButton variant="secondary">
                Secondary Button
              </AnimatedButton>
              <AnimatedButton variant="ghost">
                Ghost Button
              </AnimatedButton>
            </div>
          </div>
        </div>
      </ChartSectionReveal>

      {/* KPI Card Animations Section */}
      <ChartSectionReveal delay={0.2}>
        <div className="mb-12">
          <h2 className="text-3xl mb-6 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
            📊 KPI Card Interactions
          </h2>
          
          <StaggeredKPIGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Standard KPI Animation */}
            <StaggeredKPIItem>
              <KPIAnimatedCard 
                className="glass-card p-6 rounded-xl border border-white/10"
                glowColor="#2EBFFF"
                onClick={() => setSelectedAnimation('hover-pulse')}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2EBFFF] to-[#1a8acc] rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <AnimatedKPIBadge status="success">
                    +12%
                  </AnimatedKPIBadge>
                </div>
                <h3 className="text-sm text-[#9EA7B8] mb-2">Hover Pulse</h3>
                <AnimatedKPINumber 
                  value={1247} 
                  className="text-3xl"
                  duration={1.2}
                />
              </KPIAnimatedCard>
            </StaggeredKPIItem>

            {/* Scanline KPI */}
            <StaggeredKPIItem>
              <KPIScanlineCard 
                className="glass-card p-6 rounded-xl border border-white/10"
                onClick={() => setSelectedAnimation('scanline')}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#AE71FF] to-[#8E51DF] rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <AnimatedKPIBadge status="info">
                    Live
                  </AnimatedKPIBadge>
                </div>
                <h3 className="text-sm text-[#9EA7B8] mb-2">Scanline Effect</h3>
                <AnimatedKPINumber 
                  value={3542} 
                  className="text-3xl"
                  duration={1.2}
                  delay={0.1}
                />
              </KPIScanlineCard>
            </StaggeredKPIItem>

            {/* Gradient Drift KPI */}
            <StaggeredKPIItem>
              <KPIGradientDriftCard 
                className="glass-card p-6 rounded-xl border border-white/10"
                onClick={() => setSelectedAnimation('gradient-drift')}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#B2FF59] to-[#7CB342] rounded-lg flex items-center justify-center">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <AnimatedKPIBadge status="warning">
                    High
                  </AnimatedKPIBadge>
                </div>
                <h3 className="text-sm text-[#9EA7B8] mb-2">Gradient Drift</h3>
                <AnimatedKPINumber 
                  value={89} 
                  suffix="%" 
                  className="text-3xl"
                  duration={1.2}
                  delay={0.2}
                />
              </KPIGradientDriftCard>
            </StaggeredKPIItem>

            {/* Glow Pulse KPI */}
            <StaggeredKPIItem>
              <KPIGlowPulse 
                className="glass-card p-6 rounded-xl border border-white/10"
                glowColor="#AE71FF"
                onClick={() => setSelectedAnimation('glow-pulse')}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF3D71] to-[#C62368] rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <AnimatedKPIBadge status="error">
                    Alert
                  </AnimatedKPIBadge>
                </div>
                <h3 className="text-sm text-[#9EA7B8] mb-2">Glow Pulse</h3>
                <AnimatedKPINumber 
                  value={234} 
                  className="text-3xl"
                  duration={1.2}
                  delay={0.3}
                />
              </KPIGlowPulse>
            </StaggeredKPIItem>
          </StaggeredKPIGrid>
        </div>
      </ChartSectionReveal>

      {/* Count Up Animations */}
      <ChartSectionReveal delay={0.3}>
        <div className="mb-12">
          <h2 className="text-3xl mb-6 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
            🔢 Count-Up Animations
          </h2>
          
          <div className="glass-card p-8 rounded-xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <CountUpAnimation 
                  value={99} 
                  suffix="%" 
                  className="text-5xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent"
                  duration={1.5}
                />
                <p className="text-[#9EA7B8] mt-2">Accuracy</p>
              </div>
              
              <div className="text-center">
                <CountUpAnimation 
                  value={1247} 
                  className="text-5xl bg-gradient-to-r from-[#B2FF59] to-[#7CB342] bg-clip-text text-transparent"
                  duration={1.5}
                />
                <p className="text-[#9EA7B8] mt-2">Active Users</p>
              </div>
              
              <div className="text-center">
                <CountUpAnimation 
                  value={42} 
                  prefix="$" 
                  suffix="M" 
                  className="text-5xl bg-gradient-to-r from-[#AE71FF] to-[#8E51DF] bg-clip-text text-transparent"
                  duration={1.5}
                />
                <p className="text-[#9EA7B8] mt-2">Revenue</p>
              </div>
              
              <div className="text-center">
                <CountUpAnimation 
                  value={156} 
                  className="text-5xl bg-gradient-to-r from-[#FF3D71] to-[#C62368] bg-clip-text text-transparent"
                  duration={1.5}
                />
                <p className="text-[#9EA7B8] mt-2">Regions</p>
              </div>
            </div>
          </div>
        </div>
      </ChartSectionReveal>

      {/* Technical Specifications */}
      <ChartSectionReveal delay={0.4}>
        <div className="glass-card p-8 rounded-xl border border-white/10">
          <h2 className="text-2xl mb-6 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
            ⚡ Animation Specifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg mb-3 text-[#2EBFFF]">Hover Effects</h3>
              <ul className="space-y-2 text-sm text-[#9EA7B8]">
                <li>• Duration: 140-180ms</li>
                <li>• Scale: 100% → 104%</li>
                <li>• Lift: 3-6px</li>
                <li>• Easing: ease-out-quart</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg mb-3 text-[#AE71FF]">Button Clicks</h3>
              <ul className="space-y-2 text-sm text-[#9EA7B8]">
                <li>• Compression: 100% → 94%</li>
                <li>• Duration: 80-140ms</li>
                <li>• Glow pulse: 2s cycle</li>
                <li>• Border: 1px → 3px</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg mb-3 text-[#B2FF59]">KPI Cards</h3>
              <ul className="space-y-2 text-sm text-[#9EA7B8]">
                <li>• Count-up: 900ms</li>
                <li>• Scanline: 4s cycle</li>
                <li>• Gradient drift: 8s</li>
                <li>• Glow pulse: 2s</li>
              </ul>
            </div>
          </div>
        </div>
      </ChartSectionReveal>
    </div>
  );
}
