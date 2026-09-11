import React, { useEffect, useRef } from 'react';
import { PixelCard } from '../components/ui/PixelCard';
import { PixelBadge } from '../components/ui/PixelBadge';
import { Trophy, Star } from 'lucide-react';
import { AnalyticsService } from '../services/analytics';
import userData from '../data/user_data.json';

export const AchievementsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    const current = sectionRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            AnalyticsService.trackSectionView('achievements');
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(current);

    return () => {
      observer.disconnect();
      AnalyticsService.trackSectionDwellTime('achievements', (Date.now() - startTime) / 1000);
    };
  }, []);

  return (
    <section ref={sectionRef} id="achievements" className="w-full scroll-mt-24">
      <PixelCard
        title="PRODUCTION_IMPACT &amp; ENGINEERING_MILESTONES"
        subtitle="VERIFIED MONETIZATION &amp; RELEASES"
        icon={<Trophy size={14} className="text-pixel-accent" />}
        elevation="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userData.achievements.map((ach, index) => (
            <div
              key={ach.id || index}
              className="bg-pixel-surface-dim p-4 border-2 border-pixel-border shadow-pixel-xs flex flex-col justify-between gap-3 hover:bg-pixel-surface-bright transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-arcade text-[10px] text-pixel-secondary truncate">
                  {ach.category}
                </span>
                <PixelBadge variant="accent" size="sm">
                  {ach.badge}
                </PixelBadge>
              </div>

              <div>
                <h3 className="font-arcade text-xs text-pixel-text flex items-center gap-1.5">
                  <Star size={12} className="text-pixel-accent" fill="currentColor" />
                  <span>{ach.title}</span>
                </h3>
                <p className="font-code text-xs text-pixel-text-muted mt-2 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="border-t border-pixel-border pt-2 flex items-center justify-between font-code text-[11px]">
                <span className="text-pixel-text-muted font-bold">METRIC:</span>
                <span className="text-pixel-primary font-bold">{ach.score}</span>
              </div>
            </div>
          ))}
        </div>
      </PixelCard>
    </section>
  );
};

