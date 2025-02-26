import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import type { ResumeData } from "@/types/resume";
import { ThemeKey } from "./theme-styles";
import { ResumePDF } from "./ResumePDF";
import React from 'react';

/**
 * Export Resume to PDF with theme support
 * @param data - Resume data to export
 * @param filename - File name for the PDF
 * @param theme - Theme to use for styling
 * @returns Promise that resolves when export is complete
 */
export const exportResumeToPDF = async (
  data: ResumeData,
  filename: string = "resume.pdf",
  theme: ThemeKey = "classic"
): Promise<void> => {
  try {
    // Don't wrap ResumePDF in a Document since it already includes a Document
    const blob = await pdf(React.createElement(ResumePDF, { data, theme })).toBlob();

    // Save the PDF
    saveAs(blob, filename);

    return Promise.resolve();
  } catch (err) {
    console.error("Failed to export PDF:", err);
    return Promise.reject(err);
  }
};

// Export other modules for ease of import
export type { ThemeKey } from "./theme-styles";
export { ResumePDF } from "./ResumePDF";