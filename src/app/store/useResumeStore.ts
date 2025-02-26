// store/useResumeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  ResumeData,
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
  resetStore: () => void;
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
  }]
}

// Default active sections
const defaultActiveSections = ['personalInfo', 'experiences', 'education', 'skills', 'projects'];

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
          }
        })),

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