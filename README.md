# ArcUnos v3 Clean

Clean React + TypeScript + Vite + Cloudflare Workers static-assets build.

## Cloudflare build settings

Build command:
```bash
bun run build
```

Deploy command:
```bash
bunx wrangler deploy
```

Root directory:
```bash
/
```

The site deploys to the existing Worker named `arcunos`, keeping:
`arcunos.arcunosofficial.workers.dev`
