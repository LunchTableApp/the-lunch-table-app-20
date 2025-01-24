import { useState, useEffect } from "react";
import { FoodForm } from "@/components/FoodForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface FoodItem {
  id: string;
  name: string;
  tasteRating: number;
  satisfactionRating: number;
  notes: string;
  date: Date;
}

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddFood = (name: string, tasteRating: number, satisfactionRating: number, notes: string) => {
    const newFood: FoodItem = {
      id: crypto.randomUUID(),
      name,
      tasteRating,
      satisfactionRating,
      notes,
      date: new Date(),
    };
    
    // Get current foods from localStorage
    const savedFoods = localStorage.getItem('foods');
    const currentFoods = savedFoods ? JSON.parse(savedFoods) : [];
    const updatedFoods = [newFood, ...currentFoods];
    
    // Save to localStorage before navigating
    localStorage.setItem('foods', JSON.stringify(updatedFoods));
    navigate("/food-details", { state: { food: newFood } });
    toast({
      title: "Food saved",
      description: "Your food entry has been saved successfully!",
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