import { QuizResult } from '../types';

export const submitQuiz = async (email: string, results: QuizResult) => {
  // In a real implementation, this would submit to your API
  // Here we're just simulating a successful submission
  
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      console.log('Quiz submitted with email:', email);
      console.log('Results:', results);
      resolve(true);
    }, 1500);
  });
};