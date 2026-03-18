'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

export default function ProfileScreen() {
    const user = useAppStore((s) => s.user);
    const walletTier = useAppStore((s) => s.walletTier);
    const setScreen = useAppStore((s) => s.setScreen);

    const menuItems = [
        { icon: '🔐', label: 'Change PIN', action: () => { } },
        { icon: '🌐', label: 'Language / भाषा', action: () => { } },
        { icon: '📋', label: 'Transaction History', action: () => { } },
        { icon: '🔔', label: 'Notifications', action: () => { } },
        { icon: '❓', label: 'Help & Support', action: () => { } },
        { icon: '📜', label: 'Terms & Conditions', action: () => { } },
        { icon: '🔒', label: 'Privacy Policy', action: () => { } },
    ];

    return (
        <div className="screen" style={{ background: '#FFF9F0' }}>
            {/* Header */}
            <div className="gradient-header" style={{ padding: '48px 24px 32px', borderRadius: '0 0 28px 28px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', top: -60, right: -40 }} />

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                    style={{
                        width: 72, height: 72, borderRadius: 24,
                        background: 'rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                    }}
                >
                    <span style={{ fontSize: 36 }}>👤</span>
                </motion.div>

                <h2 style={{ color: 'white', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
                    {user.name || 'User'}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 12 }}>
                    +91 {user.mobile || '**********'}
                </p>
                <span className={walletTier === 'prime' ? 'tier-badge-prime' : walletTier === 'lite' ? 'tier-badge-lite' : ''}>
                    {walletTier === 'prime' ? '★ Prime Member' : walletTier === 'lite' ? 'Lite Member' : 'No Wallet'}
                </span>
            </div>

            {/* KYC Progress */}
            <div style={{ padding: '24px 20px 0' }}>
                <div
                    style={{
                        background: 'white', borderRadius: 18, padding: '20px',
                        border: '1px solid #F0F0F0', marginBottom: 20,
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e' }}>KYC Status</h3>
                        {walletTier !== 'prime' && (
                            <button
                                onClick={() => setScreen('kycUpgrade')}
                                style={{
                                    background: 'linear-gradient(135deg, #FF6B35, #F7931E)', color: 'white',
                                    border: 'none', padding: '6px 16px', borderRadius: 100,
                                    fontWeight: 700, fontSize: 12, cursor: 'pointer',
                                }}
                            >
                                Upgrade
                            </button>
                        )}
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                        <div style={{ flex: 1, height: 6, borderRadius: 100, background: '#0A6B5C' }} />
                        <div style={{ flex: 1, height: 6, borderRadius: 100, background: walletTier !== 'none' ? '#0A6B5C' : '#E5E5E5' }} />
                        <div style={{ flex: 1, height: 6, borderRadius: 100, background: walletTier === 'prime' ? '#0A6B5C' : '#E5E5E5' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 11, color: '#0A6B5C', fontWeight: 600 }}>Registered</span>
                        <span style={{ fontSize: 11, color: walletTier !== 'none' ? '#0A6B5C' : '#bbb', fontWeight: 600 }}>Min KYC</span>
                        <span style={{ fontSize: 11, color: walletTier === 'prime' ? '#0A6B5C' : '#bbb', fontWeight: 600 }}>Full KYC</span>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <div style={{ padding: '0 20px 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {menuItems.map((item, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={item.action}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 14,
                                padding: '16px 18px', background: 'white',
                                border: 'none', borderBottom: '1px solid #F5F5F5',
                                cursor: 'pointer', textAlign: 'left', width: '100%',
                                borderRadius: i === 0 ? '16px 16px 0 0' : i === menuItems.length - 1 ? '0 0 16px 16px' : 0,
                            }}
                        >
                            <span style={{ fontSize: 20 }}>{item.icon}</span>
                            <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#1a1a2e' }}>
                                {item.label}
                            </span>
                            <span style={{ color: '#ccc', fontSize: 14 }}>→</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Version */}
            <div style={{ padding: '0 20px 20px', textAlign: 'center' }}>
                <p style={{ fontSize: 12, color: '#bbb' }}>Spice Pay v1.0.0 • Made with ❤️ in India</p>
            </div>
        </div>
    );
}
