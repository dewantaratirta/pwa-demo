import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";
import { getDatabase } from "firebase/database";

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
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const messaging = async () => {
    const supported = await isSupported();
    return supported ? getMessaging(app) : null;
};

export const database = getDatabase(app);
