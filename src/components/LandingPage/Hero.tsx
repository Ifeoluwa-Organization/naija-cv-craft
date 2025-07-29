import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Download, Sparkles, Check } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  const features = [
    "ATS-compliant CV formats",
    "Nigerian context aware",
    "Professional cover letters",
    "Mobile-friendly design"
  ];

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                Made for Nigerian Job Seekers
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Create Your Perfect{' '}
                <span className="text-primary">CV & Cover Letter</span>{' '}
                in Minutes
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Professional, ATS-compliant CVs and cover letters tailored for the Nigerian job market. 
                Stand out from the crowd with our guided form builder.
              </p>
            </div>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
              >
                <FileText className="mr-2 h-5 w-5" />
                Start Building Your CV
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="mr-2 h-5 w-5" />
                View Sample CV
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card className="p-8 bg-card/80 backdrop-blur-sm border shadow-lg">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Quick & Easy Process
                  </h3>
                  <p className="text-muted-foreground">
                    Get your professional CV ready in just 3 simple steps
                  </p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Fill Your Details", desc: "Enter your personal and professional information" },
                    { step: "2", title: "Choose Your Style", desc: "Select from modern or classic CV templates" },
                    { step: "3", title: "Download & Apply", desc: "Get your polished CV and cover letter instantly" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}