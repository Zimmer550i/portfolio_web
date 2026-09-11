import React, { useState } from 'react';
import { Rotate3d, Play, Pause } from 'lucide-react';
import { AnalyticsService } from '../../services/analytics';
import { PixelButton } from '../ui/PixelButton';

export interface PixelGlbViewerProps {
  title: string;
  src?: string;
  poster?: string;
  className?: string;
  height?: string;
}

export const PixelGlbViewer: React.FC<PixelGlbViewerProps> = ({
  title,
  src = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
  poster,
  className = '',
  height = '360px',
}) => {
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
    AnalyticsService.trackMediaInteraction('threeD', title, 'rotate', { autoRotate: !autoRotate });
  };

  return (
    <div
      className={`bg-pixel-surface border-2 border-pixel-border shadow-pixel-md flex flex-col ${className}`}
    >
      {/* 3D Turntable Title Bar */}
      <div className="bg-pixel-surface-bright px-3.5 py-1.5 border-b-2 border-pixel-border flex items-center justify-between text-[10px] font-arcade select-none">
        <div className="flex items-center gap-2 text-pixel-secondary truncate">
          <Rotate3d size={14} />
          <span className="truncate">{title}</span>
        </div>
        <span className="font-code text-[10px] text-pixel-primary">
          [ 3D GLB TURNTABLE ]
        </span>
      </div>

      {/* 3D Canvas Viewport */}
      <div
        className="relative w-full bg-[#06100b] flex items-center justify-center border-b-2 border-pixel-border overflow-hidden"
        style={{ height }}
      >
        <model-viewer
          src={src}
          poster={poster}
          alt={title}
          auto-rotate={autoRotate ? '' : undefined}
          camera-controls=""
          shadow_intensity="1"
          exposure="1"
          style={{ width: '100%', height: '100%', backgroundColor: '#0b1610' }}
        />

        {/* Ambient Grid / Pedestal Markings */}
        <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 border border-pixel-border font-code text-[10px] text-pixel-text-muted select-none pointer-events-none">
          DRAG TO ROTATE • SCROLL TO ZOOM
        </div>
      </div>

      {/* Control Buttons Bar */}
      <div className="p-3 bg-pixel-surface-dim flex items-center justify-between gap-3 font-code text-xs">
        <div className="flex items-center gap-2 text-pixel-text">
          <span className="w-2 h-2 bg-pixel-primary inline-block" />
          <span className="font-bold">ENGINE:</span>
          <span>WebGL PBR SHADERS</span>
        </div>

        <PixelButton
          variant="secondary"
          size="sm"
          onClick={toggleAutoRotate}
          icon={autoRotate ? <Pause size={12} /> : <Play size={12} />}
        >
          {autoRotate ? 'PAUSE ROTATE' : 'AUTO ROTATE'}
        </PixelButton>
      </div>
    </div>
  );
};
