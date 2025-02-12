
export interface FoodItem {
  id: string;
  name: string;
  tasteRating: number;
  satisfactionRating: number;
  fullnessRating: number;
  notes: string;
  date: Date;
  isNewFood?: boolean;
  categories?: string[];
  aiInsights?: string;
}

export interface FoodFormProps {
  onSubmit: (name: string, tasteRating: number, satisfactionRating: number, fullnessRating: number, notes: string, isNewFood: boolean) => void;
}
