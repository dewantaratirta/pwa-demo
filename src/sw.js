import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

// Workbox Precaching
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();
clientsClaim();

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBvF7uS1iyJJbO33phdoHvw5SEK3IyJLAk",
    authDomain: "newagent-6f729.firebaseapp.com",
    databaseURL: "https://newagent-6f729.firebaseio.com",
    projectId: "newagent-6f729",
    storageBucket: "newagent-6f729.firebasestorage.app",
    messagingSenderId: "309988290785",
    appId: "1:309988290785:web:b17a2011ae38de262a87a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Background Message Handler
let lastPayloadString = null;

onBackgroundMessage(messaging, (payload) => {
    console.log('[sw.js] Received background message ', payload);

    if (payload.data) {
        // Deduplication: Compare only title and body to ignore other differences (like icon)
        const currentMessageId = payload.data.title + '|' + payload.data.body;

        if (lastPayloadString === currentMessageId) {
            console.log('[sw.js] Duplicate notification suppressed');
            return;
        }

        lastPayloadString = currentMessageId;

        const notificationTitle = payload.data.title;
        const notificationOptions = {
            body: payload.data.body,
            icon: payload.data.icon,
            data: payload.data
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
    }
});
