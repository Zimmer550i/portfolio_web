import React, { useEffect } from 'react';
import { PixelCard } from './PixelCard';

export interface PixelModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  subtitle?: string;
}

export const PixelModal: React.FC<PixelModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '2xl',
  subtitle,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-[2px]">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`relative z-10 w-full ${maxWidthClasses} animate-in fade-in zoom-in-95 duration-100`}>
        <PixelCard
          title={title}
          subtitle={subtitle}
          elevation="lg"
          headerAction={
            <button
              onClick={onClose}
              className="px-2 py-0.5 bg-pixel-surface text-pixel-danger font-arcade text-[10px] border border-pixel-border hover:bg-pixel-danger hover:text-white transition-colors"
            >
              [X]
            </button>
          }
          controls={false}
          bodyClassName="p-4 sm:p-6 max-h-[85vh] overflow-y-auto"
        >
          {children}
        </PixelCard>
      </div>
    </div>
  );
};

