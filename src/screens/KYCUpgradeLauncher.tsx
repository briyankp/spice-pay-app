'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

export default function KYCUpgradeLauncher() {
    const setScreen = useAppStore((s) => s.setScreen);

    const primeFeatures = [
        { icon: '📲', label: 'Send Money to anyone' },
        { icon: '📷', label: 'Scan & Pay via UPI QR' },
        { icon: '🔗', label: 'Get your own UPI ID' },
        { icon: '📲', label: 'QR Code to receive money' },
        { icon: '🔔', label: 'Audio alerts for transactions' },
        { icon: '🏧', label: 'Pay to any bank / anyone' },
        { icon: '💎', label: 'Wallet limit: ₹2,00,000' },
    ];

    return (
        <div className="screen" style={{
            height: '100%', display: 'flex', flexDirection: 'column',
            background: 'linear-gradient(180deg, #FFF9F0 0%, #E6F7F4 100%)',
            padding: '36px 18px 16px', overflowY: 'auto',
        }}>
            {/* Close */}
            <button onClick={() => setScreen('home')} style={{
                alignSelf: 'flex-end', background: 'rgba(0,0,0,0.05)', border: 'none',
                width: 30, height: 30, borderRadius: 10, fontSize: 14, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8,
            }}>✕</button>

            {/* Icon */}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
                style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: 'linear-gradient(135deg, #0A6B5C, #33C3A9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 10, boxShadow: '0 8px 24px rgba(10,107,92,0.25)', alignSelf: 'center',
                }}>
                <span style={{ fontSize: 26 }}>🚀</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                style={{ fontSize: 20, fontWeight: 800, color: '#1a1a2e', textAlign: 'center', marginBottom: 3 }}>
                Upgrade to Prime
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                style={{ fontSize: 11, color: '#777', textAlign: 'center', marginBottom: 12 }}>
                Full KYC unlocks everything — including all Lite features
            </motion.p>

            {/* Includes Lite */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                style={{ background: '#FFF3E0', borderRadius: 8, padding: '6px 10px', marginBottom: 10, textAlign: 'center' }}>
                <p style={{ fontSize: 9, fontWeight: 600, color: '#E65100' }}>
                    ✅ Includes all Lite Wallet features — Pay on Swiggy, Zomato, Amazon, Flipkart, Bill Pay & Recharge from wallet
                </p>
            </motion.div>

            {/* Benefits — Compact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
                {primeFeatures.map((b, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.04 }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '7px 12px', borderRadius: 10, background: 'white',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        }}>
                        <span style={{ fontSize: 15 }}>{b.icon}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#1a1a2e', flex: 1 }}>{b.label}</span>
                        <span style={{ fontSize: 11, color: '#0A6B5C' }}>✓</span>
                    </motion.div>
                ))}
            </div>

            {/* CKYC Verification Paths */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                style={{ background: 'white', borderRadius: 12, padding: '12px 14px', marginBottom: 12, border: '1px solid #0A6B5C22' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>
                    🏦 How Full KYC verification works:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ background: '#E8F5E9', borderRadius: 8, padding: '7px 10px' }}>
                        <p style={{ fontSize: 10, fontWeight: 700, color: '#2E7D32', marginBottom: 2 }}>✅ Path 1 — CKYC Found & Complete</p>
                        <p style={{ fontSize: 9, color: '#555', lineHeight: 1.4 }}>Instant activation! No Video KYC needed. Your bank records are already verified.</p>
                    </div>
                    <div style={{ background: '#FFF8E1', borderRadius: 8, padding: '7px 10px' }}>
                        <p style={{ fontSize: 10, fontWeight: 700, color: '#F57F17', marginBottom: 2 }}>🔄 Path 2 — CKYC Found but Incomplete</p>
                        <p style={{ fontSize: 9, color: '#555', lineHeight: 1.4 }}>Aadhaar via DigiLocker to fill gaps → Short Video KYC to confirm identity. Takes ~2 min.</p>
                    </div>
                    <div style={{ background: '#FFF3E0', borderRadius: 8, padding: '7px 10px' }}>
                        <p style={{ fontSize: 10, fontWeight: 700, color: '#E65100', marginBottom: 2 }}>📝 Path 3 — CKYC Not Found</p>
                        <p style={{ fontSize: 9, color: '#555', lineHeight: 1.4 }}>Fill Form 60 (DIY, 1 min) → Aadhaar via DigiLocker → Video KYC. All steps guided in-app.</p>
                    </div>
                </div>
            </motion.div>

            <button className="btn-teal" onClick={() => setScreen('fullKyc')} style={{ padding: '12px', marginBottom: 6 }}>
                Start KYC Upgrade →
            </button>

            {/* Adhikari fallback */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
                style={{ textAlign: 'center', marginBottom: 4 }}>
                <p style={{ fontSize: 9, color: '#999', marginBottom: 4 }}>Need help? Visit your nearest Adhikari for assisted KYC</p>
                <button onClick={() => setScreen('adhikari')} style={{
                    background: 'none', border: '1px solid #ddd', color: '#0A6B5C', fontSize: 11,
                    fontWeight: 600, cursor: 'pointer', padding: '6px 16px', borderRadius: 8,
                }}>
                    🤝 Find Adhikari Near Me
                </button>
            </motion.div>

            <button onClick={() => setScreen('home')} style={{
                background: 'none', border: 'none', color: '#999', fontSize: 12,
                fontWeight: 600, cursor: 'pointer', padding: '8px', textAlign: 'center',
            }}>
                Maybe Later
            </button>
        </div>
    );
}
