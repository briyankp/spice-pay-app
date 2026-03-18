'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

export default function WalletChoiceScreen() {
    const setScreen = useAppStore((s) => s.setScreen);

    return (
        <div className="screen" style={{
            background: 'linear-gradient(180deg, #FFF9F0 0%, #E6F7F4 100%)',
            display: 'flex', flexDirection: 'column', padding: '36px 18px 18px',
        }}>
            {/* Close */}
            <button onClick={() => setScreen('home')} style={{
                alignSelf: 'flex-end', background: 'rgba(0,0,0,0.05)', border: 'none',
                width: 30, height: 30, borderRadius: 10, fontSize: 14, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
            }}>✕</button>

            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: 20, fontWeight: 800, color: '#1a1a2e', textAlign: 'center', marginBottom: 4 }}>
                Choose Your Wallet
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                style={{ fontSize: 11, color: '#777', textAlign: 'center', marginBottom: 16 }}>
                Start with Lite or go full-power with Prime
            </motion.p>

            {/* Lite Card */}
            <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                style={{
                    background: 'linear-gradient(135deg, #FFF9F0, #FFE8CC)', borderRadius: 16,
                    padding: '14px 16px', marginBottom: 10,
                    border: '2px solid #F7931E33', position: 'relative',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: 'linear-gradient(135deg, #F7931E, #FFD700)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <span style={{ fontSize: 18 }}>👛</span>
                    </div>
                    <div>
                        <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1a1a2e' }}>Lite Wallet</h3>
                        <p style={{ fontSize: 10, color: '#F7931E', fontWeight: 600 }}>Min KYC • Quick Setup</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                    {['🛒 Pay on Swiggy, Zomato', '🛍️ Amazon, Flipkart', '💰 Add Money', '🧾 Bill Pay from Wallet', '📱 Recharge from Wallet'].map((f, i) => (
                        <span key={i} style={{
                            fontSize: 9, fontWeight: 500, padding: '3px 7px', borderRadius: 100,
                            background: 'white', color: '#666', border: '1px solid #F0F0F0',
                        }}>{f}</span>
                    ))}
                </div>

                {/* KYC requirement */}
                <div style={{ background: '#FFF3E0', borderRadius: 6, padding: '5px 8px', marginBottom: 8 }}>
                    <p style={{ fontSize: 9, fontWeight: 600, color: '#E65100', lineHeight: 1.4 }}>
                        📋 Requires: Any 1 OVD (Aadhaar, PAN, Voter ID, DL, Passport, or MREGA Card)
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: '#999' }}>Limit: ₹10,000/month</span>
                    <button onClick={() => setScreen('walletSetup')} className="btn-primary"
                        style={{ padding: '8px 18px', fontSize: 12, fontWeight: 700, borderRadius: 10 }}>
                        Activate Lite →
                    </button>
                </div>
            </motion.div>

            {/* Prime Card */}
            <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
                style={{
                    background: 'linear-gradient(135deg, #E6F7F4, #CCF0EA)', borderRadius: 16,
                    padding: '14px 16px', marginBottom: 10,
                    border: '2px solid #0A6B5C33', position: 'relative',
                }}>
                <div style={{
                    position: 'absolute', top: 10, right: 12, fontSize: 8, fontWeight: 700,
                    background: '#0A6B5C', color: 'white', padding: '2px 8px', borderRadius: 100,
                }}>RECOMMENDED</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: 'linear-gradient(135deg, #0A6B5C, #33C3A9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <span style={{ fontSize: 18 }}>⭐</span>
                    </div>
                    <div>
                        <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1a1a2e' }}>Prime Wallet</h3>
                        <p style={{ fontSize: 10, color: '#0A6B5C', fontWeight: 600 }}>Full KYC • All Features</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 4 }}>
                    <span style={{ fontSize: 9, fontWeight: 600, color: '#0A6B5C', padding: '2px 0' }}>Everything in Lite, plus:</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                    {['📲 Send Money', '📷 Scan & Pay via UPI QR', '🔗 Your own UPI ID', '📲 QR to Receive', '🔔 Audio Alerts', '🏧 Pay to Any Bank', '💎 ₹2L Limit'].map((f, i) => (
                        <span key={i} style={{
                            fontSize: 9, fontWeight: 500, padding: '3px 7px', borderRadius: 100,
                            background: 'white', color: '#0A6B5C', border: '1px solid #0A6B5C22',
                        }}>{f}</span>
                    ))}
                </div>

                {/* CKYC verification paths */}
                <div style={{ background: 'white', borderRadius: 8, padding: '8px 10px', marginBottom: 8, border: '1px solid #0A6B5C15' }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: '#1a1a2e', marginBottom: 5 }}>🏦 KYC Verification Paths:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ background: '#E8F5E9', borderRadius: 5, padding: '4px 7px' }}>
                            <p style={{ fontSize: 8, fontWeight: 700, color: '#2E7D32' }}>✅ CKYC Found & Complete → Instant! No Video KYC</p>
                        </div>
                        <div style={{ background: '#FFF8E1', borderRadius: 5, padding: '4px 7px' }}>
                            <p style={{ fontSize: 8, fontWeight: 700, color: '#F57F17' }}>🔄 CKYC Partial → DigiLocker + Video KYC (~2 min)</p>
                        </div>
                        <div style={{ background: '#FFF3E0', borderRadius: 5, padding: '4px 7px' }}>
                            <p style={{ fontSize: 8, fontWeight: 700, color: '#E65100' }}>📝 CKYC Not Found → Form 60 DIY + DigiLocker + Video KYC</p>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: '#999' }}>Limit: ₹2,00,000</span>
                    <button onClick={() => setScreen('kycUpgrade')} className="btn-teal"
                        style={{ padding: '8px 18px', fontSize: 12, fontWeight: 700, borderRadius: 10 }}>
                        Upgrade to Prime →
                    </button>
                </div>
            </motion.div>

            <div style={{ flex: 1 }} />

            {/* Info */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                <p style={{ fontSize: 9, color: '#999', lineHeight: 1.4 }}>
                    💡 You can start with Lite and upgrade to Prime anytime. All your data carries forward.
                </p>
            </motion.div>
        </div>
    );
}
