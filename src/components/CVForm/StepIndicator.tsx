import { useCV } from '@/contexts/CVContext';
import { FormStep } from '@/types/cv';
import { cn } from '@/lib/utils';
import { User, Target, Briefcase, GraduationCap, Award, CheckCircle, FileText } from 'lucide-react';

const steps: { key: FormStep; label: string; icon: React.ComponentType<any> }[] = [
  { key: 'personal', label: 'Personal Info', icon: User },
  { key: 'objective', label: 'Career Objective', icon: Target },
  { key: 'experience', label: 'Work Experience', icon: Briefcase },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'skills', label: 'Skills & Certs', icon: Award },
  { key: 'review', label: 'Review & Download', icon: CheckCircle },
];

export function StepIndicator() {
  const { state } = useCV();
  const currentStepIndex = steps.findIndex(step => step.key === state.currentStep);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          
          return (
            <div key={step.key} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200",
                  isActive && "bg-primary border-primary text-primary-foreground",
                  isCompleted && "bg-primary border-primary text-primary-foreground",
                  !isActive && !isCompleted && "border-muted-foreground bg-background text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              
              <div className="ml-3 hidden sm:block">
                <p className={cn(
                  "text-sm font-medium",
                  isActive && "text-primary",
                  isCompleted && "text-primary",
                  !isActive && !isCompleted && "text-muted-foreground"
                )}>
                  {step.label}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-12 h-0.5 mx-4 transition-all duration-200",
                    isCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}