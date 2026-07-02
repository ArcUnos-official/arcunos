# ArcUnos V3 Final Auth Fixed

This build fixes the login redirect/session problem by adding a stable ArcUnos login cookie fallback while still using Supabase Auth.

## Local test

1. Create `.env.local` in the inner `arcunos-v3` folder.
2. Add your Supabase values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_LEGACY_ANON_PUBLIC_KEY_STARTING_WITH_EYJ
OPENAI_API_KEY=
GEMINI_API_KEY=
```

3. Run:

```bash
npm install
npm run dev
```

4. Open `http://localhost:3000`.

## Supabase settings

- Authentication > Providers > Email: enabled.
- Authentication > Providers > Confirm email: OFF for testing.
- Authentication > URL Configuration:
  - Site URL: `http://localhost:3000`
  - Redirect URLs as separate rows:
    - `http://localhost:3000`
    - `http://localhost:3000/dashboard`
    - `http://localhost:3000/auth/callback`

For Cloudflare later add:
- `https://arcunos.pages.dev`
- `https://arcunos.pages.dev/dashboard`
- `https://arcunos.pages.dev/auth/callback`
