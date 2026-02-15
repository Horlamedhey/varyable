import adapter from '@sveltejs/adapter-cloudflare';

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
				'script-src': ["'self'", 'https://static.cloudflareinsights.com'],
				'connect-src': ["'self'", 'https://cloudflareinsights.com'],
				'base-uri': ["'self'"],
				'form-action': ["'self'"],
				'frame-ancestors': ["'none'"]
			}
		}
	}
};

export default config;
