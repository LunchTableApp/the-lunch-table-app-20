
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResultsView } from "./QuizResults";
import { generatePersonalizedPlan } from "./utils";
import { QUIZ_QUESTIONS } from "./constants";
import type { QuizComponentProps } from "./types";

export const QuizComponent = ({ onResultsSaved }: QuizComponentProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(QUIZ_QUESTIONS.length).fill(""));
  const [showResults, setShowResults] = useState(false);
  const [personalizedPlan, setPersonalizedPlan] = useState(null);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const plan = generatePersonalizedPlan(answers);
    setPersonalizedPlan(plan);
    setShowResults(true);
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(""));
    
    localStorage.setItem('quizResults', JSON.stringify(plan));
    onResultsSaved(plan);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleStartOver = () => {
    setShowResults(false);
    setPersonalizedPlan(null);
    setStarted(true);
    localStorage.removeItem('quizResults');
    onResultsSaved(null);
  };

  const handleSaveAndGoHome = () => {
    toast({
      title: "Plan saved successfully!",
      description: "Your personalized plan has been saved.",
    });
    navigate("/");
  };

  if (showResults && personalizedPlan) {
    return (
      <QuizResultsView
        results={personalizedPlan}
        onStartOver={handleStartOver}
        onSaveAndGoHome={handleSaveAndGoHome}
      />
    );
  }

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
    <QuizQuestion
      currentQuestion={currentQuestion}
      answer={answers[currentQuestion]}
      onAnswer={handleAnswer}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onSubmit={handleSubmit}
    />
  );
};
