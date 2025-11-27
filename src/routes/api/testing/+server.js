export const prerender = true;

export async function GET() {
    return new Response('Hello', {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}