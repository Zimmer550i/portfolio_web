import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { HeroSection } from '../../sections/HeroSection';
import { SkillsSection } from '../../sections/SkillsSection';
import { ExperienceSection } from '../../sections/ExperienceSection';
import { ProjectsSection } from '../../sections/ProjectsSection';
import { EducationSection } from '../../sections/EducationSection';
import { AchievementsSection } from '../../sections/AchievementsSection';
import { TerminalSection } from '../../sections/TerminalSection';
import { ContactSection } from '../../sections/ContactSection';

/**
 * Registry of dynamic section components mapped by ID
 */
const SECTION_REGISTRY: Record<string, React.ComponentType> = {
  hero: HeroSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  education: EducationSection,
  achievements: AchievementsSection,
  terminal: TerminalSection,
  contact: ContactSection,
};

export const SectionRenderer: React.FC = () => {
  const { config } = useTheme();

  const enabledSections = config.sections.filter((s) => s.enabled);

  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      {enabledSections.map((sectionConfig) => {
        const Component = SECTION_REGISTRY[sectionConfig.id];
        if (!Component) {
          console.warn(`Section component not found for ID: ${sectionConfig.id}`);
          return null;
        }
        return <Component key={sectionConfig.id} />;
      })}
    </div>
  );
};
