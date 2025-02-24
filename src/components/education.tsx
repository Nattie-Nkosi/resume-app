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
const institutionRegex = /^[a-zA-Z0-9\s.,&'-]+$/;
const degreeRegex = /^[a-zA-Z\s.,&'-]+$/;
const fieldRegex = /^[a-zA-Z\s.,&'-]+$/;
const locationRegex = /^[a-zA-Z\s',.-]+$/;
const gpaRegex = /^(\d+(\.\d+)?|\d+(\.\d+)?\/\d+(\.\d+)?)$/;

const educationSchema = z.object({
  education: z.array(
    z.object({
      institution: z
        .string()
        .min(2, { message: "Institution name is required" })
        .max(100, { message: "Institution name is too long" })
        .regex(institutionRegex, {
          message: "Institution name contains invalid characters",
        }),
      degree: z
        .string()
        .min(2, { message: "Degree/Certificate is required" })
        .max(100, { message: "Degree/Certificate is too long" })
        .regex(degreeRegex, {
          message: "Degree contains invalid characters",
        }),
      field: z
        .string()
        .min(2, { message: "Field of study is required" })
        .max(100, { message: "Field of study is too long" })
        .regex(fieldRegex, {
          message: "Field contains invalid characters",
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
      currentlyEnrolled: z.boolean().optional(),
      gpa: z
        .string()
        .regex(gpaRegex, { message: "Invalid GPA format" })
        .optional()
        .or(z.literal("")),
      achievements: z
        .string()
        .max(1000, { message: "Achievements text is too long" })
        .optional()
        .or(z.literal("")),
    })
  ),
});

type EducationFormValues = z.infer<typeof educationSchema>;

interface EducationProps {
  onSubmit: (values: EducationFormValues) => void;
  defaultValues?: EducationFormValues;
}

const Education: React.FC<EducationProps> = ({
  onSubmit,
  defaultValues = {
    education: [
      {
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        location: "",
        gpa: "",
        achievements: "",
        currentlyEnrolled: false,
      },
    ],
  },
}) => {
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "education",
    control: form.control,
  });

  // Watch form changes and update parent component
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.education) {
        onSubmit(value as EducationFormValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onSubmit]);

  // Handle currently enrolled checkbox
  const handleCurrentlyEnrolledChange = (index: number, checked: boolean) => {
    if (checked) {
      form.setValue(`education.${index}.endDate`, "");
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          Education
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
                  List your education in reverse chronological order (most
                  recent first). Include degrees, certifications, and relevant
                  coursework.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>
          Add your educational background in reverse chronological order
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Education {index + 1}</h3>
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
                  name={`education.${index}.institution`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="University/College name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The name of the educational institution
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`education.${index}.degree`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Bachelor's, Master's"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Type of degree or certification
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`education.${index}.field`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field of Study</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Computer Science"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your major or concentration
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`education.${index}.location`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, Country" {...field} />
                      </FormControl>
                      <FormDescription>
                        Where the institution is located
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`education.${index}.startDate`}
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
                      name={`education.${index}.endDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              disabled={form.watch(
                                `education.${index}.currentlyEnrolled`
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`education.${index}.currentlyEnrolled`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                handleCurrentlyEnrolledChange(
                                  index,
                                  checked as boolean
                                );
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Currently enrolled</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name={`education.${index}.gpa`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GPA (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 3.8/4.0" {...field} />
                      </FormControl>
                      <FormDescription>
                        Format as X.XX or X.XX/Y.YY
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.achievements`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Achievements & Activities (optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List relevant achievements, honors, or activities"
                          className="h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include honors, awards, relevant coursework, or
                        extracurricular activities
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
                  institution: "",
                  degree: "",
                  field: "",
                  startDate: "",
                  endDate: "",
                  location: "",
                  gpa: "",
                  achievements: "",
                  currentlyEnrolled: false,
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Education;
