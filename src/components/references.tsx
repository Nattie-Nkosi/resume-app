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
import { Plus, Trash2, Info, Users } from "lucide-react";

const referencesSchema = z.object({
  references: z.array(
    z.object({
      name: z
        .string()
        .min(2, { message: "Reference name is required" })
        .max(100, { message: "Name is too long" }),
      company: z
        .string()
        .min(2, { message: "Company name is required" })
        .max(100, { message: "Company name is too long" }),
      position: z
        .string()
        .min(2, { message: "Position is required" })
        .max(100, { message: "Position is too long" }),
      contact: z
        .string()
        .min(5, { message: "Contact information is required" })
        .max(100, { message: "Contact information is too long" }),
      relationship: z
        .string()
        .min(2, { message: "Professional relationship is required" })
        .max(100, { message: "Relationship description is too long" }),
    })
  ),
});

type ReferencesFormValues = z.infer<typeof referencesSchema>;

interface ReferencesProps {
  onSubmit: (values: ReferencesFormValues) => void;
  defaultValues?: ReferencesFormValues;
}

const References: React.FC<ReferencesProps> = ({
  onSubmit,
  defaultValues = {
    references: [
      {
        name: "",
        company: "",
        position: "",
        contact: "",
        relationship: "",
      },
    ],
  },
}) => {
  const form = useForm<ReferencesFormValues>({
    resolver: zodResolver(referencesSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "references",
    control: form.control,
  });

  // Watch form changes and update parent component
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.references) {
        onSubmit(value as ReferencesFormValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onSubmit]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          References
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
                  Add professional references who can vouch for your work
                  experience and skills. Always ask for permission before
                  listing someone as a reference.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>
          List professional references who can vouch for your skills and work
          ethic
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Reference {index + 1}</h3>
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
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`references.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Smith" {...field} />
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
                    name={`references.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Company ABC" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`references.${index}.position`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Senior Manager" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`references.${index}.contact`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Information</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@example.com or +1234567890"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Email address or phone number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`references.${index}.relationship`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Relationship</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Former Manager, Colleague, Client, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        How you worked with this person professionally
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
                  name: "",
                  company: "",
                  position: "",
                  contact: "",
                  relationship: "",
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Reference
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default References;
