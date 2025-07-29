export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  linkedIn?: string;
  github?: string;
  website?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  grade?: string;
  courseType: 'university' | 'polytechnic' | 'college' | 'secondary' | 'certification';
}

export interface CVData {
  personalInfo: PersonalInfo;
  careerObjective: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: string[];
  jobType: string;
  nysc?: {
    completed: boolean;
    year?: string;
    state?: string;
  };
}

export interface CoverLetterData {
  recipientName?: string;
  companyName: string;
  position: string;
  personalizedContent: string;
}

export type CVTheme = 'modern' | 'classic';

export type FormStep = 'personal' | 'objective' | 'experience' | 'education' | 'skills' | 'certifications' | 'review';