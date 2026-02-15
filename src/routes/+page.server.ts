import type { ServerLoad } from '@sveltejs/kit';
import { portfolio } from '$lib/content/portfolio';

export const load: ServerLoad = async () => {
	return { portfolio };
};
