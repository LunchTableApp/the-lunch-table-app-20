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

  return (
    <div className="space-y-4 mb-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEntries}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Foods Tried</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newFoodsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Ratings</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer className="h-[120px]">
              <BarChart data={chartData}>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis domain={[0, 5]} fontSize={12} />
                <Tooltip />
                <Bar dataKey="value" fill="#f97316" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ratings Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[200px]">
              <LineChart data={timelineData}>
                <XAxis dataKey="date" fontSize={12} />
                <YAxis domain={[0, 5]} fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="taste" stroke="#f97316" />
                <Line type="monotone" dataKey="satisfaction" stroke="#22c55e" />
                <Line type="monotone" dataKey="fullness" stroke="#3b82f6" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Popular Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categoryStats.map(({ name, count }) => (
                <CategoryBadge
                  key={name}
                  category={`${name} (${count})`}
                  className="text-xs"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};