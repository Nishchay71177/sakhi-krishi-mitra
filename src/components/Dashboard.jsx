import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WeatherCard } from './dashboard/WeatherCard';
import { CropHealthCard } from './dashboard/CropHealthCard';
import { ActivityCalendarCard } from './dashboard/ActivityCalendarCard';
import { MarketPricesCard } from './dashboard/MarketPricesCard';
import { CommunityCard } from './dashboard/CommunityCard';
import { GovernmentSchemesCard } from './dashboard/GovernmentSchemesCard';
import { AnalyticsCard } from './dashboard/AnalyticsCard';
import { ChatInterface } from './ChatInterface';
import { useToast } from '@/hooks/use-toast';

export const Dashboard = () => {
  const [farmerData, setFarmerData] = useState({
    name: 'Rajesh Kumar',
    location: 'Kerala, India',
    crops: ['Rice', 'Coconut', 'Spices'],
    farmSize: 2.5,
    activities: []
  });
  
  const [notifications, setNotifications] = useState(3);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize reminders
    const reminders = [
      { message: 'Time to check soil moisture levels', delay: 5000 },
      { message: 'Weather alert: Rain expected tomorrow', delay: 10000 },
      { message: 'New government subsidy available', delay: 15000 }
    ];
    
    reminders.forEach(reminder => {
      setTimeout(() => {
        toast({
          title: "Reminder",
          description: reminder.message,
        });
      }, reminder.delay);
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-sm border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
                <span className="text-2xl">🌾</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Krishi Sakhi
                </h1>
                <p className="text-muted-foreground">Your Smart Farming Companion</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-6 py-3 rounded-full">
              <span>👨‍🌾</span>
              <span className="font-semibold">{farmerData.name}</span>
              <span>|</span>
              <span>📍 {farmerData.location}</span>
              {notifications > 0 && (
                <div className="bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {notifications}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <WeatherCard />
          <CropHealthCard />
          <ActivityCalendarCard farmerData={farmerData} setFarmerData={setFarmerData} />
          <div className="md:col-span-2 lg:col-span-1">
            <ChatInterface />
          </div>
          <MarketPricesCard />
          <CommunityCard />
          <GovernmentSchemesCard />
          <AnalyticsCard farmerData={farmerData} />
        </div>
      </main>
    </div>
  );
};