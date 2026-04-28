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
2. Copy `GEMINI_API_KEY` **or** `VITE_GEMINI_API_KEY` into [.env.local](.env.local) with your key from [Google AI Studio](https://aistudio.google.com/). Either name works; both are wired in `vite.config.ts`.
3. For **Vercel** (production), add **`GEMINI_API_KEY`** (recommended) **or** **`VITE_GEMINI_API_KEY`** under Project → **Settings** → **Environment Variables**, enable it for **Production** if you deploy to prod (preview deployments need **Preview** env). Redeploy after saving so the bundle embeds the key.
4. If chat still fails: confirm the env name casing, **Production** vs **Preview**, and redeploy once more; in Google Cloud / AI Studio, ensure the API key **HTTP referrer / site restrictions** (if any) allow your `*.vercel.app` hostname.
5. Run the app:
   `npm run dev`
