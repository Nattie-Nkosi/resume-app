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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, Trash2, Info } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// Validation patterns
const companyNameRegex = /^[a-zA-Z0-9\s.,&'-]+$/;
const positionRegex = /^[a-zA-Z\s.,&'-]+$/;
const locationRegex = /^[a-zA-Z\s',.-]+$/;

const experienceSchema = z.object({
  experiences: z.array(
    z.object({
      company: z
        .string()
        .min(2, { message: "Company name is required" })
        .max(100, { message: "Company name is too long" })
        .regex(companyNameRegex, {
          message: "Company name contains invalid characters",
        }),
      position: z
        .string()
        .min(2, { message: "Position is required" })
        .max(100, { message: "Position is too long" })
        .regex(positionRegex, {
          message: "Position contains invalid characters",
        }),
      location: z
        .string()
        .min(2, { message: "Location is required" })
        .max(100, { message: "Location is too long" })
        .regex(locationRegex, {
          message: "Location contains invalid characters",
        }),
      startDate: z.string().min(1, { message: "Start date is required" }),
      endDate: z.string(),
      currentJob: z.boolean().optional(),
      description: z
        .string()
        .min(10, { message: "Please provide more details about your role" })
        .max(2000, { message: "Description is too long" }),
    })
  ),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

interface ExperienceProps {
  onSubmit: (values: ExperienceFormValues) => void;
  defaultValues?: ExperienceFormValues;
}

const Experience: React.FC<ExperienceProps> = ({
  onSubmit,
  defaultValues = {
    experiences: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        location: "",
        currentJob: false,
      },
    ],
  },
}) => {
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "experiences",
    control: form.control,
  });

  // Watch form changes and update parent component
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.experiences) {
        onSubmit(value as ExperienceFormValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onSubmit]);

  // Watch for "current job" checkbox changes
  const handleCurrentJobChange = (index: number, checked: boolean) => {
    if (checked) {
      form.setValue(`experiences.${index}.endDate`, "");
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          Work Experience
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
                  List your work experience in reverse chronological order (most
                  recent first). Include relevant details about your
                  responsibilities and achievements.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>
          Add your work history in reverse chronological order
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Experience {index + 1}
                  </h3>
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

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                        <FormDescription>
                          The organization you worked for
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`experiences.${index}.position`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Job title" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your job title or role
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`experiences.${index}.location`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, Country" {...field} />
                      </FormControl>
                      <FormDescription>
                        Where the job was located
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.startDate`}
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
                      name={`experiences.${index}.endDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              disabled={form.watch(
                                `experiences.${index}.currentJob`
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`experiences.${index}.currentJob`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                handleCurrentJobChange(
                                  index,
                                  checked as boolean
                                );
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>This is my current job</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name={`experiences.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your responsibilities and achievements"
                          className="h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include your key responsibilities, achievements, and
                        projects. Use bullet points for better readability.
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
                  company: "",
                  position: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                  location: "",
                  currentJob: false,
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Experience;
