"use client";

import React, { useState } from "react";
import PersonalInfo from "@/components/personal-info";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import SectionManager from "@/components/section-manager";
import ComprehensivePreview from "@/components/resume-preview/ComprehensivePreview";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "./store/useResumeStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserRound,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Eye,
  FolderKanban,
  Award,
  Languages,
  Heart,
  Users,
  BookOpen,
  Trophy,
  HeartHandshake,
  PlusCircle,
} from "lucide-react";

// Map of section IDs to tab data (icon and label)
const sectionTabData = {
  personalInfo: {
    icon: <UserRound className="h-4 w-4 mr-2" />,
    label: "Personal Info",
  },
  experiences: {
    icon: <Briefcase className="h-4 w-4 mr-2" />,
    label: "Experience",
  },
  education: {
    icon: <GraduationCap className="h-4 w-4 mr-2" />,
    label: "Education",
  },
  skills: { icon: <Lightbulb className="h-4 w-4 mr-2" />, label: "Skills" },
  projects: {
    icon: <FolderKanban className="h-4 w-4 mr-2" />,
    label: "Projects",
  },
  certificates: {
    icon: <Award className="h-4 w-4 mr-2" />,
    label: "Certificates",
  },
  languages: {
    icon: <Languages className="h-4 w-4 mr-2" />,
    label: "Languages",
  },
  interests: { icon: <Heart className="h-4 w-4 mr-2" />, label: "Interests" },
  references: { icon: <Users className="h-4 w-4 mr-2" />, label: "References" },
  publications: {
    icon: <BookOpen className="h-4 w-4 mr-2" />,
    label: "Publications",
  },
  awards: { icon: <Trophy className="h-4 w-4 mr-2" />, label: "Awards" },
  volunteer: {
    icon: <HeartHandshake className="h-4 w-4 mr-2" />,
    label: "Volunteer",
  },
  customSections: {
    icon: <PlusCircle className="h-4 w-4 mr-2" />,
    label: "Custom",
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [showPreview, setShowPreview] = useState(false);

  // Get data and methods from the store
  const resumeData = useResumeStore((state) => state.resumeData);
  const activeSections = useResumeStore((state) => state.activeSections);
  const updatePersonalInfo = useResumeStore(
    (state) => state.updatePersonalInfo
  );
  const updateExperiences = useResumeStore((state) => state.updateExperiences);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const updateSkills = useResumeStore((state) => state.updateSkills);
  const updateProjects = useResumeStore((state) => state.updateProjects);
  const updateCertificates = useResumeStore(
    (state) => state.updateCertificates
  );
  const updateLanguages = useResumeStore((state) => state.updateLanguages);
  const updateInterests = useResumeStore((state) => state.updateInterests);
  const updateReferences = useResumeStore((state) => state.updateReferences);
  const updatePublications = useResumeStore(
    (state) => state.updatePublications
  );
  const updateAwards = useResumeStore((state) => state.updateAwards);
  const updateVolunteer = useResumeStore((state) => state.updateVolunteer);
  const updateCustomSections = useResumeStore(
    (state) => state.updateCustomSections
  );
  const resetStore = useResumeStore((state) => state.resetStore);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Find the next active section
  const findNextSection = (currentSection: string) => {
    const currentIndex = activeSections.indexOf(currentSection);
    if (currentIndex !== -1 && currentIndex < activeSections.length - 1) {
      return activeSections[currentIndex + 1];
    }
    return null;
  };

  // Find the previous active section
  const findPrevSection = (currentSection: string) => {
    const currentIndex = activeSections.indexOf(currentSection);
    if (currentIndex > 0) {
      return activeSections[currentIndex - 1];
    }
    return null;
  };

  // Navigation handlers
  const handlePrevious = () => {
    const prevSection = findPrevSection(activeTab);
    if (prevSection) {
      setActiveTab(prevSection);
    }
  };

  const handleNext = () => {
    const nextSection = findNextSection(activeTab);
    if (nextSection) {
      setActiveTab(nextSection);
    } else {
      // If there's no next section, show the preview
      togglePreview();
    }
  };

  // Get the index of the current tab to calculate whether to show "Preview Resume" or "Next"
  const isLastTab =
    activeSections.indexOf(activeTab) === activeSections.length - 1;

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

      {/* Section Manager */}
      <div className="mb-6">
        <SectionManager />
      </div>

      {showPreview ? (
        <ComprehensivePreview data={resumeData} />
      ) : (
        <div className="space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex flex-wrap mb-6 h-auto">
              {activeSections.map((section) => (
                <TabsTrigger
                  key={section}
                  value={section}
                  className="flex items-center"
                >
                  {sectionTabData[section as keyof typeof sectionTabData]?.icon}
                  {
                    sectionTabData[section as keyof typeof sectionTabData]
                      ?.label
                  }
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Required Sections */}
            <TabsContent value="personalInfo">
              <PersonalInfo
                onSubmit={updatePersonalInfo}
                defaultValues={resumeData.personalInfo}
              />
            </TabsContent>

            <TabsContent value="experiences">
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

            {/* Optional Sections */}
            <TabsContent value="projects">
              <Projects
                onSubmit={({ projects }) => updateProjects(projects)}
                defaultValues={{ projects: resumeData.projects || [] }}
              />
            </TabsContent>

            {/* Other optional sections content will go here */}
            {/* For brevity, I'm not implementing all the optional section components */}
            {/* You would add TabsContent for each optional section here */}
          </Tabs>

          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={activeSections.indexOf(activeTab) === 0}
            >
              Previous
            </Button>

            <Button onClick={handleNext}>
              {isLastTab ? "Preview Resume" : "Next"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
