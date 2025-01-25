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

  const RatingDisplay = ({ label, rating }: { label: string; rating: number }) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((carrot) => (
          <Carrot
            key={carrot}
            size={20}
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 animate-fadeIn hover:shadow-lg transition-shadow border-l-4 border-l-orange-400">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-800 hover:text-orange-600 transition-colors">{name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm text-black">
              {date.toLocaleDateString()}
            </p>
            <span className="text-sm bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
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