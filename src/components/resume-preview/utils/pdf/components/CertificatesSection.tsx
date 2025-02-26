// src/components/resume-preview/utils/pdf/components/CertificatesSection.tsx
import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { Certificate } from "@/types/resume";
import { formatDate, hasContent } from "../utils";

interface CertificatesSectionProps {
  certificates?: Certificate[];
  styles: Record<string, any>;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates,
  styles,
}) => {
  // Return null if no certificate entries with content
  if (!certificates || !certificates.some((cert) => hasContent(cert.name))) {
    return null;
  }

  return (
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>Certifications</Text>

      {certificates
        .filter((cert) => hasContent(cert.name))
        .map((cert, index) => (
          <View key={`cert-${index}`} style={styles.certificateItem}>
            <Text style={styles.degree}>{cert.name}</Text>
            {hasContent(cert.issuer) && (
              <Text style={styles.institution}>{cert.issuer}</Text>
            )}
            <Text style={styles.dateRange}>
              {formatDate(cert.date)}
              {hasContent(cert.expiration) &&
                cert.expiration &&
                ` - ${formatDate(cert.expiration)}`}
            </Text>
            {hasContent(cert.credentialId) && (
              <Text style={styles.description}>ID: {cert.credentialId}</Text>
            )}
          </View>
        ))}
    </View>
  );
};
