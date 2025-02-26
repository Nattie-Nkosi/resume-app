// src/components/resume-preview/utils/pdf/components/ReferencesSection.tsx
import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { Reference } from "@/types/resume";
import { hasContent } from "../utils";

interface ReferencesSectionProps {
  references?: Reference[];
  styles: Record<string, any>;
}

export const ReferencesSection: React.FC<ReferencesSectionProps> = ({
  references,
  styles,
}) => {
  // Return null if no reference entries with content
  if (!references || !references.some((ref) => hasContent(ref.name))) {
    return null;
  }

  return (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>References</Text>

      <View style={{ flexDirection: "column" }}>
        {references
          .filter((ref) => hasContent(ref.name))
          .map((ref, index) => (
            <View
              key={`reference-${index}`}
              style={{
                marginBottom: 7,
                borderLeft: `1.5px solid ${
                  styles.experienceItem.borderLeft.split(" ")[3]
                }`,
                paddingLeft: 5,
              }}
            >
              <View style={styles.experienceHeader}>
                <Text style={styles.positionTitle}>{ref.name}</Text>
              </View>

              <Text style={styles.company}>
                {ref.position} • {ref.company}
              </Text>

              <Text style={styles.description}>{ref.relationship}</Text>

              <Text
                style={[
                  styles.description,
                  { fontWeight: "medium", marginTop: 1 },
                ]}
              >
                Contact: {ref.contact}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
};
