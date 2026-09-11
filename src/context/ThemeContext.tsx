import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeMode, AppConfiguration } from '../types/portfolio';
import initialConfig from '../data/configuration.json';
import { AnalyticsService } from '../services/analytics';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  scanlines: boolean;
  toggleScanlines: () => void;
  config: AppConfiguration;
  updateSectionEnabled: (sectionId: string, enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AppConfiguration>(initialConfig as AppConfiguration);
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('pixel_theme') as ThemeMode;
    return saved || config.activeTheme || 'dark';
  });
  const [scanlines, setScanlines] = useState<boolean>(() => {
    const saved = localStorage.getItem('pixel_scanlines');
    return saved !== null ? saved === 'true' : config.scanlines;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('pixel_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('pixel_scanlines', String(scanlines));
  }, [scanlines]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemeState(next);
    AnalyticsService.trackThemeChange(next);
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    AnalyticsService.trackThemeChange(newTheme);
  };

  const toggleScanlines = () => {
    setScanlines((prev) => !prev);
  };

  const updateSectionEnabled = (sectionId: string, enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.id === sectionId ? { ...sec, enabled } : sec
      ),
    }));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        scanlines,
        toggleScanlines,
        config,
        updateSectionEnabled,
      }}
    >
      <div className={scanlines ? 'crt-scanlines min-h-screen' : 'min-h-screen'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

