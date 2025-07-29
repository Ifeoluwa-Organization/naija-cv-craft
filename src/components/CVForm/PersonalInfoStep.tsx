import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCV } from '@/contexts/CVContext';
import { ChevronRight, User, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export function PersonalInfoStep() {
  const { state, dispatch } = useCV();
  const { personalInfo } = state.cvData;

  const handleInputChange = (field: keyof typeof personalInfo, value: string) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [field]: value }
    });
  };

  const handleNext = () => {
    dispatch({ type: 'SET_STEP', payload: 'objective' });
  };

  const isValid = personalInfo.fullName && personalInfo.email && personalInfo.phone;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name *
            </Label>
            <Input
              id="fullName"
              value={personalInfo.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="e.g., Adebayo Olamide Johnson"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="adebayo.johnson@email.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+234 801 234 5678"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address
            </Label>
            <Input
              id="address"
              value={personalInfo.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Lagos, Nigeria"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Professional Links (Optional)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn Profile
              </Label>
              <Input
                id="linkedin"
                value={personalInfo.linkedIn}
                onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                placeholder="linkedin.com/in/adebayo-johnson"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="github" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub Profile
              </Label>
              <Input
                id="github"
                value={personalInfo.github}
                onChange={(e) => handleInputChange('github', e.target.value)}
                placeholder="github.com/adebayo-johnson"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Personal Website/Portfolio
            </Label>
            <Input
              id="website"
              value={personalInfo.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="www.adebayojohnson.com"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
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