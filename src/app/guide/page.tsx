"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  FileText,
  Info,
  XCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function GuidePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Link
        href="/"
        className="flex items-center mb-8 text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Resume Builder
      </Link>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Resume Writing Guide</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn how to create a professional resume that gets noticed by
            recruiters and passes through applicant tracking systems (ATS).
          </p>
        </div>

        {/* Quick Tips */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resume Essentials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Keep it concise</strong> - Aim for 1-2 pages,
                  depending on experience level.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Use action verbs</strong> - Begin bullet points with
                  strong action verbs like &quot;achieved,&quot;
                  &quot;managed,&quot; or &quot;developed.&quot;
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Quantify achievements</strong> - Include numbers and
                  percentages to demonstrate your impact.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Customize for each job</strong> - Tailor your resume
                  to match each job description.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Use a clean, professional design</strong> - Choose a
                  readable font, consistent formatting, and clear section
                  headings.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Common Mistakes */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              Common Resume Mistakes to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Including an objective statement</strong> - Replace
                  with a professional summary that highlights your value
                  proposition.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Using generic descriptions</strong> - Avoid vague
                  statements like &quot;team player&quot; or &quot;hard
                  worker&quot; without backing them up.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Including irrelevant experience</strong> - Focus on
                  experiences that relate to the position you&apos;re applying
                  for.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Having typos or grammatical errors</strong> - Always
                  proofread carefully and ask someone else to review.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Using an unprofessional email address</strong> -
                  Create a simple email with your name for job applications.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section-by-Section Guide */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">
            Section-by-Section Guide
          </h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="personal-info">
              <AccordionTrigger className="text-left">
                Personal Information Section
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm">
                  <p>
                    Your contact information should be prominently displayed at
                    the top of your resume.
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <strong>Full Name</strong> - Use your full name, not
                      nicknames.
                    </li>
                    <li>
                      <strong>Professional Title</strong> - Include your current
                      or desired job title.
                    </li>
                    <li>
                      <strong>Contact Information</strong> - Include your phone
                      number, professional email, city/state (no full address
                      needed), and LinkedIn URL.
                    </li>
                    <li>
                      <strong>Professional Summary</strong> - A concise 2-3
                      sentence paragraph highlighting your experience, key
                      skills, and what makes you unique.
                    </li>
                  </ul>
                  <div className="rounded-md bg-blue-50 p-3 text-blue-800">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5 mr-2" />
                      <p>
                        If you&apos;re in a creative field, consider adding
                        links to your portfolio, GitHub, or other relevant
                        professional profiles.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="experience">
              <AccordionTrigger className="text-left">
                Work Experience Section
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm">
                  <p>
                    Your work experience should be listed in reverse
                    chronological order (most recent first).
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <strong>Company, Position, Dates</strong> - Clearly list
                      the company name, your job title, and employment dates.
                    </li>
                    <li>
                      <strong>Accomplishments vs. Duties</strong> - Focus on
                      achievements rather than just listing job
                      responsibilities.
                    </li>
                    <li>
                      <strong>Quantifiable Results</strong> - Use numbers to
                      demonstrate impact (e.g., &quot;Increased sales by
                      25%&quot;).
                    </li>
                    <li>
                      <strong>Relevant Experience</strong> - Emphasize
                      experiences that relate to the job you&apos;re applying
                      for.
                    </li>
                  </ul>
                  <div className="rounded-md bg-blue-50 p-3 text-blue-800">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5 mr-2" />
                      <p>
                        For each role, include 3-5 bullet points that showcase
                        your most impressive accomplishments.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="education">
              <AccordionTrigger className="text-left">
                Education Section
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm">
                  <p>
                    Your education section should highlight your academic
                    achievements.
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <strong>Degree, Institution, Dates</strong> - List your
                      highest degree first, followed by the institution name and
                      graduation date.
                    </li>
                    <li>
                      <strong>GPA</strong> - Include your GPA only if it&apos;s
                      3.5 or higher or if you&apos;re a recent graduate.
                    </li>
                    <li>
                      <strong>Relevant Coursework</strong> - For recent
                      graduates, include relevant courses that align with the
                      job.
                    </li>
                    <li>
                      <strong>Honors and Awards</strong> - List any academic
                      achievements, scholarships, or honors.
                    </li>
                  </ul>
                  <div className="rounded-md bg-blue-50 p-3 text-blue-800">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5 mr-2" />
                      <p>
                        If you&apos;ve been in the workforce for several years,
                        place your education after your work experience section.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="skills">
              <AccordionTrigger className="text-left">
                Skills Section
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm">
                  <p>
                    Your skills section should highlight your technical and soft
                    skills relevant to the job.
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <strong>Categorize Skills</strong> - Group similar skills
                      together (e.g., Programming Languages, Software, Soft
                      Skills).
                    </li>
                    <li>
                      <strong>Keyword Optimization</strong> - Include keywords
                      from the job description to pass ATS filters.
                    </li>
                    <li>
                      <strong>Proficiency Levels</strong> - Consider indicating
                      your level of expertise for technical skills.
                    </li>
                    <li>
                      <strong>Relevant Skills Only</strong> - Focus on skills
                      that are relevant to the position.
                    </li>
                  </ul>
                  <div className="rounded-md bg-blue-50 p-3 text-blue-800">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5 mr-2" />
                      <p>
                        For technical roles, place your skills section near the
                        top of your resume. For other positions, it can appear
                        after your work experience.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="projects">
              <AccordionTrigger className="text-left">
                Projects Section
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm">
                  <p>
                    A projects section can significantly enhance your resume,
                    especially if you&apos;re a student, recent graduate, or
                    career changer.
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <strong>Relevant Projects</strong> - Include projects that
                      demonstrate skills relevant to the position.
                    </li>
                    <li>
                      <strong>Project Details</strong> - Provide a brief
                      description, your role, technologies used, and outcomes.
                    </li>
                    <li>
                      <strong>Links</strong> - When possible, include links to
                      GitHub repositories or live projects.
                    </li>
                    <li>
                      <strong>Academic and Personal Projects</strong> - Both can
                      be valuable if they showcase relevant skills.
                    </li>
                  </ul>
                  <div className="rounded-md bg-blue-50 p-3 text-blue-800">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5 mr-2" />
                      <p>
                        For developers and designers, your projects can be more
                        impactful than your work experience in demonstrating
                        your capabilities.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="certifications">
              <AccordionTrigger className="text-left">
                Certifications Section
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm">
                  <p>
                    Certifications demonstrate your commitment to professional
                    development and validate your skills.
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <strong>Relevant Certifications</strong> - Include
                      certifications that are relevant to your target position.
                    </li>
                    <li>
                      <strong>Details</strong> - List the certification name,
                      issuing organization, and date received.
                    </li>
                    <li>
                      <strong>Expiration</strong> - If applicable, mention when
                      the certification expires or note if it&apos;s current.
                    </li>
                    <li>
                      <strong>Credential IDs</strong> - Including credential IDs
                      allows employers to verify your certifications.
                    </li>
                  </ul>
                  <div className="rounded-md bg-blue-50 p-3 text-blue-800">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5 mr-2" />
                      <p>
                        In fields like IT, healthcare, and finance,
                        certifications can significantly boost your credibility
                        and employability.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* ATS Optimization */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="text-xl">
              Optimize Your Resume for ATS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <p>
                Most companies use Applicant Tracking Systems (ATS) to filter
                resumes before human eyes ever see them. Here&apos;s how to
                ensure your resume passes through:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Use standard section headings</strong> - &quot;Work
                    Experience,&quot; &quot;Education,&quot; &quot;Skills&quot;
                    - not creative alternatives.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Include keywords from the job description</strong> -
                    Match your skills and experiences to the job requirements.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Use a simple, clean layout</strong> - Avoid tables,
                    headers/footers, images, and text boxes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Use standard fonts</strong> - Stick with Arial,
                    Calibri, Times New Roman, or similar readable fonts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Save in the right format</strong> - Unless specified
                    otherwise, PDF format is usually best for preserving
                    formatting.
                  </span>
                </li>
              </ul>
              <div className="rounded-md bg-blue-50 p-3 text-blue-800">
                <div className="flex">
                  <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5 mr-2" />
                  <p>
                    Our Resume Builder creates ATS-friendly resumes by default,
                    with clean layouts and proper formatting.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Industry-Specific Tips */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="text-xl">Industry-Specific Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="tech">
                <AccordionTrigger className="text-left text-sm">
                  Technology
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 list-disc pl-5 text-sm">
                    <li>
                      Highlight technical skills and programming languages.
                    </li>
                    <li>Include links to GitHub, portfolio, or projects.</li>
                    <li>Mention contributions to open-source projects.</li>
                    <li>
                      Describe complex problems you&apos;ve solved and your
                      approach.
                    </li>
                    <li>
                      List relevant certifications and technical training.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="business">
                <AccordionTrigger className="text-left text-sm">
                  Business & Finance
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 list-disc pl-5 text-sm">
                    <li>
                      Quantify achievements with specific numbers and
                      percentages.
                    </li>
                    <li>
                      Highlight leadership experiences and team management.
                    </li>
                    <li>
                      Include relevant certifications (CPA, CFA, MBA, etc.).
                    </li>
                    <li>
                      Emphasize skills in analysis, strategy, and communication.
                    </li>
                    <li>
                      Mention experience with relevant software and tools.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="creative">
                <AccordionTrigger className="text-left text-sm">
                  Creative Fields
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 list-disc pl-5 text-sm">
                    <li>Include a link to your portfolio or work samples.</li>
                    <li>Highlight client work and successful projects.</li>
                    <li>Mention software proficiency and technical skills.</li>
                    <li>
                      Include specific design methodologies or approaches.
                    </li>
                    <li>
                      Consider using a more creative resume design (while
                      keeping it readable).
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="healthcare">
                <AccordionTrigger className="text-left text-sm">
                  Healthcare
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 list-disc pl-5 text-sm">
                    <li>
                      List licenses, certifications, and specialized training
                      prominently.
                    </li>
                    <li>
                      Include specific technical skills and equipment
                      proficiency.
                    </li>
                    <li>Emphasize patient care experiences and outcomes.</li>
                    <li>
                      Mention experience with electronic medical records
                      systems.
                    </li>
                    <li>
                      Highlight any research, publications, or specialized
                      procedures.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">
            Ready to create your resume?
          </h2>
          <p className="text-muted-foreground mb-6">
            Use our builder to create a professional, ATS-friendly resume in
            minutes.
          </p>
          <Link href="/">
            <Button size="lg" className="gap-2">
              Build Your Resume <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
