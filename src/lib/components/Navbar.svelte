<script lang="ts">
	import { browser } from '$app/environment';
	import type { BrandData, NavSection } from '$lib/types/portfolio';
	import { onMount } from 'svelte';
	import ViewModeSwitch from '$lib/components/ViewModeSwitch.svelte';
	import { viewMode, type ViewMode } from '$lib/stores/view-mode';

	let { brand, sections, activeSection, onSectionSelect, mode = 'focused' } = $props<{
		brand: BrandData;
		sections: NavSection[];
		activeSection: string;
		onSectionSelect?: (sectionId: string) => void;
		mode?: ViewMode;
	}>();

	let isScrolled = $state(false);
	const renderMode = $derived(browser ? $viewMode : mode);
	const activeLabel = $derived(
		sections.find((section: NavSection) => section.id === activeSection)?.label ?? 'Home'
	);

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > (renderMode === 'focused' ? 48 : 32);
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

{#if renderMode === 'focused'}
	<header class={`fixed inset-x-0 top-0 z-50 ${isScrolled ? 'backdrop-blur-sm' : ''}`}>
		<div class="relative mx-auto max-w-6xl px-4 pt-3 sm:px-6 lg:px-8">
			<div
				class={`nav-shell-subtle flex items-center justify-between gap-4 px-4 py-3 sm:px-5 ${isScrolled ? 'nav-shell-visible' : ''}`}
				data-flip-absolute
				data-flip-id="header-shell"
			>
				<a
					class="group inline-flex flex-col leading-tight"
					data-flip-id="brand-lockup"
					href="#hero"
				>
					<span class="annotation text-2xl text-(--accent) sm:text-3xl">{brand.tag}</span>
				</a>

				<nav
					aria-label="Primary navigation"
					class="hidden items-center gap-2 md:flex"
					data-flip-absolute
					data-flip-id="focused-nav-links"
				>
					{#each sections as section (section.id)}
							<a
								href={`#${section.id}`}
								onclick={() => onSectionSelect?.(section.id)}
								aria-current={activeSection === section.id ? 'page' : undefined}
								class={`nav-link-subtle rounded-full px-3 py-1.5 text-sm font-semibold ${
								activeSection === section.id
									? 'bg-(--accent) text-[#07140f] shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]'
									: 'text-(--text)/92 hover:bg-white/10 hover:text-(--text)'
							}`}
						>
							{section.label}
						</a>
					{/each}
				</nav>
			</div>

			<div class="absolute right-4 top-full mt-2 sm:right-6 lg:right-8">
				<ViewModeSwitch mode={renderMode} />
			</div>
		</div>
	</header>
{:else}
	<header
		class={`nav-shell-subtle ${isScrolled ? 'nav-shell-visible' : ''}`}
		data-flip-absolute
		data-flip-id="header-shell"
	>
		<div class="brand-lockup" data-flip-id="brand-lockup">
			<a href="#hero" class="brand-mark">
				<span class="brand-name">{brand.name}</span>
				<span class="brand-tag">{brand.tag}</span>
			</a>
			<p class="brand-role">{brand.role}</p>
		</div>

		<div class="utility-cluster" aria-label="Portfolio status" data-flip-id="expressive-utility">
			<span class="utility-pill utility-pill-context">Now: {activeLabel}</span>
			<a class="utility-pill utility-link utility-pill-context" href="#contact">Open</a>
			<a class="utility-pill utility-link utility-pill-context" href="/resume.pdf">CV</a>
			<div class="utility-mode-row">
				<ViewModeSwitch mode={renderMode} />
			</div>
		</div>
	</header>
{/if}
