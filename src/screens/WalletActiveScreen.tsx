'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

export default function WalletActiveScreen() {
    const walletTier = useAppStore((s) => s.walletTier);
    const walletBalance = useAppStore((s) => s.walletBalance);
    const setScreen = useAppStore((s) => s.setScreen);

    const liteFeatures = [
        { icon: '💰', label: 'Add Money' },
        { icon: '🛒', label: 'Pay on Apps (Swiggy, Amazon, etc.)' },
        { icon: '🧾', label: 'Bill Pay (BBPS)' },
        { icon: '📱', label: 'Mobile Recharge' },
        { icon: '🏪', label: 'Merchant Payments (P2M)' },
    ];

    const primeExtras = [
        { icon: '📷', label: 'Scan & Pay via UPI QR' },
        { icon: '🔗', label: 'Get your own UPI ID' },
        { icon: '📲', label: 'QR Code to receive money' },
        { icon: '🔔', label: 'Audio alerts for send & receive' },
        { icon: '🏧', label: 'Pay to any bank account' },
        { icon: '💎', label: 'Wallet limit: ₹2,00,000' },
    ];

    const isPrime = walletTier === 'prime';

    return (
        <div className="screen" style={{ background: '#FFF9F0' }}>
            {/* Header */}
            <div
                style={{
                    background: isPrime
                        ? 'linear-gradient(135deg, #0A6B5C, #33C3A9)'
                        : 'linear-gradient(135deg, #F7931E, #FFD700)',
                    padding: '40px 20px 18px',
                    borderRadius: '0 0 24px 24px',
                    textAlign: 'center',
                    position: 'relative', overflow: 'hidden',
                }}
            >
                <div style={{ position: 'absolute', width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', top: -50, right: -50 }} />

                <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    style={{
                        width: 52, height: 52, borderRadius: 16,
                        background: 'rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 10px',
                    }}
                >
                    <span style={{ fontSize: 26 }}>👛</span>
                </motion.div>

                <span className={isPrime ? 'tier-badge-prime' : 'tier-badge-lite'} style={{ display: 'inline-block', marginBottom: 6 }}>
                    {isPrime ? '★ Spice Pay Prime' : 'Spice Pay Lite'}
                </span>

                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 3 }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 20, fontWeight: 600 }}>₹</span>
                    <span style={{ color: 'white', fontSize: 34, fontWeight: 900, letterSpacing: -1 }}>
                        {walletBalance.toLocaleString('en-IN')}
                    </span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2 }}>
                    {isPrime ? 'Limit: ₹2,00,000' : 'Limit: ₹10,000/month'}
                </p>
            </div>

            <div style={{ padding: '14px 16px 0' }}>
                {/* Lite Features */}
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>
                    {isPrime ? '✅ All Features' : '✅ Lite Features'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>
                    {liteFeatures.map((f, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 10, background: 'white', border: '1px solid #F0F0F0' }}>
                            <span style={{ fontSize: 16 }}>{f.icon}</span>
                            <span style={{ fontSize: 12, fontWeight: 500, color: '#1a1a2e', flex: 1 }}>{f.label}</span>
                            <span style={{ fontSize: 12, color: '#0A6B5C', fontWeight: 700 }}>✓</span>
                        </motion.div>
                    ))}
                </div>

                {/* Prime Features */}
                <h3 style={{ fontSize: 13, fontWeight: 700, color: isPrime ? '#0A6B5C' : '#999', marginBottom: 8 }}>
                    {isPrime ? '⭐ Prime Extras' : '🔒 Unlock with Prime'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>
                    {primeExtras.map((f, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.04 }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '8px 12px', borderRadius: 10,
                                background: isPrime ? 'white' : '#FAFAFA',
                                border: `1px solid ${isPrime ? '#F0F0F0' : '#EEE'}`,
                                opacity: isPrime ? 1 : 0.7,
                            }}>
                            <span style={{ fontSize: 16 }}>{f.icon}</span>
                            <span style={{ fontSize: 12, fontWeight: 500, color: isPrime ? '#1a1a2e' : '#bbb', flex: 1 }}>{f.label}</span>
                            {isPrime ? (
                                <span style={{ fontSize: 12, color: '#0A6B5C', fontWeight: 700 }}>✓</span>
                            ) : (
                                <span style={{ fontSize: 9, color: '#FF6B35', fontWeight: 700, background: '#FFF0DB', padding: '2px 6px', borderRadius: 100 }}>Prime</span>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Upgrade CTA */}
            {!isPrime && (
                <div style={{ padding: '0 16px 16px' }}>
                    <button className="btn-teal" onClick={() => setScreen('kycUpgrade')} style={{ padding: '13px' }}>
                        Upgrade to Prime — Unlock Everything ✨
                    </button>
                </div>
            )}

            {isPrime && (
                <div style={{ padding: '0 16px 16px', textAlign: 'center' }}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        style={{ background: '#E6F7F4', borderRadius: 12, padding: '12px', border: '1px solid #0A6B5C22' }}>
                        <span style={{ fontSize: 20, display: 'block', marginBottom: 4 }}>🎉</span>
                        <p style={{ fontSize: 12, fontWeight: 600, color: '#0A6B5C' }}>All features unlocked! Full access enabled.</p>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
