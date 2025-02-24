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
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";

const educationSchema = z.object({
  education: z.array(
    z.object({
      institution: z
        .string()
        .min(2, { message: "Institution name is required" }),
      degree: z.string().min(2, { message: "Degree/Certificate is required" }),
      field: z.string().min(2, { message: "Field of study is required" }),
      startDate: z.string().min(1, { message: "Start date is required" }),
      endDate: z.string(),
      location: z.string().min(2, { message: "Location is required" }),
      gpa: z.string().optional(),
      achievements: z.string().optional(),
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

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>Add your educational background</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Education {index + 1}</h3>
                  {index > 0 && (
                    <Button
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

                  <FormField
                    control={form.control}
                    name={`education.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
