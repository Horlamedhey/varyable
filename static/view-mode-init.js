(() => {
	const defaultMode = 'focused';
	const storageKey = 'portfolio-view-mode';
	const cookieMatch = document.cookie.match(
		new RegExp(`(?:^|; )${storageKey}=(focused|expressive)(?:;|$)`)
	);
	const cookieMode = cookieMatch?.[1];
	let storedMode = null;

	try {
		const stored = window.localStorage.getItem(storageKey);
		storedMode = stored === 'focused' || stored === 'expressive' ? stored : null;
	} catch {
		storedMode = null;
	}

	const mode = cookieMode ?? storedMode ?? defaultMode;
	document.documentElement.dataset.view = mode;

	try {
		if (storedMode !== mode) {
			window.localStorage.setItem(storageKey, mode);
		}
	} catch {
		// Ignore storage failures and keep the DOM attribute authoritative.
	}

	if (cookieMode !== mode) {
		document.cookie = `${storageKey}=${mode}; Path=/; Max-Age=31536000; SameSite=Lax`;
	}
})();
