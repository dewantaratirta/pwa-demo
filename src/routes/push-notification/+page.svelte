<script>
  import { onMount } from "svelte";
  import { messaging, database } from "$lib/firebase";
  import { getToken, onMessage } from "firebase/messaging";
  import { ref, set } from "firebase/database";

  let permissionStatus = $state("default");
  let message = $state();
  let error = $state();
  let vapidKey = $state("");
  let token = $state("");
  let logs = $state([]);
  let sendTitle = $state("");
  let sendBody = $state("");
  let isSending = $state(false);

  function addLog(msg) {
    logs = [...logs, new Date().toLocaleTimeString() + ": " + msg];
  }

  onMount(async () => {
    if ("Notification" in window) {
      permissionStatus = Notification.permission;
    }

    try {
      const msg = await messaging();
      if (msg) {
        onMessage(msg, (payload) => {
          addLog("Message received: " + JSON.stringify(payload));
          message = payload;
        });
        addLog("Messaging initialized");

        // If permission is already granted, get the token
        if (Notification.permission === "granted") {
          addLog("Permission already granted, retrieving token...");
          try {
            if (vapidKey) {
              addLog("Using VAPID key: " + vapidKey.substring(0, 10) + "...");
              const registration = await navigator.serviceWorker.ready;
              token = await getToken(msg, {
                vapidKey,
                serviceWorkerRegistration: registration,
              });
            } else {
              addLog("No VAPID key provided, trying without...");
              const registration = await navigator.serviceWorker.ready;
              token = await getToken(msg, {
                serviceWorkerRegistration: registration,
              });
            }
            addLog("Token retrieved: " + token.substring(0, 10) + "...");
          } catch (tokenError) {
            addLog("Error retrieving token: " + tokenError.message);
          }
        }
      } else {
        addLog("Firebase Messaging not supported");
        error = "Firebase Messaging not supported in this browser";
      }
    } catch (err) {
      addLog("Error initializing messaging: " + err.message);
      error = "Error initializing messaging: " + err.message;
    }
  });

  async function requestPermission() {
    error = null;
    addLog("Requesting permission...");
    try {
      permissionStatus = await Notification.requestPermission();
      addLog("Permission status: " + permissionStatus);

      if (permissionStatus === "granted") {
        const msg = await messaging();
        if (msg) {
          addLog("Getting token...");
          try {
            if (vapidKey) {
              addLog("Using VAPID key: " + vapidKey.substring(0, 10) + "...");
              const registration = await navigator.serviceWorker.ready;
              token = await getToken(msg, {
                vapidKey,
                serviceWorkerRegistration: registration,
              });
            } else {
              addLog("No VAPID key provided, trying without...");
              const registration = await navigator.serviceWorker.ready;
              token = await getToken(msg, {
                serviceWorkerRegistration: registration,
              });
            }

            addLog("Token retrieved: " + token.substring(0, 10) + "...");

            // Subscribe to 'all' topic
            try {
              addLog("Subscribing to topic 'all'...");
              const subResponse = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
              });
              const subResult = await subResponse.json();
              if (subResponse.ok) {
                addLog("Subscription result: " + subResult.message);
              } else {
                addLog("Subscription failed: " + subResult.error);
              }
            } catch (subError) {
              addLog("Error subscribing to topic: " + subError.message);
            }

            // Store token in database
            try {
              // Let's use a sanitized token as key.
              const sanitizedToken = token.replace(/[.#$/\[\]]/g, "_");
              await set(ref(database, "tokens/" + sanitizedToken), {
                token: token,
                lastUpdated: Date.now(),
              });
              addLog("Token saved to database");
            } catch (dbError) {
              addLog("Error saving token to database: " + dbError.message);
              console.error("Database error:", dbError);
            }
          } catch (tokenError) {
            addLog("Error getting token: " + tokenError.message);
            throw tokenError;
          }
        } else {
          addLog("Messaging not supported");
        }
      } else {
        error = "Notification permission denied";
        addLog("Permission denied");
      }
    } catch (err) {
      addLog("An error occurred: " + err.message);
      error = err.message || "An unknown error occurred";
    }
  }

  async function sendToAll() {
    if (!sendTitle || !sendBody) {
      alert("Please enter title and body");
      return;
    }
    isSending = true;
    addLog("Sending message to all...");
    try {
      const response = await fetch("/api/send-push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: sendTitle,
          body: sendBody,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        addLog("Send result: " + JSON.stringify(result));
        sendTitle = "";
        sendBody = "";
      } else {
        addLog("Send failed: " + result.error);
      }
    } catch (err) {
      addLog("Send error: " + err.message);
    } finally {
      isSending = false;
    }
  }
</script>

<div
  class="min-h-screen bg-slate-900 text-slate-200 py-12 px-4 sm:px-6 lg:px-8"
>
  <div class="max-w-3xl mx-auto space-y-8">
    <div class="text-center">
      <h1
        class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 sm:text-5xl sm:tracking-tight lg:text-6xl"
      >
        Push Notification Demo
      </h1>
      <p class="mt-4 text-xl text-slate-400">
        Test Firebase Cloud Messaging in your PWA.
      </p>
    </div>

    <div
      class="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-slate-700/50"
    >
      <div class="flex flex-col items-center justify-center space-y-6">
        <div class="w-full max-w-md">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-slate-400"
              >Permission Status</span
            >
            <span
              class={`px-2 py-1 rounded-full text-xs font-semibold ${
                permissionStatus === "granted"
                  ? "bg-green-500/20 text-green-400"
                  : permissionStatus === "denied"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {permissionStatus}
            </span>
          </div>

          {#if permissionStatus !== "granted"}
            <div class="space-y-3">
              <div
                class="bg-slate-900/50 p-3 rounded-lg border border-slate-700"
              >
                <label
                  for="vapidKey"
                  class="block text-xs font-medium text-slate-400 mb-1"
                  >VAPID Key (Optional but recommended)</label
                >
                <input
                  type="text"
                  id="vapidKey"
                  bind:value={vapidKey}
                  class="w-full bg-transparent border-none text-xs text-slate-300 focus:ring-0 p-0"
                  placeholder="Paste your VAPID key here"
                />
              </div>
              <button
                onclick={requestPermission}
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02]"
              >
                Request Permission
              </button>
            </div>
          {:else}
            <div class="space-y-4">
              <div>
                <label
                  for="token"
                  class="block text-sm font-medium text-slate-400 mb-1"
                  >FCM Token</label
                >
                <div class="relative">
                  <textarea
                    id="token"
                    readonly
                    value={token}
                    class="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-300 h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Token will appear here..."
                  ></textarea>
                  {#if token}
                    <button
                      class="absolute top-2 right-2 p-1 bg-slate-700 rounded hover:bg-slate-600 transition-colors"
                      onclick={() => navigator.clipboard.writeText(token)}
                      title="Copy to clipboard"
                    >
                      <svg
                        class="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        ><path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        ></path></svg
                      >
                    </button>
                  {/if}
                </div>
                <p class="text-xs text-slate-500 mt-1">
                  Use this token to send a test message from the Firebase
                  Console.
                </p>
              </div>
            </div>
          {/if}
        </div>

        {#if error}
          <div
            class="w-full max-w-md bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start space-x-3"
          >
            <svg
              class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path></svg
            >
            <span class="text-sm text-red-300">{error}</span>
          </div>
        {/if}

        {#if message}
          <div
            class="fixed top-4 right-4 z-50 w-full max-w-sm animate-fade-in-up"
          >
            <div
              class="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-2xl relative overflow-hidden backdrop-blur-xl"
            >
              <div
                class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"
              ></div>
              <div class="pl-3">
                <div class="flex justify-between items-start">
                  <h3
                    class="text-sm font-semibold text-white mb-1 flex items-center"
                  >
                    <svg
                      class="w-4 h-4 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      ></path></svg
                    >
                    New Message
                  </h3>
                  <button
                    onclick={() => (message = null)}
                    class="text-slate-400 hover:text-white transition-colors"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path></svg
                    >
                  </button>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-slate-200">
                    {message.notification?.title || "No Title"}
                  </p>
                  <p class="text-xs text-slate-400">
                    {message.notification?.body || "No Body"}
                  </p>
                </div>
                {#if message.data}
                  <div
                    class="mt-2 pt-2 border-t border-slate-700/50 text-[10px] text-slate-500 font-mono truncate"
                  >
                    {JSON.stringify(message.data)}
                  </div>
                {/if}
              </div>
            </div>
          </div>
        {/if}

        <div
          class="w-full max-w-md bg-slate-800/50 p-6 rounded-xl border border-slate-700"
        >
          <h3 class="text-lg font-semibold text-white mb-4">
            Send to All Users
          </h3>
          <div class="space-y-4">
            <div>
              <label
                for="sendTitle"
                class="block text-xs font-medium text-slate-400 mb-1"
                >Title</label
              >
              <input
                type="text"
                id="sendTitle"
                bind:value={sendTitle}
                class="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-2 text-sm text-slate-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Notification Title"
              />
            </div>
            <div>
              <label
                for="sendBody"
                class="block text-xs font-medium text-slate-400 mb-1"
                >Body</label
              >
              <textarea
                id="sendBody"
                bind:value={sendBody}
                class="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-2 text-sm text-slate-300 h-20 focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Notification Body"
              ></textarea>
            </div>
            <button
              onclick={sendToAll}
              disabled={isSending}
              class="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? "Sending..." : "Send Notification"}
            </button>
          </div>
        </div>

        <div class="w-full max-w-md mt-8">
          <h3 class="text-sm font-medium text-slate-400 mb-2">Debug Logs</h3>
          <div
            class="bg-black/50 rounded-lg p-4 font-mono text-xs text-green-400 h-48 overflow-y-auto border border-slate-800"
          >
            {#each logs as log}
              <div class="mb-1">{log}</div>
            {/each}
            {#if logs.length === 0}
              <div class="text-slate-600 italic">No logs yet...</div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
  }
</style>
