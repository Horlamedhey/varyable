<script lang="ts">
	import { browser } from '$app/environment';
	import type { SkillsData } from '$lib/types/portfolio';
	import { viewMode, type ViewMode } from '$lib/stores/view-mode';

	let { skills, mode = 'focused' } = $props<{ skills: SkillsData; mode?: ViewMode }>();
	const renderMode = $derived(browser ? $viewMode : mode);
</script>

{#if renderMode === 'focused'}
	<div class="grid gap-4 md:grid-cols-3" data-flip-absolute data-flip-id="skills-shell">
		<article class="hand-card hand-tilt-a p-5 sm:p-6" data-flip-absolute data-flip-id="skills-frontend">
			<h3 class="text-xl font-extrabold text-(--text)">Frontend</h3>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each skills.frontend as item (item)}
					<span class="accent-chip">{item}</span>
				{/each}
			</div>
		</article>

		<article class="hand-card hand-tilt-b p-5 sm:p-6" data-flip-absolute data-flip-id="skills-backend">
			<h3 class="text-xl font-extrabold text-(--text)">Backend</h3>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each skills.backend as item (item)}
					<span class="accent-chip">{item}</span>
				{/each}
			</div>
		</article>

		<article class="hand-card hand-tilt-c p-5 sm:p-6" data-flip-absolute data-flip-id="skills-tooling">
			<h3 class="text-xl font-extrabold text-(--text)">Tooling</h3>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each skills.tooling as item (item)}
					<span class="accent-chip">{item}</span>
				{/each}
			</div>
		</article>
	</div>
{:else}
	<div class="skills-grid" data-flip-absolute data-flip-id="skills-shell">
		<article class="hand-card hand-tilt-a skill-card" data-flip-absolute data-flip-id="skills-frontend">
			<p class="annotation text-xl text-(--accent)">Interfaces</p>
			<h3 class="skill-heading">Frontend</h3>
			<div class="skill-cloud">
				{#each skills.frontend as item (item)}
					<span class="accent-chip">{item}</span>
				{/each}
			</div>
		</article>

		<article class="hand-card hand-tilt-b skill-card" data-flip-absolute data-flip-id="skills-backend">
			<p class="annotation text-xl text-(--accent)">Systems</p>
			<h3 class="skill-heading">Backend</h3>
			<div class="skill-cloud">
				{#each skills.backend as item (item)}
					<span class="accent-chip">{item}</span>
				{/each}
			</div>
		</article>

		<article class="hand-card hand-tilt-c skill-card" data-flip-absolute data-flip-id="skills-tooling">
			<p class="annotation text-xl text-(--accent)">Delivery</p>
			<h3 class="skill-heading">Tooling</h3>
			<div class="skill-cloud">
				{#each skills.tooling as item (item)}
					<span class="accent-chip">{item}</span>
				{/each}
			</div>
		</article>
	</div>
{/if}
