import { expect, test } from '@playwright/test';

test('portfolio smoke journey', async ({ page }) => {
	await page.goto('/');

	const focusedButton = page.getByRole('button', { name: 'Focused' });
	const expressiveButton = page.getByRole('button', { name: 'Expressive' });

	await expect(focusedButton).toHaveAttribute('aria-pressed', 'true');
	await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
	await expect(page.getByRole('navigation', { name: 'Section navigation' })).toBeHidden();
	const primaryNav = page.getByRole('navigation', { name: 'Primary navigation' });

	await expect(page.locator('#hero')).toBeVisible();
	await expect(page.locator('#hero')).toHaveCount(1);
	await expect(page.locator('#highlights')).toHaveCount(1);
	await expect(page.locator('#experience')).toHaveCount(1);
	await expect(page.locator('#projects')).toHaveCount(1);
	await expect(page.locator('#skills')).toHaveCount(1);
	await expect(page.locator('#contact')).toHaveCount(1);
	await expect(page.locator('#hero').getByRole('heading').first()).toBeVisible();
	await expect(page.getByRole('link', { name: 'View Projects' })).toBeVisible();
	await primaryNav.getByRole('link', { name: 'Projects', exact: true }).click();
	await expect(primaryNav.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute(
		'aria-current',
		'page'
	);

	await expressiveButton.click();
	await expect(expressiveButton).toHaveAttribute('aria-pressed', 'true');
	const sectionNav = page.getByRole('navigation', { name: 'Section navigation' });
	await expect(sectionNav).toBeVisible();

	await page.reload();
	await expect(expressiveButton).toHaveAttribute('aria-pressed', 'true');
	await expect(sectionNav).toBeVisible();

	await sectionNav.getByRole('link', { name: 'Projects', exact: true }).click();
	await expect(sectionNav.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute(
		'aria-current',
		'page'
	);
	await expect(page.getByRole('heading', { name: 'Projects', exact: true })).toBeVisible();

	await expect(page.getByRole('button', { name: /show all projects/i })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'WPS Generator', exact: true }).first()).toBeVisible();
});
