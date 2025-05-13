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

/**
 * Envía los resultados del quiz junto con el email del usuario a Supabase
 * @param email - Correo electrónico del usuario
 * @param results - Resultados del quiz
 * @returns Promise<boolean> - true si se guarda correctamente, false si hay error
 */
export const submitQuiz = async (email: string, results: QuizResult): Promise<boolean> => {
  console.log('Enviando datos a Supabase:', { email, results });
  
  try {
    // Validar el email
    if (!email || !email.includes('@')) {
      console.error('Email inválido:', email);
      return false;
    }
    
    // Crear el objeto a insertar con tu estructura actual
    const quizSubmission = {
      email,
      results,
      submitted_at: new Date().toISOString(),
      quiz_id: 'word-quiz',
      score: results.score,
      passed: results.accuracy >= 70,
      device: navigator.userAgent,
      language: navigator.language
    };
    
    console.log('Datos a insertar:', quizSubmission);
    
    // Insertar en Supabase
    const { data, error } = await supabase
      .from('quiz_submissions')
      .insert([quizSubmission]);
    
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

/**
 * Consulta los resultados de un usuario específico
 * @param email - Correo electrónico del usuario
 */
export const getUserResults = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('quiz_submissions')
      .select('*')
      .eq('email', email)
      .order('submitted_at', { ascending: false });
      
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error al obtener resultados:', error);
    return null;
  }
};