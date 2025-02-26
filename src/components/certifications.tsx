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
import { Plus, Trash2, Info, Link as LinkIcon } from "lucide-react";

const certificationsSchema = z.object({
  certificates: z.array(
    z.object({
      name: z
        .string()
        .min(2, { message: "Certificate name is required" })
        .max(100, { message: "Certificate name is too long" }),
      issuer: z
        .string()
        .min(2, { message: "Issuer is required" })
        .max(100, { message: "Issuer name is too long" }),
      date: z.string().min(1, { message: "Issue date is required" }),
      expiration: z.string().optional().or(z.literal("")),
      credentialId: z.string().optional().or(z.literal("")),
      link: z
        .string()
        .url({ message: "Invalid URL format" })
        .optional()
        .or(z.literal("")),
    })
  ),
});

type CertificationsFormValues = z.infer<typeof certificationsSchema>;

interface CertificationsProps {
  onSubmit: (values: CertificationsFormValues) => void;
  defaultValues?: CertificationsFormValues;
}

const Certifications: React.FC<CertificationsProps> = ({
  onSubmit,
  defaultValues = {
    certificates: [
      {
        name: "",
        issuer: "",
        date: "",
        expiration: "",
        credentialId: "",
        link: "",
      },
    ],
  },
}) => {
  const form = useForm<CertificationsFormValues>({
    resolver: zodResolver(certificationsSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "certificates",
    control: form.control,
  });

  // Watch form changes and update parent component
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.certificates) {
        onSubmit(value as CertificationsFormValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onSubmit]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          Certifications
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
                  Add your professional certifications, courses, and licenses to
                  demonstrate your expertise.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>
          List your certifications and professional credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Certification {index + 1}
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

                <FormField
                  control={form.control}
                  name={`certificates.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="AWS Certified Solutions Architect"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`certificates.${index}.issuer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issuing Organization</FormLabel>
                      <FormControl>
                        <Input placeholder="Amazon Web Services" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`certificates.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`certificates.${index}.expiration`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiration Date (Optional)</FormLabel>
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
                  name={`certificates.${index}.credentialId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credential ID (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="ABC-123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`certificates.${index}.link`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credential URL (Optional)</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <LinkIcon className="h-4 w-4 mr-2 mt-3" />
                          <Input
                            placeholder="https://www.credential.net/abc123"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Add a link to verify your credential
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
                  issuer: "",
                  date: "",
                  expiration: "",
                  credentialId: "",
                  link: "",
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Certifications;
