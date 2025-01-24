import { Star, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

interface FoodEntryProps {
  id: string;
  name: string;
  rating: number;
  date: Date;
  onDelete: (id: string) => void;
}

export const FoodEntry = ({ id, name, rating, date, onDelete }: FoodEntryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 animate-fadeIn hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">
            {date.toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => onDelete(id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete entry"
        >
          <Trash size={18} />
        </button>
      </div>
      <div className="flex mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={cn(
              "transition-colors",
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            )}
          />
        ))}
      </div>
    </div>
  );
};