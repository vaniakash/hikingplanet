'use client';

import React, { useState } from 'react';

export default function PayUTestPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTestPayment = async () => {
        setLoading(true);
        setError('');

        try {
            // Test user details
            const testPayload = {
                name: 'Test User',
                email: 'test@example.com',
                mobile: '9999999999',
                city: 'Test City',
                trekkers: '1',
                month: 'September',
                experience: 'Beginner',
                message: 'This is a test payment'
            };

            const response = await fetch('/api/payu/init', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testPayload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to initialize payment');
            }

            // Create dynamic form and submit to PayU
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = data.payuUrl; // e.g. https://secure.payu.in/_payment

            const fields: Record<string, string> = {
                key: data.key,
                txnid: data.txnid,
                amount: data.amount,
                productinfo: data.productinfo,
                firstname: data.firstname,
                email: data.email,
                phone: data.phone,
                surl: data.surl,
                furl: data.furl,
                hash: data.hash,
                udf1: data.udf1
            };

            Object.keys(fields).forEach((key) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = fields[key];
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();

        } catch (err: any) {
            console.error('Payment Test Error:', err);
            setError(err.message || 'An error occurred during payment initialization.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">PayU Payment Gateway Test</h1>
                <p className="text-gray-500">
                    Click the button below to initialize a ₹10 test payment using the live PayU credentials.
                </p>
                
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleTestPayment}
                    disabled={loading}
                    className="w-full bg-[#dc2626] text-white py-3 px-4 rounded-lg font-bold hover:bg-red-700 transition disabled:opacity-50"
                >
                    {loading ? 'Initializing...' : 'Test Payment Window'}
                </button>
            </div>
        </div>
    );
}
