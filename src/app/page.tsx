"use client";

import React, { useState } from "react";
import PersonalInfo from "@/components/personal-info";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Certifications from "@/components/certifications";
import Achievements from "@/components/achievements";
import References from "@/components/references";
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
  Download,
  Upload,
  Award,
  Trophy,
  PlusCircle,
  Users,
} from "lucide-react";
import ErrorBoundary from "@/components/error-boundary";
import { saveAs } from "file-saver";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Home() {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [showPreview, setShowPreview] = useState(false);

  // Get data and methods from the store
  const resumeData = useResumeStore((state) => state.resumeData);
  const activeSections = useResumeStore((state) => state.activeSections);
  const toggleSection = useResumeStore((state) => state.toggleSection);
  const updatePersonalInfo = useResumeStore(
    (state) => state.updatePersonalInfo
  );
  const updateExperiences = useResumeStore((state) => state.updateExperiences);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const updateSkills = useResumeStore((state) => state.updateSkills);
  const updateProjects = useResumeStore((state) => state.updateProjects);
  const updateReferences = useResumeStore((state) => state.updateReferences);
  const updateCertificates = useResumeStore(
    (state) => state.updateCertificates
  );
  const updateAchievements = useResumeStore(
    (state) => state.updateAchievements
  );
  const resetStore = useResumeStore((state) => state.resetStore);

  // Define all available section data
  const allSections = [
    {
      id: "personalInfo",
      icon: <UserRound className="h-4 w-4 mr-2" />,
      label: "Personal Info",
      required: true,
    },
    {
      id: "experiences",
      icon: <Briefcase className="h-4 w-4 mr-2" />,
      label: "Experience",
      required: true,
    },
    {
      id: "education",
      icon: <GraduationCap className="h-4 w-4 mr-2" />,
      label: "Education",
      required: true,
    },
    {
      id: "skills",
      icon: <Lightbulb className="h-4 w-4 mr-2" />,
      label: "Skills",
      required: true,
    },
    {
      id: "projects",
      icon: <FolderKanban className="h-4 w-4 mr-2" />,
      label: "Projects",
      required: false,
    },
    {
      id: "certificates",
      icon: <Award className="h-4 w-4 mr-2" />,
      label: "Certifications",
      required: false,
    },
    {
      id: "achievements",
      icon: <Trophy className="h-4 w-4 mr-2" />,
      label: "Achievements",
      required: false,
    },
    {
      id: "references",
      icon: <Users className="h-4 w-4 mr-2" />,
      label: "References",
      required: false,
    },
  ];

  // Get active section data
  const activeSectionData = allSections.filter((section) =>
    activeSections.includes(section.id)
  );

  // Get optional sections that can be added
  const optionalSections = allSections.filter(
    (section) => !section.required && !activeSections.includes(section.id)
  );

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

  // Handle adding a new section
  const handleAddSection = (sectionId: string) => {
    toggleSection(sectionId, true);

    // Initialize empty data for the new section
    switch (sectionId) {
      case "projects":
        updateProjects([
          {
            title: "",
            description: "",
            technologies: [],
            startDate: "",
            endDate: "",
          },
        ]);
        break;
      case "certificates":
        updateCertificates([
          {
            name: "",
            issuer: "",
            date: "",
            expiration: "",
            credentialId: "",
            link: "",
          },
        ]);
        break;
      case "achievements":
        updateAchievements([
          {
            title: "",
            organization: "",
            date: "",
            description: "",
          },
        ]);
        break;
    }

    // Switch to the new section
    setActiveTab(sectionId);
  };

  // Export and import functionality
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

        // Update optional sections if they exist in the imported data
        if (data.projects) {
          updateProjects(data.projects);
          toggleSection("projects", true);
        }
        if (data.certificates) {
          updateCertificates(data.certificates);
          toggleSection("certificates", true);
        }
        if (data.achievements) {
          updateAchievements(data.achievements);
          toggleSection("achievements", true);
        }
      } catch (error) {
        console.error("Error importing data:", error);
      }
    };
    reader.readAsText(file);
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

  // Check if current tab is the last one
  const isLastTab =
    activeSections.indexOf(activeTab) === activeSections.length - 1;

  return (
    <div className="container mx-auto p-6 pt-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Build Your Professional Resume</h1>
          <p className="text-muted-foreground mt-2">
            Create, customize, and download your resume for any job application.
          </p>
        </div>
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

      <ErrorBoundary>
        {showPreview ? (
          <ComprehensivePreview data={resumeData} />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="flex flex-wrap mb-6 h-auto">
                  {activeSectionData.map((section) => (
                    <TabsTrigger
                      key={section.id}
                      value={section.id}
                      className="flex items-center"
                    >
                      {section.icon}
                      {section.label}
                    </TabsTrigger>
                  ))}

                  {/* Add Section Button */}
                  {optionalSections.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="ml-2">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Section
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56">
                        <div className="space-y-2">
                          {optionalSections.map((section) => (
                            <div
                              key={section.id}
                              className="flex items-center py-1 cursor-pointer hover:bg-muted px-2 rounded"
                              onClick={() => handleAddSection(section.id)}
                            >
                              {section.icon}
                              <span>{section.label}</span>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                </TabsList>

                {/* Section Content */}
                <TabsContent value="personalInfo">
                  <PersonalInfo
                    onSubmit={updatePersonalInfo}
                    defaultValues={resumeData.personalInfo}
                  />
                </TabsContent>

                <TabsContent value="experiences">
                  <Experience
                    onSubmit={({ experiences }) =>
                      updateExperiences(experiences)
                    }
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

                {/* Optional Sections - only render if active */}
                {activeSections.includes("projects") && (
                  <TabsContent value="projects">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold">Projects</h2>
                      {!allSections.find((s) => s.id === "projects")
                        ?.required && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleSection("projects", false)}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove Section
                        </Button>
                      )}
                    </div>
                    <Projects
                      onSubmit={({ projects }) => updateProjects(projects)}
                      defaultValues={{ projects: resumeData.projects || [] }}
                    />
                  </TabsContent>
                )}

                {activeSections.includes("certificates") && (
                  <TabsContent value="certificates">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold">Certifications</h2>
                      {!allSections.find((s) => s.id === "certificates")
                        ?.required && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleSection("certificates", false)}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove Section
                        </Button>
                      )}
                    </div>
                    <Certifications
                      onSubmit={({ certificates }) =>
                        updateCertificates(certificates)
                      }
                      defaultValues={{
                        certificates: resumeData.certificates || [],
                      }}
                    />
                  </TabsContent>
                )}

                {activeSections.includes("achievements") && (
                  <TabsContent value="achievements">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold">Key Achievements</h2>
                      {!allSections.find((s) => s.id === "achievements")
                        ?.required && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleSection("achievements", false)}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove Section
                        </Button>
                      )}
                    </div>
                    <Achievements
                      onSubmit={({ achievements }) =>
                        updateAchievements(achievements)
                      }
                      defaultValues={{
                        achievements: resumeData.achievements || [],
                      }}
                    />
                  </TabsContent>
                )}

                {activeSections.includes("references") && (
                  <TabsContent value="references">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold">References</h2>
                      {!allSections.find((s) => s.id === "references")
                        ?.required && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleSection("references", false)}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove Section
                        </Button>
                      )}
                    </div>
                    <References
                      onSubmit={({ references }) =>
                        updateReferences(references)
                      }
                      defaultValues={{
                        references: resumeData.references || [],
                      }}
                    />
                  </TabsContent>
                )}
              </Tabs>
            </div>

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
