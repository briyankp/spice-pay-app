'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore, Screen } from '@/store/appStore';

export default function HomeScreenVariantB() {
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

    const moneyActions: { icon: string; label: string; sublabel: string; color: string; screen: Screen }[] = [
        { icon: '💰', label: 'जमा करें', sublabel: 'Add Money', color: '#D4A017', screen: 'pay' },
        { icon: '🏧', label: 'निकालें', sublabel: 'Withdraw', color: '#FF6B35', screen: 'pay' },
        { icon: '💸', label: 'भेजें', sublabel: 'Send', color: '#0A6B5C', screen: 'pay' },
        { icon: '📨', label: 'मंगवाएं', sublabel: 'Collect', color: '#8B5CF6', screen: 'pay' },
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
                    padding: '44px 20px 18px',
                    borderRadius: '0 0 28px 28px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div style={{ position: 'absolute', width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', top: -40, right: -20 }} />

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
                        <div style={{
                            background: 'rgba(255,255,255,0.18)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 14, padding: '8px 14px',
                            display: 'flex', alignItems: 'center', gap: 6,
                            border: '1px solid rgba(255,255,255,0.15)',
                        }}>
                            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>बैलेंस</span>
                            <span style={{ color: 'white', fontSize: 18, fontWeight: 800 }}>₹{walletBalance.toLocaleString('en-IN')}</span>
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
                </div>

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

            {/* -------- HERO SAVINGS BANNER -------- */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ padding: '16px 16px 0' }}
            >
                <button
                    onClick={() => setScreen('gold')}
                    style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #FFD700 0%, #F7931E 50%, #FF6B35 100%)',
                        borderRadius: 22,
                        padding: '20px 18px',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 6px 24px rgba(247, 147, 30, 0.3)',
                    }}
                >
                    {/* Floating gold coin animation */}
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute', top: 12, right: 16,
                            fontSize: 52, opacity: 0.9,
                        }}
                    >
                        🪙
                    </motion.div>
                    {/* Decorative ring */}
                    <div style={{
                        position: 'absolute', width: 100, height: 100, borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.15)',
                        top: -20, right: 40,
                    }} />

                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>
                            ✨ रोज़ की बचत
                        </p>
                        <h2 style={{ color: 'white', fontSize: 20, fontWeight: 900, lineHeight: 1.3, marginBottom: 4, maxWidth: '70%' }}>
                            24K Gold के साथ बचत करो
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 14, maxWidth: '65%' }}>
                            छोटी शुरुआत, बड़ी Value। ₹10 से शुरू करें।
                        </p>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            background: 'rgba(255,255,255,0.25)',
                            backdropFilter: 'blur(10px)',
                            padding: '8px 16px', borderRadius: 12,
                        }}>
                            <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>
                                आज से शुरू करें
                            </span>
                            <span style={{ color: 'white', fontSize: 14 }}>→</span>
                        </div>
                    </div>
                </button>
            </motion.div>

            {/* -------- BACHAT SE BADHAT: Gold + FD/RD cards -------- */}
            <div style={{ padding: '14px 16px 0' }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1a1a2e', marginBottom: 10 }}>
                    बचत से बढ़त 📈
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {/* Digital Gold card */}
                    <motion.button
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setScreen('gold')}
                        style={{
                            background: 'linear-gradient(135deg, #FFFDF0, #FFF3AD)',
                            borderRadius: 18, padding: '16px 14px',
                            border: 'none', cursor: 'pointer', textAlign: 'left',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <span style={{ fontSize: 28 }}>🥇</span>
                            <span style={{
                                fontSize: 9, fontWeight: 700, color: 'white',
                                background: '#0A6B5C', padding: '3px 8px', borderRadius: 100,
                            }}>↑ 2.3%</span>
                        </div>
                        <h4 style={{ fontSize: 14, fontWeight: 800, color: '#8B6914', marginBottom: 2 }}>Digital Gold</h4>
                        <p style={{ fontSize: 18, fontWeight: 900, color: '#1a1a2e', marginBottom: 1 }}>₹76.93</p>
                        <p style={{ fontSize: 10, color: '#888' }}>0.0043 grams</p>
                    </motion.button>

                    {/* FD/RD card */}
                    <motion.button
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setScreen('fd')}
                        style={{
                            background: 'linear-gradient(135deg, #E6F7F4, #CCF0EA)',
                            borderRadius: 18, padding: '16px 14px',
                            border: 'none', cursor: 'pointer', textAlign: 'left',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <span style={{ fontSize: 28 }}>🏦</span>
                            <span style={{
                                fontSize: 9, fontWeight: 700, color: 'white',
                                background: '#FF6B35', padding: '3px 8px', borderRadius: 100,
                            }}>Top Rate</span>
                        </div>
                        <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0A6B5C', marginBottom: 2 }}>FD / RD</h4>
                        <p style={{ fontSize: 18, fontWeight: 900, color: '#1a1a2e', marginBottom: 1 }}>8.5% p.a.</p>
                        <p style={{ fontSize: 10, color: '#888' }}>₹100/महीना से शुरू</p>
                    </motion.button>
                </div>
            </div>

            {/* -------- MONEY ACTIONS: 2×2 -------- */}
            <div style={{ padding: '16px 16px 0' }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1a1a2e', marginBottom: 10 }}>
                    पैसा आना-जाना 💰
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {moneyActions.map((action, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setScreen(action.screen)}
                            style={{
                                background: 'white',
                                borderRadius: 16,
                                padding: '16px 14px',
                                border: '1.5px solid #F0F0F0',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                minHeight: 64,
                            }}
                        >
                            <div style={{
                                width: 42, height: 42, borderRadius: 13,
                                background: `${action.color}12`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 22, flexShrink: 0,
                            }}>
                                {action.icon}
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <h4 style={{ fontSize: 14, fontWeight: 800, color: action.color, marginBottom: 1 }}>
                                    {action.label}
                                </h4>
                                <p style={{ fontSize: 10, color: '#999' }}>{action.sublabel}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* -------- QUICK SERVICES -------- */}
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
                            transition={{ delay: 0.4 + i * 0.04 }}
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

            {/* -------- PROMO BANNER -------- */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ padding: '14px 16px 16px' }}
            >
                <div style={{
                    background: 'linear-gradient(135deg, #FFF5EE, #FFE8D6)',
                    borderRadius: 16, padding: '14px 16px',
                    border: '1px solid #FFE0B5',
                    display: 'flex', alignItems: 'center', gap: 12,
                }}>
                    <span style={{ fontSize: 28 }}>🎉</span>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#CC4A22' }}>
                            पहला रिचार्ज पर ₹50 तक बचत
                        </p>
                        <p style={{ fontSize: 10, color: '#AA8F00', marginTop: 2 }}>
                            अभी रिचार्ज करें और कैशबैक पाएं!
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
