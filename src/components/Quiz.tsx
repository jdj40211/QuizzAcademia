import React, { useState } from 'react';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import ProgressBar from './ui/ProgressBar';
import { QuizContextProvider } from '../context/QuizContext';

const Quiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <QuizContextProvider>
      <div className="quiz-container">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        <div className="mt-2 mb-6">
          <p className="text-text-secondary font-inter">
            Step {currentStep} / {totalSteps}
          </p>
        </div>
        <div className="quiz-card">
          {currentStep === 1 && <Step1 onNext={nextStep} />}
          {currentStep === 2 && <Step2 onNext={nextStep} onPrev={prevStep} />}
          {currentStep === 3 && <Step3 onNext={nextStep} onPrev={prevStep} />}
          {currentStep === 4 && <Step4 onPrev={prevStep} />}
        </div>
      </div>
    </QuizContextProvider>
  );
};

export default Quiz;