# 🎨 Animations Guide - Azure Intelligent Cloud Forecasting Platform

## Overview
This guide covers all micro-interactions, hover effects, button animations, chart loading animations, and KPI card interactions implemented in the platform.

---

## 🔵 Hover Animations

### 1. Scale & Glow Effect
**Component:** `AnimatedHoverCard`

```tsx
import { AnimatedHoverCard } from './components/animations';

<AnimatedHoverCard 
  className="glass-card p-6 rounded-xl"
  glowColor="#2EBFFF"
  scaleAmount={1.04}
>
  Your content here
</AnimatedHoverCard>
```

**Features:**
- Scale: 100% → 104%
- 3D lift: -6px vertical translation
- Neon glow expansion
- Duration: 160ms
- Easing: ease-out-quart

---

### 2. Glow Beam Sweep
**Component:** `AnimatedGlowBeam`

```tsx
import { AnimatedGlowBeam } from './components/animations';

<AnimatedGlowBeam className="glass-card p-6 rounded-xl">
  Your content here
</AnimatedGlowBeam>
```

**Features:**
- Horizontal neon beam sweep (left → right)
- Blur: 4-8px
- Brightness: +20%
- Duration: 600ms
- Triggered on hover

---

### 3. Ripple Effect
**Component:** `AnimatedRipple`

```tsx
import { AnimatedRipple } from './components/animations';

<AnimatedRipple className="glass-card p-6 rounded-xl">
  Your content here
</AnimatedRipple>
```

**Features:**
- Cyan-to-purple gradient ripple
- Expands from cursor position
- Radius expansion: 0 → 300px
- Duration: 600ms
- Multiple ripples supported

---

### 4. Parallax Depth
**Component:** `AnimatedParallax`

```tsx
import { AnimatedParallax } from './components/animations';

<AnimatedParallax className="glass-card p-6 rounded-xl">
  Your content here
</AnimatedParallax>
```

**Features:**
- 3D tilt following mouse
- Rotation: ±5° X/Y axis
- Perspective: 1000px
- Smooth tracking
- Returns to 0° on mouse leave

---

## 🔥 Button Animations

### 1. Click Compression
**Component:** `AnimatedButton`

```tsx
import { AnimatedButton } from './components/animations';

<AnimatedButton 
  variant="primary" // or "secondary" or "ghost"
  onClick={() => console.log('Clicked')}
>
  Click Me
</AnimatedButton>
```

**Features:**
- Hover: Scale 100% → 104%
- Click: Scale 100% → 94%
- Background slide effect
- Neon glow on hover
- Duration: 140ms

---

### 2. Pulsing Glow
**Component:** `PulsingGlowButton`

```tsx
import { PulsingGlowButton } from './components/animations';

<PulsingGlowButton onClick={() => console.log('Clicked')}>
  AI Powered
</PulsingGlowButton>
```

**Features:**
- Continuous cyan glow pulse
- Cycle duration: 2 seconds
- Opacity: 0.3 → 0.6 → 0.3
- Scale pulse: 1 → 1.05 → 1
- Infinite loop

---

### 3. Neon Border Expand
**Component:** `NeonBorderButton`

```tsx
import { NeonBorderButton } from './components/animations';

<NeonBorderButton onClick={() => console.log('Clicked')}>
  Expand Border
</NeonBorderButton>
```

**Features:**
- Border: 1px → 3px on hover
- Color shift: Cyan → Purple → Cyan
- Cycle duration: 1 second
- Infinite color rotation

---

## 📊 Chart Loading Animations

### 1. Line Chart Draw
**Component:** `AnimatedLineChart`

```tsx
import { AnimatedLineChart } from './components/animations';

<AnimatedLineChart delay={0}>
  <LineChart data={data} />
</AnimatedLineChart>
```

**Features:**
- Stroke draws left → right
- Duration: 600ms
- Easing: cubic-bezier
- Stagger support

---

### 2. Area Chart Rise
**Component:** `AnimatedAreaChart`

```tsx
import { AnimatedAreaChart } from './components/animations';

<AnimatedAreaChart delay={0}>
  <AreaChart data={data} />
</AnimatedAreaChart>
```

**Features:**
- Rise from baseline → peak
- Opacity: 0% → 100%
- Vertical translation: 20px → 0
- Duration: 550ms

---

### 3. Bar Chart Grow
**Component:** `AnimatedBarChart`

```tsx
import { AnimatedBarChart } from './components/animations';

<AnimatedBarChart delay={0}>
  <BarChart data={data} />
</AnimatedBarChart>
```

**Features:**
- Bars grow from bottom
- ScaleY: 0 → 1
- Bounce easing
- Duration: 600ms
- Neon glow on peak

---

### 4. Heatmap Blur→Sharp
**Component:** `AnimatedHeatmap`

```tsx
import { AnimatedHeatmap } from './components/animations';

<AnimatedHeatmap delay={0}>
  <HeatmapChart data={data} />
</AnimatedHeatmap>
```

**Features:**
- Blur: 6px → 0px
- Opacity: 0% → 100%
- Duration: 480ms
- Sharp transition

---

### 5. Chart Section Reveal
**Component:** `ChartSectionReveal`

```tsx
import { ChartSectionReveal } from './components/animations';

<ChartSectionReveal delay={0.2}>
  <div>Chart content</div>
</ChartSectionReveal>
```

**Features:**
- Fade + slide up
- Scale: 0.95 → 1
- Y translation: 30px → 0
- Duration: 500ms

---

## 🎯 KPI Card Animations

### 1. Hover Pulse
**Component:** `KPIAnimatedCard`

```tsx
import { KPIAnimatedCard } from './components/animations';

<KPIAnimatedCard 
  glowColor="#2EBFFF"
  onClick={() => console.log('KPI clicked')}
>
  KPI content
</KPIAnimatedCard>
```

**Features:**
- Hover scale: 104%
- Click scale: 106%
- Neon glow pulse
- Duration: 180ms

---

### 2. Scanline Effect
**Component:** `KPIScanlineCard`

```tsx
import { KPIScanlineCard } from './components/animations';

<KPIScanlineCard onClick={() => console.log('KPI clicked')}>
  KPI content
</KPIScanlineCard>
```

**Features:**
- Horizontal scanline sweep
- Cycle: 4 seconds
- Neon cyan trail
- Infinite loop
- 2s repeat delay

---

### 3. Gradient Drift
**Component:** `KPIGradientDriftCard`

```tsx
import { KPIGradientDriftCard } from './components/animations';

<KPIGradientDriftCard onClick={() => console.log('KPI clicked')}>
  KPI content
</KPIGradientDriftCard>
```

**Features:**
- Background gradient drift
- Cyan → Purple → Cyan
- Cycle: 8 seconds
- Continuous animation
- Opacity: 20%

---

### 4. Glow Pulse
**Component:** `KPIGlowPulse`

```tsx
import { KPIGlowPulse } from './components/animations';

<KPIGlowPulse glowColor="#AE71FF">
  KPI content
</KPIGlowPulse>
```

**Features:**
- Box shadow pulse
- Cycle: 2 seconds
- Customizable glow color
- Infinite loop

---

### 5. Number Count-Up
**Component:** `AnimatedKPINumber`

```tsx
import { AnimatedKPINumber } from './components/animations';

<AnimatedKPINumber 
  value={1247}
  duration={0.9}
  suffix="%"
  prefix="$"
  decimals={2}
  className="text-3xl"
  delay={0}
/>
```

**Features:**
- Counts from 0 → value
- Ease-out cubic easing
- Configurable duration
- Supports prefix/suffix
- Decimal precision

---

### 6. Staggered Grid
**Component:** `StaggeredKPIGrid` + `StaggeredKPIItem`

```tsx
import { StaggeredKPIGrid, StaggeredKPIItem } from './components/animations';

<StaggeredKPIGrid staggerDelay={0.1}>
  <StaggeredKPIItem>KPI 1</StaggeredKPIItem>
  <StaggeredKPIItem>KPI 2</StaggeredKPIItem>
  <StaggeredKPIItem>KPI 3</StaggeredKPIItem>
</StaggeredKPIGrid>
```

**Features:**
- Sequential reveal
- Stagger delay: 100ms
- Fade + slide up
- Scale animation

---

### 7. Status Badge
**Component:** `AnimatedKPIBadge`

```tsx
import { AnimatedKPIBadge } from './components/animations';

<AnimatedKPIBadge status="success"> // or "warning", "error", "info"
  +12%
</AnimatedKPIBadge>
```

**Features:**
- Spring scale-in
- Color-coded by status
- Pulsing opacity
- Stiffness: 200

---

## 🔢 Count-Up Animation
**Component:** `CountUpAnimation`

```tsx
import { CountUpAnimation } from './components/animations';

<CountUpAnimation 
  value={99}
  suffix="%"
  prefix="$"
  className="text-5xl"
  duration={1.5}
/>
```

**Features:**
- Smooth number animation
- 0 → target value
- Ease-out transition
- Customizable formatting
- Duration: 900ms default

---

## ⚡ Animation Specifications

### Timing Standards
- **Hover effects:** 140-180ms
- **Button clicks:** 80-140ms
- **Chart loads:** 450-700ms
- **KPI animations:** 900ms - 4s

### Easing Functions
- `ease-out-quart`: [0.165, 0.84, 0.44, 1]
- `ease-out-cubic`: [0.33, 1, 0.68, 1]
- `ease-out-elastic`: [0.68, -0.55, 0.265, 1.55]

### Color Palette
- **Cyan:** #2EBFFF
- **Purple:** #AE71FF
- **Green:** #B2FF59
- **Red:** #FF3D71
- **Muted:** #9EA7B8

---

## 📦 Installation & Usage

### Import all animations:
```tsx
import * from './components/animations';
```

### Or import specific components:
```tsx
import { AnimatedButton, KPIAnimatedCard } from './components/animations';
```

---

## 🎯 Best Practices

1. **Performance:**
   - Use `transform` and `opacity` for animations (GPU accelerated)
   - Avoid animating `width`, `height`, `left`, `right`
   - Limit simultaneous animations to 10-15 elements

2. **Timing:**
   - Keep hover effects under 200ms
   - Use longer durations (500ms+) for loading states
   - Add delays for staggered effects (100-200ms)

3. **Accessibility:**
   - Respect `prefers-reduced-motion`
   - Ensure animations don't interfere with functionality
   - Maintain readable text during animations

4. **Consistency:**
   - Use the same easing for similar interactions
   - Maintain consistent timing across related elements
   - Follow the platform's color scheme

---

## 🔗 Live Demo
Visit `/animations-showcase` to see all animations in action!

---

## 📝 License
Part of the Azure Intelligent Cloud Forecasting Platform
© 2025 All rights reserved
