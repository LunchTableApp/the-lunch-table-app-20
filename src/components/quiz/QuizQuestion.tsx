
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DEFAULT_ANSWER_OPTIONS, TIME_RANGE_OPTIONS, WEEKLY_LOG_OPTIONS, QUIZ_QUESTIONS } from "./constants";

interface QuizQuestionProps {
  currentQuestion: number;
  answer: string;
  onAnswer: (value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const QuizQuestion = ({
  currentQuestion,
  answer,
  onAnswer,
  onPrevious,
  onNext,
  onSubmit,
}: QuizQuestionProps) => {
  const getAnswerOptions = (questionIndex: number) => {
    if (questionIndex === QUIZ_QUESTIONS.length - 1) {
      return TIME_RANGE_OPTIONS;
    } else if (questionIndex === 6) {
      return WEEKLY_LOG_OPTIONS;
    }
    return DEFAULT_ANSWER_OPTIONS;
  };

  return (
    <Card className="w-full transform transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10">
        <CardTitle className="text-2xl text-center">
          Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          <p className="text-xl font-medium text-center mb-8 text-primary/90">
            {QUIZ_QUESTIONS[currentQuestion]}
          </p>
          <RadioGroup
            value={answer}
            onValueChange={onAnswer}
            className="flex flex-col space-y-4"
          >
            {getAnswerOptions(currentQuestion).map((option) => (
              <div 
                key={option.value} 
                className="flex items-center space-x-3 p-4 rounded-lg hover:bg-primary/5 transition-colors duration-200"
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value}
                  className="text-lg cursor-pointer w-full"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex justify-between mt-8 pt-4">
            <Button 
              variant="outline" 
              onClick={onPrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-2 text-lg hover:bg-primary/5"
            >
              Previous
            </Button>
            {currentQuestion === QUIZ_QUESTIONS.length - 1 ? (
              <Button 
                onClick={onSubmit}
                className="px-8 py-2 text-lg bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Get Your Results
              </Button>
            ) : (
              <Button 
                onClick={onNext}
                disabled={!answer}
                className="px-6 py-2 text-lg bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
