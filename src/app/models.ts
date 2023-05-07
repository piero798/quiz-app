export interface RawCategory {
  trivia_categories: Category[];
}

export interface RawQuestions {
  response_code: number;
  results: RawQuestion[];
}

export interface RawQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Question {
  answers: string[];
  correctAnswer: number;
  question: string;
  selectedAnswer?: number;
}
