// src/app/store/useCoverLetterStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CoverLetter, defaultCoverLetter } from '@/types/coverletter'

interface CoverLetterStore {
  coverLetter: CoverLetter;
  savedCoverLetters: { id: string; name: string; data: CoverLetter }[];
  updateCoverLetter: (data: Partial<CoverLetter>) => void;
  resetCoverLetter: () => void;
  saveCoverLetter: (name: string) => void;
  deleteSavedCoverLetter: (id: string) => void;
  loadSavedCoverLetter: (id: string) => void;
}

// Create a custom storage implementation that checks for window/localStorage
const createCustomStorage = () => {
  // Check if we're in a browser environment
  const isClient = typeof window !== 'undefined'

  return {
    getItem: (name: string) => {
      if (!isClient) return null
      try {
        const value = localStorage.getItem(name)
        return value ? JSON.parse(value) : null
      } catch (error) {
        console.error('Error accessing localStorage:', error)
        return null
      }
    },
    setItem: (name: string, value: unknown) => {
      if (!isClient) return
      try {
        localStorage.setItem(name, JSON.stringify(value))
      } catch (error) {
        console.error('Error writing to localStorage:', error)
      }
    },
    removeItem: (name: string) => {
      if (!isClient) return
      try {
        localStorage.removeItem(name)
      } catch (error) {
        console.error('Error removing from localStorage:', error)
      }
    }
  }
}

export const useCoverLetterStore = create<CoverLetterStore>()(
  persist(
    (set, get) => ({
      coverLetter: { ...defaultCoverLetter },
      savedCoverLetters: [],

      updateCoverLetter: (data) =>
        set((state) => ({
          coverLetter: { ...state.coverLetter, ...data }
        })),

      resetCoverLetter: () =>
        set(() => ({
          coverLetter: { ...defaultCoverLetter }
        })),

      saveCoverLetter: (name) => {
        const id = Date.now().toString();
        const currentCoverLetter = get().coverLetter;

        set((state) => ({
          savedCoverLetters: [
            ...state.savedCoverLetters,
            {
              id,
              name,
              data: { ...currentCoverLetter, lastModified: new Date() }
            }
          ]
        }));
      },

      deleteSavedCoverLetter: (id) =>
        set((state) => ({
          savedCoverLetters: state.savedCoverLetters.filter(letter => letter.id !== id)
        })),

      loadSavedCoverLetter: (id) => {
        const letterToLoad = get().savedCoverLetters.find(letter => letter.id === id);
        if (letterToLoad) {
          set(() => ({
            coverLetter: { ...letterToLoad.data }
          }));
        }
      }
    }),
    {
      name: 'cover-letter-storage',
      storage: createCustomStorage()
    }
  )
);