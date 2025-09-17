import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BarChart3, TrendingUp, DollarSign, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AnalyticsCard = ({ farmerData }) => {
  const [isDetailedOpen, setIsDetailedOpen] = useState(false);
  const { toast } = useToast();

  const stats = [
    { label: 'Hectares', value: farmerData.farmSize || '2.5', icon: MapPin },
    { label: 'Efficiency', value: '85%', icon: TrendingUp },
    { label: 'Monthly Income', value: '₹1.2L', icon: DollarSign }
  ];

  const detailedAnalytics = {
    cropYield: '125% of expected',
    waterUsage: '15% below average',
    pestIncidence: 'Low',
    profitability: '₹45,000 this season',
    efficiency: '85%',
    seasonProgress: 75,
    recommendations: [
      'Increase irrigation frequency during dry spells',
      'Consider organic fertilizers for better soil health',
      'Monitor pest levels more regularly'
    ]
  };

  const viewDetailedAnalytics = () => {
    toast({
      title: "Loading Analytics",
      description: "Generating detailed farm analytics report...",
    });
    
    setTimeout(() => {
      setIsDetailedOpen(true);
    }, 1000);
  };

  const generateInsights = () => {
    const insights = [
      'Your crop yield is 25% above expected - excellent farming practices!',
      'Water usage efficiency is high - keep maintaining current irrigation schedule',
      'Low pest incidence shows effective pest management',
      'Consider expanding cultivation area for higher profits'
    ];
    
    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    
    toast({
      title: "AI Insight",
      description: randomInsight,
    });
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Farm Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <Icon className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <div className="text-xl font-bold text-purple-700">{stat.value}</div>
                <div className="text-xs text-purple-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Season Progress</span>
            <span className="text-sm text-muted-foreground">{detailedAnalytics.seasonProgress}%</span>
          </div>
          <Progress value={detailedAnalytics.seasonProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">Season Progress: {detailedAnalytics.seasonProgress}% Complete</p>
        </div>

        <div className="flex gap-2">
          <Dialog open={isDetailedOpen} onOpenChange={setIsDetailedOpen}>
            <DialogTrigger asChild>
              <Button onClick={viewDetailedAnalytics} size="sm" className="flex-1">
                <BarChart3 className="w-4 h-4 mr-2" />
                Detailed Analytics
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Detailed Farm Analytics</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Crop Yield</h4>
                    <p className="text-green-700">{detailedAnalytics.cropYield}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Water Usage</h4>
                    <p className="text-blue-700">{detailedAnalytics.waterUsage}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Pest Incidence</h4>
                    <p className="text-orange-700">{detailedAnalytics.pestIncidence}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Profitability</h4>
                    <p className="text-purple-700">{detailedAnalytics.profitability}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-3">AI Recommendations</h4>
                  <ul className="space-y-2">
                    {detailedAnalytics.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Overall Efficiency</h4>
                  <div className="flex items-center gap-4">
                    <Progress value={85} className="flex-1" />
                    <span className="text-2xl font-bold text-primary">85%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your farm is performing excellently! Keep up the good work.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm" onClick={generateInsights}>
            <TrendingUp className="w-4 h-4 mr-2" />
            AI Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};