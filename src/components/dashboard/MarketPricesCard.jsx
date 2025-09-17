import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Minus, RefreshCw, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const MarketPricesCard = () => {
  const [marketData, setMarketData] = useState([
    { crop: 'Rice', price: '₹2,100/quintal', trend: 'up', change: '+5%', market: 'Kochi Mandi' },
    { crop: 'Wheat', price: '₹2,350/quintal', trend: 'down', change: '-2%', market: 'Thrissur Market' },
    { crop: 'Tomato', price: '₹45/kg', trend: 'up', change: '+12%', market: 'Local Market' }
  ]);
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const refreshMarketData = async () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedData = marketData.map(item => ({
        ...item,
        trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)],
        change: `${Math.random() > 0.5 ? '+' : '-'}${Math.floor(Math.random() * 15) + 1}%`
      }));
      
      setMarketData(updatedData);
      setIsRefreshing(false);
      
      toast({
        title: "Market Data Updated",
        description: "Latest prices have been refreshed",
      });
      
      // Random price alert
      setTimeout(() => {
        const randomCrop = updatedData[Math.floor(Math.random() * updatedData.length)];
        const trendIcon = randomCrop.trend === 'up' ? '📈' : randomCrop.trend === 'down' ? '📉' : '➡️';
        
        toast({
          title: `${randomCrop.crop} Price Alert`,
          description: `${trendIcon} Prices updated ${randomCrop.change}`,
        });
      }, 1000);
    }, 1500);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Market Prices
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Crop</TableHead>
                <TableHead className="font-semibold">Today</TableHead>
                <TableHead className="font-semibold">Trend</TableHead>
                <TableHead className="font-semibold">Market</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marketData.map((item, index) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{item.crop}</TableCell>
                  <TableCell className="font-semibold">{item.price}</TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-2 ${getTrendColor(item.trend)}`}>
                      {getTrendIcon(item.trend)}
                      <span className="font-medium">{item.change}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.market}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <Button 
          onClick={refreshMarketData} 
          disabled={isRefreshing}
          className="w-full mt-4"
          variant="outline"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Prices'}
        </Button>
      </CardContent>
    </Card>
  );
};