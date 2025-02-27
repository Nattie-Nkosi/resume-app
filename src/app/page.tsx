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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Menu,
  ChevronDown,
} from "lucide-react";
import ErrorBoundary from "@/components/error-boundary";
import { saveAs } from "file-saver";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  // Get current section name for mobile display
  const currentSectionName =
    allSections.find((section) => section.id === activeTab)?.label || "Section";

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
      case "references":
        updateReferences([
          {
            name: "",
            company: "",
            position: "",
            contact: "",
            relationship: "",
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
        if (data.references) {
          updateReferences(data.references);
          toggleSection("references", true);
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
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="flex flex-col space-y-6 sm:space-y-8">
        {/* Header Section - Responsive */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6">
          {/* Title */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Build Your Professional Resume
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Create, customize, and download your resume for any job
              application.
            </p>
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden sm:flex flex-wrap gap-2 justify-end">
            <Button onClick={exportResumeData} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
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
              size="sm"
              className="flex items-center"
            >
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? "Edit Resume" : "Preview"}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Reset
                </Button>
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

          {/* Action Buttons - Mobile */}
          <div className="flex sm:hidden justify-between gap-2 w-full">
            <Button
              onClick={togglePreview}
              variant={showPreview ? "default" : "outline"}
              size="sm"
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? "Edit" : "Preview"}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4 mr-2" />
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportResumeData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    document.getElementById("import-file")?.click()
                  }
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    document.getElementById("reset-button")?.click();
                  }}
                  className="text-destructive"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                  </svg>
                  Reset All Data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button id="reset-button" className="hidden">
                  Reset
                </button>
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
              {/* Section Tabs - Desktop */}
              <div className="hidden md:block">
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

                  {/* Section Content - Desktop */}
                  <div>
                    {activeTab === "personalInfo" && (
                      <PersonalInfo
                        onSubmit={updatePersonalInfo}
                        defaultValues={resumeData.personalInfo}
                      />
                    )}

                    {activeTab === "experiences" && (
                      <Experience
                        onSubmit={({ experiences }) =>
                          updateExperiences(experiences)
                        }
                        defaultValues={{ experiences: resumeData.experiences }}
                      />
                    )}

                    {activeTab === "education" && (
                      <Education
                        onSubmit={({ education }) => updateEducation(education)}
                        defaultValues={{ education: resumeData.education }}
                      />
                    )}

                    {activeTab === "skills" && (
                      <Skills
                        onSubmit={({ skillGroups }) =>
                          updateSkills(skillGroups)
                        }
                        defaultValues={{ skillGroups: resumeData.skillGroups }}
                      />
                    )}

                    {/* Optional Sections */}
                    {activeSections.includes("projects") &&
                      activeTab === "projects" && (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl sm:text-2xl font-bold">
                              Projects
                            </h2>
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
                            onSubmit={({ projects }) =>
                              updateProjects(projects)
                            }
                            defaultValues={{
                              projects: resumeData.projects || [],
                            }}
                          />
                        </div>
                      )}

                    {activeSections.includes("certificates") &&
                      activeTab === "certificates" && (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl sm:text-2xl font-bold">
                              Certifications
                            </h2>
                            {!allSections.find((s) => s.id === "certificates")
                              ?.required && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  toggleSection("certificates", false)
                                }
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
                        </div>
                      )}

                    {activeSections.includes("achievements") &&
                      activeTab === "achievements" && (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl sm:text-2xl font-bold">
                              Key Achievements
                            </h2>
                            {!allSections.find((s) => s.id === "achievements")
                              ?.required && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  toggleSection("achievements", false)
                                }
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
                        </div>
                      )}

                    {activeSections.includes("references") &&
                      activeTab === "references" && (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl sm:text-2xl font-bold">
                              References
                            </h2>
                            {!allSections.find((s) => s.id === "references")
                              ?.required && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  toggleSection("references", false)
                                }
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
                        </div>
                      )}
                  </div>
                </Tabs>
              </div>

              {/* Section Tabs - Mobile */}
              <div className="md:hidden">
                <div className="flex flex-col gap-4 mb-6">
                  {/* Section Dropdown */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                      {currentSectionName}
                    </h2>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                        >
                          Navigate
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        {activeSectionData.map((section) => (
                          <DropdownMenuItem
                            key={section.id}
                            onClick={() => setActiveTab(section.id)}
                            className={
                              activeTab === section.id ? "bg-accent" : ""
                            }
                          >
                            {section.icon}
                            <span>{section.label}</span>
                          </DropdownMenuItem>
                        ))}

                        {optionalSections.length > 0 && (
                          <>
                            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                              Add Section
                            </div>
                            {optionalSections.map((section) => (
                              <DropdownMenuItem
                                key={section.id}
                                onClick={() => handleAddSection(section.id)}
                              >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                {section.label}
                              </DropdownMenuItem>
                            ))}
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Mobile Section Content */}
                  <div>
                    {activeTab === "personalInfo" && (
                      <PersonalInfo
                        onSubmit={updatePersonalInfo}
                        defaultValues={resumeData.personalInfo}
                      />
                    )}

                    {activeTab === "experiences" && (
                      <Experience
                        onSubmit={({ experiences }) =>
                          updateExperiences(experiences)
                        }
                        defaultValues={{ experiences: resumeData.experiences }}
                      />
                    )}

                    {activeTab === "education" && (
                      <Education
                        onSubmit={({ education }) => updateEducation(education)}
                        defaultValues={{ education: resumeData.education }}
                      />
                    )}

                    {activeTab === "skills" && (
                      <Skills
                        onSubmit={({ skillGroups }) =>
                          updateSkills(skillGroups)
                        }
                        defaultValues={{ skillGroups: resumeData.skillGroups }}
                      />
                    )}

                    {/* Optional Sections */}
                    {activeSections.includes("projects") &&
                      activeTab === "projects" && (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Projects</h2>
                            {!allSections.find((s) => s.id === "projects")
                              ?.required && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleSection("projects", false)}
                                className="text-destructive hover:text-destructive"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <Projects
                            onSubmit={({ projects }) =>
                              updateProjects(projects)
                            }
                            defaultValues={{
                              projects: resumeData.projects || [],
                            }}
                          />
                        </div>
                      )}

                    {activeSections.includes("certificates") &&
                      activeTab === "certificates" && (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                              Certifications
                            </h2>
                            {!allSections.find((s) => s.id === "certificates")
                              ?.required && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  toggleSection("certificates", false)
                                }
                                className="text-destructive hover:text-destructive"
                              >
                                Remove
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
                        </div>
                      )}

                    {activeSections.includes("achievements") &&
                      activeTab === "achievements" && (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                              Key Achievements
                            </h2>
                            {!allSections.find((s) => s.id === "achievements")
                              ?.required && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  toggleSection("achievements", false)
                                }
                                className="text-destructive hover:text-destructive"
                              >
                                Remove
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
                        </div>
                      )}

                    {activeSections.includes("references") &&
                      activeTab === "references" && (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">References</h2>
                            {!allSections.find((s) => s.id === "references")
                              ?.required && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  toggleSection("references", false)
                                }
                                className="text-destructive hover:text-destructive"
                              >
                                Remove
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
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons - Always visible */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={activeSections.indexOf(activeTab) === 0}
                  className="w-full"
                >
                  Previous
                </Button>

                <Button onClick={handleNext} className="w-full">
                  {isLastTab ? "Preview Resume" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}
