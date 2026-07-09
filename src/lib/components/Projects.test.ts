import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';
import Projects from '$lib/components/Projects.svelte';
import { portfolio } from '$lib/content/portfolio';

describe('Projects component', () => {
	it('renders featured and all-project section headings', () => {
		const { body } = render(Projects, { props: { projects: portfolio.projects } });

		expect(body).toContain('Featured Projects');
		expect(body).toContain('All Projects');
	});

	it('renders only available project actions', () => {
		const { body } = render(Projects, { props: { projects: portfolio.projects } });

		expect(body).not.toContain('Repo (Coming soon)');
		expect(body).toContain('>Repo</a>');
		expect(body).toContain('href="https://github.com/Horlamedhey/trading"');
	});

	it('marks Gistable live access as coming soon', () => {
		const gistable = portfolio.projects.all.find((project) => project.slug === 'gistable-mvp');
		expect(gistable).toBeDefined();

		const projects = { featured: [gistable!], all: [gistable!] };
		const { body } = render(Projects, { props: { projects } });

		expect(body).toContain('Live (Coming soon)');
		expect(body).not.toContain('>Repo</a>');
	});

	it('opens every enabled project link in a new tab', () => {
		const { body } = render(Projects, { props: { projects: portfolio.projects } });
		const enabledLinks = body.match(/<a class="project-link"[^>]*>/g) ?? [];

		expect(enabledLinks.length).toBeGreaterThan(0);
		for (const link of enabledLinks) {
			expect(link).toContain('target="_blank"');
			expect(link).toContain('rel="noreferrer"');
		}
	});

	it.each(['focused', 'expressive'] as const)(
		'renders the centered show-all button after the project grid in %s mode',
		(mode) => {
			const { body } = render(Projects, { props: { projects: portfolio.projects, mode } });
			const lastProjectIndex = body.lastIndexOf('project-catalog-');
			const toggleIndex = body.indexOf('Show all projects');

			expect(body).toContain('class="mt-10 flex justify-center"');
			expect(toggleIndex).toBeGreaterThan(lastProjectIndex);
		}
	);
});
