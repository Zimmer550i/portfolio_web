import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

export const firebaseConfig = {
  apiKey: "AIzaSyDvHvf2rtZMoCMCgwpM1Okb8IRpxwLw2GM",
  appId: "1:814751435164:web:eddb28a56f73389267e059",
  messagingSenderId: "814751435164",
  projectId: "portfolio-cddfa",
  authDomain: "portfolio-cddfa.firebaseapp.com",
  storageBucket: "portfolio-cddfa.firebasestorage.app",
  measurementId: "G-ZXFYJ2SET8",
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export let analytics: Analytics | null = null;

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log('⚡ [Firebase Analytics] Initialized successfully with measurement ID:', firebaseConfig.measurementId);
    }
  }).catch((err) => {
    console.warn('⚡ [Firebase Analytics] Not available in this context:', err);
  });
}
