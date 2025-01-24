import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationState {
  food: {
    id: string;
    name: string;
    rating: number;
    date: Date;
  };
}

const FoodDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { food } = (location.state as LocationState) || { food: null };

  if (!food) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container max-w-2xl text-center">
          <p className="text-gray-500 mb-4">No food details available</p>
          <Button onClick={() => navigate("/")}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{food.name}</h1>
          <div className="flex mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={cn(
                  "transition-colors",
                  star <= food.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
          <p className="text-gray-600 mb-6">
            Logged on: {new Date(food.date).toLocaleDateString()}
          </p>
          <Button onClick={() => navigate("/")} className="w-full">
            Back to Food Logger
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;