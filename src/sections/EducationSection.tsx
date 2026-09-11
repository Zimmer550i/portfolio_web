import React, { useEffect, useRef } from 'react';
import { PixelCard } from '../components/ui/PixelCard';
import { GraduationCap, Award, CheckCircle } from 'lucide-react';
import { AnalyticsService } from '../services/analytics';
import userData from '../data/user_data.json';

export const EducationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    const current = sectionRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            AnalyticsService.trackSectionView('education');
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(current);

    return () => {
      observer.disconnect();
      AnalyticsService.trackSectionDwellTime('education', (Date.now() - startTime) / 1000);
    };
  }, []);

  return (
    <section ref={sectionRef} id="education" className="w-full scroll-mt-24">
      <PixelCard
        title="ACADEMIC_FOUNDATION & VERIFIED_CREDENTIALS"
        subtitle="FORMAL CS & RECOGNITION"
        icon={<GraduationCap size={14} className="text-pixel-primary" />}
        elevation="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Degree Card */}
          {userData.education.map((edu, index) => (
            <div
              key={index}
              className="bg-pixel-surface-dim p-4 border-2 border-pixel-border shadow-pixel-xs flex flex-col justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-pixel-surface border-2 border-pixel-border flex items-center justify-center text-pixel-primary shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-arcade text-xs text-pixel-text">
                    {edu.degree.toUpperCase()}
                  </h3>
                  <span className="font-code text-xs text-pixel-secondary font-bold">
                    {edu.instituteName} // {edu.dateOfCompletion}
                  </span>
                  <p className="font-body text-xs text-pixel-text/90 mt-2">
                    {edu.course}
                  </p>
                </div>
              </div>

              {edu.achievements && (
                <div className="border-t border-pixel-border pt-2 flex flex-col gap-1 font-code text-[11px] text-pixel-text-muted">
                  {edu.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-center gap-1.5">
                      <CheckCircle size={12} className="text-pixel-primary" />
                      <span>{ach.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Industry Certifications Card */}
          {/* Spoken Languages & Developer Tooling Card */}
          <div className="bg-pixel-surface-dim p-4 border-2 border-pixel-border shadow-pixel-xs flex flex-col justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-pixel-surface border-2 border-pixel-border flex items-center justify-center text-pixel-secondary shrink-0">
                <Award size={20} />
              </div>
              <div className="flex flex-col w-full">
                <h3 className="font-arcade text-xs text-pixel-text">
                  LANGUAGES &amp; PLATFORMS
                </h3>
                <span className="font-code text-xs text-pixel-primary font-bold">
                  Spoken Proficiencies &amp; Tooling
                </span>

                {/* Spoken Languages Grid */}
                <div className="grid grid-cols-2 gap-2 mt-3 font-code text-xs">
                  {userData.languages.map((lang, lIdx) => (
                    <div
                      key={lIdx}
                      className="p-1.5 bg-pixel-surface border border-pixel-border flex items-center justify-between"
                    >
                      <span className="font-bold text-pixel-text">{lang.language}</span>
                      <span className="text-[10px] text-pixel-primary uppercase font-bold">
                        {lang.proficiency === 'c1' ? 'Fluent' : lang.proficiency === 'native' ? 'Native' : lang.proficiency === 'a2' ? 'Basic' : 'Learning'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tools & Release Platforms */}
                <div className="mt-3 pt-2 border-t border-pixel-border flex flex-col gap-1 font-code text-[11px] text-pixel-text">
                  <div className="text-pixel-text-muted font-bold uppercase">Tools &amp; Platforms:</div>
                  <div className="text-pixel-secondary">
                    App Store Connect • Google Play Console • Postman • cPanel
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-pixel-border pt-2 font-code text-[10px] text-pixel-text-muted">
              Foundation in Competitive Programming &amp; Algorithmic Thinking
            </div>
          </div>
        </div>
      </PixelCard>
    </section>
  );
};

