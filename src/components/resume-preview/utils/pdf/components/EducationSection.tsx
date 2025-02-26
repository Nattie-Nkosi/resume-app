/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/resume-preview/utils/pdf/components/EducationSection.tsx
import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { Education } from "@/types/resume";
import { formatDate, hasContent } from "../utils";

interface EducationSectionProps {
  education?: Education[];
  styles: Record<string, any>;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  styles,
}) => {
  // Return null if no education entries with content
  if (
    !education ||
    !education.some(
      (edu) => hasContent(edu.institution) || hasContent(edu.degree)
    )
  ) {
    return null;
  }

  return (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>Education</Text>

      {education
        .filter((edu) => hasContent(edu.institution) || hasContent(edu.degree))
        .map((edu, index) => (
          <View key={`education-${index}`} style={styles.educationItem}>
            <Text style={styles.degree}>
              {edu.degree} {hasContent(edu.field) ? `in ${edu.field}` : ""}
            </Text>
            <Text style={styles.institution}>{edu.institution}</Text>
            <Text style={styles.dateRange}>
              {formatDate(edu.startDate)} -{" "}
              {edu.currentlyEnrolled ? "Present" : formatDate(edu.endDate)}
            </Text>
            {hasContent(edu.gpa) && (
              <Text style={styles.description}>GPA: {edu.gpa}</Text>
            )}
            {hasContent(edu.achievements) && (
              <Text style={styles.description}>{edu.achievements}</Text>
            )}
          </View>
        ))}
    </View>
  );
};
