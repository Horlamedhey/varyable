<script lang="ts">
	import BentoHighlights from '$lib/components/BentoHighlights.svelte';
	import ContactCTA from '$lib/components/ContactCTA.svelte';
	import ExperienceTimeline from '$lib/components/ExperienceTimeline.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import { viewMode } from '$lib/stores/view-mode';
	import type { NavSection } from '$lib/types/portfolio';
	import { onMount, tick } from 'svelte';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
	const portfolio = $derived(data.portfolio);

	const navSections: NavSection[] = [
		{ id: 'hero', label: 'Home' },
		{ id: 'highlights', label: 'Highlights' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'contact', label: 'Contact' }
	];

	let activeSection = $state('hero');
	let pinnedSectionId = $state<string | null>(null);
	let pinnedSectionUntil = $state(0);
	const currentYear = new Date().getFullYear();

	function setActiveSection(sectionId: string) {
		pinnedSectionId = sectionId;
		pinnedSectionUntil = Date.now() + 1400;
		activeSection = sectionId;
	}

	function updateActiveSection() {
		if (typeof window === 'undefined') {
			return;
		}

		const sectionElements = navSections
			.map((section) => ({
				id: section.id,
				element: document.getElementById(section.id)
			}))
			.filter(
				(
					section
				): section is {
					id: string;
					element: HTMLElement;
				} => section.element instanceof HTMLElement
			);

		if (sectionElements.length === 0) {
			return;
		}

		const activationOffset = Math.max(96, Math.min(window.innerHeight * 0.18, 180));
		const currentPosition = window.scrollY + activationOffset;
		const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
		let nextActiveSection = navSections[0].id;

		if (pinnedSectionId) {
			if (Date.now() < pinnedSectionUntil) {
				activeSection = pinnedSectionId;
				return;
			}

			const pinnedSection = sectionElements.find((section) => section.id === pinnedSectionId);
			if (pinnedSection) {
				const pinnedDistance = Math.abs(pinnedSection.element.offsetTop - currentPosition);
				const shouldKeepPinned =
					pinnedDistance <= Math.max(160, window.innerHeight * 0.22) ||
					(window.scrollY >= maxScroll - 2 &&
						(pinnedSectionId === 'skills' || pinnedSectionId === 'contact'));

				if (shouldKeepPinned) {
					activeSection = pinnedSectionId;
					return;
				}

				if (pinnedDistance > window.innerHeight * 0.85) {
					pinnedSectionId = null;
				}
			} else {
				pinnedSectionId = null;
			}
		}

		for (const section of sectionElements) {
			if (section.element.offsetTop <= currentPosition) {
				nextActiveSection = section.id;
			}
		}

		activeSection = nextActiveSection;
	}

	const personJsonLd = $derived.by(() =>
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: portfolio.brand.name,
			jobTitle: portfolio.brand.role,
			description: portfolio.seo.description,
			url: portfolio.seo.siteUrl,
			email: portfolio.contact.email,
			homeLocation: portfolio.hero.location,
			sameAs: [
				portfolio.hero.profiles.github,
				portfolio.hero.profiles.linkedin,
				portfolio.hero.profiles.stackoverflow
			]
		}).replaceAll('<', '\\u003c')
	);

	onMount(() => {
		updateActiveSection();
		window.addEventListener('scroll', updateActiveSection, { passive: true });
		window.addEventListener('resize', updateActiveSection);
		window.addEventListener('hashchange', updateActiveSection);

		return () => {
			window.removeEventListener('scroll', updateActiveSection);
			window.removeEventListener('resize', updateActiveSection);
			window.removeEventListener('hashchange', updateActiveSection);
		};
	});

	$effect(() => {
		let cancelled = false;

		void tick().then(() => {
			if (cancelled || typeof window === 'undefined') {
				return;
			}

			updateActiveSection();
		});

		return () => {
			cancelled = true;
		};
	});
</script>

<svelte:head>
	<title>{portfolio.seo.title}</title>
	<meta name="description" content={portfolio.seo.description} />
	<link rel="canonical" href={portfolio.seo.siteUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={portfolio.seo.siteName} />
	<meta property="og:title" content={portfolio.seo.title} />
	<meta property="og:description" content={portfolio.seo.description} />
	<meta property="og:url" content={portfolio.seo.siteUrl} />
	<meta property="og:image" content={portfolio.seo.image} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={portfolio.seo.title} />
	<meta name="twitter:description" content={portfolio.seo.description} />
	<svelte:element this={"script"} type="application/ld+json">{personJsonLd}</svelte:element>
</svelte:head>

{#if $viewMode === 'focused'}
	<Navbar
		activeSection={activeSection}
		brand={portfolio.brand}
		onSectionSelect={setActiveSection}
		sections={navSections}
	/>

	<div class="relative">
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(45,212,191,0.09),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(79,124,255,0.14),transparent_38%),radial-gradient(circle_at_30%_80%,rgba(45,212,191,0.07),transparent_36%)]"
		></div>

		<main class="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-6 pt-28 sm:px-6 lg:px-8 lg:pt-32">
			<section class="scroll-mt-28" data-section id="hero">
				<Hero hero={portfolio.hero} name={portfolio.brand.name} tag={portfolio.brand.tag} />
			</section>

			<div aria-hidden="true" class="squiggle-separator"></div>

			<section class="scroll-mt-28" data-section id="highlights">
				<header class="mb-5">
					<p class="annotation text-2xl text-(--accent)">Scan me in seconds</p>
					<h2 class="text-3xl font-black tracking-[-0.03em] text-(--text)">Bento Highlights</h2>
				</header>
				<BentoHighlights highlights={portfolio.highlights} />
			</section>

			<div aria-hidden="true" class="squiggle-separator"></div>

			<section class="scroll-mt-28" data-section id="experience">
				<header class="mb-5">
					<p class="annotation text-2xl text-(--accent)">Execution history</p>
					<h2 class="text-3xl font-black tracking-[-0.03em] text-(--text)">Experience Timeline</h2>
				</header>
				<ExperienceTimeline experience={portfolio.experience} />
			</section>

			<div aria-hidden="true" class="squiggle-separator"></div>

			<section class="scroll-mt-28" data-section id="projects">
				<header class="mb-5">
					<p class="annotation text-2xl text-(--accent)">Outcomes and depth</p>
					<h2 class="text-3xl font-black tracking-[-0.03em] text-(--text)">Projects</h2>
				</header>
				<Projects projects={portfolio.projects} />
			</section>

			<div aria-hidden="true" class="squiggle-separator"></div>

			<section class="scroll-mt-28" data-section id="skills">
				<header class="mb-5">
					<p class="annotation text-2xl text-(--accent)">Practical toolkit</p>
					<h2 class="text-3xl font-black tracking-[-0.03em] text-(--text)">Skills</h2>
				</header>
				<Skills skills={portfolio.skills} />
			</section>

			<div aria-hidden="true" class="squiggle-separator"></div>

			<section class="scroll-mt-28" data-section id="contact">
				<ContactCTA contact={portfolio.contact} />
			</section>
		</main>

		<Footer year={currentYear} name={portfolio.brand.name} />
	</div>
{:else}
	<div class="page-scene">
		<main class="page-canvas">
			<section class="portfolio-board scroll-mt-24" data-section id="hero">
				<Navbar
					activeSection={activeSection}
					brand={portfolio.brand}
					onSectionSelect={setActiveSection}
					sections={navSections}
				/>

				<div class="board-body">
					<Hero hero={portfolio.hero} name={portfolio.brand.name} tag={portfolio.brand.tag} />

					<div aria-hidden="true" class="board-divider"></div>

					<section class="scroll-mt-28" data-section id="highlights">
						<header class="section-heading section-heading-inline">
							<p class="section-kicker">Scan it in one glance</p>
							<h2 class="section-title">Bento Highlights</h2>
							<p class="section-subtitle">
								Strong outcomes, sharper frontend craft, and the tools behind the work.
							</p>
						</header>
						<BentoHighlights highlights={portfolio.highlights} />
					</section>
				</div>
			</section>

			<section class="folio-sheet scroll-mt-28" data-section id="experience">
				<header class="section-heading">
					<p class="section-kicker">Execution history</p>
					<h2 class="section-title">Experience Timeline</h2>
					<p class="section-subtitle">
						Product work across frontend, full-stack delivery, and platform leadership.
					</p>
				</header>
				<ExperienceTimeline experience={portfolio.experience} />
			</section>

			<section class="folio-sheet scroll-mt-28" data-section id="projects">
				<header class="section-heading">
					<p class="section-kicker">Outcomes and depth</p>
					<h2 class="section-title">Projects</h2>
					<p class="section-subtitle">
						Selected case studies first, followed by the broader project archive.
					</p>
				</header>
				<Projects projects={portfolio.projects} />
			</section>

			<section class="folio-sheet scroll-mt-28" data-section id="skills">
				<header class="section-heading">
					<p class="section-kicker">Practical toolkit</p>
					<h2 class="section-title">Skills</h2>
					<p class="section-subtitle">
						The stack I rely on when shipping production-grade product work.
					</p>
				</header>
				<Skills skills={portfolio.skills} />
			</section>

			<section class="scroll-mt-28" data-section id="contact">
				<ContactCTA contact={portfolio.contact} />
			</section>
		</main>

		<nav aria-label="Section navigation" class="section-dock">
			{#each navSections as section (section.id)}
				<a
					href={`#${section.id}`}
					onclick={() => setActiveSection(section.id)}
					aria-current={activeSection === section.id ? 'page' : undefined}
					class={`dock-link ${activeSection === section.id ? 'is-active' : ''}`}
				>
					{section.label}
				</a>
			{/each}
			<a class="dock-link dock-link-secondary" href={portfolio.hero.secondaryCta.href}>Resume</a>
		</nav>

		<Footer year={currentYear} name={portfolio.brand.name} />
	</div>
{/if}
