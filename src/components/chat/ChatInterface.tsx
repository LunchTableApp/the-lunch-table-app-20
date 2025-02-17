
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Add welcome message when the component mounts
    const welcomeMessage: Message = {
      role: "assistant",
      content: "Hello! I'm here to support you on your journey. I can help you navigate the app, discuss any concerns about eating or mental health, or just chat if you need someone to talk to. Please remember that while I'm here to listen and support you, I'm not a replacement for professional help. How can I assist you today?"
    };
    setMessages([welcomeMessage]);
  }, []);

  const generateResponse = (userInput: string): string => {
    // Convert input to lowercase for easier matching
    const input = userInput.toLowerCase();
    
    // Navigation-related responses
    if (input.includes("how do i") || input.includes("where") || input.includes("what can")) {
      if (input.includes("log") || input.includes("food") || input.includes("entry")) {
        return "To log a new food entry, you can click the 'Add New Entry' button on the main page. You'll be able to rate your experience and add notes about how you felt. Remember, there's no 'right' or 'wrong' way to eat - we're here to support your journey.";
      }
      if (input.includes("goal") || input.includes("settings")) {
        return "You can access your goal settings by clicking the 'Goal Settings' button. Take your time setting goals that feel right for you - it's okay to start small and adjust as you go.";
      }
      if (input.includes("see") || input.includes("view") || input.includes("history")) {
        return "You can view your previous entries by clicking 'View Logged Entries'. This can help you notice patterns, but please be gentle with yourself as you review your journey.";
      }
    }

    // Support-related responses
    if (input.includes("anxious") || input.includes("worried") || input.includes("scared")) {
      return "I hear that you're feeling anxious, and that's completely valid. Would you like to talk more about what's worrying you? Remember, it's okay to take things one small step at a time, and there's no shame in reaching out for help.";
    }

    if (input.includes("fail") || input.includes("bad") || input.includes("mess up")) {
      return "Please be kind to yourself - you haven't failed. Every moment is a new opportunity, and recovery isn't a straight line. Would you like to talk about what's troubling you? We can work together to find a supportive way forward.";
    }

    if (input.includes("help") || input.includes("support")) {
      return "I'm here to support you. Would you like to talk about what's on your mind? Remember, there are also professional resources available - would you like information about eating disorder helplines or mental health support services?";
    }

    // Default response for other queries
    return "I'm here to listen and support you. Would you like to tell me more about what's on your mind? We can talk about anything that would help you feel more comfortable and supported.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Generate supportive response
    setTimeout(() => {
      const botMessage: Message = {
        role: "assistant",
        content: generateResponse(input)
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Supportive Chat Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here... I'm here to listen and support you."
              className="min-h-[80px]"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="px-8"
            >
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
