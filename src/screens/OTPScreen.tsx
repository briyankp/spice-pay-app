'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

export default function OTPScreen() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [verifying, setVerifying] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const setScreen = useAppStore((s) => s.setScreen);
    const setOtpVerified = useAppStore((s) => s.setOtpVerified);
    const setOnboardingComplete = useAppStore((s) => s.setOnboardingComplete);
    const user = useAppStore((s) => s.user);

    useEffect(() => {
        if (timer > 0) {
            const id = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(id);
        }
    }, [timer]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-verify when all 6 digits entered
        if (newOtp.every((d) => d !== '')) {
            setVerifying(true);
            setTimeout(() => {
                setOtpVerified(true);
                setOnboardingComplete(true);
                setScreen('home');
            }, 1500);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const maskedMobile = user.mobile
        ? `${user.mobile.slice(0, 2)}****${user.mobile.slice(6)}`
        : '••••••••••';

    return (
        <div
            className="screen"
            style={{
                height: '100%',
                background: '#FFF9F0',
                display: 'flex',
                flexDirection: 'column',
                padding: '60px 28px 40px',
            }}
        >
            <button
                onClick={() => setScreen('mobile')}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#999',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    padding: '4px 0',
                    marginBottom: 24,
                }}
            >
                ← Back
            </button>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>
                    Verify OTP
                </h1>
                <p style={{ fontSize: 15, color: '#777', lineHeight: 1.6, marginBottom: 40 }}>
                    Enter the 6-digit code sent to{' '}
                    <span style={{ fontWeight: 700, color: '#1a1a2e' }}>+91 {maskedMobile}</span>
                </p>
            </motion.div>

            {/* OTP Inputs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 32 }}
            >
                {otp.map((digit, i) => (
                    <input
                        key={i}
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="tel"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        disabled={verifying}
                        className="otp-input"
                        style={{
                            borderColor: digit ? '#F7931E' : verifying ? '#0A6B5C' : '#E5E5E5',
                            background: verifying ? '#E6F7F4' : 'white',
                        }}
                    />
                ))}
            </motion.div>

            {/* Timer */}
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
                {timer > 0 ? (
                    <p style={{ fontSize: 14, color: '#999' }}>
                        Resend code in <span style={{ fontWeight: 700, color: '#FF6B35' }}>{timer}s</span>
                    </p>
                ) : (
                    <button
                        onClick={() => setTimer(30)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#FF6B35',
                            fontSize: 14,
                            fontWeight: 700,
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}
                    >
                        Resend OTP
                    </button>
                )}
            </div>

            {/* Verifying */}
            {verifying && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        background: '#E6F7F4',
                        borderRadius: 14,
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        justifyContent: 'center',
                    }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                        ✨
                    </motion.div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0A6B5C' }}>Verifying OTP...</p>
                </motion.div>
            )}

            <div style={{ flex: 1 }} />

            {/* Trust badge */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ textAlign: 'center' }}
            >
                <p style={{ fontSize: 12, color: '#bbb' }}>🔒 Secured by NPCI guidelines</p>
            </motion.div>
        </div>
    );
}
