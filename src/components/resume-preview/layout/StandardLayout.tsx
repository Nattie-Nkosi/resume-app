// /components/resume-preview/layouts/StandardLayout.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";
import { LinkedinIcon, GithubIcon, Globe, Link2 } from "lucide-react";
import { ThemeStyles } from "../theme-config";

interface StandardLayoutProps {
  data: ResumeData;
  theme: ThemeStyles;
  isPrintView?: boolean;
}

const StandardLayout = React.forwardRef<HTMLDivElement, StandardLayoutProps>(
  ({ data, theme, isPrintView = false }, ref) => {
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
  }
);
StandardLayout.displayName = "StandardLayout";

export default StandardLayout;
