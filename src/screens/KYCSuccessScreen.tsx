'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

const confettiColors = ['#FF6B35', '#F7931E', '#FFD700', '#0A6B5C', '#33C3A9', '#8B5CF6'];

function ConfettiPiece({ delay, color }: { delay: number; color: string }) {
    const left = Math.random() * 100;
    const size = 6 + Math.random() * 8;
    const duration = 2 + Math.random() * 2;

    return (
        <motion.div
            initial={{ y: -20, x: `${left}vw`, opacity: 1, rotate: 0 }}
            animate={{ y: '100vh', opacity: 0, rotate: 720 }}
            transition={{ duration, delay, ease: 'easeIn' }}
            style={{
                position: 'absolute',
                top: 0,
                width: size,
                height: size,
                borderRadius: Math.random() > 0.5 ? '50%' : 2,
                background: color,
                zIndex: 100,
            }}
        />
    );
}

export default function KYCSuccessScreen() {
    const setScreen = useAppStore((s) => s.setScreen);
    const setWalletBalance = useAppStore((s) => s.setWalletBalance);
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        setWalletBalance(0);
        const timer = setTimeout(() => setShowConfetti(false), 4000);
        return () => clearTimeout(timer);
    }, [setWalletBalance]);

    const unlockedFeatures = [
        { icon: '📲', label: 'Send Money (P2P)' },
        { icon: '📷', label: 'Scan & Pay via QR' },
        { icon: '🏧', label: 'Cash Out (ATM/Agent)' },
        { icon: '💰', label: 'Wallet Limit ₹2,00,000' },
        { icon: '🔗', label: 'Full UPI Access' },
    ];

    return (
        <div
            className="screen"
            style={{
                height: '100%',
                background: 'linear-gradient(180deg, #0A6B5C 0%, #085A4D 40%, #E6F7F4 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Confetti */}
            {showConfetti &&
                Array.from({ length: 30 }).map((_, i) => (
                    <ConfettiPiece
                        key={i}
                        delay={i * 0.1}
                        color={confettiColors[i % confettiColors.length]}
                    />
                ))}

            {/* Success Content */}
            <div style={{ paddingTop: 80, textAlign: 'center', paddingLeft: 28, paddingRight: 28 }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    style={{
                        width: 96,
                        height: 96,
                        borderRadius: 32,
                        background: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                    }}
                >
                    <span style={{ fontSize: 56 }}>🎉</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ fontSize: 30, fontWeight: 900, color: 'white', marginBottom: 8 }}
                >
                    Welcome to Prime!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 40, lineHeight: 1.6 }}
                >
                    Your KYC is complete. All features are now unlocked!
                </motion.p>
            </div>

            {/* Unlocked Features */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{
                    width: '100%',
                    padding: '28px',
                    flex: 1,
                }}
            >
                <div
                    style={{
                        background: 'white',
                        borderRadius: 24,
                        padding: '24px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    }}
                >
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>
                        🔓 Unlocked Features
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {unlockedFeatures.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 + i * 0.1 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    padding: '10px 14px',
                                    borderRadius: 12,
                                    background: '#E6F7F4',
                                }}
                            >
                                <span style={{ fontSize: 18 }}>{feature.icon}</span>
                                <span style={{ fontSize: 14, fontWeight: 600, color: '#0A6B5C' }}>{feature.label}</span>
                                <span style={{ marginLeft: 'auto', color: '#0A6B5C', fontWeight: 700, fontSize: 14 }}>✓</span>
                            </motion.div>
                        ))}
                    </div>

                    <button
                        className="btn-teal"
                        onClick={() => setScreen('home')}
                        style={{ marginTop: 24 }}
                    >
                        Start Using Spice Pay Prime ✨
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
