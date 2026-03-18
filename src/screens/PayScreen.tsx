'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

const services = [
    { icon: '⚡', label: 'Electricity', color: '#FFD700' },
    { icon: '📱', label: 'Mobile', color: '#FF6B35' },
    { icon: '📺', label: 'DTH', color: '#8B5CF6' },
    { icon: '💧', label: 'Water', color: '#3B82F6' },
    { icon: '🔥', label: 'Gas', color: '#EF4444' },
    { icon: '📡', label: 'Broadband', color: '#0A6B5C' },
    { icon: '🏫', label: 'Education', color: '#F59E0B' },
    { icon: '🏥', label: 'Insurance', color: '#10B981' },
];

const recentPayments = [
    { icon: '⚡', name: 'Tata Power', amount: '₹1,240', date: 'Today', status: 'Paid' },
    { icon: '📱', name: 'Jio Recharge', amount: '₹299', date: 'Yesterday', status: 'Paid' },
    { icon: '📺', name: 'Tata Sky DTH', amount: '₹450', date: '3 days ago', status: 'Paid' },
];

export default function PayScreen() {
    const setScreen = useAppStore((s) => s.setScreen);
    const walletTier = useAppStore((s) => s.walletTier);

    return (
        <div className="screen" style={{ background: '#FFF9F0' }}>
            {/* Header */}
            <div className="gradient-header" style={{ padding: '48px 24px 28px', borderRadius: '0 0 28px 28px' }}>
                <h1 style={{ color: 'white', fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Pay & Recharge</h1>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
                    Bill payments via BBPS • Fast & Secure
                </p>
            </div>

            {/* Services Grid */}
            <div style={{ padding: '24px 20px 0' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>Bill Payments (BBPS)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    {services.map((service, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.04 }}
                            style={{
                                background: 'white',
                                borderRadius: 16,
                                padding: '14px 4px',
                                border: '1px solid #F0F0F0',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 6,
                            }}
                        >
                            <div
                                style={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: 12,
                                    background: `${service.color}15`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <span style={{ fontSize: 20 }}>{service.icon}</span>
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 600, color: '#666' }}>{service.label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Scan & Pay */}
            <div style={{ padding: '24px 20px 0' }}>
                <button
                    onClick={() => {
                        if (walletTier !== 'prime') setScreen('kycUpgrade');
                    }}
                    style={{
                        width: '100%',
                        background: walletTier === 'prime'
                            ? 'linear-gradient(135deg, #0A6B5C, #33C3A9)'
                            : '#F5F5F5',
                        borderRadius: 16,
                        padding: '18px 24px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        textAlign: 'left',
                    }}
                >
                    <span style={{ fontSize: 28 }}>📷</span>
                    <div>
                        <h4
                            style={{
                                fontSize: 15,
                                fontWeight: 700,
                                color: walletTier === 'prime' ? 'white' : '#999',
                                marginBottom: 2,
                            }}
                        >
                            Scan & Pay {walletTier !== 'prime' && '🔒'}
                        </h4>
                        <p
                            style={{
                                fontSize: 12,
                                color: walletTier === 'prime' ? 'rgba(255,255,255,0.8)' : '#bbb',
                            }}
                        >
                            {walletTier === 'prime' ? 'Scan any UPI QR to pay instantly' : 'Upgrade to Prime to unlock Scan & Pay'}
                        </p>
                    </div>
                </button>
            </div>

            {/* Recent Payments */}
            <div style={{ padding: '24px 20px 20px' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>Recent Payments</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {recentPayments.map((payment, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                            style={{
                                background: 'white',
                                borderRadius: 14,
                                padding: '14px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                border: '1px solid #F0F0F0',
                            }}
                        >
                            <span style={{ fontSize: 24 }}>{payment.icon}</span>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e' }}>{payment.name}</h4>
                                <p style={{ fontSize: 11, color: '#999' }}>{payment.date}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e' }}>{payment.amount}</p>
                                <span
                                    style={{
                                        fontSize: 10,
                                        fontWeight: 600,
                                        color: '#0A6B5C',
                                        background: '#E6F7F4',
                                        padding: '1px 8px',
                                        borderRadius: 100,
                                    }}
                                >
                                    {payment.status}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
