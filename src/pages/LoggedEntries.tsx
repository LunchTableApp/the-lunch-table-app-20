import { useState, useEffect } from "react";
import { FoodEntry } from "@/components/FoodEntry";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface FoodItem {
  id: string;
  name: string;
  rating: number;
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Logged Entries</h1>
          <Button onClick={() => navigate("/")} variant="outline">
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
            <p className="text-center text-gray-500 py-8">
              No food entries yet. Start by adding one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoggedEntries;