"use client";

import React from "react";
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
} from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";

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

const skillsSchema = z.object({
  skillGroups: z.array(
    z.object({
      category: z.enum(skillCategories),
      skills: z.array(
        z.object({
          name: z.string().min(1, { message: "Skill name is required" }),
          proficiency: z.enum(proficiencyLevels),
        })
      ),
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

  const skillsArrays = groupFields.map((_, index) => ({
    ...useFieldArray({
      name: `skillGroups.${index}.skills`,
      control: form.control,
    }),
  }));

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>
          Add your skills and proficiency levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={form.handleSubmit(onSubmit)} className="space-y-4">
            {groupFields.map((groupField, groupIndex) => {
              const skillsArray = skillsArrays[groupIndex];

              return (
                <div
                  key={groupField.id}
                  className="p-4 border rounded-lg space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">
                      Skill Group {groupIndex + 1}
                    </h3>
                    {groupIndex > 0 && (
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeGroup(groupIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name={`skillGroups.${groupIndex}.category`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    {skillsArray.fields.map((skillField, skillIndex) => (
                      <div key={skillField.id} className="flex gap-4 items-end">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={`skillGroups.${groupIndex}.skills.${skillIndex}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Skill Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter skill" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={`skillGroups.${groupIndex}.skills.${skillIndex}.proficiency`}
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

                        {skillsArray.fields.length > 1 && (
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => skillsArray.remove(skillIndex)}
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
                        skillsArray.append({
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
            })}

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
      </CardContent>
    </Card>
  );
};

export default Skills;
