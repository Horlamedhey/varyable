import type { ProjectItem } from '$lib/types/portfolio';

const MOBILE_MAX_WIDTH = 767;
const TABLET_MAX_WIDTH = 1023;

export function getInitialProjectCount(width: number): number {
	if (width <= MOBILE_MAX_WIDTH) {
		return 3;
	}

	if (width <= TABLET_MAX_WIDTH) {
		return 4;
	}

	return 6;
}

export function getVisibleProjects(
	projects: ProjectItem[],
	expanded: boolean,
	initialCount: number
): ProjectItem[] {
	if (expanded) {
		return projects;
	}

	return projects.slice(0, initialCount);
}

export function hasFilledLink(url: string): boolean {
	return url.trim().length > 0;
}
