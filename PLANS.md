# Whole-Page GSAP Flip Morph Plan

## Summary
- Preserve the current `Focused` and `Expressive` designs exactly as separate DOM branches. Do not collapse them into a shared layout.
- Replace the current native View Transition orchestration with a GSAP Flip-driven toggle flow that animates between the two exact branches.
- Scope the premium morph across the whole page, but only for a curated set of matched elements. Unmatched elements use coordinated enter/leave animation instead of forced pairing.
- Current baseline is clean enough to build on directly: `npm run check`, `npm run test:unit`, `npm run build`, and `npm run test:e2e` pass; `npm audit --audit-level=high` reports only low-severity upstream issues.

## Implementation Changes
- Add `gsap` and create a new client-only morph module, `src/lib/animations/view-mode-morph.ts`, that lazy-loads GSAP + Flip, owns one active timeline, and exports `transitionViewMode(nextMode: ViewMode): Promise<void>`.
- Refactor `src/lib/stores/view-mode.ts` into state/persistence only:
  - keep `ViewMode`, `viewMode`, `isViewTransitioning`, `initializeViewMode`
  - remove the `document.startViewTransition()` toggle path from normal mode switching
  - stop using the fixed timeout as the source of truth for transition lifecycle
  - expose an immediate mode-commit helper used by the GSAP orchestrator
- Update the switch to call `transitionViewMode()` instead of directly mutating mode state. While morphing, disable both buttons and expose `aria-busy="true"` on the control.
- Keep the SSR cookie/localStorage bootstrapping already in place so both exact branches still render correctly on first paint and after reload.
- Add explicit `data-flip-id` markers to matched elements across both branches:
  - page shells: header brand/switch block, major section shells, footer
  - hero: copy shell, CTA row, social row, profile card, meta rows, stack block
  - highlights: each metric card by metric label; strengths/component/toolbox/now blocks by semantic sub-panel
  - experience: each company card by company slug
  - projects: each featured/archive card by project slug
  - skills: each category card by category key
  - contact: copy block, email panel, actions group
- Do not pair elements whose meaning actually changes. In Hero, the focused name block and expressive title block should not share a `data-flip-id`; let the surrounding containers FLIP and those headings enter/leave.
- Keep top-nav links and the bottom section dock unpaired. They should use enter/leave animation only, not spatial matching.
- Toggle flow:
  - collect the current `[data-flip-id]` set
  - capture Flip state
  - record the current anchor section and its viewport offset
  - commit the next mode
  - `await tick()`
  - restore scroll relative to the anchor section so mid-page toggles do not jump
  - run `Flip.from(state, { targets, nested: true, fade: true, absolute: ... })`
  - use `onEnter`/`onLeave` for unmatched blocks with opacity + small Y offset
  - clear the active timeline and `isViewTransitioning` on completion or interruption
- Keep GSAP as the only premium morph owner. Remove or disable the existing `view-transition-name`/section-stage path for toggle animations so the two systems do not stack.
- Retain plain CSS transitions only for polish on safe properties like shadow, radius, background, opacity, and transform. Do not animate font-family changes. Do not FLIP every chip, bullet, or inline text fragment.

## Public Interfaces / Contracts
- `ViewMode` stays `'focused' | 'expressive'`.
- New public client API: `transitionViewMode(nextMode: ViewMode): Promise<void>`.
- Existing direct mode mutation should become internal-only or be renamed to an immediate commit helper; UI callers should no longer use it directly.
- New DOM contract: stable `data-flip-id` values are required on every intentionally matched element; `data-flip-absolute` is used for elements that must be temporarily taken out of layout during Flip.
- `isViewTransitioning` remains the public UI lock flag and reduced-motion branch signal.

## Test Plan
- Update unit tests for the store to cover immediate mode commit, cookie/localStorage sync, and transition lifecycle without native View Transition assumptions.
- Add tests for the GSAP morph module by mocking GSAP/Flip and verifying: same-mode no-op, re-entrant toggle cancellation, state capture, post-commit target query, and completion cleanup.
- Extend SSR/page tests to verify both branches still render exact mode-specific nav/layout markers and include core `data-flip-id` hooks.
- Extend Playwright smoke to verify:
  - toggle works in both directions
  - buttons lock during morph and unlock after
  - persistence survives reload
  - current section anchor does not visibly jump on mid-page toggle
  - both nav patterns still function after switching
- Manual QA scenarios:
  - toggle at top, middle, and near footer
  - rapid repeated toggles
  - reduced-motion mode
  - mobile viewport with the same choreography enabled
  - throttled CPU to check whether mobile needs a follow-up motion reduction pass

## Assumptions
- Whole-page scope is approved, but it means curated matched blocks across all major sections, not animating every DOM node.
- Mobile uses the same GSAP choreography and matching rules as desktop for this implementation; if QA shows instability, that becomes a follow-up adjustment rather than a v1 scope change.
- The current focused and expressive layouts remain visually authoritative. The implementation may add non-visual attributes and minimal wrapper hooks only where required for FLIP matching.
- The current high-severity audit gate remains green; the present audit output is low-only and does not block this feature.

## Checklist
- [x] Save this plan verbatim to `/Users/varyable/Workspace/webdev/varyable/PLANS.md` and replace the previous CSS-first morph plan.
- [x] Add `gsap` and create the client-only whole-page Flip orchestrator.
- [x] Refactor view-mode state so GSAP controls transition lifecycle and native View Transition toggle behavior is removed from the main path.
- [x] Add curated `data-flip-id` / `data-flip-absolute` hooks across all matched elements in the mode-aware sections.
- [x] Preserve scroll anchoring during toggles and guard against rapid re-entry.
- [x] Update the switch accessibility and disabled/busy behavior.
- [x] Remove conflicting `view-transition-name` / stage-transition toggle CSS while keeping non-conflicting polish transitions.
- [x] Update unit, SSR, and e2e coverage for the GSAP-driven morph flow.
- [x] Run `npm run check`, `npm run lint`, `npm run test`, `npm run build`, and `npm audit --audit-level=high`.
- [x] Fix the expressive top-right clipping that appears during the morph near the header/nav edge.
- [x] Fix the hidden expressive morph state and eliminate the second animation pass after FLIP completes.
