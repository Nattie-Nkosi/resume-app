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
 * Export the resume as a PDF file with improved formatting and clickable links
 * @param element The HTML element to export
 * @param filename The name of the PDF file
 */
export const exportToPDF = async (element: HTMLElement, filename: string = 'resume.pdf'): Promise<void> => {
  try {
    // Show loading state
    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = 'wait';

    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement;

    // Apply temporary styles to ensure proper rendering
    const tempStyles = document.createElement('style');
    tempStyles.textContent = `
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      @page {
        margin: 0;
        size: A4;
      }
      body {
        margin: 0;
        padding: 0;
      }
    `;
    clone.appendChild(tempStyles);

    // Temporarily add the clone to the document for rendering
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '-9999px';
    clone.style.width = '210mm';  // A4 width
    clone.style.height = 'auto';
    clone.style.transform = 'none';
    clone.style.transformOrigin = 'top left';
    document.body.appendChild(clone);

    // Wait a moment for all styles to apply
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create a canvas from the element with appropriate dimensions
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      windowWidth: 794, // A4 width in pixels at 96dpi
      windowHeight: 1123, // A4 height in pixels at 96dpi
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
    });

    // Create a PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // A4 dimensions: 210mm x 297mm
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add image to first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if the content is longer than one page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Add metadata and enable interactive features
    pdf.setProperties({
      title: filename.replace('.pdf', ''),
      subject: 'Resume',
      creator: 'Resume Builder',
      keywords: 'resume, cv, job application',
    });

    // Process links for better interactivity
    const links = clone.querySelectorAll('a');
    if (links.length > 0) {
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          const rect = link.getBoundingClientRect();
          const rectRatio = imgWidth / clone.offsetWidth;
          const linkX = rect.left * rectRatio;
          const linkY = rect.top * rectRatio;
          const linkWidth = rect.width * rectRatio;
          const linkHeight = rect.height * rectRatio;

          pdf.link(linkX, linkY, linkWidth, linkHeight, { url: href });
        }
      });
    }

    // Remove the clone from the document
    document.body.removeChild(clone);

    // Save the PDF
    pdf.save(filename);

    // Reset cursor
    document.body.style.cursor = originalCursor;

    return Promise.resolve();
  } catch (err) {
    console.error('Failed to export PDF:', err);
    return Promise.reject(err);
  }
};

/**
 * Create an optimized export specifically for resume layouts
 */
export const exportResumeToPDF = async (element: HTMLElement, filename: string = 'resume.pdf'): Promise<void> => {
  try {
    // Show loading state
    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = 'wait';

    // Create a PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Set a clean background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, 210, 297, 'F');

    // Create high-resolution canvas
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      logging: false,
    });

    // Add the image to the PDF
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;

    // Add image centered on the page with margins
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Enable interactive features if there are links
    const links = element.querySelectorAll('a');
    if (links.length > 0) {
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          try {
            const rect = link.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            // Calculate positions relative to the element
            const relativeLeft = rect.left - elementRect.left;
            const relativeTop = rect.top - elementRect.top;

            // Scale to PDF dimensions
            const scaleX = imgWidth / element.offsetWidth;
            const scaleY = imgHeight / element.offsetHeight;

            const linkX = relativeLeft * scaleX;
            const linkY = relativeTop * scaleY;
            const linkWidth = rect.width * scaleX;
            const linkHeight = rect.height * scaleY;

            pdf.link(linkX, linkY, linkWidth, linkHeight, { url: href });
          } catch (e) {
            console.warn('Failed to add interactive link', e);
          }
        }
      });
    }

    // Save the PDF
    pdf.save(filename);

    // Reset cursor
    document.body.style.cursor = originalCursor;

    return Promise.resolve();
  } catch (err) {
    console.error('Failed to export PDF:', err);
    return Promise.reject(err);
  }
};