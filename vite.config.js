import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'sw.js',
			devOptions: {
				enabled: true,
				type: 'module'
			},
			manifest: {
				name: 'Svelte PWA Demo',
				short_name: 'PWA Demo',
				theme_color: '#ffffff',
				icons: [
					{
						src: '/pwa-192x192.svg',
						sizes: '192x192',
						type: 'image/svg+xml'
					},
					{
						src: '/pwa-512x512.svg',
						sizes: '512x512',
						type: 'image/svg+xml'
					},
					{
						src: '/maskable-icon.svg',
						sizes: '512x512',
						type: 'image/svg+xml',
						purpose: 'maskable'
					}
				]
			}
		})
	],
	preview: {
		allowedHosts: ['pwa.devdew.my.id', 'localhost', '127.0.0.1']
	}
});
