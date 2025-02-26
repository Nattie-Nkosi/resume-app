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

  return (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>Skills</Text>

      {skillGroups
        .filter((group) => group.skills.some((skill) => hasContent(skill.name)))
        .map((group, groupIndex) => (
          <View key={`skill-group-${groupIndex}`} style={{ marginBottom: 12 }}>
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
