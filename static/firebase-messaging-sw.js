importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBvF7uS1iyJJbO33phdoHvw5SEK3IyJLAk",
    authDomain: "newagent-6f729.firebaseapp.com",
    databaseURL: "https://newagent-6f729.firebaseio.com",
    projectId: "newagent-6f729",
    storageBucket: "newagent-6f729.firebasestorage.app",
    messagingSenderId: "309988290785",
    appId: "1:309988290785:web:b17a2011ae38de262a87a0"
};

console.log("firebaseConfig", firebaseConfig);

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.png' // Ensure you have an icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
