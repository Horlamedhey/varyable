<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { ProjectItem, ProjectsData } from '$lib/types/portfolio';
	import { getInitialProjectCount, getVisibleProjects, hasFilledLink } from '$lib/utils/projects';
	import { viewMode, type ViewMode } from '$lib/stores/view-mode';

	let { projects, mode = 'focused' } = $props<{ projects: ProjectsData; mode?: ViewMode }>();
	const renderMode = $derived(browser ? $viewMode : mode);

	let expanded = $state(false);
	let initialCount = $state(6);

	const visibleProjects = $derived(getVisibleProjects(projects.all, expanded, initialCount));
	const canToggle = $derived(projects.all.length > initialCount);

	function updateInitialCount() {
		initialCount = getInitialProjectCount(window.innerWidth);
	}

	function toggleExpanded() {
		expanded = !expanded;
	}

	onMount(() => {
		updateInitialCount();
		window.addEventListener('resize', updateInitialCount);

		return () => {
			window.removeEventListener('resize', updateInitialCount);
		};
	});

	function projectLinks(
		project: ProjectItem
	): { href: string; label: string; enabled: boolean }[] {
		const links: { href: string; label: string; enabled: boolean }[] = [];

		if (hasFilledLink(project.links.live)) {
			links.push({ href: project.links.live, label: 'Live', enabled: true });
		} else if (project.links.liveComingSoon) {
			links.push({ href: '#', label: 'Live (Coming soon)', enabled: false });
		}

		if (hasFilledLink(project.links.repo)) {
			links.push({ href: project.links.repo, label: 'Repo', enabled: true });
		}

		return links;
	}

	function uniqueKey(project: ProjectItem, suffix: string): string {
		return `${project.slug}-${suffix}`;
	}
</script>

{#if renderMode === 'focused'}
	<div class="space-y-8" data-flip-absolute data-flip-id="projects-shell">
		<div>
			<p class="annotation text-2xl text-(--accent)">Show your strongest work first</p>
			<h3 class="mt-1 text-3xl font-black tracking-[-0.02em] text-(--text)">Featured Projects</h3>
		</div>
		<div class="grid gap-5 md:grid-cols-2">
			{#each projects.featured as project, index (uniqueKey(project, `featured-${index}`))}
				<article
					class="hand-card p-6"
					data-flip-absolute
					data-flip-id={`project-featured-${project.slug}`}
					style={`--tilt:${index % 2 === 0 ? '-0.5deg' : '0.5deg'}`}
				>
					<h4 class="text-2xl font-extrabold text-(--text)">{project.name}</h4>
					<p class="mt-2 text-sm text-(--muted)">{project.blurb}</p>
					<dl class="mt-4 text-sm">
						<div>
							<dt class="font-semibold text-(--text)">Impact</dt>
							<dd class="text-(--muted)">{project.impact}</dd>
						</div>
					</dl>
					<div class="mt-4 flex flex-wrap gap-2">
						{#each project.tech as item (item)}
							<span class="accent-chip">{item}</span>
						{/each}
					</div>
					<div class="mt-5 flex flex-wrap gap-2">
						{#each projectLinks(project) as link (`${project.slug}-${link.label}`)}
							{#if link.enabled}
								<a class="project-link" href={link.href} rel="noreferrer" target="_blank">{link.label}</a>
							{:else}
								<span class="project-link project-link-disabled" aria-disabled="true">{link.label}</span>
							{/if}
						{/each}
					</div>
				</article>
			{/each}
		</div>

		<div>
			<div class="mb-4">
				<h3 class="text-2xl font-extrabold text-(--text)">All Projects</h3>
			</div>
			<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				{#each visibleProjects as project, index (uniqueKey(project, `all-${index}`))}
					<article
						class="hand-card p-5 text-sm"
						data-flip-absolute
						data-flip-id={`project-catalog-${project.slug}`}
						style={`--tilt:${index % 3 === 0 ? '-0.7deg' : index % 3 === 1 ? '0.6deg' : '-0.2deg'}`}
					>
						<h4 class="text-lg font-bold text-(--text)">{project.name}</h4>
						<p class="mt-2 text-(--muted)">{project.blurb}</p>
						<div class="mt-3 flex flex-wrap gap-2">
							{#each project.tech as item (item)}
								<span class="accent-chip">{item}</span>
							{/each}
						</div>
						<div class="mt-4 flex flex-wrap gap-2">
							{#each projectLinks(project) as link (`${project.slug}-${link.label}`)}
								{#if link.enabled}
									<a class="project-link" href={link.href} rel="noreferrer" target="_blank">{link.label}</a>
								{:else}
									<span class="project-link project-link-disabled" aria-disabled="true">{link.label}</span>
								{/if}
							{/each}
						</div>
					</article>
				{/each}
			</div>
			{#if canToggle}
				<div class="mt-10 flex justify-center">
					<button class="btn-secondary" onclick={toggleExpanded} type="button">
						{expanded ? 'Show less' : 'Show all projects'}
					</button>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div class="projects-stack" data-flip-absolute data-flip-id="projects-shell">
		<div>
			<p class="annotation text-2xl text-(--accent)">Show your strongest work first</p>
			<h3 class="section-subhead">Featured Projects</h3>
		</div>
		<div class="featured-grid">
			{#each projects.featured as project, index (uniqueKey(project, `featured-${index}`))}
				<article
					class="hand-card project-sheet"
					data-flip-absolute
					data-flip-id={`project-featured-${project.slug}`}
					style={`--tilt:${index % 2 === 0 ? '-0.55deg' : '0.55deg'}`}
				>
					<p class="project-kicker">Featured project</p>
					<h4 class="project-name">{project.name}</h4>
					<p class="project-blurb">{project.blurb}</p>
					<dl class="project-notes">
						<div class="project-note">
							<dt>Impact</dt>
							<dd>{project.impact}</dd>
						</div>
					</dl>

					<div class="project-meta">
						{#each project.tech as item (item)}
							<span class="accent-chip">{item}</span>
						{/each}
					</div>

					<div class="project-links">
						{#each projectLinks(project) as link (`${project.slug}-${link.label}`)}
							{#if link.enabled}
								<a class="project-link" href={link.href} rel="noreferrer" target="_blank">{link.label}</a>
							{:else}
								<span class="project-link project-link-disabled" aria-disabled="true">{link.label}</span>
							{/if}
						{/each}
					</div>
				</article>
			{/each}
		</div>

		<div>
			<div class="catalog-header">
				<div>
					<p class="annotation text-xl text-(--accent)">Full archive</p>
					<h3 class="section-subhead">All Projects</h3>
				</div>
			</div>
			<div class="project-catalog">
				{#each visibleProjects as project, index (uniqueKey(project, `all-${index}`))}
					<article
						class="hand-card catalog-card"
						data-flip-absolute
						data-flip-id={`project-catalog-${project.slug}`}
						style={`--tilt:${index % 3 === 0 ? '-0.7deg' : index % 3 === 1 ? '0.6deg' : '-0.2deg'}`}
					>
						<h4 class="catalog-name">{project.name}</h4>
						<p class="catalog-blurb">{project.blurb}</p>
						<div class="project-meta">
							{#each project.tech as item (item)}
								<span class="accent-chip">{item}</span>
							{/each}
						</div>
						<div class="project-links">
							{#each projectLinks(project) as link (`${project.slug}-${link.label}`)}
								{#if link.enabled}
									<a class="project-link" href={link.href} rel="noreferrer" target="_blank">{link.label}</a>
								{:else}
									<span class="project-link project-link-disabled" aria-disabled="true">{link.label}</span>
								{/if}
							{/each}
						</div>
					</article>
				{/each}
			</div>
			{#if canToggle}
				<div class="mt-10 flex justify-center">
					<button class="btn-secondary" onclick={toggleExpanded} type="button">
						{expanded ? 'Show less' : 'Show all projects'}
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}
