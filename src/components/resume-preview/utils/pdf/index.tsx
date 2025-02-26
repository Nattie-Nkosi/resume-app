// src/components/resume-preview/utils/pdf/index.tsx
import React from "react";
import { pdf, Document } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import type { ResumeData } from "@/types/resume";
import { ThemeKey } from "./theme-styles";
import { ResumePDF } from "./ResumePDF";

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
    // Create a wrapper Document component to satisfy type requirements
    const PdfDocument = () => (
      <Document>
        <ResumePDF data={data} theme={theme} />
      </Document>
    );

    // Generate the PDF blob
    const blob = await pdf(<PdfDocument />).toBlob();

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
