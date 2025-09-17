import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Users, MessageSquare, Phone, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CommunityCard = () => {
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState('');
  const { toast } = useToast();

  const stats = [
    { label: 'Active Farmers', value: '1,247', icon: Users },
    { label: 'Discussions', value: '89', icon: MessageSquare },
    { label: 'Tips Shared', value: '156', icon: TrendingUp }
  ];

  const discussions = [
    {
      author: 'Mohan Farmer',
      topic: 'Best time to plant cotton in Kerala?',
      time: '2 hours ago',
      replies: 5
    },
    {
      author: 'Priya Agriculturist',
      topic: 'Organic pest control methods for tomatoes',
      time: '1 day ago',
      replies: 12
    }
  ];

  const helplineNumbers = [
    { type: 'Agricultural Officer', number: '+91-9876543210' },
    { type: 'Veterinary Officer', number: '+91-9876543211' },
    { type: 'Mental Health Support', number: '1800-123-4567' }
  ];

  const postDiscussion = () => {
    if (!newDiscussion.trim()) {
      toast({
        title: "Empty Discussion",
        description: "Please write something before posting",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Discussion Posted",
      description: "Your discussion has been shared with the community",
    });
    
    setNewDiscussion('');
    setIsDiscussionOpen(false);
  };

  const callHelpline = (number) => {
    toast({
      title: "Calling Helpline",
      description: `Connecting to ${number}...`,
    });
    setIsHelplineOpen(false);
  };

  const requestCallback = () => {
    toast({
      title: "Callback Requested",
      description: "You will be contacted within 30 minutes",
    });
    setIsHelplineOpen(false);
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Farmer Community
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center p-3 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-lg">
                <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Recent Discussions</h4>
          {discussions.map((discussion, index) => (
            <div key={index} className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-sm">{discussion.author}:</div>
              <div className="text-sm text-muted-foreground mb-1">{discussion.topic}</div>
              <div className="text-xs text-muted-foreground">
                {discussion.time} • {discussion.replies} replies
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Dialog open={isDiscussionOpen} onOpenChange={setIsDiscussionOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Join Discussion
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Community Discussions</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="max-h-60 overflow-y-auto space-y-3 p-4 bg-muted rounded-lg">
                  {discussions.map((discussion, index) => (
                    <div key={index} className="p-3 bg-background rounded-lg">
                      <div className="font-medium text-sm">{discussion.author}:</div>
                      <div className="text-sm mb-1">{discussion.topic}</div>
                      <div className="text-xs text-muted-foreground">
                        {discussion.time} • {discussion.replies} replies
                      </div>
                    </div>
                  ))}
                </div>
                
                <Textarea
                  placeholder="Start a new discussion or ask a question..."
                  value={newDiscussion}
                  onChange={(e) => setNewDiscussion(e.target.value)}
                />
                
                <Button onClick={postDiscussion} className="w-full">
                  📝 Post Discussion
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isHelplineOpen} onOpenChange={setIsHelplineOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Helpline
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Helpline & Support</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-semibold text-green-800">Emergency Helpline:</div>
                  <div className="text-green-700">1800-180-1551 (Toll Free)</div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Local Support Numbers:</h4>
                  <div className="space-y-2">
                    {helplineNumbers.map((helpline, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm">{helpline.type}:</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => callHelpline(helpline.number)}
                          className="text-primary"
                        >
                          📞 {helpline.number}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={() => callHelpline('1800-180-1551')} className="flex-1">
                    📞 Call Emergency
                  </Button>
                  <Button variant="outline" onClick={requestCallback} className="flex-1">
                    📲 Request Callback
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};