'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

export default function AdhikariLocatorScreen() {
    const setScreen = useAppStore((s) => s.setScreen);
    const setWalletTier = useAppStore((s) => s.setWalletTier);

    const handleBiometricKYC = () => {
        // Simulate Adhikari-assisted biometric KYC
        setWalletTier('prime');
        setScreen('kycSuccess');
    };

    return (
        <div className="screen" style={{ height: '100%', background: '#FFF9F0' }}>
            {/* Header */}
            <div style={{ padding: '48px 24px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                    onClick={() => setScreen('home')}
                    style={{
                        background: 'rgba(0,0,0,0.05)', border: 'none', width: 36, height: 36,
                        borderRadius: 12, fontSize: 16, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    ←
                </button>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e' }}>Find Adhikari</h2>
            </div>

            {/* Hero Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    margin: '0 20px',
                    background: 'linear-gradient(135deg, #0A6B5C, #33C3A9)',
                    borderRadius: 20,
                    padding: '24px',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: 20,
                }}
            >
                <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', top: -30, right: -20 }} />
                <span style={{ fontSize: 32, display: 'block', marginBottom: 12 }}>🤝</span>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 6 }}>
                    Need Help? Let Suresh help you!
                </h2>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                    Complete your KYC using Biometrics in just 2 minutes!
                </p>
            </motion.div>

            {/* Map Simulation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                    margin: '0 20px 20px',
                    height: 200,
                    borderRadius: 18,
                    background: 'linear-gradient(135deg, #CCF0EA, #E6F7F4)',
                    border: '2px solid #0A6B5C22',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Grid for map effect */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={`h${i}`} style={{ position: 'absolute', top: `${i * 25}px`, left: 0, right: 0, height: 1, background: '#0A6B5C' }} />
                    ))}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={`v${i}`} style={{ position: 'absolute', left: `${i * 70}px`, top: 0, bottom: 0, width: 1, background: '#0A6B5C' }} />
                    ))}
                </div>

                {/* User marker */}
                <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        top: '45%',
                        left: '35%',
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: '#FF6B35',
                        border: '3px solid white',
                        boxShadow: '0 0 20px rgba(255, 107, 53, 0.5)',
                        zIndex: 2,
                    }}
                />
                <div style={{ position: 'absolute', top: 'calc(45% + 20px)', left: 'calc(35% - 8px)', fontSize: 10, fontWeight: 700, color: '#FF6B35' }}>You</div>

                {/* Adhikari marker */}
                <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        top: '30%',
                        right: '25%',
                        fontSize: 28,
                        zIndex: 2,
                    }}
                >
                    📍
                </motion.div>
                <div style={{ position: 'absolute', top: 'calc(30% + 32px)', right: 'calc(25% - 16px)', fontSize: 10, fontWeight: 700, color: '#0A6B5C' }}>Suresh</div>

                {/* Distance line */}
                <div
                    style={{
                        position: 'absolute',
                        top: '42%',
                        left: '38%',
                        width: '30%',
                        height: 2,
                        background: '#0A6B5C44',
                        borderTop: '2px dashed #0A6B5C44',
                        zIndex: 1,
                    }}
                />
            </motion.div>

            {/* Adhikari Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                    margin: '0 20px 20px',
                    background: 'white',
                    borderRadius: 20,
                    padding: '20px',
                    border: '1px solid #F0F0F0',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                }}
            >
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                    {/* Agent Avatar */}
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 18,
                            background: 'linear-gradient(135deg, #FFE0B5, #FFF0DB)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}
                    >
                        <span style={{ fontSize: 32 }}>👨‍💼</span>
                    </div>

                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1a1a2e', marginBottom: 4 }}>Suresh Kumar</h3>
                        <p style={{ fontSize: 13, color: '#888', marginBottom: 6 }}>🏪 Suresh Communications</p>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <span style={{ fontSize: 12, color: '#0A6B5C', fontWeight: 700, background: '#E6F7F4', padding: '3px 10px', borderRadius: 100 }}>
                                📍 500m away
                            </span>
                            <span style={{ fontSize: 12, color: '#F7931E', fontWeight: 600 }}>
                                ⭐ 4.8
                            </span>
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                    {['Biometric KYC', 'Cash Deposit', 'Bill Pay', 'Recharge'].map((service) => (
                        <span
                            key={service}
                            style={{
                                fontSize: 11,
                                fontWeight: 600,
                                color: '#666',
                                background: '#F5F5F5',
                                padding: '4px 10px',
                                borderRadius: 100,
                            }}
                        >
                            {service}
                        </span>
                    ))}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 10 }}>
                    <button
                        style={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #0A6B5C, #33C3A9)',
                            color: 'white',
                            border: 'none',
                            padding: '14px',
                            borderRadius: 14,
                            fontWeight: 700,
                            fontSize: 14,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                        }}
                    >
                        📞 Call Suresh
                    </button>
                    <button
                        style={{
                            flex: 1,
                            background: 'white',
                            color: '#0A6B5C',
                            border: '2px solid #0A6B5C',
                            padding: '14px',
                            borderRadius: 14,
                            fontWeight: 700,
                            fontSize: 14,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                        }}
                    >
                        🗺️ Directions
                    </button>
                </div>
            </motion.div>

            {/* Bottom Info */}
            <div style={{ padding: '0 20px 20px' }}>
                <div style={{ background: '#E6F7F4', borderRadius: 14, padding: '16px 18px', border: '1px solid #0A6B5C22' }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0A6B5C', marginBottom: 8 }}>
                        🔐 How Biometric KYC Works
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                            '1. Visit Suresh at his shop',
                            '2. Place your thumb on the scanner',
                            '3. Your Aadhaar is verified instantly',
                            '4. Full KYC complete! No documents needed.',
                        ].map((step, i) => (
                            <p key={i} style={{ fontSize: 13, color: '#0A6B5C99', lineHeight: 1.4 }}>{step}</p>
                        ))}
                    </div>
                </div>

                {/* Simulate biometric KYC success */}
                <button
                    className="btn-teal"
                    onClick={handleBiometricKYC}
                    style={{ marginTop: 16 }}
                >
                    Simulate: Biometric KYC Complete ✅
                </button>
            </div>
        </div>
    );
}
