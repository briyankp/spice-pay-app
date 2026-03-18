'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore, Screen } from '@/store/appStore';

export default function HomeScreenVariantC() {
    const user = useAppStore((s) => s.user);
    const walletBalance = useAppStore((s) => s.walletBalance);
    const walletTier = useAppStore((s) => s.walletTier);
    const setScreen = useAppStore((s) => s.setScreen);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'सुप्रभात';
        if (hour < 17) return 'नमस्कार';
        return 'शुभ संध्या';
    };

    const moneyShortcuts = [
        { icon: '💸', label: 'भेजें', color: '#FF6B35', screen: 'pay' as Screen },
        { icon: '📥', label: 'प्राप्त करें', color: '#0A6B5C', screen: 'pay' as Screen },
        { icon: '💰', label: 'जमा करें', color: '#D4A017', screen: 'pay' as Screen },
        { icon: '📨', label: 'मंगवाएं', color: '#8B5CF6', screen: 'pay' as Screen },
    ];

    const savingsProgress = [
        {
            icon: '🥇', label: 'Gold', value: '₹76.93', sub: '0.0043g',
            color: '#8B6914', bg: '#FFFDF0', progress: 0.35, screen: 'gold' as Screen,
        },
        {
            icon: '🏦', label: 'FD', value: '8.5%', sub: 'p.a.',
            color: '#0A6B5C', bg: '#E6F7F4', progress: 0.7, screen: 'fd' as Screen,
        },
        {
            icon: '📈', label: 'RD', value: '₹100', sub: '/महीना',
            color: '#8B5CF6', bg: '#F3E8FF', progress: 0.15, screen: 'fd' as Screen,
        },
    ];

    const addMoneyWays = [
        { icon: '🏪', label: 'अधिकारी से जमा', tag: 'FREE', tagColor: '#0A6B5C' },
        { icon: '🏦', label: 'बैंक से ट्रांसफर', tag: 'No Charges', tagColor: '#2563EB' },
        { icon: '📥', label: 'पेमेंट प्राप्त करें', tag: 'QR/UPI', tagColor: '#FF6B35' },
        { icon: '📨', label: 'कलेक्ट रिक्वेस्ट', tag: 'Request', tagColor: '#8B5CF6' },
    ];

    const quickServices = [
        { icon: '📱', label: 'रिचार्ज' },
        { icon: '💡', label: 'बिजली' },
        { icon: '📺', label: 'DTH' },
        { icon: '🔄', label: 'लोन EMI' },
        { icon: '📋', label: 'और देखें' },
    ];

    return (
        <div className="screen" style={{ background: '#FFF9F0' }}>
            {/* -------- HEADER WITH LARGE BALANCE -------- */}
            <div
                className="gradient-header"
                style={{
                    padding: '44px 20px 22px',
                    borderRadius: '0 0 32px 32px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div style={{ position: 'absolute', width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', top: -50, right: -30 }} />
                <div style={{ position: 'absolute', width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', bottom: 30, left: 20 }} />

                {/* Top row: greeting + profile */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 500, marginBottom: 2 }}>
                            {getGreeting()} 🙏
                        </p>
                        <h1 style={{ color: 'white', fontSize: 20, fontWeight: 800 }}>
                            {user.name || 'User'}
                        </h1>
                    </div>
                    <button
                        onClick={() => setScreen('profilePage')}
                        style={{
                            width: 38, height: 38, borderRadius: 12,
                            background: 'rgba(255,255,255,0.18)', border: 'none',
                            cursor: 'pointer', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: 18,
                        }}
                    >👤</button>
                </div>

                {/* Large balance display */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'rgba(255,255,255,0.14)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        borderRadius: 20,
                        padding: '16px 20px',
                        border: '1px solid rgba(255,255,255,0.15)',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 500, marginBottom: 4 }}>
                                आपका बैलेंस
                            </p>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, fontWeight: 600 }}>₹</span>
                                <span style={{ color: 'white', fontSize: 36, fontWeight: 900, letterSpacing: -1 }}>
                                    {walletBalance.toLocaleString('en-IN')}
                                </span>
                            </div>
                        </div>
                        {walletTier === 'none' ? (
                            <button
                                onClick={() => setScreen('walletChoice')}
                                style={{
                                    background: 'white', color: '#FF6B35', border: 'none',
                                    padding: '10px 18px', borderRadius: 12,
                                    fontWeight: 700, fontSize: 12, cursor: 'pointer',
                                }}
                            >
                                एक्टिवेट करें →
                            </button>
                        ) : (
                            <div style={{
                                background: walletTier === 'prime'
                                    ? 'linear-gradient(135deg, #0A6B5C, #33C3A9)'
                                    : 'linear-gradient(135deg, #FFD700, #F7931E)',
                                padding: '5px 14px', borderRadius: 100,
                                color: 'white', fontSize: 11, fontWeight: 700,
                            }}>
                                {walletTier === 'prime' ? '★ Prime' : 'Lite'}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* -------- SPLIT HERO: Money Left + Savings Right -------- */}
            <div style={{ padding: '16px 16px 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

                    {/* LEFT: Money In-Out */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{
                            background: 'white',
                            borderRadius: 20,
                            padding: '16px 12px',
                            border: '1px solid #F0F0F0',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                        }}
                    >
                        <h4 style={{ fontSize: 13, fontWeight: 800, color: '#1a1a2e', marginBottom: 12, textAlign: 'center' }}>
                            💰 पैसा आना-जाना
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {moneyShortcuts.map((item, i) => (
                                <motion.button
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.15 + i * 0.05 }}
                                    whileTap={{ scale: 0.92 }}
                                    onClick={() => setScreen(item.screen)}
                                    style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                                        gap: 4, padding: '10px 4px',
                                        borderRadius: 14, border: 'none',
                                        background: `${item.color}08`,
                                        cursor: 'pointer',
                                    }}
                                >
                                    <span style={{ fontSize: 24 }}>{item.icon}</span>
                                    <span style={{ fontSize: 10, fontWeight: 700, color: item.color, lineHeight: 1.2, textAlign: 'center' }}>
                                        {item.label}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT: Savings & Growth */}
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        style={{
                            background: 'white',
                            borderRadius: 20,
                            padding: '16px 12px',
                            border: '1px solid #F0F0F0',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                        }}
                    >
                        <h4 style={{ fontSize: 13, fontWeight: 800, color: '#1a1a2e', marginBottom: 10, textAlign: 'center' }}>
                            🌱 बचत & बढ़त
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {savingsProgress.map((item, i) => (
                                <motion.button
                                    key={i}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.06 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setScreen(item.screen)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 8,
                                        padding: '8px 10px', borderRadius: 12,
                                        background: item.bg, border: 'none',
                                        cursor: 'pointer', textAlign: 'left',
                                    }}
                                >
                                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: item.color }}>{item.label}</span>
                                            <span style={{ fontSize: 11, fontWeight: 800, color: '#1a1a2e' }}>
                                                {item.value}<span style={{ fontSize: 8, color: '#999' }}>{item.sub}</span>
                                            </span>
                                        </div>
                                        {/* Mini progress bar */}
                                        <div style={{
                                            height: 4, borderRadius: 100,
                                            background: `${item.color}20`, overflow: 'hidden',
                                        }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.progress * 100}%` }}
                                                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                                                style={{
                                                    height: '100%', borderRadius: 100,
                                                    background: item.color,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* -------- ADD MONEY BANNER (4 WAYS) -------- */}
            <div style={{ padding: '16px 16px 0' }}>
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        background: 'linear-gradient(135deg, #FFF5EE, #FFE8D6)',
                        borderRadius: 20,
                        padding: '16px',
                        border: '1px solid #FFE0B5',
                    }}
                >
                    <h3 style={{ fontSize: 14, fontWeight: 800, color: '#CC4A22', marginBottom: 12 }}>
                        💰 पैसा जमा करने के 4 तरीके
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        {addMoneyWays.map((way, i) => (
                            <motion.button
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.35 + i * 0.05 }}
                                whileTap={{ scale: 0.96 }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    background: 'white', borderRadius: 14,
                                    padding: '10px 10px', border: '1px solid #F0F0F0',
                                    cursor: 'pointer', textAlign: 'left',
                                }}
                            >
                                <span style={{ fontSize: 20 }}>{way.icon}</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: 11, fontWeight: 700, color: '#1a1a2e', lineHeight: 1.2 }}>
                                        {way.label}
                                    </p>
                                    <span style={{
                                        fontSize: 8, fontWeight: 700, color: way.tagColor,
                                        background: `${way.tagColor}12`, padding: '1px 6px',
                                        borderRadius: 100, marginTop: 2, display: 'inline-block',
                                    }}>
                                        {way.tag}
                                    </span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* -------- SERVICES ROW -------- */}
            <div style={{ padding: '16px 16px 0' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginBottom: 10 }}>
                    बिल और सेवाएं
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {quickServices.map((svc, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 + i * 0.04 }}
                            whileTap={{ scale: 0.92 }}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                gap: 4, background: 'none', border: 'none', cursor: 'pointer',
                            }}
                        >
                            <div style={{
                                width: 48, height: 48, borderRadius: 14,
                                background: 'white', border: '1px solid #F0F0F0',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                            }}>
                                {svc.icon}
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 600, color: '#666' }}>{svc.label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* -------- ADHIKARI NEARNESS -------- */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                style={{ padding: '14px 16px 16px' }}
            >
                <button
                    onClick={() => setScreen('adhikari')}
                    style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #E6F7F4, #CCF0EA)',
                        borderRadius: 16, padding: '14px 16px',
                        border: '1px solid #0A6B5C15',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                        textAlign: 'left',
                    }}
                >
                    <span style={{ fontSize: 30 }}>🤝</span>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0A6B5C', marginBottom: 2 }}>
                            नज़दीकी अधिकारी से मिलें
                        </h4>
                        <p style={{ fontSize: 11, color: '#0A6B5C99' }}>
                            मुफ्त जमा • KYC • सहायता
                        </p>
                    </div>
                    <span style={{ color: '#0A6B5C', fontSize: 18, fontWeight: 700 }}>→</span>
                </button>
            </motion.div>
        </div>
    );
}
