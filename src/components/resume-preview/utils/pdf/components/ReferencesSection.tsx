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

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {references
          .filter((ref) => hasContent(ref.name))
          .map((ref, index) => (
            <View
              key={`reference-${index}`}
              style={{
                width: references.length > 1 ? "50%" : "100%",
                paddingRight: references.length > 1 ? 5 : 0,
                marginBottom: 8,
              }}
            >
              <Text style={styles.degree}>{ref.name}</Text>

              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.company, { marginRight: 2 }]}>
                  {ref.position}
                </Text>
                <Text style={styles.company}>• {ref.company}</Text>
              </View>

              <Text style={styles.description}>{ref.relationship}</Text>

              <Text style={[styles.description, { marginTop: 1 }]}>
                Contact: {ref.contact}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
};
