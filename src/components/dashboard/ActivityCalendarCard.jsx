import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Plus, FileText, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ActivityCalendarCard = ({ farmerData, setFarmerData }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activityForm, setActivityForm] = useState({
    type: '',
    date: new Date().toISOString().split('T')[0],
    field: '',
    notes: ''
  });
  const { toast } = useToast();

  const recentActivities = [
    { date: 'Today', activity: 'Irrigation - Field A', status: 'Completed', icon: '💧' },
    { date: 'Yesterday', activity: 'Fertilizer Application', status: 'NPK 10:26:26 - 50kg applied', icon: '🌱' },
    { date: '2 days ago', activity: 'Pest Inspection', status: 'No major issues found', icon: '🔍' }
  ];

  const handleSaveActivity = () => {
    if (!activityForm.type || !activityForm.field) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newActivity = {
      ...activityForm,
      id: Date.now(),
      timestamp: new Date()
    };

    setFarmerData(prev => ({
      ...prev,
      activities: [newActivity, ...prev.activities]
    }));

    toast({
      title: "Activity Saved",
      description: "Your farm activity has been recorded successfully",
    });

    setActivityForm({
      type: '',
      date: new Date().toISOString().split('T')[0],
      field: '',
      notes: ''
    });
    setIsDialogOpen(false);
  };

  const generateReport = () => {
    const activityCount = farmerData.activities.length + recentActivities.length;
    const efficiency = Math.floor(Math.random() * 20) + 75;
    
    toast({
      title: "Report Generated",
      description: `Total activities: ${activityCount}, Efficiency: ${efficiency}%`,
    });
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Activity Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Farm Activity</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="activity-type">Activity Type</Label>
                  <Select value={activityForm.type} onValueChange={(value) => 
                    setActivityForm(prev => ({ ...prev, type: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sowing">Sowing</SelectItem>
                      <SelectItem value="irrigation">Irrigation</SelectItem>
                      <SelectItem value="fertilizer">Fertilizer Application</SelectItem>
                      <SelectItem value="pest-control">Pest Control</SelectItem>
                      <SelectItem value="harvesting">Harvesting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="activity-date">Date</Label>
                  <Input
                    type="date"
                    value={activityForm.date}
                    onChange={(e) => setActivityForm(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="activity-field">Field/Area</Label>
                  <Input
                    placeholder="e.g., Field A, North Section"
                    value={activityForm.field}
                    onChange={(e) => setActivityForm(prev => ({ ...prev, field: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="activity-notes">Notes</Label>
                  <Textarea
                    placeholder="Additional details..."
                    value={activityForm.notes}
                    onChange={(e) => setActivityForm(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>
                
                <Button onClick={handleSaveActivity} className="w-full">
                  Save Activity
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm" onClick={generateReport}>
            <FileText className="w-4 h-4 mr-2" />
            Report
          </Button>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Recent Activities</h4>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <div className="text-lg">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{activity.date}:</span>
                    <span className="text-sm">{activity.activity}</span>
                    {activity.status === 'Completed' && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{activity.status}</p>
                </div>
              </div>
            ))}
            
            {farmerData.activities.slice(0, 2).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <div className="text-lg">📝</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                      {new Date(activity.date).toLocaleDateString()}:
                    </span>
                    <span className="text-sm">{activity.type} - {activity.field}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.notes || 'No additional notes'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};