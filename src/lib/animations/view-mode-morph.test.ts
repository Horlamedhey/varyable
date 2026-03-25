import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { get } from 'svelte/store';
import type { ViewMode } from '$lib/stores/view-mode';

vi.mock('$app/environment', () => ({ browser: true }));

const registerPlugin = vi.fn();
const gsapFromTo = vi.fn(() => ({}));
const gsapTo = vi.fn(() => ({}));
const flipGetState = vi.fn((targets: unknown, vars?: unknown) => ({ captured: true, targets, vars }));

function createKillableAnimation() {
	return {
		kill: vi.fn<() => void>(),
		progress: vi.fn<(value: number) => void>()
	};
}

type FlipFromOptions = {
	onComplete?: () => void;
	nested?: boolean;
	prune?: boolean;
	targets?: Element[];
};

const flipFrom = vi.fn((...args: [state: unknown, options?: FlipFromOptions]) => {
	void args;
	return createKillableAnimation();
});

function createMediaQueryList(matches: boolean): MediaQueryList {
	return {
		matches,
		media: '(prefers-reduced-motion: reduce)',
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		addListener: vi.fn(),
		removeListener: vi.fn(),
		dispatchEvent: vi.fn(() => true)
	};
}

class FakeHTMLElement {
	dataset: Record<string, string>;
	id: string;
	top: number;

	constructor(options: { flipAbsolute?: boolean; flipId?: string; id?: string; top?: number }) {
		this.dataset = options.flipId ? { flipId: options.flipId } : {};
		if (options.flipAbsolute) {
			this.dataset.flipAbsolute = '';
		}
		this.id = options.id ?? '';
		this.top = options.top ?? 0;
	}

	getBoundingClientRect() {
		return {
			top: this.top,
			bottom: this.top + 48,
			left: 0,
			right: 120,
			height: 48,
			width: 120,
			x: 0,
			y: this.top,
			toJSON() {
				return {};
			}
		};
	}
}

type ModeFixtures = Record<ViewMode, { sections: FakeHTMLElement[]; targets: FakeHTMLElement[] }>;

function createFixtures(): ModeFixtures {
	return {
		focused: {
			sections: [
				new FakeHTMLElement({ id: 'hero', top: -320 }),
				new FakeHTMLElement({ id: 'projects', top: 120 })
			],
			targets: [
				new FakeHTMLElement({ flipAbsolute: true, flipId: 'header-shell', top: 0 }),
				new FakeHTMLElement({ flipAbsolute: true, flipId: 'brand-lockup', top: 8 }),
				new FakeHTMLElement({ flipAbsolute: true, flipId: 'hero-actions', top: 220 }),
				new FakeHTMLElement({ flipAbsolute: true, flipId: 'hero-card', top: 96 }),
				new FakeHTMLElement({ flipAbsolute: true, flipId: 'section-heading-projects', top: 420 }),
				new FakeHTMLElement({ flipAbsolute: true, flipId: 'focused-nav-links', top: 24 })
			]
		},
		expressive: {
			sections: [
				new FakeHTMLElement({ id: 'hero', top: -360 }),
				new FakeHTMLElement({ id: 'projects', top: 160 })
			],
			targets: [
				new FakeHTMLElement({ flipAbsolute: true, flipId: 'header-shell', top: 0 }),
				new FakeHTMLElement({ flipAbsolute: true, flipId: 'brand-lockup', top: 12 }),
				new FakeHTMLElement({ flipAbsolute: true, flipId: 'hero-actions', top: 260 }),
				new FakeHTMLElement({ flipAbsolute: true, flipId: 'hero-card', top: 144 }),
				new FakeHTMLElement({ flipAbsolute: true, flipId: 'section-heading-projects', top: 448 }),
				new FakeHTMLElement({ flipAbsolute: true, flipId: 'section-dock', top: 720 })
			]
		}
	};
}

async function loadMorphModule(initialMode: ViewMode = 'focused') {
	vi.resetModules();
	registerPlugin.mockClear();
	gsapFromTo.mockClear();
	gsapTo.mockClear();
	flipGetState.mockClear();
	flipFrom.mockReset();

	const fixtures = createFixtures();
	let currentMode = initialMode;
	const dataset = {} as Record<string, string>;
	const scrollTo = vi.fn((x: number, y: number) => {
		window.scrollX = x;
		window.scrollY = y;
	});

	Object.defineProperty(dataset, 'view', {
		get: () => currentMode,
		set: (value: string) => {
			currentMode = value as ViewMode;
		},
		configurable: true,
		enumerable: true
	});

	globalThis.HTMLElement = FakeHTMLElement as unknown as typeof HTMLElement;
	Object.defineProperty(globalThis, 'document', {
		value: {
			cookie: '',
			documentElement: { dataset },
			getElementById(id: string) {
				return fixtures[currentMode].sections.find((section) => section.id === id) ?? null;
			},
			querySelectorAll(selector: string) {
				if (selector === '[data-section][id]') {
					return fixtures[currentMode].sections;
				}

				if (selector === '[data-flip-id]') {
					return fixtures[currentMode].targets;
				}

				return [];
			}
		},
		configurable: true
	});
	Object.defineProperty(globalThis, 'window', {
		value: {
			innerHeight: 900,
			localStorage: {
				getItem: vi.fn(() => currentMode),
				setItem: vi.fn()
			},
			matchMedia: vi.fn().mockReturnValue(createMediaQueryList(false)),
			scrollX: 0,
			scrollY: 0,
			scrollTo
		},
		configurable: true
	});

	const storeModule = await import('$lib/stores/view-mode');
	const morphModule = await import('./view-mode-morph');
	morphModule.setGsapLoaderForTest(async () => {
		const Flip = {
			getState: flipGetState,
			from: flipFrom
		};

		registerPlugin(Flip);

		return {
			gsap: {
				registerPlugin,
				fromTo: gsapFromTo,
				to: gsapTo
			},
			Flip
		};
	});

	return {
		dataset,
		fixtures,
		morphModule,
		scrollTo,
		storeModule
	};
}

beforeEach(() => {
	flipFrom.mockImplementation((...args: [state: unknown, options?: FlipFromOptions]) => {
		void args;
		return createKillableAnimation();
	});
});

afterEach(() => {
	Reflect.deleteProperty(globalThis, 'document');
	Reflect.deleteProperty(globalThis, 'window');
	Reflect.deleteProperty(globalThis, 'HTMLElement');
});

describe('transitionViewMode', () => {
	it('no-ops when the requested mode is already active', async () => {
		const { morphModule, storeModule } = await loadMorphModule('focused');

		storeModule.initializeViewMode();
		await morphModule.transitionViewMode('focused');

		expect(flipGetState).not.toHaveBeenCalled();
		expect(flipFrom).not.toHaveBeenCalled();
		expect(get(storeModule.isViewTransitioning)).toBe(false);
	});

	it('captures state before the swap and targets the post-swap elements', async () => {
		const { dataset, fixtures, morphModule, scrollTo, storeModule } = await loadMorphModule('focused');

		storeModule.initializeViewMode();
		await morphModule.transitionViewMode('expressive');

		expect(registerPlugin).toHaveBeenCalledTimes(1);
		expect(flipGetState).toHaveBeenCalledTimes(1);
		const firstGetStateCall = flipGetState.mock.calls[0];
		expect(firstGetStateCall).toBeDefined();
		if (!firstGetStateCall) {
			throw new Error('Expected Flip.getState to be called once.');
		}
		expect(firstGetStateCall[0]).toEqual([
			fixtures.focused.targets[2],
			fixtures.focused.targets[3],
			fixtures.focused.targets[4],
			fixtures.focused.targets[5]
		]);
		expect(firstGetStateCall[1]).toEqual(
			expect.objectContaining({
				props: 'borderRadius,opacity,filter,backgroundColor,color,boxShadow'
			})
		);
		expect(dataset.view).toBe('expressive');
		const matchedTargets = [
			fixtures.expressive.targets[2],
			fixtures.expressive.targets[3],
			fixtures.expressive.targets[4]
		];
		expect(flipFrom).toHaveBeenCalledWith(
			expect.anything(),
			expect.objectContaining({
				targets: matchedTargets,
				nested: true,
				prune: true
			})
		);
		expect(scrollTo).toHaveBeenCalledWith(0, 0);
	});

	it('falls back to a direct commit when reduced motion is requested', async () => {
		const { dataset, morphModule, storeModule } = await loadMorphModule('focused');
		vi.mocked(window.matchMedia).mockReturnValue(createMediaQueryList(true));

		storeModule.initializeViewMode();
		await morphModule.transitionViewMode('expressive');

		expect(dataset.view).toBe('expressive');
		expect(flipGetState).not.toHaveBeenCalled();
		expect(get(storeModule.isViewTransitioning)).toBe(false);
	});

	it('falls back safely when no flip targets exist before the swap', async () => {
		const { dataset, fixtures, morphModule, storeModule } = await loadMorphModule('focused');
		fixtures.focused.targets = [];

		storeModule.initializeViewMode();
		await morphModule.transitionViewMode('expressive');

		expect(dataset.view).toBe('expressive');
		expect(flipGetState).not.toHaveBeenCalled();
		expect(get(storeModule.isViewTransitioning)).toBe(false);
	});

	it('clears the transition state when the target mode has no flip targets', async () => {
		const { fixtures, morphModule, storeModule } = await loadMorphModule('focused');
		fixtures.expressive.targets = [];

		storeModule.initializeViewMode();
		await morphModule.transitionViewMode('expressive');

		expect(get(storeModule.isViewTransitioning)).toBe(false);
	});

	it('finishes the active animation before starting a new one', async () => {
		const firstAnimation = createKillableAnimation();
		const secondAnimation = createKillableAnimation();

		const { morphModule, storeModule } = await loadMorphModule('focused');
		flipFrom
			.mockImplementationOnce(() => firstAnimation)
			.mockImplementationOnce(() => secondAnimation);

		storeModule.initializeViewMode();
		await morphModule.transitionViewMode('expressive');
		await morphModule.transitionViewMode('focused');

		expect(firstAnimation.progress).toHaveBeenCalledWith(1);
		expect(firstAnimation.kill).toHaveBeenCalledTimes(1);
		expect(flipFrom).toHaveBeenCalledTimes(2);
	});

	it('clears the transition flag when the flip animation completes', async () => {
		let onComplete: (() => void) | undefined;
		const { morphModule, storeModule } = await loadMorphModule('focused');
		flipFrom.mockImplementation((...args) => {
			const options = args[1] as { onComplete?: () => void } | undefined;
			onComplete = options?.onComplete;
			return createKillableAnimation();
		});

		storeModule.initializeViewMode();
		await morphModule.transitionViewMode('expressive');

		expect(get(storeModule.isViewTransitioning)).toBe(true);

		onComplete?.();

		expect(get(storeModule.isViewTransitioning)).toBe(false);
	});

	it('clears the transition flag again if the flip setup throws', async () => {
		const { morphModule, storeModule } = await loadMorphModule('focused');
		flipFrom.mockImplementation(() => {
			throw new Error('boom');
		});

		storeModule.initializeViewMode();

		await expect(morphModule.transitionViewMode('expressive')).rejects.toThrow('boom');
		expect(get(storeModule.isViewTransitioning)).toBe(false);
	});
});
