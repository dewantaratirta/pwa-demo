import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Using adapter-auto for automatic deployment detection
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			entries: ['*'] // Prerender all routes by default
		}
	}
};

export default config;
