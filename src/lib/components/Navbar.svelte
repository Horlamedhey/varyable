<script lang="ts">
	import type { BrandData, NavSection } from '$lib/types/portfolio';
	import { onMount } from 'svelte';

	let { brand, sections, activeSection } = $props<{
		brand: BrandData;
		sections: NavSection[];
		activeSection: string;
	}>();

	let isScrolled = $state(false);

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 48;
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header
	class={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-sm' : ''}`}
>
	<div class="mx-auto max-w-6xl px-4 pt-3 sm:px-6 lg:px-8">
		<div
			class={`flex items-center justify-between gap-4 px-4 py-3 sm:px-5 transition-all duration-300 ${
				isScrolled ? 'hand-nav' : 'border border-transparent bg-transparent shadow-none'
			}`}
		>
			<a href="#hero" class="group inline-flex flex-col leading-tight">
				<span class="annotation text-2xl text-(--accent) sm:text-3xl">{brand.tag}</span>
			</a>

			<nav class="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
				{#each sections as section (section.id)}
					<a
						href={`#${section.id}`}
						class={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
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
	</div>
</header>
