import { useState, useEffect } from "react";
import { FoodEntry } from "@/components/FoodEntry";
import { FoodForm } from "@/components/FoodForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface FoodItem {
  id: string;
  name: string;
  rating: number;
  notes: string;
  date: Date;
}

const Index = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load foods from localStorage on initial render
  useEffect(() => {
    const savedFoods = localStorage.getItem('foods');
    if (savedFoods) {
      setFoods(JSON.parse(savedFoods).map((food: any) => ({
        ...food,
        date: new Date(food.date)
      })));
    }
  }, []);

  const handleAddFood = (name: string, rating: number, notes: string) => {
    const newFood: FoodItem = {
      id: crypto.randomUUID(),
      name,
      rating,
      notes,
      date: new Date(),
    };
    const updatedFoods = [newFood, ...foods];
    setFoods(updatedFoods);
    // Save to localStorage before navigating
    localStorage.setItem('foods', JSON.stringify(updatedFoods));
    navigate("/food-details", { state: { food: newFood } });
    toast({
      title: "Food saved",
      description: "Your food entry has been saved successfully!",
    });
  };

  const handleDeleteFood = (id: string) => {
    const updatedFoods = foods.filter((food) => food.id !== id);
    setFoods(updatedFoods);
    // Update localStorage when deleting
    localStorage.setItem('foods', JSON.stringify(updatedFoods));
    toast({
      title: "Food deleted",
      description: "Your food entry has been deleted successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-2xl">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/eaten-carrot-logo.svg" 
            alt="Eaten carrot logo" 
            className="w-20 h-20 mb-4 animate-fadeIn"
          />
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Food Logger
          </h1>
        </div>
        <FoodForm onSubmit={handleAddFood} />
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
              No food entries yet. Start by adding one above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;