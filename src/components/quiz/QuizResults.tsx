
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizResults } from "./types";

interface QuizResultsProps {
  results: QuizResults;
  onStartOver: () => void;
  onSaveAndGoHome: () => void;
}

export const QuizResultsView = ({ results, onStartOver, onSaveAndGoHome }: QuizResultsProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Your Personalized Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-secondary p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Recommended Duration and Frequency</h3>
            <p className="mb-2">Duration: {results.duration}</p>
            <p>Logging Frequency: {results.frequency}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Your Personalized Recommendations</h3>
            <ul className="space-y-3">
              {results.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <Button onClick={onStartOver}>Retake Quiz</Button>
            <Button variant="secondary" onClick={onSaveAndGoHome}>
              Save and Go Home
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
