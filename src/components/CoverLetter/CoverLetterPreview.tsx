import { CVData } from '@/types/cv';
import { Card, CardContent } from '@/components/ui/card';

interface CoverLetterPreviewProps {
  data: CVData;
}

export function CoverLetterPreview({ data }: CoverLetterPreviewProps) {
  const { personalInfo, careerObjective, workExperience, skills, jobType } = data;

  const generateCoverLetter = () => {
    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const relevantSkills = skills.slice(0, 5).join(', ');
    const experienceYears = workExperience.length > 0 ? workExperience.length : 'recent graduate';
    
    return `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobType} position at your esteemed organization. ${careerObjective}

With ${typeof experienceYears === 'number' ? `${experienceYears} years of` : ''} experience in ${jobType.toLowerCase()}, I have developed strong skills in ${relevantSkills}. ${workExperience.length > 0 ? `In my previous role as ${workExperience[0]?.jobTitle} at ${workExperience[0]?.company}, I successfully contributed to various projects and gained valuable experience that directly aligns with your requirements.` : 'As a recent graduate, I am eager to apply my knowledge and skills in a professional environment.'}

I am particularly drawn to your organization because of its reputation for excellence and innovation. I am confident that my technical skills, combined with my passion for ${jobType.toLowerCase()}, make me an ideal candidate for this position.

I would welcome the opportunity to discuss how my background and enthusiasm can contribute to your team's success. Thank you for considering my application. I look forward to hearing from you soon.

Yours sincerely,
${personalInfo.fullName}`;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto print:shadow-none">
      <CardContent className="p-8 space-y-6">
        {/* Header */}
        <div className="text-right space-y-1 text-sm text-muted-foreground border-b border-border pb-4">
          <div>{personalInfo.fullName}</div>
          <div>{personalInfo.email}</div>
          <div>{personalInfo.phone}</div>
          {personalInfo.address && <div>{personalInfo.address}</div>}
          <div className="mt-4">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>

        {/* Letter Content */}
        <div className="space-y-4 text-foreground leading-relaxed">
          {generateCoverLetter().split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-justify">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}