import React, { createContext, useContext, useState, ReactNode } from 'react';
// Importamos QuizResult desde types en lugar de definirla localmente
import { QuizResult } from '../types';

// Define solo las interfaces que no están en types
interface UserAnswer {
  questionId: number;
  answer: string;
  isCorrect: boolean;
}

interface QuizContextType {
  selectedWords: string[];
  addWord: (word: string) => void;
  removeWord: (word: string) => void;
  toggleWord: (word: string) => void;
  email: string;
  setEmail: (email: string) => void;
  agreedToTerms: boolean;
  setAgreedToTerms: (agreed: boolean) => void;
  userAnswers: UserAnswer[];
  addUserAnswer: (answer: UserAnswer) => void;
  clearUserAnswers: () => void;
  calculateResults: () => QuizResult;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizContextProvider');
  }
  return context;
};

interface QuizContextProviderProps {
  children: ReactNode;
}

export const QuizContextProvider: React.FC<QuizContextProviderProps> = ({ children }) => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const addWord = (word: string) => {
    setSelectedWords((prev) => [...prev, word]);
  };

  const removeWord = (word: string) => {
    setSelectedWords((prev) => prev.filter((w) => w !== word));
  };

  const toggleWord = (word: string) => {
    if (selectedWords.includes(word)) {
      removeWord(word);
    } else {
      addWord(word);
    }
  };

  const addUserAnswer = (answer: UserAnswer) => {
    setUserAnswers((prev) => {
      // Si ya existe una respuesta para esta pregunta, la reemplazamos
      const exists = prev.findIndex(a => a.questionId === answer.questionId);
      if (exists >= 0) {
        const newAnswers = [...prev];
        newAnswers[exists] = answer;
        return newAnswers;
      }
      // Si no existe, la añadimos
      return [...prev, answer];
    });
  };

  const clearUserAnswers = () => {
    setUserAnswers([]);
  };

  // Función corregida para incluir todos los campos requeridos
  const calculateResults = (): QuizResult => {
    const totalQuestions = userAnswers.length;
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    
    // Calculamos valores para palabras reales y falsas
    const realWords = userAnswers.filter(answer => answer.answer === 'real');
    const fakeWords = userAnswers.filter(answer => answer.answer === 'fake');
    
    const correctRealWords = realWords.filter(answer => answer.isCorrect).length;
    const incorrectFakeWords = fakeWords.filter(answer => !answer.isCorrect).length;
    
    // Evitar división por cero
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    const realWordsPercentage = realWords.length > 0 ? 
      Math.round((correctRealWords / realWords.length) * 100) : 0;
    
    return {
      score: accuracy,
      totalQuestions,
      correctAnswers,
      accuracy,
      date: new Date().toISOString(),
      answers: userAnswers,
      // Campos adicionales requeridos
      totalWordCount: totalQuestions,
      correctRealWords,
      incorrectFakeWords,
      realWordsPercentage
    };
  };

  const value = {
    selectedWords,
    addWord,
    removeWord,
    toggleWord,
    email,
    setEmail,
    agreedToTerms,
    setAgreedToTerms,
    userAnswers,
    addUserAnswer,
    clearUserAnswers,
    calculateResults
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};