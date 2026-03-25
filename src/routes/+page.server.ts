import type { ServerLoad } from '@sveltejs/kit';
import { portfolio } from '$lib/content/portfolio';

export const load: ServerLoad = async ({ cookies }) => {
	const cookieMode = cookies.get('portfolio-view-mode');
	const initialViewMode = cookieMode === 'expressive' ? 'expressive' : 'focused';

	return { portfolio, initialViewMode };
};
