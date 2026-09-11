import React, { useState } from 'react';
import { Sun, Moon, Tv, Menu, X, LayoutTemplate } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { PixelButton } from '../ui/PixelButton';
import { AnalyticsService } from '../../services/analytics';
import userData from '../../data/user_data.json';

interface PixelNavbarProps {
  currentView: 'portfolio' | 'showcase';
  onToggleView: () => void;
}

export const PixelNavbar: React.FC<PixelNavbarProps> = ({
  currentView,
  onToggleView,
}) => {
  const { theme, toggleTheme, scanlines, toggleScanlines, config } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const enabledSections = config.sections.filter((s) => s.enabled);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    AnalyticsService.trackSectionView(sectionId);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-pixel-surface border-b-2 border-pixel-border shadow-pixel-sm select-none">
      {/* Top Telemetry Dev Bar */}
      <div className="w-full bg-pixel-surface-bright px-3 sm:px-6 py-1 flex items-center justify-between border-b-2 border-pixel-border font-code text-[11px] text-pixel-text">
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="flex items-center gap-1.5 font-bold text-pixel-primary">
            <span className="w-2 h-2 bg-pixel-primary inline-block animate-ping" />
            FLUTTER 3.24 // DART 3.5
          </span>
          <span className="hidden md:inline font-mono text-pixel-text-muted">
            {userData.targetFramerate}
          </span>
          <span className="hidden lg:inline font-bold text-pixel-secondary">
            {userData.runtimeRenderer}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-pixel-primary font-bold hidden sm:inline">
            [HOT RELOAD: ARMED]
          </span>
          <span className="text-pixel-secondary font-bold text-[10px]">
            {userData.statusBadge}
          </span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo & Identity */}
        <a
          href="#hero"
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 bg-pixel-surface-dim border-2 border-pixel-border flex items-center justify-center font-arcade text-xs text-pixel-primary shadow-pixel-xs group-hover:bg-pixel-surface-bright transition-colors">
            W
          </div>
          <div className="flex flex-col">
            <span className="font-arcade text-xs text-pixel-primary truncate">
              {userData.name.toUpperCase()}
            </span>
            <span className="font-code text-[10px] text-pixel-text-muted font-bold tracking-wider hidden sm:inline">
              // {userData.roleTitle}
            </span>
          </div>
        </a>

        {/* Dynamic Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {enabledSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => handleNavClick(section.id)}
              className="px-2.5 py-1 text-[10px] font-arcade text-pixel-text hover:text-pixel-primary hover:bg-pixel-surface-dim border border-transparent hover:border-pixel-border transition-all"
            >
              [{section.title}]
            </a>
          ))}
        </nav>

        {/* Right Controls & Action CTAs */}
        <div className="flex items-center gap-2">
          {/* Design System Showcase Mode Toggle */}
          <PixelButton
            variant={currentView === 'showcase' ? 'primary' : 'ghost'}
            size="sm"
            onClick={onToggleView}
            icon={<LayoutTemplate size={12} />}
            title="Toggle Design System Component Playground"
          >
            <span className="hidden sm:inline">
              {currentView === 'showcase' ? 'PORTFOLIO' : 'DESIGN SYSTEM'}
            </span>
          </PixelButton>

          {/* CRT Scanline Filter Toggle */}
          <button
            onClick={toggleScanlines}
            aria-label="Toggle CRT Scanlines"
            title={`CRT Scanlines: ${scanlines ? 'ON' : 'OFF'}`}
            className={`p-2 border-2 border-pixel-border pixel-press transition-colors shadow-pixel-xs ${
              scanlines
                ? 'bg-pixel-primary text-pixel-primary-contrast'
                : 'bg-pixel-surface-dim text-pixel-text hover:bg-pixel-surface-bright'
            }`}
          >
            <Tv size={14} />
          </button>

          {/* Theme Switcher (Dark / Light) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            title={`Active Theme: ${theme.toUpperCase()}`}
            className="p-2 bg-pixel-surface-dim hover:bg-pixel-surface-bright text-pixel-text border-2 border-pixel-border pixel-press transition-colors shadow-pixel-xs flex items-center gap-1"
          >
            {theme === 'dark' ? (
              <Sun size={14} className="text-pixel-accent" />
            ) : (
              <Moon size={14} className="text-pixel-secondary" />
            )}
          </button>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            onClick={() => {
              AnalyticsService.trackCtaClick('NAV_HIRE_ME', '#contact');
              handleNavClick('contact');
            }}
            className="hidden md:inline-flex"
          >
            <PixelButton variant="primary" size="sm">
              [HIRE ME]
            </PixelButton>
          </a>

          {/* Mobile Burger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="xl:hidden p-2 bg-pixel-surface-dim border-2 border-pixel-border text-pixel-text pixel-press shadow-pixel-xs"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-pixel-surface-bright border-t-2 border-pixel-border px-4 py-3 flex flex-col gap-2 animate-in slide-in-from-top-2">
          {enabledSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => handleNavClick(section.id)}
              className="py-2 px-3 font-arcade text-xs text-pixel-text hover:bg-pixel-surface border border-pixel-border"
            >
              [{section.title}]
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => {
              AnalyticsService.trackCtaClick('MOBILE_NAV_HIRE_ME', '#contact');
              handleNavClick('contact');
            }}
            className="w-full mt-2"
          >
            <PixelButton variant="primary" size="md" fullWidth>
              [HIRE ME / CONTACT]
            </PixelButton>
          </a>
        </div>
      )}
    </header>
  );
};
