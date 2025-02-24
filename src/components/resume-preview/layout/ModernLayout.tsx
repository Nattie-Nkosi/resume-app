// /components/resume-preview/layouts/ModernLayout.tsx
"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import type { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";
import { LinkedinIcon, GithubIcon, Globe, Link2 } from "lucide-react";
import { getProficiencyPercentage } from "../utils/preview-helpers";
import { ThemeStyles } from "../theme-config";

interface ModernLayoutProps {
  data: ResumeData;
  theme: ThemeStyles;
  isPrintView?: boolean;
}

const ModernLayout = React.forwardRef<HTMLDivElement, ModernLayoutProps>(
  ({ data, theme, isPrintView = false }, ref) => {
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
                      <h4
                        className={`font-medium ${theme.primary} text-sm mb-1`}
                      >
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
                                  width: getProficiencyPercentage(
                                    skill.proficiency
                                  ),
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
                          <span className="font-medium">{edu.institution}</span>{" "}
                          | {edu.location}
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
  }
);
ModernLayout.displayName = "ModernLayout";

export default ModernLayout;
