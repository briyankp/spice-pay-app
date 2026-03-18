'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore, Screen } from '@/store/appStore';

const tabs: { id: Screen; label: string; icon: string; isScan?: boolean }[] = [
    { id: 'home', label: 'होम', icon: '🏠' },
    { id: 'pay', label: 'भुगतान', icon: '💳' },
    { id: 'home', label: 'स्कैन', icon: '📷', isScan: true },
    { id: 'wallet', label: 'वॉलेट', icon: '👛' },
    { id: 'profilePage', label: 'प्रोफ़ाइल', icon: '👤' },
];

export default function BottomNav() {
    const currentScreen = useAppStore((s) => s.currentScreen);
    const setScreen = useAppStore((s) => s.setScreen);
    const walletTier = useAppStore((s) => s.walletTier);

    const handleTabPress = (tab: typeof tabs[0]) => {
        if (tab.isScan) {
            if (walletTier !== 'prime') {
                setScreen('kycUpgrade');
            }
            return;
        }
        if (tab.id === 'wallet') {
            if (walletTier === 'none') {
                setScreen('walletChoice');
            } else {
                setScreen('walletActive');
            }
        } else {
            setScreen(tab.id);
        }
    };

    const isActive = (tabId: Screen, isScan?: boolean) => {
        if (isScan) return false;
        if (tabId === 'wallet') return ['wallet', 'walletSetup', 'walletActive'].includes(currentScreen);
        return currentScreen === tabId;
    };

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                maxWidth: 430,
                zIndex: 50,
            }}
        >
            <div
                style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    paddingTop: 6,
                    paddingBottom: 18,
                    paddingLeft: 8,
                    paddingRight: 8,
                }}
            >
                {tabs.map((tab, i) => (
                    <button
                        key={`${tab.id}-${i}`}
                        onClick={() => handleTabPress(tab)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: tab.isScan ? 0 : 2,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: tab.isScan ? '0' : '4px 12px',
                            position: 'relative',
                        }}
                    >
                        {tab.isScan ? (
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 16,
                                    background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: -20,
                                    boxShadow: '0 4px 16px rgba(255, 107, 53, 0.4)',
                                }}
                            >
                                <span style={{ fontSize: 24, filter: 'brightness(10)' }}>📷</span>
                            </motion.div>
                        ) : (
                            <>
                                {isActive(tab.id) && (
                                    <motion.div
                                        layoutId="activeTab"
                                        style={{
                                            position: 'absolute',
                                            top: -6,
                                            width: 28,
                                            height: 3,
                                            borderRadius: 100,
                                            background: 'linear-gradient(90deg, #FF6B35, #F7931E)',
                                        }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <span style={{ fontSize: 20, lineHeight: 1 }}>{tab.icon}</span>
                            </>
                        )}
                        <span
                            style={{
                                fontSize: 9,
                                fontWeight: isActive(tab.id, tab.isScan) ? 700 : tab.isScan ? 600 : 500,
                                color: tab.isScan ? '#FF6B35' : isActive(tab.id) ? '#FF6B35' : '#999',
                                letterSpacing: 0.3,
                                marginTop: tab.isScan ? 2 : 0,
                            }}
                        >
                            {tab.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
