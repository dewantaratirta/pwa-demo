<script>
  import { page } from "$app/stores";

  /** @type {boolean} */
  let mobileMenuOpen = false;

  /**
   * Toggles the mobile menu open/closed state
   * @returns {void}
   */
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  /**
   * Closes the mobile menu
   * @returns {void}
   */
  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
</script>

<nav
  class="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo/Brand -->
      <div class="flex items-center">
        <a href="/" class="flex items-center space-x-2">
          <div
            class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <span class="text-xl font-bold text-white">PWA Demo</span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:block">
        <div class="ml-10 flex items-baseline space-x-4">
          <a
            href="/"
            class="px-3 py-2 rounded-md text-sm font-medium {$page.url
              .pathname === '/'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
              : 'text-slate-300 hover:bg-slate-700 hover:text-white transition-colors'}"
          >
            Home
          </a>
          <a
            href="/demo"
            class="px-3 py-2 rounded-md text-sm font-medium {$page.url
              .pathname === '/demo'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
              : 'text-slate-300 hover:bg-slate-700 hover:text-white transition-colors'}"
          >
            Demo
          </a>
          <a
            href="/push-notification"
            class="px-3 py-2 rounded-md text-sm font-medium {$page.url
              .pathname === '/push-notification'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
              : 'text-slate-300 hover:bg-slate-700 hover:text-white transition-colors'}"
          >
            Push Notification
          </a>
        </div>
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button
          on:click={toggleMobileMenu}
          class="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          {#if mobileMenuOpen}
            <!-- Close icon -->
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          {:else}
            <!-- Menu icon -->
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  {#if mobileMenuOpen}
    <div
      class="md:hidden bg-slate-800/95 backdrop-blur-md border-t border-slate-700/50"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a
          href="/"
          class="block px-3 py-2 rounded-md text-base font-medium {$page.url
            .pathname === '/'
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            : 'text-slate-300 hover:bg-slate-700 hover:text-white transition-colors'}"
          on:click={closeMobileMenu}
        >
          Home
        </a>
        <a
          href="/demo"
          class="block px-3 py-2 rounded-md text-base font-medium {$page.url
            .pathname === '/demo'
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            : 'text-slate-300 hover:bg-slate-700 hover:text-white transition-colors'}"
          on:click={closeMobileMenu}
        >
          Demo
        </a>
        <a
          href="/push-notification"
          class="block px-3 py-2 rounded-md text-base font-medium {$page.url
            .pathname === '/push-notification'
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            : 'text-slate-300 hover:bg-slate-700 hover:text-white transition-colors'}"
          on:click={closeMobileMenu}
        >
          Push Notification
        </a>
      </div>
    </div>
  {/if}
</nav>
