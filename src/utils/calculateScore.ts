import { realWordsStep1, realWordsStep2, realWordsStep3, fakeWords } from './wordLists';

export const calculateScore = (selectedWords: string[]) => {
  const allRealWords = [...realWordsStep1, ...realWordsStep2, ...realWordsStep3];
  
  // Count correct real words identified
  const correctRealWords = selectedWords.filter(word => allRealWords.includes(word));
  
  // Count fake words incorrectly selected
  const incorrectFakeWords = selectedWords.filter(word => fakeWords.includes(word));
  
  // Calculate percentages
  const realWordsPercentage = (correctRealWords.length / allRealWords.length) * 100;
  
  // Calculate accuracy (real words correct - fake words selected)
  const accuracy = Math.max(0, correctRealWords.length - incorrectFakeWords.length);
  
  // Calculate score (0-100)
  const maxPossibleScore = allRealWords.length;
  const score = Math.round((accuracy / maxPossibleScore) * 100);
  
  return {
    totalWordCount: allRealWords.length,
    correctRealWords: correctRealWords.length,
    incorrectFakeWords: incorrectFakeWords.length,
    realWordsPercentage: Math.round(realWordsPercentage),
    accuracy,
    score: Math.max(0, score),
  };
};