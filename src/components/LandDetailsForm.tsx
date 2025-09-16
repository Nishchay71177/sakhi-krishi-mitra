import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Save, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LandDetails {
  farmerName: string;
  landSize: string;
  soilType: string;
  cropType: string;
  location: string;
  irrigationMethod: string;
  additionalNotes: string;
}

export const LandDetailsForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<LandDetails>({
    farmerName: '',
    landSize: '',
    soilType: '',
    cropType: '',
    location: '',
    irrigationMethod: '',
    additionalNotes: '',
  });

  const handleInputChange = (field: keyof LandDetails, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to a database
    toast({
      title: "Land details saved!",
      description: "Your farm information has been updated successfully.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Land Details
        </h2>
        <p className="text-muted-foreground mt-2">Help Sakhi understand your farm better</p>
      </div>

      <Card>
        <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Farm Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="farmerName">Farmer Name</Label>
                <Input
                  id="farmerName"
                  value={formData.farmerName}
                  onChange={(e) => handleInputChange('farmerName', e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="landSize">Land Size (acres)</Label>
                <div className="relative">
                  <Input
                    id="landSize"
                    value={formData.landSize}
                    onChange={(e) => handleInputChange('landSize', e.target.value)}
                    placeholder="e.g., 5.5"
                    type="number"
                    step="0.1"
                  />
                  <Calculator className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Farm Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Village, District, State"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type</Label>
                <Select onValueChange={(value) => handleInputChange('soilType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay Soil</SelectItem>
                    <SelectItem value="sandy">Sandy Soil</SelectItem>
                    <SelectItem value="loamy">Loamy Soil</SelectItem>
                    <SelectItem value="silty">Silty Soil</SelectItem>
                    <SelectItem value="peaty">Peaty Soil</SelectItem>
                    <SelectItem value="chalky">Chalky Soil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cropType">Primary Crop</Label>
                <Select onValueChange={(value) => handleInputChange('cropType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="corn">Corn</SelectItem>
                    <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="pulses">Pulses</SelectItem>
                    <SelectItem value="oilseeds">Oilseeds</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="irrigationMethod">Irrigation Method</Label>
              <Select onValueChange={(value) => handleInputChange('irrigationMethod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select irrigation method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drip">Drip Irrigation</SelectItem>
                  <SelectItem value="sprinkler">Sprinkler System</SelectItem>
                  <SelectItem value="flood">Flood Irrigation</SelectItem>
                  <SelectItem value="rainfed">Rain-fed</SelectItem>
                  <SelectItem value="tube-well">Tube Well</SelectItem>
                  <SelectItem value="canal">Canal System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                placeholder="Any specific challenges, previous crops, or other important information..."
                className="min-h-20"
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
              <Save className="w-4 h-4 mr-2" />
              Save Land Details
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};