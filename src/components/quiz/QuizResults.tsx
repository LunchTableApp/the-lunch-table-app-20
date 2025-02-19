
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
    <Card className="w-full overflow-hidden animate-fadeIn">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10">
        <CardTitle className="text-3xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          Your Personalized Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-xl mb-4 text-primary/90">Recommended Duration and Frequency</h3>
            <p className="mb-3 text-lg">Duration: {results.duration}</p>
            <p className="text-lg">Logging Frequency: {results.frequency}</p>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-6 text-primary/90">Your Personalized Recommendations</h3>
            <ul className="space-y-4">
              {results.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start bg-primary/5 p-4 rounded-lg transform transition-all duration-300 hover:scale-[1.02] hover:bg-primary/10">
                  <span className="mr-3 text-primary">•</span>
                  <span className="text-lg">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center gap-6 mt-8 pt-4">
            <Button 
              onClick={onStartOver}
              className="px-6 py-3 text-lg bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Retake Quiz
            </Button>
            <Button 
              variant="outline" 
              onClick={onSaveAndGoHome}
              className="px-6 py-3 text-lg hover:bg-primary/5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              Save and Go Home
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
