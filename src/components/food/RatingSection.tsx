
import { Carrot } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingSectionProps {
  label: string;
  rating: number;
  hoveredRating: number;
  setRating: (value: number) => void;
  setHoveredRating: (value: number) => void;
}

export const RatingSection = ({
  label,
  rating,
  hoveredRating,
  setRating,
  setHoveredRating,
}: RatingSectionProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((carrot) => (
        <button
          key={carrot}
          type="button"
          onClick={() => setRating(carrot)}
          onMouseEnter={() => setHoveredRating(carrot)}
          onMouseLeave={() => setHoveredRating(0)}
          className="focus:outline-none"
        >
          <Carrot
            size={24}
            className={cn(
              "transition-colors rotate-180",
              carrot <= (hoveredRating || rating)
                ? "fill-[#FF5F3B] text-[#FF5F3B]"
                : "text-gray-300 hover:text-orange-200"
            )}
          />
        </button>
      ))}
    </div>
  </div>
);
