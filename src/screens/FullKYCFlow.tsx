'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

type KYCFlowStep = 'pan_check' | 'ckyc_searching' | 'ckyc_result' | 'digilocker' | 'aadhaar_ekyc' | 'vcip' | 'adhikari';

export default function FullKYCFlow() {
    const [step, setStep] = useState<KYCFlowStep>('pan_check');
    const [hasPan, setHasPan] = useState<boolean | null>(null);
    const [pan, setPan] = useState('');
    const [ckycResult, setCkycResult] = useState<'normal' | 'simplified' | 'none' | null>(null);
    const [digiResult, setDigiResult] = useState<'success' | 'fail' | null>(null);

    const setScreen = useAppStore((s) => s.setScreen);
    const setPanNumber = useAppStore((s) => s.setPanNumber);
    const setWalletTier = useAppStore((s) => s.setWalletTier);

    const completeKYC = () => {
        setWalletTier('prime');
        setScreen('kycSuccess');
    };

    // CKYC search simulation
    useEffect(() => {
        if (step === 'ckyc_searching') {
            const timer = setTimeout(() => {
                // Simulate: 40% normal, 30% simplified, 30% none
                const rand = Math.random();
                if (rand < 0.4) setCkycResult('normal');
                else if (rand < 0.7) setCkycResult('simplified');
                else setCkycResult('none');
                setStep('ckyc_result');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    // DigiLocker simulation
    useEffect(() => {
        if (step === 'digilocker' && !digiResult) {
            const timer = setTimeout(() => {
                setDigiResult(Math.random() > 0.5 ? 'success' : 'fail');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step, digiResult]);

    const renderPanCheck = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '0 28px 40px' }}>
            <div
                style={{
                    width: 64, height: 64, borderRadius: 20,
                    background: 'linear-gradient(135deg, #0A6B5C, #33C3A9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 24, boxShadow: '0 8px 24px rgba(10, 107, 92, 0.3)',
                }}
            >
                <span style={{ fontSize: 32 }}>🏦</span>
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>
                Do you have a PAN Card?
            </h2>
            <p style={{ fontSize: 14, color: '#777', lineHeight: 1.6, marginBottom: 28 }}>
                PAN helps us find your existing KYC records instantly. If you don&apos;t have PAN, we&apos;ll use Form 60.
            </p>

            {hasPan === null && (
                <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                    <button className="btn-primary" onClick={() => setHasPan(true)} style={{ flex: 1 }}>
                        Yes, I have PAN
                    </button>
                    <button className="btn-secondary" onClick={() => setScreen('form60')} style={{ flex: 1 }}>
                        No PAN
                    </button>
                </div>
            )}

            {hasPan && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8, display: 'block' }}>PAN Number</label>
                    <input
                        type="text"
                        maxLength={10}
                        value={pan}
                        onChange={(e) => setPan(e.target.value.toUpperCase())}
                        placeholder="ABCDE1234F"
                        className="input-field"
                        style={{ letterSpacing: 3, fontWeight: 700, fontSize: 18, textAlign: 'center' }}
                    />

                    <div style={{ background: '#E6F7F4', borderRadius: 14, padding: '14px 18px', marginTop: 16, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ fontSize: 14 }}>🔒</span>
                        <p style={{ fontSize: 12, color: '#0A6B5C', lineHeight: 1.5 }}>
                            Your PAN is used only to search the CKYC registry. We never store or share it.
                        </p>
                    </div>

                    <button
                        className="btn-teal"
                        onClick={() => { setPanNumber(pan); setStep('ckyc_searching'); }}
                        disabled={pan.length !== 10}
                        style={{ marginTop: 24, opacity: pan.length === 10 ? 1 : 0.5 }}
                    >
                        Search CKYC Records →
                    </button>
                </motion.div>
            )}
        </motion.div>
    );

    const renderCKYCSearching = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '40px 28px', textAlign: 'center' }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ fontSize: 64, display: 'inline-block', marginBottom: 24 }}
            >
                🔍
            </motion.div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a2e', marginBottom: 12 }}>
                Searching CKYC Database...
            </h2>
            <p style={{ fontSize: 14, color: '#888', marginBottom: 32 }}>
                Checking Central KYC Registry for your records
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
                {['Connecting to CKYCR...', 'Verifying PAN details...', 'Searching records...'].map((text, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.8 }}
                        style={{ display: 'flex', gap: 10, alignItems: 'center' }}
                    >
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                            style={{ color: '#0A6B5C' }}
                        >
                            ●
                        </motion.span>
                        <span style={{ fontSize: 14, color: '#666' }}>{text}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );

    const renderCKYCResult = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '20px 28px 40px' }}>
            {ckycResult === 'normal' && (
                <>
                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                            <span style={{ fontSize: 64 }}>🎉</span>
                        </motion.div>
                    </div>
                    <div style={{ background: '#E6F7F4', borderRadius: 18, padding: '20px', marginBottom: 24, border: '1px solid #0A6B5C22' }}>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0A6B5C', marginBottom: 8 }}>
                            Excellent! We found your verified KYC!
                        </h3>
                        <p style={{ fontSize: 13, color: '#0A6B5C99', marginBottom: 16 }}>
                            Your KYC is already complete in the Central Registry. No documents needed!
                        </p>
                        <div style={{ background: 'white', borderRadius: 14, padding: '16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#888', fontSize: 13 }}>Name</span>
                                <span style={{ color: '#1a1a2e', fontSize: 13, fontWeight: 600 }}>Verified ✓</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#888', fontSize: 13 }}>PAN</span>
                                <span style={{ color: '#1a1a2e', fontSize: 13, fontWeight: 600 }}>{pan.slice(0, 3)}****{pan.slice(7)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#888', fontSize: 13 }}>Status</span>
                                <span style={{ color: '#0A6B5C', fontSize: 13, fontWeight: 700 }}>Normal (Full KYC)</span>
                            </div>
                        </div>
                    </div>
                    <button className="btn-teal" onClick={completeKYC}>
                        Confirm & Activate Prime ✨
                    </button>
                </>
            )}

            {(ckycResult === 'simplified' || ckycResult === 'none') && (
                <>
                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <span style={{ fontSize: 48 }}>{ckycResult === 'simplified' ? '⚠️' : '🔎'}</span>
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1a1a2e', marginBottom: 8, textAlign: 'center' }}>
                        {ckycResult === 'simplified'
                            ? 'Your KYC needs an update'
                            : 'No CKYC Record Found'}
                    </h3>
                    <p style={{ fontSize: 14, color: '#777', textAlign: 'center', lineHeight: 1.6, marginBottom: 28 }}>
                        {ckycResult === 'simplified'
                            ? 'Your existing KYC is of \'Simplified\' type. For higher limits, we need a quick additional verification.'
                            : 'Don\'t worry! We have other ways to verify your identity quickly.'}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <button
                            onClick={() => setStep('digilocker')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px',
                                borderRadius: 16, border: '2px solid #E5E5E5', background: 'white',
                                cursor: 'pointer', textAlign: 'left', width: '100%',
                            }}
                        >
                            <span style={{ fontSize: 28, flexShrink: 0 }}>📄</span>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e' }}>DigiLocker</h4>
                                <p style={{ fontSize: 12, color: '#888' }}>Fetch documents digitally (2 min)</p>
                            </div>
                            <span style={{ color: '#F7931E', fontSize: 14 }}>→</span>
                        </button>

                        <button
                            onClick={() => setStep('aadhaar_ekyc')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px',
                                borderRadius: 16, border: '2px solid #E5E5E5', background: 'white',
                                cursor: 'pointer', textAlign: 'left', width: '100%',
                            }}
                        >
                            <span style={{ fontSize: 28, flexShrink: 0 }}>🆔</span>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e' }}>Aadhaar E-KYC</h4>
                                <p style={{ fontSize: 12, color: '#888' }}>OTP or Biometric verification</p>
                            </div>
                            <span style={{ color: '#F7931E', fontSize: 14 }}>→</span>
                        </button>

                        <button
                            onClick={() => setScreen('adhikari')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px',
                                borderRadius: 16, border: '2px solid #0A6B5C33', background: '#E6F7F4',
                                cursor: 'pointer', textAlign: 'left', width: '100%',
                            }}
                        >
                            <span style={{ fontSize: 28, flexShrink: 0 }}>🤝</span>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0A6B5C' }}>Visit Adhikari</h4>
                                <p style={{ fontSize: 12, color: '#0A6B5C99' }}>Biometric KYC in person (instant)</p>
                            </div>
                            <span style={{ color: '#0A6B5C', fontSize: 14 }}>→</span>
                        </button>
                    </div>
                </>
            )}
        </motion.div>
    );

    const renderDigiLocker = () => {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '40px 28px', textAlign: 'center' }}>
                {!digiResult && (
                    <>
                        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                            <span style={{ fontSize: 64 }}>📄</span>
                        </motion.div>
                        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1a1a2e', marginTop: 24, marginBottom: 8 }}>
                            Fetching from DigiLocker...
                        </h2>
                        <p style={{ fontSize: 14, color: '#888' }}>Securely retrieving your documents</p>
                    </>
                )}

                {digiResult === 'success' && (
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                        <span style={{ fontSize: 64, display: 'block', marginBottom: 16 }}>✅</span>
                        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0A6B5C', marginBottom: 8 }}>
                            Documents Fetched!
                        </h2>
                        <p style={{ fontSize: 14, color: '#888', marginBottom: 28 }}>
                            Aadhaar & PAN verified via DigiLocker
                        </p>
                        <button className="btn-teal" onClick={completeKYC}>Activate Prime ✨</button>
                    </motion.div>
                )}

                {digiResult === 'fail' && (
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                        <span style={{ fontSize: 64, display: 'block', marginBottom: 16 }}>😔</span>
                        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>
                            DigiLocker Unavailable
                        </h2>
                        <p style={{ fontSize: 14, color: '#888', marginBottom: 28 }}>
                            Don&apos;t worry! Let&apos;s try another method.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <button className="btn-primary" onClick={() => { setDigiResult(null); setStep('aadhaar_ekyc'); }}>
                                Try Aadhaar E-KYC →
                            </button>
                            <button className="btn-teal" onClick={() => setScreen('adhikari')}>
                                Visit Adhikari 🤝
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        );
    };

    const renderAadhaarEKYC = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '20px 28px 40px' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <span style={{ fontSize: 56 }}>🆔</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a2e', textAlign: 'center', marginBottom: 8 }}>
                Aadhaar E-KYC
            </h2>
            <p style={{ fontSize: 14, color: '#777', textAlign: 'center', lineHeight: 1.6, marginBottom: 28 }}>
                Verify with your Aadhaar-linked mobile OTP
            </p>

            <div style={{ background: '#FFF0DB', borderRadius: 14, padding: '14px 18px', marginBottom: 24 }}>
                <p style={{ fontSize: 12, color: '#AA8F00', lineHeight: 1.5 }}>
                    ⚠️ <strong>Note:</strong> OTP-only verification creates a limited account (₹1L, 1 year). For full access, visit an Adhikari for Biometric verification.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button
                    className="btn-primary"
                    onClick={() => {
                        // Simulate success
                        setTimeout(completeKYC, 1500);
                    }}
                >
                    Send Aadhaar OTP 📱
                </button>

                <button className="btn-teal" onClick={() => setScreen('adhikari')}>
                    Biometric KYC (Recommended) 🤝
                </button>

                <button
                    onClick={() => setStep('vcip')}
                    style={{
                        background: 'white', border: '2px solid #E5E5E5', color: '#666',
                        padding: '16px 32px', borderRadius: 16, fontWeight: 700, fontSize: 14,
                        cursor: 'pointer', width: '100%',
                    }}
                >
                    Video KYC (V-CIP) 📹
                </button>
            </div>
        </motion.div>
    );

    const renderVCIP = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '40px 28px', textAlign: 'center' }}>
            <span style={{ fontSize: 64, display: 'block', marginBottom: 24 }}>📹</span>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>
                Video KYC (V-CIP)
            </h2>
            <p style={{ fontSize: 14, color: '#777', lineHeight: 1.6, marginBottom: 28 }}>
                A short video call with our verification team. Keep your Aadhaar handy.
            </p>

            <div style={{ background: 'white', borderRadius: 18, padding: '20px', marginBottom: 24, border: '1px solid #F0F0F0', textAlign: 'left' }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginBottom: 12 }}>Requirements:</h4>
                {['Good internet connection', 'Well-lit environment', 'Original Aadhaar card', 'PAN card (if available)'].map((req, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ color: '#0A6B5C', fontSize: 12 }}>●</span>
                        <span style={{ fontSize: 13, color: '#666' }}>{req}</span>
                    </div>
                ))}
            </div>

            <button className="btn-primary" onClick={() => setTimeout(completeKYC, 1500)}>
                Start Video Call 📹
            </button>

            <button
                onClick={() => setScreen('adhikari')}
                style={{
                    background: 'none', border: 'none', color: '#0A6B5C', fontSize: 14,
                    fontWeight: 600, cursor: 'pointer', padding: '16px', width: '100%', marginTop: 8,
                }}
            >
                Can&apos;t do video? Visit an Adhikari 🤝
            </button>
        </motion.div>
    );

    return (
        <div className="screen" style={{ height: '100%', background: '#FFF9F0' }}>
            {/* Header */}
            <div style={{ padding: '48px 24px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                    onClick={() => {
                        if (step === 'pan_check') setScreen('kycUpgrade');
                        else if (step === 'ckyc_result') setStep('pan_check');
                        else if (step === 'digilocker' || step === 'aadhaar_ekyc') setStep('ckyc_result');
                        else if (step === 'vcip') setStep('aadhaar_ekyc');
                    }}
                    style={{
                        background: 'rgba(0,0,0,0.05)', border: 'none', width: 36, height: 36,
                        borderRadius: 12, fontSize: 16, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    ←
                </button>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e' }}>Full KYC Verification</h2>
            </div>

            {/* Progress Steps */}
            <div style={{ padding: '0 28px 24px', display: 'flex', gap: 6 }}>
                {['PAN', 'CKYC', 'Verify'].map((label, i) => {
                    const stepIndex = step === 'pan_check' ? 0 : (step === 'ckyc_searching' || step === 'ckyc_result') ? 1 : 2;
                    return (
                        <div key={i} style={{ flex: 1 }}>
                            <div
                                style={{
                                    height: 4, borderRadius: 100, marginBottom: 4,
                                    background: i <= stepIndex ? '#0A6B5C' : '#E5E5E5',
                                    transition: 'background 0.3s',
                                }}
                            />
                            <span style={{ fontSize: 10, color: i <= stepIndex ? '#0A6B5C' : '#bbb', fontWeight: 600 }}>{label}</span>
                        </div>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                {step === 'pan_check' && renderPanCheck()}
                {step === 'ckyc_searching' && renderCKYCSearching()}
                {step === 'ckyc_result' && renderCKYCResult()}
                {step === 'digilocker' && renderDigiLocker()}
                {step === 'aadhaar_ekyc' && renderAadhaarEKYC()}
                {step === 'vcip' && renderVCIP()}
            </AnimatePresence>
        </div>
    );
}
