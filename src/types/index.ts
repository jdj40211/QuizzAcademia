export interface QuizResult {
  totalWordCount: number;
  correctRealWords: number;
  incorrectFakeWords: number;
  realWordsPercentage: number;
  accuracy: number;
  score: number;
}

export interface WordList {
  word: string;
  isReal: boolean;
}