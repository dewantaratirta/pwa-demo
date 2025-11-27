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
onBackgroundMessage(messaging, (payload) => {
    console.log('[sw.js] Received background message ', payload);

    if (payload.notification) {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: '/favicon.png', // Ensure you have an icon
            data: payload.data
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
    }
});
