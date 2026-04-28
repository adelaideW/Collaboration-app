/**
 * Returns the OpenAI API key embedded at build time (`OPENAI_API_KEY` /
 * `VITE_OPENAI_API_KEY` merged in `vite.config.ts`).
 */
export function resolveOpenAIApiKey(): string {
  const fromDefine =
    typeof __OPENAI_KEY_BUILD__ !== 'undefined'
      ? String(__OPENAI_KEY_BUILD__).trim()
      : '';

  const fromImportMeta =
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_OPENAI_API_KEY
      ? String(import.meta.env.VITE_OPENAI_API_KEY).trim()
      : '';

  return fromDefine || fromImportMeta || '';
}

/** Default chat model for Rippling AI (cheap, capable). Override via bundler if needed. */
export const OPENAI_CHAT_MODEL = 'gpt-4o-mini' as const;
