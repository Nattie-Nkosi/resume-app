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
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Link, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const projectSchema = z.object({
  projects: z.array(
    z.object({
      title: z.string().min(2, { message: "Title is required" }),
      description: z
        .string()
        .min(10, { message: "Please provide more details about this project" }),
      technologies: z
        .array(z.string())
        .min(1, { message: "Add at least one technology" }),
      link: z.string().url().optional().or(z.literal("")),
      startDate: z.string().min(1, { message: "Start date is required" }),
      endDate: z.string(),
      currentProject: z.boolean().optional(),
    })
  ),
});

type ProjectsFormValues = z.infer<typeof projectSchema>;

interface ProjectsProps {
  onSubmit: (values: ProjectsFormValues) => void;
  defaultValues?: ProjectsFormValues;
}

const Projects: React.FC<ProjectsProps> = ({
  onSubmit,
  defaultValues = {
    projects: [
      {
        title: "",
        description: "",
        technologies: [],
        link: "",
        startDate: "",
        endDate: "",
        currentProject: false,
      },
    ],
  },
}) => {
  const form = useForm<ProjectsFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "projects",
    control: form.control,
  });

  // Watch form changes and update parent component
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.projects) {
        onSubmit(value as ProjectsFormValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onSubmit]);

  // Watch for "current project" checkbox changes
  const handleCurrentProjectChange = (index: number, checked: boolean) => {
    if (checked) {
      form.setValue(`projects.${index}.endDate`, "");
    }
  };

  // Handle adding a technology
  const handleAddTechnology = (index: number) => {
    const techInput = document.getElementById(
      `tech-input-${index}`
    ) as HTMLInputElement;
    if (techInput && techInput.value) {
      const currentTech =
        form.getValues(`projects.${index}.technologies`) || [];
      form.setValue(`projects.${index}.technologies`, [
        ...currentTech,
        techInput.value,
      ]);
      techInput.value = "";
    }
  };

  // Handle removing a technology
  const handleRemoveTechnology = (projectIndex: number, techIndex: number) => {
    const currentTech =
      form.getValues(`projects.${projectIndex}.technologies`) || [];
    const updatedTech = [...currentTech];
    updatedTech.splice(techIndex, 1);
    form.setValue(`projects.${projectIndex}.technologies`, updatedTech);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          Projects
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
                  Add notable projects you&apos;ve worked on. Include details
                  about technologies used and your contributions.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>
          Add notable projects you&apos;ve worked on
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Project {index + 1}</h3>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name={`projects.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="E-commerce Website" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Technologies Used</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form
                      .getValues(`projects.${index}.technologies`)
                      ?.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() =>
                            handleRemoveTechnology(index, techIndex)
                          }
                        >
                          {tech} ×
                        </Badge>
                      ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id={`tech-input-${index}`}
                      placeholder="Add technology (e.g., React)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTechnology(index);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleAddTechnology(index)}
                    >
                      Add
                    </Button>
                  </div>
                  <FormMessage>
                    {
                      form.formState.errors.projects?.[index]?.technologies
                        ?.message
                    }
                  </FormMessage>
                </div>

                <FormField
                  control={form.control}
                  name={`projects.${index}.link`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Link (Optional)</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Link className="h-4 w-4 mr-2 mt-3" />
                          <Input
                            placeholder="https://github.com/username/project"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`projects.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormField
                      control={form.control}
                      name={`projects.${index}.endDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              disabled={form.watch(
                                `projects.${index}.currentProject`
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`projects.${index}.currentProject`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                handleCurrentProjectChange(
                                  index,
                                  checked as boolean
                                );
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>This is a current project</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name={`projects.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project, your role, and key achievements"
                          className="h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include your responsibilities, technologies used, and
                        impact
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() =>
                append({
                  title: "",
                  description: "",
                  technologies: [],
                  link: "",
                  startDate: "",
                  endDate: "",
                  currentProject: false,
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Projects;
