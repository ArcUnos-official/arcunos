# ArcUnos v3

Professional React + TypeScript + Vite application foundation for ArcUnos.

## Deploy on Cloudflare Pages
Build command: `npm run build`
Build output directory: `dist`

## Local run
```bash
npm install
npm run dev
```

## Supabase Auth
Create `.env.local` with:
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_AI_API_ENDPOINT=your_backend_endpoint_optional
```

If Supabase keys are not added, app runs in secure demo mode using local session only.
