import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslint({
      lintOnStart: true,
      failOnError: mode === "production"
    })
  ],
 
  server: {
    open: true,
    proxy: {
      '/api': mode === 'development'
        ? 'http://localhost:8000'  
        : 'https://brian-auth-me.onrender.com'
    }
}
}));
