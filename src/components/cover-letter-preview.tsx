"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CoverLetter } from "@/types/coverletter";
import { format } from "date-fns";
import { Download, Printer, Copy, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CoverLetterPreviewProps {
  coverLetter: CoverLetter;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
}

const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({
  coverLetter,
  personalInfo,
}) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Function to handle printing
  const handlePrint = () => {
    if (previewRef.current) {
      setIsPrinting(true);
      setTimeout(() => {
        window.print();
        setIsPrinting(false);
      }, 100);
    }
  };

  // Function to copy text to clipboard
  const handleCopy = async () => {
    if (previewRef.current) {
      try {
        await navigator.clipboard.writeText(previewRef.current.innerText);
        alert("Cover letter copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  // Function to download as PDF
  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const { generateCoverLetterPDF } = await import(
        "@/utils/cover-letter-pdf-generator"
      );
      await generateCoverLetterPDF(coverLetter, personalInfo);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Show a more user-friendly error message
      alert(
        "There was a problem generating your PDF. Please check your cover letter content and try again."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  // Get template-specific styles
  const getTemplateStyles = () => {
    switch (coverLetter.template) {
      case "modern":
        return {
          container: "font-sans",
          header: "border-b-2 border-muted pb-4 mb-6",
          body: "space-y-4 leading-relaxed",
          fontClass: "font-sans",
        };
      case "creative":
        return {
          container: "font-serif",
          header: "border-l-4 border-primary pl-4 mb-6",
          body: "space-y-4 leading-loose",
          fontClass: "font-serif",
        };
      case "simple":
        return {
          container: "font-sans",
          header: "mb-6",
          body: "space-y-3 leading-normal",
          fontClass: "font-sans",
        };
      case "formal":
      default:
        return {
          container: "font-serif",
          header: "mb-6",
          body: "space-y-4 leading-relaxed",
          fontClass: "font-serif",
        };
    }
  };

  const templateStyles = getTemplateStyles();

  return (
    <div className="space-y-4">
      {/* Control buttons - hidden during print */}
      <div className="flex gap-2 justify-end print:hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy content to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Print or save as PDF</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleDownload} disabled={isDownloading}>
                {isDownloading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download as PDF</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Cover Letter Preview */}
      <Card
        className={cn(
          "p-8 max-w-full bg-card print:shadow-none",
          templateStyles.container,
          isPrinting ? "print-mode" : ""
        )}
      >
        <div ref={previewRef} className="space-y-6 text-card-foreground">
          {/* Sender Information */}
          <div className="text-right mb-8">
            <p className="font-bold">{personalInfo.fullName}</p>
            <p>{personalInfo.email}</p>
            <p>{personalInfo.phone}</p>
            <p>{personalInfo.location}</p>
            <p>
              {coverLetter.date ? format(coverLetter.date, "MMMM d, yyyy") : ""}
            </p>
          </div>

          {/* Recipient Information */}
          <div className={templateStyles.header}>
            {coverLetter.recipientName && <p>{coverLetter.recipientName}</p>}
            {coverLetter.recipientTitle && <p>{coverLetter.recipientTitle}</p>}
            {coverLetter.companyName && <p>{coverLetter.companyName}</p>}
            {coverLetter.companyAddress && (
              <p className="whitespace-pre-line">
                {coverLetter.companyAddress}
              </p>
            )}
          </div>

          {/* Subject (if applicable) */}
          {coverLetter.subject && (
            <div className="font-bold">
              <p>Subject: {coverLetter.subject}</p>
            </div>
          )}

          {/* Letter Content */}
          <div className={templateStyles.body}>
            {/* Greeting */}
            <p>{coverLetter.greeting}</p>

            {/* Introduction */}
            <p className="whitespace-pre-line">{coverLetter.introduction}</p>

            {/* Body Paragraphs */}
            {coverLetter.bodyParagraphs.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}

            {/* Conclusion */}
            <p className="whitespace-pre-line">{coverLetter.conclusion}</p>

            {/* Closing */}
            <div className="mt-8">
              <p>{coverLetter.closing}</p>
              <p className="mt-6 font-bold">{personalInfo.fullName}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-mode,
          .print-mode * {
            visibility: visible;
            color: black !important;
            background-color: white !important;
          }
          .print-mode {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default CoverLetterPreview;
