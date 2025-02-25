// /components/resume-preview/utils/preview-helpers.ts
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';



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
 * Export resume to PDF using a simple and effective approach
 * @param element The HTML element to export
 * @param filename The name of the PDF file
 */
export const exportResumeToMultiPagePDF = async (
  element: HTMLElement,
  filename: string = 'resume.pdf'
): Promise<void> => {
  try {
    // Set cursor to indicate processing
    document.body.style.cursor = 'wait';

    // Prepare the element for export
    element.classList.add('pdf-export-ready');

    // Set better canvas options for higher quality
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false, // Reduce console noise
      imageTimeout: 15000, // Longer timeout for images
    });

    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm (slight reduction for safety)
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Calculate the number of pages needed
    const pageCount = Math.ceil(imgHeight / pageHeight);

    // For each page, add part of the image
    let position = 0;

    for (let i = 0; i < pageCount; i++) {
      // Add new page if not the first page
      if (i > 0) {
        pdf.addPage();
      }

      // Add image to page, positioning it based on which portion should be visible
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        i === 0 ? 0 : -position,
        imgWidth,
        imgHeight
      );

      // Update position for next page
      position += pageHeight;
    }

    // Save PDF
    pdf.save(filename);

    // Reset cursor
    element.classList.remove('pdf-export-ready');
    document.body.style.cursor = 'auto';

    return Promise.resolve();
  } catch (err) {
    console.error('Failed to export PDF:', err);
    document.body.style.cursor = 'auto';
    return Promise.reject(err);
  }
};

/**
 * Alternative PDF export method that works better for complex layouts
 * Uses a different approach that captures each section individually
 * @param element The HTML element to export
 * @param filename The name of the PDF file
 */
export const exportResumeBySections = async (
  element: HTMLElement,
  filename: string = 'resume.pdf'
): Promise<void> => {
  try {
    document.body.style.cursor = 'wait';

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // A4 dimensions in mm
    const pageWidth = 210;
    const pageHeight = 297;

    // Find all major sections of the resume
    const sections = element.querySelectorAll('div[class*="section"], div[class*="mb-6"], div[class*="space-y-4"]');

    // If no sections found, fall back to the whole element
    if (sections.length === 0) {
      return exportResumeToMultiPagePDF(element, filename);
    }

    let yPosition = 10; // Start 10mm from the top

    // Process each section
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i] as HTMLElement;

      // Skip empty sections or those with no visible content
      if (section.offsetHeight < 10 || section.innerText.trim() === '') {
        continue;
      }

      // Create a canvas for this section
      const canvas = await html2canvas(section, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null, // Transparent background
      });

      // Convert to image
      const imgData = canvas.toDataURL('image/png');

      // Calculate dimensions to fit within page width
      const imgWidth = pageWidth - 20; // 10mm margins on each side
      const imgHeight = canvas.height * imgWidth / canvas.width;

      // Check if this section needs to go on a new page
      if (yPosition + imgHeight > pageHeight - 10) { // 10mm from bottom
        pdf.addPage();
        yPosition = 10; // Reset to top of the new page
      }

      // Add section to PDF
      pdf.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);

      // Update y-position for next section
      yPosition += imgHeight + 5; // 5mm spacing between sections
    }

    // Save the PDF
    pdf.save(filename);

    document.body.style.cursor = 'auto';
    return Promise.resolve();
  } catch (err) {
    console.error('Failed to export PDF by sections:', err);
    document.body.style.cursor = 'auto';
    return Promise.reject(err);
  }
};