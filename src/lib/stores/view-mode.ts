import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';

export type ViewMode = 'focused' | 'expressive';

export const VIEW_MODE_STORAGE_KEY = 'portfolio-view-mode';
export const VIEW_MODE_TRANSITION_MS = 420;

const DEFAULT_VIEW_MODE: ViewMode = 'focused';

function readRootMode(): ViewMode | null {
	if (!browser) {
		return null;
	}

	const rootMode = document.documentElement.dataset.view;
	return isViewMode(rootMode) ? rootMode : null;
}

function resolveInitialViewMode(): ViewMode {
	return readRootMode() ?? readStoredMode() ?? DEFAULT_VIEW_MODE;
}

export const viewMode = writable<ViewMode>(resolveInitialViewMode());
export const isViewTransitioning = writable(false);

let initialized = false;
let transitionTimer: ReturnType<typeof setTimeout> | undefined;

type ViewTransitionDocument = Document & {
	startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

function isViewMode(value: string | null | undefined): value is ViewMode {
	return value === 'focused' || value === 'expressive';
}

function readStoredMode(): ViewMode | null {
	if (!browser) {
		return null;
	}

	try {
		const stored = window.localStorage.getItem(VIEW_MODE_STORAGE_KEY);
		return isViewMode(stored) ? stored : null;
	} catch {
		return null;
	}
}

function persistMode(mode: ViewMode): void {
	if (!browser) {
		return;
	}

	try {
		window.localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode);
	} catch {
		// Ignore storage failures and keep the in-memory store authoritative.
	}

	try {
		document.cookie = `${VIEW_MODE_STORAGE_KEY}=${mode}; Path=/; Max-Age=31536000; SameSite=Lax`;
	} catch {
		// Ignore cookie failures and keep the in-memory store authoritative.
	}
}

function syncDocument(mode: ViewMode, transitioning: boolean): void {
	if (!browser) {
		return;
	}

	const { dataset } = document.documentElement;
	dataset.view = mode;

	if (transitioning) {
		dataset.viewTransitioning = 'true';
		return;
	}

	delete dataset.viewTransitioning;
}

function clearTransitionTimer(): void {
	if (transitionTimer !== undefined) {
		clearTimeout(transitionTimer);
		transitionTimer = undefined;
	}
}

function applyViewMode(nextMode: ViewMode): void {
	clearTransitionTimer();

	viewMode.set(nextMode);
	isViewTransitioning.set(true);
	persistMode(nextMode);
	syncDocument(nextMode, true);

	transitionTimer = window.setTimeout(() => {
		isViewTransitioning.set(false);
		syncDocument(get(viewMode), false);
		clearTransitionTimer();
	}, VIEW_MODE_TRANSITION_MS);
}

function shouldUseViewTransition(): boolean {
	if (!browser || typeof window.matchMedia !== 'function') {
		return false;
	}

	return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initializeViewMode(): void {
	if (!browser || initialized) {
		return;
	}

	initialized = true;

	const initialMode = readRootMode() ?? readStoredMode() ?? get(viewMode);

	viewMode.set(initialMode);
	isViewTransitioning.set(false);
	persistMode(initialMode);
	syncDocument(initialMode, false);
	document.documentElement.dataset.viewReady = 'true';
}

export function setViewMode(nextMode: ViewMode): void {
	if (!browser) {
		viewMode.set(nextMode);
		return;
	}

	initializeViewMode();

	const currentMode = get(viewMode);
	if (currentMode === nextMode) {
		persistMode(nextMode);
		syncDocument(nextMode, false);
		return;
	}

	const transitionDocument = document as ViewTransitionDocument;
	if (typeof transitionDocument.startViewTransition === 'function' && shouldUseViewTransition()) {
		transitionDocument.startViewTransition(() => {
			applyViewMode(nextMode);
		});
		return;
	}

	applyViewMode(nextMode);
}
