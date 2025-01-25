import { useState } from "react";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RatingSection } from "./food/RatingSection";
import { NotesSection } from "./food/NotesSection";
import { FoodNameInput } from "./food/FoodNameInput";

interface FoodFormProps {
  onSubmit: (name: string, tasteRating: number, satisfactionRating: number, fullnessRating: number, notes: string) => void;
}

export const FoodForm = ({ onSubmit }: FoodFormProps) => {
  const [name, setName] = useState("");
  const [tasteRating, setTasteRating] = useState(0);
  const [satisfactionRating, setSatisfactionRating] = useState(0);
  const [fullnessRating, setFullnessRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [hoveredTasteRating, setHoveredTasteRating] = useState(0);
  const [hoveredSatisfactionRating, setHoveredSatisfactionRating] = useState(0);
  const [hoveredFullnessRating, setHoveredFullnessRating] = useState(0);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a food name",
        variant: "destructive",
      });
      return;
    }
    if (tasteRating === 0 || satisfactionRating === 0 || fullnessRating === 0) {
      toast({
        title: "Error",
        description: "Please rate taste, satisfaction, and fullness",
        variant: "destructive",
      });
      return;
    }
    onSubmit(name, tasteRating, satisfactionRating, fullnessRating, notes);
    setName("");
    setTasteRating(0);
    setSatisfactionRating(0);
    setFullnessRating(0);
    setNotes("");
    toast({
      title: "Success",
      description: "Food entry added successfully!",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <FoodNameInput name={name} setName={setName} />
      
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
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Add Food Entry
      </button>
    </form>
  );
};