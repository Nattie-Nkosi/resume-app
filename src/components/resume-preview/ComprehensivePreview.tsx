"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ResumeData } from "@/types/resume";
import {
  Download,
  Printer,
  Copy,
  FileText,
  Palette,
  Layout,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { colorThemes, ThemeKey, LayoutType, ThemeStyles } from "./theme-config";
import {
  StandardLayout,
  CompactLayout,
  ElegantLayout,
  ModernLayout,
} from "./layout";
import {
  copyToClipboard,
  handlePrintDocument,
  exportResumeToSinglePagePDF,
} from "./utils/preview-helpers";

interface ComprehensivePreviewProps {
  data: ResumeData;
}

const ComprehensivePreview: React.FC<ComprehensivePreviewProps> = ({
  data,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>("classic");
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>("compact");
  const [isExporting, setIsExporting] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const theme: ThemeStyles = colorThemes[selectedTheme];

  const handleCopyToClipboard = () => {
    const text = resumeRef.current?.innerText;
    if (text) {
      copyToClipboard(text)
        .then(() => {
          alert("Resume content copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);

      // Generate a filename based on the user's name and current date
      const fullName = data.personalInfo.fullName || "Resume";
      const sanitizedName = fullName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      const date = new Date().toISOString().slice(0, 10);
      const filename = `${sanitizedName}_resume_${date}.pdf`;

      // Use the React-PDF export function with the resume data and selected theme
      if (!resumeRef.current) return;
      await exportResumeToSinglePagePDF(
        resumeRef.current,
        filename,
        data,
        selectedTheme as
          | "classic"
          | "modern"
          | "professional"
          | "minimalist"
          | "creative"
      );
      console.log("Export successful!");
    } catch (error) {
      console.error("Failed to export PDF:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Mobile Controls Toggle */}
      <div className="md:hidden flex justify-end mb-2 print:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowControls(!showControls)}
          aria-label="Toggle controls"
        >
          {showControls ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
          <span className="ml-2">
            {showControls ? "Hide Options" : "Show Options"}
          </span>
        </Button>
      </div>

      {/* Controls - Responsive Container */}
      <div
        className={`flex flex-col gap-4 mb-6 print:hidden ${
          showControls ? "block" : "hidden md:block"
        }`}
      >
        {/* Theme & Layout Selectors - Stack on mobile, row on larger screens */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:items-center">
          <div className="flex items-center">
            <Palette className="mr-2 h-4 w-4 flex-shrink-0" />
            <Select
              defaultValue={selectedTheme}
              onValueChange={(value) => setSelectedTheme(value as ThemeKey)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="minimalist">Minimalist</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center">
            <Layout className="mr-2 h-4 w-4 flex-shrink-0" />
            <Select
              defaultValue={selectedLayout}
              onValueChange={(value) => setSelectedLayout(value as LayoutType)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                {/* <SelectItem value="elegant">Elegant</SelectItem>
                <SelectItem value="modern">Modern</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions - Full width buttons on mobile */}
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          {/* Mobile: Stack vertically at full width */}
          <div className="sm:hidden w-full grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              onClick={handlePrintDocument}
              className="w-full"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>

            <Button
              variant="outline"
              onClick={handleCopyToClipboard}
              className="w-full"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Text
            </Button>

            <Button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="w-full"
            >
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </>
              )}
            </Button>
          </div>

          {/* Tablet/Desktop: Row with tooltips */}
          <div className="hidden sm:flex sm:flex-row gap-2 sm:ml-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={handlePrintDocument}>
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
                  <Button variant="outline" onClick={handleCopyToClipboard}>
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
                  <Button onClick={handleExportPDF} disabled={isExporting}>
                    {isExporting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export as PDF with current theme</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Tabs and Preview Content - Full width and responsive */}
      <Tabs defaultValue="preview" className="print:hidden">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">
            <FileText className="mr-2 h-4 w-4" />
            <span className="hidden xs:inline-block">Preview</span>
          </TabsTrigger>
          <TabsTrigger value="print-view">
            <Printer className="mr-2 h-4 w-4" />
            <span className="hidden xs:inline-block">Print View</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mx-auto">
          <div className="max-w-full overflow-x-auto">
            {selectedLayout === "standard" && (
              <StandardLayout data={data} theme={theme} ref={resumeRef} />
            )}
            {selectedLayout === "compact" && (
              <CompactLayout data={data} theme={theme} ref={resumeRef} />
            )}
            {selectedLayout === "elegant" && (
              <ElegantLayout data={data} theme={theme} ref={resumeRef} />
            )}
            {selectedLayout === "modern" && (
              <ModernLayout data={data} theme={theme} ref={resumeRef} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="print-view">
          <div className="bg-gray-100 p-2 sm:p-4 md:p-8 rounded-lg">
            <div
              className="bg-white shadow-md pdf-preview-container pdf-links pdf-content pdf-image-quality w-full max-w-full overflow-auto"
              ref={printRef}
            >
              <div className="transform-origin-top scale-[0.85] sm:scale-[0.9] md:scale-100">
                {selectedLayout === "standard" && (
                  <StandardLayout
                    data={data}
                    theme={theme}
                    isPrintView={true}
                  />
                )}
                {selectedLayout === "compact" && (
                  <CompactLayout data={data} theme={theme} isPrintView={true} />
                )}
                {selectedLayout === "elegant" && (
                  <ElegantLayout data={data} theme={theme} isPrintView={true} />
                )}
                {selectedLayout === "modern" && (
                  <ModernLayout data={data} theme={theme} isPrintView={true} />
                )}
              </div>
            </div>
            <div className="text-center mt-4 text-gray-500 text-xs sm:text-sm">
              <p>
                A4 Size Preview (Single Page) - Print or Export for Best Results
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Print container - Only shown when printing */}
      <div className="hidden print:block print-container">
        {selectedLayout === "standard" && (
          <StandardLayout data={data} theme={theme} isPrintView={true} />
        )}
        {selectedLayout === "compact" && (
          <CompactLayout data={data} theme={theme} isPrintView={true} />
        )}
        {selectedLayout === "elegant" && (
          <ElegantLayout data={data} theme={theme} isPrintView={true} />
        )}
        {selectedLayout === "modern" && (
          <ModernLayout data={data} theme={theme} isPrintView={true} />
        )}
      </div>
    </div>
  );
};

export default ComprehensivePreview;
