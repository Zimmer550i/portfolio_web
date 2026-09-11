import React from 'react';

export interface PixelBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'danger';
  pulse?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const PixelBadge: React.FC<PixelBadgeProps> = ({
  children,
  variant = 'primary',
  pulse = false,
  size = 'sm',
  className = '',
  icon,
}) => {
  const variantStyles = {
    primary:
      'bg-pixel-surface border-pixel-primary text-pixel-primary',
    secondary:
      'bg-pixel-surface border-pixel-secondary text-pixel-secondary',
    accent:
      'bg-pixel-surface border-pixel-accent text-pixel-accent',
    neutral:
      'bg-pixel-surface-dim border-pixel-border text-pixel-text',
    danger:
      'bg-pixel-surface border-pixel-danger text-pixel-danger',
  };

  const dotColors = {
    primary: 'bg-pixel-primary',
    secondary: 'bg-pixel-secondary',
    accent: 'bg-pixel-accent',
    neutral: 'bg-pixel-text-muted',
    danger: 'bg-pixel-danger',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-code',
    md: 'text-[11px] px-2.5 py-1 font-code font-bold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border border-pixel-border font-bold uppercase tracking-wider select-none shadow-pixel-xs ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full opacity-75 ${dotColors[variant]}`}
          ></span>
          <span
            className={`relative inline-flex h-2 w-2 ${dotColors[variant]}`}
          ></span>
        </span>
      )}
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
