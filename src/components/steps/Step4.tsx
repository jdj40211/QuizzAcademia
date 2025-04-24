import React, { useState } from 'react';
import NavigationButtons from '../ui/NavigationButtons';
import { useQuizContext } from '../../context/QuizContext';

interface Step4Props {
  onPrev: () => void;
}

const Step4: React.FC<Step4Props> = ({ onPrev }) => {
  const { email, setEmail, agreedToTerms, setAgreedToTerms } = useQuizContext();
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [termsError, setTermsError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    let valid = true;
    
    // Reset errors
    setEmailError('');
    setTermsError('');
    
    // Validate email
    if (!email || !validateEmail(email)) {
      setEmailError('Por favor, introduce un correo electrónico válido');
      valid = false;
    }
    
    // Validate terms
    if (!agreedToTerms) {
      setTermsError('Debes aceptar los términos y condiciones');
      valid = false;
    }
    
    if (valid) {
      // Here you would typically submit the data to your backend
      console.log('Form submitted with email:', email);
      setSubmitted(true);
      
      // In a real app, you would send the data to your backend here
      // For now, we'll just simulate a successful submission
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-sora font-bold text-text-primary mb-4">
          ¡Gracias por completar el quiz!
        </h2>
        <p className="text-text-secondary font-inter mb-8">
          Hemos enviado tus resultados a <span className="font-medium">{email}</span>. 
          Revisa tu bandeja de entrada pronto.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="primary-button mx-auto"
        >
          Volver a empezar
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-sora font-bold text-text-primary mb-2">
        ¡Obtén tus resultados! ¿Cuál es tu dirección de correo electrónico?
      </h2>
      <p className="text-text-secondary font-inter mb-6">
        Te enviaremos una copia de tus resultados a tu bandeja de entrada.
      </p>
      
      <div className="mb-6">
        <input
          type="email"
          placeholder="Dirección de correo electrónico"
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            emailError ? 'border-error' : 'border-gray-300'
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && <p className="text-error mt-1 text-sm">{emailError}</p>}
      </div>
      
      <div className="mb-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            className={`mt-1 mr-3 h-5 w-5 text-primary focus:ring-primary ${
              termsError ? 'border-error' : ''
            }`}
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            required
          />
          <div>
            <span className="font-inter text-text-secondary">
              Acepto recibir correos electrónicos promocionales y actualizaciones.
            </span>
            <p className="text-sm text-text-secondary mt-2">
              Te enviaremos los resultados de tu prueba de vocabulario por correo 
              electrónico y ocasionalmente podremos enviarte actualizaciones y materiales 
              promocionales. Puedes cancelar la suscripción en cualquier momento. Lee 
              nuestra<a href="#" className="text-primary ml-1">Política de privacidad</a>
            </p>
            {termsError && <p className="text-error mt-1 text-sm">{termsError}</p>}
          </div>
        </label>
      </div>
      
      <NavigationButtons 
        onNext={handleSubmit} 
        onPrev={onPrev} 
        nextText="Continuar" 
      />
    </div>
  );
};

export default Step4;