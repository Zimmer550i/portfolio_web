import { logEvent } from 'firebase/analytics';
import { analytics } from '../config/firebase';

/**
 * Safe wrapper around Firebase logEvent with dev-mode logging
 */
function safeLog(eventName: string, params?: Record<string, any>) {
  if (analytics) {
    try {
      logEvent(analytics, eventName, params);
    } catch (err) {
      console.debug(`[Analytics error] ${eventName}:`, err);
    }
  }
  // Also log to console in development for instant feedback
  if (import.meta.env.DEV) {
    console.log(`📊 [Analytics Event] ${eventName}:`, params);
  }
}

export const AnalyticsService = {
  /**
   * Tracks full page view
   */
  trackPageView(pageTitle: string, path: string = window.location.pathname) {
    safeLog('page_view', {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: path,
    });
  },

  /**
   * Tracks when a section comes into user viewport
   */
  trackSectionView(sectionId: string) {
    safeLog('section_view', {
      section_id: sectionId,
      timestamp: Date.now(),
    });
  },

  /**
   * Tracks time spent (in seconds) on a specific screen section
   */
  trackSectionDwellTime(sectionId: string, durationSeconds: number) {
    if (durationSeconds < 1) return;
    safeLog('section_dwell_time', {
      section_id: sectionId,
      duration_seconds: Math.round(durationSeconds),
    });
  },

  /**
   * Tracks user clicking on a project card
   */
  trackProjectClick(projectId: string, projectTitle: string, category?: string) {
    safeLog('project_click', {
      project_id: projectId,
      project_title: projectTitle,
      category: category || 'general',
    });
  },

  /**
   * Tracks opening of project details modal
   */
  trackProjectModalOpen(projectId: string, projectTitle: string) {
    safeLog('project_modal_open', {
      project_id: projectId,
      project_title: projectTitle,
    });
  },

  /**
   * Tracks media interactions (YouTube playback, lightbox zoom, 3D GLB turntable)
   */
  trackMediaInteraction(
    mediaType: 'image' | 'video' | 'threeD',
    title: string,
    action: 'open' | 'play' | 'zoom' | 'rotate' | 'external_link',
    meta?: Record<string, any>
  ) {
    safeLog('media_interaction', {
      media_type: mediaType,
      media_title: title,
      action,
      ...meta,
    });
  },

  /**
   * Tracks toggling between Dark Mode and Light Mode
   */
  trackThemeChange(theme: 'dark' | 'light') {
    safeLog('theme_change', {
      theme,
      timestamp: Date.now(),
    });
  },

  /**
   * Tracks primary CTAs like [HIRE ME], Resume download, or social links
   */
  trackCtaClick(label: string, url?: string) {
    safeLog('cta_click', {
      cta_label: label,
      destination_url: url || '',
    });
  },

  /**
   * Tracks devtools console commands typed by user
   */
  trackTerminalCommand(command: string) {
    safeLog('terminal_command', {
      command,
    });
  },
};
