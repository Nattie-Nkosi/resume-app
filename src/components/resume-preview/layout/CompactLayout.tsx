// /components/resume-preview/layouts/CompactLayout.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";
import { LinkedinIcon, GithubIcon, Globe, Link2 } from "lucide-react";
import { ThemeStyles } from "../theme-config";

interface CompactLayoutProps {
  data: ResumeData;
  theme: ThemeStyles;
  isPrintView?: boolean;
}

const CompactLayout = React.forwardRef<HTMLDivElement, CompactLayoutProps>(
  ({ data, theme, isPrintView = false }, ref) => {
    const { personalInfo, experiences, education, skillGroups } = data;
    const containerClass = isPrintView
      ? "p-6 max-w-full print:p-4 print:shadow-none"
      : "w-full max-w-4xl mx-auto";

    return (
      <Card className={`bg-white shadow-lg ${containerClass} pdf-container`}>
        <CardContent className="p-6 print:p-4" ref={ref}>
          {/* Enhanced Header - Compact Version */}
          <div
            className="mb-5 print:mb-4 pdf-section"
            data-pdf-section="header"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
              <div>
                <h1
                  className={`text-2xl font-bold ${theme.heading} print:text-xl tracking-tight`}
                >
                  {personalInfo.fullName}
                </h1>
                {personalInfo.title && (
                  <p className={`text-base ${theme.secondary} print:text-sm`}>
                    {personalInfo.title}
                  </p>
                )}
              </div>
              <div
                className={`text-sm ${theme.secondary} text-right mt-2 md:mt-0 print:text-xs`}
              >
                {personalInfo.email && <div>{personalInfo.email}</div>}
                {personalInfo.phone && <div>{personalInfo.phone}</div>}
                {personalInfo.location && <div>{personalInfo.location}</div>}
              </div>
            </div>

            {/* Social links in a row with print optimization */}
            {(personalInfo.linkedin ||
              personalInfo.github ||
              personalInfo.portfolio ||
              personalInfo.additionalLink) && (
              <div className="flex gap-3 mt-3 flex-wrap print:mt-2 print:text-xs">
                {personalInfo.linkedin && (
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.link} print:text-black print:font-normal`}
                  >
                    <LinkedinIcon className="w-4 h-4 inline mr-1 print:w-3 print:h-3" />
                    <span className="print:text-black">LinkedIn</span>
                  </a>
                )}
                {personalInfo.github && (
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.link} print:text-black print:font-normal`}
                  >
                    <GithubIcon className="w-4 h-4 inline mr-1 print:w-3 print:h-3" />
                    <span className="print:text-black">GitHub</span>
                  </a>
                )}
                {personalInfo.portfolio && (
                  <a
                    href={personalInfo.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.link} print:text-black print:font-normal`}
                  >
                    <Globe className="w-4 h-4 inline mr-1 print:w-3 print:h-3" />
                    <span className="print:text-black">Portfolio</span>
                  </a>
                )}
                {personalInfo.additionalLink && (
                  <a
                    href={personalInfo.additionalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.link} print:text-black print:font-normal`}
                  >
                    <Link2 className="w-4 h-4 inline mr-1 print:w-3 print:h-3" />
                    <span className="print:text-black">Website</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Professional Summary - if present */}
          {personalInfo.summary && (
            <div
              className={`mb-5 p-3 ${theme.accent} rounded print:mb-4 print:p-2 print:bg-gray-50 pdf-section`}
              data-pdf-section="summary"
            >
              <p
                className={`text-sm ${theme.primary} print:text-xs leading-relaxed`}
              >
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Two-column layout for the main content on wider screens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:gap-3">
            {/* Left column: Skills and Education */}
            <div className="space-y-4 print:space-y-3">
              {/* Skills Section */}
              {skillGroups.length > 0 && (
                <div className="pdf-section" data-pdf-section="skills">
                  <h2
                    className={`text-lg font-semibold ${theme.heading} mb-2 pb-1 border-b ${theme.border} print:text-base print:mb-1`}
                  >
                    Skills
                  </h2>
                  <div className="space-y-2">
                    {skillGroups.map((group, index) => (
                      <div
                        key={index}
                        className="mb-2 print:mb-1 page-break-inside-avoid"
                      >
                        <h3
                          className={`font-medium ${theme.primary} text-sm mb-1 print:text-xs print:mb-0.5`}
                        >
                          {group.category}
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          {group.skills.map((skill, skillIndex) => (
                            <div
                              key={skillIndex}
                              className="text-xs print:text-[10px]"
                            >
                              <span className="print:font-medium">
                                {skill.name}
                              </span>
                              {skill.proficiency && (
                                <span
                                  className={`${theme.secondary} text-xs ml-1 print:text-[9px]`}
                                >
                                  ({skill.proficiency})
                                </span>
                              )}
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
                <div className="pdf-section" data-pdf-section="education">
                  <h2
                    className={`text-lg font-semibold ${theme.heading} mb-2 pb-1 border-b ${theme.border} print:text-base print:mb-1`}
                  >
                    Education
                  </h2>
                  <div className="space-y-3 print:space-y-2">
                    {education.map((edu, index) => (
                      <div
                        key={index}
                        className="mb-2 print:mb-1 page-break-inside-avoid"
                      >
                        <h3
                          className={`font-medium ${theme.primary} text-sm print:text-xs`}
                        >
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </h3>
                        <div
                          className={`${theme.secondary} text-xs print:text-[10px]`}
                        >
                          {edu.institution}
                        </div>
                        <div
                          className={`${theme.secondary} text-xs print:text-[10px]`}
                        >
                          {formatDate(edu.startDate)} -{" "}
                          {edu.endDate ? formatDate(edu.endDate) : "Present"}
                        </div>
                        {edu.gpa && (
                          <div
                            className={`${theme.secondary} text-xs print:text-[10px]`}
                          >
                            GPA: {edu.gpa}
                          </div>
                        )}
                        {edu.achievements && (
                          <div
                            className={`${theme.primary} text-xs mt-1 print:text-[10px] print:mt-0.5`}
                          >
                            {edu.achievements}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column: Experience */}
            <div
              className="md:col-span-2 pdf-section"
              data-pdf-section="experience"
            >
              {/* Experience Section */}
              {experiences.length > 0 && (
                <div>
                  <h2
                    className={`text-lg font-semibold ${theme.heading} mb-2 pb-1 border-b ${theme.border} print:text-base print:mb-1`}
                  >
                    Professional Experience
                  </h2>
                  <div className="space-y-3 print:space-y-2">
                    {experiences.map((exp, index) => (
                      <div
                        key={index}
                        className="mb-3 print:mb-2 page-break-inside-avoid"
                      >
                        <div className="flex justify-between items-start flex-wrap">
                          <h3
                            className={`font-medium ${theme.primary} text-sm print:text-xs`}
                          >
                            {exp.position}
                          </h3>
                          <div
                            className={`${theme.secondary} text-xs print:text-[10px]`}
                          >
                            {formatDate(exp.startDate)} -{" "}
                            {exp.endDate ? formatDate(exp.endDate) : "Present"}
                          </div>
                        </div>
                        <div
                          className={`${theme.secondary} text-xs mb-1 print:text-[10px] print:mb-0.5`}
                        >
                          {exp.company}
                          {exp.location && `, ${exp.location}`}
                        </div>
                        <p
                          className={`text-xs ${theme.primary} whitespace-pre-line print:text-[10px] leading-relaxed`}
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

        {/* Add CSS classes for better PDF rendering */}
        <style jsx global>{`
          @media print {
            .pdf-container {
              width: 100%;
              max-width: 100%;
              box-shadow: none;
              border: none;
            }

            .page-break-inside-avoid {
              page-break-inside: avoid;
            }

            h1,
            h2,
            h3,
            h4 {
              page-break-after: avoid;
            }

            a {
              text-decoration: none !important;
              color: black !important;
            }

            .pdf-section {
              break-inside: avoid;
            }
          }
        `}</style>
      </Card>
    );
  }
);
CompactLayout.displayName = "CompactLayout";

export default CompactLayout;
