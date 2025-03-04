export interface CoverLetter {
  // Header information
  recipientName: string;
  recipientTitle?: string;
  companyName: string;
  companyAddress?: string;
  date: Date;  // Changed from string to Date

  // Greeting
  greeting: string;

  // Content sections
  introduction: string;
  bodyParagraphs: string[];
  conclusion: string;

  // Closing
  closing: string;

  // Optional additional fields
  subject?: string;
  jobTitle?: string;
  jobReference?: string;

  // Template and formatting options
  template: "formal" | "modern" | "creative" | "simple";
  fontFamily?: string;
  fontSize?: string;

  // Metadata
  lastModified?: Date;
  isDefault?: boolean;
}

// Default cover letter template
export const defaultCoverLetter: CoverLetter = {
  recipientName: "",
  recipientTitle: "",
  companyName: "",
  companyAddress: "",
  date: new Date(), // Changed to actual Date object

  greeting: "Dear Hiring Manager,",

  introduction: "I am writing to express my interest in the [Position] role at [Company]. With my background in [Field/Skill] and passion for [Industry/Area], I believe I would be a valuable addition to your team.",

  bodyParagraphs: [
    "Throughout my career, I have developed strong skills in [Key Skill 1], [Key Skill 2], and [Key Skill 3]. My experience at [Previous Company/Experience] has prepared me well for this position, as I have [Relevant Achievement or Experience].",

    "I am particularly drawn to [Company] because of [Specific Reason - company values, projects, reputation, etc.]. I am confident that my [Specific Skills or Qualities] align well with what you are looking for in this role."
  ],

  conclusion: "Thank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and enthusiasm would benefit your team at [Company].",

  closing: "Sincerely,",

  subject: "Application for [Position] Position",
  jobTitle: "",
  jobReference: "",

  template: "formal"
};