import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuizContextType {
  selectedWords: string[];
  addWord: (word: string) => void;
  removeWord: (word: string) => void;
  toggleWord: (word: string) => void;
  email: string;
  setEmail: (email: string) => void;
  agreedToTerms: boolean;
  setAgreedToTerms: (agreed: boolean) => void;
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

  const value = {
    selectedWords,
    addWord,
    removeWord,
    toggleWord,
    email,
    setEmail,
    agreedToTerms,
    setAgreedToTerms,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};