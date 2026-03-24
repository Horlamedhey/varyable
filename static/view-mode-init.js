(function () {
	const defaultMode = 'focused';
	const storageKey = 'portfolio-view-mode';

	try {
		const stored = window.localStorage.getItem(storageKey);
		document.documentElement.dataset.view =
			stored === 'focused' || stored === 'expressive' ? stored : defaultMode;
	} catch {
		document.documentElement.dataset.view = defaultMode;
	}
})();
