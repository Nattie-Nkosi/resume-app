// src/components/resume-preview/utils/react-pdf-export.tsx
import React from "react";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";
import { saveAs } from "file-saver";
//import { ThemeKey } from "../theme-config";

// Register fonts for better typography
Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: "semibold",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: "medium",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Lato",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Playfair Display",
  src: "https://fonts.gstatic.com/s/playfairdisplay/v21/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtY.ttf",
  fontWeight: "normal",
});

// Define theme-specific styles
const themeStyles = {
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

// Create style generator function
const createStyles = (theme: keyof typeof themeStyles = "classic") => {
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
    toolItem: {
      fontSize: 9,
      backgroundColor: themeConfig.skillBg,
      padding: "2 5",
      marginRight: 5,
      marginBottom: 5,
      borderRadius: 3,
      color: themeConfig.skillText,
    },
    languageItem: {
      fontSize: 9,
      marginBottom: 3,
      color: themeConfig.secondary,
    },
  });
};

// Format date function
const formatDate = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

// Create Resume PDF Document with theme support
const ResumePDF = ({
  data,
  theme = "classic",
}: {
  data: ResumeData;
  theme?: keyof typeof themeStyles;
}) => {
  const { personalInfo, experiences, education, skillGroups } = data;

  // Generate theme-specific styles
  const styles = createStyles(theme);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{personalInfo.fullName}</Text>
            <Text style={styles.title}>{personalInfo.title}</Text>

            {/* Summary */}
            {personalInfo.summary && (
              <Text style={styles.summary}>{personalInfo.summary}</Text>
            )}
          </View>

          <View style={styles.headerRight}>
            <Link src={`mailto:${personalInfo.email}`} style={styles.link}>
              {personalInfo.email}
            </Link>
            <Text style={styles.contactItem}>{personalInfo.phone}</Text>
            <Text style={styles.contactItem}>{personalInfo.location}</Text>

            {/* Social Links */}
            <View style={styles.socialLinks}>
              {personalInfo.linkedin && (
                <Link src={personalInfo.linkedin} style={styles.socialLink}>
                  LinkedIn
                </Link>
              )}
              {personalInfo.github && (
                <Link src={personalInfo.github} style={styles.socialLink}>
                  GitHub
                </Link>
              )}
              {personalInfo.portfolio && (
                <Link src={personalInfo.portfolio} style={styles.socialLink}>
                  Portfolio
                </Link>
              )}
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Skills Section */}
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Skills</Text>

              {skillGroups.map((group, groupIndex) => (
                <View
                  key={`skill-group-${groupIndex}`}
                  style={{ marginBottom: 12 }}
                >
                  <Text style={styles.categoryTitle}>{group.category}</Text>
                  <View style={styles.skillContainer}>
                    {group.skills.map((skill, skillIndex) => (
                      <Text
                        key={`skill-${groupIndex}-${skillIndex}`}
                        style={styles.skillItem}
                      >
                        {skill.name}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Languages Section */}
            {data.languages && data.languages.length > 0 && (
              <View style={styles.sectionContent}>
                <Text style={styles.sectionTitle}>Languages</Text>

                <View style={{ marginBottom: 10 }}>
                  {data.languages.map((language, index) => (
                    <Text key={`language-${index}`} style={styles.languageItem}>
                      {language.name} • {language.proficiency}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Tools Section - Transformed from skills */}
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Tools</Text>

              <View style={styles.toolsList}>
                {[
                  "Git",
                  "GitHub",
                  "Docker",
                  "Linux Operating System",
                  "Windows Operating System",
                ].map((tool, index) => (
                  <Text key={`tool-${index}`} style={styles.toolItem}>
                    {tool}
                  </Text>
                ))}
              </View>
            </View>

            {/* Frameworks Section */}
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Frameworks</Text>

              <View style={styles.toolsList}>
                {["React", "Angular", "Node", ".NET"].map(
                  (framework, index) => (
                    <Text key={`framework-${index}`} style={styles.toolItem}>
                      {framework}
                    </Text>
                  )
                )}
              </View>
            </View>

            {/* Other Section */}
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Other</Text>

              <View style={styles.toolsList}>
                <Text style={styles.toolItem}>Reading Books</Text>
              </View>
            </View>

            {/* Education Section */}
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Education</Text>

              {education.map((edu, index) => (
                <View key={`education-${index}`} style={styles.educationItem}>
                  <Text style={styles.degree}>
                    {edu.degree} in {edu.field}
                  </Text>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  <Text style={styles.dateRange}>
                    {formatDate(edu.startDate)} -{" "}
                    {edu.endDate ? formatDate(edu.endDate) : "Present"}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Experience Section */}
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>

              {experiences.map((exp, index) => (
                <View key={`experience-${index}`} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.positionTitle}>{exp.position}</Text>
                    <Text style={styles.dateRange}>
                      {formatDate(exp.startDate)} -{" "}
                      {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </Text>
                  </View>
                  <Text style={styles.company}>
                    {exp.company}
                    {exp.location ? `, ${exp.location}` : ""}
                  </Text>
                  <Text style={styles.description}>{exp.description}</Text>
                </View>
              ))}
            </View>

            {/* Projects Section if available */}
            {data.projects && data.projects.length > 0 && (
              <View style={styles.sectionContent}>
                <Text style={styles.sectionTitle}>Projects</Text>

                {data.projects.map((project, index) => (
                  <View key={`project-${index}`} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.positionTitle}>{project.title}</Text>
                      <Text style={styles.dateRange}>
                        {formatDate(project.startDate)} -{" "}
                        {project.endDate
                          ? formatDate(project.endDate)
                          : "Present"}
                      </Text>
                    </View>
                    <Text style={styles.description}>
                      {project.description}
                    </Text>

                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <View style={styles.skillContainer}>
                          {project.technologies.map((tech, techIndex) => (
                            <Text
                              key={`tech-${index}-${techIndex}`}
                              style={styles.skillItem}
                            >
                              {tech}
                            </Text>
                          ))}
                        </View>
                      )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Export Resume to PDF with theme support
export const exportResumeToPDF = async (
  data: ResumeData,
  filename: string = "resume.pdf",
  theme: keyof typeof themeStyles = "classic"
) => {
  try {
    // Create the PDF document with the specified theme
    const blob = await pdf(<ResumePDF data={data} theme={theme} />).toBlob();

    // Save the PDF
    saveAs(blob, filename);

    return Promise.resolve();
  } catch (err) {
    console.error("Failed to export PDF:", err);
    return Promise.reject(err);
  }
};
