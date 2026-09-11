import React, { useEffect, useRef } from 'react';
import { PixelCard } from '../components/ui/PixelCard';
import { PixelBadge } from '../components/ui/PixelBadge';
import { Terminal, Cpu } from 'lucide-react';
import { AnalyticsService } from '../services/analytics';
import userData from '../data/user_data.json';

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    const current = sectionRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            AnalyticsService.trackSectionView('skills');
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(current);

    return () => {
      observer.disconnect();
      AnalyticsService.trackSectionDwellTime('skills', (Date.now() - startTime) / 1000);
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="w-full scroll-mt-24">
      <PixelCard
        title="TECHNICAL_TOOLKIT // FLUTTER_GOLANG_FASTAPI_STACK"
        subtitle="CROSS-PLATFORM • CONCURRENT MICROSERVICES • CLEAN ARCHITECTURE"
        icon={<Terminal size={14} className="text-pixel-primary" />}
        elevation="lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {userData.skills.map((skill, index) => (
            <div
              key={index}
              className="bg-pixel-surface-dim p-4 border-2 border-pixel-border shadow-pixel-xs flex flex-col justify-between gap-3 hover:bg-pixel-surface-bright transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="w-8 h-8 bg-pixel-surface border-2 border-pixel-border flex items-center justify-center text-pixel-secondary">
                  <Cpu size={16} />
                </div>
                <PixelBadge variant="primary" size="sm">
                  {skill.levelTag || 'EXPERT'}
                </PixelBadge>
              </div>

              <div>
                <h3 className="font-arcade text-[11px] text-pixel-text leading-tight">
                  {skill.technology.name}
                </h3>
                <p className="font-code text-xs text-pixel-text-muted mt-2 line-clamp-3">
                  {skill.description}
                </p>
              </div>

              {/* Retro Stepped Progress Bar */}
              <div className="w-full flex flex-col gap-1">
                <div className="flex items-center justify-between font-code text-[10px] text-pixel-text-muted">
                  <span>MASTERY</span>
                  <span className="text-pixel-primary font-bold">
                    {skill.proficiencyPercentage}%
                  </span>
                </div>
                <div className="w-full bg-pixel-surface h-2 border border-pixel-border">
                  <div
                    className="h-full bg-pixel-primary"
                    style={{ width: `${skill.proficiencyPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </PixelCard>
    </section>
  );
};

