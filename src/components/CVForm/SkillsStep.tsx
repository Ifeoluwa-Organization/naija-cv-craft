import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCV } from '@/contexts/CVContext';
import { ChevronRight, ChevronLeft, Award, Plus, X, Briefcase } from 'lucide-react';

export function SkillsStep() {
  const { state, dispatch } = useCV();
  const { skills, certifications, jobType } = state.cvData;
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentCertification, setCurrentCertification] = useState('');

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      dispatch({
        type: 'UPDATE_SKILLS',
        payload: [...skills, currentSkill.trim()]
      });
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    dispatch({
      type: 'UPDATE_SKILLS',
      payload: skills.filter(skill => skill !== skillToRemove)
    });
  };

  const addCertification = () => {
    if (currentCertification.trim() && !certifications.includes(currentCertification.trim())) {
      dispatch({
        type: 'UPDATE_CERTIFICATIONS',
        payload: [...certifications, currentCertification.trim()]
      });
      setCurrentCertification('');
    }
  };

  const removeCertification = (certToRemove: string) => {
    dispatch({
      type: 'UPDATE_CERTIFICATIONS',
      payload: certifications.filter(cert => cert !== certToRemove)
    });
  };

  const handleJobTypeChange = (value: string) => {
    dispatch({
      type: 'UPDATE_JOB_TYPE',
      payload: value
    });
  };

  const handleNext = () => {
    dispatch({ type: 'SET_STEP', payload: 'review' });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 'education' });
  };

  const canProceed = skills.length >= 3 && jobType;

  const jobTypes = [
    'Software Developer/Engineer',
    'Data Analyst/Scientist',
    'Product Manager',
    'Digital Marketing Specialist',
    'Business Analyst',
    'UI/UX Designer',
    'Project Manager',
    'Sales Representative',
    'Customer Service Representative',
    'Financial Analyst',
    'Human Resources Specialist',
    'Operations Manager',
    'Administrative Assistant',
    'Content Writer/Creator',
    'Graphic Designer',
    'Accountant',
    'Marketing Manager',
    'Business Development Manager',
    'Quality Assurance Analyst',
    'Network Administrator',
    'Other'
  ];

  const suggestedSkills = {
    'Software Developer/Engineer': ['JavaScript', 'Python', 'React', 'Node.js', 'Git', 'SQL', 'HTML/CSS', 'API Development'],
    'Data Analyst/Scientist': ['Python', 'R', 'SQL', 'Excel', 'Power BI', 'Tableau', 'Machine Learning', 'Statistics'],
    'Digital Marketing Specialist': ['Google Analytics', 'SEO/SEM', 'Social Media Marketing', 'Email Marketing', 'Content Marketing', 'PPC Advertising'],
    'Product Manager': ['Product Strategy', 'User Research', 'Agile/Scrum', 'Data Analysis', 'Market Research', 'Stakeholder Management'],
    'UI/UX Designer': ['Figma', 'Adobe Creative Suite', 'Sketch', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems']
  };

  const getSkillSuggestions = () => {
    return suggestedSkills[jobType as keyof typeof suggestedSkills] || [];
  };

  const addSuggestedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      dispatch({
        type: 'UPDATE_SKILLS',
        payload: [...skills, skill]
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Skills, Certifications & Job Type
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job Type Selection */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            What type of job are you applying for? *
          </Label>
          <Select value={jobType} onValueChange={handleJobTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select the job type you're targeting" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Skills Section */}
        <div className="space-y-4">
          <div>
            <Label className="flex items-center gap-2 mb-3">
              <Award className="h-4 w-4" />
              Technical & Professional Skills *
            </Label>
            <p className="text-sm text-muted-foreground mb-3">
              Add at least 3 skills that are relevant to your target job
            </p>
          </div>

          {/* Skill Input */}
          <div className="flex gap-2">
            <Input
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              placeholder="Type a skill and press Enter or click Add"
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              className="flex-1"
            />
            <Button 
              onClick={addSkill} 
              disabled={!currentSkill.trim()}
              className="bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Suggested Skills */}
          {jobType && getSkillSuggestions().length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Suggested skills for {jobType}:</p>
              <div className="flex flex-wrap gap-2">
                {getSkillSuggestions().map((skill) => (
                  <Button
                    key={skill}
                    variant="ghost"
                    size="sm"
                    onClick={() => addSuggestedSkill(skill)}
                    disabled={skills.includes(skill)}
                    className="h-8 text-xs border border-primary/20 hover:bg-primary hover:text-primary-foreground"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Skills Display */}
          {skills.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Your Skills ({skills.length}):</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Certifications Section */}
        <div className="space-y-4">
          <div>
            <Label className="flex items-center gap-2 mb-3">
              <Award className="h-4 w-4" />
              Certifications & Training (Optional)
            </Label>
            <p className="text-sm text-muted-foreground mb-3">
              Add any relevant certifications, courses, or training programs
            </p>
          </div>

          {/* Certification Input */}
          <div className="flex gap-2">
            <Input
              value={currentCertification}
              onChange={(e) => setCurrentCertification(e.target.value)}
              placeholder="e.g., Google Analytics Certified, AWS Cloud Practitioner"
              onKeyPress={(e) => e.key === 'Enter' && addCertification()}
              className="flex-1"
            />
            <Button 
              onClick={addCertification} 
              disabled={!currentCertification.trim()}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Certifications Display */}
          {certifications.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Your Certifications ({certifications.length}):</p>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="flex items-center gap-1">
                    {cert}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => removeCertification(cert)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              {skills.length >= 3 && jobType ? 'Ready to proceed!' : 'Complete the requirements below'}
            </span>
          </div>
          <div className="space-y-1">
            <div className={`text-xs ${skills.length >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
              ✓ Add at least 3 skills ({skills.length}/3)
            </div>
            <div className={`text-xs ${jobType ? 'text-primary' : 'text-muted-foreground'}`}>
              ✓ Select your target job type
            </div>
          </div>
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
            Review & Download
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}