<script lang="ts">
	import type { HighlightsData } from '$lib/types/portfolio';

	let { highlights } = $props<{ highlights: HighlightsData }>();
</script>

<div class="grid gap-4 md:grid-cols-6">
	<article class="hand-card hand-tilt-b md:col-span-4 p-5 sm:p-6">
		<h2 class="text-2xl font-extrabold text-(--text)">Impact Metrics</h2>
		<p class="annotation text-xl text-(--accent)">Proof over promises</p>
		<div class="mt-5 grid gap-4 sm:grid-cols-3">
			{#each highlights.metrics as metric (metric.label)}
				<div class="rounded-2xl border border-(--border) bg-black/20 p-4">
					<p class="text-3xl font-black text-(--text)">{metric.value}</p>
					<p class="mt-1 text-sm font-semibold text-(--text)">{metric.label}</p>
					<p class="mt-2 text-xs text-(--muted)">{metric.context}</p>
				</div>
			{/each}
		</div>
	</article>

	<article class="hand-card hand-tilt-c md:col-span-2 p-5 sm:p-6">
		<h3 class="text-xl font-bold text-(--text)">Core Strengths</h3>
		<ul class="mt-4 space-y-2 text-sm text-(--muted)">
			{#each highlights.strengths as strength (strength)}
				<li class="flex items-start gap-2"><span aria-hidden="true" class="mt-2 h-1.5 w-1.5 rounded-full bg-(--accent)"></span>{strength}</li>
			{/each}
		</ul>
	</article>

	<article class="hand-card hand-tilt-a md:col-span-2 p-5 sm:p-6">
		<h3 class="text-xl font-bold text-(--text)">Toolbox</h3>
		<div class="mt-4 flex flex-wrap gap-2">
			{#each highlights.toolbox as tool (tool)}
				<span class="accent-chip">{tool}</span>
			{/each}
		</div>
	</article>

	<article class="hand-card hand-tilt-b md:col-span-2 p-5 sm:p-6">
		<h3 class="text-xl font-bold text-(--text)">Component System</h3>
		<ul class="mt-4 space-y-2 text-sm text-(--muted)">
			{#each highlights.componentSystem as item (item)}
				<li class="flex items-start gap-2"><span aria-hidden="true" class="mt-2 h-1.5 w-1.5 rounded-full bg-(--accent)"></span>{item}</li>
			{/each}
		</ul>
	</article>

	<article class="hand-card hand-tilt-c md:col-span-2 p-5 sm:p-6">
		<h3 class="text-xl font-bold text-(--text)">Now Building</h3>
		<ul class="mt-4 space-y-2 text-sm text-(--muted)">
			{#each highlights.now as item (item)}
				<li class="flex items-start gap-2"><span aria-hidden="true" class="mt-2 h-1.5 w-1.5 rounded-full bg-(--accent)"></span>{item}</li>
			{/each}
		</ul>
	</article>
</div>
