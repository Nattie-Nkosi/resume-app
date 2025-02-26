/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/resume-preview/utils/pdf/components/AchievementsSection.tsx
import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { Achievement } from "@/types/resume";
import { formatDate, hasContent } from "../utils";

interface AchievementsSectionProps {
  achievements?: Achievement[];
  styles: Record<string, any>;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  styles,
}) => {
  // Return null if no achievement entries with content
  if (
    !achievements ||
    !achievements.some((achievement) => hasContent(achievement.title))
  ) {
    return null;
  }

  return (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>Key Achievements</Text>

      {achievements
        .filter((achievement) => hasContent(achievement.title))
        .map((achievement, index) => (
          <View key={`achievement-${index}`} style={styles.achievementItem}>
            <View style={styles.experienceHeader}>
              <Text style={styles.positionTitle}>{achievement.title}</Text>
              <Text style={styles.dateRange}>
                {formatDate(achievement.date)}
              </Text>
            </View>

            {hasContent(achievement.organization) && (
              <Text style={styles.company}>{achievement.organization}</Text>
            )}

            {hasContent(achievement.description) && (
              <Text style={styles.description}>{achievement.description}</Text>
            )}
          </View>
        ))}
    </View>
  );
};
