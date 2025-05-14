import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno independientemente del modo
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    // Definir variables de entorno para que estén disponibles en el navegador
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
      'import.meta.env.VITE_GHL_WEBHOOK_URL': JSON.stringify(env.VITE_GHL_WEBHOOK_URL),
      'import.meta.env.VITE_GHL_API_KEY': JSON.stringify(env.VITE_GHL_API_KEY)
    },
    server: {
      port: 3000,
    }
  };
});