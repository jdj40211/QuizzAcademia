import { createClient } from '@supabase/supabase-js';
import { QuizResult } from '../types';

// Obtener variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inicializar el cliente Supabase
let supabase;

try {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Faltan credenciales de Supabase');
  }
  
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('Cliente Supabase inicializado correctamente');
} catch (error) {
  console.error('Error al inicializar Supabase');
  // Cliente ficticio para manejo de errores
  supabase = {
    from: (table) => ({
      insert: () => Promise.resolve({ data: null, error: { message: 'Error al inicializar Supabase' } }),
      select: () => ({
        eq: () => ({
          order: () => Promise.resolve({ data: [], error: { message: 'Error al inicializar Supabase' } })
        }),
        order: () => Promise.resolve({ data: [], error: { message: 'Error al inicializar Supabase' } })
      })
    })
  };
}

/**
 * Envía los resultados del quiz junto con el email del usuario a Supabase
 */
export const submitQuiz = async (email: string, results: QuizResult): Promise<boolean> => {
  console.log('Enviando datos para:', email.substring(0, 3) + '***');
  
  try {
    // Validar el email
    if (!email || !email.includes('@')) {
      console.error('Email inválido');
      return false;
    }
    
    // Crear el objeto a insertar
    const quizSubmission = {
      email,
      results,
      submitted_at: new Date().toISOString(),
      quiz_id: 'word-quiz',
      score: results.score,
      passed: results.accuracy >= 70,
    };
    
    // Insertar en Supabase
    const { data, error } = await supabase
      .from('quiz_submissions')
      .insert([quizSubmission]);
    
    if (error) {
      console.error('Error al guardar datos en Supabase');
      return false;
    }
    
    console.log('Datos guardados exitosamente');
    return true;
  } catch (error) {
    console.error('Error inesperado al enviar datos');
    return false;
  }
};

/**
 * Consulta los resultados de un usuario específico
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
    console.error('Error al obtener resultados');
    return null;
  }
};