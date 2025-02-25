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
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PreviewProps {
  data: ResumeData;
}

const Preview: React.FC<PreviewProps> = ({ data }) => {
  const {
    personalInfo,
    experiences,
    education,
    skillGroups,
    projects,
    certificates,
    languages,
    interests,
    references,
    publications,
    awards,
    volunteer,
    customSections,
  } = data;

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardContent className="p-8">
        {/* Header/Personal Info */}
        <div className="border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {personalInfo.fullName}
          </h1>
          {personalInfo.title && (
            <h2 className="text-xl text-gray-600 mb-3">{personalInfo.title}</h2>
          )}
          <div className="text-sm text-gray-600 space-y-2">
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
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
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
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
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
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
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
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                  >
                    <Link2 className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                )}
              </div>
            )}
          </div>
          {personalInfo.summary && (
            <p className="mt-4 text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          )}
        </div>

        {/* Experience Section */}
        {experiences && experiences.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div key={index} className="border-b last:border-0 pb-4">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {exp.position}
                      </h3>
                      <div className="text-gray-600">{exp.company}</div>
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.currentJob ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {exp.location}
                  </div>
                  <p className="mt-2 text-gray-700 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-b last:border-0 pb-4">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {edu.degree} in {edu.field}
                      </h3>
                      <div className="text-gray-600">{edu.institution}</div>
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(edu.startDate)} -{" "}
                      {edu.currentlyEnrolled
                        ? "Present"
                        : formatDate(edu.endDate)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {edu.location}
                  </div>
                  {edu.gpa && (
                    <div className="text-sm text-gray-600 mt-1">
                      GPA: {edu.gpa}
                    </div>
                  )}
                  {edu.achievements && (
                    <p className="mt-2 text-gray-700 leading-relaxed">
                      {edu.achievements}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="border-b last:border-0 pb-4">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {project.title}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center ml-2 text-gray-600 hover:text-gray-900"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </h3>
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(project.startDate)} -{" "}
                      {project.currentProject
                        ? "Present"
                        : formatDate(project.endDate)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-2 text-gray-700 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skillGroups && skillGroups.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="space-y-4">
              {skillGroups.map((group, index) => (
                <div key={index} className="border-b last:border-0 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                      >
                        {skill.name}
                        <span className="text-gray-500 ml-1">•</span>
                        <span className="text-gray-500 ml-1">
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

        {/* Certificates Section */}
        {certificates && certificates.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Certifications
            </h2>
            <div className="space-y-3">
              {certificates.map((cert, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{cert.name}</h3>
                    <div className="text-gray-600">{cert.issuer}</div>
                    {cert.credentialId && (
                      <div className="text-sm text-gray-500">
                        Credential ID: {cert.credentialId}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    {formatDate(cert.date)}
                    {cert.expiration && (
                      <span> (Expires: {formatDate(cert.expiration)})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {languages && languages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Languages
            </h2>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                >
                  {lang.name}
                  <span className="text-gray-500 ml-1">•</span>
                  <span className="text-gray-500 ml-1">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interests Section */}
        {interests && interests.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Interests & Hobbies
            </h2>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                >
                  {interest.name}
                  {interest.description && (
                    <span className="text-gray-500 ml-1">
                      • {interest.description}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications Section */}
        {publications && publications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Publications
            </h2>
            <div className="space-y-3">
              {publications.map((pub, index) => (
                <div key={index} className="border-b last:border-0 pb-3">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <h3 className="font-medium text-gray-900">
                      {pub.title}
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center ml-2 text-gray-600 hover:text-gray-900"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </h3>
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(pub.date)}
                    </div>
                  </div>
                  <div className="text-gray-600">{pub.publisher}</div>
                  {pub.description && (
                    <p className="mt-1 text-gray-700 text-sm">
                      {pub.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards Section */}
        {awards && awards.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Awards & Achievements
            </h2>
            <div className="space-y-3">
              {awards.map((award, index) => (
                <div key={index} className="border-b last:border-0 pb-3">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <h3 className="font-medium text-gray-900">{award.title}</h3>
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(award.date)}
                    </div>
                  </div>
                  <div className="text-gray-600">{award.issuer}</div>
                  {award.description && (
                    <p className="mt-1 text-gray-700 text-sm">
                      {award.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Volunteer Experience Section */}
        {volunteer && volunteer.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Volunteer Experience
            </h2>
            <div className="space-y-4">
              {volunteer.map((vol, index) => (
                <div key={index} className="border-b last:border-0 pb-4">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{vol.role}</h3>
                      <div className="text-gray-600">{vol.organization}</div>
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(vol.startDate)} -{" "}
                      {vol.currentRole ? "Present" : formatDate(vol.endDate)}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 whitespace-pre-line leading-relaxed">
                    {vol.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References Section */}
        {references && references.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              References
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {references.map((ref, index) => (
                <div key={index} className="border p-4 rounded-md">
                  <h3 className="font-medium text-gray-900">{ref.name}</h3>
                  <div className="text-gray-600">{ref.position}</div>
                  <div className="text-gray-600">{ref.company}</div>
                  <div className="mt-2 text-sm text-gray-500">
                    {ref.relationship}
                  </div>
                  <div className="mt-1 text-gray-700">{ref.contact}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {customSections && customSections.length > 0 && (
          <>
            {customSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="border-b last:border-0 pb-4"
                    >
                      {item.title && (
                        <h3 className="font-medium text-gray-900">
                          {item.title}
                        </h3>
                      )}
                      {item.subtitle && (
                        <div className="text-gray-600">{item.subtitle}</div>
                      )}
                      {item.date && (
                        <div className="text-sm text-gray-500">{item.date}</div>
                      )}
                      {item.description && (
                        <p className="mt-2 text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                          {item.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Preview;
