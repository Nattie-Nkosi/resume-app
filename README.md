# Resume Builder

A modern, intuitive web application for creating professional resumes quickly and easily. Built with Next.js, TypeScript, and Tailwind CSS.

![Resume Builder Screenshot](https://github.com/user-attachments/assets/1ba5b354-0329-40f1-8b24-34ad41b4cbf3)


## 🌟 Features

- **User-friendly Interface**: Create and edit resumes with an intuitive, step-by-step process
- **Multiple Sections**: Personal info, experience, education, skills, projects, certifications, achievements, and references
- **Real-time Preview**: See your resume updates instantly with live preview
- **Multiple Themes**: Choose from classic, modern, professional, minimalist, and creative designs
- **Layout Options**: Select from standard, compact, elegant, and modern layouts
- **Export Options**: Download as PDF or print your resume directly
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable editing
- **Data Persistence**: Resume data is saved locally for easy editing later
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🚀 Demo

Try the live demo: [Resume Builder App](https://resume-builder-two-lake.vercel.app/)

## 🛠️ Technologies

- **Frontend Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://github.com/colinhacks/zod) validation
- **PDF Generation**: [@react-pdf/renderer](https://react-pdf.org/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Deployment**: [Vercel](https://vercel.com/)

## 📋 Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Nattie-Nkosi/resume-app.git
   cd resume-builder
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
resume-builder/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── store/
│   │       └── useResumeStore.ts
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── personal-info.tsx     # Form components for each section
│   │   ├── experience.tsx
│   │   ├── education.tsx
│   │   ├── skills.tsx
│   │   ├── projects.tsx
│   │   ├── certifications.tsx
│   │   ├── achievements.tsx
│   │   ├── references.tsx
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── theme-provider.tsx
│   │   ├── error-boundary.tsx
│   │   └── resume-preview/       # Preview and PDF components
│   │       ├── ComprehensivePreview.tsx
│   │       ├── layout/           # Different resume layouts
│   │       ├── theme-config.ts   # Theme configurations
│   │       └── utils/            # PDF generation utilities
│   ├── hooks/
│   ├── lib/
│   │   └── utils.ts
│   └── types/
│       └── resume.ts            # TypeScript interfaces
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## 🔧 Key Components

### Forms and Data Collection

- **Personal Information**: Basic contact details and professional summary
- **Experience**: Work history with company, position, dates, and descriptions
- **Education**: Academic background with institutions, degrees, and achievements
- **Skills**: Grouped skills with customizable proficiency levels
- **Optional Sections**: Projects, certifications, achievements, and references

### Resume Preview

- **Live Preview**: See changes in real-time as you edit
- **Multiple Themes**: Visual styling options
- **Layout Options**: Different structural arrangements
- **Export Tools**: PDF download, copy, and print functionality

### State Management

- **Zustand Store**: Central state management for resume data
- **Local Storage**: Persistence between sessions
- **Form State**: Controlled via React Hook Form

## 📝 How to Use

1. **Fill out personal information**

   - Name, title, contact details, and professional summary

2. **Add work experience**

   - Include company details, position, dates, and descriptions
   - Highlight responsibilities and achievements

3. **Input educational background**

   - Degrees, institutions, dates, and relevant accomplishments

4. **Add skills**

   - Group similar skills and indicate proficiency levels

5. **Include optional sections as needed**

   - Projects, certifications, achievements, or references

6. **Preview and customize**

   - Choose theme and layout
   - Make final adjustments

7. **Export your resume**
   - Download as PDF or print directly

## 🔄 Data Management

- **Export/Import**: Save your resume data as JSON for backup or transfer
- **Local Storage**: Data persists in browser local storage
- **Reset Option**: Clear all data and start fresh

## 🎨 Customization

### Themes

- **Classic**: Traditional, professional styling
- **Modern**: Contemporary design with clean lines
- **Professional**: Business-oriented appearance
- **Minimalist**: Clean, simplified aesthetic
- **Creative**: Bold styling for creative fields

### Layouts

- **Standard**: Traditional resume format
- **Compact**: Optimized for fitting more content
- **Elegant**: Sophisticated design with decorative elements
- **Modern**: Contemporary two-column layout

## 🔍 Technical Implementation

### Form Logic

Each form section uses React Hook Form with Zod validation to ensure data quality and provide immediate feedback to users.

### PDF Generation

PDF export is powered by @react-pdf/renderer, which creates high-quality, printable documents that closely match the preview.

### State Management

Zustand provides a simple but powerful state management solution with:

- Atomic updates for individual sections
- Local storage persistence
- State reset functionality

### Responsive Design

The application uses Tailwind CSS for responsive design, ensuring a good experience on:

- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com) for the beautiful UI components
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for hosting and deployment
