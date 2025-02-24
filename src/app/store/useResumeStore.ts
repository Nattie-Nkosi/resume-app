// store/useResumeStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ResumeData } from '@/types/resume'

interface ResumeStore {
  resumeData: ResumeData
  updatePersonalInfo: (personalInfo: ResumeData['personalInfo']) => void
  updateExperiences: (experiences: ResumeData['experiences']) => void
  updateEducation: (education: ResumeData['education']) => void
  updateSkills: (skillGroups: ResumeData['skillGroups']) => void
  resetStore: () => void
}

const initialState: ResumeData = {
  personalInfo: {
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
    category: 'Technical',
    skills: [{ name: '', proficiency: 'Intermediate' }]
  }]
}
export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: initialState,
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
      resetStore: () => set({ resumeData: initialState })
    }),
    {
      name: 'resume-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)