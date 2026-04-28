import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // `.env*` files (local dev). CI hosts (e.g. Vercel) inject secrets only into `process.env`
    // — `loadEnv` does not include those, so merge explicitly.
    const geminiKey =
        env.VITE_GEMINI_API_KEY ||
        env.GEMINI_API_KEY ||
        process.env.VITE_GEMINI_API_KEY ||
        process.env.GEMINI_API_KEY ||
        '';
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Single build-time injection Vite reliably replaces (avoids casted process.env lookups in app code).
        __GEMINI_KEY_BUILD__: JSON.stringify(geminiKey),
        // Kept for any dependency that expects these patterns.
        'process.env.API_KEY': JSON.stringify(geminiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(geminiKey),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
