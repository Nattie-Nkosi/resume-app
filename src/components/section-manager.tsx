"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/app/store/useResumeStore";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";

// Define section metadata
const sectionOptions = [
  {
    id: "projects",
    name: "Projects",
    description: "Showcase your personal or professional projects",
    required: false,
  },
  {
    id: "certificates",
    name: "Certifications",
    description: "Display professional certifications and licenses",
    required: false,
  },
  {
    id: "languages",
    name: "Languages",
    description: "List languages you speak and your proficiency level",
    required: false,
  },
  {
    id: "interests",
    name: "Interests & Hobbies",
    description: "Share your personal interests and hobbies",
    required: false,
  },
  {
    id: "references",
    name: "References",
    description: "Include professional references",
    required: false,
  },
  {
    id: "publications",
    name: "Publications",
    description: "List your publications, articles, or papers",
    required: false,
  },
  {
    id: "awards",
    name: "Awards & Achievements",
    description: "Showcase your awards and notable achievements",
    required: false,
  },
  {
    id: "volunteer",
    name: "Volunteer Experience",
    description: "Share your volunteer work and community service",
    required: false,
  },
  {
    id: "customSections",
    name: "Custom Section",
    description: "Create your own personalized section",
    required: false,
  },
];

const requiredSections = [
  {
    id: "personalInfo",
    name: "Personal Information",
    required: true,
  },
  {
    id: "experiences",
    name: "Experience",
    required: true,
  },
  {
    id: "education",
    name: "Education",
    required: true,
  },
  {
    id: "skills",
    name: "Skills",
    required: true,
  },
];

const SectionManager = () => {
  const { activeSections, addSection, removeSection } = useResumeStore();

  const handleSectionToggle = (sectionId: string, isActive: boolean) => {
    console.log(
      `Toggling section: ${sectionId}, currently active: ${isActive}`
    );
    if (isActive) {
      removeSection(sectionId);
    } else {
      addSection(sectionId);
    }
    console.log("Active sections after toggle:", activeSections);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Resume Sections
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Section
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium leading-none">Optional Sections</h4>
                <p className="text-sm text-muted-foreground">
                  Add additional sections to enhance your resume.
                </p>
                <div className="space-y-2">
                  {sectionOptions.map((section) => {
                    const isActive = activeSections.includes(section.id);
                    return (
                      <div
                        key={section.id}
                        className="flex items-start space-x-2"
                      >
                        <Checkbox
                          id={`section-${section.id}`}
                          checked={isActive}
                          onCheckedChange={(checked) =>
                            handleSectionToggle(section.id, !!checked)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor={`section-${section.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {section.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {section.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </CardTitle>
        <CardDescription>
          Customize your resume by adding or removing sections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {requiredSections.map((section) => (
            <Badge key={section.id} variant="outline">
              {section.name}
              {section.required && " *"}
            </Badge>
          ))}

          {sectionOptions
            .filter((section) => activeSections.includes(section.id))
            .map((section) => (
              <Badge
                key={section.id}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleSectionToggle(section.id, true)}
              >
                {section.name} ×
              </Badge>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionManager;
