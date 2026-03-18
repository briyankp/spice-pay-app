'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

const permissions = [
    {
        icon: '📱',
        title: 'SMS Permission',
        description: 'To securely bind your SIM card to this device (NPCI requirement)',
        required: true,
    },
    {
        icon: '📍',
        title: 'Location Access',
        description: 'To find nearby Spice Pay Adhikaris who can help you',
        required: false,
    },
];

export default function PermissionsScreen() {
    const setScreen = useAppStore((s) => s.setScreen);

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
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: 40 }}
            >
                <div
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: 20,
                        background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 24,
                        boxShadow: '0 8px 24px rgba(247, 147, 30, 0.3)',
                    }}
                >
                    <span style={{ fontSize: 32 }}>🔐</span>
                </div>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>
                    Quick Permissions
                </h1>
                <p style={{ fontSize: 15, color: '#777', lineHeight: 1.6 }}>
                    We need a couple of things to keep your account secure and find help nearby.
                </p>
            </motion.div>

            {/* Permission Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
                {permissions.map((perm, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.15 }}
                        className="glass-card"
                        style={{
                            padding: '20px',
                            display: 'flex',
                            gap: 16,
                            alignItems: 'flex-start',
                        }}
                    >
                        <div
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 14,
                                background: 'linear-gradient(135deg, #FFF0DB, #FFE0B5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}
                        >
                            <span style={{ fontSize: 24 }}>{perm.icon}</span>
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e' }}>{perm.title}</h3>
                                {perm.required && (
                                    <span
                                        style={{
                                            fontSize: 10,
                                            fontWeight: 700,
                                            color: '#FF6B35',
                                            background: '#FFF0DB',
                                            padding: '2px 8px',
                                            borderRadius: 100,
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        Required
                                    </span>
                                )}
                            </div>
                            <p style={{ fontSize: 13, color: '#888', lineHeight: 1.5 }}>{perm.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Info box */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                    background: '#E6F7F4',
                    borderRadius: 14,
                    padding: '14px 18px',
                    marginBottom: 24,
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                }}
            >
                <span style={{ fontSize: 16 }}>🛡️</span>
                <p style={{ fontSize: 13, color: '#0A6B5C', lineHeight: 1.5, fontWeight: 500 }}>
                    Your data stays safe. We never share your information with anyone.
                </p>
            </motion.div>

            <button className="btn-primary" onClick={() => setScreen('mobile')}>
                Allow & Continue
            </button>
        </div>
    );
}
