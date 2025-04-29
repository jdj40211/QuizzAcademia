// src/api/index.ts
import { createClient } from '@supabase/supabase-js';
import { QuizResult } from '../types';

// Verifica que las variables de entorno estén disponibles y muestra mensajes de depuración
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL disponible:', !!supabaseUrl);
console.log('Supabase Key disponible:', !!supabaseKey);

// Solo crea el cliente si ambas variables están definidas
if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Faltan variables de entorno de Supabase. Verifica tu archivo .env');
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para enviar los datos del quiz a Supabase
export const submitQuiz = async (email: string, results: QuizResult) => {
  console.log('Enviando datos a Supabase:', { email, results });
  
  try {
    // Crear el objeto a insertar con tu estructura actual
    const quizSubmission = {
      email,
      results,
      submitted_at: new Date().toISOString(),
      quiz_id: 'word-quiz', // Valor constante en lugar de obtenerlo de results
      score: results.score, // Usamos el score que ya existe en tu interfaz
      passed: results.accuracy >= 70 // Determinamos passed basado en la precisión
    };
    
    console.log('Datos a insertar:', quizSubmission);
    
    // Insertar en Supabase
    const { data, error } = await supabase
      .from('quiz_submissions')
      .insert([quizSubmission]);
    
    // Verificar si hubo errores
    if (error) {
      console.error('Error de Supabase al insertar:', error);
      return false;
    }
    
    console.log('Inserción exitosa. Datos:', data);
    return true;
  } catch (error) {
    console.error('Error inesperado al enviar datos:', error);
    return false;
  }
};