
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const QuizComponent = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Food Preferences Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-center text-muted-foreground">
            The quiz content will be added here. You can customize this component later
            with your specific questions and logic.
          </p>
          <div className="flex justify-center">
            <Button>Start Quiz</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
