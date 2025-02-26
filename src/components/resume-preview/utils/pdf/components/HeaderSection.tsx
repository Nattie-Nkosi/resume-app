/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/resume-preview/utils/pdf/components/HeaderSection.tsx
import React from "react";
import { View, Text, Link } from "@react-pdf/renderer";
import { PersonalInfo } from "@/types/resume";
import { ThemeKey } from "../theme-styles";
import { hasContent } from "../utils";

interface HeaderSectionProps {
  personalInfo: PersonalInfo;
  styles: Record<string, any>;
  theme: ThemeKey;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  personalInfo,
  styles,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.name}>{personalInfo.fullName}</Text>
        {hasContent(personalInfo.title) && (
          <Text style={styles.title}>{personalInfo.title}</Text>
        )}

        {/* Summary */}
        {hasContent(personalInfo.summary) && (
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
          {hasContent(personalInfo.linkedin) && (
            <Link src={personalInfo.linkedin} style={styles.socialLink}>
              LinkedIn
            </Link>
          )}
          {hasContent(personalInfo.github) && (
            <Link src={personalInfo.github} style={styles.socialLink}>
              GitHub
            </Link>
          )}
          {hasContent(personalInfo.portfolio) && (
            <Link src={personalInfo.portfolio} style={styles.socialLink}>
              Portfolio
            </Link>
          )}
        </View>
      </View>
    </View>
  );
};
