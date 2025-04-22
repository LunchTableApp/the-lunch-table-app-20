
import { Carrot, Trash, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryBadge } from "./food/CategoryBadge";
import { Checkbox } from "./ui/checkbox";

interface FoodEntryProps {
  id: string;
  name: string;
  tasteRating: number;
  satisfactionRating: number;
  fullnessRating: number;
  date: Date;
  notes: string;
  categories?: string[];
  onDelete: (id: string) => void;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export const FoodEntry = ({ 
  id, 
  name, 
  tasteRating, 
  satisfactionRating,
  fullnessRating, 
  date, 
  notes,
  categories = [],
  onDelete,
  selected,
  onSelect
}: FoodEntryProps) => {
  const averageRating = ((tasteRating + satisfactionRating + fullnessRating) / 3).toFixed(1);
  
  const getAverageColor = (rating: number) => {
    if (rating <= 2) return "text-red-500 bg-red-50";
    if (rating <= 3.5) return "text-yellow-500 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const RatingDisplay = ({ label, rating }: { label: string; rating: number }) => (
    <div className="flex flex-col gap-1">
      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((carrot) => (
          <div key={carrot} className="relative">
            <Carrot
              size={16}
              className={cn(
                "transition-colors rotate-180",
                carrot <= rating
                  ? "fill-orange-400 text-orange-400"
                  : "text-gray-300 dark:text-gray-600"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={cn(
      "bg-white dark:bg-black rounded-lg shadow-md p-3 sm:p-4 mb-4 animate-fadeIn hover:shadow-lg transition-shadow border-l-4 border-l-green-400",
      selected && "ring-2 ring-primary"
    )}>
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-start gap-3">
          {onSelect && (
            <Checkbox
              checked={selected}
              onCheckedChange={() => onSelect(id)}
              className="mt-1"
            />
          )}
          <div>
            <h3 className="font-semibold text-base sm:text-lg text-gray-800 dark:text-gray-100 hover:text-green-600 transition-colors">
              {name}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs sm:text-sm text-black dark:text-gray-300">
                {date.toLocaleDateString()}
              </p>
              <span className={cn("text-xs sm:text-sm px-2 py-0.5 rounded-full dark:bg-opacity-20", getAverageColor(parseFloat(averageRating)))}>
                Avg: {averageRating}★
              </span>
            </div>
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {categories.map((category) => (
                  <CategoryBadge key={category} category={category} />
                ))}
              </div>
            )}
            {notes && (
              <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {notes}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(id)}
          className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
          aria-label="Delete entry"
        >
          <Trash size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
      </div>
      <div className="flex flex-wrap gap-4 sm:gap-6 mt-2">
        <RatingDisplay label="Taste" rating={tasteRating} />
        <RatingDisplay label="Satisfaction" rating={satisfactionRating} />
        <RatingDisplay label="Fullness" rating={fullnessRating} />
      </div>
    </div>
  );
};
