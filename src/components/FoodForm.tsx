import { useState } from "react";
import { Carrot, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

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

  const RatingSection = ({ 
    label, 
    rating, 
    hoveredRating, 
    setRating, 
    setHoveredRating 
  }: { 
    label: string;
    rating: number;
    hoveredRating: number;
    setRating: (value: number) => void;
    setHoveredRating: (value: number) => void;
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((carrot) => (
          <button
            key={carrot}
            type="button"
            onClick={() => setRating(carrot)}
            onMouseEnter={() => setHoveredRating(carrot)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none"
          >
            <Carrot
              size={24}
              className={cn(
                "transition-colors rotate-180",
                carrot <= (hoveredRating || rating)
                  ? "fill-orange-400 text-orange-400"
                  : "text-gray-300 hover:text-orange-200"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="mb-4">
        <label htmlFor="food-name" className="block text-sm font-medium text-gray-700 mb-1">
          Food Name
        </label>
        <input
          id="food-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter food name..."
        />
      </div>
      
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

      <div className="mb-4">
        <label htmlFor="food-notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <Textarea
          id="food-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your thoughts about this food..."
          className="min-h-[100px]"
        />
      </div>
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