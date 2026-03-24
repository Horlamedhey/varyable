<script lang="ts">
	import { isViewTransitioning, setViewMode, viewMode, type ViewMode } from '$lib/stores/view-mode';

	const options: { label: string; value: ViewMode }[] = [
		{ label: 'Focused', value: 'focused' },
		{ label: 'Expressive', value: 'expressive' }
	];
</script>

<div class="view-mode-control" aria-label="View mode" role="group">
	<span class="view-mode-label">View</span>
	<div
		class={`view-mode-switch ${$viewMode === 'expressive' ? 'is-expressive' : ''} ${
			$isViewTransitioning ? 'is-transitioning' : ''
		}`}
		data-view-mode={$viewMode}
	>
		<span aria-hidden="true" class="view-mode-pill"></span>

		{#each options as option (option.value)}
			<button
				aria-pressed={$viewMode === option.value}
				class={`view-mode-option ${$viewMode === option.value ? 'is-active' : ''}`}
				onclick={() => setViewMode(option.value)}
				type="button"
			>
				{option.label}
			</button>
		{/each}
	</div>
</div>
