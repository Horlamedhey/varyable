import { expect, test } from '@playwright/test';

test('portfolio smoke journey', async ({ page }) => {
	await page.goto('/');

	await expect(page.locator('#hero')).toBeVisible();
	await expect(page.locator('#hero').getByRole('heading').first()).toBeVisible();
	await expect(page.getByRole('link', { name: 'View Projects' })).toBeVisible();

	await page.getByRole('link', { name: 'Projects', exact: true }).click();
	await expect(page.getByRole('heading', { name: 'Projects', exact: true })).toBeVisible();

	await expect(page.getByRole('button', { name: /show all projects/i })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'WPS Generator', exact: true }).first()).toBeVisible();
});
