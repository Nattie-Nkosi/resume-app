"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";
import {
  LinkedinIcon,
  GithubIcon,
  Globe,
  Mail,
  Phone,
  MapPin,
  Award,
  Trophy,
} from "lucide-react";
import { ThemeStyles } from "../theme-config";

interface CompactLayoutProps {
  data: ResumeData;
  theme: ThemeStyles;
  isPrintView?: boolean;
}

const CompactLayout = React.forwardRef<HTMLDivElement, CompactLayoutProps>(
  ({ data, theme, isPrintView = false }, ref) => {
    const {
      personalInfo,
      experiences,
      education,
      skillGroups,
      projects,
      certificates,
      achievements,
    } = data;
    const containerClass = isPrintView
      ? "p-6 max-w-full print:p-5 print:shadow-none"
      : "w-full max-w-4xl mx-auto";

    return (
      <Card
        className={`bg-white shadow-lg ${containerClass} pdf-container modern-layout`}
      >
        <CardContent className="p-6 print:p-5" ref={ref}>
          {/* Modern Header with contact info aligned right */}
          <div className="flex flex-col md:flex-row justify-between items-start border-b pb-4 mb-6">
            <div>
              <h1 className={`text-2xl font-bold ${theme.heading}`}>
                {personalInfo.fullName}
              </h1>
              {personalInfo.title && (
                <p className={`text-base ${theme.secondary} mt-1`}>
                  {personalInfo.title}
                </p>
              )}

              {/* Professional Summary - condensed */}
              {personalInfo.summary && (
                <p
                  className={`text-sm ${theme.primary} mt-3 max-w-xl leading-relaxed`}
                >
                  {personalInfo.summary.length > 200
                    ? personalInfo.summary.substring(0, 200) + "..."
                    : personalInfo.summary}
                </p>
              )}
            </div>

            {/* Contact Information */}
            <div
              className={`text-sm ${theme.secondary} text-right mt-4 md:mt-0 space-y-1`}
            >
              {personalInfo.email && (
                <div className="flex items-center justify-end gap-2">
                  <span>{personalInfo.email}</span>
                  <Mail className="w-4 h-4" />
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center justify-end gap-2">
                  <span>{personalInfo.phone}</span>
                  <Phone className="w-4 h-4" />
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center justify-end gap-2">
                  <span>{personalInfo.location}</span>
                  <MapPin className="w-4 h-4" />
                </div>
              )}

              {/* Social links */}
              <div className="flex gap-3 mt-2 justify-end">
                {personalInfo.linkedin && (
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.link}`}
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
                {personalInfo.github && (
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.link}`}
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {personalInfo.portfolio && (
                  <a
                    href={personalInfo.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.link}`}
                    aria-label="Portfolio"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Two-column layout for the main content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column: Skills and Education */}
            <div className="space-y-6">
              {/* Skills Section */}
              {skillGroups &&
                skillGroups.length > 0 &&
                skillGroups.some((group) =>
                  group.skills.some((skill) => skill.name)
                ) && (
                  <div className="pdf-section" data-pdf-section="skills">
                    <h2
                      className={`text-base font-semibold ${theme.heading} mb-3 uppercase tracking-wider`}
                    >
                      Skills
                    </h2>
                    <div className="space-y-4">
                      {skillGroups
                        .filter((group) =>
                          group.skills.some((skill) => skill.name)
                        )
                        .map((group, index) => (
                          <div key={index} className="page-break-inside-avoid">
                            <h3
                              className={`font-medium ${theme.primary} text-sm mb-2`}
                            >
                              {group.category}
                            </h3>
                            <div className="flex flex-wrap gap-1">
                              {group.skills
                                .filter((skill) => skill.name)
                                .map((skill, skillIndex) => (
                                  <span
                                    key={skillIndex}
                                    className={`inline-block text-xs font-medium bg-gray-100 px-2 py-1 rounded mb-2 ${theme.primary}`}
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

              {/* Education Section */}
              {education &&
                education.length > 0 &&
                education.some((edu) => edu.institution || edu.degree) && (
                  <div className="pdf-section" data-pdf-section="education">
                    <h2
                      className={`text-base font-semibold ${theme.heading} mb-3 uppercase tracking-wider`}
                    >
                      Education
                    </h2>
                    <div className="space-y-3">
                      {education
                        .filter((edu) => edu.institution || edu.degree)
                        .map((edu, index) => (
                          <div
                            key={index}
                            className="mb-3 page-break-inside-avoid"
                          >
                            <h3
                              className={`font-medium ${theme.primary} text-sm`}
                            >
                              {edu.degree} {edu.field && `in ${edu.field}`}
                            </h3>
                            <div
                              className={`${theme.secondary} text-xs font-medium mt-1`}
                            >
                              {edu.institution}
                            </div>
                            <div className={`${theme.secondary} text-xs mt-1`}>
                              {formatDate(edu.startDate)} -{" "}
                              {edu.currentlyEnrolled
                                ? "Present"
                                : formatDate(edu.endDate)}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

              {/* Certifications Section */}
              {certificates &&
                certificates.length > 0 &&
                certificates.some((cert) => cert.name) && (
                  <div className="pdf-section" data-pdf-section="certificates">
                    <h2
                      className={`text-base font-semibold ${theme.heading} mb-3 uppercase tracking-wider flex items-center gap-1`}
                    >
                      <Award className="w-4 h-4" /> Certifications
                    </h2>
                    <div className="space-y-3">
                      {certificates
                        .filter((cert) => cert.name)
                        .map((cert, index) => (
                          <div
                            key={index}
                            className="mb-3 page-break-inside-avoid"
                          >
                            <h3
                              className={`font-medium ${theme.primary} text-sm`}
                            >
                              {cert.name}
                            </h3>
                            <div
                              className={`${theme.secondary} text-xs font-medium mt-1`}
                            >
                              {cert.issuer}
                            </div>
                            <div className={`${theme.secondary} text-xs mt-1`}>
                              {formatDate(cert.date)}
                              {cert.expiration &&
                                ` (Expires: ${formatDate(cert.expiration)})`}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Right column: Experience and Projects */}
            <div className="md:col-span-2">
              {/* Experience Section */}
              {experiences &&
                experiences.length > 0 &&
                experiences.some((exp) => exp.company || exp.position) && (
                  <div
                    className="mb-6 pdf-section"
                    data-pdf-section="experience"
                  >
                    <h2
                      className={`text-base font-semibold ${theme.heading} mb-3 uppercase tracking-wider`}
                    >
                      Professional Experience
                    </h2>
                    <div className="space-y-4">
                      {experiences
                        .filter((exp) => exp.company || exp.position)
                        .map((exp, index) => (
                          <div
                            key={index}
                            className="mb-4 page-break-inside-avoid border-l-2 pl-4 border-gray-200"
                          >
                            <div className="flex justify-between items-start flex-wrap">
                              <div>
                                <h3
                                  className={`font-semibold ${theme.primary} text-sm`}
                                >
                                  {exp.position}
                                </h3>
                                <div
                                  className={`${theme.secondary} text-xs font-medium mt-1`}
                                >
                                  {exp.company}
                                  {exp.location && `, ${exp.location}`}
                                </div>
                              </div>
                              <div
                                className={`${theme.secondary} text-xs mt-1 bg-gray-100 px-2 py-1 rounded`}
                              >
                                {formatDate(exp.startDate)} -{" "}
                                {exp.currentJob
                                  ? "Present"
                                  : formatDate(exp.endDate)}
                              </div>
                            </div>
                            <p
                              className={`text-xs ${theme.primary} mt-2 whitespace-pre-line leading-relaxed`}
                            >
                              {exp.description}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

              {/* Projects Section */}
              {projects &&
                projects.length > 0 &&
                projects.some((project) => project.title) && (
                  <div className="pdf-section" data-pdf-section="projects">
                    <h2
                      className={`text-base font-semibold ${theme.heading} mb-3 uppercase tracking-wider`}
                    >
                      Projects
                    </h2>
                    <div className="space-y-4">
                      {projects
                        .filter((project) => project.title)
                        .map((project, index) => (
                          <div
                            key={index}
                            className="mb-4 page-break-inside-avoid border-l-2 pl-4 border-gray-200"
                          >
                            <div className="flex justify-between items-start flex-wrap">
                              <h3
                                className={`font-semibold ${theme.primary} text-sm`}
                              >
                                {project.title}
                              </h3>
                              <div
                                className={`${theme.secondary} text-xs bg-gray-100 px-2 py-1 rounded`}
                              >
                                {formatDate(project.startDate)} -{" "}
                                {project.currentProject
                                  ? "Present"
                                  : formatDate(project.endDate)}
                              </div>
                            </div>
                            <p
                              className={`text-xs ${theme.primary} mt-2 leading-relaxed`}
                            >
                              {project.description}
                            </p>
                            {project.technologies &&
                              project.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {project.technologies.map(
                                    (tech, techIndex) => (
                                      <span
                                        key={techIndex}
                                        className={`inline-block text-xs bg-gray-100 px-2 py-0.5 rounded ${theme.secondary}`}
                                      >
                                        {tech}
                                      </span>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

              {/* Achievements Section */}
              {achievements &&
                achievements.length > 0 &&
                achievements.some((achievement) => achievement.title) && (
                  <div className="pdf-section" data-pdf-section="achievements">
                    <h2
                      className={`text-base font-semibold ${theme.heading} mb-3 uppercase tracking-wider flex items-center gap-1`}
                    >
                      <Trophy className="w-4 h-4" /> Key Achievements
                    </h2>
                    <div className="space-y-4">
                      {achievements
                        .filter((achievement) => achievement.title)
                        .map((achievement, index) => (
                          <div
                            key={index}
                            className="mb-4 page-break-inside-avoid border-l-2 pl-4 border-gray-200"
                          >
                            <div className="flex justify-between items-start flex-wrap">
                              <div>
                                <h3
                                  className={`font-semibold ${theme.primary} text-sm`}
                                >
                                  {achievement.title}
                                </h3>
                                <div
                                  className={`${theme.secondary} text-xs font-medium mt-1`}
                                >
                                  {achievement.organization}
                                </div>
                              </div>
                              <div
                                className={`${theme.secondary} text-xs bg-gray-100 px-2 py-1 rounded`}
                              >
                                {formatDate(achievement.date)}
                              </div>
                            </div>
                            {achievement.description && (
                              <p
                                className={`text-xs ${theme.primary} mt-2 leading-relaxed`}
                              >
                                {achievement.description}
                              </p>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </CardContent>

        {/* Modern styling for PDF rendering */}
        <style jsx global>{`
          @media print {
            .modern-layout {
              font-family: "Arial", "Helvetica", sans-serif;
              line-height: 1.4;
            }

            .modern-layout h1 {
              font-size: 20px;
              font-weight: bold;
              color: #333;
            }

            .modern-layout h2 {
              font-size: 14px;
              letter-spacing: 0.05em;
              border-bottom: none;
              color: #555;
            }

            .modern-layout h3 {
              font-size: 13px;
              font-weight: 600;
              color: #444;
            }

            .modern-layout p {
              font-size: 11px;
              line-height: 1.5;
            }

            .modern-layout .text-xs {
              font-size: 10px;
            }

            .border-l-2 {
              border-left-width: 2px;
              padding-left: 10px;
              border-color: #e5e5e5;
            }

            .bg-gray-100 {
              background-color: #f5f5f5;
            }

            .rounded {
              border-radius: 3px;
            }

            a {
              text-decoration: none !important;
              color: #2563eb !important;
            }

            .pdf-section {
              break-inside: avoid;
              page-break-inside: avoid;
              margin-bottom: 15px;
            }
          }
        `}</style>
      </Card>
    );
  }
);
CompactLayout.displayName = "CompactLayout";

export default CompactLayout;
