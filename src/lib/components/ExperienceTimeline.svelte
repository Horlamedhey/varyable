<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { tick } from 'svelte';
	import type { ExperienceItem } from '$lib/types/portfolio';
	import { viewMode, type ViewMode } from '$lib/stores/view-mode';

	let { experience, mode = 'focused' } = $props<{ experience: ExperienceItem[]; mode?: ViewMode }>();
	const renderMode = $derived(browser ? $viewMode : mode);
	const initialCount = 4;
	const initialExperience = $derived(experience.slice(0, initialCount));
	const remainingExperience = $derived(experience.slice(initialCount));
	const canExpand = $derived(remainingExperience.length > 0);
	let expanded = $state(false);
	let interactive = $state(false);
	let activeAnimations: Animation[] = [];

	onMount(() => {
		interactive = true;
	});

	async function toggleExpanded(controlsId: string) {
		const overflowElement = document.getElementById(controlsId);
		if (!(overflowElement instanceof HTMLDivElement)) return;

		for (const animation of activeAnimations) {
			animation.cancel();
		}

		const items = Array.from(
			overflowElement.querySelectorAll<HTMLElement>('.experience-overflow-item')
		);
		const initialRects = items.map((item) => item.getBoundingClientRect());
		const initialHeight = overflowElement.getBoundingClientRect().height;

		expanded = !expanded;
		await tick();

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			activeAnimations = [];
			return;
		}

		const finalHeight = overflowElement.getBoundingClientRect().height;
		const cardAnimations = items.map((item, index) => {
			const finalRect = item.getBoundingClientRect();
			const deltaX = initialRects[index].left - finalRect.left;
			const deltaY = initialRects[index].top - finalRect.top;
			const finalTransform = getComputedStyle(item).transform;
			const baseTransform = finalTransform === 'none' ? '' : finalTransform;
			const delayIndex = expanded ? index : items.length - index - 1;

			return item.animate(
				[
					{ transform: `translate(${deltaX}px, ${deltaY}px) ${baseTransform}`.trim() },
					{ transform: baseTransform || 'none' }
				],
				{
					duration: 620,
					delay: delayIndex * 75,
					easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
					fill: 'both'
				}
			);
		});

		const containerAnimation = overflowElement.animate(
			[{ height: `${initialHeight}px` }, { height: `${finalHeight}px` }],
			{
				duration: 620 + (items.length - 1) * 75,
				easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
			}
		);

		const animations = [...cardAnimations, containerAnimation];
		activeAnimations = animations;
		await Promise.allSettled(animations.map((animation) => animation.finished));

		if (activeAnimations === animations) {
			for (const animation of animations) {
				animation.cancel();
			}
			activeAnimations = [];
		}
	}
</script>

{#if renderMode === 'focused'}
	<div class="relative space-y-6 pl-5 before:absolute before:bottom-0 before:left-1 before:top-1 before:w-px before:bg-[linear-gradient(180deg,var(--accent),transparent)]" data-flip-absolute data-flip-id="experience-shell">
		{#each initialExperience as item, index (item.company)}
			<article
				class="hand-card hand-tilt-b p-5 sm:p-6"
				data-flip-absolute
				data-flip-id={`experience-${item.company}`}
				style={`--tilt:${index % 2 === 0 ? '-0.6deg' : '0.6deg'}`}
			>
				<div
					class="absolute -left-7 mt-1 h-4 w-4 rounded-full border-2 border-(--accent) bg-(--bg) shadow-[0_0_0_5px_rgba(23,31,42,0.8)]"
					aria-hidden="true"
				></div>
				<p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent)">{item.period}</p>
				<h3 class="mt-2 text-2xl font-extrabold text-(--text)">{item.company}</h3>
				<p class="text-sm font-semibold text-(--text)/80">{item.role}</p>
				<ul class="mt-4 space-y-2 text-sm text-(--muted)">
					{#each item.bullets as bullet (bullet)}
						<li class="flex items-start gap-2">
							<span aria-hidden="true" class="mt-2 h-1.5 w-1.5 rounded-full bg-(--accent)"></span>
							{bullet}
						</li>
					{/each}
				</ul>
			</article>
		{/each}

		{#if canExpand}
			<div
				id="focused-additional-experience"
				class:experience-overflow-collapsed={!expanded}
				class="experience-overflow-grid"
				aria-hidden={!expanded}
				inert={!expanded}
				style={`--stack-count:${remainingExperience.length}`}
			>
				{#each remainingExperience as item, index (item.company)}
					<div
						class="experience-overflow-item"
						style={`--stack-index:${index};--stack-order:${remainingExperience.length - index}`}
					>
						<div
							class="experience-marker absolute -left-7 mt-1 h-4 w-4 rounded-full border-2 border-(--accent) bg-(--bg) shadow-[0_0_0_5px_rgba(23,31,42,0.8)]"
							aria-hidden="true"
						></div>
						<article
							class="hand-card hand-tilt-b p-5 sm:p-6"
							data-flip-absolute
							data-flip-id={`experience-${item.company}`}
							style={`--tilt:${(index + initialCount) % 2 === 0 ? '-0.6deg' : '0.6deg'}`}
						>
							<p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent)">{item.period}</p>
							<h3 class="mt-2 text-2xl font-extrabold text-(--text)">{item.company}</h3>
							<p class="text-sm font-semibold text-(--text)/80">{item.role}</p>
							<ul class="mt-4 space-y-2 text-sm text-(--muted)">
								{#each item.bullets as bullet (bullet)}
									<li class="flex items-start gap-2">
										<span aria-hidden="true" class="mt-2 h-1.5 w-1.5 rounded-full bg-(--accent)"></span>
										{bullet}
									</li>
								{/each}
							</ul>
						</article>
					</div>
				{/each}
			</div>
		{/if}

		{#if canExpand}
			<div class="experience-toggle-row">
				<button
					class="btn-secondary experience-toggle"
					type="button"
					disabled={!interactive}
					onclick={() => toggleExpanded('focused-additional-experience')}
					aria-controls="focused-additional-experience"
					aria-expanded={expanded}
				>
					<span>{expanded ? 'Show less experience' : `Show ${remainingExperience.length} more roles`}</span>
					<span class:experience-toggle-arrow-up={expanded} class="experience-toggle-arrow" aria-hidden="true">↓</span>
				</button>
			</div>
		{/if}
	</div>
{:else}
	<div class="timeline-stack" data-flip-absolute data-flip-id="experience-shell">
		{#each initialExperience as item, index (item.company)}
			<div class="experience-visible-item">
				<span aria-hidden="true" class="timeline-marker"></span>
				<article
					class="hand-card timeline-card"
					data-flip-absolute
					data-flip-id={`experience-${item.company}`}
					style={`--tilt:${index % 2 === 0 ? '-0.6deg' : '0.65deg'}`}
				>
					<p class="timeline-period">{item.period}</p>
					<h3 class="timeline-company">{item.company}</h3>
					<p class="timeline-role">{item.role}</p>
					<ul class="hand-list compact">
						{#each item.bullets as bullet (bullet)}
							<li>{bullet}</li>
						{/each}
					</ul>
				</article>
			</div>
		{/each}

		{#if canExpand}
			<div
				id="expressive-additional-experience"
				class:experience-overflow-collapsed={!expanded}
				class="experience-overflow-grid"
				aria-hidden={!expanded}
				inert={!expanded}
				style={`--stack-count:${remainingExperience.length}`}
			>
				{#each remainingExperience as item, index (item.company)}
					<div
						class="experience-overflow-item"
						style={`--stack-index:${index};--stack-order:${remainingExperience.length - index}`}
					>
						<span aria-hidden="true" class="timeline-marker experience-marker"></span>
						<article
							class="hand-card timeline-card"
							data-flip-absolute
							data-flip-id={`experience-${item.company}`}
							style={`--tilt:${(index + initialCount) % 2 === 0 ? '-0.6deg' : '0.65deg'}`}
						>
							<p class="timeline-period">{item.period}</p>
							<h3 class="timeline-company">{item.company}</h3>
							<p class="timeline-role">{item.role}</p>
							<ul class="hand-list compact">
								{#each item.bullets as bullet (bullet)}
									<li>{bullet}</li>
								{/each}
							</ul>
						</article>
					</div>
				{/each}
			</div>
		{/if}

		{#if canExpand}
			<div class="experience-toggle-row">
				<button
					class="btn-secondary experience-toggle"
					type="button"
					disabled={!interactive}
					onclick={() => toggleExpanded('expressive-additional-experience')}
					aria-controls="expressive-additional-experience"
					aria-expanded={expanded}
				>
					<span>{expanded ? 'Show less experience' : `Show ${remainingExperience.length} more roles`}</span>
					<span class:experience-toggle-arrow-up={expanded} class="experience-toggle-arrow" aria-hidden="true">↓</span>
				</button>
			</div>
		{/if}
	</div>
{/if}
