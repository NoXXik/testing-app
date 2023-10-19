export interface StateSchema {
  questions: Question[];
  user: User | null;
  progress: Progress | null;
  answer_history: AnswerHistory[];
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
  points: number;
  correct: number[];
}

export interface QuestionOption {
  id: number;
  text: string;
}

export interface User {
  name: string;
  points: number;
}

export interface Progress {
  progress: number;
  start_time: number;
  end_time: number | null;
  current_question: number;
}

export interface AnswerHistory {
  question_id: number;
  answer: number[];
}

export interface TestHistory {
  name: string;
  time: string;
  points: number;
}
