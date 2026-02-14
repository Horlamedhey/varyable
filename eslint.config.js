import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import svelteConfig from './svelte.config.js';

export default tseslint.config(
	{
		ignores: [
			'.svelte-kit/**',
			'.vercel/**',
			'build/**',
			'dist/**',
			'coverage/**',
			'playwright-report/**',
			'test-results/**',
			'node_modules/**'
		]
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		files: ['**/*.{js,mjs,cjs,ts,svelte}'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
				svelteConfig
			}
		}
	},
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/consistent-type-imports': 'error',
			'svelte/no-navigation-without-resolve': 'off',
			'no-warning-comments': [
				'error',
				{
					terms: ['todo', 'fixme'],
					location: 'start'
				}
			]
		}
	}
);
