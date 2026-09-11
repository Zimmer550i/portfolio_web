import React, { useState, useEffect, useRef } from 'react';
import { PixelCard } from '../components/ui/PixelCard';
import { PixelTabs } from '../components/ui/PixelTabs';
import { PixelButton } from '../components/ui/PixelButton';
import { PixelVideoPlayer } from '../components/media/PixelVideoPlayer';
import { PixelImageViewer } from '../components/media/PixelImageViewer';
import { PixelGlbViewer } from '../components/media/PixelGlbViewer';
import { PixelModal } from '../components/ui/PixelModal';
import { Layers, Github, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { AnalyticsService } from '../services/analytics';
import userData from '../data/user_data.json';
import type { Projects, Media } from '../types/portfolio';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null);

  // Lightbox state
  const [lightboxImages, setLightboxImages] = useState<{ url: string; caption?: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    const current = sectionRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            AnalyticsService.trackSectionView('projects');
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(current);

    return () => {
      observer.disconnect();
      AnalyticsService.trackSectionDwellTime('projects', (Date.now() - startTime) / 1000);
    };
  }, []);

  const categories = [
    { id: 'all', label: 'ALL PRODUCTION' },
    { id: 'video', label: 'FLUTTER ENGINES' },
    { id: 'mockup', label: 'MOBILE APPS' },
    { id: 'showcase', label: '3D & IOT' },
  ];

  const filteredProjects = userData.projects.filter(
    (proj) => activeCategory === 'all' || proj.category === activeCategory
  );

  const handleOpenLightbox = (images: { url: string; caption?: string }[], startIndex: number = 0) => {
    setLightboxImages(images);
    setLightboxIndex(startIndex);
    setIsLightboxOpen(true);
    AnalyticsService.trackMediaInteraction('image', images[startIndex]?.caption || 'project_image', 'open');
  };

  const handleProjectClick = (proj: Projects) => {
    setSelectedProject(proj);
    AnalyticsService.trackProjectClick(proj.id || proj.title, proj.title, proj.category);
  };

  return (
    <section ref={sectionRef} id="projects" className="w-full scroll-mt-24 flex flex-col gap-6">
      {/* Section Header & Filters */}
      <PixelCard
        title="PRODUCTION_CASE_STUDIES // ARCHITECTURE IN ACTION"
        subtitle="FEATURED ENGINEERING PORTFOLIO"
        icon={<Layers size={14} className="text-pixel-primary" />}
        elevation="md"
        headerAction={
          <PixelTabs
            tabs={categories}
            activeTab={activeCategory}
            onChange={(tab) => {
              setActiveCategory(tab);
              AnalyticsService.trackSectionView(`projects_${tab}`);
            }}
          />
        }
      >
        <div className="text-xs font-code text-pixel-text-muted mb-2">
          Click any case study to explore source code, live metrics, YouTube demos or 3D assets.
        </div>
      </PixelCard>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {filteredProjects.map((project, index) => {
          const videoMedia = project.media?.find((m) => m.type === 'video') as Media | undefined;
          const threeDMedia = project.media?.find((m) => m.type === 'threeD') as Media | undefined;
          const imageMedias = (project.media?.filter((m) => m.type === 'image') || []) as Media[];

          return (
            <article
              key={project.id || index}
              className={`bg-pixel-surface border-2 border-pixel-border shadow-pixel-md flex flex-col justify-between gap-4 p-5 hover:border-pixel-primary transition-colors ${
                project.category === 'video' || project.category === 'showcase'
                  ? 'lg:col-span-12'
                  : 'lg:col-span-6'
              }`}
            >
              {/* Card Title Bar */}
              <div className="bg-pixel-surface-bright px-3.5 py-1.5 border-2 border-pixel-border flex items-center justify-between text-[10px] font-arcade">
                <span className="text-pixel-text truncate">
                  {project.title.toUpperCase()}
                </span>
                {project.metrics && (
                  <span className="font-code text-[10px] text-pixel-primary font-bold shrink-0 ml-2">
                    {project.metrics.label}: {project.metrics.value}
                  </span>
                )}
              </div>

              {/* Main Media or Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Media Container */}
                <div
                  className={`${
                    project.category === 'video' || project.category === 'showcase'
                      ? 'lg:col-span-7'
                      : 'lg:col-span-12'
                  }`}
                >
                  {videoMedia ? (
                    <PixelVideoPlayer
                      title={project.title}
                      url={videoMedia.url}
                      youtubeId={videoMedia.youtubeId}
                      thumbnail={videoMedia.thumbnail}
                      duration={videoMedia.duration}
                    />
                  ) : threeDMedia ? (
                    <PixelGlbViewer
                      title={project.title}
                      src={threeDMedia.url}
                      poster={threeDMedia.thumbnail}
                    />
                  ) : imageMedias.length > 0 ? (
                    <div className="relative w-full aspect-video bg-pixel-bg border-2 border-pixel-border overflow-hidden group cursor-pointer"
                      onClick={() => handleOpenLightbox(imageMedias.map(m => ({ url: m.url || '', caption: m.caption })), 0)}
                    >
                      <img
                        src={imageMedias[0].thumbnail || imageMedias[0].url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PixelButton variant="primary" size="sm" icon={<ImageIcon size={14} />}>
                          [INSPECT SCREENS ({imageMedias.length})]
                        </PixelButton>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Project Details */}
                <div
                  className={`flex flex-col justify-between gap-4 ${
                    project.category === 'video' || project.category === 'showcase'
                      ? 'lg:col-span-5'
                      : 'lg:col-span-12'
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <p className="font-body text-xs sm:text-sm text-pixel-text leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    {project.highlight && (
                      <div className="flex flex-col gap-1 mt-2 font-code text-xs text-pixel-text">
                        {project.highlight.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-1.5">
                            <span className="text-pixel-primary font-bold">►</span>
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tech Stack Chips */}
                  {project.tech && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 bg-pixel-surface-dim font-code text-[10px] text-pixel-text border border-pixel-border"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() =>
                          AnalyticsService.trackCtaClick('PROJECT_GITHUB', project.githubUrl)
                        }
                      >
                        <PixelButton variant="secondary" size="sm" icon={<Github size={12} />}>
                          [CODE REPO]
                        </PixelButton>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() =>
                          AnalyticsService.trackCtaClick('PROJECT_LIVE_DEMO', project.liveUrl)
                        }
                      >
                        <PixelButton variant="primary" size="sm" icon={<ExternalLink size={12} />}>
                          [LIVE DEMO]
                        </PixelButton>
                      </a>
                    )}
                    <PixelButton
                      variant="ghost"
                      size="sm"
                      onClick={() => handleProjectClick(project as Projects)}
                    >
                      [DETAILS]
                    </PixelButton>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <PixelModal
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
          title={`PROJECT_SPEC://${selectedProject.title.toUpperCase().replace(/\s+/g, '_')}`}
          subtitle={selectedProject.metrics ? `${selectedProject.metrics.label}: ${selectedProject.metrics.value}` : 'CASE STUDY'}
          maxWidth="2xl"
        >
          <div className="flex flex-col gap-4 font-code text-xs">
            <p className="font-body text-sm text-pixel-text leading-relaxed">
              {selectedProject.description}
            </p>

            {selectedProject.highlight && (
              <div className="bg-pixel-surface-dim p-4 border border-pixel-border flex flex-col gap-2">
                <span className="text-pixel-primary font-bold uppercase">Architecture Highlights:</span>
                {selectedProject.highlight.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-pixel-primary">✓</span>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer">
                  <PixelButton variant="secondary" size="sm" icon={<Github size={12} />}>
                    VIEW SOURCE ON GITHUB
                  </PixelButton>
                </a>
              )}
              {selectedProject.liveUrl && (
                <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer">
                  <PixelButton variant="primary" size="sm" icon={<ExternalLink size={12} />}>
                    OPEN EXTERNAL DEMO
                  </PixelButton>
                </a>
              )}
            </div>
          </div>
        </PixelModal>
      )}

      {/* Image Lightbox Viewer */}
      <PixelImageViewer
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onIndexChange={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
};
