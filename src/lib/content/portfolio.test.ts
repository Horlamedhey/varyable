import { describe, expect, it } from 'vitest';
import { portfolio } from '$lib/content/portfolio';

describe('portfolio content contract', () => {
	it('keeps the complete resume experience timeline', () => {
		expect(portfolio.experience.map(({ company, role, period }) => ({ company, role, period }))).toEqual([
			{
				company: 'Noema',
				role: 'Senior Frontend Engineer',
				period: 'Feb 2025 - Present'
			},
			{
				company: 'Rb2',
				role: 'Senior Frontend Engineer (Full-Stack Contributions)',
				period: 'Jan 2022 - Sep 2025'
			},
			{
				company: 'PodCreator UG',
				role: 'Senior Frontend Engineer',
				period: 'May 2024 - Jul 2024'
			},
			{
				company: 'CodeVillage LLC',
				role: 'Senior Mobile Engineer',
				period: 'Feb 2024 - May 2024'
			},
			{
				company: 'Fluidangle LLC',
				role: 'Lead Mobile Engineer',
				period: 'Sep 2021 - Dec 2021'
			},
			{
				company: 'Aitechma',
				role: 'Senior Frontend Engineer',
				period: 'Jun 2021 - Sep 2021'
			},
			{
				company: 'Footprint Intelligence',
				role: 'Software Engineering Manager (Hands-on)',
				period: 'Sep 2020 - Jan 2022'
			},
			{
				company: 'Anyskills Inc.',
				role: 'Frontend Engineer',
				period: 'Jul 2019 - Aug 2020'
			},
			{
				company: 'Override Digital Agency',
				role: 'Mobile & Full Stack Developer',
				period: 'Jul 2017 - Jun 2019'
			}
		]);
	});

	it('keeps project narratives focused on impact', () => {
		const projects = [...portfolio.projects.featured, ...portfolio.projects.all];

		for (const project of projects) {
			expect(project).toHaveProperty('impact');
			expect(project).not.toHaveProperty('problem');
			expect(project).not.toHaveProperty('approach');
			expect(project).not.toHaveProperty('result');
		}
	});

	it('ensures all projects include required link keys', () => {
		for (const project of portfolio.projects.featured) {
			expect(project.links).toHaveProperty('live');
			expect(project.links).toHaveProperty('repo');
		}

		for (const project of portfolio.projects.all) {
			expect(project.links).toHaveProperty('live');
			expect(project.links).toHaveProperty('repo');
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
