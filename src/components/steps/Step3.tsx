import React from 'react';
import NavigationButtons from '../ui/NavigationButtons';
import WordsGrid from '../ui/WordsGrid';
import { useQuizContext } from '../../context/QuizContext';

interface Step3Props {
  onNext: () => void;
  onPrev: () => void;
}

const words = [
  'Developer', 'Costler', 'Gear', 'Say', 'Honor', 'Century',
  'Bariched', 'Assess', 'Teaspoon', 'Shift', 'Response', 'Joke',
  'Aspeantment', 'Black', 'Asset', 'Cash', 'Eye', 'Courn',
  'Expand', 'Pregnancy', 'Trust', 'Free', 'Long', 'Avoid',
  'Mistlerement', 'Wisdom', 'Could', 'Follow', 'Fix', 'Hit',
  'Pezing', 'Netlern', 'Sandwich', 'Taxpayer', 'Look', 'Egg',
  'Accessible', 'Circibstaction', 'Screeping', 'Retailer'
];

// Real words for scoring (simulated)
const realWords = [
  'Developer', 'Gear', 'Say', 'Honor', 'Century',
  'Assess', 'Teaspoon', 'Shift', 'Response', 'Joke',
  'Black', 'Asset', 'Cash', 'Eye', 
  'Expand', 'Pregnancy', 'Trust', 'Free', 'Long', 'Avoid',
  'Wisdom', 'Could', 'Follow', 'Fix', 'Hit',
  'Sandwich', 'Taxpayer', 'Look', 'Egg',
  'Accessible', 'Retailer'
];

const Step3: React.FC<Step3Props> = ({ onNext, onPrev }) => {
  const { selectedWords, toggleWord } = useQuizContext();

  return (
    <div>
      <h2 className="text-2xl font-sora font-bold text-text-primary mb-2">
        ¡Casi terminamos! Selecciona todas las palabras que conoces.
      </h2>
      <p className="text-text-secondary font-inter mb-6">
        Si no estás seguro del significado exacto, déjalo en blanco.
      </p>
      
      <WordsGrid 
        words={words} 
        selectedWords={selectedWords} 
        onWordToggle={toggleWord} 
      />
      
      <NavigationButtons onNext={onNext} onPrev={onPrev} />
    </div>
  );
};

export default Step3;