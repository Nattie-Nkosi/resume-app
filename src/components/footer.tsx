"use client";

import React from "react";
import Link from "next/link";
import { FileText, Github, Linkedin, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container py-10 md:py-12 flex justify-center">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left">
            {/* Logo and Description */}
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <Link
                href="/"
                className="flex items-center gap-2 mb-2 hover:opacity-80 transition-opacity"
              >
                <FileText className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Resume Builder</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-md">
                Create professional resumes in minutes with our easy-to-use
                builder. Choose from multiple templates and customize your
                resume for any job application.
              </p>
            </div>

            {/* Resources */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-medium text-base mb-4 text-foreground">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <FooterLink href="/templates">Templates</FooterLink>
                </li>
                <li>
                  <FooterLink href="/guide">Resume Guide</FooterLink>
                </li>
                <li>
                  <FooterLink href="/blog">Blog</FooterLink>
                </li>
                <li>
                  <FooterLink href="/faq">FAQ</FooterLink>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-medium text-base mb-4 text-foreground">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <FooterLink href="/privacy">Privacy Policy</FooterLink>
                </li>
                <li>
                  <FooterLink href="/terms">Terms of Service</FooterLink>
                </li>
                <li>
                  <FooterLink href="/cookies">Cookie Policy</FooterLink>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-medium text-base mb-4 text-foreground">
                Connect
              </h3>
              <div className="flex flex-col space-y-3">
                <FooterLink
                  href="https://github.com/Nattie-Nkosi/resume-app"
                  external={true}
                >
                  <Github className="w-4 h-4 mr-2" />
                  <span>GitHub</span>
                </FooterLink>

                <FooterLink
                  href="https://www.linkedin.com/in/nkosinathi-nkosi/"
                  external={true}
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  <span>LinkedIn</span>
                </FooterLink>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t mt-8 pt-6 text-sm text-muted-foreground">
            <p className="mb-4 md:mb-0 text-center md:text-left">
              © {currentYear} Resume Builder. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <button
                className="hover:text-primary transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Back to top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper component for footer links
const FooterLink = ({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) => {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center md:justify-start group"
    >
      {children}
      {external && (
        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </Link>
  );
};

export default Footer;
