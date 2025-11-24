<script>
	import '@khmyznikov/pwa-install';
	import { onMount } from 'svelte';

	/** @type {any} */
	let pwaInstallComponent;

	function handleInstallApp() {
		if (pwaInstallComponent && pwaInstallComponent.showDialog) {
			pwaInstallComponent.showDialog(true);
		} else {
			console.error('pwa-install component not bound or showDialog method not available');
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center px-4">
	<pwa-install bind:this={pwaInstallComponent} manifest-url="/manifest.webmanifest"></pwa-install>
	<div class="max-w-4xl mx-auto text-center space-y-8">
		<div class="space-y-4">
			<h1 class="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
				Progressive Web App
			</h1>
			<p class="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
				Experience the future of web applications with our cutting-edge PWA technology
			</p>
		</div>
		
		<div class="space-y-6">
			<div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-2xl">
				<h2 class="text-2xl font-semibold mb-4 text-blue-400">Install Our App</h2>
				<p class="text-slate-300 mb-6">
					Get native app experience with offline support, push notifications, and more.
				</p>
				<button 
					on:click={handleInstallApp}
					class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
				>
					Install App
				</button>
			</div>
			
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a 
					href="/demo" 
					class="bg-slate-700/50 hover:bg-slate-700 backdrop-blur-sm text-white font-medium py-3 px-6 rounded-lg transition border border-slate-600 hover:border-slate-500"
				>
					View Demo
				</a>
			</div>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
			<div class="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
				<div class="text-3xl mb-3">⚡</div>
				<h3 class="text-xl font-semibold mb-2">Lightning Fast</h3>
				<p class="text-slate-400">Optimized performance for instant loading</p>
			</div>
			<div class="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
				<div class="text-3xl mb-3">📱</div>
				<h3 class="text-xl font-semibold mb-2">Mobile First</h3>
				<p class="text-slate-400">Designed for the best mobile experience</p>
			</div>
			<div class="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
				<div class="text-3xl mb-3">🔒</div>
				<h3 class="text-xl font-semibold mb-2">Secure</h3>
				<p class="text-slate-400">Built with security best practices</p>
			</div>
		</div>
	</div>
</div>
