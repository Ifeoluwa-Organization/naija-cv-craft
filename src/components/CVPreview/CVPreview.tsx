import { CVData, CVTheme } from '@/types/cv';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
  theme: CVTheme;
}

export function CVPreview({ data, theme }: CVPreviewProps) {
  const { personalInfo, careerObjective, workExperience, education, skills, certifications, nysc } = data;

  const themeClasses = {
    modern: 'bg-gradient-to-br from-primary/5 to-background border-l-4 border-l-primary',
    classic: 'bg-background border border-border'
  };

  return (
    <Card className={`w-full max-w-4xl mx-auto print:shadow-none ${themeClasses[theme]}`}>
      <CardContent className="p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-foreground">{personalInfo.fullName}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {personalInfo.email}
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {personalInfo.phone}
            </div>
            {personalInfo.address && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {personalInfo.address}
              </div>
            )}
          </div>
          {(personalInfo.linkedIn || personalInfo.github || personalInfo.website) && (
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {personalInfo.linkedIn && (
                <div className="flex items-center gap-1 text-primary">
                  <Linkedin className="h-4 w-4" />
                  {personalInfo.linkedIn}
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1 text-primary">
                  <Github className="h-4 w-4" />
                  {personalInfo.github}
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-1 text-primary">
                  <Globe className="h-4 w-4" />
                  {personalInfo.website}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Career Objective */}
        {careerObjective && (
          <div>
            <h2 className="text-xl font-semibold text-primary mb-3 border-b border-border pb-1">
              Career Objective
            </h2>
            <p className="text-foreground leading-relaxed">{careerObjective}</p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-primary mb-3 border-b border-border pb-1">
              Work Experience
            </h2>
            <div className="space-y-4">
              {workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.jobTitle}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      {exp.location && <p className="text-sm text-muted-foreground">{exp.location}</p>}
                    </div>
                    <div className="text-sm text-muted-foreground text-right">
                      {exp.startDate} - {exp.isCurrentJob ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  {exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-sm text-foreground ml-4">
                      {exp.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-primary mb-3 border-b border-border pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-primary">{edu.institution}</p>
                    {edu.location && <p className="text-sm text-muted-foreground">{edu.location}</p>}
                  </div>
                  <div className="text-sm text-muted-foreground text-right">
                    <div>{edu.graduationYear}</div>
                    {edu.grade && <div>{edu.grade}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NYSC */}
        {nysc?.completed && (
          <div>
            <h2 className="text-xl font-semibold text-primary mb-3 border-b border-border pb-1">
              National Youth Service Corps (NYSC)
            </h2>
            <p className="text-foreground">
              Completed NYSC in {nysc.year}{nysc.state && `, ${nysc.state} State`}
            </p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-primary mb-3 border-b border-border pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-primary mb-3 border-b border-border pb-1">
              Certifications & Training
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {certifications.map((cert, index) => (
                <li key={index} className="text-foreground">{cert}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}