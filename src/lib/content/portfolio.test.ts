import { describe, expect, it } from 'vitest';
import { portfolio } from '$lib/content/portfolio';

describe('portfolio content contract', () => {
	it('ensures all projects include required link keys', () => {
		for (const project of portfolio.projects.featured) {
			expect(project.links).toHaveProperty('live');
			expect(project.links).toHaveProperty('repo');
			expect(project.links).toHaveProperty('caseStudy');
		}

		for (const project of portfolio.projects.all) {
			expect(project.links).toHaveProperty('live');
			expect(project.links).toHaveProperty('repo');
			expect(project.links).toHaveProperty('caseStudy');
		}
	});

	it('keeps unique project slugs in all-project list', () => {
		const slugs = portfolio.projects.all.map((project) => project.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it('keeps featured projects present in all projects list', () => {
		const allSlugs = new Set(portfolio.projects.all.map((project) => project.slug));
		for (const featured of portfolio.projects.featured) {
			expect(allSlugs.has(featured.slug)).toBe(true);
		}
	});
});
