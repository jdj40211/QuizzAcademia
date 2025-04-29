import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Configuración para variables de entorno
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY),
    'import.meta.env.VITE_GHL_WEBHOOK_URL': JSON.stringify(process.env.VITE_GHL_WEBHOOK_URL),
    'import.meta.env.VITE_GHL_API_KEY': JSON.stringify(process.env.VITE_GHL_API_KEY)
  },
  // Opcionalmente, puedes agregar configuración del servidor
  server: {
    port: 3000,
    // Si necesitas configuración de proxy, puedes agregarla aquí
  }
});