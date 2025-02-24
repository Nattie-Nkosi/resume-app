"use client";

import React, { useState } from "react";
import PersonalInfo from "@/components/personal-info";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Skills from "@/components/skills";
import ComprehensivePreview from "../components/resume-preview/ComprehensivePreview";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "./store/useResumeStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserRound,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Eye,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("personal-info");
  const [showPreview, setShowPreview] = useState(false);

  const resumeData = useResumeStore((state) => state.resumeData);
  const updatePersonalInfo = useResumeStore(
    (state) => state.updatePersonalInfo
  );
  const updateExperiences = useResumeStore((state) => state.updateExperiences);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const updateSkills = useResumeStore((state) => state.updateSkills);
  const resetStore = useResumeStore((state) => state.resetStore);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Resume Builder</h1>
        <div className="flex gap-2">
          <Button
            onClick={togglePreview}
            variant={showPreview ? "default" : "outline"}
            className="flex items-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? "Edit Resume" : "Preview Resume"}
          </Button>
          <Button onClick={resetStore} variant="destructive">
            Reset
          </Button>
        </div>
      </div>

      {showPreview ? (
        <ComprehensivePreview data={resumeData} />
      ) : (
        <div className="space-y-6">
          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="personal-info" className="flex items-center">
                <UserRound className="h-4 w-4 mr-2" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2" />
                Education
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center">
                <Lightbulb className="h-4 w-4 mr-2" />
                Skills
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal-info">
              <PersonalInfo
                onSubmit={updatePersonalInfo}
                defaultValues={resumeData.personalInfo}
              />
            </TabsContent>

            <TabsContent value="experience">
              <Experience
                onSubmit={({ experiences }) => updateExperiences(experiences)}
                defaultValues={{ experiences: resumeData.experiences }}
              />
            </TabsContent>

            <TabsContent value="education">
              <Education
                onSubmit={({ education }) => updateEducation(education)}
                defaultValues={{ education: resumeData.education }}
              />
            </TabsContent>

            <TabsContent value="skills">
              <Skills
                onSubmit={({ skillGroups }) => updateSkills(skillGroups)}
                defaultValues={{ skillGroups: resumeData.skillGroups }}
              />
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                const prevTab = {
                  experience: "personal-info",
                  education: "experience",
                  skills: "education",
                }[activeTab];
                if (prevTab) setActiveTab(prevTab);
              }}
              disabled={activeTab === "personal-info"}
            >
              Previous
            </Button>

            <Button
              onClick={() => {
                const nextTab = {
                  "personal-info": "experience",
                  experience: "education",
                  education: "skills",
                  skills: "skills",
                }[activeTab];
                if (nextTab) setActiveTab(nextTab);
                if (activeTab === "skills") togglePreview();
              }}
            >
              {activeTab === "skills" ? "Preview Resume" : "Next"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
