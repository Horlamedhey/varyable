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

	it('shows coming-soon labels when URLs are empty', () => {
		const { body } = render(Projects, { props: { projects: portfolio.projects } });

		expect(body).toContain('Live (Coming soon)');
		expect(body).toContain('Repo (Coming soon)');
		expect(body).toContain('Case Study (Coming soon)');
	});

	it('renders show-all button when all-project count is larger than default viewport slice', () => {
		const { body } = render(Projects, { props: { projects: portfolio.projects } });

		expect(body).toContain('Show all projects');
	});
});
