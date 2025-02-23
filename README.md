# Resume Builder Project Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A code editor (VS Code recommended)

## Step 1: Create a New Next.js Project

```bash
# Create a new Next.js project with App Router
npx create-next-app@latest resume-builder
cd resume-builder
```

When prompted, choose the following options:

```
√ Would you like to use TypeScript? Yes
√ Would you like to use ESLint? Yes
√ Would you like to use Tailwind CSS? Yes
√ Would you like to use `src/` directory? Yes
√ Would you like to use App Router? Yes
√ Would you like to customize the default import alias? No
```

## Step 2: Install Required Dependencies

```bash
# Install shadcn/ui and its dependencies
npx shadcn-ui@latest init

# When prompted, choose these options:
√ Would you like to use TypeScript (recommended)? Yes
√ Which style would you like to use? Default
√ Which color would you like to use as base color? Slate
√ Where is your global CSS file? app/globals.css
√ Would you like to use CSS variables for colors? Yes
√ Where is your tailwind.config.js located? tailwind.config.js
√ Configure the import alias for components? Yes
√ Configure the import alias for utilities? Yes
√ Are you using React Server Components? Yes
√ Write configuration to components.json Yes

# Install required shadcn/ui components
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add button

# Install additional dependencies
npm install lucide-react @react-pdf/renderer
```

## Step 3: Project Structure Setup

Create the following folder structure:

```
src/
├── app/
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   ├── resume-builder/
│   │   ├── personal-info.tsx
│   │   ├── experience.tsx
│   │   ├── education.tsx
│   │   ├── skills.tsx
│   │   └── preview.tsx
│   └── ui/
└── lib/
    └── utils.ts
```

## Step 4: Configure the Main Page

Replace the content of `src/app/page.tsx` with:

```typescript
import ResumeBuilder from "@/components/resume-builder/resume-builder";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ResumeBuilder />
    </main>
  );
}
```

## Step 5: Update Global Styles

Add the following to your `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Step 6: Start the Development Server

```bash
npm run dev
```

Your development server will start at `http://localhost:3000`

## Next Steps

1. Copy the ResumeBuilder component from the previous code into `src/components/resume-builder/resume-builder.tsx`

2. Break down the component into smaller components:

   - Move the Personal Information section to `personal-info.tsx`
   - Move the Experience section to `experience.tsx`
   - Move the Education section to `education.tsx`
   - Move the Skills section to `skills.tsx`

3. Create a Preview component in `preview.tsx`

4. Implement PDF generation using @react-pdf/renderer

## Common Issues and Solutions

1. If you encounter TypeScript errors:

   - Make sure all your components are properly typed
   - Check if all shadcn/ui components are properly imported

2. If styles are not applying:

   - Verify that your tailwind.config.js is properly configured
   - Check if globals.css is imported in your root layout

3. If components are not found:
   - Ensure your import aliases are properly configured
   - Verify that all shadcn/ui components are installed

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React PDF Documentation](https://react-pdf.org)
