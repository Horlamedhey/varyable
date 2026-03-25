<script lang="ts">
	import { browser } from '$app/environment';
	import type { HighlightsData } from '$lib/types/portfolio';
	import { viewMode, type ViewMode } from '$lib/stores/view-mode';

	let { highlights, mode = 'focused' } = $props<{ highlights: HighlightsData; mode?: ViewMode }>();
	const renderMode = $derived(browser ? $viewMode : mode);
</script>

{#if renderMode === 'focused'}
	<div class="grid gap-4 md:grid-cols-6" data-flip-absolute data-flip-id="highlights-shell">
		<article class="hand-card hand-tilt-b p-5 sm:p-6 md:col-span-4">
			<h2 class="text-2xl font-extrabold text-(--text)">Impact Metrics</h2>
			<p class="annotation text-xl text-(--accent)">Proof over promises</p>
			<div class="mt-5 grid gap-4 sm:grid-cols-3">
				{#each highlights.metrics as metric (metric.label)}
					<div
						class="rounded-2xl border border-(--border) bg-black/20 p-4"
						data-flip-absolute
						data-flip-id={`metric-${metric.label}`}
					>
						<p class="text-3xl font-black text-(--text)">{metric.value}</p>
						<p class="mt-1 text-sm font-semibold text-(--text)">{metric.label}</p>
						<p class="mt-2 text-xs text-(--muted)">{metric.context}</p>
					</div>
				{/each}
			</div>
		</article>

		<article class="hand-card hand-tilt-c p-5 sm:p-6 md:col-span-2" data-flip-absolute data-flip-id="strengths-panel">
			<h3 class="text-xl font-bold text-(--text)">Core Strengths</h3>
			<ul class="mt-4 space-y-2 text-sm text-(--muted)">
				{#each highlights.strengths as strength (strength)}
					<li class="flex items-start gap-2">
						<span aria-hidden="true" class="mt-2 h-1.5 w-1.5 rounded-full bg-(--accent)"></span>
						{strength}
					</li>
				{/each}
			</ul>
		</article>

		<article class="hand-card hand-tilt-a p-5 sm:p-6 md:col-span-2" data-flip-absolute data-flip-id="toolbox-panel">
			<h3 class="text-xl font-bold text-(--text)">Toolbox</h3>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each highlights.toolbox as tool (tool)}
					<span class="accent-chip">{tool}</span>
				{/each}
			</div>
		</article>

		<article class="hand-card hand-tilt-b p-5 sm:p-6 md:col-span-2" data-flip-absolute data-flip-id="component-system-panel">
			<h3 class="text-xl font-bold text-(--text)">Component System</h3>
			<ul class="mt-4 space-y-2 text-sm text-(--muted)">
				{#each highlights.componentSystem as item (item)}
					<li class="flex items-start gap-2">
						<span aria-hidden="true" class="mt-2 h-1.5 w-1.5 rounded-full bg-(--accent)"></span>
						{item}
					</li>
				{/each}
			</ul>
		</article>

		<article class="hand-card hand-tilt-c p-5 sm:p-6 md:col-span-2" data-flip-absolute data-flip-id="now-panel">
			<h3 class="text-xl font-bold text-(--text)">Now Building</h3>
			<ul class="mt-4 space-y-2 text-sm text-(--muted)">
				{#each highlights.now as item (item)}
					<li class="flex items-start gap-2">
						<span aria-hidden="true" class="mt-2 h-1.5 w-1.5 rounded-full bg-(--accent)"></span>
						{item}
					</li>
				{/each}
			</ul>
		</article>
	</div>
{:else}
	<div class="highlights-stack" data-flip-absolute data-flip-id="highlights-shell">
		<div class="metrics-row">
			{#each highlights.metrics as metric, index (metric.label)}
				<article
					class={`hand-card metric-card ${index === 1 ? 'hand-tilt-b' : index === 2 ? 'hand-tilt-c' : 'hand-tilt-a'}`}
					data-flip-absolute
					data-flip-id={`metric-${metric.label}`}
				>
					<p class="metric-value">{metric.value}</p>
					<h3 class="metric-label">{metric.label}</h3>
					<p class="metric-context">{metric.context}</p>
				</article>
			{/each}
		</div>

		<div class="notes-grid">
			<article class="hand-card hand-tilt-a note-panel" data-flip-absolute data-flip-id="strengths-panel">
				<div class="panel-heading">
					<h3>Strengths</h3>
					<span aria-hidden="true" class="panel-doodle"></span>
				</div>

				<ul class="hand-list">
					{#each highlights.strengths as strength (strength)}
						<li>{strength}</li>
					{/each}
				</ul>

				<div class="mini-note" data-flip-absolute data-flip-id="component-system-panel">
					<p class="annotation">Component craft</p>
					<ul class="hand-list compact">
						{#each highlights.componentSystem as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			</article>

			<article class="hand-card hand-tilt-c note-panel" data-flip-absolute data-flip-id="toolbox-panel">
				<div class="panel-heading">
					<h3>Toolbox</h3>
					<span aria-hidden="true" class="panel-doodle panel-doodle-right"></span>
				</div>

				<div class="tool-list">
					{#each highlights.toolbox as tool (tool)}
						<span class="tool-row">{tool}</span>
					{/each}
				</div>

				<div class="mini-note" data-flip-absolute data-flip-id="now-panel">
					<p class="annotation">Now building</p>
					<ul class="hand-list compact">
						{#each highlights.now as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			</article>
		</div>
	</div>
{/if}
