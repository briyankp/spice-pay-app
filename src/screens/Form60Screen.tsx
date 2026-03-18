'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

export default function Form60Screen() {
    const [reason, setReason] = useState('');
    const [income, setIncome] = useState('');
    const [address, setAddress] = useState('');
    const setScreen = useAppStore((s) => s.setScreen);

    const reasons = [
        { id: 'agriculture', label: 'Agricultural Income' },
        { id: 'below_limit', label: 'Income Below Taxable Limit' },
        { id: 'applied', label: 'PAN Applied, Not Received' },
        { id: 'other', label: 'Other Reason' },
    ];

    const handleSubmit = () => {
        if (!reason || !income) return;
        // Form 60 users get simplified KYC path
        setScreen('adhikari');
    };

    return (
        <div className="screen" style={{ background: '#FFF9F0' }}>
            {/* Header */}
            <div style={{ padding: '48px 24px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                    onClick={() => setScreen('fullKyc')}
                    style={{
                        background: 'rgba(0,0,0,0.05)', border: 'none', width: 36, height: 36,
                        borderRadius: 12, fontSize: 16, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    ←
                </button>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e' }}>Form 60 Declaration</h2>
            </div>

            <div style={{ padding: '0 28px 40px' }}>
                {/* Info Box */}
                <div style={{ background: '#FFF0DB', borderRadius: 14, padding: '14px 18px', marginBottom: 24, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 16 }}>📋</span>
                    <p style={{ fontSize: 13, color: '#AA8F00', lineHeight: 1.5 }}>
                        Form 60 is for users without PAN. It allows basic account opening but may have restricted limits. Visit an Adhikari for full biometric verification.
                    </p>
                </div>

                {/* Reason for no PAN */}
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', marginBottom: 12 }}>Why don&apos;t you have PAN?</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                    {reasons.map((r) => (
                        <button
                            key={r.id}
                            onClick={() => setReason(r.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                                borderRadius: 14,
                                border: reason === r.id ? '2px solid #F7931E' : '2px solid #E5E5E5',
                                background: reason === r.id ? '#FFF0DB' : 'white',
                                cursor: 'pointer', textAlign: 'left', width: '100%',
                            }}
                        >
                            <div
                                style={{
                                    width: 20, height: 20, borderRadius: '50%',
                                    border: reason === r.id ? 'none' : '2px solid #ccc',
                                    background: reason === r.id ? 'linear-gradient(135deg, #FF6B35, #F7931E)' : 'transparent',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}
                            >
                                {reason === r.id && <span style={{ color: 'white', fontSize: 10, fontWeight: 800 }}>✓</span>}
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 500, color: reason === r.id ? '#FF6B35' : '#666' }}>
                                {r.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Income */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8, display: 'block' }}>
                        Estimated Annual Income
                    </label>
                    <select
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        className="input-field"
                        style={{ color: income ? '#1a1a2e' : '#999' }}
                    >
                        <option value="">Select Range</option>
                        <option value="below_1l">Below ₹1,00,000</option>
                        <option value="1l_2.5l">₹1,00,000 - ₹2,50,000</option>
                        <option value="2.5l_5l">₹2,50,000 - ₹5,00,000</option>
                        <option value="above_5l">Above ₹5,00,000</option>
                    </select>
                </motion.div>

                {/* Address */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 28 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8, display: 'block' }}>
                        Current Address (Optional)
                    </label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Village/Town, District, State..."
                        className="input-field"
                        rows={3}
                        style={{ resize: 'none' }}
                    />
                </motion.div>

                <button
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={!reason || !income}
                    style={{ opacity: reason && income ? 1 : 0.5 }}
                >
                    Submit & Visit Adhikari for Biometric 🤝
                </button>
            </div>
        </div>
    );
}
