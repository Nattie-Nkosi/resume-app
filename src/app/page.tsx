"use client";

import React from "react";
import PersonalInfo from "@/components/personal-info";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Skills from "@/components/skills";

export default function Home() {
  const handlePersonalInfoSubmit = (data: any) => {
    console.log("Personal Info updated:", data);
  };

  const handleExperienceSubmit = (data: any) => {
    console.log("Experience updated:", data);
  };

  const handleEducationSubmit = (data: any) => {
    console.log("Education updated:", data);
  };

  const handleSkillsSubmit = (data: any) => {
    console.log("Skills updated:", data);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Resume Builder</h1>

      <PersonalInfo
        onSubmit={handlePersonalInfoSubmit}
        defaultValues={{
          fullName: "",
          email: "",
          phone: "",
          location: "",
          summary: "",
        }}
      />

      <Experience
        onSubmit={handleExperienceSubmit}
        defaultValues={{
          experiences: [
            {
              company: "",
              position: "",
              startDate: "",
              endDate: "",
              description: "",
              location: "",
            },
          ],
        }}
      />

      <Education
        onSubmit={handleEducationSubmit}
        defaultValues={{
          education: [
            {
              institution: "",
              degree: "",
              field: "",
              startDate: "",
              endDate: "",
              location: "",
              gpa: "",
              achievements: "",
            },
          ],
        }}
      />

      <Skills
        onSubmit={handleSkillsSubmit}
        defaultValues={{
          skillGroups: [
            {
              category: "Technical",
              skills: [{ name: "", proficiency: "Intermediate" }],
            },
          ],
        }}
      />
      {/* Other components will be added here */}
    </div>
  );
}
