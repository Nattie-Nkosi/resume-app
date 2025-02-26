// src/components/resume-preview/utils/pdf/ResumePDF.tsx
import React from "react";
import { Document, Page, View } from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";
import { ThemeKey, createStyles } from "./theme-styles";

// Import section components
import { HeaderSection } from "./components/HeaderSection";
import { SkillsSection } from "./components/SkillsSection";
import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { CertificatesSection } from "./components/CertificatesSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { LanguagesSection } from "./components/LanguagesSection";
import { ReferencesSection } from "./components/ReferencesSection";

interface ResumePDFProps {
  data: ResumeData;
  theme?: ThemeKey;
}

export const ResumePDF: React.FC<ResumePDFProps> = ({
  data,
  theme = "classic",
}) => {
  // Generate theme-specific styles
  const styles = createStyles(theme);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <HeaderSection
          personalInfo={data.personalInfo}
          styles={styles}
          theme={theme}
        />

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Skills Section */}
            <SkillsSection skillGroups={data.skillGroups} styles={styles} />

            {/* Education Section */}
            <EducationSection education={data.education} styles={styles} />

            {/* Certifications Section */}
            <CertificatesSection
              certificates={data.certificates}
              styles={styles}
            />

            {/* Languages Section */}
            <LanguagesSection languages={data.languages} styles={styles} />
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Experience Section */}
            <ExperienceSection experiences={data.experiences} styles={styles} />

            {/* Projects Section */}
            <ProjectsSection
              projects={data.projects}
              styles={styles}
              theme={theme}
            />

            {/* Achievements Section */}
            <AchievementsSection
              achievements={data.achievements}
              styles={styles}
            />

            {/* References Section - add this section */}
            <ReferencesSection references={data.references} styles={styles} />
          </View>
        </View>
      </Page>
    </Document>
  );
};
