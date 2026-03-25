import { browser } from '$app/environment';
import { tick } from 'svelte';
import {
	commitViewMode,
	getViewMode,
	initializeViewMode,
	prefersReducedMotion,
	setViewTransitioning,
	type ViewMode
} from '$lib/stores/view-mode';

type GsapBundle = {
	gsap: {
		registerPlugin(plugin: unknown): void;
		fromTo(targets: unknown, fromVars: Record<string, unknown>, toVars: Record<string, unknown>): unknown;
		to(targets: unknown, vars: Record<string, unknown>): unknown;
	};
	Flip: {
		getState(targets: Element[] | string, vars?: Record<string, unknown>): unknown;
		from(state: unknown, vars: Record<string, unknown>): KillableAnimation;
	};
};

type KillableAnimation = {
	kill(): void;
	progress(value: number): unknown;
};

type AnchorSnapshot = {
	id: string;
	scrollY: number;
	top: number;
};

type FlipTargetMap = Map<string, HTMLElement>;

const FLIP_TARGET_SELECTOR = '[data-flip-id]';
const STRUCTURAL_FLIP_IDS = new Set([
	'brand-lockup',
	'contact-shell',
	'experience-shell',
	'header-shell',
	'hero-copy',
	'hero-shell',
	'highlights-shell',
	'projects-shell',
	'section-contact',
	'section-dock',
	'section-experience',
	'section-hero',
	'section-highlights',
	'section-projects',
	'section-skills',
	'site-footer',
	'site-footer-inner',
	'skills-shell'
]);
const ANCHOR_OFFSET_MIN = 96;
const ANCHOR_OFFSET_MAX = 180;
const MOBILE_BREAKPOINT = 640;
const DESKTOP_DURATION = 0.72;
const MOBILE_DURATION = 0.58;

let gsapBundlePromise: Promise<GsapBundle> | null = null;
let activeAnimation: KillableAnimation | null = null;

function getFlipTargetMap(): FlipTargetMap {
	const targetMap: FlipTargetMap = new Map();

	for (const element of document.querySelectorAll<HTMLElement>(FLIP_TARGET_SELECTOR)) {
		const flipId = element.dataset.flipId;
		if (!flipId || STRUCTURAL_FLIP_IDS.has(flipId)) {
			continue;
		}

		targetMap.set(flipId, element);
	}

	return targetMap;
}

function getMatchedFlipTargets(beforeTargets: FlipTargetMap, afterTargets: FlipTargetMap): {
	after: HTMLElement[];
} {
	const matchedAfter: HTMLElement[] = [];

	for (const [flipId, element] of afterTargets) {
		if (!beforeTargets.has(flipId)) {
			continue;
		}

		matchedAfter.push(element);
	}

	return {
		after: matchedAfter
	};
}

function getAnchorOffset(): number {
	return Math.max(
		ANCHOR_OFFSET_MIN,
		Math.min(window.innerHeight * 0.18, ANCHOR_OFFSET_MAX)
	);
}

function captureAnchor(): AnchorSnapshot | null {
	const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section][id]'));
	if (sections.length === 0) {
		return null;
	}

	const anchorOffset = getAnchorOffset();
	let bestSection = sections[0];
	let bestDistance = Number.POSITIVE_INFINITY;

	for (const section of sections) {
		const distance = Math.abs(section.getBoundingClientRect().top - anchorOffset);
		if (distance < bestDistance) {
			bestDistance = distance;
			bestSection = section;
		}
	}

	return {
		id: bestSection.id,
		scrollY: window.scrollY,
		top: bestSection.getBoundingClientRect().top
	};
}

function restoreAnchor(anchor: AnchorSnapshot | null): void {
	if (!anchor) {
		return;
	}

	const target = document.getElementById(anchor.id);
	if (!(target instanceof HTMLElement)) {
		return;
	}

	if (anchor.scrollY <= 4) {
		window.scrollTo(window.scrollX, 0);
		return;
	}

	const delta = target.getBoundingClientRect().top - anchor.top;
	if (Math.abs(delta) < 1) {
		return;
	}

	window.scrollTo(window.scrollX, window.scrollY + delta);
}

function clearActiveAnimation(animation: KillableAnimation | null = activeAnimation): void {
	if (activeAnimation === animation) {
		activeAnimation = null;
	}

	setViewTransitioning(false);
}

function finishActiveAnimation(): void {
	if (!activeAnimation) {
		return;
	}

	const animation = activeAnimation;
	activeAnimation = null;
	animation.progress(1);
	animation.kill();
	setViewTransitioning(false);
}

async function defaultGsapLoader(): Promise<GsapBundle> {
	const [gsapModule, flipModule] = await Promise.all([import('gsap'), import('gsap/dist/Flip.js')]);
	const gsap = gsapModule.gsap;
	const Flip = (flipModule as { Flip: GsapBundle['Flip'] }).Flip;
	gsap.registerPlugin(Flip);
	return { gsap, Flip };
}

let gsapLoader: () => Promise<GsapBundle> = defaultGsapLoader;

async function loadGsapBundle(): Promise<GsapBundle> {
	if (!gsapBundlePromise) {
		gsapBundlePromise = gsapLoader();
	}

	return gsapBundlePromise;
}

export function setGsapLoaderForTest(loader: (() => Promise<GsapBundle>) | null): void {
	gsapLoader = loader ?? defaultGsapLoader;
	gsapBundlePromise = null;
}

function getFlipDuration(): number {
	return window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_DURATION : DESKTOP_DURATION;
}

export async function transitionViewMode(nextMode: ViewMode): Promise<void> {
	if (!browser) {
		commitViewMode(nextMode);
		return;
	}

	initializeViewMode();
	finishActiveAnimation();

	if (getViewMode() === nextMode) {
		commitViewMode(nextMode);
		setViewTransitioning(false);
		return;
	}

	if (prefersReducedMotion()) {
		commitViewMode(nextMode);
		setViewTransitioning(false);
		return;
	}

	const anchor = captureAnchor();
	const targetsBefore = getFlipTargetMap();

	if (targetsBefore.size === 0) {
		commitViewMode(nextMode);
		setViewTransitioning(false);
		return;
	}

	const { Flip } = await loadGsapBundle();
	const state = Flip.getState(Array.from(targetsBefore.values()), {
		props: 'borderRadius,opacity,filter,backgroundColor,color,boxShadow'
	});

	try {
		setViewTransitioning(true);
		commitViewMode(nextMode);
		await tick();
		restoreAnchor(anchor);

		const targetsAfter = getFlipTargetMap();
		const matchedTargets = getMatchedFlipTargets(targetsBefore, targetsAfter);
		const duration = getFlipDuration();

		if (matchedTargets.after.length === 0) {
			setViewTransitioning(false);
			return;
		}

		const animation = Flip.from(state, {
			targets: matchedTargets.after,
			duration,
			ease: 'power2.inOut',
			nested: true,
			prune: true,
			onComplete() {
				restoreAnchor(anchor);
				clearActiveAnimation(animation as KillableAnimation);
			}
		});

		activeAnimation = animation as KillableAnimation;
	} catch (error) {
		clearActiveAnimation(null);
		throw error;
	}
}
