import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	build: {
		minify: 'esbuild',
		cssMinify: 'lightningcss',
		sourcemap: false
	},
	test: {
		environment: 'node',
		include: ['src/**/*.test.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html', 'lcov'],
			include: ['src/lib/**/*.ts'],
			exclude: ['**/*.test.ts'],
			thresholds: {
				lines: 85,
				branches: 75,
				functions: 85,
				statements: 85
			}
		}
	}
});
