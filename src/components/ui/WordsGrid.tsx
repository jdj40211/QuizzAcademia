import React from 'react';
import WordButton from './WordButton';

interface WordsGridProps {
  words: string[];
  selectedWords: string[];
  onWordToggle: (word: string) => void;
}

const WordsGrid: React.FC<WordsGridProps> = ({ words, selectedWords, onWordToggle }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {words.map((word) => (
        <WordButton
          key={word}
          word={word}
          isSelected={selectedWords.includes(word)}
          onClick={() => onWordToggle(word)}
        />
      ))}
    </div>
  );
};

export default WordsGrid;