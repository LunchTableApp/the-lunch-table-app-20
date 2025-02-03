import { useFoodForm } from "@/hooks/useFoodForm";
import { RatingsGroup } from "./food/RatingsGroup";
import { NotesSection } from "./food/NotesSection";
import { FoodNameInput } from "./food/FoodNameInput";
import { FormHeader } from "./food/FormHeader";
import { SubmitButton } from "./food/SubmitButton";
import type { FoodFormProps } from "@/types/food";

export const FoodForm = ({ onSubmit }: FoodFormProps) => {
  const {
    name,
    setName,
    tasteRating,
    setTasteRating,
    satisfactionRating,
    setSatisfactionRating,
    fullnessRating,
    setFullnessRating,
    notes,
    setNotes,
    isNewFood,
    setIsNewFood,
    hoveredTasteRating,
    setHoveredTasteRating,
    hoveredSatisfactionRating,
    setHoveredSatisfactionRating,
    hoveredFullnessRating,
    setHoveredFullnessRating,
    isSubmitting,
    handleSubmit
  } = useFoodForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <FoodNameInput name={name} setName={setName} />
      <FormHeader isNewFood={isNewFood} setIsNewFood={setIsNewFood} />
      
      <RatingsGroup 
        tasteRating={tasteRating}
        satisfactionRating={satisfactionRating}
        fullnessRating={fullnessRating}
        hoveredTasteRating={hoveredTasteRating}
        hoveredSatisfactionRating={hoveredSatisfactionRating}
        hoveredFullnessRating={hoveredFullnessRating}
        setTasteRating={setTasteRating}
        setSatisfactionRating={setSatisfactionRating}
        setFullnessRating={setFullnessRating}
        setHoveredTasteRating={setHoveredTasteRating}
        setHoveredSatisfactionRating={setHoveredSatisfactionRating}
        setHoveredFullnessRating={setHoveredFullnessRating}
      />

      <NotesSection notes={notes} setNotes={setNotes} />
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
};