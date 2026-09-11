import React, { useState, useEffect, useRef } from 'react';
import { PixelCard } from '../components/ui/PixelCard';
import { PixelTabs } from '../components/ui/PixelTabs';
import { PixelButton } from '../components/ui/PixelButton';
import { PixelVideoPlayer } from '../components/media/PixelVideoPlayer';
import { PixelImageViewer } from '../components/media/PixelImageViewer';
import { PixelGlbViewer } from '../components/media/PixelGlbViewer';
import { PixelModal } from '../components/ui/PixelModal';
import {
  Layers,
  Github,
  ExternalLink,
  Image as ImageIcon,
  Smartphone,
  Server,
  Code,
  CheckCircle2,
} from 'lucide-react';
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
    { id: 'flagship', label: 'FLAGSHIP APPS' },
    { id: 'service', label: 'BACKEND & 3D' },
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
        title="PRODUCTION_CASE_STUDIES // ARCHITECTURE & SYSTEMS IN ACTION"
        subtitle="VERIFIED PRODUCTION DEPLOYMENTS"
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
        <div className="text-xs font-code text-pixel-text-muted">
          Commercial applications shipped to the Apple App Store, Google Play Console, and cloud environments.
        </div>
      </PixelCard>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {filteredProjects.map((project, index) => {
          const videoMedia = project.media?.find((m) => m.type === 'video') as Media | undefined;
          const threeDMedia = project.media?.find((m) => m.type === 'threeD') as Media | undefined;
          const imageMedias = (project.media?.filter((m) => m.type === 'image') || []) as Media[];

          // Eliminate orphaned layout gaps:
          // Flagship projects are full width (12 cols).
          // Secondary projects take 6 cols unless isolated, in which case they expand to 12 cols.
          const isFullWidth =
            project.category === 'flagship' ||
            filteredProjects.length === 1 ||
            (filteredProjects.filter((p) => p.category !== 'flagship').length % 2 !== 0 &&
              index === filteredProjects.length - 1);

          return (
            <article
              key={project.id || index}
              className={`bg-pixel-surface border-2 border-pixel-border shadow-pixel-md flex flex-col justify-between gap-4 p-5 hover:border-pixel-primary transition-colors ${
                isFullWidth ? 'lg:col-span-12' : 'lg:col-span-6'
              }`}
            >
              {/* Card Title Bar (Stitch Reference Standard) */}
              <div className="bg-pixel-surface-bright px-3.5 py-2 border-2 border-pixel-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-arcade">
                <div className="flex items-center gap-2 text-pixel-text truncate">
                  {project.category === 'flagship' ? (
                    <Smartphone size={14} className="text-pixel-secondary shrink-0" />
                  ) : threeDMedia ? (
                    <Layers size={14} className="text-pixel-accent shrink-0" />
                  ) : (
                    <Server size={14} className="text-pixel-primary shrink-0" />
                  )}
                  <span className="truncate">
                    CASE STUDY // {project.title.toUpperCase()}
                  </span>
                </div>
                {project.metrics && (
                  <span className="font-code text-[11px] text-pixel-primary font-bold shrink-0">
                    {project.metrics.label}: {project.metrics.value}
                  </span>
                )}
              </div>

              {/* Main Media & Details Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Media Container (Left Column in Full-Width, Top in Half-Width) */}
                <div className={`${isFullWidth ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
                  {videoMedia ? (
                    <PixelVideoPlayer
                      title={project.title}
                      url={videoMedia.url}
                      youtubeId={videoMedia.youtubeId}
                      thumbnail={videoMedia.thumbnail}
                      duration={videoMedia.duration}
                      targetFramerate="60 FPS JITTER-FREE"
                    />
                  ) : threeDMedia ? (
                    <PixelGlbViewer
                      title={project.title}
                      src={threeDMedia.url}
                      poster={threeDMedia.thumbnail}
                      height={isFullWidth ? '380px' : '280px'}
                    />
                  ) : imageMedias.length > 0 ? (
                    <div
                      className="relative w-full aspect-video bg-pixel-bg border-2 border-pixel-border overflow-hidden group cursor-pointer"
                      onClick={() =>
                        handleOpenLightbox(
                          imageMedias.map((m) => ({ url: m.url || '', caption: m.caption })),
                          0
                        )
                      }
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
                  ) : (
                    /* Fallback Code / Architecture Graphic for Backend Hub */
                    <div className="w-full p-4 bg-pixel-bg border-2 border-pixel-border font-code text-xs flex flex-col gap-2">
                      <div className="flex items-center justify-between text-pixel-text-muted border-b border-pixel-border pb-1">
                        <span>microservices/router.go</span>
                        <span className="text-pixel-primary">GIN + FASTAPI</span>
                      </div>
                      <div className="text-pixel-secondary">
                        r.GET(&quot;/api/v1/events/ws&quot;, handleWebSocketStream)
                      </div>
                      <div className="text-pixel-primary">
                        r.POST(&quot;/api/v1/rag/query&quot;, handleVectorQuery)
                      </div>
                      <div className="text-pixel-text-muted">
                        // Non-blocking goroutine multiplexing &amp; async worker pool
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Details Column */}
                <div
                  className={`flex flex-col justify-between gap-4 ${
                    isFullWidth ? 'lg:col-span-5' : 'lg:col-span-12'
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    {/* Category Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 bg-pixel-surface-dim text-pixel-primary border border-pixel-primary font-code text-[10px] font-bold">
                        {project.category === 'flagship' ? 'COMMERCIAL MOBILE APP' : 'BACKEND & SERVICES'}
                      </span>
                      {project.tech && project.tech[0] && (
                        <span className="px-2 py-0.5 bg-pixel-surface-dim text-pixel-secondary border border-pixel-secondary font-code text-[10px] font-bold">
                          {project.tech[0].name}
                        </span>
                      )}
                    </div>

                    {/* Prominent Project Title */}
                    <h3 className="font-arcade text-sm sm:text-base text-pixel-text leading-relaxed">
                      {project.title}
                    </h3>

                    <p className="font-body text-xs sm:text-sm text-pixel-text/90 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Architecture Highlights */}
                    {project.highlight && (
                      <div className="flex flex-col gap-1.5 mt-1 font-code text-xs text-pixel-text">
                        {project.highlight.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2">
                            <span className="text-pixel-primary font-bold">►</span>
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tech Stack Chips */}
                  {project.tech && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 bg-pixel-surface-dim font-code text-[10px] text-pixel-text border border-pixel-border font-bold"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions & Store Links */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() =>
                          AnalyticsService.trackCtaClick('PROJECT_LIVE_SITE', project.liveUrl)
                        }
                      >
                        <PixelButton variant="primary" size="sm" icon={<ExternalLink size={12} />}>
                          [VISIT SITE]
                        </PixelButton>
                      </a>
                    )}

                    {project.playStoreUrl && (
                      <a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() =>
                          AnalyticsService.trackCtaClick('PLAY_STORE_CLICK', project.playStoreUrl)
                        }
                      >
                        <PixelButton variant="secondary" size="sm" icon={<Smartphone size={12} />}>
                          [PLAY STORE]
                        </PixelButton>
                      </a>
                    )}

                    {project.appStoreUrl && (
                      <a
                        href={project.appStoreUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() =>
                          AnalyticsService.trackCtaClick('APP_STORE_CLICK', project.appStoreUrl)
                        }
                      >
                        <PixelButton variant="secondary" size="sm" icon={<Smartphone size={12} />}>
                          [APP STORE]
                        </PixelButton>
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() =>
                          AnalyticsService.trackCtaClick('PROJECT_GITHUB', project.githubUrl)
                        }
                      >
                        <PixelButton variant="ghost" size="sm" icon={<Github size={12} />}>
                          [CODE REPO]
                        </PixelButton>
                      </a>
                    )}

                    <PixelButton
                      variant="ghost"
                      size="sm"
                      onClick={() => handleProjectClick(project as Projects)}
                    >
                      [SPECS]
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
          subtitle={
            selectedProject.metrics
              ? `${selectedProject.metrics.label}: ${selectedProject.metrics.value}`
              : 'PRODUCTION CASE STUDY'
          }
          maxWidth="2xl"
        >
          <div className="flex flex-col gap-4 font-code text-xs">
            <h3 className="font-arcade text-sm text-pixel-text leading-relaxed">
              {selectedProject.title}
            </h3>

            <p className="font-body text-sm text-pixel-text leading-relaxed">
              {selectedProject.description}
            </p>

            {selectedProject.highlight && (
              <div className="bg-pixel-surface-dim p-4 border border-pixel-border flex flex-col gap-2">
                <span className="text-pixel-primary font-bold uppercase">Engineering Achievements:</span>
                {selectedProject.highlight.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-pixel-primary shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              {selectedProject.liveUrl && (
                <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer">
                  <PixelButton variant="primary" size="sm" icon={<ExternalLink size={12} />}>
                    OPEN LIVE SITE
                  </PixelButton>
                </a>
              )}
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer">
                  <PixelButton variant="secondary" size="sm" icon={<Github size={12} />}>
                    VIEW SOURCE ON GITHUB
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
