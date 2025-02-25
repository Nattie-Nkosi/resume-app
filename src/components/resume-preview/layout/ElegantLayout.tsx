// /components/resume-preview/layouts/ElegantLayout.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";
import { LinkedinIcon, GithubIcon, Globe, Link2 } from "lucide-react";
import { ThemeStyles } from "../theme-config";

interface ElegantLayoutProps {
  data: ResumeData;
  theme: ThemeStyles;
  isPrintView?: boolean;
}

const ElegantLayout = React.forwardRef<HTMLDivElement, ElegantLayoutProps>(
  ({ data, theme, isPrintView = false }, ref) => {
    const { personalInfo, experiences, education, skillGroups } = data;
    const containerClass = isPrintView
      ? "p-8 max-w-full print:p-5 print:shadow-none"
      : "w-full max-w-4xl mx-auto";

    return (
      <Card className={`bg-white shadow-lg ${containerClass} pdf-container`}>
        <CardContent className="p-8 print:p-5" ref={ref}>
          {/* Enhanced Elegant Header */}
          <div
            className="text-center mb-8 print:mb-6 pdf-section"
            data-pdf-section="header"
          >
            <h1
              className={`text-3xl font-bold ${theme.heading} tracking-wide print:text-2xl print:tracking-normal`}
            >
              {personalInfo.fullName}
            </h1>
            {personalInfo.title && (
              <h2
                className={`text-xl ${theme.secondary} mt-1 print:text-lg print:mt-0.5`}
              >
                {personalInfo.title}
              </h2>
            )}
            <div
              className={`flex justify-center flex-wrap gap-x-4 mt-3 text-sm ${theme.secondary} print:text-xs print:mt-2 print:gap-x-3`}
            >
              {personalInfo.email && (
                <span className="print:font-normal">{personalInfo.email}</span>
              )}
              {personalInfo.phone && (
                <span className="print:font-normal">{personalInfo.phone}</span>
              )}
              {personalInfo.location && (
                <span className="print:font-normal">
                  {personalInfo.location}
                </span>
              )}
            </div>

            {/* Social links centered with print optimization */}
            {(personalInfo.linkedin ||
              personalInfo.github ||
              personalInfo.portfolio ||
              personalInfo.additionalLink) && (
              <div className="flex justify-center gap-6 mt-3 print:mt-2 print:gap-4">
                {personalInfo.linkedin && (
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.link} print:text-black`}
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-5 h-5 print:w-4 print:h-4" />
                  </a>
                )}
                {personalInfo.github && (
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.link} print:text-black`}
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-5 h-5 print:w-4 print:h-4" />
                  </a>
                )}
                {personalInfo.portfolio && (
                  <a
                    href={personalInfo.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.link} print:text-black`}
                    aria-label="Portfolio"
                  >
                    <Globe className="w-5 h-5 print:w-4 print:h-4" />
                  </a>
                )}
                {personalInfo.additionalLink && (
                  <a
                    href={personalInfo.additionalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.link} print:text-black`}
                    aria-label="Website"
                  >
                    <Link2 className="w-5 h-5 print:w-4 print:h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Summary with decorative line - enhanced for PDF */}
          {personalInfo.summary && (
            <div
              className="mb-8 relative print:mb-6 pdf-section"
              data-pdf-section="summary"
            >
              <div className="absolute inset-0 flex items-center">
                <div
                  className={`w-full border-t ${theme.border} print:border-gray-300`}
                ></div>
              </div>
              <div className="relative flex justify-center">
                <span
                  className={`px-4 text-sm font-medium ${theme.heading} bg-white print:text-xs print:font-semibold print:tracking-wide`}
                >
                  PROFESSIONAL SUMMARY
                </span>
              </div>
              <p
                className={`mt-6 ${theme.primary} text-center leading-relaxed print:mt-4 print:text-sm print:leading-5`}
              >
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience Section - enhanced for PDF */}
          {experiences.length > 0 && (
            <div
              className="mb-8 print:mb-6 pdf-section"
              data-pdf-section="experience"
            >
              <div className="relative mb-6 print:mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className={`w-full border-t ${theme.border} print:border-gray-300`}
                  ></div>
                </div>
                <div className="relative flex justify-center">
                  <span
                    className={`px-4 text-sm font-medium ${theme.heading} bg-white print:text-xs print:font-semibold print:tracking-wide`}
                  >
                    EXPERIENCE
                  </span>
                </div>
              </div>

              <div className="space-y-6 print:space-y-4">
                {experiences.map((exp, index) => (
                  <div key={index} className="page-break-inside-avoid">
                    <div className="flex justify-between items-baseline flex-wrap">
                      <h3
                        className={`font-semibold ${theme.primary} print:text-sm`}
                      >
                        {exp.position}
                      </h3>
                      <span
                        className={`text-sm ${theme.secondary} print:text-xs`}
                      >
                        {formatDate(exp.startDate)} -{" "}
                        {exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </span>
                    </div>
                    <div
                      className={`text-sm ${theme.secondary} font-medium mb-2 print:text-xs print:mb-1 print:font-normal`}
                    >
                      {exp.company}
                      {exp.location && ` | ${exp.location}`}
                    </div>
                    <p
                      className={`${theme.primary} whitespace-pre-line leading-relaxed print:text-sm print:leading-5`}
                    >
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Two columns for Education and Skills - enhanced for PDF */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:gap-6">
            {/* Education Section */}
            {education.length > 0 && (
              <div className="pdf-section" data-pdf-section="education">
                <div className="relative mb-6 print:mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div
                      className={`w-full border-t ${theme.border} print:border-gray-300`}
                    ></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span
                      className={`px-4 text-sm font-medium ${theme.heading} bg-white print:text-xs print:font-semibold print:tracking-wide`}
                    >
                      EDUCATION
                    </span>
                  </div>
                </div>

                <div className="space-y-4 print:space-y-3">
                  {education.map((edu, index) => (
                    <div key={index} className="page-break-inside-avoid">
                      <h3
                        className={`font-semibold ${theme.primary} print:text-sm`}
                      >
                        {edu.degree}
                        {edu.field && ` in ${edu.field}`}
                      </h3>
                      <div
                        className={`text-sm ${theme.secondary} font-medium print:text-xs print:font-normal`}
                      >
                        {edu.institution}
                      </div>
                      <div
                        className={`text-sm ${theme.secondary} print:text-xs`}
                      >
                        {formatDate(edu.startDate)} -{" "}
                        {edu.endDate ? formatDate(edu.endDate) : "Present"}
                      </div>
                      {edu.gpa && (
                        <div
                          className={`text-sm ${theme.secondary} print:text-xs`}
                        >
                          GPA: {edu.gpa}
                        </div>
                      )}
                      {edu.achievements && (
                        <p
                          className={`mt-1 text-sm ${theme.primary} print:text-xs print:mt-0.5`}
                        >
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
              <div className="pdf-section" data-pdf-section="skills">
                <div className="relative mb-6 print:mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div
                      className={`w-full border-t ${theme.border} print:border-gray-300`}
                    ></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span
                      className={`px-4 text-sm font-medium ${theme.heading} bg-white print:text-xs print:font-semibold print:tracking-wide`}
                    >
                      SKILLS
                    </span>
                  </div>
                </div>

                <div className="space-y-4 print:space-y-3">
                  {skillGroups.map((group, index) => (
                    <div key={index} className="page-break-inside-avoid">
                      <h3
                        className={`font-medium ${theme.primary} mb-2 print:text-sm print:mb-1`}
                      >
                        {group.category}
                      </h3>
                      <div className="flex flex-wrap gap-2 print:gap-1.5">
                        {group.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className={`inline-block px-3 py-1 rounded-full text-sm ${theme.accent} print:text-xs print:px-2 print:py-0.5 print:bg-gray-100`}
                          >
                            {skill.name}
                            {skill.proficiency && (
                              <span className="text-xs ml-1 print:text-[10px]">
                                ({skill.proficiency})
                              </span>
                            )}
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

        {/* Add CSS for better PDF rendering */}
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
ElegantLayout.displayName = "ElegantLayout";

export default ElegantLayout;
