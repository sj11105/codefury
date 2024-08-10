"use client";

import React, { useState } from 'react';

export default function page() {
    const [otpData, setOtpData] = useState({
        emailOtp: '',
        smsOtp: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setOtpData({
            ...otpData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(otpData),
                credentials: 'include'
            });

            const result = await response.text();

            setMessage(result || 'OTP verified successfully');
        } catch (error) {
            setMessage('Failed to verify OTP');
        }
    };

    return (
        <div>
            <h1>Verify OTP</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="emailOtp" placeholder="Email OTP" value={otpData.emailOtp} onChange={handleChange} />
                <input type="text" name="smsOtp" placeholder="SMS OTP" value={otpData.smsOtp} onChange={handleChange} />
                <button type="submit">Verify OTP</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
