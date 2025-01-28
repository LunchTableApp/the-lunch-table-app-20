export interface FoodItem {
  id: string;
  name: string;
  tasteRating: number;
  satisfactionRating: number;
  fullnessRating: number;
  notes: string;
  date: Date;
  isNewFood?: boolean;
}

export interface FoodFormProps {
  onSubmit: (name: string, tasteRating: number, satisfactionRating: number, fullnessRating: number, notes: string, isNewFood: boolean) => void;
}