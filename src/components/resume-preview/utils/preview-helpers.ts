// src/components/resume-preview/utils/preview-helpers.ts
import { exportResumeToPDF } from './react-pdf-export';
import type { ResumeData } from '@/types/resume';
import type { ThemeKey } from '../theme-config';

/**
 * Copy text to clipboard
 * @param text 
 * @returns Promise<void>
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    return Promise.resolve();
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return Promise.reject(err);
  }
};

/**
 * Handle printing the document
 */
export const handlePrintDocument = (): void => {
  window.print();
};

/**
 * Format skill proficiency level as a percentage for visual representation
 * @param proficiency 
 * @returns string
 */
export const getProficiencyPercentage = (proficiency: string): string => {
  switch (proficiency) {
    case "Beginner":
      return "25%";
    case "Intermediate":
      return "50%";
    case "Advanced":
      return "75%";
    case "Expert":
      return "100%";
    default:
      return "50%";
  }
};

/**
 * Export resume to PDF using React-PDF with theme support
 * @param element The HTML element to export (not used with React-PDF)
 * @param filename The name of the PDF file
 * @param data The resume data to render
 * @param theme The theme to apply to the PDF
 */
export const exportResumeToSinglePagePDF = async (
  element: HTMLElement,
  filename: string = 'resume.pdf',
  data?: ResumeData,
  theme?: 'classic' | 'modern' | 'professional' | 'minimalist' | 'creative'
): Promise<void> => {
  try {
    // Set cursor to indicate processing
    document.body.style.cursor = 'wait';

    // Extract data from the window if not provided as a parameter
    // This is a fallback when the function is called from the old code
    if (!data) {
      // Try to get data from the window or find it elsewhere
      // @ts-expect-error - Accessing global window object
      data = window.resumeData || element.dataset.resumeData;

      if (!data) {
        console.error('Resume data not found');
        throw new Error('Resume data not found for PDF export');
      }
    }

    // Use our React-PDF export function with theme support
    await exportResumeToPDF(data, filename, theme);

    // Reset cursor
    document.body.style.cursor = 'auto';

    return Promise.resolve();
  } catch (err) {
    console.error('Failed to export PDF:', err);
    document.body.style.cursor = 'auto';
    return Promise.reject(err);
  }
};

/**
 * For backwards compatibility
 */
export const exportResumeToMultiPagePDF = async (
  element: HTMLElement,
  filename: string = 'resume.pdf',
  data?: ResumeData,
  theme?: 'classic' | 'modern' | 'professional' | 'minimalist' | 'creative'
): Promise<void> => {
  return exportResumeToSinglePagePDF(element, filename, data, theme);
};

/**
 * For backwards compatibility
 */
export const exportResumeBySections = async (
  element: HTMLElement,
  filename: string = 'resume.pdf',
  data?: ResumeData,
  theme: ThemeKey = 'classic'
): Promise<void> => {
  return exportResumeToSinglePagePDF(element, filename, data, theme as 'classic' | 'modern' | 'professional' | 'minimalist' | 'creative');
};