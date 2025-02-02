import { useState, useEffect } from "react";
import { FoodEntry } from "@/components/FoodEntry";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CabbageTracker } from "@/components/CabbageTracker";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { FoodItem } from "@/types/food";
import type { DbFoodEntry } from "@/types/database";
import { useAuth } from "@/contexts/AuthContext";

const LoggedEntries = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: foods = [], isLoading } = useQuery({
    queryKey: ['foods', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('food_entries')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data as DbFoodEntry[]).map((entry): FoodItem => ({
        id: entry.id,
        name: entry.name,
        tasteRating: entry.taste_rating,
        satisfactionRating: entry.satisfaction_rating,
        fullnessRating: entry.fullness_rating,
        notes: entry.notes,
        date: new Date(entry.date),
        isNewFood: entry.is_new_food
      }));
    },
    enabled: !!user
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('food_entries')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foods'] });
      toast({
        title: "Food deleted",
        description: "Your food entry has been deleted successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete food entry. Please try again.",
        variant: "destructive",
      });
      console.error('Delete error:', error);
    }
  });

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const newFoodsThisMonth = foods.filter(
    food => {
      const foodDate = new Date(food.date);
      return food.isNewFood && 
             foodDate.getMonth() === currentMonth && 
             foodDate.getFullYear() === currentYear;
    }
  ).length;

  const monthlyGoal = parseInt(localStorage.getItem('monthlyFoodGoal') || '5');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="container max-w-2xl">
          <p className="text-center text-gray-500">Loading your food entries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Logged Entries</h1>
          <div className="flex gap-4">
            <Button 
              onClick={() => navigate("/goal-settings")} 
              variant="outline"
              className="border-black text-black hover:bg-black/10"
            >
              Goal Settings
            </Button>
            <Button 
              onClick={() => navigate("/")} 
              variant="outline"
              className="border-black text-black hover:bg-black/10"
            >
              Add New Entry
            </Button>
          </div>
        </div>

        <CabbageTracker 
          newFoodsCount={newFoodsThisMonth}
          monthlyGoal={monthlyGoal}
        />

        <div className="space-y-4">
          {foods.map((food) => (
            <FoodEntry
              key={food.id}
              {...food}
              onDelete={() => deleteMutation.mutate(food.id)}
            />
          ))}
          {foods.length === 0 && (
            <p className="text-center text-orange-600/60 py-8">
              No food entries yet. Start by adding one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoggedEntries;