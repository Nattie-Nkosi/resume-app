"use client";

import React, { useState } from "react";
import PersonalInfo from "@/components/personal-info";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Preview from "@/components/preview";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "./store/useResumeStore";

export default function Home() {
  const [showPreview, setShowPreview] = useState(false);
  const {
    resumeData,
    updatePersonalInfo,
    updateExperiences,
    updateEducation,
    updateSkills,
    resetStore,
  } = useResumeStore();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Resume Builder</h1>
        <div className="flex gap-4">
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant="outline"
          >
            {showPreview ? "Edit Resume" : "Preview Resume"}
          </Button>
          <Button onClick={resetStore} variant="destructive">
            Reset
          </Button>
        </div>
      </div>

      {showPreview ? (
        <Preview data={resumeData} />
      ) : (
        <div className="max-w-4xl mx-auto">
          <PersonalInfo
            onSubmit={updatePersonalInfo}
            defaultValues={resumeData.personalInfo}
          />

          <Experience
            onSubmit={({ experiences }) => updateExperiences(experiences)}
            defaultValues={{ experiences: resumeData.experiences }}
          />

          <Education
            onSubmit={({ education }) => updateEducation(education)}
            defaultValues={{ education: resumeData.education }}
          />

          <Skills
            onSubmit={({ skillGroups }) => updateSkills(skillGroups)}
            defaultValues={{ skillGroups: resumeData.skillGroups }}
          />
        </div>
      )}
    </div>
  );
}
