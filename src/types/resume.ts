export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
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

export interface Skill {
  name: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skillGroups: SkillGroup[];
}