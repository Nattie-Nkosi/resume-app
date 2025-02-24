"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";

interface PreviewProps {
  data: ResumeData;
}

const Preview: React.FC<PreviewProps> = ({ data }) => {
  const { personalInfo, experiences, education, skillGroups } = data;

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardContent className="p-8">
        {/* Header/Personal Info */}
        <div className="border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {personalInfo.fullName}
          </h1>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex items-center gap-2">
              <span>{personalInfo.email}</span>
              <span>•</span>
              <span>{personalInfo.phone}</span>
              <span>•</span>
              <span>{personalInfo.location}</span>
            </div>
          </div>
          {personalInfo.summary && (
            <p className="mt-4 text-gray-700">{personalInfo.summary}</p>
          )}
        </div>

        {/* Experience Section */}
        {experiences.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div key={index} className="border-b last:border-0 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {exp.position}
                      </h3>
                      <div className="text-gray-600">{exp.company}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {exp.location}
                  </div>
                  <p className="mt-2 text-gray-700 whitespace-pre-line">
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-b last:border-0 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {edu.degree} in {edu.field}
                      </h3>
                      <div className="text-gray-600">{edu.institution}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(edu.startDate)} -{" "}
                      {edu.endDate ? formatDate(edu.endDate) : "Present"}
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
                    <p className="mt-2 text-gray-700">{edu.achievements}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skillGroups.length > 0 && (
          <div>
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
      </CardContent>
    </Card>
  );
};

export default Preview;
