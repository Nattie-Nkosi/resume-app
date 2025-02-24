"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash2, Info, HelpCircle } from "lucide-react";

const skillCategories = [
  "Technical",
  "Soft Skills",
  "Languages",
  "Tools",
  "Frameworks",
  "Other",
] as const;

const proficiencyLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
] as const;

// Define skill examples for each category
const skillExamples = {
  Technical: [
    "JavaScript",
    "Python",
    "React",
    "Java",
    "SQL",
    "C++",
    "Machine Learning",
  ],
  "Soft Skills": [
    "Communication",
    "Leadership",
    "Problem Solving",
    "Teamwork",
    "Time Management",
  ],
  Languages: ["English", "French", "Spanish", "Chinese", "German", "Arabic"],
  Tools: ["Git", "Docker", "Photoshop", "Excel", "JIRA", "Figma", "Adobe XD"],
  Frameworks: [
    "React",
    "Angular",
    "Vue.js",
    "Django",
    "Spring Boot",
    "Flutter",
    "Express.js",
  ],
  Other: [
    "Project Management",
    "Digital Marketing",
    "Data Analysis",
    "UX Design",
    "Content Writing",
  ],
};

const skillsSchema = z.object({
  skillGroups: z.array(
    z.object({
      category: z.enum(skillCategories),
      skills: z
        .array(
          z.object({
            name: z
              .string()
              .min(1, { message: "Skill name is required" })
              .max(50, { message: "Skill name is too long" }),
            proficiency: z.enum(proficiencyLevels),
          })
        )
        .min(1, { message: "At least one skill is required" }),
    })
  ),
});

type SkillsFormValues = z.infer<typeof skillsSchema>;

interface SkillsProps {
  onSubmit: (values: SkillsFormValues) => void;
  defaultValues?: SkillsFormValues;
}

const Skills: React.FC<SkillsProps> = ({
  onSubmit,
  defaultValues = {
    skillGroups: [
      {
        category: "Technical",
        skills: [{ name: "", proficiency: "Intermediate" }],
      },
    ],
  },
}) => {
  const form = useForm<SkillsFormValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues,
  });

  const {
    fields: groupFields,
    append: appendGroup,
    remove: removeGroup,
  } = useFieldArray({
    name: "skillGroups",
    control: form.control,
  });

  // Watch for form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.skillGroups) {
        onSubmit(value as SkillsFormValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onSubmit]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          Skills
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 ml-2">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Group your skills by category and indicate your proficiency
                  level. Use skill groups to organize different types of skills.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>
          Add your skills and proficiency levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            {groupFields.map((groupField, groupIndex) => (
              <SkillGroup
                key={groupField.id}
                control={form.control}
                index={groupIndex}
                onRemove={() => removeGroup(groupIndex)}
                isRemovable={groupIndex > 0}
                category={form.watch(`skillGroups.${groupIndex}.category`)}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() =>
                appendGroup({
                  category: "Technical",
                  skills: [{ name: "", proficiency: "Intermediate" }],
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Skill Group
            </Button>
          </form>
        </Form>

        <div className="mt-6">
          <Accordion type="single" collapsible className="border rounded-md">
            <AccordionItem value="tips">
              <AccordionTrigger className="px-4">
                <span className="flex items-center">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Skills Tips
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="text-sm text-gray-600 space-y-3">
                  <p>
                    <strong>What proficiency levels mean:</strong>
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>
                      <strong>Beginner:</strong> Basic understanding, limited
                      practical experience
                    </li>
                    <li>
                      <strong>Intermediate:</strong> Good working knowledge,
                      independent application
                    </li>
                    <li>
                      <strong>Advanced:</strong> Deep understanding, extensive
                      experience
                    </li>
                    <li>
                      <strong>Expert:</strong> Comprehensive mastery, able to
                      teach or innovate
                    </li>
                  </ul>
                  <p className="mt-3">
                    <strong>Best practices:</strong>
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Group similar skills together</li>
                    <li>Be honest about your proficiency levels</li>
                    <li>Include both technical and soft skills</li>
                    <li>
                      Focus on skills relevant to the job you&apos;re applying
                      for
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

interface SkillGroupProps {
  control: any;
  index: number;
  onRemove: () => void;
  isRemovable: boolean;
  category: string;
}

const SkillGroup: React.FC<SkillGroupProps> = ({
  control,
  index,
  onRemove,
  isRemovable,
  category,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: `skillGroups.${index}.skills`,
    control,
  });

  // Get examples for the selected category
  const examples = skillExamples[category as keyof typeof skillExamples] || [];

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Skill Group {index + 1}</h3>
        {isRemovable && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <FormField
        control={control}
        name={`skillGroups.${index}.category`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {skillCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Group similar skills under the same category
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {examples.length > 0 && (
        <div className="text-sm text-gray-500 -mt-2">
          <p>Examples: {examples.slice(0, 5).join(", ")}</p>
        </div>
      )}

      <div className="space-y-4">
        {fields.map((skillField, skillIndex) => (
          <div key={skillField.id} className="flex gap-4 items-end">
            <div className="flex-1">
              <FormField
                control={control}
                name={`skillGroups.${index}.skills.${skillIndex}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`e.g., ${examples[0] || "Enter skill"}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1">
              <FormField
                control={control}
                name={`skillGroups.${index}.skills.${skillIndex}.proficiency`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proficiency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {proficiencyLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {fields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(skillIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() =>
            append({
              name: "",
              proficiency: "Intermediate",
            })
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>
    </div>
  );
};

export default Skills;
