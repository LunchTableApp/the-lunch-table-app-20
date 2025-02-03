import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useFoodForm = (onSubmit: (name: string, tasteRating: number, satisfactionRating: number, fullnessRating: number, notes: string, isNewFood: boolean) => void) => {
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
  const { toast } = useToast();

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

    onSubmit(name, tasteRating, satisfactionRating, fullnessRating, notes, isNewFood);
    
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

  return {
    name,
    setName,
    tasteRating,
    setTasteRating,
    satisfactionRating,
    setSatisfactionRating,
    fullnessRating,
    setFullnessRating,
    notes,
    setNotes,
    isNewFood,
    setIsNewFood,
    hoveredTasteRating,
    setHoveredTasteRating,
    hoveredSatisfactionRating,
    setHoveredSatisfactionRating,
    hoveredFullnessRating,
    setHoveredFullnessRating,
    isSubmitting,
    handleSubmit
  };
};