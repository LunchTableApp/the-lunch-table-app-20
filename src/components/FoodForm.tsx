import { useState } from "react";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RatingSection } from "./food/RatingSection";
import { NotesSection } from "./food/NotesSection";
import { FoodNameInput } from "./food/FoodNameInput";
import { FormHeader } from "./food/FormHeader";
import { supabase } from "@/integrations/supabase/client";
import type { FoodFormProps } from "@/types/food";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export const FoodForm = ({ onSubmit }: FoodFormProps) => {
  const [name, setName] = useState("");
  const [tasteRating, setTasteRating] = useState(0);
  const [satisfactionRating, setSatisfactionRating] = useState(0);
  const [fullnessRating, setFullnessRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [isNewFood, setIsNewFood] = useState(false);
  const [hoveredTasteRating, setHoveredTasteRating] = useState(0);
  const [hoveredSatisfactionRating, setHoveredSatisfactionRating] = useState(0);
  const [hoveredFullnessRating, setHoveredFullnessRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [insights, setInsights] = useState("");
  const { toast } = useToast();

  const getFoodInsights = async (foodName: string) => {
    try {
      console.log('Fetching insights for:', foodName);
      const { data, error } = await supabase.functions.invoke('generate-food-insights', {
        body: { foodName }
      });

      if (error) {
        console.error('Error from edge function:', error);
        throw error;
      }
      
      console.log('Received insights:', data);
      return data.insights;
    } catch (error) {
      console.error('Error fetching food insights:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a food name",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (tasteRating === 0 || satisfactionRating === 0 || fullnessRating === 0) {
      toast({
        title: "Error",
        description: "Please rate taste, satisfaction, and fullness",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Submit the food entry
    onSubmit(name, tasteRating, satisfactionRating, fullnessRating, notes, isNewFood);
    
    // Get and display food insights
    const foodInsights = await getFoodInsights(name);
    if (foodInsights) {
      setInsights(foodInsights);
      setShowInsights(true);
    }

    // Reset form
    setName("");
    setTasteRating(0);
    setSatisfactionRating(0);
    setFullnessRating(0);
    setNotes("");
    setIsNewFood(false);
    setIsSubmitting(false);
    
    toast({
      title: "Success",
      description: "Food entry added successfully!",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
        <FoodNameInput name={name} setName={setName} />
        <FormHeader isNewFood={isNewFood} setIsNewFood={setIsNewFood} />
        
        <RatingSection 
          label="Taste Rating"
          rating={tasteRating}
          hoveredRating={hoveredTasteRating}
          setRating={setTasteRating}
          setHoveredRating={setHoveredTasteRating}
        />

        <RatingSection 
          label="Satisfaction Rating"
          rating={satisfactionRating}
          hoveredRating={hoveredSatisfactionRating}
          setRating={setSatisfactionRating}
          setHoveredRating={setHoveredSatisfactionRating}
        />

        <RatingSection 
          label="Fullness Rating"
          rating={fullnessRating}
          hoveredRating={hoveredFullnessRating}
          setRating={setFullnessRating}
          setHoveredRating={setHoveredFullnessRating}
        />

        <NotesSection notes={notes} setNotes={setNotes} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={20} />
          {isSubmitting ? "Adding..." : "Add Food Entry"}
        </button>
      </form>

      <AlertDialog open={showInsights} onOpenChange={setShowInsights}>
        <AlertDialogContent className="max-w-[500px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-primary">
              Food Benefits: {name}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base whitespace-pre-line">
              {insights}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-primary text-white hover:bg-primary/90">
              Got it!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};