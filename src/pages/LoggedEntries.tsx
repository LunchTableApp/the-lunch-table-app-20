import { useState, useEffect } from "react";
import { FoodEntry } from "@/components/FoodEntry";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface FoodItem {
  id: string;
  name: string;
  tasteRating: number;
  satisfactionRating: number;
  fullnessRating: number;
  notes: string;
  date: Date;
}

const LoggedEntries = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const savedFoods = localStorage.getItem('foods');
    if (savedFoods) {
      setFoods(JSON.parse(savedFoods).map((food: any) => ({
        ...food,
        date: new Date(food.date)
      })));
    }
  }, []);

  const handleDeleteFood = (id: string) => {
    const updatedFoods = foods.filter((food) => food.id !== id);
    setFoods(updatedFoods);
    localStorage.setItem('foods', JSON.stringify(updatedFoods));
    toast({
      title: "Food deleted",
      description: "Your food entry has been deleted successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <div className="container max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Logged Entries</h1>
          <Button 
            onClick={() => navigate("/")} 
            variant="outline"
            className="border-orange-400 text-orange-600 hover:bg-orange-50"
          >
            Add New Entry
          </Button>
        </div>
        <div className="space-y-4">
          {foods.map((food) => (
            <FoodEntry
              key={food.id}
              {...food}
              onDelete={handleDeleteFood}
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