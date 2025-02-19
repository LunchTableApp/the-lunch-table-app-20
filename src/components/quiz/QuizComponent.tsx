import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_ANSWER_OPTIONS = [
  { value: "veryLikely", label: "Very Likely" },
  { value: "somewhatLikely", label: "Somewhat Likely" },
  { value: "neutral", label: "Neutral" },
  { value: "somewhatUnlikely", label: "Somewhat Unlikely" },
  { value: "notLikely", label: "Not Likely" },
];

const TIME_RANGE_OPTIONS = [
  { value: "2months", label: "2 months" },
  { value: "6months", label: "6 months" },
  { value: "12months", label: "12 months" },
  { value: "18months", label: "18 months" },
  { value: "24months", label: "24 months" },
];

const WEEKLY_LOG_OPTIONS = [
  { value: "2times", label: "2 times per week" },
  { value: "7times", label: "7 times per week" },
  { value: "14times", label: "14 times per week" },
  { value: "21times", label: "21 times per week" },
  { value: "24times", label: "24 times per week" },
];

const QUIZ_QUESTIONS = [
  "How likely are you to eat and try new foods?",
  "How likely are you to restrict food?",
  "How likely are you to negatively associate food with body image?",
  "How likely are you to only eat certain safety foods?",
  "How likely are you to spend a lot of time working towards a set goal?",
  "How likely are you to reach out to others for support even if it may be uncomfortable?",
  "How many times do you plan to log a food each week?",
  "How long do you plan on spending to recover your food relationships?"
];

interface QuizComponentProps {
  onResultsSaved: (results: {
    duration: string;
    frequency: string;
    recommendations: string[];
  }) => void;
}

export const QuizComponent = ({ onResultsSaved }: QuizComponentProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(QUIZ_QUESTIONS.length).fill(""));
  const [showResults, setShowResults] = useState(false);
  const [personalizedPlan, setPersonalizedPlan] = useState<{
    duration: string;
    frequency: string;
    recommendations: string[];
  } | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const getAnswerOptions = (questionIndex: number) => {
    if (questionIndex === QUIZ_QUESTIONS.length - 1) {
      return TIME_RANGE_OPTIONS;
    } else if (questionIndex === 6) { // Question 7 (index 6)
      return WEEKLY_LOG_OPTIONS;
    }
    return DEFAULT_ANSWER_OPTIONS;
  };

  const generatePersonalizedPlan = () => {
    const loggingFrequency = answers[6].replace('times', '');
    const duration = answers[7].replace('months', '');
    
    const recommendations: string[] = [];
    
    // Food adventurousness (Q1)
    if (answers[0] === 'veryLikely' || answers[0] === 'somewhatLikely') {
      recommendations.push("Your openness to trying new foods is a great strength! We'll help you explore diverse, nutritious options.");
    } else {
      recommendations.push("We'll start slowly with familiar foods and gradually introduce new options at your comfort level.");
    }

    // Food restriction (Q2)
    if (answers[1] === 'veryLikely' || answers[1] === 'somewhatLikely') {
      recommendations.push("We'll work on developing a more flexible relationship with food, focusing on nourishment rather than restriction.");
    }

    // Body image (Q3)
    if (answers[2] === 'veryLikely' || answers[2] === 'somewhatLikely') {
      recommendations.push("We'll focus on building a positive relationship between food and body image, emphasizing health and well-being.");
    }

    // Safety foods (Q4)
    if (answers[3] === 'veryLikely' || answers[3] === 'somewhatLikely') {
      recommendations.push("We'll start with your comfort foods and gradually expand your food variety in a safe, supportive way.");
    }

    // Goal orientation (Q5)
    if (answers[4] === 'veryLikely' || answers[4] === 'somewhatLikely') {
      recommendations.push("Your dedication to goals will be a valuable asset in your journey to better food relationships.");
    }

    // Support seeking (Q6)
    if (answers[5] === 'notLikely' || answers[5] === 'somewhatUnlikely') {
      recommendations.push("We'll help you build confidence in reaching out for support when needed.");
    }

    return {
      duration: `${duration} months`,
      frequency: `${loggingFrequency} times per week`,
      recommendations,
    };
  };

  const handleSubmit = () => {
    const plan = generatePersonalizedPlan();
    setPersonalizedPlan(plan);
    setShowResults(true);
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(""));
    
    // Save results to localStorage
    localStorage.setItem('quizResults', JSON.stringify(plan));
    // Update parent component
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
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Your Personalized Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-secondary p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Recommended Duration and Frequency</h3>
              <p className="mb-2">Duration: {personalizedPlan.duration}</p>
              <p>Logging Frequency: {personalizedPlan.frequency}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Your Personalized Recommendations</h3>
              <ul className="space-y-3">
                {personalizedPlan.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button onClick={handleStartOver}>Retake Quiz</Button>
              <Button variant="secondary" onClick={handleSaveAndGoHome}>
                Save and Go Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
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
