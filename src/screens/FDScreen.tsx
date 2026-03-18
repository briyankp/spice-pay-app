'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

const fdSchemes = [
    {
        bank: 'Ujjivan Small Finance',
        rate: '8.50%',
        tenure: '1 Year',
        minAmount: '₹5,000',
        tag: 'Top Rate',
        tagColor: '#FF6B35',
    },
    {
        bank: 'Unity Small Finance',
        rate: '8.25%',
        tenure: '1 Year',
        minAmount: '₹5,000',
        tag: 'Popular',
        tagColor: '#0A6B5C',
    },
    {
        bank: 'Suryoday Small Finance',
        rate: '8.10%',
        tenure: '1 Year',
        minAmount: '₹1,000',
        tag: 'Low Min',
        tagColor: '#8B5CF6',
    },
    {
        bank: 'AU Small Finance',
        rate: '7.75%',
        tenure: '1 Year',
        minAmount: '₹1,000',
        tag: '',
        tagColor: '',
    },
];

const rdSchemes = [
    { bank: 'Unity Small Finance', rate: '8.00%', minMonthly: '₹100', tenure: '12 Months' },
    { bank: 'AU Small Finance', rate: '7.50%', minMonthly: '₹500', tenure: '12 Months' },
];

export default function FDScreen() {
    const [tab, setTab] = useState<'fd' | 'rd'>('fd');
    const setScreen = useAppStore((s) => s.setScreen);
    const walletTier = useAppStore((s) => s.walletTier);

    const handleInvest = () => {
        if (walletTier === 'none') {
            setScreen('walletSetup');
        } else {
            alert('Redirecting to Fixerra SDK (Mock)');
        }
    };

    return (
        <div className="screen" style={{ background: '#FFF9F0' }}>
            {/* Header */}
            <div className="gradient-teal" style={{ padding: '48px 24px 28px', borderRadius: '0 0 28px 28px' }}>
                <h1 style={{ color: 'white', fontSize: 24, fontWeight: 800, marginBottom: 4 }}>
                    FD & RD
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
                    Powered by Fixerra • DICGC Insured
                </p>
            </div>

            {/* Tabs */}
            <div style={{ padding: '20px 20px 0', display: 'flex', gap: 8 }}>
                {(['fd', 'rd'] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: 12,
                            border: 'none',
                            background: tab === t ? '#0A6B5C' : 'white',
                            color: tab === t ? 'white' : '#666',
                            fontSize: 14,
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        {t === 'fd' ? 'Fixed Deposit' : 'Recurring Deposit'}
                    </button>
                ))}
            </div>

            {/* FD Schemes */}
            {tab === 'fd' && (
                <div style={{ padding: '20px 20px 20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {fdSchemes.map((scheme, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                style={{
                                    background: 'white',
                                    borderRadius: 18,
                                    padding: '20px',
                                    border: '1px solid #F0F0F0',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                    <div>
                                        <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>
                                            {scheme.bank}
                                        </h4>
                                        <p style={{ fontSize: 12, color: '#888' }}>Tenure: {scheme.tenure} • Min: {scheme.minAmount}</p>
                                    </div>
                                    {scheme.tag && (
                                        <span
                                            style={{
                                                fontSize: 10,
                                                fontWeight: 700,
                                                color: 'white',
                                                background: scheme.tagColor,
                                                padding: '3px 10px',
                                                borderRadius: 100,
                                            }}
                                        >
                                            {scheme.tag}
                                        </span>
                                    )}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontSize: 28, fontWeight: 900, color: '#0A6B5C' }}>{scheme.rate}</span>
                                        <span style={{ fontSize: 13, color: '#888', marginLeft: 4 }}>p.a.</span>
                                    </div>
                                    <button
                                        onClick={handleInvest}
                                        style={{
                                            background: 'linear-gradient(135deg, #0A6B5C, #33C3A9)',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px 24px',
                                            borderRadius: 12,
                                            fontWeight: 700,
                                            fontSize: 13,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Invest
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* RD Schemes */}
            {tab === 'rd' && (
                <div style={{ padding: '20px 20px 20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {rdSchemes.map((scheme, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                style={{
                                    background: 'white',
                                    borderRadius: 18,
                                    padding: '20px',
                                    border: '1px solid #F0F0F0',
                                }}
                            >
                                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>{scheme.bank}</h4>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <div>
                                        <p style={{ fontSize: 12, color: '#888' }}>Rate</p>
                                        <p style={{ fontSize: 20, fontWeight: 800, color: '#0A6B5C' }}>{scheme.rate}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 12, color: '#888' }}>Monthly</p>
                                        <p style={{ fontSize: 20, fontWeight: 800, color: '#1a1a2e' }}>{scheme.minMonthly}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 12, color: '#888' }}>Tenure</p>
                                        <p style={{ fontSize: 20, fontWeight: 800, color: '#1a1a2e' }}>{scheme.tenure}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleInvest}
                                    className="btn-teal"
                                    style={{ padding: '12px' }}
                                >
                                    Start RD →
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
