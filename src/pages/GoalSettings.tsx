
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GoalForm } from "@/components/goals/GoalForm";

const GoalSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
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
          <CardContent>
            <GoalForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoalSettings;
