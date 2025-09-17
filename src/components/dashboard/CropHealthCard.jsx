import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sprout, Upload, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CropHealthCard = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const crops = [
    { name: 'Rice', emoji: '🌾' },
    { name: 'Wheat', emoji: '🌾' },
    { name: 'Tomato', emoji: '🍅' },
    { name: 'Cotton', emoji: '🌿' }
  ];

  const cropInfo = {
    'Rice': { stage: 'Flowering', health: '85%', nextAction: 'Apply potassium fertilizer' },
    'Wheat': { stage: 'Grain filling', health: '92%', nextAction: 'Monitor for rust disease' },
    'Tomato': { stage: 'Fruiting', health: '78%', nextAction: 'Check for blight symptoms' },
    'Cotton': { stage: 'Boll formation', health: '88%', nextAction: 'Apply insecticide if needed' }
  };

  const handleCropSelect = (cropName) => {
    setSelectedCrop(cropName);
    const info = cropInfo[cropName];
    if (info) {
      toast({
        title: `${cropName} Selected`,
        description: `Stage: ${info.stage}, Health: ${info.health}`,
      });
    }
  };

  const analyzeCropImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const analyses = [
        { type: 'success', message: '✅ Crop health looks excellent! Continue current care routine.' },
        { type: 'warning', message: '⚠️ Minor nutrient deficiency detected. Consider adding potassium fertilizer.' },
        { type: 'destructive', message: '🚨 Pest infestation detected! Apply neem oil spray immediately.' },
        { type: 'default', message: '💧 Soil moisture appears low. Increase irrigation frequency.' }
      ];
      
      const result = analyses[Math.floor(Math.random() * analyses.length)];
      setAnalysisResult(result);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Crop analysis finished successfully",
      });
    }, 2000);
  };

  const getAlertVariant = (type) => {
    switch (type) {
      case 'success': return 'default';
      case 'warning': return 'default';
      case 'destructive': return 'destructive';
      default: return 'default';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'destructive': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Sprout className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Sprout className="w-5 h-5" />
          Crop Health Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <Label htmlFor="crop-image" className="text-sm font-medium">
            Upload Crop Image for AI Analysis
          </Label>
          <Input
            id="crop-image"
            type="file"
            accept="image/*"
            onChange={analyzeCropImage}
            className="mt-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {crops.map((crop) => (
            <Button
              key={crop.name}
              variant={selectedCrop === crop.name ? "default" : "outline"}
              onClick={() => handleCropSelect(crop.name)}
              className="p-4 h-auto flex flex-col items-center gap-2 hover:scale-105 transition-transform"
            >
              <span className="text-2xl">{crop.emoji}</span>
              <span className="text-sm font-medium">{crop.name}</span>
            </Button>
          ))}
        </div>

        {isAnalyzing && (
          <Alert>
            <Upload className="h-4 w-4 animate-spin" />
            <AlertDescription>
              Analyzing crop image... Please wait.
            </AlertDescription>
          </Alert>
        )}

        {analysisResult && (
          <Alert variant={getAlertVariant(analysisResult.type)}>
            {getIcon(analysisResult.type)}
            <AlertDescription>
              {analysisResult.message}
            </AlertDescription>
          </Alert>
        )}

        {selectedCrop && cropInfo[selectedCrop] && (
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">{selectedCrop} Status</h4>
            <div className="text-sm space-y-1">
              <p><strong>Stage:</strong> {cropInfo[selectedCrop].stage}</p>
              <p><strong>Health:</strong> {cropInfo[selectedCrop].health}</p>
              <p><strong>Next Action:</strong> {cropInfo[selectedCrop].nextAction}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};