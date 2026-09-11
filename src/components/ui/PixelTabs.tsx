import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface PixelTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const PixelTabs: React.FC<PixelTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`font-arcade text-[9px] px-3 py-1.5 border-2 border-pixel-border pixel-press transition-all select-none ${
              isActive
                ? 'bg-pixel-primary text-pixel-primary-contrast shadow-pixel-sm'
                : 'bg-pixel-surface-dim text-pixel-text hover:bg-pixel-surface-bright shadow-pixel-xs'
            }`}
          >
            <span>[{tab.label}]</span>
            {tab.count !== undefined && (
              <span className="ml-1.5 opacity-80">({tab.count})</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

