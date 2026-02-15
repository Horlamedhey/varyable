<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import BentoHighlights from '$lib/components/BentoHighlights.svelte';
	import ExperienceTimeline from '$lib/components/ExperienceTimeline.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import ContactCTA from '$lib/components/ContactCTA.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { NavSection } from '$lib/types/portfolio';
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
	const currentYear = new Date().getFullYear();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
		})
	);

	onMount(() => {
		const sectionElements = navSections
			.map((section) => document.getElementById(section.id))
			.filter((section): section is HTMLElement => section instanceof HTMLElement);

		if (sectionElements.length === 0) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const visibleEntries = entries.filter((entry) => entry.isIntersecting);
				if (visibleEntries.length === 0) {
					return;
				}

				visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				activeSection = visibleEntries[0].target.id;
			},
			{
				rootMargin: '-32% 0px -52% 0px',
				threshold: [0.15, 0.35, 0.65]
			}
		);

		for (const element of sectionElements) {
			observer.observe(element);
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<title>{portfolio.seo.title}</title>
	<meta name="description" content={portfolio.seo.description} />
	<link rel="canonical" href={portfolio.seo.siteUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={portfolio.seo.title} />
	<meta property="og:description" content={portfolio.seo.description} />
	<meta property="og:url" content={portfolio.seo.siteUrl} />
	<meta property="og:image" content={portfolio.seo.image} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={portfolio.seo.title} />
	<meta name="twitter:description" content={portfolio.seo.description} />
	<script type="application/ld+json">{personJsonLd}</script>
</svelte:head>

<Navbar activeSection={activeSection} brand={portfolio.brand} sections={navSections} />

<div class="relative">
	<div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(45,212,191,0.09),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(79,124,255,0.14),transparent_38%),radial-gradient(circle_at_30%_80%,rgba(45,212,191,0.07),transparent_36%)]" aria-hidden="true"></div>

	<main class="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-6 pt-28 sm:px-6 lg:px-8 lg:pt-32">
		<section class="scroll-mt-28" data-section id="hero">
			<Hero hero={portfolio.hero} />
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

	<Footer year={currentYear} />
</div>
