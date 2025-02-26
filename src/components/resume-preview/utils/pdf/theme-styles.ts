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
      marginBottom: 20,
      paddingBottom: 10,
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
      fontSize: 24,
      fontWeight: themeConfig.headingWeight,
      marginBottom: 4,
      color: themeConfig.primary,
    },
    title: {
      fontSize: 14,
      color: themeConfig.secondary,
      marginBottom: 4,
    },
    contactItem: {
      fontSize: 10,
      marginBottom: 2,
      color: themeConfig.secondary,
    },
    link: {
      fontSize: 10,
      color: themeConfig.link,
      textDecoration: "none",
      marginBottom: 2,
    },
    summary: {
      fontSize: 10,
      marginBottom: 15,
      lineHeight: 1.4,
      color: themeConfig.secondary,
    },
    divider: {
      borderBottom: `1px solid ${themeConfig.border}`,
      marginTop: 5,
      marginBottom: 10,
    },
    socialLinks: {
      flexDirection: "row",
      marginTop: 5,
    },
    socialLink: {
      fontSize: 9,
      color: themeConfig.link,
      marginLeft: 10,
      textDecoration: "none",
    },
    contentContainer: {
      flexDirection: "row",
      marginTop: 10,
    },
    leftColumn: {
      width: "32%",
      paddingRight: 15,
    },
    rightColumn: {
      width: "68%",
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: themeConfig.headingWeight,
      marginBottom: 8,
      color: themeConfig.primary,
      textTransform: "uppercase",
    },
    sectionContent: {
      marginBottom: 15,
    },
    categoryTitle: {
      fontSize: 11,
      fontWeight:
        themeConfig.headingWeight === "bold"
          ? "semibold"
          : themeConfig.headingWeight,
      marginBottom: 4,
      color: themeConfig.primary,
    },
    skillContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 10,
    },
    skillItem: {
      fontSize: 9,
      backgroundColor: themeConfig.skillBg,
      padding: "3 6",
      marginRight: 5,
      marginBottom: 5,
      borderRadius: 3,
      color: themeConfig.skillText,
    },
    experienceItem: {
      marginBottom: 12,
      borderLeft: `2px solid ${themeConfig.border}`,
      paddingLeft: 8,
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 3,
    },
    positionTitle: {
      fontSize: 11,
      fontWeight:
        themeConfig.headingWeight === "bold"
          ? "semibold"
          : themeConfig.headingWeight,
      color: themeConfig.primary,
    },
    company: {
      fontSize: 10,
      color: themeConfig.secondary,
      marginBottom: 2,
    },
    dateRange: {
      fontSize: 9,
      color: themeConfig.secondary,
      backgroundColor: themeConfig.skillBg,
      padding: "2 5",
      borderRadius: 3,
    },
    description: {
      fontSize: 9,
      lineHeight: 1.5,
      marginTop: 3,
      color: themeConfig.secondary,
    },
    educationItem: {
      marginBottom: 10,
    },
    degree: {
      fontSize: 10,
      fontWeight:
        themeConfig.headingWeight === "bold"
          ? "semibold"
          : themeConfig.headingWeight,
      color: themeConfig.primary,
    },
    institution: {
      fontSize: 9,
      color: themeConfig.secondary,
      marginBottom: 1,
    },
    toolsList: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 5,
    },
    techItem: {
      fontSize: 9,
      backgroundColor: themeConfig.skillBg,
      padding: "2 5",
      marginRight: 5,
      marginBottom: 5,
      borderRadius: 3,
      color: themeConfig.skillText,
    },
    projectItem: {
      marginBottom: 10,
      borderLeft: `2px solid ${themeConfig.border}`,
      paddingLeft: 8,
    },
    certificateItem: {
      marginBottom: 10,
    },
    achievementItem: {
      marginBottom: 10,
      borderLeft: `2px solid ${themeConfig.border}`,
      paddingLeft: 8,
    },
    languageItem: {
      fontSize: 9,
      marginBottom: 3,
      color: themeConfig.secondary,
    },
  });
};