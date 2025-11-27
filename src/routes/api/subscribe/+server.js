import { json } from '@sveltejs/kit';
import { adminMessaging } from '$lib/server/firebase';

export async function POST({ request }) {
    const { token, topic = 'all' } = await request.json();

    if (!token) {
        return json({ error: 'Token is required' }, { status: 400 });
    }

    if (!adminMessaging) {
        return json({ error: 'Firebase Admin not initialized' }, { status: 500 });
    }

    try {
        await adminMessaging.subscribeToTopic(token, topic);
        return json({ success: true, message: `Subscribed to ${topic}` });
    } catch (error) {
        console.error('Error subscribing to topic:', error);
        return json({ error: error.message }, { status: 500 });
    }
}
