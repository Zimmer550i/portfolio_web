import React, { useState, useEffect } from 'react';
import { PixelNavbar } from './components/layout/PixelNavbar';
import { SectionRenderer } from './components/layout/SectionRenderer';
import { DesignSystemShowcase } from './pages/DesignSystemShowcase';
import { ArrowUp } from 'lucide-react';
import { AnalyticsService } from './services/analytics';
import userData from './data/user_data.json';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'portfolio' | 'showcase'>('portfolio');

  useEffect(() => {
    AnalyticsService.trackPageView(
      currentView === 'portfolio' ? 'Portfolio Home' : 'Design System Showcase'
    );
  }, [currentView]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-pixel-bg text-pixel-text">
      {/* Fixed Retro Navigation Bar */}
      <PixelNavbar
        currentView={currentView}
        onToggleView={() =>
          setCurrentView((prev) => (prev === 'portfolio' ? 'showcase' : 'portfolio'))
        }
      />

      {/* Main Content Area */}
      <main className="w-full pt-28 pb-16 px-4 sm:px-6 flex-1">
        <div className="max-w-7xl mx-auto">
          {currentView === 'portfolio' ? (
            <SectionRenderer />
          ) : (
            <DesignSystemShowcase />
          )}
        </div>
      </main>

      {/* Retro Footer */}
      <footer className="w-full bg-pixel-surface border-t-2 border-pixel-border py-6 px-4 sm:px-6 select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-code text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-pixel-text-muted">
            <span className="font-arcade text-[10px] text-pixel-primary">
              © {new Date().getFullYear()} {userData.name.toUpperCase()}
            </span>
            <span className="hidden sm:inline">•</span>
            <span>BUILT WITH FLUTTER &amp; DART DESIGN PHILOSOPHY // HIGH-PERFORMANCE WEB ARCHITECTURE</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-pixel-secondary font-bold text-[11px]">
              RENDERER: 60 FPS SOLID
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to Top"
              className="p-1.5 bg-pixel-surface-dim hover:bg-pixel-surface-bright text-pixel-primary border-2 border-pixel-border pixel-press shadow-pixel-xs flex items-center gap-1 font-arcade text-[9px]"
            >
              <ArrowUp size={12} />
              <span>[TOP]</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

