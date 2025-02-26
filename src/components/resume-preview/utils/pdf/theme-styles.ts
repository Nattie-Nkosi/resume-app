// src/components/resume-preview/utils/pdf/theme-styles.ts
import { StyleSheet } from "@react-pdf/renderer";
import { registerFonts } from "./fonts";

// Register all fonts
registerFonts();

// Define theme-specific styles
export const themeStyles = {
  classic: {
    fontFamily: "Open Sans",
    primary: "#111111",
    secondary: "#555555",
    accent: "#F6F6F6",
    border: "#EEEEEE",
    link: "#0066CC",
    headingWeight: "bold",
    sectionBg: "#FFFFFF",
    skillBg: "#F6F6F6",
    skillText: "#444444",
  },
  modern: {
    fontFamily: "Roboto",
    primary: "#2D3748",
    secondary: "#4A5568",
    accent: "#EDF2F7",
    border: "#E2E8F0",
    link: "#3182CE",
    headingWeight: "medium",
    sectionBg: "#FFFFFF",
    skillBg: "#EDF2F7",
    skillText: "#4A5568",
  },
  professional: {
    fontFamily: "Roboto",
    primary: "#333333",
    secondary: "#666666",
    accent: "#F0F4F8",
    border: "#D1DCE8",
    link: "#2E5C8A",
    headingWeight: "bold",
    sectionBg: "#FFFFFF",
    skillBg: "#F0F4F8",
    skillText: "#2E5C8A",
  },
  minimalist: {
    fontFamily: "Lato",
    primary: "#222222",
    secondary: "#555555",
    accent: "#F8F8F8",
    border: "#EEEEEE",
    link: "#777777",
    headingWeight: "normal",
    sectionBg: "#FFFFFF",
    skillBg: "#F8F8F8",
    skillText: "#555555",
  },
  creative: {
    fontFamily: "Playfair Display",
    primary: "#1F1F1F",
    secondary: "#5F5F5F",
    accent: "#FFF3E0",
    border: "#FFE0B2",
    link: "#FF8F00",
    headingWeight: "normal",
    sectionBg: "#FFFFFF",
    skillBg: "#FFF3E0",
    skillText: "#5F5F5F",
  },
};

export type ThemeKey = keyof typeof themeStyles;

// Create style generator function
export const createStyles = (theme: ThemeKey = "classic") => {
  const themeConfig = themeStyles[theme] || themeStyles.classic;

  return StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      padding: 30,
      fontFamily: themeConfig.fontFamily,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12, // Further reduced
      paddingBottom: 6, // Further reduced
      borderBottom: `1px solid ${themeConfig.border}`,
    },
    headerLeft: {
      flexDirection: "column",
      width: "60%",
    },
    headerRight: {
      flexDirection: "column",
      width: "40%",
      alignItems: "flex-end",
    },
    name: {
      fontSize: 20, // Further reduced
      fontWeight: themeConfig.headingWeight,
      marginBottom: 2, // Further reduced
      color: themeConfig.primary,
    },
    title: {
      fontSize: 12, // Further reduced
      color: themeConfig.secondary,
      marginBottom: 2, // Further reduced
    },
    contactItem: {
      fontSize: 8, // Further reduced
      marginBottom: 1, // Further reduced
      color: themeConfig.secondary,
    },
    link: {
      fontSize: 8, // Further reduced
      color: themeConfig.link,
      textDecoration: "none",
      marginBottom: 1, // Further reduced
    },
    summary: {
      fontSize: 8, // Further reduced
      marginBottom: 10, // Further reduced
      lineHeight: 1.2, // Further reduced
      color: themeConfig.secondary,
    },
    divider: {
      borderBottom: `1px solid ${themeConfig.border}`,
      marginTop: 3, // Further reduced
      marginBottom: 6, // Further reduced
    },
    socialLinks: {
      flexDirection: "row",
      marginTop: 3, // Further reduced
    },
    socialLink: {
      fontSize: 7, // Further reduced
      color: themeConfig.link,
      marginLeft: 6, // Further reduced
      textDecoration: "none",
    },
    contentContainer: {
      flexDirection: "row",
      marginTop: 6, // Further reduced
      gap: 15, // Add gap between columns
    },
    leftColumn: {
      width: "30%", // Smaller left column
      paddingRight: 0, // Remove padding, use gap instead
    },
    rightColumn: {
      width: "70%", // Larger right column
    },
    sectionTitle: {
      fontSize: 10, // Further reduced
      fontWeight: themeConfig.headingWeight,
      marginBottom: 4, // Further reduced
      color: themeConfig.primary,
      textTransform: "uppercase",
    },
    sectionContent: {
      marginBottom: 10, // Further reduced
    },
    categoryTitle: {
      fontSize: 9, // Further reduced
      fontWeight:
        themeConfig.headingWeight === "bold"
          ? "semibold"
          : themeConfig.headingWeight,
      marginBottom: 2, // Further reduced
      color: themeConfig.primary,
    },
    skillContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 4, // Further reduced
    },
    skillItem: {
      fontSize: 7, // Further reduced
      backgroundColor: themeConfig.skillBg,
      padding: "1 3", // Further reduced
      marginRight: 3, // Further reduced
      marginBottom: 2, // Further reduced
      borderRadius: 2,
      color: themeConfig.skillText,
    },
    // Even more compact skills
    compactSkillItem: {
      fontSize: 7,
      backgroundColor: themeConfig.skillBg,
      padding: "0.5 2",
      marginRight: 2,
      marginBottom: 1.5,
      borderRadius: 1,
      color: themeConfig.skillText,
    },
    // Multi-column skills layout
    skillsGrid: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
    },
    skillColumn: {
      width: "50%",
      paddingRight: 5,
    },
    experienceItem: {
      marginBottom: 7, // Further reduced
      borderLeft: `1.5px solid ${themeConfig.border}`, // Thinner border
      paddingLeft: 5, // Further reduced
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 1.5, // Further reduced
    },
    positionTitle: {
      fontSize: 9, // Further reduced
      fontWeight:
        themeConfig.headingWeight === "bold"
          ? "semibold"
          : themeConfig.headingWeight,
      color: themeConfig.primary,
    },
    company: {
      fontSize: 8, // Further reduced
      color: themeConfig.secondary,
      marginBottom: 1.5, // Further reduced
    },
    dateRange: {
      fontSize: 7, // Further reduced
      color: themeConfig.secondary,
      backgroundColor: themeConfig.skillBg,
      padding: "0.5 3", // Further reduced
      borderRadius: 1.5, // Further reduced
    },
    description: {
      fontSize: 7, // Further reduced
      lineHeight: 1.3, // Further reduced
      marginTop: 1.5, // Further reduced
      color: themeConfig.secondary,
    },
    educationItem: {
      marginBottom: 5, // Further reduced
    },
    degree: {
      fontSize: 9, // Further reduced
      fontWeight:
        themeConfig.headingWeight === "bold"
          ? "semibold"
          : themeConfig.headingWeight,
      color: themeConfig.primary,
    },
    institution: {
      fontSize: 8, // Further reduced
      color: themeConfig.secondary,
      marginBottom: 0.5, // Further reduced
    },
    toolsList: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 3, // Further reduced
    },
    techItem: {
      fontSize: 7, // Further reduced
      backgroundColor: themeConfig.skillBg,
      padding: "0.5 3", // Further reduced
      marginRight: 3, // Further reduced
      marginBottom: 2, // Further reduced
      borderRadius: 1.5, // Further reduced
      color: themeConfig.skillText,
    },
    projectItem: {
      marginBottom: 7, // Further reduced
      borderLeft: `1.5px solid ${themeConfig.border}`, // Thinner border
      paddingLeft: 5, // Further reduced
    },
    certificateItem: {
      marginBottom: 6, // Further reduced
    },
    // Improved certificate section
    certificateContent: {
      marginTop: 1,
      marginBottom: 2,
    },
    // Better formatted certification URL
    credentialLink: {
      fontSize: 7,
      color: themeConfig.link,
      textDecoration: "none",
      marginTop: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    credentialLinkText: {
      fontSize: 7,
      color: themeConfig.link,
      textDecoration: "underline",
      marginLeft: 2,
    },
    achievementItem: {
      marginBottom: 7, // Further reduced
      borderLeft: `1.5px solid ${themeConfig.border}`, // Thinner border
      paddingLeft: 5, // Further reduced
    },
    languageItem: {
      fontSize: 7, // Further reduced
      marginBottom: 1.5, // Further reduced
      color: themeConfig.secondary,
    },
    // New styles for better education alignment
    educationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    educationDetails: {
      flexDirection: "column",
      flex: 1,
    },
    educationDate: {
      fontSize: 7,
      color: themeConfig.secondary,
      textAlign: "right",
    },
    // Skills section optimization
    skillGroupContainer: {
      marginBottom: 3,
    },
    // Icon styles
    smallIcon: {
      width: 8,
      height: 8,
    },
    // Two-column skills layout
    skillsSection: {
      display: "flex",
      flexDirection: "column",
    },
    skillRow: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 3,
    },
    skillGroupLeft: {
      width: "50%",
      paddingRight: 4,
    },
    skillGroupRight: {
      width: "50%",
    },
    // Single page optimization
    singlePageOptimized: {
      lineHeight: 1.2,
    },
    inlineSkills: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 2,
    }
  });
};