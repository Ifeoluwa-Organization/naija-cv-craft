import { useState } from 'react';
import { CVProvider } from '@/contexts/CVContext';
import { Hero } from '@/components/LandingPage/Hero';
import { CVBuilder } from '@/components/CVBuilder/CVBuilder';

const Index = () => {
  const [showBuilder, setShowBuilder] = useState(false);

  const handleGetStarted = () => {
    setShowBuilder(true);
  };

  return (
    <CVProvider>
      <div className="min-h-screen bg-background">
        {!showBuilder ? (
          <Hero onGetStarted={handleGetStarted} />
        ) : (
          <CVBuilder />
        )}
      </div>
    </CVProvider>
  );
};

export default Index;