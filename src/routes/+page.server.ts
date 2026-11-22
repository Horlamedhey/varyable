import type { PageServerLoad } from './$types';
import { portfolio } from '$lib/content/portfolio';
import type { ViewMode } from '$lib/stores/view-mode';

export const load = (async ({ cookies }) => {
	const cookieMode = cookies.get('portfolio-view-mode');
	const initialViewMode: ViewMode = cookieMode === 'expressive' ? 'expressive' : 'focused';

	return { portfolio, initialViewMode };
}) satisfies PageServerLoad;
