"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

// Validation regex patterns
const saPhoneRegex = /^\+27[0-9]{9}$/;
const nameRegex = /^[a-zA-Z\s'-]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const locationRegex = /^[a-zA-Z\s',.-]+$/;

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .regex(nameRegex, {
      message: "Name can only contain letters, spaces, hyphens and apostrophes",
    })
    .transform((value) => {
      // Capitalize each word
      return value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .regex(emailRegex, {
      message: "Please enter a valid email format",
    })
    .toLowerCase(), // Transform email to lowercase

  phone: z
    .string()
    .regex(saPhoneRegex, {
      message: "Please enter a valid South African phone number (+27XXXXXXXXX)",
    })
    .transform((value) => {
      if (!value.startsWith("+27") && value.length === 9) {
        return `+27${value}`;
      }
      return value;
    }),

  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters" })
    .max(100, { message: "Location cannot exceed 100 characters" })
    .regex(locationRegex, {
      message:
        "Location can only contain letters, spaces, and basic punctuation",
    })
    .transform((value) => {
      // Capitalize each word
      return value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }),

  summary: z
    .string()
    .min(50, { message: "Summary should be at least 50 characters" })
    .max(500, { message: "Summary cannot exceed 500 characters" })
    .refine((value) => value.trim().split(/\s+/).length >= 10, {
      message: "Summary should contain at least 10 words",
    }),
});

interface PersonalInfoProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  onSubmit,
  defaultValues = {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  },
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Format phone number while typing
  const formatPhoneNumber = (value: string) => {
    let formatted = value.replace(/[^\d+]/g, "");
    if (!formatted.startsWith("+27") && formatted.length > 0) {
      formatted = "+27" + formatted;
    }
    if (formatted.startsWith("+27")) {
      formatted = formatted.slice(0, 12);
    }
    return formatted;
  };

  // Watch form changes and update parent component
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value) {
        onSubmit(value as z.infer<typeof formSchema>);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, form.watch, onSubmit]);

  // Get remaining characters for summary
  const summaryLength = form.watch("summary")?.length || 0;
  const remainingChars = 500 - summaryLength;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Enter your basic details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your full name as it should appear on your resume
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.toLowerCase())
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Use a professional email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+27XXXXXXXXX"
                        {...field}
                        onChange={(e) => {
                          const formatted = formatPhoneNumber(e.target.value);
                          field.onChange(formatted);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      South African format: +27XXXXXXXXX
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Cape Town, South Africa" {...field} />
                  </FormControl>
                  <FormDescription>Enter your city and country</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief overview of your professional background, key skills, and career objectives"
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between">
                    <span>
                      Write a compelling summary of your professional background
                    </span>
                    <span className={remainingChars < 50 ? "text-red-500" : ""}>
                      {remainingChars} characters remaining
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
