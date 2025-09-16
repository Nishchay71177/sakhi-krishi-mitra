import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Bot, User, Sprout } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Namaste! I'm Sakhi, your farming assistant. How can I help you with your crops today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "Based on your query, I recommend checking soil moisture levels and considering organic fertilizers for better crop yield.",
      "Weather conditions look favorable for planting. Make sure to maintain proper irrigation schedules.",
      "For pest control, try neem-based solutions first before using chemical pesticides.",
      "Consider crop rotation to maintain soil health. Legumes can help fix nitrogen naturally.",
      "Monitor your crops daily and maintain proper spacing for optimal growth.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
          <CardTitle className="flex items-center space-x-2">
            <Sprout className="w-6 h-6" />
            <span>Chat with Sakhi</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isUser 
                    ? 'bg-secondary text-secondary-foreground' 
                    : 'bg-gradient-to-br from-primary to-primary-glow text-primary-foreground'
                }`}>
                  {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isUser
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border p-4">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about crops, weather, pests..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};