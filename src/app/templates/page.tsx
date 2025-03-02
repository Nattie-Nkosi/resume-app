"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Crown, LayoutTemplate } from "lucide-react";

export default function TemplatesPage() {
  // Template data
  const templates = [
    {
      id: "classic",
      name: "Classic",
      description:
        "A timeless and professional design suitable for all industries. Clean layout with well-organized sections.",
      layout: "Standard",
      imageUrl: "/templates/classic.png", // Placeholder, would need to be added to public folder
      popular: true,
    },
    {
      id: "modern",
      name: "Modern",
      description:
        "Contemporary and sleek design with a creative touch. Perfect for creative industries and tech roles.",
      layout: "Compact",
      imageUrl: "/templates/modern.png",
      popular: false,
    },
    {
      id: "professional",
      name: "Professional",
      description:
        "Sophisticated design focused on showcasing experience and accomplishments. Ideal for executive positions.",
      layout: "Standard",
      imageUrl: "/templates/professional.png",
      popular: true,
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description:
        "Clean and distraction-free design that puts your content front and center. Works well for all positions.",
      layout: "Compact",
      imageUrl: "/templates/minimalist.png",
      popular: false,
    },
    {
      id: "creative",
      name: "Creative",
      description:
        "Bold and eye-catching design to help you stand out. Perfect for design, marketing, and creative roles.",
      layout: "Elegant",
      imageUrl: "/templates/creative.png",
      popular: false,
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Resume Templates</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose from our collection of professionally designed resume
          templates. Each template is fully customizable, ATS-friendly, and
          optimized for readability.
        </p>
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Ready to build your resume?</h2>
        <Link href="/">
          <Button size="lg" className="gap-2">
            Get Started <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    layout: string;
    imageUrl: string;
    popular: boolean;
  };
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        {/* Template Preview - Placeholder for now */}
        <div className="bg-gray-100 h-64 flex items-center justify-center">
          <LayoutTemplate className="h-16 w-16 text-gray-400" />
        </div>

        {/* Popular Badge */}
        {template.popular && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
            <Crown className="h-3 w-3 mr-1" />
            Popular
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg">{template.name}</h3>
            <p className="text-xs text-muted-foreground">
              {template.layout} Layout
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {template.description}
        </p>

        <div className="flex justify-between items-center">
          <Link href={`/?template=${template.id}`}>
            <Button variant="outline" size="sm">
              Preview
            </Button>
          </Link>
          <Link href={`/?template=${template.id}`}>
            <Button size="sm">Use Template</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
