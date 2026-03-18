'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

const buyAmounts = [100, 500, 1000, 2000, 5000];

export default function GoldScreen() {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const setScreen = useAppStore((s) => s.setScreen);
    const walletTier = useAppStore((s) => s.walletTier);

    const goldRate = 7245;
    const silverRate = 89;

    const handleInvest = () => {
        if (walletTier === 'none') {
            setScreen('walletSetup');
        } else {
            // Proceed with investment (mock)
            alert('Investment initiated! (Mock)');
        }
    };

    return (
        <div className="screen" style={{ background: '#FFF9F0' }}>
            {/* Header */}
            <div
                style={{
                    background: 'linear-gradient(135deg, #D4B300, #FFD700, #F7931E)',
                    padding: '48px 24px 32px',
                    borderRadius: '0 0 28px 28px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        width: 180,
                        height: 180,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        top: -40,
                        right: -30,
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
                            Live Gold Rate
                        </p>
                        <h1 style={{ color: 'white', fontSize: 32, fontWeight: 900, letterSpacing: -1 }}>
                            ₹{goldRate.toLocaleString('en-IN')}
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>per gram (24K)</p>
                    </div>
                    <div
                        style={{
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: 12,
                            padding: '8px 14px',
                            textAlign: 'right',
                        }}
                    >
                        <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>↑ 2.3%</span>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 2 }}>Today</p>
                    </div>
                </div>

                {/* My Holdings */}
                <div
                    style={{
                        marginTop: 20,
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: 14,
                        padding: '14px 18px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <div>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginBottom: 2 }}>My Gold</p>
                        <p style={{ color: 'white', fontSize: 18, fontWeight: 800 }}>0.000 g</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginBottom: 2 }}>Value</p>
                        <p style={{ color: 'white', fontSize: 18, fontWeight: 800 }}>₹0</p>
                    </div>
                </div>
            </div>

            {/* Buy Gold */}
            <div style={{ padding: '24px 20px 0' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 6 }}>Buy Digital Gold</h3>
                <p style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>Powered by Jar • 99.9% Pure Gold</p>

                {/* Amount Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
                    {buyAmounts.map((amount) => (
                        <motion.button
                            key={amount}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                            style={{
                                padding: '10px 20px',
                                borderRadius: 100,
                                border: selectedAmount === amount ? '2px solid #D4B300' : '2px solid #E5E5E5',
                                background: selectedAmount === amount ? '#FFFDF0' : 'white',
                                fontSize: 14,
                                fontWeight: 600,
                                color: selectedAmount === amount ? '#D4B300' : '#666',
                                cursor: 'pointer',
                            }}
                        >
                            ₹{amount.toLocaleString('en-IN')}
                        </motion.button>
                    ))}
                </div>

                {/* Custom Input */}
                <div style={{ marginBottom: 20 }}>
                    <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                        placeholder="Enter custom amount"
                        className="input-field"
                    />
                </div>

                {/* Gold Weight Preview */}
                {(selectedAmount || customAmount) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        style={{
                            background: '#FFFDF0',
                            borderRadius: 14,
                            padding: '14px 18px',
                            marginBottom: 20,
                            border: '1px solid #FFD70033',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <span style={{ fontSize: 13, color: '#806C00' }}>You&apos;ll get approximately</span>
                        <span style={{ fontSize: 16, fontWeight: 800, color: '#D4B300' }}>
                            {((Number(selectedAmount || customAmount) / goldRate)).toFixed(4)} g
                        </span>
                    </motion.div>
                )}

                <button className="btn-primary" onClick={handleInvest} style={{ background: 'linear-gradient(135deg, #D4B300, #FFD700)' }}>
                    Buy Gold 🥇
                </button>
            </div>

            {/* Silver card */}
            <div style={{ padding: '24px 20px 20px' }}>
                <div
                    style={{
                        background: 'linear-gradient(135deg, #F5F5F5, #E8E8E8)',
                        borderRadius: 18,
                        padding: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                    }}
                >
                    <span style={{ fontSize: 32 }}>🪙</span>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: '#333' }}>Digital Silver</h4>
                        <p style={{ fontSize: 12, color: '#888' }}>₹{silverRate}/gram • Coming Soon</p>
                    </div>
                    <span
                        style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#888',
                            background: '#F0F0F0',
                            padding: '4px 12px',
                            borderRadius: 100,
                        }}
                    >
                        Soon
                    </span>
                </div>
            </div>
        </div>
    );
}
