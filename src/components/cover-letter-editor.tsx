"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info, Calendar as CalendarIcon, Plus, Trash } from "lucide-react";
import { format } from "date-fns";
import { CoverLetter } from "@/types/coverletter";
import { cn } from "@/lib/utils";

// Validation schema for the cover letter form
const coverLetterSchema = z.object({
  recipientName: z.string().min(1, { message: "Recipient name is required" }),
  recipientTitle: z.string().optional(),
  companyName: z.string().min(1, { message: "Company name is required" }),
  companyAddress: z.string().optional(),
  date: z.date(),

  greeting: z.string().min(1, { message: "Greeting is required" }),

  introduction: z
    .string()
    .min(10, { message: "Introduction should be at least 10 characters" }),
  bodyParagraphs: z
    .array(
      z
        .string()
        .min(10, { message: "Paragraph should be at least 10 characters" })
    )
    .min(1, { message: "At least one body paragraph is required" }),
  conclusion: z
    .string()
    .min(10, { message: "Conclusion should be at least 10 characters" }),

  closing: z.string().min(1, { message: "Closing is required" }),

  subject: z.string().optional(),
  jobTitle: z.string().optional(),
  jobReference: z.string().optional(),

  template: z.enum(["formal", "modern", "creative", "simple"]),
});

interface CoverLetterEditorProps {
  defaultValues?: Partial<CoverLetter>;
  onSubmit: (values: CoverLetter) => void;
  personalInfo?: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
}

const CoverLetterEditor: React.FC<CoverLetterEditorProps> = ({
  defaultValues,
  onSubmit,
}) => {
  // Initialize form with default values
  const form = useForm<CoverLetter>({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      recipientName: defaultValues?.recipientName || "",
      recipientTitle: defaultValues?.recipientTitle || "",
      companyName: defaultValues?.companyName || "",
      companyAddress: defaultValues?.companyAddress || "",
      date: defaultValues?.date ? new Date(defaultValues.date) : new Date(),

      greeting: defaultValues?.greeting || "Dear Hiring Manager,",

      introduction:
        defaultValues?.introduction ||
        `I am writing to express my interest in the [Position] role at ${
          defaultValues?.companyName || "[Company]"
        }. With my background in [Field/Skill] and passion for [Industry/Area], I believe I would be a valuable addition to your team.`,

      bodyParagraphs: defaultValues?.bodyParagraphs || [
        "Throughout my career, I have developed strong skills in [Key Skill 1], [Key Skill 2], and [Key Skill 3]. My experience at [Previous Company/Experience] has prepared me well for this position, as I have [Relevant Achievement or Experience].",

        `I am particularly drawn to ${
          defaultValues?.companyName || "[Company]"
        } because of [Specific Reason - company values, projects, reputation, etc.]. I am confident that my [Specific Skills or Qualities] align well with what you are looking for in this role.`,
      ],

      conclusion:
        defaultValues?.conclusion ||
        `Thank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and enthusiasm would benefit your team at ${
          defaultValues?.companyName || "[Company]"
        }.`,

      closing: defaultValues?.closing || "Sincerely,",

      subject: defaultValues?.subject || "Application for [Position] Position",
      jobTitle: defaultValues?.jobTitle || "",
      jobReference: defaultValues?.jobReference || "",

      template: defaultValues?.template || "formal",
    },
  });

  // Watch form changes and update parent component
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value) {
        onSubmit(value as CoverLetter);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onSubmit]);

  // Function to add a new body paragraph
  const addBodyParagraph = () => {
    const currentParagraphs = form.getValues().bodyParagraphs || [];
    form.setValue("bodyParagraphs", [...currentParagraphs, ""]);
  };

  // Function to remove a body paragraph
  const removeBodyParagraph = (index: number) => {
    const currentParagraphs = form.getValues().bodyParagraphs || [];
    if (currentParagraphs.length > 1) {
      const updatedParagraphs = [...currentParagraphs];
      updatedParagraphs.splice(index, 1);
      form.setValue("bodyParagraphs", updatedParagraphs);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          Cover Letter
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
                  Create a professional cover letter to accompany your resume.
                  The cover letter will use your personal information from your
                  resume for the sender details.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>
          Create a customized cover letter that complements your resume
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            {/* Template Selection */}
            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Template Style</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="simple">Simple</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose a style that matches your resume and the company
                    culture
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Recipient Section */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
              <h3 className="text-md font-medium mb-3">
                Recipient Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipientTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Hiring Manager" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corporation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="companyAddress"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Company Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="123 Business St, Suite 456, City, State, ZIP"
                        className="h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Job Details Section */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
              <h3 className="text-md font-medium mb-3">Job Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Line</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Application for [Position] Position"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Marketing Manager" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jobReference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Reference/ID</FormLabel>
                      <FormControl>
                        <Input placeholder="JOB-123" {...field} />
                      </FormControl>
                      <FormDescription>
                        Reference number from the job posting, if available
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Letter Content Section */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
              <h3 className="text-md font-medium mb-3">Cover Letter Content</h3>

              <FormField
                control={form.control}
                name="greeting"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Greeting*</FormLabel>
                    <FormControl>
                      <Input placeholder="Dear Hiring Manager," {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="introduction"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Introduction*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="I am writing to express my interest in the [Position] role at [Company]..."
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Introduce yourself and state the position you&apos;re
                      applying for
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mb-4">
                <FormLabel className="block mb-2">Body Paragraphs*</FormLabel>
                {form.getValues().bodyParagraphs?.map((_, index) => (
                  <div key={index} className="flex gap-2 mb-4">
                    <FormField
                      control={form.control}
                      name={`bodyParagraphs.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Textarea
                              placeholder={`Paragraph ${
                                index + 1
                              }: Highlight your skills, experiences, and achievements relevant to the role...`}
                              className="h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeBodyParagraph(index)}
                      disabled={form.getValues().bodyParagraphs?.length <= 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={addBodyParagraph}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Paragraph
                </Button>
              </div>

              <FormField
                control={form.control}
                name="conclusion"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Conclusion*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Thank you for considering my application..."
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Wrap up your letter and express interest in next steps
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="closing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Closing*</FormLabel>
                    <FormControl>
                      <Input placeholder="Sincerely," {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Tips Accordion */}
            <Accordion type="single" collapsible className="border rounded-md">
              <AccordionItem value="tips">
                <AccordionTrigger className="px-4">
                  <span className="flex items-center">
                    <Info className="mr-2 h-4 w-4" />
                    Cover Letter Writing Tips
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="text-sm text-gray-600 space-y-3">
                    <p>
                      <strong>Structure your cover letter effectively:</strong>
                    </p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>
                        <strong>Introduction:</strong> State the position
                        you&apos;re applying for and how you found it.
                      </li>
                      <li>
                        <strong>Body:</strong> Highlight relevant skills and
                        experiences that make you suitable for the role.
                      </li>
                      <li>
                        <strong>Conclusion:</strong> Express enthusiasm for the
                        role and company, and request an interview.
                      </li>
                    </ul>
                    <p className="mt-3">
                      <strong>Best practices:</strong>
                    </p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Keep it concise (one page maximum)</li>
                      <li>Customize each letter for the specific job</li>
                      <li>
                        Use the same header styling as your resume for
                        consistency
                      </li>
                      <li>Address a specific person whenever possible</li>
                      <li>Proofread carefully for errors</li>
                      <li>
                        Highlight achievements rather than just listing
                        responsibilities
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CoverLetterEditor;
