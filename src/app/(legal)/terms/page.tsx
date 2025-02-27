// src/app/(legal)/terms/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
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
            <CardTitle className="text-2xl font-bold">
              Terms of Service
            </CardTitle>
            <Badge variant="outline">Last Updated: February 27, 2025</Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="prose max-w-none">
            <p className="text-muted-foreground mb-8">
              Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms
              of Service&quot;) carefully before using Nattie&apos;s Resume
              Builder (the &quot;Service&quot;) operated by Nattie&apos;s Resume
              Builder (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
            </p>

            <p className="mb-8">
              Your access to and use of the Service is conditioned on your
              acceptance of and compliance with these Terms. These Terms apply
              to all visitors, users, and others who access or use the Service.
              By accessing or using the Service you agree to be bound by these
              Terms. If you disagree with any part of the terms, then you may
              not access the Service.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                1. Use of the Service
              </h2>
              <p className="mb-4">
                Nattie&apos;s Resume Builder provides tools for creating,
                editing, and exporting resumes. You can use our Service to
                create professional resumes for your personal use.
              </p>
              <p>
                To use certain features of the Service, you may be required to
                provide certain personal information. You are responsible for
                ensuring that all information you provide is accurate, current,
                and complete.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. User Content</h2>
              <p className="mb-4">
                Our Service allows you to enter, upload, save, and share
                content, including text, graphics, and other materials
                (&quot;User Content&quot;). You retain any rights you may have
                in your User Content.
              </p>
              <p className="mb-4">
                By using our Service and providing User Content, you grant us a
                worldwide, non-exclusive, royalty-free license to use, copy, and
                display your User Content in connection with providing the
                Service to you.
              </p>
              <p>
                You are solely responsible for your User Content and the
                consequences of posting or publishing it. You represent and
                warrant that your User Content does not violate the rights of
                any third party, including copyright, trademark, privacy, or
                other personal or proprietary rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. Data Storage</h2>
              <p className="mb-4">
                The Service uses local storage to save your resume data on your
                device. Your data remains on your device and is not uploaded to
                our servers unless you explicitly choose to export or share it.
              </p>
              <p>
                You are responsible for saving and backing up your data. We are
                not responsible for any loss of data resulting from technical
                issues, clearing of browser data, or other circumstances.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                4. Intellectual Property
              </h2>
              <p className="mb-4">
                The Service and its original content (excluding User Content),
                features, and functionality are and will remain the exclusive
                property of Nattie&apos;s Resume Builder and its licensors. The
                Service is protected by copyright, trademark, and other laws.
              </p>
              <p>
                Our templates, designs, and layouts are provided for your
                personal use in creating resumes. You may not reproduce,
                distribute, modify, create derivative works of, publicly
                display, publicly perform, republish, download, store, or
                transmit any of the material on our Service, except as necessary
                for your personal use of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                5. Disclaimer of Warranties
              </h2>
              <p className="mb-4">
                Your use of the Service is at your sole risk. The Service is
                provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
                basis. The Service is provided without warranties of any kind,
                whether express or implied, including, but not limited to,
                implied warranties of merchantability, fitness for a particular
                purpose, non-infringement, or course of performance.
              </p>
              <p>
                We do not warrant that (a) the Service will function
                uninterrupted, secure, or available at any particular time or
                location; (b) any errors or defects will be corrected; (c) the
                Service is free of viruses or other harmful components; or (d)
                the results of using the Service will meet your requirements.
              </p>
            </section>

            {/* <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                6. Limitation of Liability
              </h2>
              <p>
                In no event shall Nattie&apos;s Resume Builder, nor its
                directors, employees, partners, agents, suppliers, or
                affiliates, be liable for any indirect, incidental, special,
                consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other
                intangible losses, resulting from (a) your access to or use of
                or inability to access or use the Service; (b) any conduct or
                content of any third party on the Service; (c) any content
                obtained from the Service; and (d) unauthorized access, use, or
                alteration of your transmissions or content, whether based on
                warranty, contract, tort (including negligence), or any other
                legal theory, whether or not we have been informed of the
                possibility of such damage.
              </p>
            </section> */}

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with
                the laws of South Africa, without regard to its conflict of law
                provisions. Our failure to enforce any right or provision of
                these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                8. Changes to Terms
              </h2>
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will try to provide at least 30 days&apos; notice prior to any
                new terms taking effect. What constitutes a material change will
                be determined at our sole discretion. By continuing to access or
                use our Service after those revisions become effective, you
                agree to be bound by the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">9. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us
                at:
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
