// src/components/resume-preview/utils/pdf/components/SkillsSection.tsx
import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { SkillGroup } from "@/types/resume";
import { hasContent } from "../utils";

interface SkillsSectionProps {
  skillGroups?: SkillGroup[];
  styles: Record<string, any>;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skillGroups,
  styles,
}) => {
  // Return null if no skill groups with content
  if (
    !skillGroups ||
    !skillGroups.some((group) =>
      group.skills.some((skill) => hasContent(skill.name))
    )
  ) {
    return null;
  }

  // Filter skill groups with content and organize them for 2-column layout
  const validGroups = skillGroups.filter((group) =>
    group.skills.some((skill) => hasContent(skill.name))
  );

  // Use more compact layouts for more than 2 skill groups
  const useCompactLayout = validGroups.length > 2;

  // For compact layout, we'll use a grid system
  if (useCompactLayout) {
    // Groups eligible for the compact horizontal layout
    const compactGroups = ["Technical", "Tools", "Languages", "Frameworks"];

    // Separate groups into those that should be compact and those that should be standard
    const horizontalGroups = validGroups.filter((group) =>
      compactGroups.includes(group.category)
    );

    const verticalGroups = validGroups.filter(
      (group) => !compactGroups.includes(group.category)
    );

    return (
      <View style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>Skills</Text>

        {/* Render horizontal groups in a compact inline format */}
        {horizontalGroups.map((group, groupIndex) => (
          <View
            key={`horizontal-group-${groupIndex}`}
            style={{ marginBottom: 4 }}
          >
            <Text style={styles.categoryTitle}>{group.category}</Text>
            <View style={styles.inlineSkills}>
              {group.skills
                .filter((skill) => hasContent(skill.name))
                .map((skill, skillIndex) => (
                  <Text
                    key={`skill-${groupIndex}-${skillIndex}`}
                    style={styles.compactSkillItem}
                  >
                    {skill.name}
                  </Text>
                ))}
            </View>
          </View>
        ))}

        {/* Render remaining groups in standard format */}
        {verticalGroups.map((group, groupIndex) => (
          <View
            key={`vertical-group-${groupIndex}`}
            style={{ marginBottom: 4 }}
          >
            <Text style={styles.categoryTitle}>{group.category}</Text>
            <View style={styles.skillContainer}>
              {group.skills
                .filter((skill) => hasContent(skill.name))
                .map((skill, skillIndex) => (
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
    );
  }

  // Standard layout for 1-2 skill groups
  return (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>Skills</Text>

      {validGroups.map((group, groupIndex) => (
        <View key={`skill-group-${groupIndex}`} style={{ marginBottom: 4 }}>
          <Text style={styles.categoryTitle}>{group.category}</Text>
          <View style={styles.skillContainer}>
            {group.skills
              .filter((skill) => hasContent(skill.name))
              .map((skill, skillIndex) => (
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
  );
};
