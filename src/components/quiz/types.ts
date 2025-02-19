
export interface QuizResults {
  duration: string;
  frequency: string;
  recommendations: string[];
}

export interface QuizComponentProps {
  onResultsSaved: (results: QuizResults) => void;
}
