import React from 'react';
import NavigationButtons from '../ui/NavigationButtons';
import WordsGrid from '../ui/WordsGrid';
import { useQuizContext } from '../../context/QuizContext';

interface Step2Props {
  onNext: () => void;
  onPrev: () => void;
}

const words = [
  'Pain', 'Model', 'Tagy', 'Do', 'Twin', 'Inch', 'Congir',
  'Mimecullis', 'Suit', 'Workshop', 'Couple', 'Manufacturing',
  'Back', 'Shout', 'Hagharian', 'Voonable', 'Hastness',
  'Greeking', 'Ministry', 'Bleeded', 'Issue', 'Momentum',
  'Blood', 'Prosecutor', 'Toss', 'Embrace', 'Foot', 'Want',
  'Check', 'Tour', 'Emphasize', 'Shop', 'It', 'Cottler', 'Go',
  'Wandings', 'Start', 'Buy', 'Diversity', 'Hip'
];

// Real words for scoring (simulated)
const realWords = [
  'Pain', 'Model', 'Do', 'Twin', 'Inch', 
  'Suit', 'Workshop', 'Couple', 'Manufacturing',
  'Back', 'Shout', 'Ministry', 'Issue', 'Momentum',
  'Blood', 'Prosecutor', 'Toss', 'Embrace', 'Foot', 'Want',
  'Check', 'Tour', 'Emphasize', 'Shop', 'It', 'Go',
  'Start', 'Buy', 'Diversity', 'Hip'
];

const Step2: React.FC<Step2Props> = ({ onNext, onPrev }) => {
  const { selectedWords, toggleWord } = useQuizContext();

  return (
    <div>
      <h2 className="text-2xl font-sora font-bold text-text-primary mb-2">
        ¡Genial! Probemos con algunas palabras más.
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

export default Step2;