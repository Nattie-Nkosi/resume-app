"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Github, Menu, X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll listener to create shadow effect when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-200 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-center">
        <div className="w-full max-w-6xl flex items-center justify-between">
          {/* Logo and Title */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg hidden md:inline-block">
              Resume Builder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/templates"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Templates
              </Link>
              <Link
                href="/guide"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Guide
              </Link>
              <Link
                href="/cover-letter"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                <span className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  Cover Letter
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <ModeToggle />
              <Button variant="outline" size="sm" asChild className="gap-2">
                <Link
                  href="https://github.com/Nattie-Nkosi/resume-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              className="relative"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Transition */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-64 opacity-100 border-t" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container flex justify-center">
          <nav className="w-full max-w-6xl py-4 flex flex-col items-center space-y-4 text-center">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/templates"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Templates
            </Link>
            <Link
              href="/guide"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Guide
            </Link>
            <Link
              href="/cover-letter"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                Cover Letter
              </span>
            </Link>
            <div className="pt-2 border-t border-border w-24 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="gap-2 mt-2"
              >
                <Link
                  href="https://github.com/Nattie-Nkosi/resume-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
