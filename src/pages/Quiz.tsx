
import { QuizComponent } from "@/components/quiz/QuizComponent";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-primary">Take the Quiz</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="hover:bg-destructive/10"
          >
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
        <QuizComponent />
      </div>
    </div>
  );
};

export default Quiz;
