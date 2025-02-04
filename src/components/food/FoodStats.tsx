import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodItem } from "@/types/food";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

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

  const chartData = [
    { name: 'Taste', value: averageRatings.taste },
    { name: 'Satisfaction', value: averageRatings.satisfaction },
    { name: 'Fullness', value: averageRatings.fullness },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
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
          <ChartContainer className="h-[120px]" config={{}}>
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
  );
};