/// <reference types="vite/client" />

/** Injected in `vite.config.ts` via `define` (Gemini merged key); empty string when unset */
declare const __GEMINI_KEY_BUILD__: string;

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
}
