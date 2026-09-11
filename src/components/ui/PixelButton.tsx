import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'amber';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'font-arcade uppercase tracking-wider inline-flex items-center justify-center gap-2 border-2 border-pixel-border pixel-press transition-colors cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-[9px] px-2.5 py-1.5 shadow-pixel-xs',
    md: 'text-[10px] px-4 py-2 shadow-pixel-sm',
    lg: 'text-[11px] px-5 py-3 shadow-pixel-md',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-pixel-primary text-pixel-primary-contrast hover:bg-pixel-primary-hover shadow-pixel-sm',
    secondary:
      'bg-pixel-surface-dim text-pixel-text hover:bg-pixel-surface-bright shadow-pixel-sm',
    ghost:
      'bg-transparent text-pixel-text hover:bg-pixel-surface-dim border-pixel-border shadow-pixel-xs',
    danger:
      'bg-pixel-danger text-white hover:opacity-90 shadow-pixel-sm',
    amber:
      'bg-pixel-accent text-pixel-ink hover:opacity-95 shadow-pixel-sm',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
