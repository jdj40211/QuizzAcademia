import React from 'react';

interface NavigationButtonsProps {
  onNext?: () => void;
  onPrev?: () => void;
  nextText?: string;
  prevText?: string;
  nextDisabled?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  onPrev,
  nextText = 'Continuar',
  prevText = 'Atrás',
  nextDisabled = false,
}) => {
  return (
    <div className="flex justify-between mt-8">
      {onPrev && (
        <button onClick={onPrev} className="secondary-button">
          {prevText}
        </button>
      )}
      
      {!onPrev && <div />}
      
      {onNext && (
        <button 
          onClick={onNext} 
          className="primary-button"
          disabled={nextDisabled}
        >
          {nextText}
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;