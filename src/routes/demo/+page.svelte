<script>
	import '@khmyznikov/pwa-install';

	/** @type {any} */
	let pwaInstallComponent;
	let hideDescription = false;
	
	function toggleDescription() {
		hideDescription = !hideDescription;
		if (pwaInstallComponent) {
			if (hideDescription) {
				pwaInstallComponent.setAttribute('disable-description', '');
			} else {
				pwaInstallComponent.removeAttribute('disable-description');
			}
		}
	}
	
	function triggerInstallDialog() {
		if (pwaInstallComponent) {
			pwaInstallComponent.showDialog(true);
		} else {
			console.error('pwa-install component not bound');
		}
	}
	
	function triggerChromium() {
		console.log('Triggering Chromium install dialog');
		if (pwaInstallComponent) {
			pwaInstallComponent.setAttribute('platform', 'chromium');
			pwaInstallComponent.showDialog(true);
		}
	}
	
	function triggerAppleDesktop() {
		console.log('Triggering Apple Desktop install dialog');
		if (pwaInstallComponent) {
			pwaInstallComponent.setAttribute('platform', 'apple-desktop');
			pwaInstallComponent.showDialog(true);
		}
	}
	
	function triggerAppleMobile() {
		console.log('Triggering Apple Mobile install dialog');
		if (pwaInstallComponent) {
			pwaInstallComponent.setAttribute('platform', 'apple-mobile');
			pwaInstallComponent.showDialog(true);
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white px-4 py-12">
	<pwa-install bind:this={pwaInstallComponent} manifest-url="/manifest.webmanifest"></pwa-install>
	<div class="max-w-4xl mx-auto">
		<div class="mb-8">
			<a href="/" class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6">
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
				</svg>
				Back to Home
			</a>
			<h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
				PWA Install Demo
			</h1>
			<p class="text-xl text-slate-300">
				Explore different installation options and platform-specific behaviors
			</p>
		</div>
		
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Description Toggle Section -->
			<div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 shadow-xl">
				<h2 class="text-2xl font-semibold mb-4 text-blue-400">Description Controls</h2>
				<p class="text-slate-300 mb-6">
					Toggle the visibility of the description in the install popup to customize the user experience.
				</p>
				<button 
					on:click={toggleDescription}
					class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
				>
					{hideDescription ? 'Show Description' : 'Hide Description'}
				</button>
				<div class="mt-4 p-3 bg-slate-700/30 rounded-lg">
					<p class="text-sm text-slate-400">
						Status: Description is currently <span class="font-semibold text-blue-400">{hideDescription ? 'hidden' : 'visible'}</span>
					</p>
				</div>
			</div>
			
			<!-- Platform Triggers Section -->
			<div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 shadow-xl">
				<h2 class="text-2xl font-semibold mb-4 text-purple-400">Platform Triggers</h2>
				<p class="text-slate-300 mb-6">
					Test the install dialog with different platform configurations. The component will auto-detect the platform, but these buttons trigger the dialog.
				</p>
				<div class="space-y-3">
					<button 
						on:click={triggerChromium}
						class="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-6 rounded-lg transition shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/50"
					>
						Chromium
					</button>
					<button 
						on:click={triggerAppleDesktop}
						class="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium py-3 px-6 rounded-lg transition shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500/50"
					>
						Apple Desktop
					</button>
					<button 
						on:click={triggerAppleMobile}
						class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
					>
						Apple Mobile
					</button>
				</div>
			</div>
		</div>
		
		<!-- General Install Button -->
		<div class="mt-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 shadow-xl">
			<h2 class="text-2xl font-semibold mb-4 text-green-400">General Install</h2>
			<p class="text-slate-300 mb-6">
				Trigger the standard install dialog without any platform-specific modifications.
			</p>
			<button 
				on:click={triggerInstallDialog}
				class="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
			>
				Install App
			</button>
		</div>
		
		<!-- Info Section -->
		<div class="mt-8 bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
			<h3 class="text-xl font-semibold mb-3 text-yellow-400">💡 Demo Information</h3>
			<ul class="space-y-2 text-slate-300">
				<li class="flex items-start">
					<span class="text-yellow-400 mr-2">•</span>
					<span>The platform buttons trigger the install dialog but the component auto-detects your actual platform</span>
				</li>
				<li class="flex items-start">
					<span class="text-yellow-400 mr-2">•</span>
					<span>Platform-specific styling and behavior will match your actual device and browser</span>
				</li>
				<li class="flex items-start">
					<span class="text-yellow-400 mr-2">•</span>
					<span>The description toggle affects the install dialog content when it appears</span>
				</li>
			</ul>
		</div>
	</div>
</div>