import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCV } from '@/contexts/CVContext';
import { ChevronRight, ChevronLeft, Target, Lightbulb } from 'lucide-react';

export function CareerObjectiveStep() {
  const { state, dispatch } = useCV();
  const { careerObjective } = state.cvData;

  const handleInputChange = (value: string) => {
    dispatch({
      type: 'UPDATE_CAREER_OBJECTIVE',
      payload: value
    });
  };

  const handleNext = () => {
    dispatch({ type: 'SET_STEP', payload: 'experience' });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 'personal' });
  };

  const sampleObjectives = [
    "A highly motivated software developer with 3+ years of experience seeking to leverage my technical skills in full-stack development to contribute to innovative projects at a forward-thinking technology company.",
    "Dynamic marketing professional with proven track record in digital marketing and brand management, looking to drive growth and enhance customer engagement in a progressive organization.",
    "Recent graduate in Business Administration seeking an entry-level position in project management where I can apply my analytical skills and passion for process improvement."
  ];

  const isValid = careerObjective.trim().length >= 50;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Career Objective
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="objective" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Your Career Objective *
          </Label>
          <Textarea
            id="objective"
            value={careerObjective}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Write a compelling 2-3 sentence summary of your career goals and what you bring to the table..."
            className="min-h-[120px] resize-none"
            maxLength={300}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Minimum 50 characters required</span>
            <span>{careerObjective.length}/300</span>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-start gap-2 mb-3">
            <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground">Sample Career Objectives</h4>
              <p className="text-sm text-muted-foreground">Get inspired by these examples:</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {sampleObjectives.map((objective, index) => (
              <div 
                key={index}
                className="p-3 bg-background rounded border cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleInputChange(objective)}
              >
                <p className="text-sm text-foreground">{objective}</p>
              </div>
            ))}
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
            disabled={!isValid}
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