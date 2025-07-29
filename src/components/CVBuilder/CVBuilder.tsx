import { useCV } from '@/contexts/CVContext';
import { StepIndicator } from '@/components/CVForm/StepIndicator';
import { PersonalInfoStep } from '@/components/CVForm/PersonalInfoStep';
import { CareerObjectiveStep } from '@/components/CVForm/CareerObjectiveStep';
import { WorkExperienceStep } from '@/components/CVForm/WorkExperienceStep';
import { EducationStep } from '@/components/CVForm/EducationStep';
import { SkillsStep } from '@/components/CVForm/SkillsStep';
import { ReviewStep } from '@/components/CVForm/ReviewStep';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function CVBuilder() {
  const { state, dispatch } = useCV();

  const renderStep = () => {
    switch (state.currentStep) {
      case 'personal':
        return <PersonalInfoStep />;
      case 'objective':
        return <CareerObjectiveStep />;
      case 'experience':
        return <WorkExperienceStep />;
      case 'education':
        return <EducationStep />;
      case 'skills':
        return <SkillsStep />;
      case 'review':
        return <ReviewStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  const handleBack = () => {
    const steps = ['personal', 'objective', 'experience', 'education', 'skills', 'review'];
    const currentIndex = steps.indexOf(state.currentStep);
    if (currentIndex > 0) {
      dispatch({ type: 'SET_STEP', payload: steps[currentIndex - 1] as any });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-foreground">NaijaCV Helper</h1>
            {state.currentStep !== 'personal' && (
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
          </div>
          <StepIndicator />
        </div>

        <div className="flex justify-center">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}