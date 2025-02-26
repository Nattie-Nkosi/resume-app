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

// Enhanced typography with premium fonts
Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Montserrat/montserrat-regular-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Montserrat/montserrat-medium-webfont.ttf",
      fontWeight: "medium",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Montserrat/montserrat-semibold-webfont.ttf",
      fontWeight: "semibold",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Montserrat/montserrat-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Merriweather",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Merriweather/merriweather-regular-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Merriweather/merriweather-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Source Sans Pro",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/source-sans-pro@3.6.0/TTF/SourceSansPro-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/source-sans-pro@3.6.0/TTF/SourceSansPro-Semibold.ttf",
      fontWeight: "semibold",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/source-sans-pro@3.6.0/TTF/SourceSansPro-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

// Refined theme configurations with more elegant color palettes
const themeStyles = {
  executive: {
    primaryFont: "Montserrat",
    secondaryFont: "Source Sans Pro",
    primary: "#2C3E50",
    secondary: "#34495E",
    accent: "#F7F9FA",
    border: "#E5E8ED",
    link: "#3498DB",
    headingWeight: "semibold",
    sectionBg: "#FFFFFF",
    skillBg: "#F7F9FA",
    skillText: "#34495E",
    headerBg: "#FFFFFF",
  },
  professional: {
    primaryFont: "Source Sans Pro",
    secondaryFont: "Source Sans Pro",
    primary: "#1A2A3A",
    secondary: "#4A6072",
    accent: "#F0F4F8",
    border: "#D1DCE8",
    link: "#2E5C8A",
    headingWeight: "semibold",
    sectionBg: "#FFFFFF",
    skillBg: "#F0F4F8",
    skillText: "#4A6072",
    headerBg: "#FFFFFF",
  },
  sophisticated: {
    primaryFont: "Merriweather",
    secondaryFont: "Source Sans Pro",
    primary: "#2F3542",
    secondary: "#57606F",
    accent: "#F1F2F6",
    border: "#DFE4EA",
    link: "#546DE5",
    headingWeight: "normal",
    sectionBg: "#FFFFFF",
    skillBg: "#F1F2F6",
    skillText: "#57606F",
    headerBg: "#FFFFFF",
  },
  minimalist: {
    primaryFont: "Montserrat",
    secondaryFont: "Source Sans Pro",
    primary: "#232323",
    secondary: "#666666",
    accent: "#F8F8F8",
    border: "#EEEEEE",
    link: "#666666",
    headingWeight: "medium",
    sectionBg: "#FFFFFF",
    skillBg: "#F8F8F8",
    skillText: "#666666",
    headerBg: "#FFFFFF",
  },
  elegant: {
    primaryFont: "Merriweather",
    secondaryFont: "Montserrat",
    primary: "#2C3A47",
    secondary: "#556170",
    accent: "#F7F7F7",
    border: "#E8E8E8",
    link: "#3B6978",
    headingWeight: "normal",
    sectionBg: "#FFFFFF",
    skillBg: "#F7F7F7",
    skillText: "#556170",
    headerBg: "#FFFFFF",
  },
};

// Create style generator function with enhanced design principles
const createStyles = (theme: keyof typeof themeStyles = "professional") => {
  const themeConfig = themeStyles[theme] || themeStyles.professional;

  return StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      padding: 35,
      fontFamily: themeConfig.secondaryFont,
    },
    header: {
      flexDirection: "column",
      marginBottom: 25,
      padding: 0,
      backgroundColor: themeConfig.headerBg,
    },
    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
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
      fontSize: 26,
      fontFamily: themeConfig.primaryFont,
      fontWeight: themeConfig.headingWeight,
      marginBottom: 5,
      color: themeConfig.primary,
      letterSpacing: 0.5,
    },
    title: {
      fontSize: 14,
      color: themeConfig.secondary,
      marginBottom: 5,
      fontFamily: themeConfig.secondaryFont,
      letterSpacing: 0.2,
    },
    contact: {
      flexDirection: "column",
      alignItems: "flex-end",
    },
    contactItem: {
      fontSize: 10,
      marginBottom: 3,
      color: themeConfig.secondary,
      textAlign: "right",
    },
    link: {
      fontSize: 10,
      color: themeConfig.link,
      textDecoration: "none",
      marginBottom: 3,
      textAlign: "right",
    },
    summarySection: {
      marginTop: 5,
      marginBottom: 5,
      paddingTop: 10,
      paddingBottom: 15,
      borderTop: `1px solid ${themeConfig.border}`,
      borderBottom: `1px solid ${themeConfig.border}`,
    },
    summary: {
      fontSize: 10.5,
      lineHeight: 1.5,
      color: themeConfig.secondary,
      textAlign: "justify",
    },
    socialLinks: {
      flexDirection: "row",
      marginTop: 5,
      justifyContent: "flex-end",
    },
    socialLink: {
      fontSize: 9,
      color: themeConfig.link,
      marginLeft: 10,
      textDecoration: "none",
    },
    contentContainer: {
      flexDirection: "row",
      marginTop: 0,
    },
    leftColumn: {
      width: "32%",
      paddingRight: 15,
    },
    rightColumn: {
      width: "68%",
    },
    sectionTitle: {
      fontSize: 13,
      fontFamily: themeConfig.primaryFont,
      fontWeight: themeConfig.headingWeight,
      marginBottom: 10,
      color: themeConfig.primary,
      textTransform: "uppercase",
      letterSpacing: 1,
      paddingBottom: 2,
      borderBottom: `1px solid ${themeConfig.border}`,
    },
    sectionContent: {
      marginBottom: 20,
    },
    categoryTitle: {
      fontSize: 11,
      fontWeight: "semibold",
      marginBottom: 6,
      color: themeConfig.primary,
      fontFamily: themeConfig.primaryFont,
    },
    skillContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 12,
    },
    skillItem: {
      fontSize: 9,
      backgroundColor: themeConfig.skillBg,
      padding: "4 7",
      marginRight: 6,
      marginBottom: 6,
      borderRadius: 3,
      color: themeConfig.skillText,
    },
    experienceItem: {
      marginBottom: 15,
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
      alignItems: "center",
    },
    positionTitle: {
      fontSize: 12,
      fontWeight: "semibold",
      color: themeConfig.primary,
      fontFamily: themeConfig.primaryFont,
    },
    company: {
      fontSize: 11,
      color: themeConfig.secondary,
      marginBottom: 3,
      fontWeight: "medium",
    },
    dateRange: {
      fontSize: 9,
      color: themeConfig.secondary,
    },
    description: {
      fontSize: 9.5,
      lineHeight: 1.6,
      marginTop: 4,
      color: themeConfig.secondary,
      textAlign: "justify",
    },
    bulletPoint: {
      flexDirection: "row",
      marginBottom: 2,
      paddingLeft: 2,
    },
    bullet: {
      fontSize: 9,
      marginRight: 4,
      color: themeConfig.secondary,
    },
    bulletText: {
      fontSize: 9.5,
      lineHeight: 1.5,
      color: themeConfig.secondary,
      flex: 1,
    },
    educationItem: {
      marginBottom: 12,
    },
    degree: {
      fontSize: 11,
      fontWeight: "semibold",
      color: themeConfig.primary,
      fontFamily: themeConfig.primaryFont,
      marginBottom: 2,
    },
    institution: {
      fontSize: 10,
      color: themeConfig.secondary,
      marginBottom: 2,
    },
    gpa: {
      fontSize: 9,
      color: themeConfig.secondary,
      marginTop: 2,
    },
    toolsList: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 8,
    },
    toolItem: {
      fontSize: 9,
      backgroundColor: themeConfig.skillBg,
      padding: "3 6",
      marginRight: 5,
      marginBottom: 5,
      borderRadius: 3,
      color: themeConfig.skillText,
    },
    languageItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 9.5,
      marginBottom: 4,
      color: themeConfig.secondary,
    },
    divider: {
      borderBottom: `1px solid ${themeConfig.border}`,
      marginTop: 5,
      marginBottom: 5,
    },
    projectTechnologies: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 6,
    },
    footer: {
      position: "absolute",
      bottom: 30,
      left: 35,
      right: 35,
      fontSize: 8,
      color: themeConfig.secondary,
      textAlign: "center",
      borderTop: `0.5px solid ${themeConfig.border}`,
      paddingTop: 8,
    },
  });
};

// Format date function with enhanced formatting
const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

// Create Resume PDF Document with enhanced layout and design
const ResumePDF = ({
  data,
  theme = "professional",
}: {
  data: ResumeData;
  theme?: keyof typeof themeStyles;
}) => {
  const { personalInfo, experiences, education, skillGroups } = data;

  // Generate theme-specific styles
  const styles = createStyles(theme);

  // Create bullet points from description text
  const createBulletPoints = (description: string): string[] => {
    if (!description) return [];

    // If description contains bullet points already (• or - at beginning of lines)
    if (description.includes("\n•") || description.includes("\n-")) {
      return description
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .map((line) => line.trim().replace(/^[•\-]\s*/, ""));
    }

    // Otherwise, split by periods and filter out empty lines
    return description
      .split(".")
      .filter((line) => line.trim().length > 0)
      .map((line) => line.trim());
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Enhanced Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Text style={styles.name}>{personalInfo.fullName}</Text>
              <Text style={styles.title}>{personalInfo.title}</Text>
            </View>

            <View style={styles.headerRight}>
              <View style={styles.contact}>
                <Link src={`mailto:${personalInfo.email}`} style={styles.link}>
                  {personalInfo.email}
                </Link>
                <Text style={styles.contactItem}>{personalInfo.phone}</Text>
                <Text style={styles.contactItem}>{personalInfo.location}</Text>
              </View>

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

          {/* Summary Section with borders */}
          {personalInfo.summary && (
            <View style={styles.summarySection}>
              <Text style={styles.summary}>{personalInfo.summary}</Text>
            </View>
          )}
        </View>

        {/* Main Content with Improved Layout */}
        <View style={styles.contentContainer}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Education Section - Moved to top for professional focus */}
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Education</Text>

              {education.map((edu, index) => (
                <View key={`education-${index}`} style={styles.educationItem}>
                  <Text style={styles.degree}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </Text>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  <Text style={styles.dateRange}>
                    {formatDate(edu.startDate)} -{" "}
                    {edu.endDate ? formatDate(edu.endDate) : "Present"}
                  </Text>
                  {edu.gpa && <Text style={styles.gpa}>GPA: {edu.gpa}</Text>}
                </View>
              ))}
            </View>

            {/* Skills Section with Improved Categorization */}
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

            {/* Languages Section with Visual Improvement */}
            {data.languages && data.languages.length > 0 && (
              <View style={styles.sectionContent}>
                <Text style={styles.sectionTitle}>Languages</Text>

                <View style={{ marginBottom: 10 }}>
                  {data.languages.map((language, index) => (
                    <View key={`language-${index}`} style={styles.languageItem}>
                      <Text>{language.name}</Text>
                      <Text>{language.proficiency}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Tools Section with Better Visualization */}
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Technologies</Text>

              <Text style={styles.categoryTitle}>Tools</Text>
              <View style={styles.toolsList}>
                {[
                  "Git",
                  "GitHub",
                  "Docker",
                  "Linux",
                  "Windows",
                  "AWS",
                  "Azure",
                ].map((tool, index) => (
                  <Text key={`tool-${index}`} style={styles.toolItem}>
                    {tool}
                  </Text>
                ))}
              </View>

              <Text style={styles.categoryTitle}>Frameworks</Text>
              <View style={styles.toolsList}>
                {["React", "Angular", "Node.js", ".NET", "Spring Boot"].map(
                  (framework, index) => (
                    <Text key={`framework-${index}`} style={styles.toolItem}>
                      {framework}
                    </Text>
                  )
                )}
              </View>
            </View>

            {/* Other Section - Interests or Certifications */}
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Certifications</Text>

              <View style={styles.toolsList}>
                <Text style={styles.toolItem}>
                  AWS Certified Solutions Architect
                </Text>
                <Text style={styles.toolItem}>
                  Microsoft Certified: Azure Developer
                </Text>
                <Text style={styles.toolItem}>Scrum Master</Text>
              </View>
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Experience Section with Enhanced Formatting */}
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

                  {/* Format description as bullet points for better readability */}
                  {createBulletPoints(exp.description).map((point, i) => (
                    <View key={`bullet-${i}`} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{point}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            {/* Projects Section with Enhanced Visualization */}
            {data.projects && data.projects.length > 0 && (
              <View style={styles.sectionContent}>
                <Text style={styles.sectionTitle}>Projects</Text>

                {data.projects.map((project, index) => (
                  <View key={`project-${index}`} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.positionTitle}>
                        {project.title}
                        {project.link && (
                          <Link src={project.link} style={styles.link}>
                            <Text
                              style={{
                                fontSize: 8,
                                color: styles.link.color,
                                marginLeft: 4,
                              }}
                            >
                              {" "}
                              [View Project]
                            </Text>
                          </Link>
                        )}
                      </Text>
                      <Text style={styles.dateRange}>
                        {formatDate(project.startDate)} -{" "}
                        {project.currentProject
                          ? "Present"
                          : formatDate(project.endDate)}
                      </Text>
                    </View>

                    {/* Format project description as bullet points */}
                    {createBulletPoints(project.description).map((point, i) => (
                      <View
                        key={`project-bullet-${i}`}
                        style={styles.bulletPoint}
                      >
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{point}</Text>
                      </View>
                    ))}

                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <View style={styles.projectTechnologies}>
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

        {/* Footer with clean design */}
        <View style={styles.footer}>
          <Text>
            {personalInfo.fullName} • Resume generated on{" "}
            {new Date().toLocaleDateString()}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// Enhanced PDF export function with theme support
export const exportResumeToPDF = async (
  data: ResumeData,
  filename: string = "professional-resume.pdf",
  theme: keyof typeof themeStyles = "professional"
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
