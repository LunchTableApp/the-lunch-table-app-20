
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-lg font-medium text-center mb-6">
            {QUIZ_QUESTIONS[currentQuestion]}
          </p>
          <RadioGroup
            value={answer}
            onValueChange={onAnswer}
            className="flex flex-col space-y-3"
          >
            {getAnswerOptions(currentQuestion).map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={onPrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            {currentQuestion === QUIZ_QUESTIONS.length - 1 ? (
              <Button onClick={onSubmit}>Submit</Button>
            ) : (
              <Button 
                onClick={onNext}
                disabled={!answer}
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
