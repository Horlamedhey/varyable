<script lang="ts">
	import type { SkillsData } from '$lib/types/portfolio';

	let { skills } = $props<{ skills: SkillsData }>();
</script>

<div class="grid gap-4 md:grid-cols-3">
	<article class="hand-card hand-tilt-a p-5 sm:p-6">
		<h3 class="text-xl font-extrabold text-(--text)">Frontend</h3>
		<div class="mt-4 flex flex-wrap gap-2">
			{#each skills.frontend as item (item)}
				<span class="accent-chip">{item}</span>
			{/each}
		</div>
	</article>

	<article class="hand-card hand-tilt-b p-5 sm:p-6">
		<h3 class="text-xl font-extrabold text-(--text)">Backend</h3>
		<div class="mt-4 flex flex-wrap gap-2">
			{#each skills.backend as item (item)}
				<span class="accent-chip">{item}</span>
			{/each}
		</div>
	</article>

	<article class="hand-card hand-tilt-c p-5 sm:p-6">
		<h3 class="text-xl font-extrabold text-(--text)">Tooling</h3>
		<div class="mt-4 flex flex-wrap gap-2">
			{#each skills.tooling as item (item)}
				<span class="accent-chip">{item}</span>
			{/each}
		</div>
	</article>
</div>
