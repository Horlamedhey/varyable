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

Cloudflare Workers Builds follows `main` and deploys the `varyable-production` Worker. The build command is `npm run build`, and the deploy command is `npx --no-install wrangler deploy`. Keep branch previews disabled for this production Worker. Cloudflare holds the deployment credential; GitHub Actions runs the quality checks and needs no Cloudflare secrets.

Use a passing pull request before merging to `main`. Production deploys leave the two dashboard-managed custom domains in place; do not add them to the Wrangler configuration. The `workers-preview` branch and Worker remain separate.

Verify the live site with `bash scripts/smoke-production-worker.sh`. If a production release fails, select the previous known-good version in the Worker's Cloudflare Deployments tab, then revert the failing change on `main` through a pull request.
