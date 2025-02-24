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
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { colorThemes, ThemeKey, LayoutType } from "./theme-config";
import {
  StandardLayout,
  CompactLayout,
  ElegantLayout,
  ModernLayout,
} from "./layout";
import { copyToClipboard, handlePrintDocument } from "./utils/preview-helpers";

interface ComprehensivePreviewProps {
  data: ResumeData;
}

const ComprehensivePreview: React.FC<ComprehensivePreviewProps> = ({
  data,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>("classic");
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>("standard");
  const resumeRef = useRef<HTMLDivElement>(null);
  const theme = colorThemes[selectedTheme];

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

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 print:hidden">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center">
            <Palette className="mr-2 h-4 w-4" />
            <Select
              defaultValue={selectedTheme}
              onValueChange={(value) => setSelectedTheme(value as ThemeKey)}
            >
              <SelectTrigger className="w-[180px]">
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
            <Layout className="mr-2 h-4 w-4" />
            <Select
              defaultValue={selectedLayout}
              onValueChange={(value) => setSelectedLayout(value as LayoutType)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="elegant">Elegant</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
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
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export as PDF</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Tabs defaultValue="preview" className="print:hidden">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">
            <FileText className="mr-2 h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="print-view">
            <Printer className="mr-2 h-4 w-4" />
            Print View
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
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
        </TabsContent>
        <TabsContent value="print-view">
          <div className="bg-gray-100 p-8 rounded-lg">
            <div className="bg-white shadow-md w-[21cm] h-[29.7cm] mx-auto overflow-hidden">
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
            <div className="text-center mt-4 text-gray-500">
              <p>A4 Size Preview - Print or Export for Best Results</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="hidden print:block">
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
