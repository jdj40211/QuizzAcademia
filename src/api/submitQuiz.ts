import { createClient } from '@supabase/supabase-js';
import { QuizResult } from '../types';

// Inicialización del cliente de Supabase con manejo de errores mejorado
let supabase;

// Obtén las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Establecer valores fijos (solo para desarrollo, no recomendado para producción)
// Si las variables de entorno no funcionan, usa estos valores como respaldo
const fallbackUrl = "https://zlynehixqgrglqhwycqy.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpseW5laGl4cWdyZ2xxaHd5Y3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0Nzg0MzgsImV4cCI6MjA2MTA1NDQzOH0.pxYdk7V2otAiZDUX5URUFBdKU67E_xSvdlm4WI_AYxA";

// Usar valores de entorno si están disponibles, sino usar valores de respaldo
const finalUrl = supabaseUrl || fallbackUrl;
const finalKey = supabaseKey || fallbackKey;

console.log('Supabase URL utilizada:', finalUrl.substring(0, 10) + '...');
console.log('Supabase Key utilizada:', finalKey.substring(0, 10) + '...');

try {
  // Inicializar el cliente de Supabase
  supabase = createClient(finalUrl, finalKey);
  console.log('Cliente Supabase inicializado correctamente');
} catch (error) {
  console.error('Error al inicializar Supabase:', error);
  // Crear un cliente ficticio en caso de error para que la aplicación no falle
  // Este cliente ficticio imita la estructura del cliente real de Supabase
  supabase = {
    from: (table) => {
      return {
        insert: () => Promise.resolve({ data: null, error: { message: 'Error al inicializar Supabase' } }),
        select: () => {
          const builder = {
            eq: () => {
              return {
                order: () => Promise.resolve({ data: [], error: { message: 'Error al inicializar Supabase' } })
              };
            },
            order: () => Promise.resolve({ data: [], error: { message: 'Error al inicializar Supabase' } })
          };
          return builder;
        }
      };
    }
  };
}

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
    
    // Crear el objeto a insertar SIN device y language
    const quizSubmission = {
      email,
      results,
      submitted_at: new Date().toISOString(),
      quiz_id: 'word-quiz',
      score: results.score,
      passed: results.accuracy >= 70,
      // Removemos estas propiedades ya que no existen en la tabla
      // device: navigator.userAgent,
      // language: navigator.language
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