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
import { Plus, Trash2, Info, Trophy } from "lucide-react";

const achievementsSchema = z.object({
  achievements: z.array(
    z.object({
      title: z
        .string()
        .min(2, { message: "Achievement title is required" })
        .max(100, { message: "Title is too long" }),
      organization: z
        .string()
        .min(2, { message: "Organization name is required" })
        .max(100, { message: "Organization name is too long" }),
      date: z.string().min(1, { message: "Date is required" }),
      description: z
        .string()
        .max(500, { message: "Description is too long" })
        .optional()
        .or(z.literal("")),
    })
  ),
});

type AchievementsFormValues = z.infer<typeof achievementsSchema>;

interface AchievementsProps {
  onSubmit: (values: AchievementsFormValues) => void;
  defaultValues?: AchievementsFormValues;
}

const Achievements: React.FC<AchievementsProps> = ({
  onSubmit,
  defaultValues = {
    achievements: [
      {
        title: "",
        organization: "",
        date: "",
        description: "",
      },
    ],
  },
}) => {
  const form = useForm<AchievementsFormValues>({
    resolver: zodResolver(achievementsSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "achievements",
    control: form.control,
  });

  // Watch form changes and update parent component
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.achievements) {
        onSubmit(value as AchievementsFormValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onSubmit]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          Key Achievements
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
                  Highlight your notable achievements, awards, and recognition
                  to showcase your accomplishments.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>
          Add significant achievements and recognition you&apos;ve received
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Achievement {index + 1}
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

                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`achievements.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Achievement Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Employee of the Year"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`achievements.${index}.organization`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization/Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Company ABC" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`achievements.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
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
                  name={`achievements.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Briefly describe your achievement and its impact"
                          className="h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include quantifiable results when possible
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
                  organization: "",
                  date: "",
                  description: "",
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Achievement
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Achievements;
