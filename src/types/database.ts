export interface DbFoodEntry {
  id: string;
  user_id: string;
  name: string;
  taste_rating: number;
  satisfaction_rating: number;
  fullness_rating: number;
  notes: string;
  date: string;
  is_new_food: boolean;
  created_at: string;
}