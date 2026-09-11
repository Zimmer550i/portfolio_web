import React, { useEffect, useRef } from 'react';
import { PixelCard } from '../components/ui/PixelCard';
import { PixelBadge } from '../components/ui/PixelBadge';
import { Briefcase, Check } from 'lucide-react';
import { AnalyticsService } from '../services/analytics';
import userData from '../data/user_data.json';

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    const current = sectionRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            AnalyticsService.trackSectionView('experience');
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(current);

    return () => {
      observer.disconnect();
      AnalyticsService.trackSectionDwellTime('experience', (Date.now() - startTime) / 1000);
    };
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="w-full scroll-mt-24">
      <PixelCard
        title="ENGINEERING_CAREER_TRACK // 2017 - PRESENT"
        subtitle="PRODUCTION TRACK RECORD"
        icon={<Briefcase size={14} className="text-pixel-secondary" />}
        elevation="lg"
      >
        <div className="flex flex-col gap-6 relative before:absolute before:left-3.5 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-pixel-border">
          {userData.expereince.map((exp, index) => (
            <div
              key={exp.id || index}
              className="flex items-start gap-4 sm:gap-6 relative pl-8 sm:pl-12"
            >
              {/* Stepped Pixel Marker */}
              <div className="absolute left-1.5 sm:left-3 top-2 w-4 h-4 bg-pixel-primary border-2 border-pixel-border shadow-pixel-xs -translate-x-1/2" />

              {/* Role Card */}
              <div className="w-full bg-pixel-surface-dim p-4 sm:p-5 border-2 border-pixel-border shadow-pixel-xs flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-arcade text-xs sm:text-sm text-pixel-text">
                      {exp.roleTitle} @ {exp.company.name}
                    </h3>
                    <div className="font-code text-xs text-pixel-secondary font-bold">
                      {exp.isRemote ? 'Remote // Full-Time' : 'On-Site // Production'}
                    </div>
                  </div>
                  <PixelBadge variant="accent" size="sm">
                    {exp.startDate.slice(0, 4)} - {exp.endDate ? exp.endDate.slice(0, 4) : 'PRESENT'}
                  </PixelBadge>
                </div>

                <p className="font-body text-xs sm:text-sm text-pixel-text/90 leading-relaxed">
                  {exp.description}
                </p>

                {/* Highlights List */}
                {exp.highlight && exp.highlight.length > 0 && (
                  <div className="flex flex-col gap-1 mt-1 font-code text-xs text-pixel-text">
                    {exp.highlight.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2">
                        <Check size={14} className="text-pixel-primary shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills Tags */}
                {exp.skills && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {exp.skills.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 bg-pixel-surface text-pixel-text font-code text-[10px] border border-pixel-border"
                      >
                        {s.technology.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </PixelCard>
    </section>
  );
};

