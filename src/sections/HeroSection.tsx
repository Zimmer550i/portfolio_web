import React, { useEffect, useRef } from 'react';
import { PixelCard } from '../components/ui/PixelCard';
import { PixelButton } from '../components/ui/PixelButton';
import { PixelBadge } from '../components/ui/PixelBadge';
import { FileDown, Handshake, Eye } from 'lucide-react';
import { AnalyticsService } from '../services/analytics';
import userData from '../data/user_data.json';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    const current = sectionRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            AnalyticsService.trackSectionView('hero');
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(current);

    return () => {
      observer.disconnect();
      const durationSeconds = (Date.now() - startTime) / 1000;
      AnalyticsService.trackSectionDwellTime('hero', durationSeconds);
    };
  }, []);

  const handleResumeDownload = () => {
    AnalyticsService.trackCtaClick('DOWNLOAD_RESUME', userData.cvAsset);
    alert(`Downloading ${userData.name.replace(/\s+/g, '_')}_Staff_Flutter_Resume.pdf...`);
  };

  return (
    <section ref={sectionRef} id="hero" className="w-full scroll-mt-24">
      <PixelCard
        title={`ENGINEER_SPEC://${userData.name.toUpperCase().replace(/\s+/g, '_')}.FLUTTER_LEAD`}
        statusBadge="PROD_VERIFIED"
        elevation="lg"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Avatar & Technical Hardware Spec */}
          <div className="lg:col-span-4 flex flex-col items-center bg-pixel-surface-dim p-5 border-2 border-pixel-border shadow-pixel-sm">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 bg-pixel-surface p-1.5 border-2 border-pixel-border flex items-center justify-center">
              <img
                src={userData.imgAsset}
                alt={userData.name}
                className="w-full h-full object-cover"
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="absolute -top-2.5 -left-2.5 bg-pixel-secondary text-pixel-primary-contrast border-2 border-pixel-border font-arcade text-[9px] px-2 py-0.5 shadow-pixel-xs">
                STAFF ENG
              </div>
              <div className="absolute -bottom-2.5 -right-2.5 bg-pixel-primary text-pixel-primary-contrast border-2 border-pixel-border font-arcade text-[9px] px-2 py-0.5 shadow-pixel-xs">
                DART 3.5 AOT
              </div>
            </div>

            {/* Spec Table */}
            <div className="w-full mt-5 flex flex-col gap-2 font-code text-[11px]">
              <div className="flex items-center justify-between border-b border-pixel-border pb-1">
                <span className="text-pixel-text-muted font-bold">Primary Domain</span>
                <span className="font-bold text-pixel-secondary truncate ml-2">
                  {userData.specs.primaryDomain}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-pixel-border pb-1">
                <span className="text-pixel-text-muted font-bold">State Engine</span>
                <span className="font-bold text-pixel-primary truncate ml-2">
                  {userData.specs.stateEngine}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-pixel-border pb-1">
                <span className="text-pixel-text-muted font-bold">Native FFI</span>
                <span className="font-bold text-pixel-text truncate ml-2">
                  {userData.specs.nativeBridges}
                </span>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-pixel-text-muted font-bold">Availability</span>
                <PixelBadge variant="primary" size="sm" pulse>
                  {userData.specs.availability}
                </PixelBadge>
              </div>
            </div>
          </div>

          {/* Proposition & Metrics */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <div className="bg-pixel-surface-dim p-6 border-2 border-pixel-border shadow-pixel-sm">
              <div className="flex items-center gap-2 font-code text-[11px] text-pixel-secondary mb-2 font-bold uppercase tracking-wider">
                <span className="w-2 h-2 bg-pixel-secondary inline-block" />
                {userData.roleTitle}
              </div>
              <h1 className="font-arcade text-base sm:text-xl md:text-2xl text-pixel-text leading-relaxed">
                {userData.tagline}
              </h1>
              <p className="font-body text-xs sm:text-sm text-pixel-text/90 mt-4 leading-relaxed">
                {userData.summery}
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a href="#contact">
                <PixelButton
                  variant="primary"
                  size="md"
                  icon={<Handshake size={16} />}
                  onClick={() => AnalyticsService.trackCtaClick('HERO_HIRE_ME', '#contact')}
                >
                  [HIRE ME / WORK TOGETHER]
                </PixelButton>
              </a>

              <PixelButton
                variant="secondary"
                size="md"
                icon={<FileDown size={16} />}
                onClick={handleResumeDownload}
              >
                [DOWNLOAD RESUME (PDF)]
              </PixelButton>

              <a href="#projects">
                <PixelButton
                  variant="ghost"
                  size="md"
                  icon={<Eye size={16} />}
                  onClick={() => AnalyticsService.trackCtaClick('HERO_VIEW_SHOWCASE', '#projects')}
                >
                  [VIEW SHOWCASE]
                </PixelButton>
              </a>
            </div>

            {/* Hard Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1">
              {userData.stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-pixel-surface-dim p-3 border-2 border-pixel-border shadow-pixel-xs flex flex-col items-center justify-center text-center"
                >
                  <span
                    className={`font-arcade text-base sm:text-lg ${
                      stat.color === 'secondary'
                        ? 'text-pixel-secondary'
                        : stat.color === 'accent'
                        ? 'text-pixel-accent'
                        : 'text-pixel-primary'
                    }`}
                  >
                    {stat.value}
                  </span>
                  <span className="font-code text-[10px] text-pixel-text-muted font-bold uppercase mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PixelCard>
    </section>
  );
};
