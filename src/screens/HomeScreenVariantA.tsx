'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, Screen } from '@/store/appStore';

export default function HomeScreenVariantA() {
    const user = useAppStore((s) => s.user);
    const walletBalance = useAppStore((s) => s.walletBalance);
    const walletTier = useAppStore((s) => s.walletTier);
    const setScreen = useAppStore((s) => s.setScreen);
    const [showAddMoneyOptions, setShowAddMoneyOptions] = useState(false);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'सुप्रभात';
        if (hour < 17) return 'नमस्कार';
        return 'शुभ संध्या';
    };

    const heroActions: { icon: string; label: string; sublabel: string; color: string; bg: string; action: () => void }[] = [
        {
            icon: '💸',
            label: 'पैसा भेजें',
            sublabel: 'Send Money',
            color: '#FF6B35',
            bg: 'linear-gradient(135deg, #FFF5EE 0%, #FFE8D6 100%)',
            action: () => setScreen('pay'),
        },
        {
            icon: '📥',
            label: 'पैसा प्राप्त करें',
            sublabel: 'Receive Money',
            color: '#0A6B5C',
            bg: 'linear-gradient(135deg, #E6F7F4 0%, #CCF0EA 100%)',
            action: () => setScreen('pay'),
        },
        {
            icon: '💰',
            label: 'पैसा जमा करें',
            sublabel: 'Add Money',
            color: '#D4A017',
            bg: 'linear-gradient(135deg, #FFFDF0 0%, #FFF3AD 100%)',
            action: () => setShowAddMoneyOptions(!showAddMoneyOptions),
        },
        {
            icon: '📨',
            label: 'पैसा मंगवाएं',
            sublabel: 'Collect Request',
            color: '#8B5CF6',
            bg: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)',
            action: () => setScreen('pay'),
        },
    ];

    const addMoneyOptions = [
        { icon: '🏪', label: 'मुफ्त पैसा जमा कराएं', sublabel: 'Adhikari se jama (FREE)', color: '#FF6B35' },
        { icon: '🏦', label: 'बैंक से ट्रांसफर करें', sublabel: 'No min balance, no charges', color: '#0A6B5C' },
        { icon: '📥', label: 'पैसा प्राप्त करें', sublabel: 'Take payments via QR/UPI', color: '#2563EB' },
        { icon: '📨', label: 'पैसा मंगवाएं', sublabel: 'Send collect request', color: '#8B5CF6' },
    ];

    const savingsItems = [
        {
            icon: '🥇', title: 'Digital Gold', subtitle: '₹7,245/g',
            badge: '↑ 2.3%', badgeColor: '#0A6B5C',
            bg: 'linear-gradient(135deg, #FFFDF0, #FFF3AD)', screen: 'gold' as Screen
        },
        {
            icon: '🏦', title: 'Fixed Deposit', subtitle: '8.5% p.a.',
            badge: 'Top Rate', badgeColor: '#FF6B35',
            bg: 'linear-gradient(135deg, #E6F7F4, #CCF0EA)', screen: 'fd' as Screen
        },
        {
            icon: '📈', title: 'RD', subtitle: '₹100/महीना से',
            badge: 'New', badgeColor: '#8B5CF6',
            bg: 'linear-gradient(135deg, #F3E8FF, #E9D5FF)', screen: 'fd' as Screen
        },
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
            {/* -------- HEADER -------- */}
            <div
                className="gradient-header"
                style={{
                    padding: '44px 20px 16px',
                    borderRadius: '0 0 28px 28px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Decorative circles */}
                <div style={{ position: 'absolute', width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', top: -40, right: -20 }} />
                <div style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', bottom: 10, left: -20 }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 500, marginBottom: 2 }}>
                            {getGreeting()} 🙏
                        </p>
                        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800 }}>
                            {user.name || 'User'}
                        </h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {/* Balance pill */}
                        <div style={{
                            background: 'rgba(255,255,255,0.18)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 14,
                            padding: '8px 14px',
                            display: 'flex', alignItems: 'center', gap: 6,
                            border: '1px solid rgba(255,255,255,0.15)',
                        }}>
                            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>बैलेंस</span>
                            <span style={{ color: 'white', fontSize: 18, fontWeight: 800 }}>
                                ₹{walletBalance.toLocaleString('en-IN')}
                            </span>
                        </div>
                        <button
                            onClick={() => setScreen('profilePage')}
                            style={{
                                width: 38, height: 38, borderRadius: 12,
                                background: 'rgba(255,255,255,0.18)', border: 'none',
                                cursor: 'pointer', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', fontSize: 18,
                            }}
                        >
                            👤
                        </button>
                    </div>
                </div>

                {/* Wallet activation CTA for new users */}
                {walletTier === 'none' && (
                    <motion.button
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => setScreen('walletChoice')}
                        style={{
                            width: '100%', marginTop: 12,
                            background: 'rgba(255,255,255,0.2)',
                            border: '1px dashed rgba(255,255,255,0.4)',
                            borderRadius: 14, padding: '10px 16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            cursor: 'pointer', color: 'white',
                        }}
                    >
                        <span style={{ fontSize: 13, fontWeight: 600 }}>💳 वॉलेट एक्टिवेट करें — शुरू करें!</span>
                        <span style={{ fontSize: 14 }}>→</span>
                    </motion.button>
                )}
            </div>

            {/* -------- HERO: 2×2 ACTION TILES -------- */}
            <div style={{ padding: '16px 16px 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {heroActions.map((action, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={action.action}
                            style={{
                                background: action.bg,
                                borderRadius: 20,
                                padding: '18px 16px',
                                border: `1.5px solid ${action.color}15`,
                                cursor: 'pointer',
                                textAlign: 'left',
                                minHeight: 90,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Icon circle */}
                            <div style={{
                                width: 44, height: 44, borderRadius: 14,
                                background: `${action.color}15`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 24, marginBottom: 8,
                            }}>
                                {action.icon}
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: 16, fontWeight: 800, color: action.color,
                                    lineHeight: 1.2, marginBottom: 2,
                                }}>
                                    {action.label}
                                </h3>
                                <p style={{ fontSize: 10, color: '#888', fontWeight: 500 }}>
                                    {action.sublabel}
                                </p>
                            </div>
                            {/* Arrow indicator */}
                            <div style={{
                                position: 'absolute', top: 14, right: 14,
                                fontSize: 14, color: `${action.color}60`,
                            }}>
                                →
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* -------- ADD MONEY EXPANDABLE -------- */}
            <AnimatePresence>
                {showAddMoneyOptions && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden', padding: '0 16px' }}
                    >
                        <div style={{
                            background: 'white',
                            borderRadius: 18,
                            padding: '14px',
                            marginTop: 10,
                            border: '1px solid #F0F0F0',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                        }}>
                            <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e', marginBottom: 10 }}>
                                💰 पैसा जमा करने के तरीके
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {addMoneyOptions.map((opt, i) => (
                                    <motion.button
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 12,
                                            background: '#FAFAFA', borderRadius: 14,
                                            padding: '12px 14px', border: '1px solid #F0F0F0',
                                            cursor: 'pointer', textAlign: 'left',
                                        }}
                                    >
                                        <span style={{
                                            fontSize: 22, width: 40, height: 40, borderRadius: 12,
                                            background: `${opt.color}10`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            {opt.icon}
                                        </span>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>{opt.label}</p>
                                            <p style={{ fontSize: 10, color: '#888', marginTop: 1 }}>{opt.sublabel}</p>
                                        </div>
                                        <span style={{ color: '#CCC', fontSize: 14 }}>→</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* -------- SAVE & GROW STRIP -------- */}
            <div style={{ padding: '16px 16px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1a1a2e' }}>
                        बचत & बढ़त 🌱
                    </h3>
                    <span style={{ fontSize: 12, color: '#F7931E', fontWeight: 700, cursor: 'pointer' }}>
                        सब देखें →
                    </span>
                </div>
                <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
                    {savingsItems.map((item, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.08 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setScreen(item.screen)}
                            style={{
                                minWidth: 130, background: item.bg, borderRadius: 16,
                                padding: '14px 12px', border: 'none', cursor: 'pointer',
                                textAlign: 'left', flexShrink: 0,
                            }}
                        >
                            <span style={{ fontSize: 26, marginBottom: 6, display: 'block' }}>{item.icon}</span>
                            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>{item.title}</h4>
                            <p style={{ fontSize: 11, color: '#666', marginBottom: 6 }}>{item.subtitle}</p>
                            <span style={{
                                fontSize: 9, fontWeight: 700, color: 'white',
                                background: item.badgeColor, padding: '3px 8px', borderRadius: 100,
                            }}>
                                {item.badge}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* -------- QUICK SERVICES -------- */}
            <div style={{ padding: '16px 16px 12px' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginBottom: 10 }}>
                    सेवाएं
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {quickServices.map((svc, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.04 }}
                            whileTap={{ scale: 0.92 }}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                gap: 4, background: 'none', border: 'none', cursor: 'pointer',
                            }}
                        >
                            <div style={{
                                width: 48, height: 48, borderRadius: 14,
                                background: 'white', border: '1px solid #F0F0F0',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 22,
                            }}>
                                {svc.icon}
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 600, color: '#666' }}>{svc.label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* -------- ADHIKARI BANNER -------- */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ padding: '0 16px 16px' }}
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
                            अपने नज़दीकी अधिकारी से मिलें
                        </h4>
                        <p style={{ fontSize: 11, color: '#0A6B5C99' }}>
                            मुफ्त में पैसा जमा करें • KYC पूरा करें
                        </p>
                    </div>
                    <span style={{ color: '#0A6B5C', fontSize: 18, fontWeight: 700 }}>→</span>
                </button>
            </motion.div>
        </div>
    );
}
