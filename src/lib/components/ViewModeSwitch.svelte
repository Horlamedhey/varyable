<script lang="ts">
	import { browser } from '$app/environment';
	import { isViewTransitioning, setViewMode, viewMode, type ViewMode } from '$lib/stores/view-mode';

	let { mode = 'focused' } = $props<{ mode?: ViewMode }>();
	const renderMode = $derived(browser ? $viewMode : mode);

	const options: { label: string; value: ViewMode }[] = [
		{ label: 'Focused', value: 'focused' },
		{ label: 'Expressive', value: 'expressive' }
	];
</script>

<div class="view-mode-control" aria-label="View mode" role="group">
	<span class="view-mode-label">View</span>
	<div
		class={`view-mode-switch ${renderMode === 'expressive' ? 'is-expressive' : ''} ${
			$isViewTransitioning ? 'is-transitioning' : ''
		}`}
		data-view-mode={renderMode}
	>
		<span aria-hidden="true" class="view-mode-pill"></span>

		{#each options as option (option.value)}
			<button
				aria-pressed={renderMode === option.value}
				class={`view-mode-option ${renderMode === option.value ? 'is-active' : ''}`}
				onclick={() => setViewMode(option.value)}
				type="button"
			>
				{option.label}
			</button>
		{/each}
	</div>
</div>
