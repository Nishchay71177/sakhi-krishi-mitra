import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, CloudRain, Sprout } from 'lucide-react';

export const NewsSection = () => {
  const newsItems = [
    {
      id: '1',
      title: 'Monsoon Update: Heavy Rainfall Expected',
      summary: 'Weather department forecasts above-normal rainfall in coming weeks. Farmers advised to prepare drainage systems.',
      category: 'Weather',
      timestamp: '2 hours ago',
      icon: CloudRain,
    },
    {
      id: '2',
      title: 'New Organic Fertilizer Subsidies',
      summary: 'Government announces 50% subsidy on organic fertilizers to promote sustainable farming practices.',
      category: 'Government',
      timestamp: '5 hours ago',
      icon: Sprout,
    },
    {
      id: '3',
      title: 'Wheat Prices Rise 12% This Month',
      summary: 'Market analysis shows consistent price increase due to higher demand and export commitments.',
      category: 'Market',
      timestamp: '1 day ago',
      icon: TrendingUp,
    },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Weather':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Government':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Market':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Latest Farm News
        </h2>
        <p className="text-muted-foreground mt-2">Stay updated with the latest farming insights</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className={getCategoryColor(item.category)}>
                    <Icon className="w-3 h-3 mr-1" />
                    {item.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.timestamp}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.summary}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-primary mb-2">Stay Informed</h3>
          <p className="text-muted-foreground">
            Get the latest farming news, weather updates, and market trends delivered to your dashboard.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};