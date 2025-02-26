// src/components/resume-preview/utils/pdf/components/LanguagesSection.tsx
import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { Language } from "@/types/resume";
import { hasContent } from "../utils";

interface LanguagesSectionProps {
  languages?: Language[];
  styles: Record<string, any>;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  languages,
  styles,
}) => {
  // Return null if no language entries with content
  if (!languages || !languages.some((lang) => hasContent(lang.name))) {
    return null;
  }

  return (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>Languages</Text>

      <View style={{ marginBottom: 10 }}>
        {languages
          .filter((lang) => hasContent(lang.name))
          .map((lang, index) => (
            <Text key={`language-${index}`} style={styles.languageItem}>
              {lang.name} • {lang.proficiency}
            </Text>
          ))}
      </View>
    </View>
  );
};
