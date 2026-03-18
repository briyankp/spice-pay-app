'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

export default function MobileNumberScreen() {
    const [mobile, setMobile] = useState('');
    const [binding, setBinding] = useState(false);
    const [bound, setBound] = useState(false);
    const setScreen = useAppStore((s) => s.setScreen);
    const setUser = useAppStore((s) => s.setUser);
    const setSimBound = useAppStore((s) => s.setSimBound);

    const handleContinue = () => {
        if (mobile.length !== 10) return;
        setBinding(true);
        // Simulate SIM binding
        setTimeout(() => {
            setBound(true);
            setSimBound(true);
            setUser({ mobile });
            setTimeout(() => setScreen('otp'), 800);
        }, 2000);
    };

    return (
        <div
            className="screen"
            style={{
                height: '100%',
                background: '#FFF9F0',
                display: 'flex',
                flexDirection: 'column',
                padding: '60px 28px 40px',
            }}
        >
            {/* Back button */}
            <button
                onClick={() => setScreen('permissions')}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#999',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    padding: '4px 0',
                    marginBottom: 24,
                }}
            >
                ← Back
            </button>

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>
                    Enter Your Mobile
                </h1>
                <p style={{ fontSize: 15, color: '#777', lineHeight: 1.6, marginBottom: 32 }}>
                    We&apos;ll send an OTP and securely bind your SIM to this device.
                </p>
            </motion.div>

            {/* Phone Input */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{ marginBottom: 24 }}
            >
                <label style={{ fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8, display: 'block' }}>
                    Mobile Number
                </label>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        background: 'white',
                        borderRadius: 14,
                        border: '2px solid #E5E5E5',
                        padding: '4px 4px 4px 18px',
                        transition: 'border-color 0.2s',
                    }}
                >
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', whiteSpace: 'nowrap' }}>
                        🇮🇳 +91
                    </span>
                    <div style={{ width: 1, height: 28, background: '#E5E5E5' }} />
                    <input
                        type="tel"
                        maxLength={10}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 10-digit number"
                        disabled={binding}
                        style={{
                            flex: 1,
                            border: 'none',
                            padding: '14px 0',
                            fontSize: 18,
                            fontWeight: 600,
                            letterSpacing: 2,
                            background: 'transparent',
                            color: '#1a1a2e',
                        }}
                    />
                </div>
            </motion.div>

            {/* SIM Selector */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ marginBottom: 32 }}
            >
                <label style={{ fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8, display: 'block' }}>
                    Select SIM for Binding
                </label>
                <div style={{ display: 'flex', gap: 12 }}>
                    {['SIM 1', 'SIM 2'].map((sim, i) => (
                        <button
                            key={i}
                            style={{
                                flex: 1,
                                padding: '14px',
                                borderRadius: 14,
                                border: i === 0 ? '2px solid #FF6B35' : '2px solid #E5E5E5',
                                background: i === 0 ? '#FFF0DB' : 'white',
                                fontSize: 14,
                                fontWeight: 600,
                                color: i === 0 ? '#FF6B35' : '#999',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                            }}
                        >
                            <span style={{ fontSize: 18 }}>📶</span>
                            {sim}
                            {i === 0 && <span style={{ fontSize: 12 }}>✓</span>}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Binding Animation */}
            <AnimatePresence>
                {binding && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0 }}
                        style={{
                            background: bound ? '#E6F7F4' : '#FFF9F0',
                            borderRadius: 14,
                            padding: '16px 20px',
                            marginBottom: 24,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            border: `1px solid ${bound ? '#0A6B5C33' : '#F7931E33'}`,
                        }}
                    >
                        {!bound ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    style={{ fontSize: 20 }}
                                >
                                    ⏳
                                </motion.div>
                                <div>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: '#F7931E' }}>Binding Device...</p>
                                    <p style={{ fontSize: 12, color: '#999' }}>Sending silent SMS for verification</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    style={{ fontSize: 20 }}
                                >
                                    ✅
                                </motion.span>
                                <div>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0A6B5C' }}>Device Bound!</p>
                                    <p style={{ fontSize: 12, color: '#0A6B5C99' }}>IMSI verified successfully</p>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ flex: 1 }} />

            <button
                className="btn-primary"
                onClick={handleContinue}
                disabled={mobile.length !== 10 || binding}
                style={{
                    opacity: mobile.length === 10 && !binding ? 1 : 0.5,
                    cursor: mobile.length === 10 && !binding ? 'pointer' : 'not-allowed',
                }}
            >
                {binding ? 'Verifying...' : 'Send OTP & Bind'}
            </button>
        </div>
    );
}
