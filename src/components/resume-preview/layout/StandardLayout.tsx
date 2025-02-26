// /components/resume-preview/layouts/StandardLayout.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";
import {
  LinkedinIcon,
  GithubIcon,
  Globe,
  Link2,
  Briefcase,
  GraduationCap,
  Award,
  Lightbulb,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  Users,
} from "lucide-react";
import { ThemeStyles } from "../theme-config";

interface StandardLayoutProps {
  data: ResumeData;
  theme: ThemeStyles;
  isPrintView?: boolean;
}

const StandardLayout = React.forwardRef<HTMLDivElement, StandardLayoutProps>(
  ({ data, theme, isPrintView = false }, ref) => {
    const {
      personalInfo,
      experiences,
      education,
      skillGroups,
      certificates,
      projects,
      achievements,
      references,
    } = data;

    const containerClass = isPrintView
      ? "p-8 max-w-full print:p-5 print:shadow-none"
      : "w-full max-w-4xl mx-auto";

    return (
      <Card className={`bg-white shadow-lg ${containerClass} pdf-container`}>
        <CardContent className="p-6 print:p-5" ref={ref}>
          {/* Header/Personal Info with improved design */}
          <div className={`border-b ${theme.border} pb-5 mb-5`}>
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div className="flex-1">
                <h1
                  className={`text-2xl font-bold ${theme.heading} mb-1 print:text-xl`}
                >
                  {personalInfo.fullName}
                </h1>
                {personalInfo.title && (
                  <h2
                    className={`text-lg ${theme.secondary} mb-2 print:text-base`}
                  >
                    {personalInfo.title}
                  </h2>
                )}
              </div>

              <div
                className={`text-sm ${theme.secondary} space-y-1 text-right`}
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
              </div>
            </div>

            {/* Social Links - Improved with flex layout */}
            {(personalInfo.linkedin ||
              personalInfo.github ||
              personalInfo.portfolio ||
              personalInfo.additionalLink) && (
              <div className="flex items-center gap-4 flex-wrap mt-3 print:mt-2">
                {personalInfo.linkedin && (
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 ${theme.link} text-sm`}
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
                    className={`flex items-center gap-1 ${theme.link} text-sm`}
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
                    className={`flex items-center gap-1 ${theme.link} text-sm`}
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
                    className={`flex items-center gap-1 ${theme.link} text-sm`}
                  >
                    <Link2 className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                )}
              </div>
            )}

            {/* Professional Summary */}
            {personalInfo.summary && (
              <p
                className={`mt-3 ${theme.primary} leading-relaxed text-sm print:text-xs`}
              >
                {personalInfo.summary}
              </p>
            )}
          </div>

          {/* Main content with two-column layout for better space utilization */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: Skills and Education */}
            <div className="md:col-span-1 space-y-5 print:space-y-4">
              {/* Skills Section - Redesigned for compactness */}
              {skillGroups.length > 0 && (
                <div className="pdf-section skill-section">
                  <h2
                    className={`text-lg font-semibold ${theme.heading} mb-3 flex items-center gap-1 print:text-base`}
                  >
                    <Lightbulb className="w-4 h-4" /> Skills
                  </h2>
                  <div className="space-y-3 print:space-y-2">
                    {skillGroups.map((group, index) => (
                      <div key={index} className="page-break-inside-avoid">
                        <h3
                          className={`font-medium ${theme.primary} text-sm mb-2 print:text-xs print:mb-1`}
                        >
                          {group.category}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {group.skills
                            .filter((skill) => skill.name)
                            .map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className={`skill-tag inline-block text-xs bg-gray-100 px-2 py-0.5 rounded-md ${theme.primary} print:text-xs print:px-1.5 print:py-0.5`}
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

              {/* Education Section - Improved alignment */}
              {education.length > 0 && (
                <div className="pdf-section education-section">
                  <h2
                    className={`text-lg font-semibold ${theme.heading} mb-3 flex items-center gap-1 print:text-base`}
                  >
                    <GraduationCap className="w-4 h-4" /> Education
                  </h2>
                  <div className="space-y-3 print:space-y-2">
                    {education.map((edu, index) => (
                      <div
                        key={index}
                        className="mb-2 page-break-inside-avoid last:mb-0"
                      >
                        <div className="flex justify-between items-start">
                          <div className="education-alignment">
                            <h3
                              className={`font-medium ${theme.primary} text-sm print:text-xs`}
                            >
                              {edu.degree} {edu.field && `in ${edu.field}`}
                            </h3>
                            <div className={`${theme.secondary} text-xs`}>
                              {edu.institution}
                            </div>
                            <div className={`${theme.secondary} text-xs`}>
                              {edu.location}
                            </div>
                          </div>
                          <div
                            className={`${theme.secondary} text-xs whitespace-nowrap bg-gray-100 px-2 py-0.5 rounded print:text-xs`}
                          >
                            {formatDate(edu.startDate)} -{" "}
                            {edu.currentlyEnrolled
                              ? "Present"
                              : formatDate(edu.endDate)}
                          </div>
                        </div>
                        {edu.gpa && (
                          <div className={`text-xs ${theme.secondary} mt-1`}>
                            GPA: {edu.gpa}
                          </div>
                        )}
                        {edu.achievements && (
                          <p
                            className={`mt-1 text-xs ${theme.primary} print:text-xs`}
                          >
                            {edu.achievements}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications Section - Added missing section */}
              {certificates && certificates.length > 0 && (
                <div className="pdf-section">
                  <h2
                    className={`text-lg font-semibold ${theme.heading} mb-3 flex items-center gap-1 print:text-base`}
                  >
                    <Award className="w-4 h-4" /> Certifications
                  </h2>
                  <div className="space-y-3 print:space-y-2">
                    {certificates.map((cert, index) => (
                      <div
                        key={index}
                        className="mb-2 page-break-inside-avoid last:mb-0"
                      >
                        <h3
                          className={`font-medium ${theme.primary} text-sm print:text-xs`}
                        >
                          {cert.name}
                        </h3>
                        <div className={`${theme.secondary} text-xs`}>
                          {cert.issuer}
                        </div>
                        <div className={`${theme.secondary} text-xs`}>
                          {formatDate(cert.date)}
                          {cert.expiration &&
                            ` • Expires: ${formatDate(cert.expiration)}`}
                        </div>
                        {cert.credentialId && (
                          <div className={`text-xs ${theme.secondary}`}>
                            ID: {cert.credentialId}
                          </div>
                        )}
                        {/* Added credential URL display */}
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1 mt-1 ${theme.link} text-xs print:text-xs`}
                          >
                            <ExternalLink className="w-3 h-3" /> Verify
                            credential
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Experience and Projects */}
            <div className="md:col-span-2 space-y-5 print:space-y-4">
              {/* Experience Section - Improved with icons and better spacing */}
              {experiences.length > 0 && (
                <div className="pdf-section">
                  <h2
                    className={`text-lg font-semibold ${theme.heading} mb-3 flex items-center gap-1 print:text-base`}
                  >
                    <Briefcase className="w-4 h-4" /> Professional Experience
                  </h2>
                  <div className="space-y-4 print:space-y-3">
                    {experiences.map((exp, index) => (
                      <div
                        key={index}
                        className="mb-3 page-break-inside-avoid last:mb-0 border-l-2 pl-3 border-gray-200"
                      >
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <h3
                              className={`font-medium ${theme.primary} text-sm print:text-xs`}
                            >
                              {exp.position}
                            </h3>
                            <div className={`${theme.secondary} text-xs`}>
                              {exp.company}{" "}
                              {exp.location && `• ${exp.location}`}
                            </div>
                          </div>
                          <div
                            className={`text-xs ${theme.secondary} whitespace-nowrap bg-gray-100 px-2 py-0.5 rounded print:text-xs`}
                          >
                            {formatDate(exp.startDate)} -{" "}
                            {exp.currentJob
                              ? "Present"
                              : formatDate(exp.endDate)}
                          </div>
                        </div>
                        <p
                          className={`mt-2 text-xs ${theme.primary} whitespace-pre-line leading-relaxed print:text-xs print:mt-1 print:leading-tight`}
                        >
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Section - Added section for completeness */}
              {projects && projects.length > 0 && (
                <div className="pdf-section">
                  <h2
                    className={`text-lg font-semibold ${theme.heading} mb-3 flex items-center gap-1 print:text-base`}
                  >
                    <Globe className="w-4 h-4" /> Projects
                  </h2>
                  <div className="space-y-4 print:space-y-3">
                    {projects.map((project, index) => (
                      <div
                        key={index}
                        className="mb-3 page-break-inside-avoid last:mb-0 border-l-2 pl-3 border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3
                              className={`font-medium ${theme.primary} text-sm print:text-xs`}
                            >
                              {project.title}
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`ml-2 inline-flex items-center ${theme.link} text-xs`}
                                >
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              )}
                            </h3>
                          </div>
                          <div
                            className={`text-xs ${theme.secondary} whitespace-nowrap bg-gray-100 px-2 py-0.5 rounded print:text-xs`}
                          >
                            {formatDate(project.startDate)} -{" "}
                            {project.currentProject
                              ? "Present"
                              : formatDate(project.endDate)}
                          </div>
                        </div>
                        <p
                          className={`mt-2 text-xs ${theme.primary} whitespace-pre-line leading-relaxed print:text-xs print:mt-1 print:leading-tight`}
                        >
                          {project.description}
                        </p>
                        {project.technologies &&
                          project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {project.technologies.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className={`skill-tag inline-block text-xs bg-gray-100 px-2 py-0.5 rounded-md ${theme.secondary} print:text-xs print:px-1.5 print:py-0.5`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements Section - Added for completeness */}
              {achievements && achievements.length > 0 && (
                <div className="pdf-section">
                  <h2
                    className={`text-lg font-semibold ${theme.heading} mb-3 flex items-center gap-1 print:text-base`}
                  >
                    <Award className="w-4 h-4" /> Key Achievements
                  </h2>
                  <div className="space-y-4 print:space-y-3">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="mb-3 page-break-inside-avoid last:mb-0 border-l-2 pl-3 border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3
                              className={`font-medium ${theme.primary} text-sm print:text-xs`}
                            >
                              {achievement.title}
                            </h3>
                            <div className={`${theme.secondary} text-xs`}>
                              {achievement.organization}
                            </div>
                          </div>
                          <div
                            className={`text-xs ${theme.secondary} whitespace-nowrap bg-gray-100 px-2 py-0.5 rounded print:text-xs`}
                          >
                            {formatDate(achievement.date)}
                          </div>
                        </div>
                        {achievement.description && (
                          <p
                            className={`mt-2 text-xs ${theme.primary} whitespace-pre-line leading-relaxed print:text-xs print:mt-1 print:leading-tight`}
                          >
                            {achievement.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* References Section */}
              {references && references.length > 0 && (
                <div className="pdf-section mb-5 print:mb-4">
                  <h2
                    className={`text-lg font-semibold ${theme.heading} mb-3 flex items-center gap-1 print:text-base`}
                  >
                    <Users className="w-4 h-4" /> References
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-3">
                    {references.map((reference, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-3 rounded border-l-2 border-gray-200 print:p-2"
                      >
                        <h3
                          className={`font-medium ${theme.primary} text-sm print:text-xs`}
                        >
                          {reference.name}
                        </h3>
                        <div className={`text-xs ${theme.secondary}`}>
                          {reference.position} • {reference.company}
                        </div>
                        <div className={`text-xs ${theme.secondary} mt-1`}>
                          {reference.relationship}
                        </div>
                        <div className={`text-xs ${theme.primary} mt-1`}>
                          {reference.contact}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        {/* Add CSS for PDF optimization */}
        <style jsx global>{`
          @media print {
            .pdf-container {
              font-family: system-ui, -apple-system, BlinkMacSystemFont,
                "Segoe UI", sans-serif;
            }

            h1,
            h2,
            h3,
            h4 {
              margin-top: 0 !important;
              page-break-after: avoid;
            }

            .pdf-section {
              break-inside: avoid;
              page-break-inside: avoid;
              margin-bottom: 10px !important;
            }

            a {
              text-decoration: none !important;
              color: rgb(37, 99, 235) !important;
            }

            .skill-section h3 {
              font-size: 0.7rem !important;
              margin-bottom: 0.2rem !important;
            }

            .skill-tag {
              padding: 0.1rem 0.4rem !important;
              margin-bottom: 0.2rem !important;
              font-size: 0.65rem !important;
            }

            .education-section h3 {
              font-size: 0.75rem !important;
              line-height: 1.2 !important;
            }

            .education-alignment {
              display: flex;
              flex-direction: column;
              width: 100%;
            }
          }
        `}</style>
      </Card>
    );
  }
);
StandardLayout.displayName = "StandardLayout";

export default StandardLayout;
