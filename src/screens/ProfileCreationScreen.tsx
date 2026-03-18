'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

export default function ProfileCreationScreen() {
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [pinError, setPinError] = useState('');

    const setScreen = useAppStore((s) => s.setScreen);
    const setUser = useAppStore((s) => s.setUser);
    const setOnboardingComplete = useAppStore((s) => s.setOnboardingComplete);

    const handlePinSubmit = () => {
        if (pin.length !== 4) return;
        if (pin !== confirmPin) {
            setPinError('PINs do not match');
            return;
        }
        setUser({ pin });
        setOnboardingComplete(true);
        setScreen('home');
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
            <button
                onClick={() => setScreen('otp')}
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

            {/* Progress */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
                <div style={{ flex: 1, height: 4, borderRadius: 100, background: '#F7931E' }} />
                <div style={{ flex: 1, height: 4, borderRadius: 100, background: '#F7931E' }} />
                <div style={{ flex: 1, height: 4, borderRadius: 100, background: '#F7931E' }} />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: 20,
                        background: 'linear-gradient(135deg, #0A6B5C, #33C3A9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 24,
                        boxShadow: '0 8px 24px rgba(10, 107, 92, 0.3)',
                    }}
                >
                    <span style={{ fontSize: 32 }}>🔑</span>
                </div>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>
                    Set Your App PIN
                </h1>
                <p style={{ fontSize: 15, color: '#777', lineHeight: 1.6, marginBottom: 32 }}>
                    This 4-digit PIN secures your app. Keep it secret!
                </p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8, display: 'block' }}>
                        Enter PIN
                    </label>
                    <input
                        type="password"
                        maxLength={4}
                        value={pin}
                        onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setPinError(''); }}
                        placeholder="• • • •"
                        className="input-field"
                        style={{ textAlign: 'center', letterSpacing: 16, fontSize: 24, fontWeight: 700 }}
                    />
                </div>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8, display: 'block' }}>
                        Confirm PIN
                    </label>
                    <input
                        type="password"
                        maxLength={4}
                        value={confirmPin}
                        onChange={(e) => { setConfirmPin(e.target.value.replace(/\D/g, '')); setPinError(''); }}
                        placeholder="• • • •"
                        className="input-field"
                        style={{ textAlign: 'center', letterSpacing: 16, fontSize: 24, fontWeight: 700 }}
                    />
                </div>
                {pinError && (
                    <p style={{ fontSize: 13, color: '#E53E3E', textAlign: 'center', fontWeight: 600 }}>
                        {pinError}
                    </p>
                )}
            </div>

            <div style={{ flex: 1 }} />

            <button
                className="btn-teal"
                onClick={handlePinSubmit}
                disabled={pin.length !== 4 || confirmPin.length !== 4}
                style={{
                    opacity: pin.length === 4 && confirmPin.length === 4 ? 1 : 0.5,
                }}
            >
                Secure My App 🔐
            </button>
        </div>
    );
}
