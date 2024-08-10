"use client";

import React, { useState } from 'react';

export default function page() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        whatsappnumber: '',
        address: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include' 
            });

            const result = await response.text();
            setMessage(result);
        } catch (error) {
            setMessage('Failed to sign up');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} /><br/>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} /><br/>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} /><br/>
                <input type="text" name="whatsappnumber" placeholder="WhatsApp Number" value={formData.whatsappnumber} onChange={handleChange} /><br/>
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} /><br/>
                <button type="submit">Sign Up</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
