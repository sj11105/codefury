// src/app/api/signup/route.js

export async function POST(request) {
    const data = await request.json();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to sign up');
        }

        return new Response(await response.text(), { status: 200 });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
}
