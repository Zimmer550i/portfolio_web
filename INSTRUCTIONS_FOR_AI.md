# INSTRUCTIONS FOR AI AGENTS & DEVELOPERS

## 1. Project Overview & Architecture
This project is a high-performance, modular, retro-pixelated portfolio website for **Md. Wasiul Islam** (Staff Flutter Engineer & Architect), inspired by the **"Pixel Flutter Developer Portfolio" / "BitShift Arcade Studio"** design system.

### Core Technology Stack
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS with custom pixel design tokens (stepped unblurred box shadows, 0px border-radius, tactile click actuation).
- **Fonts**:
  - Arcade Titles: `'Press Start 2P'`
  - Retro Monospace/Terminal: `'VT323'`
  - High-impact Headings: `'Space Grotesk'`
  - Monospace Body & Code: `'Space Mono'`
- **Telemetry**: Firebase Web SDK v11 (`firebase/analytics`) configured with measurement ID `G-ZXFYJ2SET8`.
- **3D Engine**: WebGL via `<model-viewer>` for GLB turntable rendering.
- **Hosting**: Firebase Hosting (configured in `firebase.json` pointing to `dist/`).

---

## 2. Directory Structure
```
portfolio_web/
├── index.html                 # Main entry HTML with Google Fonts & model-viewer
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript compiler configuration
├── vite.config.ts             # Vite configuration with sourcemaps & build outDir: dist
├── tailwind.config.js         # Custom pixel colors, fonts, and stepped shadows
├── firebase.json              # Firebase hosting rewrites and targets
├── INSTRUCTIONS_FOR_AI.md     # This instruction guide for AI and developers
├── src/
│   ├── main.tsx               # App root mounting
│   ├── App.tsx                # Dynamic section loader & view switch
│   ├── vite-env.d.ts          # Custom JSX types (including <model-viewer>)
│   ├── config/
│   │   └── firebase.ts        # Firebase app & Analytics initialization
│   ├── services/
│   │   └── analytics.ts       # Typed telemetry logging service
│   ├── types/
│   │   └── portfolio.ts       # Strict TypeScript definitions for data & configs
│   ├── data/
│   │   ├── user_data.json     # All personal info, skills, experience, projects, media
│   │   └── configuration.json # Theming, scanline toggle, and dynamic sections list
│   ├── styles/
│   │   └── pixel-theme.css    # CSS variables, retro scanlines, CRT flicker, pixel buttons
│   ├── context/
│   │   └── ThemeContext.tsx   # React context for theme (dark/light), scanlines, fonts
│   ├── components/
│   │   ├── ui/                # Reusable pixel primitives (Button, Card, Badge, Modal, Tabs)
│   │   ├── media/             # PixelImageViewer, PixelVideoPlayer, PixelGlbViewer
│   │   ├── terminal/          # PixelTerminal (interactive REPL dev console)
│   │   └── layout/            # Navbar, Telemetry Dev Bar, SectionRenderer
│   ├── sections/              # Modular section components (Hero, Skills, Projects, etc.)
│   └── pages/
│       └── DesignSystemShowcase.tsx # Component sandbox & visual token tester
```

---

## 3. How to Modify Portfolio Content
All content is strictly separated from presentation logic:
- **Personal Details, Experience, Projects**: Edit `src/data/user_data.json`.
- **Schema & Types**: Refer to `src/types/portfolio.ts`.
- **Adding Media to a Project**:
  - Image: `{ "type": "image", "url": "https://...", "thumbnail": "https://...", "caption": "..." }`
  - YouTube Video: `{ "type": "video", "url": "https://youtube.com/watch?v=...", "youtubeId": "...", "duration": "14:20" }`
  - 3D Model: `{ "type": "threeD", "url": "https://...model.glb", "caption": "..." }`

---

## 4. How to Add, Remove, or Reorder Sections
Sections are **100% dynamic** and driven by `src/data/configuration.json`:
1. In `configuration.json`, modify the `sections` array:
   ```json
   {
     "id": "new_section",
     "title": "NEW SECTION",
     "icon": "Sparkles",
     "enabled": true
   }
   ```
2. Create the section component in `src/sections/NewSection.tsx`.
3. Register the component in `src/components/layout/SectionRenderer.tsx`.
4. The navigation bar and page layout will **automatically** adapt with smooth navigation and scroll tracking.

---

## 5. Theming & Visual Guidelines
- **Strict Sharp Geometry**: Never use rounded corners (`rounded-none`, `borderRadius: 0`).
- **Stepped Shadows**: Use `shadow-pixel-sm` (`2px 2px 0px`), `shadow-pixel-md` (`4px 4px 0px`), or `shadow-pixel-lg` (`6px 6px 0px`).
- **Tactile Click Feedback**: Interactive elements must include class `.pixel-press` (`:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0px }`).
- **Palette Control**:
  - **Dark Mode**: CRT Phosphor Emerald (`#4EFA96`), Flutter Cyan (`#54C5F8`), Amber (`#FFD79A`), Deep Olive Canvas (`#0b1610`).
  - **Light Mode**: Warm Parchment (`#FAF6E9`), Cream Panel (`#FFFDF7`), Flutter Engine Blue (`#0175C2`), Emerald (`#1A7E48`).
  - Colors are controlled via CSS variables in `src/styles/pixel-theme.css` and can be edited anytime.

---

## 6. Firebase Analytics Conventions
Always log meaningful user interactions via `AnalyticsService` in `src/services/analytics.ts`:
- Page / section impressions (`trackSectionView`, `trackSectionDwellTime`).
- Project exploration (`trackProjectClick`, `trackProjectModalOpen`).
- Media consumption (`trackMediaInteraction`).
- Mode toggles (`trackThemeChange`).
- Contact and resume CTAs (`trackCtaClick`).

---

## 7. Build & Deployment Commands
- Run dev server: `npm run dev`
- Build for production: `npm run build`
- Deploy to Firebase Hosting: `firebase deploy --only hosting`

