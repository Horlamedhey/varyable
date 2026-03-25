import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';
import Page from './+page.svelte';
import { portfolio } from '$lib/content/portfolio';

describe('portfolio page', () => {
	it('renders hero and key sections', () => {
		const { body, head } = render(Page, { props: { data: { portfolio, initialViewMode: 'focused' } } });

		expect(body).toContain('Senior Frontend &amp; Full-Stack Engineer');
		expect(body).toContain('Focused');
		expect(body).toContain('Expressive');
		expect(body).toContain('data-flip-id="section-hero"');
		expect(body).toContain('data-flip-id="hero-shell"');
		expect(body).toContain('data-flip-id="mode-switch"');
		expect(body).toContain('Bento Highlights');
		expect(body).toContain('Projects');
		expect(body).toContain('Skills');
		expect(head).toContain('property="og:image"');
		expect(head).toContain('content="https://varyable.dev/og-image.png"');
		expect(head).toContain('name="twitter:image"');
	});

	it('renders the expressive branch when the request mode is expressive', () => {
		const { body } = render(Page, { props: { data: { portfolio, initialViewMode: 'expressive' } } });

		expect(body).toContain('Section navigation');
		expect(body).not.toContain('Primary navigation');
		expect(body).toContain('data-flip-id="section-dock"');
	});
});
