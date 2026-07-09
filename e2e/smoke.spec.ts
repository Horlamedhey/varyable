import { expect, test } from '@playwright/test';

test('portfolio smoke journey', async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => {
		localStorage.setItem('portfolio-view-mode', 'focused');
		document.cookie = 'portfolio-view-mode=focused; path=/';
	});
	await page.reload();

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

	const experienceSection = page.locator('#experience');
	const experienceToggle = experienceSection.locator('.experience-toggle');
	const additionalExperience = page.locator('#focused-additional-experience');
	await expect(experienceToggle).toHaveAccessibleName('Show 5 more roles');
	await expect(additionalExperience).toHaveClass(/experience-overflow-collapsed/);
	await expect(additionalExperience).toHaveAttribute('aria-hidden', 'true');
	await expect(experienceToggle).toHaveAttribute('aria-expanded', 'false');
	await experienceToggle.click();
	await expect(experienceToggle).toHaveAttribute('aria-expanded', 'true');
	await expect(experienceToggle).toHaveAccessibleName('Show less experience');
	await expect(additionalExperience).not.toHaveClass(/experience-overflow-collapsed/);
	await expect(additionalExperience).toHaveAttribute('aria-hidden', 'false');
	await expect(experienceSection.getByRole('heading', { name: 'Fluidangle LLC' })).toBeVisible();
	await expect
		.poll(() =>
			additionalExperience.evaluate(
				(element) => element.getAnimations({ subtree: true }).filter((animation) => animation.playState === 'running').length
			)
		)
		.toBeGreaterThan(0);
	await experienceToggle.click();
	await expect(additionalExperience).toHaveClass(/experience-overflow-collapsed/);
	await expect(additionalExperience).toHaveAttribute('aria-hidden', 'true');

	await primaryNav.getByRole('link', { name: 'Projects', exact: true }).click({ noWaitAfter: true });
	await expect(primaryNav.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute(
		'aria-current',
		'page'
	);
	await expressiveButton.click({ noWaitAfter: true });
	await expect(focusedButton).toBeDisabled();
	await expect(expressiveButton).toBeDisabled();
	await page.waitForFunction(() => {
		const button = [...document.querySelectorAll('button')].find((node) => node.textContent?.trim() === 'Expressive');
		return button instanceof HTMLButtonElement && !button.disabled;
	});
	await expect(expressiveButton).toHaveAttribute('aria-pressed', 'true');
	const sectionNav = page.getByRole('navigation', { name: 'Section navigation' });
	await expect(sectionNav).toBeVisible();
	await expect(page).toHaveURL(/#projects$/);
	await expect(sectionNav.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute(
		'aria-current',
		'page'
	);

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
