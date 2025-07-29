import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useCV } from '@/contexts/CVContext';
import { WorkExperience } from '@/types/cv';
import { ChevronRight, ChevronLeft, Briefcase, Plus, Trash2 } from 'lucide-react';

export function WorkExperienceStep() {
  const { state, dispatch } = useCV();
  const { workExperience } = state.cvData;
  const [currentExperience, setCurrentExperience] = useState<Partial<WorkExperience>>({
    jobTitle: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrentJob: false,
    responsibilities: ['']
  });

  const handleInputChange = (field: keyof WorkExperience, value: any) => {
    setCurrentExperience(prev => ({ ...prev, [field]: value }));
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    const newResponsibilities = [...(currentExperience.responsibilities || [''])];
    newResponsibilities[index] = value;
    setCurrentExperience(prev => ({ ...prev, responsibilities: newResponsibilities }));
  };

  const addResponsibility = () => {
    setCurrentExperience(prev => ({
      ...prev,
      responsibilities: [...(prev.responsibilities || ['']), '']
    }));
  };

  const removeResponsibility = (index: number) => {
    const newResponsibilities = currentExperience.responsibilities?.filter((_, i) => i !== index) || [];
    setCurrentExperience(prev => ({ ...prev, responsibilities: newResponsibilities }));
  };

  const addExperience = () => {
    if (currentExperience.jobTitle && currentExperience.company) {
      const newExperience: WorkExperience = {
        id: Date.now().toString(),
        jobTitle: currentExperience.jobTitle || '',
        company: currentExperience.company || '',
        location: currentExperience.location || '',
        startDate: currentExperience.startDate || '',
        endDate: currentExperience.endDate || '',
        isCurrentJob: currentExperience.isCurrentJob || false,
        responsibilities: currentExperience.responsibilities?.filter(r => r.trim()) || []
      };

      dispatch({ type: 'ADD_WORK_EXPERIENCE', payload: newExperience });
      setCurrentExperience({
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrentJob: false,
        responsibilities: ['']
      });
    }
  };

  const removeExperience = (id: string) => {
    dispatch({ type: 'REMOVE_WORK_EXPERIENCE', payload: id });
  };

  const handleNext = () => {
    dispatch({ type: 'SET_STEP', payload: 'education' });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 'objective' });
  };

  const isFormValid = currentExperience.jobTitle && currentExperience.company;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Work Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Experiences */}
        {workExperience.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Added Experiences</h3>
            {workExperience.map((exp) => (
              <Card key={exp.id} className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{exp.jobTitle}</h4>
                      <p className="text-muted-foreground">{exp.company} • {exp.location}</p>
                      <p className="text-sm text-muted-foreground">
                        {exp.startDate} - {exp.isCurrentJob ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add New Experience Form */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {workExperience.length === 0 ? 'Add Your Work Experience' : 'Add Another Experience'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                value={currentExperience.jobTitle || ''}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                placeholder="e.g., Software Developer"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={currentExperience.company || ''}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="e.g., Techpoint Africa"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={currentExperience.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Lagos, Nigeria"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="month"
                value={currentExperience.startDate || ''}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="month"
                value={currentExperience.endDate || ''}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                disabled={currentExperience.isCurrentJob}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="currentJob"
              checked={currentExperience.isCurrentJob || false}
              onCheckedChange={(checked) => handleInputChange('isCurrentJob', checked)}
            />
            <Label htmlFor="currentJob">I currently work here</Label>
          </div>

          <div className="space-y-3">
            <Label>Key Responsibilities & Achievements</Label>
            {currentExperience.responsibilities?.map((responsibility, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={responsibility}
                  onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                  placeholder="e.g., Developed and maintained web applications using React and Node.js"
                  className="flex-1 min-h-[60px] resize-none"
                />
                {(currentExperience.responsibilities?.length || 0) > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeResponsibility(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            <Button
              variant="ghost"
              onClick={addResponsibility}
              className="w-full border-2 border-dashed border-muted-foreground/25 text-muted-foreground hover:border-primary hover:text-primary"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another Responsibility
            </Button>
          </div>

          <Button
            onClick={addExperience}
            disabled={!isFormValid}
            className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add This Experience
          </Button>
        </div>

        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Button 
            onClick={handleNext} 
            className="bg-primary hover:bg-primary-dark text-primary-foreground"
          >
            Next Step
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
