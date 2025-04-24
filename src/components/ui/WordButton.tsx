import React from 'react';

interface WordButtonProps {
  word: string;
  isSelected: boolean;
  onClick: () => void;
}

const WordButton: React.FC<WordButtonProps> = ({ word, isSelected, onClick }) => {
  return (
    <button
      className={`word-button ${isSelected ? 'word-button-selected' : ''}`}
      onClick={onClick}
      type="button"
      aria-pressed={isSelected}
    >
      {word}
    </button>
  );
};

export default WordButton;