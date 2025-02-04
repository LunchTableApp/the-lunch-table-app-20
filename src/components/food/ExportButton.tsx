import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FoodItem } from "@/types/food";

interface ExportButtonProps {
  foods: FoodItem[];
}

export const ExportButton = ({ foods }: ExportButtonProps) => {
  const handleExport = () => {
    const headers = [
      "Name",
      "Taste Rating",
      "Satisfaction Rating",
      "Fullness Rating",
      "Notes",
      "Date",
      "Is New Food",
    ];

    const csvData = foods.map((food) => [
      food.name,
      food.tasteRating,
      food.satisfactionRating,
      food.fullnessRating,
      food.notes || "",
      food.date.toISOString(),
      food.isNewFood ? "Yes" : "No",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "food-entries.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      size="sm"
      className="w-full sm:w-auto"
    >
      <Download className="mr-2 h-4 w-4" />
      Export Data
    </Button>
  );
};