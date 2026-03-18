'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

const slides = [
    {
        icon: '💸',
        title: 'Pay Instantly',
        subtitle: 'Bills, Recharges & UPI — all from one wallet',
        bg: 'linear-gradient(180deg, #FFF9F0 0%, #FFE0B5 100%)',
        color: '#FF6B35',
    },
    {
        icon: '🥇',
        title: 'Grow with Gold',
        subtitle: 'Start investing in Digital Gold from just ₹100',
        bg: 'linear-gradient(180deg, #FFFDF0 0%, #FFF3AD 100%)',
        color: '#D4B300',
    },
    {
        icon: '🏦',
        title: 'Save for Tomorrow',
        subtitle: 'Fixed Deposits & Recurring Deposits with top rates',
        bg: 'linear-gradient(180deg, #E6F7F4 0%, #CCF0EA 100%)',
        color: '#0A6B5C',
    },
];

export default function WelcomeCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const setScreen = useAppStore((s) => s.setScreen);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            setScreen('permissions');
        }
    };

    return (
        <div className="screen" style={{ height: '100%', position: 'relative' }}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px 32px',
                        background: slides[currentSlide].bg,
                    }}
                >
                    {/* Skip */}
                    <button
                        onClick={() => setScreen('permissions')}
                        style={{
                            position: 'absolute',
                            top: 20,
                            right: 24,
                            background: 'none',
                            border: 'none',
                            color: '#999',
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '8px 16px',
                        }}
                    >
                        Skip →
                    </button>

                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                        style={{
                            width: 140,
                            height: 140,
                            borderRadius: 40,
                            background: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                            marginBottom: 48,
                        }}
                    >
                        <span style={{ fontSize: 72 }}>{slides[currentSlide].icon}</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        style={{
                            fontSize: 28,
                            fontWeight: 800,
                            color: '#1a1a2e',
                            marginBottom: 12,
                            textAlign: 'center',
                        }}
                    >
                        {slides[currentSlide].title}
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        style={{
                            fontSize: 16,
                            color: '#666',
                            textAlign: 'center',
                            lineHeight: 1.6,
                            maxWidth: 280,
                        }}
                    >
                        {slides[currentSlide].subtitle}
                    </motion.p>
                </motion.div>
            </AnimatePresence>

            {/* Bottom area */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px 32px 48px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 24,
                }}
            >
                {/* Pagination dots */}
                <div style={{ display: 'flex', gap: 8 }}>
                    {slides.map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                width: i === currentSlide ? 24 : 8,
                                background: i === currentSlide ? slides[currentSlide].color : '#DDD',
                            }}
                            style={{
                                height: 8,
                                borderRadius: 100,
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    ))}
                </div>

                {/* CTA */}
                <button className="btn-primary" onClick={nextSlide}>
                    {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
                </button>
            </div>
        </div>
    );
}
