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