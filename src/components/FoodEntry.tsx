import { Star, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

interface FoodEntryProps {
  id: string;
  name: string;
  rating: number;
  date: Date;
  notes: string;
  onDelete: (id: string) => void;
}

export const FoodEntry = ({ id, name, rating, date, notes, onDelete }: FoodEntryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 animate-fadeIn hover:shadow-lg transition-shadow border-l-4 border-l-orange-400">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-800 hover:text-orange-600 transition-colors">{name}</h3>
          <p className="text-sm text-orange-500">
            {date.toLocaleDateString()}
          </p>
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
      <div className="flex mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={cn(
              "transition-colors",
              star <= rating
                ? "fill-orange-400 text-orange-400"
                : "text-gray-300"
            )}
          />
        ))}
      </div>
    </div>
  );
};