import React, { useState } from 'react';
import { PixelModal } from '../ui/PixelModal';
import { PixelButton } from '../ui/PixelButton';
import { ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnalyticsService } from '../../services/analytics';

export interface ImageItem {
  url: string;
  thumbnail?: string;
  caption?: string;
  alt?: string;
}

export interface PixelImageViewerProps {
  images: ImageItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (newIndex: number) => void;
}

export const PixelImageViewer: React.FC<PixelImageViewerProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const currentImage = images[currentIndex];

  if (!currentImage) return null;

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % images.length;
    onIndexChange?.(nextIdx);
    setZoomLevel(1);
    AnalyticsService.trackMediaInteraction('image', images[nextIdx]?.caption || 'gallery_image', 'open');
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    onIndexChange?.(prevIdx);
    setZoomLevel(1);
    AnalyticsService.trackMediaInteraction('image', images[prevIdx]?.caption || 'gallery_image', 'open');
  };

  const handleZoomIn = () => {
    setZoomLevel((z) => Math.min(z + 0.25, 2.5));
    AnalyticsService.trackMediaInteraction('image', currentImage.caption || 'image', 'zoom', { zoom: zoomLevel + 0.25 });
  };

  const handleZoomOut = () => {
    setZoomLevel((z) => Math.max(z - 0.25, 0.75));
    AnalyticsService.trackMediaInteraction('image', currentImage.caption || 'image', 'zoom', { zoom: zoomLevel - 0.25 });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <PixelModal
      isOpen={isOpen}
      onClose={onClose}
      title="PIXEL_IMAGE_INSPECTOR // HD VIEW"
      subtitle={`IMAGE [${currentIndex + 1}/${images.length}]`}
      maxWidth="4xl"
    >
      <div className="flex flex-col gap-4">
        {/* Viewer Viewport */}
        <div className="relative w-full aspect-video bg-black/90 border-2 border-pixel-border overflow-hidden flex items-center justify-center p-2 select-none">
          <img
            src={currentImage.url}
            alt={currentImage.alt || currentImage.caption || 'Portfolio Image Preview'}
            className="max-w-full max-h-full object-contain transition-transform duration-150"
            style={{
              transform: `scale(${zoomLevel})`,
              imageRendering: 'auto',
            }}
          />

          {/* Stepped Corner Badges */}
          <div className="absolute top-2 left-2 bg-pixel-surface/90 px-2 py-0.5 border border-pixel-border font-code text-[10px] text-pixel-primary">
            ZOOM: {Math.round(zoomLevel * 100)}%
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous Image"
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-pixel-surface border-2 border-pixel-border text-pixel-text hover:bg-pixel-primary hover:text-pixel-primary-contrast pixel-press transition-colors shadow-pixel-xs"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Image"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-pixel-surface border-2 border-pixel-border text-pixel-text hover:bg-pixel-primary hover:text-pixel-primary-contrast pixel-press transition-colors shadow-pixel-xs"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Caption & Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-pixel-surface-dim p-3 border-2 border-pixel-border">
          <div className="font-code text-xs text-pixel-text font-bold truncate max-w-md">
            {currentImage.caption || 'Viewport Screenshot'}
          </div>

          <div className="flex items-center gap-2">
            <PixelButton
              variant="secondary"
              size="sm"
              onClick={handleZoomIn}
              icon={<ZoomIn size={14} />}
            >
              ZOOM +
            </PixelButton>
            <PixelButton
              variant="secondary"
              size="sm"
              onClick={handleZoomOut}
              icon={<ZoomOut size={14} />}
            >
              ZOOM -
            </PixelButton>
            <PixelButton
              variant="ghost"
              size="sm"
              onClick={handleResetZoom}
              icon={<RotateCcw size={14} />}
            >
              RESET
            </PixelButton>
          </div>
        </div>
      </div>
    </PixelModal>
  );
};
