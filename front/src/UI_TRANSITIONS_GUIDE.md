# 🎯 UI Transitions & Micro-Interactions Guide

## Complete Animation System for Azure Intelligent Cloud Forecasting Platform

---

## 📋 Table of Contents
1. [Tab Transitions](#tab-transitions)
2. [Sidebar Animations](#sidebar-animations)
3. [Page Transitions](#page-transitions)
4. [Modal Stacking](#modal-stacking)
5. [Skeleton Loaders](#skeleton-loaders)
6. [3D Flip Cards](#3d-flip-cards)
7. [Micro-Interactions](#micro-interactions)

---

## ⭐ Tab Transitions

### 1. Smooth Slide + Glow
**Component:** `AnimatedTabs`

```tsx
import { AnimatedTabs } from './components/animations/TabAnimations';

const tabs = [
  {
    id: 'tab1',
    label: 'Overview',
    icon: <Icon />,
    content: <div>Content here</div>
  }
];

<AnimatedTabs tabs={tabs} variant="slide-glow" defaultTab="tab1" />
```

**Features:**
- Sliding indicator with neon glow trail
- Content fades: 0 → 100% opacity
- Slide up: 10px transition
- Duration: 240ms
- Easing: ease-out-cubic

---

### 2. 3D Flip Tab
**Component:** `FlipTab`

```tsx
import { FlipTab } from './components/animations/TabAnimations';

<FlipTab tabs={tabs} defaultTab="tab1" />
```

**Features:**
- 3D horizontal flip: rotateY -90° → 0°
- Holographic highlight reflection
- Duration: 350ms
- Easing: ease-out-back

---

### 3. Liquid Gradient Tab
**Component:** `LiquidGradientTab`

```tsx
import { LiquidGradientTab } from './components/animations/TabAnimations';

<LiquidGradientTab tabs={tabs} />
```

**Features:**
- Fluid gradient background slide
- Color shift: Cyan → Purple → Pink
- Smooth background position animation
- Hover scale effect

---

## 🟣 Sidebar Expand/Collapse Animations

### 1. Slide + Fade Sidebar
**Component:** `AnimatedSidebar` + `AnimatedSidebarItem`

```tsx
import { AnimatedSidebar, AnimatedSidebarItem } from './components/animations/SidebarAnimations';

<AnimatedSidebar 
  isExpanded={isExpanded} 
  onToggle={() => setIsExpanded(!isExpanded)}
>
  <AnimatedSidebarItem
    icon={<Icon />}
    label="Home"
    isExpanded={isExpanded}
    isActive={true}
    delay={0}
  />
</AnimatedSidebar>
```

**Features:**
- Width: 72px → 280px
- Icons fade into labels with stagger (50ms each)
- Neon border glow on expand
- Duration: 420ms ease-out

---

### 2. 3D Accordion Sidebar
**Component:** `AccordionSidebar`

```tsx
import { AccordionSidebar } from './components/animations/SidebarAnimations';

<AccordionSidebar isExpanded={isExpanded}>
  {/* Sidebar content */}
</AccordionSidebar>
```

**Features:**
- 3D rotation: rotateY 0° → -12° on collapse
- Bounce effect on expand
- Perspective: 1000px
- Duration: 420ms

---

### 3. Hover Expand Mini-Sidebar
**Component:** `HoverExpandSidebar`

```tsx
import { HoverExpandSidebar } from './components/animations/SidebarAnimations';

<HoverExpandSidebar>
  {/* Sidebar items */}
</HoverExpandSidebar>
```

**Features:**
- Auto-expands 20% on hover
- Blur glassmorphism effect
- Shadow lift animation
- Duration: 300ms

---

## 💠 Page Transition Animations

### 1. Slide-in Page + Blur
**Component:** `SlideBlurTransition`

```tsx
import { SlideBlurTransition } from './components/animations/PageTransitions';

<SlideBlurTransition routeKey={currentRoute}>
  <YourPage />
</SlideBlurTransition>
```

**Features:**
- Old page: slides left 40px + blur to 4px
- New page: slides in from right with fade
- Duration: 420ms
- Smooth easing

---

### 2. Fade + Scale Entry
**Component:** `FadeScaleTransition`

```tsx
import { FadeScaleTransition } from './components/animations/PageTransitions';

<FadeScaleTransition routeKey={currentRoute}>
  <YourPage />
</FadeScaleTransition>
```

**Features:**
- Scale: 96% → 100%
- Fade in with neon border glow
- Duration: 350ms

---

### 3. Cyber Scan Page Reveal
**Component:** `CyberScanTransition`

```tsx
import { CyberScanTransition } from './components/animations/PageTransitions';

<CyberScanTransition routeKey={currentRoute}>
  <YourPage />
</CyberScanTransition>
```

**Features:**
- Neon scanline sweep (top → bottom)
- Tech-grid overlay fade-out
- Duration: 800ms
- Content fade delay: 400ms

---

## 🔶 Modal Stacking Animations

### Setup Modal Stack Provider

```tsx
import { ModalStackProvider } from './components/animations/ModalStackAnimations';

function App() {
  return (
    <ModalStackProvider>
      <YourApp />
    </ModalStackProvider>
  );
}
```

### 1. Stacked Modal Lift Up
**Component:** `StackedModal`

```tsx
import { StackedModal, useModalStack } from './components/animations/ModalStackAnimations';

function MyComponent() {
  const { openModal } = useModalStack();
  
  return (
    <>
      <button onClick={() => openModal('modal-1')}>Open Modal</button>
      
      <StackedModal id="modal-1" title="My Modal" variant="lift-up">
        <p>Modal content</p>
      </StackedModal>
    </>
  );
}
```

**Features:**
- Lifts upward from 20px offset
- Lower modal dims: 100% → 70% opacity
- Stronger glow on upper modal
- Duration: 260ms

---

### 2. Depth Blur Modal Stack
**Component:** `StackedModal` with `depth-blur` variant

```tsx
<StackedModal id="modal-1" variant="depth-blur" title="My Modal">
  {/* Content */}
</StackedModal>
```

**Features:**
- Lower modal blurs 3px
- Upper modal: scale 85% → 100%
- Glow pulse effect
- Depth perception

---

### 3. Slide-in Tier Modal
**Component:** `TierModal`

```tsx
import { TierModal } from './components/animations/ModalStackAnimations';

<TierModal 
  id="tier-modal" 
  title="Tier Modal" 
  direction="top-right"
>
  {/* Content */}
</TierModal>
```

**Features:**
- Slides from different directions
- Each modal has colored neon rim light
- Direction options: top-right, top-left, bottom-right, bottom-left
- Duration: 300ms

---

## 🔷 Skeleton Loaders

### 1. Shimmer Loader
**Component:** `ShimmerLoader`

```tsx
import { ShimmerLoader } from './components/animations/SkeletonLoaders';

<ShimmerLoader className="h-6 w-1/3" />
```

**Features:**
- Horizontal shimmer: left → right
- Gradient: #1A1A1A → #2A2A2A with neon tint
- Duration: 1.5s infinite

---

### 2. Chart Skeleton Bars
**Component:** `ChartSkeletonBars`

```tsx
import { ChartSkeletonBars } from './components/animations/SkeletonLoaders';

<ChartSkeletonBars bars={8} />
```

**Features:**
- Pulsing opacity: 40% → 90%
- Animated gradient background
- Random height bars: 40-100%
- Stagger delay: 100ms per bar

---

### 3. Line Chart Skeleton Wave
**Component:** `LineChartSkeletonWave`

```tsx
import { LineChartSkeletonWave } from './components/animations/SkeletonLoaders';

<LineChartSkeletonWave />
```

**Features:**
- Wavy placeholder path
- Soft neon glow pulse
- Gradient stroke: Cyan → Purple → Cyan
- Duration: 2s pulse cycle

---

### 4. Card Skeleton Blocks
**Component:** `CardSkeletonBlocks`

```tsx
import { CardSkeletonBlocks } from './components/animations/SkeletonLoaders';

<CardSkeletonBlocks count={4} />
```

**Features:**
- Simulates KPI cards
- Icon, title, number, badge placeholders
- Shimmer effect on all elements
- Stagger reveal: 100ms per card

---

### 5. Progress Loaders

```tsx
import { PulsingDotLoader, CircularProgressLoader } from './components/animations/SkeletonLoaders';

<PulsingDotLoader size="lg" />
<CircularProgressLoader size={64} />
```

**Features:**
- Pulsing dots with sequential animation
- Circular gradient stroke animation
- Customizable sizes
- Infinite loop

---

## 🧊 3D Flip Card Animations

### 1. Front-to-Back Flip
**Component:** `FlipCard`

```tsx
import { FlipCard } from './components/animations/FlipCardAnimations';

<FlipCard
  front={<div>Front content</div>}
  back={<div>Back content</div>}
/>
```

**Features:**
- Y-axis rotation: 0° → 180°
- Metallic highlight sweep during flip
- Click to toggle
- Duration: 600ms

---

### 2. 3D Tilt Hover
**Component:** `TiltHoverCard`

```tsx
import { TiltHoverCard } from './components/animations/FlipCardAnimations';

<TiltHoverCard>
  <div>Your content</div>
</TiltHoverCard>
```

**Features:**
- Tilt based on cursor position (max 6°)
- Dynamic depth shadows
- Scale on hover: 1.05
- Perspective: 1000px

---

### 3. Multi-Layer Parallax Flip
**Component:** `ParallaxFlipCard`

```tsx
import { ParallaxFlipCard } from './components/animations/FlipCardAnimations';

<ParallaxFlipCard 
  layers={[
    { content: <Layer1 />, depth: 1 },
    { content: <Layer2 />, depth: 2 },
    { content: <Layer3 />, depth: 3 }
  ]}
/>
```

**Features:**
- Multiple layers at different depths
- Each layer moves at different offset
- Hologram effect
- Mouse-tracking parallax

---

### 4. Hover Expand Info Card
**Component:** `HoverExpandCard`

```tsx
import { HoverExpandCard } from './components/animations/FlipCardAnimations';

<HoverExpandCard
  preview={<div>Preview content</div>}
  details={<div>Detailed info</div>}
/>
```

**Features:**
- Auto-height expansion on hover
- Smooth content reveal
- Border separator animation
- Duration: 300ms

---

## 🧩 Micro-Interactions for Filters & Dropdowns

### 1. Smooth Dropdown Reveal
**Component:** `AnimatedDropdown`

```tsx
import { AnimatedDropdown } from './components/animations/MicroInteractions';

<AnimatedDropdown
  trigger={<span>Select Action</span>}
  items={[
    { label: 'Option 1', onClick: () => {}, icon: <Icon /> },
    { label: 'Option 2', onClick: () => {} }
  ]}
/>
```

**Features:**
- Height: 0 → full height
- Soft blur + slide-down motion
- Item stagger fade: 40ms each
- Click outside to close

---

### 2. Filter Chip Selection
**Component:** `FilterChip`

```tsx
import { FilterChip } from './components/animations/MicroInteractions';

<FilterChip
  label="Active"
  isSelected={isSelected}
  onClick={() => toggleFilter('active')}
  icon={<Icon />}
/>
```

**Features:**
- Background: gray → neon gradient
- Scale: 95% → 100%
- Glow ring flash: 150ms
- Hover scale: 1.05

---

### 3. Search Input Activation
**Component:** `AnimatedSearchInput`

```tsx
import { AnimatedSearchInput } from './components/animations/MicroInteractions';

<AnimatedSearchInput 
  placeholder="Search..." 
  onSearch={(value) => console.log(value)}
/>
```

**Features:**
- Width expands 20% on focus
- Cyan glow illumination
- Placeholder slide-in from left
- Icon color transition

---

### 4. Toggle Switch Animation
**Component:** `AnimatedToggle`

```tsx
import { AnimatedToggle } from './components/animations/MicroInteractions';

<AnimatedToggle
  isOn={isOn}
  onToggle={() => setIsOn(!isOn)}
  label="Enable Feature"
/>
```

**Features:**
- Rotation: 20° snap
- Neon flash on activation
- Smooth spring animation
- Gradient background shift

---

### 5. Checkbox Animation
**Component:** `AnimatedCheckbox`

```tsx
import { AnimatedCheckbox } from './components/animations/MicroInteractions';

<AnimatedCheckbox
  isChecked={isChecked}
  onChange={() => setIsChecked(!isChecked)}
  label="Accept Terms"
/>
```

**Features:**
- Checkmark spring animation
- Scale + rotate entrance
- Border color transition
- Gradient background on checked

---

### 6. Radio Group
**Component:** `AnimatedRadioGroup`

```tsx
import { AnimatedRadioGroup } from './components/animations/MicroInteractions';

<AnimatedRadioGroup
  options={[
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' }
  ]}
  selected={selected}
  onChange={setSelected}
/>
```

**Features:**
- Inner dot spring scale
- Border color transition
- Gradient fill animation
- Label color shift

---

## ⚡ Animation Timing Standards

| Animation Type | Duration | Easing |
|---------------|----------|--------|
| Hover effects | 140-180ms | ease-out-quart |
| Tab transitions | 240-350ms | ease-out-cubic |
| Sidebar expand | 420ms | ease-out |
| Page transitions | 420ms | custom bezier |
| Modal open/close | 260ms | ease-out-quart |
| Micro-interactions | 150-300ms | spring/ease-out |
| Skeleton loaders | 1.5-2s | linear (infinite) |
| 3D flips | 600ms | ease-out-back |

---

## 🎨 Color Palette

```css
--cyan: #2EBFFF
--purple: #AE71FF
--green: #B2FF59
--red: #FF3D71
--pink: #FF3D71
--muted: #9EA7B8
--dark-bg: #0B0F15
--card-bg: #1a1f2e
```

---

## 📦 Installation & Usage

### Import all transitions:
```tsx
import * from './components/animations';
```

### Or import specific modules:
```tsx
import { AnimatedTabs } from './components/animations/TabAnimations';
import { StackedModal } from './components/animations/ModalStackAnimations';
import { FlipCard } from './components/animations/FlipCardAnimations';
```

---

## 🔗 Live Demos

- **/animations-showcase** - Hover animations, buttons, KPI cards
- **/ui-transitions-showcase** - Tabs, sidebars, modals, skeletons, flip cards, micro-interactions

---

## 📝 Best Practices

1. **Performance**
   - Use `transform` and `opacity` (GPU accelerated)
   - Limit concurrent animations
   - Use `will-change` sparingly

2. **Accessibility**
   - Respect `prefers-reduced-motion`
   - Maintain focus management
   - Ensure keyboard navigation

3. **Consistency**
   - Follow timing standards
   - Use platform color palette
   - Match easing functions across similar interactions

4. **Progressive Enhancement**
   - Provide fallbacks for older browsers
   - Test on various devices
   - Monitor performance metrics

---

## 🎯 Master Implementation Prompt

```
Add advanced UI animations to the Azure Cloud Forecasting Platform including:
• Tab transitions (slide, 3D flip, liquid gradient)
• Sidebar expand/collapse with staggered items
• Page transitions (slide-blur, fade-scale, cyber-scan)
• Multi-modal stacking with depth blur
• Skeleton loaders (charts, KPI cards, tables)
• 3D flip card interactions with tilt and parallax
• Filter & dropdown micro-interactions with neon glow effects

Use neon cyan (#2EBFFF) and purple (#AE71FF) accents, glassmorphism UI, 3D depth shadows, holographic reflections, and smooth easing curves. All animations should feel cohesive, futuristic, and AI-powered with 140-600ms durations.
```

---

© 2025 Azure Intelligent Cloud Forecasting Platform - All Rights Reserved
