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
              <p className={`text-sm ${theme.primary}`}>
                {personalInfo.summary}
              </p>
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
                              <span
                                className={`${theme.secondary} text-xs ml-1`}
                              >
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
                          <h3
                            className={`font-medium ${theme.primary} text-sm`}
                          >
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
  }
);
CompactLayout.displayName = "CompactLayout";

export default CompactLayout;
