'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore, Screen } from '@/store/appStore';

export default function HomeScreen() {
    const user = useAppStore((s) => s.user);
    const walletTier = useAppStore((s) => s.walletTier);
    const walletBalance = useAppStore((s) => s.walletBalance);
    const setScreen = useAppStore((s) => s.setScreen);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const quickActions: { icon: string; label: string; locked: boolean; screen: Screen }[] = [
        { icon: '📲', label: 'Send', locked: walletTier !== 'prime', screen: 'kycUpgrade' },
        { icon: '🧾', label: 'Bill Pay', locked: false, screen: 'pay' },
        { icon: '📱', label: 'Recharge', locked: false, screen: 'pay' },
        { icon: '💰', label: 'Add Money', locked: walletTier === 'none', screen: (walletTier === 'none' ? 'walletChoice' : 'pay') as Screen },
        { icon: '🏧', label: 'Withdraw', locked: walletTier !== 'prime', screen: 'kycUpgrade' },
        { icon: '🤝', label: 'Adhikari', locked: false, screen: 'adhikari' },
    ];

    const marketplace = [
        {
            icon: '🥇',
            title: 'Digital Gold',
            subtitle: '₹7,245/g',
            badge: '↑ 2.3%',
            badgeColor: '#0A6B5C',
            bg: 'linear-gradient(135deg, #FFFDF0, #FFF3AD)',
            screen: 'gold' as const,
        },
        {
            icon: '🏦',
            title: 'Fixed Deposit',
            subtitle: 'Upto 8.5% p.a.',
            badge: 'Top Rate',
            badgeColor: '#FF6B35',
            bg: 'linear-gradient(135deg, #E6F7F4, #CCF0EA)',
            screen: 'fd' as const,
        },
        {
            icon: '📈',
            title: 'RD',
            subtitle: 'Start ₹100/mo',
            badge: 'New',
            badgeColor: '#8B5CF6',
            bg: 'linear-gradient(135deg, #F3E8FF, #E9D5FF)',
            screen: 'fd' as const,
        },
    ];

    return (
        <div className="screen" style={{ background: '#FFF9F0' }}>
            {/* Header — Compact */}
            <div
                className="gradient-header"
                style={{
                    padding: '40px 20px 18px',
                    borderRadius: '0 0 24px 24px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Decorative */}
                <div
                    style={{
                        position: 'absolute', width: 160, height: 160, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.08)', top: -50, right: -30,
                    }}
                />

                {/* Greeting + Profile */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <div>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 500, marginBottom: 1 }}>
                            {getGreeting()} 👋
                        </p>
                        <h1 style={{ color: 'white', fontSize: 20, fontWeight: 800 }}>
                            {user.name || 'User'}
                        </h1>
                    </div>
                    <button
                        onClick={() => setScreen('profilePage')}
                        style={{
                            width: 38, height: 38, borderRadius: 12,
                            background: 'rgba(255,255,255,0.2)', border: 'none',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                        }}
                    >
                        👤
                    </button>
                </div>

                {/* Wallet Card — Inline compact */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: 16,
                        padding: '14px 18px',
                        border: '1px solid rgba(255,255,255,0.2)',
                    }}
                >
                    {walletTier === 'none' ? (
                        /* No wallet — CTA to activate */
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 2 }}>Wallet Not Active</p>
                                <p style={{ color: 'white', fontSize: 14, fontWeight: 700 }}>Activate Lite Wallet to start</p>
                            </div>
                            <button
                                onClick={() => setScreen('walletChoice')}
                                style={{
                                    background: 'white', color: '#FF6B35', border: 'none',
                                    padding: '8px 16px', borderRadius: 10, fontWeight: 700,
                                    fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap',
                                }}
                            >
                                Activate →
                            </button>
                        </div>
                    ) : (
                        /* Has wallet — show balance */
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 500 }}>Balance</span>
                                    <span className={walletTier === 'prime' ? 'tier-badge-prime' : 'tier-badge-lite'}>
                                        {walletTier === 'prime' ? '★ Prime' : 'Lite'}
                                    </span>
                                </div>
                                {walletTier === 'lite' && (
                                    <button
                                        onClick={() => setScreen('kycUpgrade')}
                                        style={{
                                            background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
                                            fontSize: 10, fontWeight: 700, padding: '3px 10px',
                                            borderRadius: 100, cursor: 'pointer',
                                        }}
                                    >
                                        Upgrade ↑
                                    </button>
                                )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginTop: 4 }}>
                                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, fontWeight: 600 }}>₹</span>
                                <span style={{ color: 'white', fontSize: 30, fontWeight: 900, letterSpacing: -1 }}>
                                    {walletBalance.toLocaleString('en-IN')}
                                </span>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>

            {/* Quick Actions — Compact 3x2 grid */}
            <div style={{ padding: '16px 16px 0' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginBottom: 10 }}>Quick Actions</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {quickActions.map((action, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            onClick={() => setScreen(action.screen)}
                            style={{
                                background: 'white', borderRadius: 14,
                                padding: '12px 6px', border: '1px solid #F0F0F0',
                                cursor: 'pointer', display: 'flex', flexDirection: 'column',
                                alignItems: 'center', gap: 4, position: 'relative',
                                opacity: action.locked ? 0.6 : 1,
                            }}
                        >
                            {action.locked && (
                                <span style={{ position: 'absolute', top: 4, right: 4, fontSize: 9 }}>🔒</span>
                            )}
                            <span style={{ fontSize: 22 }}>{action.icon}</span>
                            <span style={{ fontSize: 11, fontWeight: 600, color: '#555' }}>{action.label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Save & Grow Marketplace — Compact */}
            <div style={{ padding: '16px 16px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e' }}>Save & Grow 🌱</h3>
                    <span style={{ fontSize: 12, color: '#F7931E', fontWeight: 600, cursor: 'pointer' }}>View All</span>
                </div>
                <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
                    {marketplace.map((item, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                            onClick={() => setScreen(item.screen)}
                            style={{
                                minWidth: 130, background: item.bg, borderRadius: 14,
                                padding: '14px 12px', border: 'none', cursor: 'pointer',
                                textAlign: 'left', flexShrink: 0,
                            }}
                        >
                            <span style={{ fontSize: 24, marginBottom: 6, display: 'block' }}>{item.icon}</span>
                            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>{item.title}</h4>
                            <p style={{ fontSize: 11, color: '#666', marginBottom: 6 }}>{item.subtitle}</p>
                            <span
                                style={{
                                    fontSize: 9, fontWeight: 700, color: 'white',
                                    background: item.badgeColor, padding: '2px 7px', borderRadius: 100,
                                }}
                            >
                                {item.badge}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Adhikari Banner — Only for Lite */}
            {walletTier === 'lite' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{ padding: '12px 16px 0' }}
                >
                    <button
                        onClick={() => setScreen('adhikari')}
                        style={{
                            width: '100%', background: 'linear-gradient(135deg, #E6F7F4, #CCF0EA)',
                            borderRadius: 14, padding: '12px 16px', border: '1px solid #0A6B5C22',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
                        }}
                    >
                        <span style={{ fontSize: 28 }}>🤝</span>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#0A6B5C', marginBottom: 1 }}>
                                Complete KYC with Suresh
                            </h4>
                            <p style={{ fontSize: 11, color: '#0A6B5C99' }}>
                                Your nearest Adhikari is 500m away
                            </p>
                        </div>
                        <span style={{ color: '#0A6B5C', fontSize: 16 }}>→</span>
                    </button>
                </motion.div>
            )}

            {/* Cooling Period Notice — Compact */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ padding: '12px 16px 12px' }}
            >
                <div
                    style={{
                        background: '#FFF9F0', border: '1px solid #FFE0B5',
                        borderRadius: 12, padding: '10px 12px', display: 'flex',
                        gap: 8, alignItems: 'center',
                    }}
                >
                    <span style={{ fontSize: 12 }}>ℹ️</span>
                    <p style={{ fontSize: 10, color: '#AA8F00', lineHeight: 1.4, fontWeight: 500 }}>
                        24hr cooling period active. Max ₹5,000/txn for new UPI users.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
