import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodItem } from "@/types/food";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, Legend } from "recharts";
import { CategoryBadge } from "./CategoryBadge";

interface FoodStatsProps {
  foods: FoodItem[];
}

export const FoodStats = ({ foods }: FoodStatsProps) => {
  const averageRatings = {
    taste: foods.reduce((acc, food) => acc + food.tasteRating, 0) / foods.length || 0,
    satisfaction: foods.reduce((acc, food) => acc + food.satisfactionRating, 0) / foods.length || 0,
    fullness: foods.reduce((acc, food) => acc + food.fullnessRating, 0) / foods.length || 0,
  };

  const newFoodsCount = foods.filter(food => food.isNewFood).length;
  const totalEntries = foods.length;

  // Get all unique categories
  const allCategories = Array.from(new Set(foods.flatMap(food => food.categories || [])));
  
  // Calculate category statistics
  const categoryStats = allCategories.map(category => ({
    name: category,
    count: foods.filter(food => food.categories?.includes(category)).length,
  })).sort((a, b) => b.count - a.count);

  // Prepare data for ratings over time
  const timelineData = foods
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(food => ({
      date: food.date.toLocaleDateString(),
      taste: food.tasteRating,
      satisfaction: food.satisfactionRating,
      fullness: food.fullnessRating,
    }));

  const chartData = [
    { name: 'Taste', value: averageRatings.taste },
    { name: 'Satisfaction', value: averageRatings.satisfaction },
    { name: 'Fullness', value: averageRatings.fullness },
  ];

  const chartConfig = {
    data: {
      theme: {
        light: "#f97316",
        dark: "#f97316"
      }
    }
  };

  return (
    <div className="space-y-4 mb-6">
    </div>
  );
};