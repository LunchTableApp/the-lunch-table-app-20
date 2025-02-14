
import { QuizComponent } from "@/components/quiz/QuizComponent";

const Quiz = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-2xl">
        <h1 className="text-4xl font-bold text-primary text-center mb-8">
          Take the Quiz
        </h1>
        <QuizComponent />
      </div>
    </div>
  );
};

export default Quiz;
