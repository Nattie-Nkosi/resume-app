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
  Language,
  Interest,
  Reference,
  Publication,
  Award,
  Volunteer,
  CustomSection,
  SkillCategory
} from '@/types/resume'

interface ResumeStore {
  resumeData: ResumeData;
  activeSections: string[];
  updatePersonalInfo: (personalInfo: ResumeData['personalInfo']) => void;
  updateExperiences: (experiences: ResumeData['experiences']) => void;
  updateEducation: (education: ResumeData['education']) => void;
  updateSkills: (skillGroups: ResumeData['skillGroups']) => void;

  // Methods for optional sections
  updateProjects: (projects: ResumeData['projects']) => void;
  updateCertificates: (certificates: ResumeData['certificates']) => void;
  updateLanguages: (languages: ResumeData['languages']) => void;
  updateInterests: (interests: ResumeData['interests']) => void;
  updateReferences: (references: ResumeData['references']) => void;
  updatePublications: (publications: ResumeData['publications']) => void;
  updateAwards: (awards: ResumeData['awards']) => void;
  updateVolunteer: (volunteer: ResumeData['volunteer']) => void;
  updateCustomSections: (customSections: ResumeData['customSections']) => void;

  // Methods to add/remove sections
  addSection: (sectionName: string) => void;
  removeSection: (sectionName: string) => void;

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

// Default active sections (required sections)
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

      // Optional section update methods
      updateProjects: (projects) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects
          }
        })),

      updateCertificates: (certificates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certificates
          }
        })),

      updateLanguages: (languages) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            languages
          }
        })),

      updateInterests: (interests) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            interests
          }
        })),

      updateReferences: (references) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            references
          }
        })),

      updatePublications: (publications) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            publications
          }
        })),

      updateAwards: (awards) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            awards
          }
        })),

      updateVolunteer: (volunteer) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            volunteer
          }
        })),

      updateCustomSections: (customSections) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            customSections
          }
        })),

      // Section management
      addSection: (sectionName) =>
        set((state) => {
          // Initialize the section with default data if it doesn't exist
          const newResumeData = { ...state.resumeData };

          switch (sectionName) {
            case 'projects':
              if (!newResumeData.projects) {
                newResumeData.projects = [{
                  title: '',
                  description: '',
                  technologies: [],
                  startDate: '',
                  endDate: '',
                }];
              }
              break;
            case 'certificates':
              if (!newResumeData.certificates) {
                newResumeData.certificates = [{
                  name: '',
                  issuer: '',
                  date: '',
                }];
              }
              break;
            case 'languages':
              if (!newResumeData.languages) {
                newResumeData.languages = [{
                  name: '',
                  proficiency: 'Intermediate',
                }];
              }
              break;
            case 'interests':
              if (!newResumeData.interests) {
                newResumeData.interests = [{
                  name: '',
                }];
              }
              break;
            case 'references':
              if (!newResumeData.references) {
                newResumeData.references = [{
                  name: '',
                  company: '',
                  position: '',
                  contact: '',
                  relationship: '',
                }];
              }
              break;
            case 'publications':
              if (!newResumeData.publications) {
                newResumeData.publications = [{
                  title: '',
                  publisher: '',
                  date: '',
                }];
              }
              break;
            case 'awards':
              if (!newResumeData.awards) {
                newResumeData.awards = [{
                  title: '',
                  issuer: '',
                  date: '',
                }];
              }
              break;
            case 'volunteer':
              if (!newResumeData.volunteer) {
                newResumeData.volunteer = [{
                  organization: '',
                  role: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                }];
              }
              break;
            case 'customSections':
              if (!newResumeData.customSections) {
                newResumeData.customSections = [{
                  title: 'Custom Section',
                  items: [{
                    title: '',
                    subtitle: '',
                    description: '',
                  }],
                }];
              }
              break;
          }

          return {
            resumeData: newResumeData,
            activeSections: [...state.activeSections, sectionName]
          };
        }),

      removeSection: (sectionName) =>
        set((state) => {
          // Don't remove required sections
          if (defaultActiveSections.includes(sectionName)) {
            return state;
          }

          // Remove the section from active sections
          const newActiveSections = state.activeSections.filter(
            section => section !== sectionName
          );

          // Keep the data in the store but don't display it
          return {
            activeSections: newActiveSections
          };
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
            // Notify user about storage issues
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