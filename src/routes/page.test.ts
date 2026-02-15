import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';
import Page from './+page.svelte';
import { portfolio } from '$lib/content/portfolio';

describe('portfolio page', () => {
	it('renders hero and key sections', () => {
		const { body } = render(Page, { props: { data: { portfolio } } });

		expect(body).toContain('Senior Frontend &amp; Full-Stack Engineer');
		expect(body).toContain('Bento Highlights');
		expect(body).toContain('Projects');
		expect(body).toContain('Skills');
	});
});
