import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // `.env*` files (local dev). CI (e.g. Vercel) injects secrets into `process.env`.
    const openAiKey =
        env.VITE_OPENAI_API_KEY ||
        env.OPENAI_API_KEY ||
        process.env.VITE_OPENAI_API_KEY ||
        process.env.OPENAI_API_KEY ||
        '';
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        __OPENAI_KEY_BUILD__: JSON.stringify(openAiKey),
        'process.env.API_KEY': JSON.stringify(openAiKey),
        'process.env.OPENAI_API_KEY': JSON.stringify(openAiKey),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
