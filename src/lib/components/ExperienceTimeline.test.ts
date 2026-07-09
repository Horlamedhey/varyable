import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';
import ExperienceTimeline from '$lib/components/ExperienceTimeline.svelte';
import { portfolio } from '$lib/content/portfolio';

describe('ExperienceTimeline component', () => {
	it.each(['focused', 'expressive'] as const)(
		'renders four roles and a collapsed stack by default in %s mode',
		(mode) => {
			const { body } = render(ExperienceTimeline, {
				props: { experience: portfolio.experience, mode }
			});

			expect(body).toContain('Noema');
			expect(body).toContain('CodeVillage LLC');
			expect(body).toContain('Fluidangle LLC');
			expect(body).toContain('5 more roles');
			expect(body).toContain('aria-expanded="false"');
			expect(body).toContain('experience-overflow-collapsed');
			expect(body).toContain('aria-hidden="true"');
			expect(body.match(/data-flip-id="experience-(?!shell)/g)).toHaveLength(9);
		}
	);
});
