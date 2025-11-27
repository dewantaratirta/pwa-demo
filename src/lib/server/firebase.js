import admin from 'firebase-admin';
import { SERVICE_ACCOUNT_KEY } from '$env/static/private';

// Initialize Firebase Admin
// Note: In a real app, you should use environment variables for the service account
// or load it from a file.
if (!admin.apps.length) {
    try {
        // Check if we have the service account key in env
        if (SERVICE_ACCOUNT_KEY) {
            const serviceAccount = JSON.parse(SERVICE_ACCOUNT_KEY);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://newagent-6f729.firebaseio.com"
            });
        } else {
            console.warn("SERVICE_ACCOUNT_KEY not found in environment variables. Push notifications will not work.");
            // Fallback or just don't initialize if key is missing
        }
    } catch (error) {
        console.error('Firebase admin initialization error', error.stack);
    }
}

export const adminMessaging = admin.apps.length ? admin.messaging() : null;
export const adminDatabase = admin.apps.length ? admin.database() : null;
