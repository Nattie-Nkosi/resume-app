"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Download,
  Upload,
  Eye,
  FileText,
  Save,
  List,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import CoverLetterEditor from "@/components/cover-letter-editor";
import CoverLetterPreview from "@/components/cover-letter-preview";
import { useCoverLetterStore } from "@/app/store/useCoverLetterStore";
import { useResumeStore } from "@/app/store/useResumeStore";
import { saveAs } from "file-saver";

const CoverLetterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [saveName, setSaveName] = useState<string>("");
  const [saveDialogOpen, setSaveDialogOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [showSavedLetters, setShowSavedLetters] = useState<boolean>(false);

  // Cover letter store
  const {
    coverLetter,
    updateCoverLetter,
    resetCoverLetter,
    saveCoverLetter,
    savedCoverLetters,
    deleteSavedCoverLetter,
    loadSavedCoverLetter,
  } = useCoverLetterStore();

  // Get personal info from resume store
  const personalInfo = useResumeStore((state) => state.resumeData.personalInfo);

  // Handle export cover letter data
  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const data = JSON.stringify(coverLetter);
      const blob = new Blob([data], { type: "application/json" });
      const filename = `${personalInfo.fullName || "cover-letter"}_${
        new Date().toISOString().split("T")[0]
      }.json`
        .toLowerCase()
        .replace(/\s+/g, "_");
      saveAs(blob, filename);
      setIsExporting(false);
    }, 500);
  };

  // Handle import cover letter data
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        updateCoverLetter(data);
      } catch (error) {
        console.error("Error importing data:", error);
        alert("Invalid cover letter data file.");
      }
    };
    reader.readAsText(file);
  };

  // Handle save dialog submit
  const handleSave = () => {
    if (saveName.trim()) {
      saveCoverLetter(saveName.trim());
      setSaveName("");
      setSaveDialogOpen(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Cover Letter Builder
            </h1>
            <p className="text-muted-foreground mt-2">
              Create a professional cover letter to accompany your resume
            </p>
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden sm:flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSaveDialogOpen(true)}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSavedLetters(!showSavedLetters)}
            >
              <List className="h-4 w-4 mr-2" />
              {showSavedLetters ? "Hide Saved" : "Saved Letters"}
            </Button>

            <Button
              onClick={handleExport}
              variant="outline"
              size="sm"
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </>
              )}
            </Button>

            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  document.getElementById("import-cover-letter")?.click()
                }
              >
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <input
                id="import-cover-letter"
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImport}
              />
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Reset
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your current cover letter draft
                    and cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={resetCoverLetter}>
                    Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex sm:hidden justify-between gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setSaveDialogOpen(true)}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setShowSavedLetters(!showSavedLetters)}
            >
              <List className="h-4 w-4 mr-2" />
              {showSavedLetters ? "Hide" : "Saved"}
            </Button>
          </div>
        </div>

        {/* Save Dialog */}
        <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Save Cover Letter</AlertDialogTitle>
              <AlertDialogDescription>
                Enter a name to save your cover letter for future use.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
              <Input
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder="e.g., Marketing Position - XYZ Company"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSaveName("")}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSave}
                disabled={!saveName.trim()}
              >
                Save
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Saved Letters Section */}
        {showSavedLetters && (
          <Card className="mb-4">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">
                Saved Cover Letters
              </h2>
              {savedCoverLetters.length === 0 ? (
                <p className="text-muted-foreground">
                  No saved cover letters yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {savedCoverLetters.map((letter) => (
                    <div
                      key={letter.id}
                      className="flex justify-between items-center p-3 rounded-md border hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span>{letter.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => loadSavedCoverLetter(letter.id)}
                        >
                          Load
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => deleteSavedCoverLetter(letter.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs
          defaultValue="edit"
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "edit" | "preview")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="edit" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <CoverLetterEditor
              defaultValues={coverLetter}
              onSubmit={updateCoverLetter}
              personalInfo={personalInfo}
            />
          </TabsContent>

          <TabsContent value="preview">
            <CoverLetterPreview
              coverLetter={coverLetter}
              personalInfo={personalInfo}
            />
          </TabsContent>
        </Tabs>

        {/* Bottom Navigation */}
        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            onClick={() => setActiveTab("edit")}
            disabled={activeTab === "edit"}
          >
            Back to Editor
          </Button>
          <Button
            onClick={() => setActiveTab("preview")}
            disabled={activeTab === "preview"}
          >
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPage;
