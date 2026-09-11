import React from 'react';

export interface PixelCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  elevation?: 'sm' | 'md' | 'lg';
  className?: string;
  bodyClassName?: string;
  icon?: React.ReactNode;
  headerAction?: React.ReactNode;
  statusBadge?: string;
  controls?: boolean;
}

export const PixelCard: React.FC<PixelCardProps> = ({
  children,
  title,
  subtitle,
  elevation = 'md',
  className = '',
  bodyClassName = 'p-5',
  icon,
  headerAction,
  statusBadge,
  controls = true,
}) => {
  const shadowClass = {
    sm: 'shadow-pixel-sm',
    md: 'shadow-pixel-md',
    lg: 'shadow-pixel-lg',
  }[elevation];

  return (
    <div
      className={`bg-pixel-surface border-2 border-pixel-border ${shadowClass} flex flex-col ${className}`}
    >
      {/* Optional Retro Title Bar */}
      {title && (
        <div className="bg-pixel-surface-bright px-3.5 py-1.5 border-b-2 border-pixel-border flex items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-2 font-arcade text-[10px] text-pixel-text truncate">
            {icon && <span className="inline-flex shrink-0">{icon}</span>}
            <span className="truncate">{title}</span>
            {subtitle && (
              <span className="text-pixel-text-muted font-code text-[11px] hidden sm:inline">
                // {subtitle}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {statusBadge && (
              <span className="font-code text-[10px] font-bold text-pixel-primary hidden md:inline">
                {statusBadge}
              </span>
            )}
            {headerAction}
            {controls && (
              <div className="flex items-center gap-1 font-terminal text-[14px] text-pixel-text-muted">
                <button
                  type="button"
                  aria-label="Minimize"
                  className="px-1 hover:text-pixel-primary"
                >
                  _
                </button>
                <button
                  type="button"
                  aria-label="Maximize"
                  className="px-1 hover:text-pixel-secondary"
                >
                  □
                </button>
                <button
                  type="button"
                  aria-label="Close"
                  className="px-1 hover:text-pixel-danger"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Card Content */}
      <div className={`flex-1 ${bodyClassName}`}>{children}</div>
    </div>
  );
};

