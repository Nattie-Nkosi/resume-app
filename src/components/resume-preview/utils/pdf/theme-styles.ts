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
    // Enhanced modern theme with improved readability
    fontFamily: "Roboto",
    primary: "#2D3748", // Dark blue-gray for main text
    secondary: "#4A5568", // Medium blue-gray for secondary text
    accent: "#EDF2F7", // Light blue-gray for backgrounds
    border: "#CBD5E0", // Medium gray for borders (slightly darker for better distinction)
    link: "#4299E1", // Bright blue for links (more vibrant)
    headingWeight: "bold", // Changed from "medium" to "bold" for better section distinction
    sectionBg: "#FFFFFF",
    skillBg: "#E6F6FF", // Light blue for skill backgrounds (more distinct)
    skillText: "#2C5282", // Darker blue for skill text (better contrast)
    highlightColor: "#3182CE", // Accent color for important elements
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

// Create style generator function with enhanced modern styling
export const createStyles = (theme: ThemeKey = "classic") => {
  const themeConfig = themeStyles[theme] || themeStyles.classic;

  // Define highlight border color (for the modern theme's left borders)
  const highlightBorder = theme === "modern"
    ? `2px solid ${themeStyles.modern.highlightColor}`
    : `1.5px solid ${themeConfig.border}`;

  return StyleSheet.create({
    brandingFooter: {
      position: "absolute",
      bottom: 3,
      left: 0,
      right: 0,
      fontSize: 5,
      textAlign: "center",
      color: "#aaaaaa",
      fontFamily: themeConfig.fontFamily,
      fontWeight: "normal",
      opacity: 0.5,
    },
    page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      padding: theme === "modern" ? 35 : 30, // Slightly more padding for modern theme
      fontFamily: themeConfig.fontFamily,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: theme === "modern" ? 16 : 12,
      paddingBottom: theme === "modern" ? 10 : 6,
      borderBottom: theme === "modern"
        ? `2px solid ${themeConfig.border}`
        : `1px solid ${themeConfig.border}`,
    },
    headerLeft: {
      flexDirection: "column",
      width: theme === "modern" ? "65%" : "60%", // Slightly wider for modern theme
    },
    headerRight: {
      flexDirection: "column",
      width: theme === "modern" ? "35%" : "40%",
      alignItems: "flex-end",
    },
    name: {
      fontSize: theme === "modern" ? 22 : 20,
      fontWeight: themeConfig.headingWeight,
      marginBottom: theme === "modern" ? 3 : 2,
      color: themeConfig.primary,
      letterSpacing: theme === "modern" ? 0.5 : undefined,
    },
    title: {
      fontSize: theme === "modern" ? 13 : 12,
      color: themeConfig.secondary,
      marginBottom: theme === "modern" ? 4 : 2,
      fontWeight: theme === "modern" ? "medium" : "normal",
    },
    contactItem: {
      fontSize: theme === "modern" ? 9 : 8,
      marginBottom: 2,
      color: themeConfig.secondary,
    },
    link: {
      fontSize: theme === "modern" ? 9 : 8,
      color: themeConfig.link,
      textDecoration: "none",
      marginBottom: 2,
    },
    summary: {
      fontSize: theme === "modern" ? 9 : 8,
      marginBottom: 10,
      lineHeight: theme === "modern" ? 1.4 : 1.2,
      color: themeConfig.secondary,
    },
    contentContainer: {
      flexDirection: "row",
      marginTop: theme === "modern" ? 10 : 6,
      gap: theme === "modern" ? 20 : 15,
    },
    leftColumn: {
      width: theme === "modern" ? "35%" : "30%", // Wider left column for modern theme
      paddingRight: 0,
    },
    rightColumn: {
      width: theme === "modern" ? "65%" : "70%",
    },
    sectionTitle: {
      fontSize: theme === "modern" ? 12 : 10,
      fontWeight: themeConfig.headingWeight,
      marginBottom: theme === "modern" ? 6 : 4,
      color: theme === "modern" ? themeStyles.modern.highlightColor : themeConfig.primary,
      textTransform: "uppercase",
      letterSpacing: theme === "modern" ? 0.8 : undefined,
    },
    sectionContent: {
      marginBottom: theme === "modern" ? 14 : 10,
    },
    categoryTitle: {
      fontSize: theme === "modern" ? 10 : 9,
      fontWeight: theme === "modern" ? "bold" :
        (themeConfig.headingWeight === "bold" ? "semibold" : themeConfig.headingWeight),
      marginBottom: theme === "modern" ? 3 : 2,
      color: themeConfig.primary,
    },
    skillContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: theme === "modern" ? 6 : 4,
    },
    skillItem: {
      fontSize: theme === "modern" ? 8 : 7,
      backgroundColor: themeConfig.skillBg,
      padding: theme === "modern" ? "2 4" : "1 3",
      marginRight: 4,
      marginBottom: 3,
      borderRadius: theme === "modern" ? 3 : 2,
      color: themeConfig.skillText,
    },
    compactSkillItem: {
      fontSize: theme === "modern" ? 8 : 7,
      backgroundColor: themeConfig.skillBg,
      padding: theme === "modern" ? "1 3" : "0.5 2",
      marginRight: 3,
      marginBottom: 2,
      borderRadius: theme === "modern" ? 2 : 1,
      color: themeConfig.skillText,
    },
    experienceItem: {
      marginBottom: theme === "modern" ? 12 : 8,
      borderLeft: theme === "modern" ? highlightBorder : `1.5px solid ${themeConfig.border}`,
      paddingLeft: theme === "modern" ? 8 : 6,
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: theme === "modern" ? 3 : 1.5,
    },
    positionTitle: {
      fontSize: theme === "modern" ? 11 : 9,
      fontWeight: theme === "modern" ? "bold" :
        (themeConfig.headingWeight === "bold" ? "semibold" : themeConfig.headingWeight),
      color: themeConfig.primary,
    },
    company: {
      fontSize: theme === "modern" ? 9 : 8,
      color: themeConfig.secondary,
      marginBottom: theme === "modern" ? 2 : 1.5,
      fontWeight: theme === "modern" ? "medium" : "normal",
    },
    dateRange: {
      fontSize: theme === "modern" ? 8 : 7,
      color: theme === "modern" ? themeConfig.skillText : themeConfig.secondary,
      backgroundColor: themeConfig.skillBg,
      padding: theme === "modern" ? "1 4" : "0.5 3",
      borderRadius: theme === "modern" ? 2 : 1.5,
    },
    description: {
      fontSize: theme === "modern" ? 8 : 7,
      lineHeight: theme === "modern" ? 1.5 : 1.3,
      marginTop: theme === "modern" ? 2 : 1.5,
      color: themeConfig.secondary,
    },
    educationItem: {
      marginBottom: theme === "modern" ? 8 : 5,
      paddingLeft: theme === "modern" ? 2 : 0,
    },
    degree: {
      fontSize: theme === "modern" ? 10 : 9,
      fontWeight: theme === "modern" ? "bold" :
        (themeConfig.headingWeight === "bold" ? "semibold" : themeConfig.headingWeight),
      color: themeConfig.primary,
    },
    institution: {
      fontSize: theme === "modern" ? 9 : 8,
      color: themeConfig.secondary,
      marginBottom: theme === "modern" ? 1 : 0.5,
    },
    techItem: {
      fontSize: theme === "modern" ? 8 : 7,
      backgroundColor: themeConfig.skillBg,
      padding: theme === "modern" ? "1 4" : "0.5 3",
      marginRight: 4,
      marginBottom: 3,
      borderRadius: theme === "modern" ? 2 : 1.5,
      color: themeConfig.skillText,
    },
    projectItem: {
      marginBottom: theme === "modern" ? 10 : 7,
      borderLeft: theme === "modern" ? highlightBorder : `1.5px solid ${themeConfig.border}`,
      paddingLeft: theme === "modern" ? 8 : 5,
    },
    certificateItem: {
      marginBottom: theme === "modern" ? 8 : 6,
      paddingLeft: theme === "modern" ? 2 : 0,
    },
    achievementItem: {
      marginBottom: theme === "modern" ? 10 : 7,
      borderLeft: theme === "modern" ? highlightBorder : `1.5px solid ${themeConfig.border}`,
      paddingLeft: theme === "modern" ? 8 : 5,
    },
    languageItem: {
      fontSize: theme === "modern" ? 8 : 7,
      marginBottom: theme === "modern" ? 2 : 1.5,
      color: themeConfig.secondary,
    },
    // Keep all other styles...
    divider: {
      borderBottom: `1px solid ${themeConfig.border}`,
      marginTop: 3,
      marginBottom: 6,
    },
    socialLinks: {
      flexDirection: "row",
      marginTop: 3,
    },
    socialLink: {
      fontSize: 7,
      color: themeConfig.link,
      marginLeft: 6,
      textDecoration: "none",
    },
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
    toolsList: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 4,
    },
    certificateContent: {
      marginTop: 1,
      marginBottom: 2,
    },
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
    skillGroupContainer: {
      marginBottom: 3,
    },
    smallIcon: {
      width: 8,
      height: 8,
    },
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
    singlePageOptimized: {
      lineHeight: 1.2,
    },
    inlineSkills: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 2,
    },
  });
};