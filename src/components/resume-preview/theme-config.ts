// /components/resume-preview/theme-config.ts

// Define the theme properties type
export interface ThemeStyles {
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  heading: string;
  link: string;
}

// Color themes
export const colorThemes: Record<string, ThemeStyles> = {
  classic: {
    primary: "text-gray-900",
    secondary: "text-gray-600",
    accent: "bg-gray-100 text-gray-700",
    border: "border-gray-200",
    heading: "text-gray-900",
    link: "text-blue-600 hover:text-blue-800",
  },
  modern: {
    primary: "text-slate-900",
    secondary: "text-slate-600",
    accent: "bg-slate-100 text-slate-700",
    border: "border-slate-200",
    heading: "text-slate-800",
    link: "text-indigo-600 hover:text-indigo-800",
  },
  professional: {
    primary: "text-stone-900",
    secondary: "text-stone-600",
    accent: "bg-stone-100 text-stone-700",
    border: "border-stone-200",
    heading: "text-stone-800",
    link: "text-emerald-700 hover:text-emerald-900",
  },
  minimalist: {
    primary: "text-zinc-900",
    secondary: "text-zinc-500",
    accent: "bg-zinc-100 text-zinc-700",
    border: "border-zinc-100",
    heading: "text-zinc-800",
    link: "text-zinc-700 hover:text-zinc-900",
  },
  creative: {
    primary: "text-purple-900",
    secondary: "text-purple-600",
    accent: "bg-purple-100 text-purple-700",
    border: "border-purple-200",
    heading: "text-purple-800",
    link: "text-pink-600 hover:text-pink-800",
  },
};

export type ThemeKey = keyof typeof colorThemes;

// Layout templates
export const layoutTemplates = ["standard", "compact", "elegant", "modern"] as const;
export type LayoutType = typeof layoutTemplates[number];