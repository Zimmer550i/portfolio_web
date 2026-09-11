import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { AnalyticsService } from '../../services/analytics';
import { PixelButton } from '../ui/PixelButton';

export interface PixelVideoPlayerProps {
  title: string;
  url?: string;
  youtubeId?: string;
  thumbnail?: string;
  duration?: string;
  targetFramerate?: string;
  className?: string;
}

/**
 * Extracts YouTube video ID from various link formats
 */
function extractYoutubeId(urlOrId?: string): string | null {
  if (!urlOrId) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) return urlOrId;
  const match = urlOrId.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export const PixelVideoPlayer: React.FC<PixelVideoPlayerProps> = ({
  title,
  url,
  youtubeId,
  thumbnail,
  duration = '10:00',
  targetFramerate = '60 FPS JITTER-FREE',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const id = youtubeId || extractYoutubeId(url);

  const handlePlay = () => {
    setIsPlaying(true);
    AnalyticsService.trackMediaInteraction('video', title, 'play', { youtubeId: id });
  };

  const directUrl = url || (id ? `https://www.youtube.com/watch?v=${id}` : undefined);

  return (
    <div
      className={`bg-pixel-surface border-2 border-pixel-border shadow-pixel-md flex flex-col ${className}`}
    >
      {/* Retro Arcade Monitor Title Bar */}
      <div className="bg-pixel-surface-bright px-3.5 py-1.5 border-b-2 border-pixel-border flex items-center justify-between text-[10px] font-arcade select-none">
        <div className="flex items-center gap-2 text-pixel-primary truncate">
          <span className="w-2 h-2 bg-pixel-primary inline-block animate-pulse" />
          <span className="truncate">{title}</span>
        </div>
        <span className="font-code text-[10px] text-pixel-secondary hidden sm:inline">
          {targetFramerate}
        </span>
      </div>

      {/* Screen Frame */}
      <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center border-b-2 border-pixel-border">
        {isPlaying && id ? (
          <iframe
            className="w-full h-full border-none"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* Thumbnail Poster */}
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover opacity-85"
              />
            ) : (
              <div className="w-full h-full bg-[#0b1610] flex items-center justify-center">
                <span className="font-arcade text-xs text-pixel-primary">
                  [ CRT VIDEO FEED ]
                </span>
              </div>
            )}

            {/* CRT Scanline Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_3px)] opacity-80" />

            {/* Top Badges */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/85 px-2 py-0.5 text-white font-code text-[10px] border border-pixel-primary">
              <span className="w-2 h-2 bg-pixel-primary inline-block animate-ping" />
              <span>WASM COMPILED // 60FPS</span>
            </div>

            {duration && (
              <div className="absolute top-2.5 right-2.5 bg-black/85 px-2 py-0.5 text-pixel-accent font-code text-[10px] border border-pixel-border">
                {duration}
              </div>
            )}

            {/* Play Button */}
            <button
              onClick={handlePlay}
              aria-label="Play Video"
              className="relative z-10 w-16 h-12 bg-pixel-primary hover:bg-pixel-primary-hover text-pixel-primary-contrast flex items-center justify-center border-2 border-pixel-border shadow-pixel-sm pixel-press transition-transform"
            >
              <Play size={24} fill="currentColor" />
            </button>
          </>
        )}
      </div>

      {/* Retro Telemetry Bar & Action Link */}
      <div className="p-3 bg-pixel-surface-dim flex flex-wrap items-center justify-between gap-2 font-code text-[11px]">
        <div className="flex items-center gap-2 text-pixel-text-muted">
          <span className="text-pixel-primary font-bold">LIVE TELEMETRY:</span>
          <span>IMPELLER 0 DROPPED FRAMES</span>
        </div>

        {directUrl && (
          <a
            href={directUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              AnalyticsService.trackMediaInteraction('video', title, 'external_link', { url: directUrl })
            }
          >
            <PixelButton
              variant="secondary"
              size="sm"
              icon={<ExternalLink size={12} />}
            >
              WATCH ON YOUTUBE
            </PixelButton>
          </a>
        )}
      </div>
    </div>
  );
};

