# AGENTS.md

## Purpose And Quality Bar
This repository must maintain production-grade engineering quality. "Production-ready" means the software is secure, tested, observable, accessible, performant, and maintainable.

## Engineering Standards
- Use TypeScript in strict mode.
- Do not use `any` unless a comment justifies why a safer type cannot be used.
- Do not leave dead code in the codebase.
- Do not leave TODO/FIXME comments without owner, date, and issue reference.
- Keep components focused and easy to reason about.
- Use canonical Tailwind utility syntax when equivalent shorthand exists.
  - For CSS variable-backed utilities, prefer canonical forms like `bg-(--accent)`, `text-(--text)`, and `border-(--border)` instead of bracketed forms like `bg-[var(--accent)]`.
- Guardrails:
  - Prefer components under 250 lines.
  - Prefer functions under 60 lines.
  - Split large modules by concern instead of accumulating unrelated behavior.

## Security Baseline (Strict)
- Never commit secrets, credentials, tokens, or private keys.
- Use environment variables for secret material.
- Validate and sanitize all external input.
- Do not inject raw HTML unless sanitized and reviewed.
- Set content security policy (CSP) and security headers for deployed environments.
- Treat high/critical dependency vulnerabilities as release blockers.

## Required Quality Gates (Blocking)
All of the following must pass before merge or deploy:
- `npm run check`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm audit --audit-level=high`

Coverage thresholds for unit tests:
- Lines: `>= 85%`
- Branches: `>= 75%`

## Testing Policy
- Add unit tests for logic and state transitions.
- Add component tests for key UI states and interactions.
- Add e2e smoke tests for critical user journey.
- Include accessibility assertions for key pages/components where practical.

## Accessibility And UX Bar
- Meet WCAG AA contrast requirements.
- Ensure keyboard navigation for all interactive elements.
- Ensure visible focus states.
- Respect `prefers-reduced-motion` for non-essential motion.

## Performance And SEO Bar
- Target Lighthouse minimums:
  - Performance: `>= 95`
  - Accessibility: `>= 95`
  - Best Practices: `>= 95`
  - SEO: `>= 90`
- Keep bundle size controlled and avoid unnecessary dependencies.
- Optimize images and other static assets.

## CI/CD Expectations
- CI must run all blocking gates on pull requests.
- Merging is not allowed when required checks fail.
- Releases are cut only from a green default branch.

## Exception Policy (Strict Production)
- No silent bypasses.
- Exceptions require all of:
  - Explicit owner
  - Risk summary
  - Tracking issue
  - Expiration date
  - Security approval
- Expired exceptions are invalid and must be removed or renewed through review.

## Definition Of Done
A task is done only when:
- Implementation is complete.
- Tests are added/updated and passing.
- Documentation is updated.
- Security and quality gates are green.
- Deployment/preview verification is completed.
