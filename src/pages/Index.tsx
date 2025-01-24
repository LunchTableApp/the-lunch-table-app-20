import { useState } from "react";
import { FoodEntry } from "@/components/FoodEntry";
import { FoodForm } from "@/components/FoodForm";

interface FoodItem {
  id: string;
  name: string;
  rating: number;
  date: Date;
}

const Index = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);

  const handleAddFood = (name: string, rating: number) => {
    const newFood: FoodItem = {
      id: crypto.randomUUID(),
      name,
      rating,
      date: new Date(),
    };
    setFoods((prev) => [newFood, ...prev]);
  };

  const handleDeleteFood = (id: string) => {
    setFoods((prev) => prev.filter((food) => food.id !== id));
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