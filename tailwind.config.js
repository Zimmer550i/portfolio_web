/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pixel: {
          bg: 'var(--pixel-bg)',
          surface: 'var(--pixel-surface)',
          'surface-dim': 'var(--pixel-surface-dim)',
          'surface-bright': 'var(--pixel-surface-bright)',
          border: 'var(--pixel-border)',
          text: 'var(--pixel-text)',
          'text-muted': 'var(--pixel-text-muted)',
          primary: 'var(--pixel-primary)',
          'primary-hover': 'var(--pixel-primary-hover)',
          'primary-contrast': 'var(--pixel-primary-contrast)',
          secondary: 'var(--pixel-secondary)',
          accent: 'var(--pixel-accent)',
          danger: 'var(--pixel-danger)',
          shadow: 'var(--pixel-shadow)',
        },
      },
      fontFamily: {
        arcade: ["'Press Start 2P'", "monospace"],
        terminal: ["'VT323'", "monospace"],
        heading: ["'Space Grotesk'", "sans-serif"],
        body: ["'Space Mono'", "monospace"],
        code: ["'Space Mono'", "monospace"],
      },
      boxShadow: {
        'pixel-xs': '1px 1px 0px var(--pixel-shadow)',
        'pixel-sm': '2px 2px 0px var(--pixel-shadow)',
        'pixel-md': '4px 4px 0px var(--pixel-shadow)',
        'pixel-lg': '6px 6px 0px var(--pixel-shadow)',
        'pixel-xl': '8px 8px 0px var(--pixel-shadow)',
      },
      borderRadius: {
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        full: '0px',
      },
    },
  },
  plugins: [],
};

