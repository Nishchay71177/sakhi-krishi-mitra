import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Cloud, Droplets, Thermometer, Wind, AlertTriangle } from 'lucide-react';

export const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    humidity: 75,
    rainChance: 60,
    windSpeed: 12
  });

  useEffect(() => {
    // Simulate weather data updates
    const updateWeather = () => {
      setWeatherData({
        temperature: Math.floor(Math.random() * 15) + 20,
        humidity: Math.floor(Math.random() * 40) + 50,
        rainChance: Math.floor(Math.random() * 100),
        windSpeed: Math.floor(Math.random() * 20) + 5
      });
    };

    const interval = setInterval(updateWeather, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Cloud className="w-5 h-5" />
          Weather & Environment
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg">
            <Thermometer className="w-5 h-5 mx-auto mb-2" />
            <div className="text-sm">Temperature</div>
            <div className="text-lg font-bold">{weatherData.temperature}°C</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg">
            <Droplets className="w-5 h-5 mx-auto mb-2" />
            <div className="text-sm">Humidity</div>
            <div className="text-lg font-bold">{weatherData.humidity}%</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg">
            <Cloud className="w-5 h-5 mx-auto mb-2" />
            <div className="text-sm">Rain Chance</div>
            <div className="text-lg font-bold">{weatherData.rainChance}%</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg">
            <Wind className="w-5 h-5 mx-auto mb-2" />
            <div className="text-sm">Wind</div>
            <div className="text-lg font-bold">{weatherData.windSpeed} km/h</div>
          </div>
        </div>
        
        {weatherData.rainChance > 70 && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              ⚠️ Heavy rainfall expected tomorrow. Avoid spraying pesticides.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};