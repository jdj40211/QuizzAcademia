export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  date: string;
  answers?: UserAnswer[];
  totalWordCount: number;
  correctRealWords: number;
  incorrectFakeWords: number;
  realWordsPercentage: number;
}

export interface WordList {
  word: string;
  isReal: boolean;
}
export interface UserAnswer {
  questionId: number;
  answer: string;
  isCorrect: boolean;
}