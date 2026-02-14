<script lang="ts">
	import type { ExperienceItem } from '$lib/types/portfolio';

	let { experience } = $props<{ experience: ExperienceItem[] }>();
</script>

<div class="relative space-y-6 pl-5 before:absolute before:bottom-0 before:left-1 before:top-1 before:w-px before:bg-[linear-gradient(180deg,var(--accent),transparent)]">
	{#each experience as item, index (item.company)}
		<article class="hand-card hand-tilt-b p-5 sm:p-6" style={`--tilt:${index % 2 === 0 ? '-0.6deg' : '0.6deg'}`}>
			<div class="absolute -left-7 mt-1 h-4 w-4 rounded-full border-2 border-(--accent) bg-(--bg) shadow-[0_0_0_5px_rgba(23,31,42,0.8)]" aria-hidden="true"></div>
			<p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent)">{item.period}</p>
			<h3 class="mt-2 text-2xl font-extrabold text-(--text)">{item.company}</h3>
			<p class="text-sm font-semibold text-(--text)/80">{item.role}</p>
			<ul class="mt-4 space-y-2 text-sm text-(--muted)">
				{#each item.bullets as bullet (bullet)}
					<li class="flex items-start gap-2"><span aria-hidden="true" class="mt-2 h-1.5 w-1.5 rounded-full bg-(--accent)"></span>{bullet}</li>
				{/each}
			</ul>
		</article>
	{/each}
</div>
