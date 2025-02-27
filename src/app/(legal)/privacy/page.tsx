// src/app/(legal)/privacy/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <Link
        href="/"
        className="flex items-center mb-6 text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Privacy Policy</CardTitle>
            <Badge variant="outline">Last Updated: February 27, 2025</Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="prose max-w-none">
            <p className="text-muted-foreground mb-8">
              This Privacy Policy describes how Nattie&apos;s Resume Builder
              (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects,
              uses, and shares your personal information when you use our resume
              builder application (the &quot;Service&quot;).
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Information We Collect
              </h2>
              <p className="mb-4">
                When you use our Service, we may collect the following types of
                information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, location, and other resume content you
                  voluntarily provide.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you
                  interact with our Service, including browser type, IP address,
                  time spent on the Service, and pages visited.
                </li>
                <li>
                  <strong>Device Information:</strong> Information about the
                  device you use to access our Service, including device type,
                  operating system, and browser.
                </li>
                <li>
                  <strong>Cookies and Similar Technologies:</strong> We use
                  cookies and similar tracking technologies to track activity on
                  our Service and hold certain information.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                How We Use Your Information
              </h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our Service</li>
                <li>Create and update your resume</li>
                <li>Save your progress and resume data for future editing</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Understand how users interact with our Service</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Develop new features and services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Data Storage</h2>
              <p className="mb-4">
                Your resume data is stored on your local device using browser
                local storage. This means that your information stays on your
                computer and is not uploaded to our servers unless you
                explicitly choose to export or share it.
              </p>
              <p>
                When you use the export or download feature, the data is
                processed temporarily on our servers to generate the PDF or
                other export formats but is not permanently stored.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Sharing Your Information
              </h2>
              <p>
                We do not sell, trade, or otherwise transfer your personally
                identifiable information to outside parties except in the
                following cases:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>With service providers who help us operate our Service</li>
                <li>If required by law or to protect our rights</li>
                <li>
                  In the event of a business transfer (e.g., merger or
                  acquisition)
                </li>
                <li>With your consent</li>
              </ul>
            </section>

            {/* <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have certain rights
                regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  The right to access the personal information we have about you
                </li>
                <li>
                  The right to request correction of inaccurate personal
                  information
                </li>
                <li>
                  The right to request deletion of your personal information
                </li>
                <li>
                  The right to withdraw consent for processing your personal
                  information
                </li>
                <li>The right to data portability</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at
                privacy@nattiesresumes.com.
              </p>
            </section> */}

            {/* <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Children&apos;s Privacy
              </h2>
              <p>
                Our Service is not intended for use by individuals under the age
                of 13. We do not knowingly collect personal information from
                children under 13. If we learn we have collected personal
                information from a child under 13, we will delete this
                information. If you believe we have collected information from a
                child under 13, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Changes to This Privacy Policy
              </h2>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last Updated&quot; date. You
                are advised to review this Privacy Policy periodically for any
                changes.
              </p>
            </section> */}

            <section>
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> nkosin361@gmail.com
              </p>
              <p>
                <strong>Address:</strong> Kempton Park, South Africa
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
