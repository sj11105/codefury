// app/verify-otp/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { emailOtp, smsOtp } = await request.json();

        // Forward the request to your Express backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailOtp, smsOtp }),
        });

        if (!response.ok) {
            throw new Error('Failed to verify OTP');
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
