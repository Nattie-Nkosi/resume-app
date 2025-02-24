"use client";

import React, { useState } from "react";
import PersonalInfo from "@/components/personal-info";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Preview from "@/components/preview";
import { Button } from "@/components/ui/button";
import type { ResumeData } from "@/types/resume";

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experiences: [
      {
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        institution: "",
        degree: "",
        field: "",
        location: "",
        startDate: "",
        endDate: "",
        gpa: "",
        achievements: "",
      },
    ],
    skillGroups: [
      {
        category: "Technical" as
          | "Technical"
          | "Soft Skills"
          | "Languages"
          | "Tools"
          | "Frameworks"
          | "Other",
        skills: [{ name: "", proficiency: "Intermediate" }],
      },
    ],
  });

  const [showPreview, setShowPreview] = useState(false);

  const handlePersonalInfoSubmit = (data: any) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: data,
    }));
  };

  const handleExperienceSubmit = (data: any) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: data.experiences,
    }));
  };

  const handleEducationSubmit = (data: any) => {
    setResumeData((prev) => ({
      ...prev,
      education: data.education,
    }));
  };

  const handleSkillsSubmit = (data: any) => {
    setResumeData((prev) => ({
      ...prev,
      skillGroups: data.skillGroups,
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Resume Builder</h1>
        <Button onClick={() => setShowPreview(!showPreview)} variant="outline">
          {showPreview ? "Edit Resume" : "Preview Resume"}
        </Button>
      </div>

      {showPreview ? (
        <Preview data={resumeData} />
      ) : (
        <div className="max-w-4xl mx-auto">
          <PersonalInfo
            onSubmit={handlePersonalInfoSubmit}
            defaultValues={resumeData.personalInfo}
          />

          <Experience
            onSubmit={handleExperienceSubmit}
            defaultValues={{ experiences: resumeData.experiences }}
          />

          <Education
            onSubmit={handleEducationSubmit}
            defaultValues={{ education: resumeData.education }}
          />

          <Skills
            onSubmit={handleSkillsSubmit}
            defaultValues={{ skillGroups: resumeData.skillGroups }}
          />
        </div>
      )}
    </div>
  );
}
