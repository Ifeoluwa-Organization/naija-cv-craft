import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCV } from '@/contexts/CVContext';
import { CVPreview } from '@/components/CVPreview/CVPreview';
import { CoverLetterPreview } from '@/components/CoverLetter/CoverLetterPreview';
import { generatePDF } from '@/lib/pdf-utils';
import { ChevronLeft, Download, FileText, Mail, Eye, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ReviewStep() {
  const { state, dispatch } = useCV();
  const { cvData, theme, isGeneratingPDF } = state;
  const [activeTab, setActiveTab] = useState('cv');
  const { toast } = useToast();

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 'skills' });
  };

  const handleThemeChange = () => {
    const newTheme = theme === 'modern' ? 'classic' : 'modern';
    dispatch({ type: 'SET_THEME', payload: newTheme });
  };

  const handleDownloadCV = async () => {
    try {
      dispatch({ type: 'SET_GENERATING_PDF', payload: true });
      await generatePDF('cv', `${cvData.personalInfo.fullName}_CV.pdf`);
      toast({
        title: "CV Downloaded Successfully!",
        description: "Your professional CV has been saved to your downloads folder.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating your CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: 'SET_GENERATING_PDF', payload: false });
    }
  };

  const handleDownloadCoverLetter = async () => {
    try {
      dispatch({ type: 'SET_GENERATING_PDF', payload: true });
      await generatePDF('cover-letter', `${cvData.personalInfo.fullName}_Cover_Letter.pdf`);
      toast({
        title: "Cover Letter Downloaded!",
        description: "Your personalized cover letter has been saved to your downloads folder.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating your cover letter. Please try again.",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: 'SET_GENERATING_PDF', payload: false });
    }
  };

  const handleDownloadBoth = async () => {
    try {
      dispatch({ type: 'SET_GENERATING_PDF', payload: true });
      await generatePDF('both', `${cvData.personalInfo.fullName}_Documents.pdf`);
      toast({
        title: "Documents Downloaded!",
        description: "Both your CV and cover letter have been combined and saved.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating your documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: 'SET_GENERATING_PDF', payload: false });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Review & Download Your Documents
            </CardTitle>
            <Button
              variant="outline"
              onClick={handleThemeChange}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Palette className="mr-2 h-4 w-4" />
              {theme === 'modern' ? 'Switch to Classic' : 'Switch to Modern'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="font-semibold text-foreground">{cvData.workExperience.length}</div>
              <div className="text-sm text-muted-foreground">Work Experiences</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="font-semibold text-foreground">{cvData.education.length}</div>
              <div className="text-sm text-muted-foreground">Education Entries</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="font-semibold text-foreground">{cvData.skills.length}</div>
              <div className="text-sm text-muted-foreground">Skills Listed</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="font-semibold text-foreground">{cvData.certifications.length}</div>
              <div className="text-sm text-muted-foreground">Certifications</div>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleDownloadCV}
              disabled={isGeneratingPDF}
              className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              <FileText className="mr-2 h-4 w-4" />
              {isGeneratingPDF ? 'Generating...' : 'Download CV'}
            </Button>
            <Button
              onClick={handleDownloadCoverLetter}
              disabled={isGeneratingPDF}
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Mail className="mr-2 h-4 w-4" />
              Download Cover Letter
            </Button>
            <Button
              onClick={handleDownloadBoth}
              disabled={isGeneratingPDF}
              variant="secondary"
              className="flex-1"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Both
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cv">CV Preview</TabsTrigger>
          <TabsTrigger value="cover-letter">Cover Letter Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cv" className="mt-6">
          <div id="cv-preview">
            <CVPreview data={cvData} theme={theme} />
          </div>
        </TabsContent>
        
        <TabsContent value="cover-letter" className="mt-6">
          <div id="cover-letter-preview">
            <CoverLetterPreview data={cvData} />
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Personal Information</h4>
            <p className="text-sm text-muted-foreground">
              {cvData.personalInfo.fullName} • {cvData.personalInfo.email} • {cvData.personalInfo.phone}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Target Job</h4>
            <Badge variant="secondary">{cvData.jobType}</Badge>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Key Skills</h4>
            <div className="flex flex-wrap gap-1">
              {cvData.skills.slice(0, 6).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {cvData.skills.length > 6 && (
                <Badge variant="outline" className="text-xs">
                  +{cvData.skills.length - 6} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Edit
        </Button>
        
        <Button 
          onClick={() => window.location.reload()}
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          Start New CV
        </Button>
      </div>
    </div>
  );
}