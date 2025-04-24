import React from 'react';
import NavigationButtons from '../ui/NavigationButtons';
import WordsGrid from '../ui/WordsGrid';
import { useQuizContext } from '../../context/QuizContext';

interface Step1Props {
  onNext: () => void;
}

const words = [
  'Capacity', 'Forewoor', 'Prostration', 'Posh', 'Boiling',
  'Bamp', 'Undillaguished', 'Say', 'Connume', 'Litigious',
  'Dexemiested', 'Loan', 'Fix', 'Chalkboard', 'Access',
  'Advocate', 'Valkyrie', 'Subsidy', 'Crew', 'Philippine',
  'Loss', 'Blosery', 'Expand', 'Distance', 'Egg', 'Syrah',
  'Assessment', 'Dikonawn', 'Kick', 'Joke'
];

// Real words for scoring (simulated)
const realWords = [
  'Capacity', 'Posh', 'Boiling', 'Say', 'Litigious',
  'Loan', 'Fix', 'Chalkboard', 'Access', 'Advocate',
  'Valkyrie', 'Subsidy', 'Crew', 'Philippine', 'Loss',
  'Expand', 'Distance', 'Egg', 'Syrah', 'Assessment',
  'Kick', 'Joke'
];

const Step1: React.FC<Step1Props> = ({ onNext }) => {
  const { selectedWords, toggleWord } = useQuizContext();

  return (
    <div>
      <h2 className="text-2xl font-sora font-bold text-text-primary mb-2">
        Selecciona todas las palabras que conoces
      </h2>
      <p className="text-text-secondary font-inter mb-6">
        Ten cuidado. Hay algunas palabras falsas mezcladas.
      </p>
      
      <WordsGrid 
        words={words} 
        selectedWords={selectedWords} 
        onWordToggle={toggleWord} 
      />
      
      <NavigationButtons onNext={onNext} />
    </div>
  );
};

export default Step1;