import React, { useState } from 'react';
import { PixelCard } from '../components/ui/PixelCard';
import { PixelButton } from '../components/ui/PixelButton';
import { PixelBadge } from '../components/ui/PixelBadge';
import { PixelTabs } from '../components/ui/PixelTabs';
import { PixelImageViewer } from '../components/media/PixelImageViewer';
import { PixelVideoPlayer } from '../components/media/PixelVideoPlayer';
import { PixelGlbViewer } from '../components/media/PixelGlbViewer';
import { useTheme } from '../context/ThemeContext';
import { AnalyticsService } from '../services/analytics';
import {
  Sparkles,
  Layers,
  Palette,
  Type,
  ToggleLeft,
  Activity,
  Image as ImageIcon,
  CheckSquare,
  Square,
} from 'lucide-react';

export const DesignSystemShowcase: React.FC = () => {
  const { theme, toggleTheme, scanlines, toggleScanlines, config, updateSectionEnabled } = useTheme();

  // Test state for tabs
  const [activeTab, setActiveTab] = useState<string>('tab1');

  // Test state for image viewer
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);
  const sampleImages = [
    {
      url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      caption: 'Sample 01: 16-Bit Arcade Retro Console Hardware',
    },
    {
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      caption: 'Sample 02: Flutter Mobile UI Dark Canvas',
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Page Banner */}
      <PixelCard
        title="DESIGN_SYSTEM_SPEC // PIXEL_DEV_CONSOLE_V1.0"
        subtitle="EDITABLE THEMES, TOKENS, ATOMS &amp; MEDIA PLAYERS"
        icon={<Sparkles size={16} className="text-pixel-primary" />}
        elevation="lg"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="font-arcade text-lg text-pixel-primary leading-tight">
              DEVELOPER DESIGN SYSTEM &amp; COMPONENT BENCHMARK
            </h1>
            <p className="font-code text-xs text-pixel-text-muted mt-2">
              All components obey strict 0px border-radius geometry, stepped unblurred shadows, tactile press translation, and editable theme tokens.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <PixelButton
              variant="primary"
              size="sm"
              onClick={toggleTheme}
            >
              ACTIVE: {theme.toUpperCase()} MODE
            </PixelButton>
            <PixelButton
              variant="secondary"
              size="sm"
              onClick={toggleScanlines}
            >
              SCANLINES: {scanlines ? 'ON' : 'OFF'}
            </PixelButton>
          </div>
        </div>
      </PixelCard>

      {/* 1. COLOR PALETTE TOKENS */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 font-arcade text-xs text-pixel-text">
          <Palette size={16} className="text-pixel-primary" />
          <span>[01] THEME COLOR TOKENS & SWATCHES</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 font-code text-xs">
          <div className="bg-pixel-primary text-pixel-primary-contrast p-4 border-2 border-pixel-border shadow-pixel-xs flex flex-col justify-between h-24">
            <span className="font-bold">PRIMARY</span>
            <span className="text-[10px] opacity-80">--pixel-primary</span>
          </div>
          <div className="bg-pixel-secondary text-pixel-primary-contrast p-4 border-2 border-pixel-border shadow-pixel-xs flex flex-col justify-between h-24">
            <span className="font-bold">SECONDARY</span>
            <span className="text-[10px] opacity-80">--pixel-secondary</span>
          </div>
          <div className="bg-pixel-accent text-pixel-ink p-4 border-2 border-pixel-border shadow-pixel-xs flex flex-col justify-between h-24">
            <span className="font-bold">ACCENT</span>
            <span className="text-[10px] opacity-80">--pixel-accent</span>
          </div>
          <div className="bg-pixel-danger text-white p-4 border-2 border-pixel-border shadow-pixel-xs flex flex-col justify-between h-24">
            <span className="font-bold">DANGER</span>
            <span className="text-[10px] opacity-80">--pixel-danger</span>
          </div>
          <div className="bg-pixel-surface text-pixel-text p-4 border-2 border-pixel-border shadow-pixel-xs flex flex-col justify-between h-24">
            <span className="font-bold">SURFACE</span>
            <span className="text-[10px] opacity-80">--pixel-surface</span>
          </div>
          <div className="bg-pixel-surface-dim text-pixel-text p-4 border-2 border-pixel-border shadow-pixel-xs flex flex-col justify-between h-24">
            <span className="font-bold">SURFACE DIM</span>
            <span className="text-[10px] opacity-80">--pixel-surface-dim</span>
          </div>
        </div>
      </section>

      {/* 2. TYPOGRAPHY SCALE */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 font-arcade text-xs text-pixel-text">
          <Type size={16} className="text-pixel-secondary" />
          <span>[02] TYPOGRAPHY FAMILIES & HIERARCHY</span>
        </div>

        <PixelCard title="TYPOGRAPHY_SPECIMENS" elevation="sm">
          <div className="flex flex-col gap-6">
            <div className="border-b border-pixel-border pb-4">
              <span className="font-code text-[10px] text-pixel-primary font-bold uppercase block mb-1">
                Font Arcade (&apos;Press Start 2P&apos;) - Splash Titles &amp; Window Headers
              </span>
              <h2 className="font-arcade text-lg sm:text-xl text-pixel-text">
                ZERO-JANK 60FPS FLUTTER ARCHITECTURES
              </h2>
            </div>

            <div className="border-b border-pixel-border pb-4">
              <span className="font-code text-[10px] text-pixel-secondary font-bold uppercase block mb-1">
                Font Heading (&apos;Space Grotesk&apos;) - High-Impact Editorial Titles
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-pixel-text">
                Impeller Engine &amp; Cross-Platform Compilation At Scale
              </h3>
            </div>

            <div className="border-b border-pixel-border pb-4">
              <span className="font-code text-[10px] text-pixel-accent font-bold uppercase block mb-1">
                Font Body &amp; Code (&apos;Space Mono&apos;) - Narrative Copy &amp; Specifications
              </span>
              <p className="font-body text-sm text-pixel-text leading-relaxed">
                Specializing in high-concurrency state management, Skia/Impeller render passes, native platform channels (Swift/Kotlin), and offline-first SQLite synchronization.
              </p>
            </div>

            <div>
              <span className="font-code text-[10px] text-pixel-text-muted font-bold uppercase block mb-1">
                Font Terminal (&apos;VT323&apos;) - Retro Command Line Shell
              </span>
              <p className="font-terminal text-2xl text-pixel-primary">
                alex@flutter-station:~$ dart compile wasm -O4 --no-source-maps
              </p>
            </div>
          </div>
        </PixelCard>
      </section>

      {/* 3. BUTTONS & ACTIVE STATES */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 font-arcade text-xs text-pixel-text">
          <ToggleLeft size={16} className="text-pixel-primary" />
          <span>[03] PIXEL BUTTONS (TACTILE MICROSWITCH CLICK STATES)</span>
        </div>

        <PixelCard title="BUTTON_VARIANTS_AND_SIZES" elevation="sm">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <PixelButton variant="primary" size="md">
                [PRIMARY]
              </PixelButton>
              <PixelButton variant="secondary" size="md">
                [SECONDARY]
              </PixelButton>
              <PixelButton variant="ghost" size="md">
                [GHOST]
              </PixelButton>
              <PixelButton variant="amber" size="md">
                [AMBER]
              </PixelButton>
              <PixelButton variant="danger" size="md">
                [DANGER]
              </PixelButton>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-pixel-border pt-4">
              <span className="font-code text-xs text-pixel-text-muted font-bold mr-2">
                SIZES:
              </span>
              <PixelButton variant="primary" size="sm">
                SMALL [SM]
              </PixelButton>
              <PixelButton variant="primary" size="md">
                MEDIUM [MD]
              </PixelButton>
              <PixelButton variant="primary" size="lg">
                LARGE [LG]
              </PixelButton>
            </div>
          </div>
        </PixelCard>
      </section>

      {/* 4. BADGES & CHIPS */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 font-arcade text-xs text-pixel-text">
          <Activity size={16} className="text-pixel-accent" />
          <span>[04] STATUS BADGES &amp; PULSING PHOSPHOR LEDS</span>
        </div>

        <PixelCard title="BADGE_SPECIMENS" elevation="sm">
          <div className="flex flex-wrap items-center gap-3">
            <PixelBadge variant="primary" pulse>
              AVAILABLE FOR ROLES
            </PixelBadge>
            <PixelBadge variant="secondary">
              FLUTTER 3.24
            </PixelBadge>
            <PixelBadge variant="accent">
              BEST OF 2023
            </PixelBadge>
            <PixelBadge variant="neutral">
              REMOTE OK
            </PixelBadge>
            <PixelBadge variant="danger">
              CRITICAL BUFFER
            </PixelBadge>
          </div>
        </PixelCard>
      </section>

      {/* 5. TABS & CARTRIDGE FILTERS */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 font-arcade text-xs text-pixel-text">
          <Layers size={16} className="text-pixel-secondary" />
          <span>[05] RETRO CARTRIDGE TABS</span>
        </div>

        <PixelCard title="INTERACTIVE_CARTRIDGE_TABS" elevation="sm">
          <div className="flex flex-col gap-3">
            <PixelTabs
              tabs={[
                { id: 'tab1', label: 'ALL PRODUCTION', count: 12 },
                { id: 'tab2', label: 'FLUTTER ENGINES', count: 4 },
                { id: 'tab3', label: 'MOBILE APPS', count: 6 },
                { id: 'tab4', label: '3D TURNTABLES', count: 2 },
              ]}
              activeTab={activeTab}
              onChange={(t) => setActiveTab(t)}
            />
            <div className="font-code text-xs text-pixel-primary mt-2">
              Active Tab: [{activeTab.toUpperCase()}]
            </div>
          </div>
        </PixelCard>
      </section>

      {/* 6. MEDIA PLAYERS ARENA */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2 font-arcade text-xs text-pixel-text">
          <ImageIcon size={16} className="text-pixel-primary" />
          <span>[06] MEDIA PLAYERS: IMAGE VIEWER, CRT VIDEO &amp; 3D GLB</span>
        </div>

        {/* Image Viewer Trigger Card */}
        <PixelCard title="IMAGE_LIGHTBOX_INSPECTOR" elevation="sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-arcade text-xs text-pixel-text">
                PIXELATED IMAGE LIGHTBOX INSPECTOR
              </h4>
              <p className="font-code text-xs text-pixel-text-muted mt-1">
                Full-screen zoom, keyboard navigation, previous/next buttons, and retro stepped borders.
              </p>
            </div>
            <PixelButton
              variant="primary"
              size="md"
              icon={<ImageIcon size={14} />}
              onClick={() => setIsViewerOpen(true)}
            >
              LAUNCH LIGHTBOX TEST
            </PixelButton>
          </div>
        </PixelCard>

        {/* Video Player Sample */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6">
            <PixelVideoPlayer
              title="TheClue System Architecture &amp; RAG Pipeline Breakdown"
              url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              thumbnail="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80"
              duration="12:30"
            />
          </div>

          <div className="lg:col-span-6">
            <PixelGlbViewer
              title="Interactive 3D Hardware Chassis (GLB Turntable)"
              src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
            />
          </div>
        </div>
      </section>

      {/* 7. DYNAMIC SECTIONS ARCHITECTURE MATRIX */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 font-arcade text-xs text-pixel-text">
          <Layers size={16} className="text-pixel-primary" />
          <span>[07] DYNAMIC SECTION REGISTRY MATRIX</span>
        </div>

        <PixelCard
          title="CONFIG_SECTIONS_TOGGLE_TESTER"
          subtitle="EDIT LIVE VISIBILITY"
          elevation="sm"
        >
          <div className="flex flex-col gap-3 font-code text-xs">
            <p className="text-pixel-text-muted mb-2">
              Toggle sections on or off below. The change takes effect immediately across the entire portfolio and navigation bar:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {config.sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    updateSectionEnabled(sec.id, !sec.enabled);
                    AnalyticsService.trackThemeChange(theme);
                  }}
                  className={`p-3 border-2 border-pixel-border flex items-center justify-between gap-2 pixel-press transition-colors text-left ${
                    sec.enabled
                      ? 'bg-pixel-surface border-pixel-primary text-pixel-primary'
                      : 'bg-pixel-surface-dim border-pixel-border text-pixel-text-muted line-through'
                  }`}
                >
                  <span className="font-arcade text-[10px] truncate">
                    [{sec.title}]
                  </span>
                  {sec.enabled ? (
                    <CheckSquare size={16} className="text-pixel-primary shrink-0" />
                  ) : (
                    <Square size={16} className="text-pixel-text-muted shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </PixelCard>
      </section>

      {/* Lightbox Instance */}
      <PixelImageViewer
        images={sampleImages}
        currentIndex={0}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </div>
  );
};

