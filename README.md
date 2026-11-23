# VaryAble Portfolio

Production-grade SvelteKit portfolio for AbdulGafar `<VaryAble/>`.

## Stack

- SvelteKit
- Tailwind CSS v4 (`@tailwindcss/vite`)
- TypeScript (strict)
- Vitest + Testing Library
- Playwright
- ESLint (flat config)
- Cloudflare Workers adapter

## Commands

- `npm run dev`
- `npm run check`
- `npm run lint`
- `npm run test:unit`
- `npm run test:e2e`
- `npm run build`

## Quality Gates

The repository policy is defined in [`AGENTS.md`](AGENTS.md) and enforced in CI.

## Production deployment

A passing CI run on a push to `main` deploys the `varyable-production` Worker using the GitHub `production` environment. Configure `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as secrets in that environment. Scope the token to deploying this existing Worker where supported. Cloudflare manages the two custom domains separately; do not add them to the Wrangler deployment configuration.

The `workers-preview` branch remains separate. If a production release fails, select the last known-good version in Cloudflare Workers & Pages → varyable-production → Deployments and roll back, then revert the failing change on `main`. Keep the Pages fallback until automatic production deployment and live checks are verified.
