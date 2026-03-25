import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { ViewMode } from './view-mode';

vi.mock('$app/environment', () => ({ browser: true }));

interface ViewModeModule {
	VIEW_MODE_TRANSITION_MS: number;
	viewMode: Writable<ViewMode>;
	isViewTransitioning: Writable<boolean>;
	initializeViewMode(): void;
	setViewMode(nextMode: ViewMode): void;
}

interface StorageOptions {
	initialMode?: string | null;
	throwOnGet?: boolean;
	throwOnSet?: boolean;
}

function createStorage(options: StorageOptions = {}) {
	let storedMode = options.initialMode ?? null;

	return {
		getItem(key: string) {
			if (options.throwOnGet) {
				throw new Error(`Failed to read ${key}`);
			}

			return storedMode;
		},
		setItem(key: string, value: string) {
			if (options.throwOnSet) {
				throw new Error(`Failed to write ${key}`);
			}

			storedMode = value;
		},
		removeItem() {
			storedMode = null;
		},
		clear() {
			storedMode = null;
		},
		key() {
			return null;
		},
		get length() {
			return storedMode === null ? 0 : 1;
		},
		read() {
			return storedMode;
		}
	};
}

async function loadViewModeModule(options: {
	rootMode?: string;
	storage?: StorageOptions;
	reducedMotion?: boolean;
	startViewTransition?: (callback: () => void) => { finished: Promise<void> };
} = {}): Promise<{
		dataset: Record<string, string>;
		module: ViewModeModule;
		storage: ReturnType<typeof createStorage>;
	}> {
	vi.resetModules();

	const dataset: Record<string, string> = {};
	if (options.rootMode) {
		dataset.view = options.rootMode;
	}

	const storage = createStorage(options.storage);
	Object.defineProperty(globalThis, 'document', {
		value: {
			documentElement: { dataset },
			startViewTransition: options.startViewTransition
		},
		configurable: true
	});
	Object.defineProperty(globalThis, 'window', {
		value: {
			localStorage: storage,
			matchMedia: vi.fn().mockReturnValue({ matches: options.reducedMotion ?? false }),
			setTimeout: globalThis.setTimeout,
			clearTimeout: globalThis.clearTimeout
		},
		configurable: true
	});

	const module = await import('./view-mode');
	return { dataset, module, storage };
}

beforeEach(() => {
	vi.useFakeTimers();
});

afterEach(() => {
	vi.useRealTimers();
	Reflect.deleteProperty(globalThis, 'document');
	Reflect.deleteProperty(globalThis, 'window');
});

describe('view mode store', () => {
	it('defaults to focused when no persisted value exists', async () => {
		const { dataset, module, storage } = await loadViewModeModule();

		module.initializeViewMode();

		expect(get(module.viewMode)).toBe('focused');
		expect(get(module.isViewTransitioning)).toBe(false);
		expect(dataset.view).toBe('focused');
		expect(dataset.viewReady).toBe('true');
		expect(storage.read()).toBe('focused');
	});

	it('hydrates from the persisted mode', async () => {
		const { dataset, module, storage } = await loadViewModeModule({
			storage: { initialMode: 'expressive' }
		});

		module.initializeViewMode();

		expect(get(module.viewMode)).toBe('expressive');
		expect(dataset.view).toBe('expressive');
		expect(dataset.viewReady).toBe('true');
		expect(storage.read()).toBe('expressive');
	});

	it('prefers the bootstrapped root dataset over stale storage', async () => {
		const { dataset, module, storage } = await loadViewModeModule({
			rootMode: 'expressive',
			storage: { initialMode: 'focused' }
		});

		module.initializeViewMode();

		expect(get(module.viewMode)).toBe('expressive');
		expect(dataset.view).toBe('expressive');
		expect(dataset.viewReady).toBe('true');
		expect(storage.read()).toBe('expressive');
	});

	it('syncs the root dataset during mode transitions', async () => {
		const { dataset, module, storage } = await loadViewModeModule();

		module.initializeViewMode();
		module.setViewMode('expressive');

		expect(get(module.viewMode)).toBe('expressive');
		expect(get(module.isViewTransitioning)).toBe(true);
		expect(dataset.view).toBe('expressive');
		expect(dataset.viewTransitioning).toBe('true');
		expect(storage.read()).toBe('expressive');

		vi.advanceTimersByTime(module.VIEW_MODE_TRANSITION_MS);

		expect(get(module.isViewTransitioning)).toBe(false);
		expect(dataset.view).toBe('expressive');
		expect(dataset.viewTransitioning).toBeUndefined();
	});

	it('keeps the dataset stable when setting the current mode again', async () => {
		const { dataset, module, storage } = await loadViewModeModule();

		module.initializeViewMode();
		module.setViewMode('focused');

		expect(get(module.viewMode)).toBe('focused');
		expect(get(module.isViewTransitioning)).toBe(false);
		expect(dataset.view).toBe('focused');
		expect(dataset.viewTransitioning).toBeUndefined();
		expect(storage.read()).toBe('focused');
	});

	it('uses the browser view transition API when available', async () => {
		const startViewTransition = vi.fn((callback: () => void) => {
			callback();
			return { finished: Promise.resolve() };
		});

		const { dataset, module, storage } = await loadViewModeModule({
			startViewTransition
		});

		module.initializeViewMode();
		module.setViewMode('expressive');

		expect(startViewTransition).toHaveBeenCalledTimes(1);
		expect(get(module.viewMode)).toBe('expressive');
		expect(get(module.isViewTransitioning)).toBe(true);
		expect(dataset.view).toBe('expressive');
		expect(storage.read()).toBe('expressive');
	});

	it('falls back safely when storage is unavailable', async () => {
		const { dataset, module } = await loadViewModeModule({
			storage: { throwOnGet: true, throwOnSet: true }
		});

		module.initializeViewMode();
		module.setViewMode('expressive');

		expect(get(module.viewMode)).toBe('expressive');
		expect(dataset.view).toBe('expressive');
		expect(dataset.viewTransitioning).toBe('true');
	});
});
