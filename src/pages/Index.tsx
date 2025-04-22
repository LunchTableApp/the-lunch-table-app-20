
import { useState, useEffect } from "react";
import { FoodForm } from "@/components/FoodForm";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { InsightsDialog } from "@/components/food/InsightsDialog";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, authError } = useAuth();
  const [showInsights, setShowInsights] = useState(false);
  const [currentFood, setCurrentFood] = useState({ name: "", insights: "" });
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Check if demo mode is requested
    const params = new URLSearchParams(location.search);
    setIsDemo(params.get('demo') === 'true' || authError);
  }, [location, authError]);

  const generateInsightsMutation = useMutation({
    mutationFn: async (foodName: string) => {
      if (isDemo) {
        // Return mock insights in demo mode
        return `Here are some nutritional insights about ${foodName}:\n\n` +
               `- ${foodName} is a good source of vitamins and minerals\n` + 
               `- It contains essential nutrients that support overall health\n` +
               `- Consider pairing with vegetables for a balanced meal`;
      }

      const { data, error } = await supabase.functions.invoke('generate-food-insights', {
        body: { foodName }
      });

      if (error) throw error;
      return data.insights;
    }
  });

  const createFoodMutation = useMutation({
    mutationFn: async (newFood: {
      name: string;
      tasteRating: number;
      satisfactionRating: number;
      fullnessRating: number;
      notes: string;
      isNewFood: boolean;
    }) => {
      // Generate insights first
      const insights = await generateInsightsMutation.mutateAsync(newFood.name);
      
      if (isDemo) {
        // In demo mode, don't actually save to the database
        return { name: newFood.name, insights };
      }

      if (!user) throw new Error("User must be logged in");

      const { error } = await supabase
        .from('food_entries')
        .insert({
          user_id: user.id,
          name: newFood.name,
          taste_rating: newFood.tasteRating,
          satisfaction_rating: newFood.satisfactionRating,
          fullness_rating: newFood.fullnessRating,
          notes: newFood.notes,
          is_new_food: newFood.isNewFood,
          date: new Date().toISOString(),
          ai_insights: insights,
        });

      if (error) throw error;
      return { name: newFood.name, insights };
    },
    onSuccess: (data) => {
      toast({
        title: "Food saved",
        description: "Your food entry has been saved successfully!",
      });
      setCurrentFood({ name: data.name, insights: data.insights });
      setShowInsights(true);
    },
    onError: (error) => {
      console.error('Save error:', error);
      toast({
        title: "Error",
        description: "Failed to save food entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddFood = (
    name: string,
    tasteRating: number,
    satisfactionRating: number,
    fullnessRating: number,
    notes: string,
    isNewFood: boolean
  ) => {
    createFoodMutation.mutate({
      name,
      tasteRating,
      satisfactionRating,
      fullnessRating,
      notes,
      isNewFood,
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-2xl">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-primary text-center mb-4">
            LunchTable
          </h1>
          {isDemo && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 w-full">
              <p className="text-sm text-yellow-700">
                You are currently in demo mode. Your data won't be saved between sessions.
              </p>
            </div>
          )}
          <div className="flex gap-4 mb-6">
            <Button 
              onClick={() => navigate("/logged-entries")}
              variant="outline"
            >
              View Logged Entries
            </Button>
            <Button
              onClick={() => navigate("/quiz")}
              variant="outline"
            >
              Take the Quiz
            </Button>
            <Button
              onClick={() => navigate("/chat")}
              variant="outline"
            >
              Chat Assistant
            </Button>
          </div>
        </div>
        <FoodForm onSubmit={handleAddFood} />
        <InsightsDialog
          showInsights={showInsights}
          setShowInsights={(show) => {
            setShowInsights(show);
            if (!show) {
              navigate("/logged-entries");
            }
          }}
          foodName={currentFood.name}
          insights={currentFood.insights}
        />
      </div>
    </div>
  );
};

export default Index;
