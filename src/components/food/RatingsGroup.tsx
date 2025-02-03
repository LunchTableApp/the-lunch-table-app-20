import { RatingSection } from "./RatingSection";

interface RatingsGroupProps {
  tasteRating: number;
  satisfactionRating: number;
  fullnessRating: number;
  hoveredTasteRating: number;
  hoveredSatisfactionRating: number;
  hoveredFullnessRating: number;
  setTasteRating: (rating: number) => void;
  setSatisfactionRating: (rating: number) => void;
  setFullnessRating: (rating: number) => void;
  setHoveredTasteRating: (rating: number) => void;
  setHoveredSatisfactionRating: (rating: number) => void;
  setHoveredFullnessRating: (rating: number) => void;
}

export const RatingsGroup = ({
  tasteRating,
  satisfactionRating,
  fullnessRating,
  hoveredTasteRating,
  hoveredSatisfactionRating,
  hoveredFullnessRating,
  setTasteRating,
  setSatisfactionRating,
  setFullnessRating,
  setHoveredTasteRating,
  setHoveredSatisfactionRating,
  setHoveredFullnessRating,
}: RatingsGroupProps) => {
  return (
    <>
      <RatingSection 
        label="Taste Rating"
        rating={tasteRating}
        hoveredRating={hoveredTasteRating}
        setRating={setTasteRating}
        setHoveredRating={setHoveredTasteRating}
      />

      <RatingSection 
        label="Satisfaction Rating"
        rating={satisfactionRating}
        hoveredRating={hoveredSatisfactionRating}
        setRating={setSatisfactionRating}
        setHoveredRating={setHoveredSatisfactionRating}
      />

      <RatingSection 
        label="Fullness Rating"
        rating={fullnessRating}
        hoveredRating={hoveredFullnessRating}
        setRating={setFullnessRating}
        setHoveredRating={setHoveredFullnessRating}
      />
    </>
  );
};