export interface PersonalInfo {
  title: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  additionalLink?: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string;
}

export const skillCategories = [
  "Technical",
  "Soft Skills",
  "Languages",
  "Tools",
  "Frameworks",
  "Other"
] as const;

export const proficiencyLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert"
] as const;

// Use these constant types for your Resume types
export type SkillCategory = typeof skillCategories[number];
export type ProficiencyLevel = typeof proficiencyLevels[number];

export interface Skill {
  name: string;
  proficiency: ProficiencyLevel;
}

export interface SkillGroup {
  category: SkillCategory;
  skills: Skill[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skillGroups: SkillGroup[];
}