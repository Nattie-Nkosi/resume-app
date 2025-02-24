"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { formatDate } from "@/lib/utils";
import {
  LinkedinIcon,
  GithubIcon,
  Globe,
  Link2,
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

// Color themes
const colorThemes = {
  classic: {
    primary: "text-gray-900",
    secondary: "text-gray-600",
    accent: "bg-gray-100 text-gray-700",
    border: "border-gray-200",
    heading: "text-gray-900",
    link: "text-blue-600 hover:text-blue-800",
  },
  modern: {
    primary: "text-slate-900",
    secondary: "text-slate-600",
    accent: "bg-slate-100 text-slate-700",
    border: "border-slate-200",
    heading: "text-slate-800",
    link: "text-indigo-600 hover:text-indigo-800",
  },
  professional: {
    primary: "text-stone-900",
    secondary: "text-stone-600",
    accent: "bg-stone-100 text-stone-700",
    border: "border-stone-200",
    heading: "text-stone-800",
    link: "text-emerald-700 hover:text-emerald-900",
  },
  minimalist: {
    primary: "text-zinc-900",
    secondary: "text-zinc-500",
    accent: "bg-zinc-100 text-zinc-700",
    border: "border-zinc-100",
    heading: "text-zinc-800",
    link: "text-zinc-700 hover:text-zinc-900",
  },
  creative: {
    primary: "text-purple-900",
    secondary: "text-purple-600",
    accent: "bg-purple-100 text-purple-700",
    border: "border-purple-200",
    heading: "text-purple-800",
    link: "text-pink-600 hover:text-pink-800",
  },
};

type ThemeKey = keyof typeof colorThemes;

// Layout templates
const layoutTemplates = ["standard", "compact", "elegant", "modern"];

interface PreviewProps {
  data: ResumeData;
}

const ComprehensivePreview: React.FC<PreviewProps> = ({ data }) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>("classic");
  const [selectedLayout, setSelectedLayout] = useState("standard");
  const resumeRef = useRef<HTMLDivElement>(null);
  const theme = colorThemes[selectedTheme];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyToClipboard = () => {
    const text = resumeRef.current?.innerText;
    if (text) {
      navigator.clipboard
        .writeText(text)
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
              onValueChange={setSelectedLayout}
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

// Standard Layout
const StandardLayout = React.forwardRef<
  HTMLDivElement,
  { data: ResumeData; theme: any; isPrintView?: boolean }
>(({ data, theme, isPrintView = false }, ref) => {
  const { personalInfo, experiences, education, skillGroups } = data;
  const containerClass = isPrintView
    ? "p-8 max-w-full"
    : "w-full max-w-4xl mx-auto";

  return (
    <Card className={`bg-white shadow-lg ${containerClass}`}>
      <CardContent className="p-8" ref={ref}>
        {/* Header/Personal Info */}
        <div className={`border-b ${theme.border} pb-6 mb-6`}>
          <h1 className={`text-3xl font-bold ${theme.heading} mb-2`}>
            {personalInfo.fullName}
          </h1>
          {personalInfo.title && (
            <h2 className={`text-xl ${theme.secondary} mb-3`}>
              {personalInfo.title}
            </h2>
          )}
          <div className={`text-sm ${theme.secondary} space-y-2`}>
            <div className="flex items-center gap-2 flex-wrap">
              <span>{personalInfo.email}</span>
              <span>•</span>
              <span>{personalInfo.phone}</span>
              <span>•</span>
              <span>{personalInfo.location}</span>
            </div>
            {/* Social Links */}
            {(personalInfo.linkedin ||
              personalInfo.github ||
              personalInfo.portfolio ||
              personalInfo.additionalLink) && (
              <div className="flex items-center gap-4 flex-wrap pt-2">
                {personalInfo.linkedin && (
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 ${theme.link}`}
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {personalInfo.github && (
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 ${theme.link}`}
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {personalInfo.portfolio && (
                  <a
                    href={personalInfo.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 ${theme.link}`}
                  >
                    <Globe className="w-4 h-4" />
                    <span>Portfolio</span>
                  </a>
                )}
                {personalInfo.additionalLink && (
                  <a
                    href={personalInfo.additionalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 ${theme.link}`}
                  >
                    <Link2 className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                )}
              </div>
            )}
          </div>
          {personalInfo.summary && (
            <p className={`mt-4 ${theme.primary} leading-relaxed`}>
              {personalInfo.summary}
            </p>
          )}
        </div>

        {/* Experience Section */}
        {experiences.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-xl font-semibold ${theme.heading} mb-4`}>
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`border-b ${theme.border} last:border-0 pb-4`}
                >
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className={`font-medium ${theme.primary}`}>
                        {exp.position}
                      </h3>
                      <div className={theme.secondary}>{exp.company}</div>
                    </div>
                    <div
                      className={`text-sm ${theme.secondary} whitespace-nowrap`}
                    >
                      {formatDate(exp.startDate)} -{" "}
                      {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </div>
                  </div>
                  <div className={`text-sm ${theme.secondary} mt-1`}>
                    {exp.location}
                  </div>
                  <p
                    className={`mt-2 ${theme.primary} whitespace-pre-line leading-relaxed`}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-xl font-semibold ${theme.heading} mb-4`}>
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className={`border-b ${theme.border} last:border-0 pb-4`}
                >
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className={`font-medium ${theme.primary}`}>
                        {edu.degree} in {edu.field}
                      </h3>
                      <div className={theme.secondary}>{edu.institution}</div>
                    </div>
                    <div
                      className={`text-sm ${theme.secondary} whitespace-nowrap`}
                    >
                      {formatDate(edu.startDate)} -{" "}
                      {edu.endDate ? formatDate(edu.endDate) : "Present"}
                    </div>
                  </div>
                  <div className={`text-sm ${theme.secondary} mt-1`}>
                    {edu.location}
                  </div>
                  {edu.gpa && (
                    <div className={`text-sm ${theme.secondary} mt-1`}>
                      GPA: {edu.gpa}
                    </div>
                  )}
                  {edu.achievements && (
                    <p className={`mt-2 ${theme.primary} leading-relaxed`}>
                      {edu.achievements}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skillGroups.length > 0 && (
          <div>
            <h2 className={`text-xl font-semibold ${theme.heading} mb-4`}>
              Skills
            </h2>
            <div className="space-y-4">
              {skillGroups.map((group, index) => (
                <div
                  key={index}
                  className={`border-b ${theme.border} last:border-0 pb-4`}
                >
                  <h3 className={`font-medium ${theme.primary} mb-2`}>
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className={`${theme.accent} px-3 py-1 rounded-full text-sm`}
                      >
                        {skill.name}
                        <span className={`${theme.secondary} ml-1`}>•</span>
                        <span className={`${theme.secondary} ml-1`}>
                          {skill.proficiency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});
StandardLayout.displayName = "StandardLayout";

// Compact Layout
const CompactLayout = React.forwardRef<
  HTMLDivElement,
  { data: ResumeData; theme: any; isPrintView?: boolean }
>(({ data, theme, isPrintView = false }, ref) => {
  const { personalInfo, experiences, education, skillGroups } = data;
  const containerClass = isPrintView
    ? "p-6 max-w-full"
    : "w-full max-w-4xl mx-auto";

  return (
    <Card className={`bg-white shadow-lg ${containerClass}`}>
      <CardContent className="p-6" ref={ref}>
        {/* Header - Compact Version */}
        <div className="mb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <h1 className={`text-2xl font-bold ${theme.heading}`}>
                {personalInfo.fullName}
              </h1>
              {personalInfo.title && (
                <p className={`text-base ${theme.secondary}`}>
                  {personalInfo.title}
                </p>
              )}
            </div>
            <div
              className={`text-sm ${theme.secondary} text-right mt-2 md:mt-0`}
            >
              <div>{personalInfo.email}</div>
              <div>{personalInfo.phone}</div>
              <div>{personalInfo.location}</div>
            </div>
          </div>

          {/* Social links in a row */}
          {(personalInfo.linkedin ||
            personalInfo.github ||
            personalInfo.portfolio ||
            personalInfo.additionalLink) && (
            <div className="flex gap-3 mt-2 flex-wrap">
              {personalInfo.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={theme.link}
                >
                  <LinkedinIcon className="w-4 h-4 inline mr-1" />
                  LinkedIn
                </a>
              )}
              {personalInfo.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={theme.link}
                >
                  <GithubIcon className="w-4 h-4 inline mr-1" />
                  GitHub
                </a>
              )}
              {personalInfo.portfolio && (
                <a
                  href={personalInfo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={theme.link}
                >
                  <Globe className="w-4 h-4 inline mr-1" />
                  Portfolio
                </a>
              )}
              {personalInfo.additionalLink && (
                <a
                  href={personalInfo.additionalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={theme.link}
                >
                  <Link2 className="w-4 h-4 inline mr-1" />
                  Website
                </a>
              )}
            </div>
          )}
        </div>

        {/* Professional Summary - if present */}
        {personalInfo.summary && (
          <div className={`mb-4 p-3 ${theme.accent} rounded`}>
            <p className={`text-sm ${theme.primary}`}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Two-column layout for the main content on wider screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left column: Skills and Education */}
          <div className="space-y-4">
            {/* Skills Section */}
            {skillGroups.length > 0 && (
              <div>
                <h2
                  className={`text-lg font-semibold ${theme.heading} mb-2 pb-1 border-b ${theme.border}`}
                >
                  Skills
                </h2>
                <div className="space-y-3">
                  {skillGroups.map((group, index) => (
                    <div key={index} className="mb-2">
                      <h3
                        className={`font-medium ${theme.primary} text-sm mb-1`}
                      >
                        {group.category}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {group.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="text-xs">
                            <span>{skill.name}</span>
                            <span className={`${theme.secondary} text-xs ml-1`}>
                              ({skill.proficiency})
                            </span>
                            {skillIndex < group.skills.length - 1 && (
                              <span className="mr-1">,</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <div>
                <h2
                  className={`text-lg font-semibold ${theme.heading} mb-2 pb-1 border-b ${theme.border}`}
                >
                  Education
                </h2>
                <div className="space-y-3">
                  {education.map((edu, index) => (
                    <div key={index} className="mb-2">
                      <h3 className={`font-medium ${theme.primary} text-sm`}>
                        {edu.degree} in {edu.field}
                      </h3>
                      <div className={`${theme.secondary} text-xs`}>
                        {edu.institution}
                      </div>
                      <div className={`${theme.secondary} text-xs`}>
                        {formatDate(edu.startDate)} -{" "}
                        {edu.endDate ? formatDate(edu.endDate) : "Present"}
                      </div>
                      {edu.gpa && (
                        <div className={`${theme.secondary} text-xs`}>
                          GPA: {edu.gpa}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column: Experience */}
          <div className="md:col-span-2">
            {/* Experience Section */}
            {experiences.length > 0 && (
              <div>
                <h2
                  className={`text-lg font-semibold ${theme.heading} mb-2 pb-1 border-b ${theme.border}`}
                >
                  Professional Experience
                </h2>
                <div className="space-y-3">
                  {experiences.map((exp, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between items-start flex-wrap">
                        <h3 className={`font-medium ${theme.primary} text-sm`}>
                          {exp.position}
                        </h3>
                        <div className={`${theme.secondary} text-xs`}>
                          {formatDate(exp.startDate)} -{" "}
                          {exp.endDate ? formatDate(exp.endDate) : "Present"}
                        </div>
                      </div>
                      <div className={`${theme.secondary} text-xs mb-1`}>
                        {exp.company}, {exp.location}
                      </div>
                      <p
                        className={`text-xs ${theme.primary} whitespace-pre-line`}
                      >
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
CompactLayout.displayName = "CompactLayout";

// Elegant Layout
const ElegantLayout = React.forwardRef<
  HTMLDivElement,
  { data: ResumeData; theme: any; isPrintView?: boolean }
>(({ data, theme, isPrintView = false }, ref) => {
  const { personalInfo, experiences, education, skillGroups } = data;
  const containerClass = isPrintView
    ? "p-8 max-w-full"
    : "w-full max-w-4xl mx-auto";

  return (
    <Card className={`bg-white shadow-lg ${containerClass}`}>
      <CardContent className="p-8" ref={ref}>
        {/* Elegant Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold ${theme.heading} tracking-wide`}>
            {personalInfo.fullName}
          </h1>
          {personalInfo.title && (
            <h2 className={`text-xl ${theme.secondary} mt-1`}>
              {personalInfo.title}
            </h2>
          )}
          <div
            className={`flex justify-center flex-wrap gap-x-4 mt-3 text-sm ${theme.secondary}`}
          >
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>

          {/* Social links centered */}
          {(personalInfo.linkedin ||
            personalInfo.github ||
            personalInfo.portfolio ||
            personalInfo.additionalLink) && (
            <div className="flex justify-center gap-6 mt-3">
              {personalInfo.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={theme.link}
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              )}
              {personalInfo.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={theme.link}
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              )}
              {personalInfo.portfolio && (
                <a
                  href={personalInfo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={theme.link}
                >
                  <Globe className="w-5 h-5" />
                </a>
              )}
              {personalInfo.additionalLink && (
                <a
                  href={personalInfo.additionalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={theme.link}
                >
                  <Link2 className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Summary with decorative line */}
        {personalInfo.summary && (
          <div className="mb-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${theme.border}`}></div>
            </div>
            <div className="relative flex justify-center">
              <span
                className={`px-4 text-sm font-medium ${theme.heading} bg-white`}
              >
                PROFESSIONAL SUMMARY
              </span>
            </div>
            <p className={`mt-6 ${theme.primary} text-center leading-relaxed`}>
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience Section */}
        {experiences.length > 0 && (
          <div className="mb-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${theme.border}`}></div>
              </div>
              <div className="relative flex justify-center">
                <span
                  className={`px-4 text-sm font-medium ${theme.heading} bg-white`}
                >
                  EXPERIENCE
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className={`font-semibold ${theme.primary}`}>
                      {exp.position}
                    </h3>
                    <span className={`text-sm ${theme.secondary}`}>
                      {formatDate(exp.startDate)} -{" "}
                      {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </span>
                  </div>
                  <div
                    className={`text-sm ${theme.secondary} font-medium mb-2`}
                  >
                    {exp.company} | {exp.location}
                  </div>
                  <p
                    className={`${theme.primary} whitespace-pre-line leading-relaxed`}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two columns for Education and Skills */}
        {/* Two columns for Education and Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Section */}
          {education.length > 0 && (
            <div>
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${theme.border}`}></div>
                </div>
                <div className="relative flex justify-center">
                  <span
                    className={`px-4 text-sm font-medium ${theme.heading} bg-white`}
                  >
                    EDUCATION
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className={`font-semibold ${theme.primary}`}>
                      {edu.degree} in {edu.field}
                    </h3>
                    <div className={`text-sm ${theme.secondary} font-medium`}>
                      {edu.institution}
                    </div>
                    <div className={`text-sm ${theme.secondary}`}>
                      {formatDate(edu.startDate)} -{" "}
                      {edu.endDate ? formatDate(edu.endDate) : "Present"}
                    </div>
                    {edu.gpa && (
                      <div className={`text-sm ${theme.secondary}`}>
                        GPA: {edu.gpa}
                      </div>
                    )}
                    {edu.achievements && (
                      <p className={`mt-1 text-sm ${theme.primary}`}>
                        {edu.achievements}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {skillGroups.length > 0 && (
            <div>
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${theme.border}`}></div>
                </div>
                <div className="relative flex justify-center">
                  <span
                    className={`px-4 text-sm font-medium ${theme.heading} bg-white`}
                  >
                    SKILLS
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {skillGroups.map((group, index) => (
                  <div key={index}>
                    <h3 className={`font-medium ${theme.primary} mb-2`}>
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`inline-block px-3 py-1 rounded-full text-sm ${theme.accent}`}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
ElegantLayout.displayName = "ElegantLayout";

// Modern Layout
const ModernLayout = React.forwardRef<
  HTMLDivElement,
  { data: ResumeData; theme: any; isPrintView?: boolean }
>(({ data, theme, isPrintView = false }, ref) => {
  const { personalInfo, experiences, education, skillGroups } = data;
  const containerClass = isPrintView
    ? "max-w-full"
    : "w-full max-w-4xl mx-auto";

  return (
    <Card className={`bg-white shadow-lg ${containerClass}`}>
      <div className="flex flex-col md:flex-row" ref={ref}>
        {/* Left sidebar */}
        <div className="md:w-1/3 bg-slate-100 p-6">
          {/* Profile */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-slate-300 mx-auto mb-4 flex items-center justify-center">
              <span className={`text-2xl font-bold ${theme.primary}`}>
                {personalInfo.fullName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </span>
            </div>
            <h1 className={`text-xl font-bold ${theme.heading} mb-1`}>
              {personalInfo.fullName}
            </h1>
            {personalInfo.title && (
              <h2 className={`text-sm ${theme.secondary}`}>
                {personalInfo.title}
              </h2>
            )}
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h3
              className={`text-sm font-semibold ${theme.heading} mb-3 pb-1 border-b ${theme.border}`}
            >
              CONTACT
            </h3>
            <div className={`text-sm ${theme.secondary} space-y-2`}>
              <div>{personalInfo.email}</div>
              <div>{personalInfo.phone}</div>
              <div>{personalInfo.location}</div>
            </div>
          </div>

          {/* Social Links */}
          {(personalInfo.linkedin ||
            personalInfo.github ||
            personalInfo.portfolio ||
            personalInfo.additionalLink) && (
            <div className="mb-6">
              <h3
                className={`text-sm font-semibold ${theme.heading} mb-3 pb-1 border-b ${theme.border}`}
              >
                ONLINE
              </h3>
              <div className={`text-sm space-y-2`}>
                {personalInfo.linkedin && (
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={theme.link}
                  >
                    <LinkedinIcon className="w-4 h-4 inline mr-2" />
                    LinkedIn
                  </a>
                )}
                {personalInfo.github && (
                  <div>
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={theme.link}
                    >
                      <GithubIcon className="w-4 h-4 inline mr-2" />
                      GitHub
                    </a>
                  </div>
                )}
                {personalInfo.portfolio && (
                  <div>
                    <a
                      href={personalInfo.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={theme.link}
                    >
                      <Globe className="w-4 h-4 inline mr-2" />
                      Portfolio
                    </a>
                  </div>
                )}
                {personalInfo.additionalLink && (
                  <div>
                    <a
                      href={personalInfo.additionalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={theme.link}
                    >
                      <Link2 className="w-4 h-4 inline mr-2" />
                      Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {skillGroups.length > 0 && (
            <div>
              <h3
                className={`text-sm font-semibold ${theme.heading} mb-3 pb-1 border-b ${theme.border}`}
              >
                SKILLS
              </h3>
              <div className="space-y-3">
                {skillGroups.map((group, index) => (
                  <div key={index} className="mb-2">
                    <h4 className={`font-medium ${theme.primary} text-sm mb-1`}>
                      {group.category}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {group.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="flex items-center mb-1 w-full"
                        >
                          <span className={`text-xs ${theme.primary}`}>
                            {skill.name}
                          </span>
                          <div className="flex-1 mx-2 h-1 bg-gray-200 rounded">
                            <div
                              className="h-1 bg-slate-500 rounded"
                              style={{
                                width:
                                  skill.proficiency === "Beginner"
                                    ? "25%"
                                    : skill.proficiency === "Intermediate"
                                    ? "50%"
                                    : skill.proficiency === "Advanced"
                                    ? "75%"
                                    : "100%",
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right main content */}
        <div className="md:w-2/3 p-6">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h2
                className={`text-lg font-semibold ${theme.heading} mb-3 pb-1 border-b ${theme.border}`}
              >
                PROFILE
              </h2>
              <p className={`${theme.primary} leading-relaxed`}>
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience Section */}
          {experiences.length > 0 && (
            <div className="mb-6">
              <h2
                className={`text-lg font-semibold ${theme.heading} mb-3 pb-1 border-b ${theme.border}`}
              >
                EXPERIENCE
              </h2>
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-6 pb-6">
                    {/* Timeline styling */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 rounded"></div>
                    <div className="absolute top-1 left-0 w-3 h-3 -ml-1 rounded-full bg-slate-400"></div>

                    <div>
                      <div className="flex justify-between items-baseline flex-wrap">
                        <h3 className={`font-semibold ${theme.primary}`}>
                          {exp.position}
                        </h3>
                        <span className={`text-sm ${theme.secondary}`}>
                          {formatDate(exp.startDate)} -{" "}
                          {exp.endDate ? formatDate(exp.endDate) : "Present"}
                        </span>
                      </div>
                      <div className={`text-sm ${theme.secondary} mb-2`}>
                        <span className="font-medium">{exp.company}</span> |{" "}
                        {exp.location}
                      </div>
                      <p
                        className={`${theme.primary} whitespace-pre-line leading-relaxed`}
                      >
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <div>
              <h2
                className={`text-lg font-semibold ${theme.heading} mb-3 pb-1 border-b ${theme.border}`}
              >
                EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-6 pb-6 last:pb-0">
                    {/* Timeline styling */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 rounded"></div>
                    <div className="absolute top-1 left-0 w-3 h-3 -ml-1 rounded-full bg-slate-400"></div>

                    <div>
                      <div className="flex justify-between items-baseline flex-wrap">
                        <h3 className={`font-semibold ${theme.primary}`}>
                          {edu.degree} in {edu.field}
                        </h3>
                        <span className={`text-sm ${theme.secondary}`}>
                          {formatDate(edu.startDate)} -{" "}
                          {edu.endDate ? formatDate(edu.endDate) : "Present"}
                        </span>
                      </div>
                      <div className={`text-sm ${theme.secondary} mb-1`}>
                        <span className="font-medium">{edu.institution}</span> |{" "}
                        {edu.location}
                      </div>
                      {edu.gpa && (
                        <div className={`text-sm ${theme.secondary}`}>
                          GPA: {edu.gpa}
                        </div>
                      )}
                      {edu.achievements && (
                        <p className={`mt-1 text-sm ${theme.primary}`}>
                          {edu.achievements}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
});
ModernLayout.displayName = "ModernLayout";

export default ComprehensivePreview;
