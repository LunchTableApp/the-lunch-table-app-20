import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carrot } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationState {
  food: {
    id: string;
    name: string;
    tasteRating: number;
    satisfactionRating: number;
    fullnessRating: number;
    notes: string;
    date: Date;
  };
}

const FoodDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { food } = (location.state as LocationState) || { food: null };

  const RatingDisplay = ({ label, rating }: { label: string; rating: number }) => (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">{label}</h2>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((carrot) => (
          <Carrot
            key={carrot}
            size={24}
            className={cn(
              "transition-colors rotate-180",
              carrot <= rating
                ? "fill-orange-400 text-orange-400"
                : "text-gray-300"
            )}
          />
        ))}
      </div>
    </div>
  );

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
          
          <RatingDisplay label="Taste Rating" rating={food.tasteRating} />
          <RatingDisplay label="Satisfaction Rating" rating={food.satisfactionRating} />
          <RatingDisplay label="Fullness Rating" rating={food.fullnessRating} />
          
          {food.notes && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Notes</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{food.notes}</p>
            </div>
          )}
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