// types/resume.ts

// Define the category and proficiency types as constants
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
  currentJob?: boolean;
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
  currentlyEnrolled?: boolean;
}

export interface Skill {
  name: string;
  proficiency: ProficiencyLevel;
}

export interface SkillGroup {
  category: SkillCategory;
  skills: Skill[];
}

// Optional sections

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate: string;
  currentProject?: boolean;
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  expiration?: string;
  link?: string;
  credentialId?: string;
}

export interface Language {
  name: string;
  proficiency: "Native" | "Fluent" | "Proficient" | "Intermediate" | "Basic";
}

export interface Interest {
  name: string;
  description?: string;
}

export interface Reference {
  name: string;
  company: string;
  position: string;
  contact: string;
  relationship: string;
}

export interface Publication {
  title: string;
  publisher: string;
  date: string;
  link?: string;
  description?: string;
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Volunteer {
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  currentRole?: boolean;
}

// Resume data with required and optional sections
export interface ResumeData {
  // Required sections
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skillGroups: SkillGroup[];

  // Optional sections
  projects?: Project[];
  certificates?: Certificate[];
  languages?: Language[];
  interests?: Interest[];
  references?: Reference[];
  publications?: Publication[];
  awards?: Award[];
  volunteer?: Volunteer[];
  customSections?: CustomSection[];
}

// For user-defined custom sections
export interface CustomSection {
  title: string;
  items: {
    title: string;
    subtitle?: string;
    description?: string;
    date?: string;
    bullets?: string[];
  }[];
}