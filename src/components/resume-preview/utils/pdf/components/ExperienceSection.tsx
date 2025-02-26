/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/resume-preview/utils/pdf/components/ExperienceSection.tsx
import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { Experience } from "@/types/resume";
import { formatDate, hasContent } from "../utils";

interface ExperienceSectionProps {
  experiences?: Experience[];
  styles: Record<string, any>;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  styles,
}) => {
  // Return null if no experience entries with content
  if (
    !experiences ||
    !experiences.some(
      (exp) => hasContent(exp.company) || hasContent(exp.position)
    )
  ) {
    return null;
  }

  return (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>Professional Experience</Text>

      {experiences
        .filter((exp) => hasContent(exp.company) || hasContent(exp.position))
        .map((exp, index) => (
          <View key={`experience-${index}`} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <Text style={styles.positionTitle}>{exp.position}</Text>
              <Text style={styles.dateRange}>
                {formatDate(exp.startDate)} -{" "}
                {exp.currentJob ? "Present" : formatDate(exp.endDate)}
              </Text>
            </View>
            <Text style={styles.company}>
              {exp.company}
              {hasContent(exp.location) ? `, ${exp.location}` : ""}
            </Text>
            {hasContent(exp.description) && (
              <Text style={styles.description}>{exp.description}</Text>
            )}
          </View>
        ))}
    </View>
  );
};
