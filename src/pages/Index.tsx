import { useState } from "react";
import { FoodForm } from "@/components/FoodForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const createFoodMutation = useMutation({
    mutationFn: async (newFood: {
      name: string;
      tasteRating: number;
      satisfactionRating: number;
      fullnessRating: number;
      notes: string;
      isNewFood: boolean;
    }) => {
      if (!user) throw new Error("User must be logged in");

      const { error } = await supabase.from('food_entries').insert({
        user_id: user.id,
        name: newFood.name,
        taste_rating: newFood.tasteRating,
        satisfaction_rating: newFood.satisfactionRating,
        fullness_rating: newFood.fullnessRating,
        notes: newFood.notes,
        is_new_food: newFood.isNewFood,
        date: new Date().toISOString(),
      });

      if (error) throw error;
    },
    onSuccess: () => {
      navigate("/logged-entries");
      toast({
        title: "Food saved",
        description: "Your food entry has been saved successfully!",
      });
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-2xl">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
            Food Logger
          </h1>
          <Button 
            onClick={() => navigate("/logged-entries")}
            variant="outline"
            className="mb-6"
          >
            View Logged Entries
          </Button>
        </div>
        <FoodForm onSubmit={handleAddFood} />
      </div>
    </div>
  );
};

export default Index;