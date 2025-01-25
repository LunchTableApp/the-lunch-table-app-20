import { Carrot, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

interface FoodEntryProps {
  id: string;
  name: string;
  tasteRating: number;
  satisfactionRating: number;
  fullnessRating: number;
  date: Date;
  notes: string;
  onDelete: (id: string) => void;
}

export const FoodEntry = ({ 
  id, 
  name, 
  tasteRating, 
  satisfactionRating,
  fullnessRating, 
  date, 
  notes, 
  onDelete 
}: FoodEntryProps) => {
  const averageRating = ((tasteRating + satisfactionRating + fullnessRating) / 3).toFixed(1);
  
  const getAverageColor = (rating: number) => {
    if (rating <= 2) return "text-red-500 bg-red-50";
    if (rating <= 3.5) return "text-yellow-500 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const RatingDisplay = ({ label, rating }: { label: string; rating: number }) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((carrot) => (
          <div key={carrot} className="relative">
            <Carrot
              size={20}
              className={cn(
                "transition-colors rotate-180 stroke-[1.5px] stroke-black",
                carrot <= rating
                  ? "fill-orange-400 text-orange-400"
                  : "text-gray-300"
              )}
            />
            {carrot <= rating && (
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-2 h-3 bg-green-400 rounded-full rotate-45" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 animate-fadeIn hover:shadow-lg transition-shadow border-l-4 border-l-orange-400">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-800 hover:text-orange-600 transition-colors">{name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm text-black">
              {date.toLocaleDateString()}
            </p>
            <span className={cn("text-sm px-2 py-0.5 rounded-full", getAverageColor(parseFloat(averageRating)))}>
              Avg: {averageRating}★
            </span>
          </div>
          {notes && (
            <p className="mt-2 text-gray-600 text-sm">
              {notes}
            </p>
          )}
        </div>
        <button
          onClick={() => onDelete(id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete entry"
        >
          <Trash size={18} />
        </button>
      </div>
      <div className="flex gap-6 mt-2">
        <RatingDisplay label="Taste" rating={tasteRating} />
        <RatingDisplay label="Satisfaction" rating={satisfactionRating} />
        <RatingDisplay label="Fullness" rating={fullnessRating} />
      </div>
    </div>
  );
};