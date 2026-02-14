import { describe, expect, it } from 'vitest';
import { getInitialProjectCount, getVisibleProjects, hasFilledLink } from '$lib/utils/projects';
import { portfolio } from '$lib/content/portfolio';

describe('projects utilities', () => {
	it('returns responsive project counts', () => {
		expect(getInitialProjectCount(390)).toBe(3);
		expect(getInitialProjectCount(900)).toBe(4);
		expect(getInitialProjectCount(1280)).toBe(6);
	});

	it('returns collapsed and expanded project sets correctly', () => {
		const projects = portfolio.projects.all;
		expect(getVisibleProjects(projects, false, 3)).toHaveLength(3);
		expect(getVisibleProjects(projects, true, 3)).toHaveLength(projects.length);
	});

	it('treats whitespace links as empty', () => {
		expect(hasFilledLink('')).toBe(false);
		expect(hasFilledLink('   ')).toBe(false);
		expect(hasFilledLink('https://example.com')).toBe(true);
	});
});
