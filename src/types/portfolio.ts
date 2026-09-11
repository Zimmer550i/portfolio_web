// Strict TypeScript portfolio and data types translated from sample Dart models

export type ExperienceType = 'fullTime' | 'partTime' | 'internship' | 'freelance' | 'volunteer';

export type LanguageProficiency = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2' | 'native';

export type ProjectStatus = 'planned' | 'ongoing' | 'completed' | 'onHold' | 'cancelled';

export type MediaType = 'image' | 'video' | 'threeD';

export interface Media {
  type?: MediaType;
  assetName?: string;
  url?: string;
  thumbnail?: string;
  caption?: string;
  duration?: string;
  youtubeId?: string;
}

export interface Technology {
  name: string;
  svgAsset?: string;
  category?: 'core' | 'framework' | 'language' | 'database' | 'devops' | 'tools';
}

export interface Company {
  name: string;
  svgAsset?: string;
  url?: string;
  role?: string;
  location?: string;
}

export interface Link {
  name?: string;
  url: string;
  svgAsset?: string;
  icon?: string;
}

export interface Skills {
  technology: Technology;
  learningSince?: string;
  subTech?: Technology[];
  description?: string;
  proficiencyPercentage?: number; // 0-100 for retro progress bars
  levelTag?: 'EXPERT' | 'ARCHITECT' | 'SPECIALIST' | 'ADVANCED' | 'PRODUCTION';
}

export interface Projects {
  id?: string;
  date?: string;
  title: string;
  status?: ProjectStatus;
  description?: string;
  tech?: Technology[];
  highlight?: string[];
  workedFor?: Company;
  skills?: Skills[];
  media?: Media[];
  category?: string;
  metrics?: { label: string; value: string };
  githubUrl?: string;
  liveUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
}

export interface Expereince {
  id?: string;
  type?: ExperienceType;
  company: Company;
  projects?: Projects[];
  description?: string;
  startDate: string;
  endDate?: string;
  skills?: Skills[];
  media?: Media[];
  isRemote?: boolean;
  highlight?: string[];
  roleTitle?: string;
}

export interface Achievements {
  id?: string;
  title?: string;
  description?: string;
  date?: string;
  media?: Media[];
  badge?: string;
  score?: string;
  category?: string;
}

export interface Education {
  instituteName: string;
  degree?: string;
  course?: string;
  dateOfCompletion?: string;
  media?: Media[];
  achievements?: Achievements[];
  skills?: Skills[];
  grade?: string;
}

export interface Language {
  language: string;
  proficiency: LanguageProficiency;
}

export interface StatMetric {
  label: string;
  value: string;
  color?: string;
}

export interface Person {
  name: string;
  roleTitle?: string;
  tagline?: string;
  statusBadge?: string;
  targetFramerate?: string;
  runtimeRenderer?: string;
  imgAsset?: string;
  cvAsset?: string;
  email?: string;
  highlight?: string;
  summery?: string;
  stats?: StatMetric[];
  specs?: {
    primaryDomain: string;
    stateEngine: string;
    nativeBridges: string;
    availability: string;
  };
  skills?: Skills[];
  expereince?: Expereince[];
  projects?: Projects[];
  social?: Link[];
  languages?: Language[];
  education?: Education[];
  achievements?: Achievements[];
}

// System configuration types
export type ThemeMode = 'dark' | 'light';

export interface SectionConfig {
  id: string;
  title: string;
  icon: string;
  enabled: boolean;
  description?: string;
}

export interface AppConfiguration {
  activeTheme: ThemeMode;
  fontPreset: string;
  scanlines: boolean;
  soundEffects: boolean;
  sections: SectionConfig[];
}

