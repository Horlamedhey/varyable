import { afterEach, describe, expect, it, vi } from 'vitest';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { ViewMode } from './view-mode';

vi.mock('$app/environment', () => ({ browser: true }));

interface ViewModeModule {
	viewMode: Writable<ViewMode>;
	isViewTransitioning: Writable<boolean>;
	commitViewMode(nextMode: ViewMode): void;
	getViewMode(): ViewMode;
	initializeViewMode(): void;
	prefersReducedMotion(): boolean;
	setViewTransitioning(transitioning: boolean): void;
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
		read() {
			return storedMode;
		}
	};
}

async function loadViewModeModule(options: {
	rootMode?: string;
	storage?: StorageOptions;
	reducedMotion?: boolean;
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
			cookie: '',
			documentElement: { dataset }
		},
		configurable: true
	});
	Object.defineProperty(globalThis, 'window', {
		value: {
			localStorage: storage,
			matchMedia: vi.fn().mockReturnValue({ matches: options.reducedMotion ?? false })
		},
		configurable: true
	});

	const module = await import('./view-mode');
	return { dataset, module, storage };
}

afterEach(() => {
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

	it('commits mode changes without forcing a transition state', async () => {
		const { dataset, module, storage } = await loadViewModeModule();

		module.initializeViewMode();
		module.commitViewMode('expressive');

		expect(module.getViewMode()).toBe('expressive');
		expect(get(module.isViewTransitioning)).toBe(false);
		expect(dataset.view).toBe('expressive');
		expect(dataset.viewTransitioning).toBeUndefined();
		expect(storage.read()).toBe('expressive');
	});

	it('syncs the transition flag onto the root dataset', async () => {
		const { dataset, module } = await loadViewModeModule();

		module.initializeViewMode();
		module.setViewTransitioning(true);

		expect(get(module.isViewTransitioning)).toBe(true);
		expect(dataset.viewTransitioning).toBe('true');

		module.setViewTransitioning(false);

		expect(get(module.isViewTransitioning)).toBe(false);
		expect(dataset.viewTransitioning).toBeUndefined();
	});

	it('reflects the prefers-reduced-motion media query', async () => {
		const { module } = await loadViewModeModule({ reducedMotion: true });

		expect(module.prefersReducedMotion()).toBe(true);
	});

	it('falls back safely when storage is unavailable', async () => {
		const { dataset, module } = await loadViewModeModule({
			storage: { throwOnGet: true, throwOnSet: true }
		});

		module.initializeViewMode();
		module.commitViewMode('expressive');
		module.setViewTransitioning(true);

		expect(get(module.viewMode)).toBe('expressive');
		expect(dataset.view).toBe('expressive');
		expect(dataset.viewTransitioning).toBe('true');
	});
});
