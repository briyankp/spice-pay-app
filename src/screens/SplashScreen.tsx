'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

export default function SplashScreen() {
    const setScreen = useAppStore((s) => s.setScreen);

    useEffect(() => {
        const timer = setTimeout(() => setScreen('welcome'), 2500);
        return () => clearTimeout(timer);
    }, [setScreen]);

    return (
        <div
            className="screen gradient-saffron"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background decorative circles */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    top: -80,
                    right: -80,
                }}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                style={{
                    position: 'absolute',
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    bottom: -40,
                    left: -40,
                }}
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 6, repeat: Infinity }}
            />

            {/* Logo */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 28,
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    marginBottom: 24,
                }}
            >
                <img src="/spice-pay-logo.png" alt="Spice Pay" style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover' }} />
            </motion.div>

            {/* App Name */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{
                    color: 'white',
                    fontSize: 36,
                    fontWeight: 900,
                    letterSpacing: -1,
                    marginBottom: 8,
                }}
            >
                Spice Pay
            </motion.h1>

            {/* Tagline */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: 16,
                    fontWeight: 500,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                }}
            >
                Save and Grow
            </motion.p>

            {/* Loading dots */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                style={{
                    position: 'absolute',
                    bottom: 60,
                    display: 'flex',
                    gap: 8,
                }}
            >
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.6)',
                        }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                ))}
            </motion.div>
        </div>
    );
}
