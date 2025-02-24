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
            {groupFields.map((groupField, groupIndex) => (
              <SkillGroup
                key={groupField.id}
                control={form.control}
                index={groupIndex}
                onRemove={() => removeGroup(groupIndex)}
                isRemovable={groupIndex > 0}
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
      </CardContent>
    </Card>
  );
};

interface SkillGroupProps {
  control: any;
  index: number;
  onRemove: () => void;
  isRemovable: boolean;
}

const SkillGroup: React.FC<SkillGroupProps> = ({
  control,
  index,
  onRemove,
  isRemovable,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: `skillGroups.${index}.skills`,
    control,
  });

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Skill Group {index + 1}</h3>
        {isRemovable && (
          <Button variant="destructive" size="icon" onClick={onRemove}>
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
            <FormMessage />
          </FormItem>
        )}
      />

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
                      <Input placeholder="Enter skill" {...field} />
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
