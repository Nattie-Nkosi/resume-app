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
              <p
                className={`mt-6 ${theme.primary} text-center leading-relaxed`}
              >
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
  }
);
ElegantLayout.displayName = "ElegantLayout";

export default ElegantLayout;
