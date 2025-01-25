import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const GoalSettings = () => {
  const [monthlyGoal, setMonthlyGoal] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const savedGoal = localStorage.getItem('monthlyFoodGoal');
    if (savedGoal) {
      setMonthlyGoal(savedGoal);
    }
  }, []);

  const handleSaveGoal = () => {
    if (!monthlyGoal || isNaN(Number(monthlyGoal)) || Number(monthlyGoal) < 1) {
      toast({
        title: "Invalid goal",
        description: "Please enter a valid number greater than 0",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('monthlyFoodGoal', monthlyGoal);
    toast({
      title: "Goal saved",
      description: "Your monthly food goal has been saved successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-2xl">
        <Card className="animate-fadeIn">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Goal Settings</CardTitle>
              <Button 
                variant="outline"
                onClick={() => navigate("/logged-entries")}
              >
                Back to Entries
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="monthlyGoal" className="text-sm font-medium text-gray-700">
                Monthly New Foods Goal
              </label>
              <div className="flex gap-4">
                <Input
                  id="monthlyGoal"
                  type="number"
                  min="1"
                  value={monthlyGoal}
                  onChange={(e) => setMonthlyGoal(e.target.value)}
                  placeholder="Enter number of new foods"
                  className="max-w-[200px]"
                />
                <Button onClick={handleSaveGoal}>
                  Save Goal
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Set a goal for how many new foods you want to try each month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoalSettings;