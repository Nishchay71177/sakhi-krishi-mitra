import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { ChatInterface } from '@/components/ChatInterface';
import { NewsSection } from '@/components/NewsSection';
import { LandDetailsForm } from '@/components/LandDetailsForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Newspaper, MapPin, ArrowRight } from 'lucide-react';
import farmingHero from '@/assets/farming-hero.jpg';

const Index = () => {
  const [activeSection, setActiveSection] = useState('welcome');

  const renderContent = () => {
    switch (activeSection) {
      case 'chat':
        return <ChatInterface />;
      case 'news':
        return <NewsSection />;
      case 'land':
        return <LandDetailsForm />;
      default:
        return <WelcomeSection onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

const WelcomeSection = ({ onSectionChange }) => {
  const features = [
    {
      id: 'chat',
      title: 'Ask Sakhi',
      description: 'Get AI-powered farming advice and solutions to your agricultural questions',
      icon: MessageSquare,
      color: 'bg-gradient-to-br from-primary to-primary-glow',
    },
    {
      id: 'news',
      title: 'Farm News',
      description: 'Stay updated with latest weather, market prices, and government schemes',
      icon: Newspaper,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      id: 'land',
      title: 'Land Details',
      description: 'Register your farm information for personalized recommendations',
      icon: MapPin,
      color: 'bg-gradient-to-br from-earth to-soil',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden">
        <div 
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${farmingHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-glow/80"></div>
          <div className="relative z-10 h-full flex items-center justify-center text-center">
            <div className="max-w-2xl px-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Welcome to Sakhi
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-6">
                Your intelligent farming companion for better crops and higher yields
              </p>
              <Button 
                onClick={() => onSectionChange('chat')}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-3"
              >
                Start Chatting with Sakhi
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card 
              key={feature.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
              onClick={() => onSectionChange(feature.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                <Button 
                  variant="ghost" 
                  className="mt-4 text-primary hover:text-primary-glow"
                >
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-accent/10 to-harvest/10 border-accent/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-primary mb-3">🌱 Smart Farming Solutions</h3>
            <p className="text-muted-foreground">
              Get personalized advice based on your soil type, crop variety, and local weather conditions.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-sage/10 to-primary/10 border-sage/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-primary mb-3">📊 Data-Driven Insights</h3>
            <p className="text-muted-foreground">
              Make informed decisions with real-time market data, weather forecasts, and agricultural trends.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;