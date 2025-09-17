import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Bot, User, Sprout, Mic, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


export const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: "Namaste! I'm Sakhi, your AI farming assistant. How can I help you with your crops today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userInput) => {
    const message = userInput.toLowerCase();
    
    if (message.includes('weather')) {
      return 'Based on current weather data, I recommend avoiding outdoor activities during expected rainfall. Consider indoor farm maintenance tasks.';
    }
    if (message.includes('irrigation') || message.includes('water')) {
      return 'For your crops, I suggest early morning irrigation around 6-7 AM when evaporation is minimal. Check soil moisture levels first.';
    }
    if (message.includes('fertilizer') || message.includes('nutrient')) {
      return 'NPK 10:26:26 is suitable for your rice crop at this stage. Apply 50kg per hectare and ensure proper soil moisture.';
    }
    if (message.includes('pest') || message.includes('insect')) {
      return 'I detected possible pest activity. Consider organic neem oil spray in the evening hours for effective control.';
    }
    if (message.includes('market') || message.includes('price')) {
      return 'Current market prices show tomatoes trending upward. Consider harvesting your ready crop for better profits.';
    }
    if (message.includes('crop') && message.includes('health')) {
      return 'Upload a crop image and I can analyze the health status. Meanwhile, ensure proper nutrition and pest monitoring.';
    }
    
    const responses = [
      "I understand your concern. Let me help you with personalized advice based on your farm data and current conditions.",
      "Based on your query, I recommend checking soil moisture levels and considering organic fertilizers for better crop yield.",
      "Weather conditions look favorable for planting. Make sure to maintain proper irrigation schedules.",
      "For pest control, try neem-based solutions first before using chemical pesticides.",
      "Consider crop rotation to maintain soil health. Legumes can help fix nitrogen naturally.",
      "Monitor your crops daily and maintain proper spacing for optimal growth.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        toast({
          title: "Listening",
          description: "Speak now...",
        });
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
        toast({
          title: "Voice Captured",
          description: "Voice input captured successfully",
        });
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Error",
          description: "Voice recognition failed. Please try again.",
          variant: "destructive"
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast({
        title: "Not Supported",
        description: "Voice recognition not supported in this browser",
        variant: "destructive"
      });
    }
  };

  const speakLastMessage = () => {
    const aiMessages = messages.filter(msg => !msg.isUser);
    if (aiMessages.length === 0) return;
    
    const lastMessage = aiMessages[aiMessages.length - 1].content;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(lastMessage);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
      
      toast({
        title: "Speaking",
        description: "Reading message aloud...",
      });
    } else {
      toast({
        title: "Not Supported",
        description: "Speech synthesis not supported in this browser",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
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
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t border-border p-4 space-y-3">
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
            
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={startVoiceRecognition}
                disabled={isListening}
                className="flex items-center gap-2"
              >
                <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse text-red-500' : ''}`} />
                {isListening ? 'Listening...' : 'Voice Input'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={speakLastMessage}
                className="flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                Read Aloud
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};