/**
 * Resolves the Gemini API key for the browser bundle.
 * Vite injects `process.env.API_KEY` from `GEMINI_API_KEY` or `VITE_GEMINI_API_KEY`
 * at build time; `import.meta.env.VITE_*` is available when set in `.env`.
 */
export function resolveGeminiApiKey(): string {
  const viteKey =
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY
      ? String(import.meta.env.VITE_GEMINI_API_KEY)
      : '';

  const legacyKey =
    typeof process !== 'undefined' && (process as unknown as { env?: { API_KEY?: string } }).env
      ?.API_KEY
      ? String(
          (process as unknown as { env: { API_KEY?: string } }).env.API_KEY
        )
      : '';

  return (viteKey || legacyKey).trim();
}

/** Prefer stable models on the Google AI (ai.google.dev) API; fall back on client error. */
export const GEMINI_CHAT_MODELS = [
  'gemini-2.0-flash',
  'gemini-2.5-flash',
  'gemini-1.5-flash',
] as const;
