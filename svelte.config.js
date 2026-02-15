import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ["'self'"],
				'style-src': ["'self'", "'unsafe-inline'"],
				'font-src': ["'self'"],
				'img-src': ["'self'", 'data:', 'https:'],
				'script-src': ["'self'"],
				'connect-src': ["'self'"],
				'base-uri': ["'self'"],
				'form-action': ["'self'"],
				'frame-ancestors': ["'none'"]
			}
		}
	}
};

export default config;
