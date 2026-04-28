/// <reference types="vite/client" />

/** Injected in `vite.config.ts` via `define` */
declare const __OPENAI_KEY_BUILD__: string;

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY?: string;
}
