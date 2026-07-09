import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';
import ContactCTA from '$lib/components/ContactCTA.svelte';
import Hero from '$lib/components/Hero.svelte';
import { portfolio } from '$lib/content/portfolio';
import type { ViewMode } from '$lib/stores/view-mode';

const viewModes: ViewMode[] = ['focused', 'expressive'];

function expectNewTabLink(body: string, href: string): void {
	expect(body).toContain(`href="${href}" rel="noreferrer" target="_blank"`);
}

describe('external profile links', () => {
	it.each(viewModes)('opens Hero profiles in a new tab in %s mode', (mode) => {
		const { body } = render(Hero, {
			props: {
				hero: portfolio.hero,
				name: portfolio.brand.name,
				tag: portfolio.brand.tag,
				mode
			}
		});

		expectNewTabLink(body, portfolio.hero.profiles.linkedin);
		expectNewTabLink(body, portfolio.hero.profiles.github);
	});

	it.each(viewModes)('opens Contact profiles in a new tab in %s mode', (mode) => {
		const { body } = render(ContactCTA, {
			props: { contact: portfolio.contact, mode }
		});

		expectNewTabLink(body, portfolio.contact.links.linkedin);
		expectNewTabLink(body, portfolio.contact.links.github);
	});
});
