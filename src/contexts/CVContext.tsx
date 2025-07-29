import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CVData, FormStep, CVTheme } from '@/types/cv';

interface CVState {
  cvData: CVData;
  currentStep: FormStep;
  theme: CVTheme;
  isGeneratingPDF: boolean;
}

type CVAction = 
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<CVData['personalInfo']> }
  | { type: 'UPDATE_CAREER_OBJECTIVE'; payload: string }
  | { type: 'ADD_WORK_EXPERIENCE'; payload: CVData['workExperience'][0] }
  | { type: 'UPDATE_WORK_EXPERIENCE'; payload: { id: string; data: Partial<CVData['workExperience'][0]> } }
  | { type: 'REMOVE_WORK_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: CVData['education'][0] }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<CVData['education'][0]> } }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  | { type: 'UPDATE_SKILLS'; payload: string[] }
  | { type: 'UPDATE_CERTIFICATIONS'; payload: string[] }
  | { type: 'UPDATE_JOB_TYPE'; payload: string }
  | { type: 'UPDATE_NYSC'; payload: CVData['nysc'] }
  | { type: 'SET_STEP'; payload: FormStep }
  | { type: 'SET_THEME'; payload: CVTheme }
  | { type: 'SET_GENERATING_PDF'; payload: boolean }
  | { type: 'RESET_CV' };

const initialState: CVState = {
  cvData: {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedIn: '',
      github: '',
      website: ''
    },
    careerObjective: '',
    workExperience: [],
    education: [],
    skills: [],
    certifications: [],
    jobType: '',
    nysc: {
      completed: false,
      year: '',
      state: ''
    }
  },
  currentStep: 'personal',
  theme: 'modern',
  isGeneratingPDF: false
};

function cvReducer(state: CVState, action: CVAction): CVState {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        cvData: {
          ...state.cvData,
          personalInfo: { ...state.cvData.personalInfo, ...action.payload }
        }
      };
    case 'UPDATE_CAREER_OBJECTIVE':
      return {
        ...state,
        cvData: { ...state.cvData, careerObjective: action.payload }
      };
    case 'ADD_WORK_EXPERIENCE':
      return {
        ...state,
        cvData: {
          ...state.cvData,
          workExperience: [...state.cvData.workExperience, action.payload]
        }
      };
    case 'UPDATE_WORK_EXPERIENCE':
      return {
        ...state,
        cvData: {
          ...state.cvData,
          workExperience: state.cvData.workExperience.map(exp =>
            exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
          )
        }
      };
    case 'REMOVE_WORK_EXPERIENCE':
      return {
        ...state,
        cvData: {
          ...state.cvData,
          workExperience: state.cvData.workExperience.filter(exp => exp.id !== action.payload)
        }
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        cvData: {
          ...state.cvData,
          education: [...state.cvData.education, action.payload]
        }
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        cvData: {
          ...state.cvData,
          education: state.cvData.education.map(edu =>
            edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
          )
        }
      };
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        cvData: {
          ...state.cvData,
          education: state.cvData.education.filter(edu => edu.id !== action.payload)
        }
      };
    case 'UPDATE_SKILLS':
      return {
        ...state,
        cvData: { ...state.cvData, skills: action.payload }
      };
    case 'UPDATE_CERTIFICATIONS':
      return {
        ...state,
        cvData: { ...state.cvData, certifications: action.payload }
      };
    case 'UPDATE_JOB_TYPE':
      return {
        ...state,
        cvData: { ...state.cvData, jobType: action.payload }
      };
    case 'UPDATE_NYSC':
      return {
        ...state,
        cvData: { ...state.cvData, nysc: action.payload }
      };
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_GENERATING_PDF':
      return { ...state, isGeneratingPDF: action.payload };
    case 'RESET_CV':
      return initialState;
    default:
      return state;
  }
}

const CVContext = createContext<{
  state: CVState;
  dispatch: React.Dispatch<CVAction>;
} | null>(null);

export function CVProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cvReducer, initialState);

  return (
    <CVContext.Provider value={{ state, dispatch }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
}