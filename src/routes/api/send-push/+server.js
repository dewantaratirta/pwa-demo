import { json } from '@sveltejs/kit';
import { adminMessaging, adminDatabase } from '$lib/server/firebase';

export async function POST({ request }) {
    const { title, body } = await request.json();

    if (!title || !body) {
        return json({ error: 'Title and body are required' }, { status: 400 });
    }

    if (!adminMessaging || !adminDatabase) {
        return json({ error: 'Firebase Admin not initialized' }, { status: 500 });
    }

    try {
        console.log('Sending message to topic: all');

        const message = {
            notification: {
                title,
                body
            },
            topic: 'all'
        };

        const response = await adminMessaging.send(message);
        console.log('Message sent, response:', response);

        return json({
            success: true,
            messageId: response
        });

    } catch (error) {
        console.error('Error sending message:', error);
        return json({ error: error.message }, { status: 500 });
    }
}
