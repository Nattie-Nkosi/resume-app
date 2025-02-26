/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/resume-preview/utils/pdf/components/ProjectsSection.tsx
import React from "react";
import { View, Text, Link } from "@react-pdf/renderer";
import { Project } from "@/types/resume";
import { formatDate, hasContent } from "../utils";
import { ThemeKey, themeStyles } from "../theme-styles";

interface ProjectsSectionProps {
  projects?: Project[];
  styles: Record<string, any>;
  theme: ThemeKey;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  styles,
  theme,
}) => {
  // Return null if no project entries with content
  if (!projects || !projects.some((project) => hasContent(project.title))) {
    return null;
  }

  return (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>Projects</Text>

      {projects
        .filter((project) => hasContent(project.title))
        .map((project, index) => (
          <View key={`project-${index}`} style={styles.projectItem}>
            <View style={styles.experienceHeader}>
              <Text style={styles.positionTitle}>
                {project.title}
                {hasContent(project.link) && (
                  <Link src={project.link} style={styles.link}>
                    <Text
                      style={{ fontSize: 8, color: themeStyles[theme].link }}
                    >
                      {" "}
                      [Link]
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

            {hasContent(project.description) && (
              <Text style={styles.description}>{project.description}</Text>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <View style={[styles.skillContainer, { marginTop: 5 }]}>
                {project.technologies.map((tech, techIndex) => (
                  <Text
                    key={`tech-${index}-${techIndex}`}
                    style={styles.techItem}
                  >
                    {tech}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}
    </View>
  );
};
