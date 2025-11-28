import { useState } from 'react';
import { 
  AnimatedTabs, 
  FlipTab, 
  LiquidGradientTab 
} from '../components/animations/TabAnimations';
import {
  AnimatedSidebar,
  AnimatedSidebarItem,
  SidebarToggleButton
} from '../components/animations/SidebarAnimations';
import {
  StackedModal,
  TierModal,
  ModalStackProvider,
  useModalStack
} from '../components/animations/ModalStackAnimations';
import {
  ShimmerLoader,
  ChartSkeletonBars,
  LineChartSkeletonWave,
  CardSkeletonBlocks,
  PulsingDotLoader,
  CircularProgressLoader
} from '../components/animations/SkeletonLoaders';
import {
  FlipCard,
  TiltHoverCard,
  HoverExpandCard
} from '../components/animations/FlipCardAnimations';
import {
  AnimatedDropdown,
  FilterChip,
  AnimatedSearchInput,
  AnimatedToggle,
  AnimatedCheckbox,
  AnimatedRadioGroup
} from '../components/animations/MicroInteractions';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Cpu, 
  Settings, 
  Home,
  Zap,
  Download,
  Upload,
  Share2
} from 'lucide-react';

function ShowcaseContent() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('option1');
  const [showSkeleton, setShowSkeleton] = useState(false);
  
  const { openModal } = useModalStack();

  const tabData = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <Home className="w-4 h-4" />,
      content: (
        <div className="p-6 glass-card rounded-xl mt-4">
          <h3 className="text-xl mb-4 text-[#2EBFFF]">Overview Content</h3>
          <p className="text-[#9EA7B8]">
            This tab showcases smooth slide + glow transitions with content fade-in.
          </p>
        </div>
      )
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-4 h-4" />,
      content: (
        <div className="p-6 glass-card rounded-xl mt-4">
          <h3 className="text-xl mb-4 text-[#AE71FF]">Analytics Dashboard</h3>
          <p className="text-[#9EA7B8]">
            Real-time analytics data with animated charts and KPIs.
          </p>
        </div>
      )
    },
    {
      id: 'users',
      label: 'Users',
      icon: <Users className="w-4 h-4" />,
      content: (
        <div className="p-6 glass-card rounded-xl mt-4">
          <h3 className="text-xl mb-4 text-[#B2FF59]">User Management</h3>
          <p className="text-[#9EA7B8]">
            Manage users, permissions, and access controls.
          </p>
        </div>
      )
    }
  ];

  const filterOptions = ['Active', 'Pending', 'Completed', 'Archived'];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent mb-3">
          UI Transitions Showcase
        </h1>
        <p className="text-[#9EA7B8] text-lg">
          Advanced animations for tabs, sidebars, modals, skeletons, and micro-interactions
        </p>
      </div>

      {/* Tab Transitions */}
      <div className="mb-12">
        <h2 className="text-3xl mb-6 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
          ⭐ Tab Transitions
        </h2>
        
        <div className="space-y-8">
          {/* Smooth Slide + Glow */}
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-xl mb-4 text-[#2EBFFF]">Smooth Slide + Glow</h3>
            <AnimatedTabs tabs={tabData} variant="slide-glow" />
          </div>

          {/* 3D Flip */}
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-xl mb-4 text-[#AE71FF]">3D Flip Transition</h3>
            <FlipTab tabs={tabData} />
          </div>

          {/* Liquid Gradient */}
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-xl mb-4 text-[#B2FF59]">Liquid Gradient</h3>
            <LiquidGradientTab tabs={tabData} />
          </div>
        </div>
      </div>

      {/* Sidebar Animation */}
      <div className="mb-12">
        <h2 className="text-3xl mb-6 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
          🟣 Sidebar Expand/Collapse
        </h2>
        
        <div className="glass-card p-6 rounded-xl border border-white/10">
          <div className="flex items-start gap-4">
            <AnimatedSidebar 
              isExpanded={isSidebarExpanded} 
              onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="glass-card-premium rounded-xl p-4"
            >
              <div className="space-y-2">
                <AnimatedSidebarItem
                  icon={<Home className="w-5 h-5" />}
                  label="Home"
                  isExpanded={isSidebarExpanded}
                  isActive={true}
                  delay={0}
                />
                <AnimatedSidebarItem
                  icon={<BarChart3 className="w-5 h-5" />}
                  label="Analytics"
                  isExpanded={isSidebarExpanded}
                  delay={1}
                />
                <AnimatedSidebarItem
                  icon={<Users className="w-5 h-5" />}
                  label="Users"
                  isExpanded={isSidebarExpanded}
                  delay={2}
                />
                <AnimatedSidebarItem
                  icon={<Settings className="w-5 h-5" />}
                  label="Settings"
                  isExpanded={isSidebarExpanded}
                  delay={3}
                />
              </div>
            </AnimatedSidebar>
            
            <div className="flex-1">
              <SidebarToggleButton 
                isExpanded={isSidebarExpanded} 
                onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)} 
              />
              <p className="text-[#9EA7B8] mt-4">
                Click the toggle button to expand/collapse sidebar with staggered animation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Stacking */}
      <div className="mb-12">
        <h2 className="text-3xl mb-6 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
          🔶 Modal Stacking Animations
        </h2>
        
        <div className="glass-card p-6 rounded-xl border border-white/10">
          <div className="flex gap-4">
            <button
              onClick={() => openModal('modal-1')}
              className="btn-primary"
            >
              Open Modal 1
            </button>
            <button
              onClick={() => openModal('modal-2')}
              className="btn-secondary"
            >
              Open Modal 2
            </button>
            <button
              onClick={() => openModal('tier-modal')}
              className="btn-secondary"
            >
              Open Tier Modal
            </button>
          </div>
          
          <p className="text-[#9EA7B8] mt-4">
            Open multiple modals to see stacking animations with depth blur and lift effects
          </p>
        </div>

        {/* Modals */}
        <StackedModal id="modal-1" title="First Modal" variant="lift-up">
          <p className="text-[#9EA7B8] mb-4">
            This is the first modal with lift-up animation. Open another modal to see stacking.
          </p>
          <button onClick={() => openModal('modal-2')} className="btn-primary">
            Open Second Modal
          </button>
        </StackedModal>

        <StackedModal id="modal-2" title="Second Modal" variant="depth-blur">
          <p className="text-[#9EA7B8]">
            Second modal stacked on top with depth blur effect on lower modal.
          </p>
        </StackedModal>

        <TierModal id="tier-modal" title="Tier Modal" direction="top-right">
          <p className="text-[#9EA7B8]">
            Modal sliding in from top-right with colored neon rim light.
          </p>
        </TierModal>
      </div>

      {/* Skeleton Loaders */}
      <div className="mb-12">
        <h2 className="text-3xl mb-6 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
          🔷 Skeleton Loaders
        </h2>
        
        <div className="glass-card p-6 rounded-xl border border-white/10 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <AnimatedToggle 
              isOn={showSkeleton} 
              onToggle={() => setShowSkeleton(!showSkeleton)}
              label="Show Skeleton Loaders"
            />
          </div>
        </div>

        {showSkeleton && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg mb-4 text-[#2EBFFF]">Chart Skeleton Bars</h3>
              <ChartSkeletonBars bars={8} />
            </div>

            <div>
              <h3 className="text-lg mb-4 text-[#AE71FF]">Line Chart Skeleton Wave</h3>
              <LineChartSkeletonWave />
            </div>

            <div>
              <h3 className="text-lg mb-4 text-[#B2FF59]">Card Skeleton Blocks</h3>
              <CardSkeletonBlocks count={4} />
            </div>

            <div className="flex items-center gap-8">
              <div>
                <h3 className="text-sm mb-2 text-[#9EA7B8]">Pulsing Dots</h3>
                <PulsingDotLoader size="lg" />
              </div>
              <div>
                <h3 className="text-sm mb-2 text-[#9EA7B8]">Circular Progress</h3>
                <CircularProgressLoader size={64} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3D Flip Cards */}
      <div className="mb-12">
        <h2 className="text-3xl mb-6 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
          🧊 3D Flip Card Animations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Front-to-Back Flip */}
          <FlipCard
            className="h-64"
            front={
              <div className="h-full flex flex-col justify-center items-center">
                <TrendingUp className="w-12 h-12 text-[#2EBFFF] mb-4" />
                <h3 className="text-xl mb-2">Front Side</h3>
                <p className="text-[#9EA7B8] text-center">Click to flip</p>
              </div>
            }
            back={
              <div className="h-full flex flex-col justify-center items-center">
                <BarChart3 className="w-12 h-12 text-[#AE71FF] mb-4" />
                <h3 className="text-xl mb-2">Back Side</h3>
                <p className="text-[#9EA7B8] text-center">Detailed information here</p>
              </div>
            }
          />

          {/* 3D Tilt Hover */}
          <TiltHoverCard className="h-64">
            <div className="h-full flex flex-col justify-center items-center">
              <Cpu className="w-12 h-12 text-[#B2FF59] mb-4" />
              <h3 className="text-xl mb-2">3D Tilt</h3>
              <p className="text-[#9EA7B8] text-center">Move mouse to tilt</p>
            </div>
          </TiltHoverCard>

          {/* Hover Expand */}
          <HoverExpandCard
            className="h-64"
            preview={
              <div>
                <Zap className="w-12 h-12 text-[#FF3D71] mb-4" />
                <h3 className="text-xl mb-2">Preview</h3>
                <p className="text-[#9EA7B8]">Hover to expand</p>
              </div>
            }
            details={
              <div className="text-[#9EA7B8]">
                <p className="mb-2">Additional details appear here with smooth animation.</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                </ul>
              </div>
            }
          />
        </div>
      </div>

      {/* Micro-Interactions */}
      <div className="mb-12">
        <h2 className="text-3xl mb-6 bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] bg-clip-text text-transparent">
          🧩 Micro-Interactions
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dropdown */}
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-lg mb-4 text-[#2EBFFF]">Animated Dropdown</h3>
            <AnimatedDropdown
              trigger={<span>Select Action</span>}
              items={[
                { label: 'Download', onClick: () => {}, icon: <Download className="w-4 h-4" /> },
                { label: 'Upload', onClick: () => {}, icon: <Upload className="w-4 h-4" /> },
                { label: 'Share', onClick: () => {}, icon: <Share2 className="w-4 h-4" /> }
              ]}
            />
          </div>

          {/* Search Input */}
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-lg mb-4 text-[#AE71FF]">Animated Search</h3>
            <AnimatedSearchInput placeholder="Type to search..." />
          </div>

          {/* Filter Chips */}
          <div className="glass-card p-6 rounded-xl border border-white/10 lg:col-span-2">
            <h3 className="text-lg mb-4 text-[#B2FF59]">Filter Chips</h3>
            <div className="flex flex-wrap gap-3">
              {filterOptions.map(filter => (
                <FilterChip
                  key={filter}
                  label={filter}
                  isSelected={selectedFilters.includes(filter)}
                  onClick={() => toggleFilter(filter)}
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-lg mb-4 text-[#2EBFFF]">Toggle & Checkbox</h3>
            <div className="space-y-4">
              <AnimatedToggle 
                isOn={isToggleOn} 
                onToggle={() => setIsToggleOn(!isToggleOn)}
                label="Enable Feature"
              />
              <AnimatedCheckbox
                isChecked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                label="Accept Terms"
              />
            </div>
          </div>

          {/* Radio Group */}
          <div className="glass-card p-6 rounded-xl border border-white/10">
            <h3 className="text-lg mb-4 text-[#AE71FF]">Radio Group</h3>
            <AnimatedRadioGroup
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' }
              ]}
              selected={selectedRadio}
              onChange={setSelectedRadio}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UITransitionsShowcasePage() {
  return (
    <ModalStackProvider>
      <ShowcaseContent />
    </ModalStackProvider>
  );
}
