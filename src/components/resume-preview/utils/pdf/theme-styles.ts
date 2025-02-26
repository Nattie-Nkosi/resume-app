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

// Create style generator function - fixed type definition
export const createStyles = (theme: ThemeKey = "classic") => {
  const themeConfig = themeStyles[theme] || themeStyles.classic;

  // No type annotation here - let StyleSheet.create determine the type
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
      marginBottom: 12,
      paddingBottom: 6,
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
      fontSize: 20,
      fontWeight: themeConfig.headingWeight,
      marginBottom: 2,
      color: themeConfig.primary,
    },
    title: {
      fontSize: 12,
      color: themeConfig.secondary,
      marginBottom: 2,
    },
    contactItem: {
      fontSize: 8,
      marginBottom: 1,
      color: themeConfig.secondary,
    },
    link: {
      fontSize: 8,
      color: themeConfig.link,
      textDecoration: "none",
      marginBottom: 1,
    },
    summary: {
      fontSize: 8,
      marginBottom: 10,
      lineHeight: 1.2,
      color: themeConfig.secondary,
    },
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
    contentContainer: {
      flexDirection: "row",
      marginTop: 6,
      gap: 15,
    },
    leftColumn: {
      width: "30%",
      paddingRight: 0,
    },
    rightColumn: {
      width: "70%",
    },
    sectionTitle: {
      fontSize: 10,
      fontWeight: themeConfig.headingWeight,
      marginBottom: 4,
      color: themeConfig.primary,
      textTransform: "uppercase",
    },
    sectionContent: {
      marginBottom: 10,
    },
    categoryTitle: {
      fontSize: 9,
      fontWeight:
        themeConfig.headingWeight === "bold"
          ? "semibold"
          : themeConfig.headingWeight,
      marginBottom: 2,
      color: themeConfig.primary,
    },
    skillContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 4,
    },
    skillItem: {
      fontSize: 7,
      backgroundColor: themeConfig.skillBg,
      padding: "1 3",
      marginRight: 3,
      marginBottom: 2,
      borderRadius: 2,
      color: themeConfig.skillText,
    },
    compactSkillItem: {
      fontSize: 7,
      backgroundColor: themeConfig.skillBg,
      padding: "0.5 2",
      marginRight: 2,
      marginBottom: 1.5,
      borderRadius: 1,
      color: themeConfig.skillText,
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
    experienceItem: {
      marginBottom: 8,
      borderLeft: `1.5px solid ${themeConfig.border}`,
      paddingLeft: 6,
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 1.5,
    },
    positionTitle: {
      fontSize: 9,
      fontWeight:
        themeConfig.headingWeight === "bold"
          ? "semibold"
          : themeConfig.headingWeight,
      color: themeConfig.primary,
    },
    company: {
      fontSize: 8,
      color: themeConfig.secondary,
      marginBottom: 1.5,
    },
    dateRange: {
      fontSize: 7,
      color: themeConfig.secondary,
      backgroundColor: themeConfig.skillBg,
      padding: "0.5 3",
      borderRadius: 1.5,
    },
    description: {
      fontSize: 7,
      lineHeight: 1.3,
      marginTop: 1.5,
      color: themeConfig.secondary,
    },
    educationItem: {
      marginBottom: 5,
    },
    degree: {
      fontSize: 9,
      fontWeight:
        themeConfig.headingWeight === "bold"
          ? "semibold"
          : themeConfig.headingWeight,
      color: themeConfig.primary,
    },
    institution: {
      fontSize: 8,
      color: themeConfig.secondary,
      marginBottom: 0.5,
    },
    toolsList: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 4,
    },
    techItem: {
      fontSize: 7,
      backgroundColor: themeConfig.skillBg,
      padding: "0.5 3",
      marginRight: 3,
      marginBottom: 2,
      borderRadius: 1.5,
      color: themeConfig.skillText,
    },
    projectItem: {
      marginBottom: 7,
      borderLeft: `1.5px solid ${themeConfig.border}`,
      paddingLeft: 5,
    },
    certificateItem: {
      marginBottom: 6,
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
    achievementItem: {
      marginBottom: 7,
      borderLeft: `1.5px solid ${themeConfig.border}`,
      paddingLeft: 5,
    },
    languageItem: {
      fontSize: 7,
      marginBottom: 1.5,
      color: themeConfig.secondary,
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
}