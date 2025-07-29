import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useCV } from '@/contexts/CVContext';
import { Education } from '@/types/cv';
import { ChevronRight, ChevronLeft, GraduationCap, Plus, Trash2 } from 'lucide-react';

export function EducationStep() {
  const { state, dispatch } = useCV();
  const { education, nysc } = state.cvData;
  const [currentEducation, setCurrentEducation] = useState<Partial<Education>>({
    degree: '',
    institution: '',
    location: '',
    graduationYear: '',
    grade: '',
    courseType: 'university'
  });

  const handleInputChange = (field: keyof Education, value: any) => {
    setCurrentEducation(prev => ({ ...prev, [field]: value }));
  };

  const handleNyscChange = (field: keyof typeof nysc, value: any) => {
    dispatch({
      type: 'UPDATE_NYSC',
      payload: { ...nysc, [field]: value }
    });
  };

  const addEducation = () => {
    if (currentEducation.degree && currentEducation.institution) {
      const newEducation: Education = {
        id: Date.now().toString(),
        degree: currentEducation.degree || '',
        institution: currentEducation.institution || '',
        location: currentEducation.location || '',
        graduationYear: currentEducation.graduationYear || '',
        grade: currentEducation.grade || '',
        courseType: currentEducation.courseType || 'university'
      };

      dispatch({ type: 'ADD_EDUCATION', payload: newEducation });
      setCurrentEducation({
        degree: '',
        institution: '',
        location: '',
        graduationYear: '',
        grade: '',
        courseType: 'university'
      });
    }
  };

  const removeEducation = (id: string) => {
    dispatch({ type: 'REMOVE_EDUCATION', payload: id });
  };

  const handleNext = () => {
    dispatch({ type: 'SET_STEP', payload: 'skills' });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 'experience' });
  };

  const isFormValid = currentEducation.degree && currentEducation.institution;
  const canProceed = education.length > 0;

  const courseTypes = [
    { value: 'university', label: 'University' },
    { value: 'polytechnic', label: 'Polytechnic' },
    { value: 'college', label: 'College of Education' },
    { value: 'secondary', label: 'Secondary School' },
    { value: 'certification', label: 'Professional Certification' }
  ];

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River',
    'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
    'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
    'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Education & NYSC
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Education */}
        {education.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Added Education</h3>
            {education.map((edu) => (
              <Card key={edu.id} className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{edu.degree}</h4>
                      <p className="text-muted-foreground">{edu.institution} • {edu.location}</p>
                      <p className="text-sm text-muted-foreground">
                        {edu.graduationYear} {edu.grade && `• ${edu.grade}`}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
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

        {/* Add New Education Form */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {education.length === 0 ? 'Add Your Education' : 'Add Another Education'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="courseType">Education Type *</Label>
              <Select value={currentEducation.courseType} onValueChange={(value) => handleInputChange('courseType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select education type" />
                </SelectTrigger>
                <SelectContent>
                  {courseTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="degree">Degree/Qualification *</Label>
              <Input
                id="degree"
                value={currentEducation.degree || ''}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                placeholder="e.g., BSc Computer Science, SSCE, HND"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution *</Label>
              <Input
                id="institution"
                value={currentEducation.institution || ''}
                onChange={(e) => handleInputChange('institution', e.target.value)}
                placeholder="e.g., University of Lagos, Yaba College of Technology"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={currentEducation.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Lagos, Nigeria"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Graduation Year *</Label>
              <Input
                id="graduationYear"
                value={currentEducation.graduationYear || ''}
                onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                placeholder="e.g., 2023"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grade">Grade/Class (Optional)</Label>
              <Input
                id="grade"
                value={currentEducation.grade || ''}
                onChange={(e) => handleInputChange('grade', e.target.value)}
                placeholder="e.g., First Class, Upper Credit, Distinction"
              />
            </div>
          </div>

          <Button
            onClick={addEducation}
            disabled={!isFormValid}
            className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add This Education
          </Button>
        </div>

        {/* NYSC Section */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-medium">NYSC Information</h3>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="nyscCompleted"
              checked={nysc?.completed || false}
              onCheckedChange={(checked) => handleNyscChange('completed', checked)}
            />
            <Label htmlFor="nyscCompleted">I have completed my NYSC</Label>
          </div>

          {nysc?.completed && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nyscYear">Service Year</Label>
                <Input
                  id="nyscYear"
                  value={nysc?.year || ''}
                  onChange={(e) => handleNyscChange('year', e.target.value)}
                  placeholder="e.g., 2023"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nyscState">State of Service</Label>
                <Select value={nysc?.state || ''} onValueChange={(value) => handleNyscChange('state', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
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
            disabled={!canProceed}
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
