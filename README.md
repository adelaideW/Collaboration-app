<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/54a45afe-016d-486e-a5dc-95262b54889a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy `OPENAI_API_KEY` **or** `VITE_OPENAI_API_KEY` into [.env.local](.env.local) with your key from [OpenAI API keys](https://platform.openai.com/api-keys). Either name works; both are wired in `vite.config.ts`.
3. For **Vercel** (production), add **`OPENAI_API_KEY`** (recommended) **or** **`VITE_OPENAI_API_KEY`** under Project → **Settings** → **Environment Variables**, enable it for **Production** when you ship to prod (preview deployments need **Preview** env). Redeploy after saving so Vite embeds the key into the bundle.
4. If chat fails: verify env name casing, **Production** vs **Preview**, and redeploy after any env change. If you use restricted API keys in OpenAI/Google Cloud, ensure **HTTP referrer** or site rules allow your `*.vercel.app` hostname.
5. Run the app:
   `npm run dev`
