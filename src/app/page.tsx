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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  Download,
  Upload,
} from "lucide-react";
import ErrorBoundary from "@/components/error-boundary";
import { saveAs } from "file-saver";

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
  /* const updateCertificates = useResumeStore(
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
  ); */
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

  // Add these functions:
  const exportResumeData = () => {
    const data = JSON.stringify(resumeData);
    const blob = new Blob([data], { type: "application/json" });
    const filename = `${resumeData.personalInfo.fullName || "resume"}_data.json`
      .toLowerCase()
      .replace(/\s+/g, "_");
    saveAs(blob, filename);
  };

  const importResumeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        // Update all sections of the resume
        updatePersonalInfo(data.personalInfo);
        updateExperiences(data.experiences);
        updateEducation(data.education);
        updateSkills(data.skillGroups);
        // Update optional sections as needed
        if (data.projects) updateProjects(data.projects);
        // etc. for other sections

        // Add success message
      } catch (error) {
        console.error("Error importing data:", error);
        // Show error message
      }
    };
    reader.readAsText(file);
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
          <Button onClick={exportResumeData} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => document.getElementById("import-file")?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
            <input
              id="import-file"
              type="file"
              accept=".json"
              className="hidden"
              onChange={importResumeData}
            />
          </div>
          <Button
            onClick={togglePreview}
            variant={showPreview ? "default" : "outline"}
            className="flex items-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? "Edit Resume" : "Preview Resume"}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Reset</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all your resume data and cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetStore}>
                  Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Section Manager */}
      <div className="mb-6">
        <SectionManager />
      </div>

      <ErrorBoundary>
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
                    {
                      sectionTabData[section as keyof typeof sectionTabData]
                        ?.icon
                    }
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

              {
                <TabsContent value="skills">
                  <Skills
                    onSubmit={({ skillGroups }) => updateSkills(skillGroups)}
                    defaultValues={{ skillGroups: resumeData.skillGroups }}
                  />
                </TabsContent>
              }

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
      </ErrorBoundary>
    </div>
  );
}
