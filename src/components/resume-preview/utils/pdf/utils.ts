// src/components/resume-preview/utils/pdf/utils.ts

/**
 * Format date string to a more readable format (e.g., "Jan 2022")
 * @param dateString - The date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

/**
 * Check if a string has content (non-empty after trimming)
 * @param str - The string to check
 * @returns True if the string has content, false otherwise
 */
export const hasContent = (str?: string): boolean => {
  return Boolean(str && str.trim().length > 0);
};

/**
 * Truncate a string to a maximum length with ellipsis
 * @param str - The string to truncate
 * @param maxLength - The maximum length
 * @returns Truncated string
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (!str || str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
};