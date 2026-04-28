/**
 * Returns the Gemini API key embedded at build time (`GEMINI_API_KEY` /
 * `VITE_GEMINI_API_KEY` merged in `vite.config.ts`). Prefer this over reading
 * `process.env` with casts — those patterns often fail Vite’s static substitution.
 */
export function resolveGeminiApiKey(): string {
  const fromDefine =
    typeof __GEMINI_KEY_BUILD__ !== 'undefined'
      ? String(__GEMINI_KEY_BUILD__).trim()
      : '';

  const fromImportMeta =
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY
      ? String(import.meta.env.VITE_GEMINI_API_KEY).trim()
      : '';

  return fromDefine || fromImportMeta || '';
}

/** Prefer stable models on the Google AI (ai.google.dev) API; fall back on client error. */
export const GEMINI_CHAT_MODELS = [
  'gemini-2.0-flash',
  'gemini-2.5-flash',
  'gemini-1.5-flash',
] as const;
