import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ANSWER_OPTIONS = [
  { value: "veryLikely", label: "Very Likely" },
  { value: "somewhatLikely", label: "Somewhat Likely" },
  { value: "neutral", label: "Neutral" },
  { value: "somewhatUnlikely", label: "Somewhat Unlikely" },
  { value: "notLikely", label: "Not Likely" },
];

const QUIZ_QUESTIONS = [
  "How willing are you to eat and try new foods?",
  "How likely are you to restrict food?",
  "How likely are you to negatively associate food with body image?",
  "How likely are you to only eat certain safety foods?",
  "How likely are you to spend a lot of time working towards a set goal?",
  "How likely are you to reach out to others for support even if it may be uncomfortable?",
  "How many times do you plan to log a food each week?",
  "How long do you plan on spending to recover your food relationships?",
];

export const QuizComponent = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(QUIZ_QUESTIONS.length).fill(""));

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // TODO: Implement quiz submission logic
    console.log("Quiz answers:", answers);
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(""));
  };

  if (!started) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Food Preferences Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-center text-muted-foreground">
              Take this quiz to help us understand your food preferences and adventurousness with trying new foods.
            </p>
            <div className="flex justify-center">
              <Button onClick={() => setStarted(true)}>Start Quiz</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
            value={answers[currentQuestion]}
            onValueChange={handleAnswer}
            className="flex flex-col space-y-3"
          >
            {ANSWER_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            {currentQuestion === QUIZ_QUESTIONS.length - 1 ? (
              <Button onClick={handleSubmit}>Submit</Button>
            ) : (
              <Button 
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
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
