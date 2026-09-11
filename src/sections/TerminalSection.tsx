import React, { useEffect, useRef } from 'react';
import { PixelTerminal } from '../components/terminal/PixelTerminal';
import { AnalyticsService } from '../services/analytics';

export const TerminalSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    const current = sectionRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            AnalyticsService.trackSectionView('terminal');
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(current);

    return () => {
      observer.disconnect();
      AnalyticsService.trackSectionDwellTime('terminal', (Date.now() - startTime) / 1000);
    };
  }, []);

  return (
    <section ref={sectionRef} id="terminal" className="w-full scroll-mt-24">
      <PixelTerminal />
    </section>
  );
};
