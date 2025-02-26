// store/useResumeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  ResumeData,
  PersonalInfo,
  Experience,
  Education,
  SkillGroup,
  Project,
  Certificate,
  Achievement,
  SkillCategory
} from '@/types/resume'

interface ResumeStore {
  resumeData: ResumeData;
  activeSections: string[];
  updatePersonalInfo: (personalInfo: ResumeData['personalInfo']) => void;
  updateExperiences: (experiences: ResumeData['experiences']) => void;
  updateEducation: (education: ResumeData['education']) => void;
  updateSkills: (skillGroups: ResumeData['skillGroups']) => void;
  updateProjects: (projects: ResumeData['projects']) => void;
  updateCertificates: (certificates: ResumeData['certificates']) => void;
  updateAchievements: (achievements: ResumeData['achievements']) => void;
  resetStore: () => void;
  toggleSection: (section: string, active: boolean) => void;
}
const initialState: ResumeData = {
  personalInfo: {
    title: '',
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  experiences: [{
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  }],
  education: [{
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    gpa: '',
    achievements: ''
  }],
  skillGroups: [{
    category: "Technical" as SkillCategory,
    skills: [{ name: '', proficiency: "Intermediate" }]
  }],
  projects: [{
    title: '',
    description: '',
    technologies: [],
    startDate: '',
    endDate: '',
  }],
  certificates: [{
    name: '',
    issuer: '',
    date: '',
    expiration: '',
    credentialId: '',
    link: ''
  }],
  achievements: [{
    title: '',
    organization: '',
    date: '',
    description: ''
  }]
}

// Default active sections
const defaultActiveSections = [
  'personalInfo',
  'experiences',
  'education',
  'skills',
];

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: initialState,
      activeSections: defaultActiveSections,

      updatePersonalInfo: (personalInfo) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo
          }
        })),

      updateExperiences: (experiences) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experiences
          }
        })),

      updateEducation: (education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education
          }
        })),

      updateSkills: (skillGroups) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skillGroups
          }
        })),

      updateProjects: (projects) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects
          },
          // Only add to active sections if not already there
          activeSections: state.activeSections.includes('projects')
            ? state.activeSections
            : [...state.activeSections, 'projects']
        })),

      updateCertificates: (certificates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certificates
          },
          // Only add to active sections if not already there
          activeSections: state.activeSections.includes('certificates')
            ? state.activeSections
            : [...state.activeSections, 'certificates']
        })),

      updateAchievements: (achievements) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            achievements
          },
          // Only add to active sections if not already there
          activeSections: state.activeSections.includes('achievements')
            ? state.activeSections
            : [...state.activeSections, 'achievements']
        })),

      toggleSection: (section, active) =>
        set((state) => {
          if (active && !state.activeSections.includes(section)) {
            // Add section to active sections
            return {
              activeSections: [...state.activeSections, section]
            };
          } else if (!active && state.activeSections.includes(section)) {
            // Remove section from active sections if it's not a required section
            if (defaultActiveSections.includes(section)) {
              return state; // Don't remove required sections
            }
            return {
              activeSections: state.activeSections.filter(s => s !== section)
            };
          }
          return state; // No change needed
        }),

      resetStore: () => set({
        resumeData: initialState,
        activeSections: defaultActiveSections
      })
    }),
    {
      name: 'resume-storage',
      storage: {
        getItem: (name) => {
          try {
            const value = localStorage.getItem(name);
            return value ? JSON.parse(value) : null;
          } catch (error) {
            console.error('Error accessing localStorage:', error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error('Error writing to localStorage:', error);
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch (error) {
            console.error('Error removing from localStorage:', error);
          }
        }
      }
    }
  )
)