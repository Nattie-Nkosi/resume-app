# Puppeteer PDF Export Implementation Guide

This guide will help you implement server-side PDF generation using Puppeteer in your Next.js Resume Builder application.

## 1. Install Required Dependencies

```bash
npm install puppeteer @sparticuz/chromium-min
```

The `@sparticuz/chromium-min` package is a lightweight Chromium binary optimized for serverless environments like Vercel.

## 2. Create API Endpoint

Create the API route file at `pages/api/generate-pdf.ts` with the code provided in the `puppeteer-api-route.ts` artifact.

## 3. Update Client-Side Code

Replace your existing PDF export function with the updated `handleExportPDF` function from the `client-pdf-export.ts` artifact.

## 4. Add PDF Optimization Component

Add the `PDFOptimization` component to your project and include it in your `ComprehensivePreview` component.

## 5. Update ComprehensivePreview Component

Add these imports to your ComprehensivePreview component:

```typescript
import PDFOptimization from "./PDFOptimization";
```

And include the component in your JSX:

```tsx
return (
  <div className="space-y-4">
    <PDFOptimization />
    {/* Rest of your component */}
  </div>
);
```

## 6. Optimize Layout Components

Add appropriate data attributes to your layout components for better PDF structure:

```tsx
// Example for header section in layout components
<div className="pdf-section" data-pdf-section="header">
  {/* Header content */}
</div>
```

## 7. Configure for Deployment

For Vercel deployment, add the following to your `next.config.js`:

```js
module.exports = {
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};
```

## Troubleshooting

If you encounter issues with PDF generation:

1. **Memory limits**: If your PDFs are failing on Vercel, you might need to increase the function memory limit in your Vercel project settings.

2. **API route timeout**: Vercel has a 10-second timeout for API routes. For complex resumes, you might need to optimize the generation process or consider a different deployment platform.

3. **Missing content**: Make sure all necessary styles are included in the HTML sent to the Puppeteer API.

4. **Testing locally**: The API route will work differently in development vs. production environments. Test thoroughly before deployment.

## Environment Variables

For better debugging, consider adding this environment variable to your development environment:

```
DEBUG_PDF_GENERATION=true
```

And update the API route to provide more detailed error information when this variable is set.
