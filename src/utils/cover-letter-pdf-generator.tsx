// src/utils/cover-letter-pdf-generator.tsx
import React from "react";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { CoverLetter } from "@/types/coverletter";
import { format } from "date-fns";
import { saveAs } from "file-saver";

// Create styles using built-in PDF standard fonts
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "Times-Roman",
  },
  modernPage: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  simplePage: {
    padding: 50,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  creativePage: {
    padding: 40,
    paddingLeft: 50,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  senderInfo: {
    marginBottom: 20,
    textAlign: "right",
  },
  recipientInfo: {
    marginBottom: 20,
  },
  recipientInfoModern: {
    marginBottom: 20,
    borderBottom: "1 solid #dddddd",
    paddingBottom: 15,
  },
  recipientInfoCreative: {
    marginBottom: 20,
    borderLeft: "2 solid #3b82f6",
    paddingLeft: 10,
  },
  subject: {
    marginBottom: 15,
    fontFamily: "Times-Bold",
  },
  subjectModern: {
    marginBottom: 15,
    fontFamily: "Helvetica-Bold",
  },
  greeting: {
    marginBottom: 15,
  },
  paragraph: {
    marginBottom: 10,
  },
  closing: {
    marginTop: 20,
    marginBottom: 5,
  },
  signature: {
    marginTop: 40,
    fontFamily: "Times-Bold",
  },
  signatureModern: {
    marginTop: 40,
    fontFamily: "Helvetica-Bold",
  },
  bold: {
    fontFamily: "Times-Bold",
  },
  boldHelvetica: {
    fontFamily: "Helvetica-Bold",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
    color: "#888888",
  },
});

// Cover Letter PDF Document Component
const CoverLetterDocument = ({
  coverLetter,
  personalInfo,
}: {
  coverLetter: CoverLetter;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
}) => {
  // Choose the right page style based on template
  const getPageStyle = () => {
    switch (coverLetter.template) {
      case "modern":
        return styles.modernPage;
      case "simple":
        return styles.simplePage;
      case "creative":
        return styles.creativePage;
      case "formal":
      default:
        return styles.page;
    }
  };

  // Choose the right recipient info style based on template
  const getRecipientInfoStyle = () => {
    switch (coverLetter.template) {
      case "modern":
        return styles.recipientInfoModern;
      case "creative":
        return styles.recipientInfoCreative;
      default:
        return styles.recipientInfo;
    }
  };

  // Choose the right bold style based on template
  const getBoldStyle = () => {
    switch (coverLetter.template) {
      case "modern":
      case "simple":
      case "creative":
        return styles.boldHelvetica;
      default:
        return styles.bold;
    }
  };

  // Choose the right subject style based on template
  const getSubjectStyle = () => {
    switch (coverLetter.template) {
      case "modern":
      case "simple":
      case "creative":
        return styles.subjectModern;
      default:
        return styles.subject;
    }
  };

  // Choose the right signature style based on template
  const getSignatureStyle = () => {
    switch (coverLetter.template) {
      case "modern":
      case "simple":
      case "creative":
        return styles.signatureModern;
      default:
        return styles.signature;
    }
  };

  // Format date safely
  const formattedDate = () => {
    try {
      return coverLetter.date instanceof Date
        ? format(coverLetter.date, "MMMM d, yyyy")
        : format(new Date(), "MMMM d, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return format(new Date(), "MMMM d, yyyy");
    }
  };

  return (
    <Document>
      <Page size="A4" style={getPageStyle()}>
        {/* Sender Information */}
        <View style={styles.senderInfo}>
          <Text style={getBoldStyle()}>{personalInfo.fullName}</Text>
          <Text>{personalInfo.email}</Text>
          <Text>{personalInfo.phone}</Text>
          <Text>{personalInfo.location}</Text>
          <Text>{formattedDate()}</Text>
        </View>

        {/* Recipient Information */}
        <View style={getRecipientInfoStyle()}>
          {coverLetter.recipientName && (
            <Text>{coverLetter.recipientName}</Text>
          )}
          {coverLetter.recipientTitle && (
            <Text>{coverLetter.recipientTitle}</Text>
          )}
          {coverLetter.companyName && <Text>{coverLetter.companyName}</Text>}
          {coverLetter.companyAddress && (
            <Text>{coverLetter.companyAddress}</Text>
          )}
        </View>

        {/* Subject Line */}
        {coverLetter.subject && (
          <View style={getSubjectStyle()}>
            <Text>Subject: {coverLetter.subject}</Text>
          </View>
        )}

        {/* Greeting */}
        <View style={styles.greeting}>
          <Text>{coverLetter.greeting}</Text>
        </View>

        {/* Introduction */}
        <View style={styles.paragraph}>
          <Text>{coverLetter.introduction}</Text>
        </View>

        {/* Body Paragraphs */}
        {coverLetter.bodyParagraphs.map((paragraph, index) => (
          <View key={index} style={styles.paragraph}>
            <Text>{paragraph}</Text>
          </View>
        ))}

        {/* Conclusion */}
        <View style={styles.paragraph}>
          <Text>{coverLetter.conclusion}</Text>
        </View>

        {/* Closing */}
        <View style={styles.closing}>
          <Text>{coverLetter.closing}</Text>
        </View>

        {/* Signature */}
        <View style={getSignatureStyle()}>
          <Text>{personalInfo.fullName}</Text>
        </View>

        {/* Branding Footer */}
        <View style={styles.footer}>
          <Text>Generated by Nattie&apos;s Resume-App Builder</Text>
        </View>
      </Page>
    </Document>
  );
};

/**
 * Generates and downloads a PDF of the cover letter
 * @param coverLetter - The cover letter data
 * @param personalInfo - The user's personal information
 * @param filename - Optional custom filename
 */
export const generateCoverLetterPDF = async (
  coverLetter: CoverLetter,
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  },
  filename?: string
): Promise<void> => {
  try {
    // Safety check for coverLetter object
    if (!coverLetter) {
      throw new Error("Cover letter data is missing");
    }

    // Ensure date is a valid Date object
    const safeData = {
      ...coverLetter,
      date: coverLetter.date instanceof Date ? coverLetter.date : new Date(),
    };

    // Make sure bodyParagraphs is always an array
    if (
      !Array.isArray(safeData.bodyParagraphs) ||
      safeData.bodyParagraphs.length === 0
    ) {
      safeData.bodyParagraphs = [""];
    }

    // Make sure all fields have default values
    const safeDocument: CoverLetter = {
      recipientName: safeData.recipientName || "",
      recipientTitle: safeData.recipientTitle || "",
      companyName: safeData.companyName || "",
      companyAddress: safeData.companyAddress || "",
      date: safeData.date,
      greeting: safeData.greeting || "Dear Hiring Manager,",
      introduction: safeData.introduction || "",
      bodyParagraphs: safeData.bodyParagraphs,
      conclusion: safeData.conclusion || "",
      closing: safeData.closing || "Sincerely,",
      subject: safeData.subject || "",
      jobTitle: safeData.jobTitle || "",
      jobReference: safeData.jobReference || "",
      template: safeData.template || "formal",
    };

    // Make sure personal info is complete
    const safePersonalInfo = {
      fullName: personalInfo.fullName || "Applicant Name",
      email: personalInfo.email || "email@example.com",
      phone: personalInfo.phone || "",
      location: personalInfo.location || "",
    };

    // Generate file name if not provided
    const pdfFilename =
      filename ||
      formatCoverLetterFilename(safeDocument, safePersonalInfo.fullName);

    // Create PDF blob
    const blob = await pdf(
      <CoverLetterDocument
        coverLetter={safeDocument}
        personalInfo={safePersonalInfo}
      />
    ).toBlob();

    // Safety check for blob
    if (!blob) {
      throw new Error("Failed to generate PDF blob");
    }

    // Save the file
    saveAs(blob, pdfFilename);

    return Promise.resolve();
  } catch (error) {
    console.error("Error generating PDF:", error);
    return Promise.reject(error);
  }
};

/**
 * Formats the cover letter filename based on user data
 */
export const formatCoverLetterFilename = (
  coverLetter: CoverLetter,
  fullName: string
): string => {
  const name = fullName ? fullName.replace(/\s+/g, "_").toLowerCase() : "user";
  const company = coverLetter.companyName
    ? `_${coverLetter.companyName.replace(/\s+/g, "_").toLowerCase()}`
    : "";
  const date = new Date().toISOString().split("T")[0];

  return `cover_letter_${name}${company}_${date}.pdf`;
};
