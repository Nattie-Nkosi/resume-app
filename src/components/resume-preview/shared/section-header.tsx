// Create src/components/resume-preview/shared/section-header.tsx
import React from "react";
import { ThemeStyles } from "../theme-config";

interface SectionHeaderProps {
  title: string;
  theme: ThemeStyles;
  className?: string;
  decorative?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  theme,
  className = "",
  decorative = false,
}) => {
  if (decorative) {
    return (
      <div className="relative mb-6 print:mb-4">
        <div className="absolute inset-0 flex items-center">
          <div
            className={`w-full border-t ${theme.border} print:border-gray-300`}
          ></div>
        </div>
        <div className="relative flex justify-center">
          <span
            className={`px-4 text-sm font-medium ${theme.heading} bg-white print:text-xs print:font-semibold print:tracking-wide ${className}`}
          >
            {title.toUpperCase()}
          </span>
        </div>
      </div>
    );
  }

  return (
    <h2 className={`text-xl font-semibold ${theme.heading} mb-4 ${className}`}>
      {title}
    </h2>
  );
};
