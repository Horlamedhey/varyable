# Portfolio Dual-View Morph Implementation Plan

## Summary
- Build the dual-view system on the existing single SvelteKit route and shared `portfolio` content object, not as two page versions.
- Treat the committed first design as the `Focused` reference and the currently staged overwrite as the `Expressive` reference, but collapse both into one mode-aware implementation on top of the current shared component tree.
- Use the current staged structural shell as the markup base because it already matches the spec better: one hero board, one wave divider, one section flow, and one footer/dock system.
- First execution task: save this plan verbatim to `/Users/varyable/Workspace/webdev/varyable/PLANS.md` with the checklist at the end, then keep that checklist in sync during implementation.

## Goals
- Preserve one page, one component tree, one section order, and one content source across both modes.
- Introduce a persistent `Focused` / `Expressive` mode store with `Focused` as the first-visit default.
- Make the switch feel brand-native and premium in the header, not like a default checkbox toggle.
- Reuse the same section components and data loops in both modes, with only mode-aware styling and small local hooks where necessary.
- Keep the motion system CSS-first, subtle, and maintainable.

## Non-Goals
- Do not restore the first design and second design as separate DOM branches or route variants.
- Do not add mode-specific content fields to [`src/lib/content/portfolio.ts`](/Users/varyable/Workspace/webdev/varyable/src/lib/content/portfolio.ts).
- Do not introduce a motion library or complex FLIP/shared-layout system.
- Do not refactor the portfolio into a new primitive/component framework unless a tiny helper component is clearly justified.
- Do not change section order, navigation labels, project logic, experience order, CTA meaning, or skill groupings.

## Current-State Audit
- The hard structural constraints are already mostly satisfied: [`src/routes/+page.svelte`](/Users/varyable/Workspace/webdev/varyable/src/routes/+page.svelte) renders a single route with one section tree, and [`src/lib/content/portfolio.ts`](/Users/varyable/Workspace/webdev/varyable/src/lib/content/portfolio.ts) is the single data source.
- There is no existing mode store, no persistence layer, and no root `data-view` styling hook.
- The current staged files are strongly `Expressive`: [`src/routes/+page.svelte`](/Users/varyable/Workspace/webdev/varyable/src/routes/+page.svelte), [`src/lib/components/Hero.svelte`](/Users/varyable/Workspace/webdev/varyable/src/lib/components/Hero.svelte), [`src/lib/components/BentoHighlights.svelte`](/Users/varyable/Workspace/webdev/varyable/src/lib/components/BentoHighlights.svelte), and [`src/routes/layout.css`](/Users/varyable/Workspace/webdev/varyable/src/routes/layout.css) now lean editorial, handwritten, and atmospheric.
- Git `HEAD` still contains the tighter first design, so the repo already contains the visual cues needed for `Focused`, but only in history, not in a reusable mode system.
- Navigation placement is inconsistent across the two references: `HEAD` had top-header nav links, while the staged version uses the bottom section dock. To avoid duplication, keep one shared navigation system and place only the mode switch in the header.
- The current CSS already has a reduced-motion block in [`src/routes/layout.css`](/Users/varyable/Workspace/webdev/varyable/src/routes/layout.css), which should be extended rather than replaced.
- Assumption: the first design maps to `Focused` and the staged overwrite maps to `Expressive`. That matches both the spec and the current visual direction.

## Proposed Architecture
- Add a small global view-mode store in a new `src/lib/stores/view-mode.ts` with `type ViewMode = 'focused' | 'expressive'`, a persisted value, and a short-lived `isTransitioning` flag.
- Initialize and hydrate that store once from [`src/routes/+layout.svelte`](/Users/varyable/Workspace/webdev/varyable/src/routes/+layout.svelte), with a tiny pre-hydration script in [`src/app.html`](/Users/varyable/Workspace/webdev/varyable/src/app.html) to set `html[data-view]` before paint and avoid a visible snap on returning `Expressive` visits.
- Use `html[data-view="focused"]` and `html[data-view="expressive"]` as the primary styling hook, plus `html[data-view-transitioning="true"]` for the brief morph choreography.
- Keep the current staged DOM structure as the shared base and express mode differences through CSS custom properties, existing class hooks, and at most a few small extra section hooks.
- Add one new `ViewModeSwitch` component in the header and one small `WaveDivider` component for the signature divider, but keep the rest of the sections as the existing components.
- Leave [`src/lib/content/portfolio.ts`](/Users/varyable/Workspace/webdev/varyable/src/lib/content/portfolio.ts) and [`src/lib/types/portfolio.ts`](/Users/varyable/Workspace/webdev/varyable/src/lib/types/portfolio.ts) unchanged so both modes consume identical content and contracts.

## Key Changes
- State/store changes: add a persisted view-mode store, a storage key such as `portfolio-view-mode`, browser-safe hydration, and a transient switching state for 350ms to 500ms.
- Component/file changes: add a branded segmented switch, thread it into the existing header, convert the current raw divider into a small reusable wave component, and keep all content sections on the same component tree.
- Styling strategy: keep the existing large route stylesheet as the base, but isolate new mode tokens and morph rules into one imported mode stylesheet if needed so the view system does not sprawl through every selector.
- Focused styling: pull from the committed first design by tightening spacing, reducing tilt/glow/noise, using cleaner typography emphasis, calmer cards, and more restrained CTA/meta treatments.
- Expressive styling: keep the staged editorial rhythm, stronger headings, more visible ornament, richer card framing, and slightly more dramatic hero/highlights presence.
- Data invariants: do not fork `projects`, `experience`, `skills`, `contact`, or section headings by mode; the same loops and objects must render in both modes.
- Navigation decision: keep the current section dock as the single primary navigation system and use the header only for brand/status/actions plus the new mode switch.

## Motion and Interaction Strategy
- Use a segmented control labeled exactly `Focused` and `Expressive`, placed in the top-right utility area of the header.
- Animate the switch first with a sliding active pill and small color/depth change; avoid checkbox metaphors entirely.
- Trigger a short global transition state when mode changes. Use it only for subtle choreography, not for branching logic.
- Let the wave divider react second with a small brighten/sweep/amplitude adjustment, then settle into the target mode.
- Make Hero and Highlights the strongest morph zones. Animate spacing, grid balance, type scale, card radius, chip treatment, and ornament opacity rather than crossfading content.
- Let Experience, Projects, Skills, and CTA follow with lighter staggered transitions driven by CSS delays on stable wrappers.
- Animate only safe properties: padding, gap, max-width, border-radius, box-shadow, opacity, transform, line-height, and selected headline sizes.
- Do not animate font-family changes. Apply font-family swaps as state changes and animate surrounding spacing/scale only, to avoid messy text reflow.
- Extend the existing `prefers-reduced-motion` handling so the switch still works instantly and the divider/section choreography collapses to near-zero duration.

## Persistence Strategy
- Default to `focused` on first visit.
- Persist the chosen mode in `localStorage` under one dedicated key.
- In [`src/app.html`](/Users/varyable/Workspace/webdev/varyable/src/app.html), add a tiny inline script that reads the stored mode and sets `document.documentElement.dataset.view` before Svelte hydrates.
- In the store initializer, read the existing DOM dataset first, then confirm/persist to `localStorage` so the DOM and store never fight each other.
- On every mode change, update the store, `html[data-view]`, `html[data-view-transitioning]`, and `localStorage` together.
- If storage access fails, fall back silently to `focused` and keep the UI functional.

## File-by-File Plan
- [`src/app.html`](/Users/varyable/Workspace/webdev/varyable/src/app.html): add a minimal pre-hydration script that applies the saved mode to the root HTML element before paint.
- [`src/routes/+layout.svelte`](/Users/varyable/Workspace/webdev/varyable/src/routes/+layout.svelte): initialize the client-side mode store once and keep the root dataset synchronized after hydration.
- New `src/lib/stores/view-mode.ts`: define `ViewMode`, the storage key, browser guards, `mode` store, `isTransitioning` store, and a single public `setViewMode` flow.
- New `src/lib/components/ViewModeSwitch.svelte`: implement the branded segmented control with accessible button semantics, active-pill animation, and direct store integration.
- [`src/lib/components/Navbar.svelte`](/Users/varyable/Workspace/webdev/varyable/src/lib/components/Navbar.svelte): place the switch in `.utility-cluster`, keep brand identity stable, and rebalance the utility pills for desktop and mobile wrapping.
- [`src/routes/+page.svelte`](/Users/varyable/Workspace/webdev/varyable/src/routes/+page.svelte): keep the staged shared section shell, remove any need for mode-specific page branches, and swap the current divider element for the new shared wave component.
- New `src/lib/components/WaveDivider.svelte`: render a simple inline SVG or minimal wrapper that can respond to `data-view` and `isTransitioning` without JS-heavy animation.
- [`src/routes/layout.css`](/Users/varyable/Workspace/webdev/varyable/src/routes/layout.css): keep the base layout and existing class system, then add mode-aware CSS variables for density, typography, radii, shadows, tilt, ornament opacity, and section rhythm.
- New `src/lib/styles/portfolio-view-modes.css` if extracted: hold only the `data-view` token overrides, transition-state selectors, and section-specific morph rules so the mode system stays isolated from unrelated base styles.
- [`src/lib/components/Hero.svelte`](/Users/varyable/Workspace/webdev/varyable/src/lib/components/Hero.svelte): keep current content structure, but add only the smallest extra hooks needed for hero grid proportions, copy width, CTA sizing, social link treatment, and profile card framing.
- [`src/lib/components/BentoHighlights.svelte`](/Users/varyable/Workspace/webdev/varyable/src/lib/components/BentoHighlights.svelte): preserve the current metric/cards structure and drive Focused vs Expressive through grid rhythm, padding, number scale, and ornament intensity.
- [`src/lib/components/ExperienceTimeline.svelte`](/Users/varyable/Workspace/webdev/varyable/src/lib/components/ExperienceTimeline.svelte): keep the same entries and order, with mode-driven spacing, marker size, line opacity, and card padding only.
- [`src/lib/components/Projects.svelte`](/Users/varyable/Workspace/webdev/varyable/src/lib/components/Projects.svelte): keep featured/all project logic intact and adjust only card emphasis, chip styling, spacing, and hover presence by mode.
- [`src/lib/components/Skills.svelte`](/Users/varyable/Workspace/webdev/varyable/src/lib/components/Skills.svelte): keep current taxonomy cards and chip loops, with only subtle mode changes to padding, radius, and category treatment.
- [`src/lib/components/ContactCTA.svelte`](/Users/varyable/Workspace/webdev/varyable/src/lib/components/ContactCTA.svelte): keep identical contact actions while varying heading scale, panel depth, and breathing room between modes.
- [`src/lib/components/Footer.svelte`](/Users/varyable/Workspace/webdev/varyable/src/lib/components/Footer.svelte): keep the same content and only make any token-based spacing or contrast adjustments needed for consistency.
- [`src/lib/content/portfolio.ts`](/Users/varyable/Workspace/webdev/varyable/src/lib/content/portfolio.ts) and [`src/lib/types/portfolio.ts`](/Users/varyable/Workspace/webdev/varyable/src/lib/types/portfolio.ts): no planned content/schema changes.
- [`src/routes/page.test.ts`](/Users/varyable/Workspace/webdev/varyable/src/routes/page.test.ts): update SSR assertions to include the view switch labels and confirm the single shared page still renders required sections.
- New `src/lib/stores/view-mode.test.ts`: test default mode, persisted mode hydration, DOM dataset sync, and storage fallback behavior.
- [`e2e/smoke.spec.ts`](/Users/varyable/Workspace/webdev/varyable/e2e/smoke.spec.ts): extend the smoke flow to toggle the mode, verify the active segment, reload, and confirm persistence plus unchanged section navigation.

## Risks and Edge Cases
- The current staged expressive CSS is baked into many shared selectors, so Focused can drift into “expressive with less glow” unless tokenization is deliberate.
- Switching headline scale and spacing can change section heights enough to affect the current IntersectionObserver behavior in [`src/routes/+page.svelte`](/Users/varyable/Workspace/webdev/varyable/src/routes/+page.svelte); the observer margins may need a small retune after the hero morph is in place.
- The header utility cluster can become crowded on smaller screens once the segmented control is added. Mobile wrapping behavior must be designed, not left to chance.
- If the pre-hydration HTML dataset and store hydration logic disagree, returning `Expressive` users will see a flash or double transition.
- Because the second design currently lives in staged changes, implementation must build on the existing working tree without discarding the user’s staged work or trying to resurrect `HEAD` as a parallel branch.
- Font-family differences between the first and second design can create noticeable reflow. Keep font swaps limited and avoid animating them.
- Reduced-motion users still need a clear active state and persistent mode, even if most morph transitions are removed.

## Validation Checklist
- [ ] The portfolio remains one route, one component tree, one section order, and one content source.
- [ ] There is no `{#if mode}` branch that swaps whole page or section implementations.
- [ ] The UI labels are exactly `Focused` and `Expressive`.
- [ ] The switch sits in the header utility area and looks like a branded segmented control, not a generic toggle.
- [ ] `Focused` is the default first-visit mode.
- [ ] Refreshing the page preserves the previously selected mode.
- [ ] Hero, wave divider, highlights, and CTA show the clearest morph without content duplication.
- [ ] Projects, experience, and skills keep the same data and CTA actions in both modes.
- [ ] Navigation labels and section anchors remain unchanged in both modes.
- [ ] Reduced-motion mode removes decorative motion but keeps the switch and persistence behavior intact.
- [ ] Mobile and desktop layouts both remain readable and intentional after the switch is added.
- [ ] `npm run check`, `npm run lint`, `npm run test`, `npm run build`, and `npm audit --audit-level=high` pass.

## Implementation Phases
1. Phase 0: save this plan verbatim to `/Users/varyable/Workspace/webdev/varyable/PLANS.md`, append the execution checklist below, and treat the current staged tree as the implementation base while using `HEAD` only as a visual reference for `Focused`.
2. Phase 1: add the view-mode store, pre-hydration persistence hook, layout initialization, and header switch so the mode system exists before any section styling work starts.
3. Phase 2: implement the strong morph zones first in the existing shared tree: Hero, wave divider, Highlights, and Contact CTA.
4. Phase 3: apply the same token-driven approach to Experience, Projects, Skills, header refinements, and any small section-dock adjustments.
5. Phase 4: tune reduced-motion behavior, fix layout observer edge cases, run the full validation checklist, and close any remaining polish gaps.
- [x] Save this plan verbatim to `/Users/varyable/Workspace/webdev/varyable/PLANS.md`.
- [x] Create the `view-mode` store and root persistence flow.
- [x] Add the segmented `Focused` / `Expressive` switch to the header.
- [x] Wire the root `data-view` and transient transition state.
- [x] Convert the divider into a reusable shared wave component.
- [x] Tokenize global density/typography/surface differences for both modes.
- [x] Implement Hero morph behavior.
- [x] Implement Highlights morph behavior.
- [x] Implement Contact CTA morph behavior.
- [x] Implement Experience and Projects morph behavior.
- [x] Apply subtle Skills and header polish.
- [x] Extend unit and e2e coverage for mode switching and persistence.
- [x] Run all required quality gates and final visual QA.
