<script lang="ts">
	import { onMount } from 'svelte';
	import type { ProjectItem, ProjectsData } from '$lib/types/portfolio';
	import { getInitialProjectCount, getVisibleProjects, hasFilledLink } from '$lib/utils/projects';

	let { projects } = $props<{ projects: ProjectsData }>();

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

	function linkState(url: string, label: string): { href: string; label: string; enabled: boolean } {
		if (hasFilledLink(url)) {
			return { href: url, label, enabled: true };
		}

		return { href: '#', label: `${label} (Coming soon)`, enabled: false };
	}

	function projectLinks(project: ProjectItem): { href: string; label: string; enabled: boolean }[] {
		return [
			linkState(project.links.live, 'Live'),
			linkState(project.links.repo, 'Repo'),
			linkState(project.links.caseStudy, 'Case Study')
		];
	}

	function uniqueKey(project: ProjectItem, suffix: string): string {
		return `${project.slug}-${suffix}`;
	}
</script>

<div class="space-y-8">
	<div>
		<p class="annotation text-2xl text-(--accent)">Show your strongest work first</p>
		<h3 class="mt-1 text-3xl font-black tracking-[-0.02em] text-(--text)">Featured Projects</h3>
	</div>
	<div class="grid gap-5 md:grid-cols-2">
		{#each projects.featured as project, index (uniqueKey(project, `featured-${index}`))}
			<article class="hand-card p-6" style={`--tilt:${index % 2 === 0 ? '-0.5deg' : '0.5deg'}`}>
				<h4 class="text-2xl font-extrabold text-(--text)">{project.name}</h4>
				<p class="mt-2 text-sm text-(--muted)">{project.blurb}</p>
				<dl class="mt-4 space-y-2 text-sm">
					<div>
						<dt class="font-semibold text-(--text)">Problem</dt>
						<dd class="text-(--muted)">{project.problem}</dd>
					</div>
					<div>
						<dt class="font-semibold text-(--text)">Approach</dt>
						<dd class="text-(--muted)">{project.approach}</dd>
					</div>
					<div>
						<dt class="font-semibold text-(--text)">Result</dt>
						<dd class="text-(--muted)">{project.result}</dd>
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
		<div class="mb-4 flex items-center justify-between gap-4">
			<h3 class="text-2xl font-extrabold text-(--text)">All Projects</h3>
			{#if canToggle}
				<button class="btn-secondary" onclick={toggleExpanded} type="button">
					{expanded ? 'Show less' : 'Show all projects'}
				</button>
			{/if}
		</div>
		<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
			{#each visibleProjects as project, index (uniqueKey(project, `all-${index}`))}
				<article class="hand-card p-5 text-sm" style={`--tilt:${index % 3 === 0 ? '-0.7deg' : index % 3 === 1 ? '0.6deg' : '-0.2deg'}`}>
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
	</div>
</div>
