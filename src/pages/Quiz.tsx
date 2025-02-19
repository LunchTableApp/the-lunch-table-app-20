
import { QuizComponent } from "@/components/quiz/QuizComponent";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizResults {
  duration: string;
  frequency: string;
  recommendations: string[];
}

const Quiz = () => {
  const navigate = useNavigate();
  const [savedResults, setSavedResults] = useState<QuizResults | null>(null);

  useEffect(() => {
    // Load saved results when component mounts
    const storedResults = localStorage.getItem('quizResults');
    if (storedResults) {
      setSavedResults(JSON.parse(storedResults));
    }
  }, []);

  const handleNewQuiz = () => {
    setSavedResults(null);
    localStorage.removeItem('quizResults');
  };

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

        {savedResults && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Your Previous Quiz Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Recommended Duration and Frequency</h3>
                  <p className="mb-2">Duration: {savedResults.duration}</p>
                  <p>Logging Frequency: {savedResults.frequency}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-4">Your Personalized Recommendations</h3>
                  <ul className="space-y-3">
                    {savedResults.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button onClick={handleNewQuiz} variant="outline" className="w-full">
                  Take New Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!savedResults && <QuizComponent onResultsSaved={setSavedResults} />}
      </div>
    </div>
  );
};

export default Quiz;
