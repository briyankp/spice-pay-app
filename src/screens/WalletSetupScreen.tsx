'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';

const idTypes = [
    { id: 'aadhaar', icon: '🆔', label: 'Aadhaar', format: '1234 5678 9012' },
    { id: 'pan', icon: '🏦', label: 'PAN', format: 'ABCDE1234F' },
    { id: 'voter', icon: '🗳️', label: 'Voter ID', format: 'ABC1234567' },
    { id: 'mrega', icon: '👷', label: 'MREGA Card', format: 'MH1234567890' },
    { id: 'dl', icon: '🚗', label: 'Driving License', format: 'DL1234567890' },
    { id: 'passport', icon: '🛂', label: 'Passport', format: 'A1234567' },
];

const genders = [
    { id: 'male', icon: '👨', label: 'Male' },
    { id: 'female', icon: '👩', label: 'Female' },
    { id: 'other', icon: '🧑', label: 'Other' },
];

export default function WalletSetupScreen() {
    const [step, setStep] = useState<'profile' | 'id' | 'pin'>('profile');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [pinError, setPinError] = useState('');
    const [loading, setLoading] = useState(false);

    const setScreen = useAppStore((s) => s.setScreen);
    const setUser = useAppStore((s) => s.setUser);
    const setWalletTier = useAppStore((s) => s.setWalletTier);
    const setWalletBalance = useAppStore((s) => s.setWalletBalance);
    const setIdType = useAppStore((s) => s.setIdType);
    const setIdNumberStore = useAppStore((s) => s.setIdNumber);

    const stepLabel = step === 'profile' ? '1 of 3 • Details' : step === 'id' ? '2 of 3 • ID Verify' : '3 of 3 • Set PIN';
    const progress = step === 'profile' ? 1 : step === 'id' ? 2 : 3;

    const headerStyle: React.CSSProperties = {
        background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
        padding: '34px 18px 12px', borderRadius: '0 0 18px 18px',
    };
    const backBtnStyle: React.CSSProperties = {
        background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
        fontSize: 11, fontWeight: 600, cursor: 'pointer', padding: '3px 8px', borderRadius: 100, marginBottom: 4,
    };
    const progressBar = (
        <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
            {[1, 2, 3].map(s => <div key={s} style={{ flex: 1, height: 3, borderRadius: 100, background: s <= progress ? '#F7931E' : '#E5E5E5' }} />)}
        </div>
    );

    /* ────── Step 1: Profile ────── */
    if (step === 'profile') {
        return (
            <div className="screen" style={{ background: '#FFF9F0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={headerStyle}>
                    <button onClick={() => setScreen('home')} style={backBtnStyle}>← Back</button>
                    <h1 style={{ color: 'white', fontSize: 18, fontWeight: 800, marginBottom: 1 }}>Activate Lite Wallet</h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10 }}>Step {stepLabel}</p>
                </div>

                <div style={{ padding: '10px 16px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                    {progressBar}

                    <div style={{ marginBottom: 10 }}>
                        <label style={{ fontSize: 11, fontWeight: 600, color: '#666', marginBottom: 3, display: 'block' }}>Full Name (as on ID)</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="input-field" style={{ padding: '9px 12px', fontSize: 13 }} />
                    </div>

                    <div style={{ marginBottom: 10 }}>
                        <label style={{ fontSize: 11, fontWeight: 600, color: '#666', marginBottom: 3, display: 'block' }}>Gender</label>
                        <div style={{ display: 'flex', gap: 6 }}>
                            {genders.map((g) => (
                                <button key={g.id} onClick={() => setGender(g.id)} style={{
                                    flex: 1, padding: '7px 2px', borderRadius: 8,
                                    border: gender === g.id ? '2px solid #FF6B35' : '1.5px solid #E5E5E5',
                                    background: gender === g.id ? '#FFF0DB' : 'white', cursor: 'pointer',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
                                }}>
                                    <span style={{ fontSize: 16 }}>{g.icon}</span>
                                    <span style={{ fontSize: 9, fontWeight: 600, color: gender === g.id ? '#FF6B35' : '#999' }}>{g.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: 10 }}>
                        <label style={{ fontSize: 11, fontWeight: 600, color: '#666', marginBottom: 3, display: 'block' }}>Date of Birth</label>
                        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="input-field" style={{ padding: '9px 12px', fontSize: 13, color: dob ? '#1a1a2e' : '#999' }} />
                    </div>

                    <div style={{ flex: 1 }} />

                    {/* Lite benefits */}
                    <div style={{ background: '#E6F7F4', borderRadius: 8, padding: '8px 10px', marginBottom: 10 }}>
                        <p style={{ fontSize: 10, fontWeight: 700, color: '#0A6B5C', marginBottom: 2 }}>🎉 Lite Wallet unlocks:</p>
                        <p style={{ fontSize: 9, color: '#0A6B5C', lineHeight: 1.4 }}>Pay on ecommerce & food apps (Swiggy, Zomato, Amazon, Flipkart) • Bill Pay & Recharge from wallet • Add Money • ₹10K/month</p>
                    </div>

                    <button className="btn-primary" onClick={() => { if (name && gender && dob) { setUser({ name, gender, dob }); setStep('id'); } }} disabled={!name || !gender || !dob}
                        style={{ opacity: name && gender && dob ? 1 : 0.5, padding: '12px', fontSize: 14, fontWeight: 700 }}>
                        Continue →
                    </button>
                </div>
            </div>
        );
    }

    /* ────── Step 2: ID & Declaration ────── */
    if (step === 'id') {
        return (
            <div className="screen" style={{ background: '#FFF9F0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={headerStyle}>
                    <button onClick={() => setStep('profile')} style={backBtnStyle}>← Back</button>
                    <h1 style={{ color: 'white', fontSize: 18, fontWeight: 800, marginBottom: 1 }}>Activate Lite Wallet</h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10 }}>Step {stepLabel}</p>
                </div>

                <div style={{ padding: '10px 16px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                    {progressBar}

                    <div style={{ background: '#E6F7F4', borderRadius: 8, padding: '6px 10px', marginBottom: 10, display: 'flex', gap: 5, alignItems: 'center' }}>
                        <span style={{ fontSize: 11 }}>💡</span>
                        <p style={{ fontSize: 9, color: '#0A6B5C', fontWeight: 500 }}>Just ID number — no photo upload needed (RBI guideline)</p>
                    </div>

                    {/* ID Grid 3x2 */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5, marginBottom: 10 }}>
                        {idTypes.map((id) => (
                            <button key={id.id} onClick={() => setSelectedId(id.id)} style={{
                                padding: '8px 2px', borderRadius: 8, textAlign: 'center',
                                border: selectedId === id.id ? '2px solid #FF6B35' : '1.5px solid #E5E5E5',
                                background: selectedId === id.id ? '#FFF0DB' : 'white', cursor: 'pointer',
                            }}>
                                <span style={{ fontSize: 16, display: 'block', marginBottom: 1 }}>{id.icon}</span>
                                <span style={{ fontSize: 8, fontWeight: 600, color: selectedId === id.id ? '#FF6B35' : '#666' }}>{id.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* ID Number */}
                    {selectedId && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ marginBottom: 10 }}>
                            <label style={{ fontSize: 11, fontWeight: 600, color: '#666', marginBottom: 3, display: 'block' }}>
                                {idTypes.find((t) => t.id === selectedId)?.label} Number
                            </label>
                            <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value.toUpperCase())} placeholder={`e.g. ${idTypes.find((t) => t.id === selectedId)?.format}`} className="input-field" style={{ letterSpacing: 1.5, fontWeight: 600, padding: '9px 12px', fontSize: 13 }} />
                        </motion.div>
                    )}

                    {/* Declaration */}
                    <button onClick={() => setAgreed(!agreed)} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, marginBottom: 12 }}>
                        <div style={{
                            width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
                            border: agreed ? 'none' : '2px solid #ccc',
                            background: agreed ? 'linear-gradient(135deg, #FF6B35, #F7931E)' : 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {agreed && <span style={{ color: 'white', fontSize: 11, fontWeight: 800 }}>✓</span>}
                        </div>
                        <p style={{ fontSize: 10, color: '#666', lineHeight: 1.3 }}>
                            I declare this info is correct & agree to <span style={{ color: '#FF6B35', fontWeight: 600 }}>T&C</span>.
                        </p>
                    </button>

                    <div style={{ flex: 1 }} />

                    <button className="btn-primary" onClick={() => { if (selectedId && idNumber && agreed) { setIdType(selectedId); setIdNumberStore(idNumber); setStep('pin'); } }} disabled={!selectedId || !idNumber || !agreed}
                        style={{ opacity: selectedId && idNumber && agreed ? 1 : 0.5, padding: '12px', fontSize: 14, fontWeight: 700 }}>
                        Continue →
                    </button>
                </div>
            </div>
        );
    }

    /* ────── Step 3: Set PIN ────── */
    return (
        <div className="screen" style={{ background: '#FFF9F0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={headerStyle}>
                <button onClick={() => setStep('id')} style={backBtnStyle}>← Back</button>
                <h1 style={{ color: 'white', fontSize: 18, fontWeight: 800, marginBottom: 1 }}>Set Wallet PIN</h1>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10 }}>Step {stepLabel}</p>
            </div>

            <div style={{ padding: '10px 16px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                {progressBar}

                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: 'linear-gradient(135deg, #0A6B5C, #33C3A9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 10px', boxShadow: '0 4px 16px rgba(10,107,92,0.3)',
                    }}>
                        <span style={{ fontSize: 24 }}>🔑</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#777', lineHeight: 1.4 }}>This 4-digit PIN secures your wallet</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 14 }}>
                    <div>
                        <label style={{ fontSize: 11, fontWeight: 600, color: '#666', marginBottom: 3, display: 'block' }}>Enter PIN</label>
                        <input type="password" maxLength={4} value={pin} onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setPinError(''); }} placeholder="• • • •" className="input-field" style={{ textAlign: 'center', letterSpacing: 12, fontSize: 20, fontWeight: 700, padding: '10px' }} />
                    </div>
                    <div>
                        <label style={{ fontSize: 11, fontWeight: 600, color: '#666', marginBottom: 3, display: 'block' }}>Confirm PIN</label>
                        <input type="password" maxLength={4} value={confirmPin} onChange={(e) => { setConfirmPin(e.target.value.replace(/\D/g, '')); setPinError(''); }} placeholder="• • • •" className="input-field" style={{ textAlign: 'center', letterSpacing: 12, fontSize: 20, fontWeight: 700, padding: '10px' }} />
                    </div>
                    {pinError && <p style={{ fontSize: 11, color: '#E53E3E', textAlign: 'center', fontWeight: 600 }}>{pinError}</p>}
                </div>

                <div style={{ flex: 1 }} />

                <button className="btn-primary" onClick={() => {
                    if (pin.length !== 4) return;
                    if (pin !== confirmPin) { setPinError('PINs do not match'); return; }
                    setLoading(true);
                    setUser({ pin });
                    setTimeout(() => { setWalletTier('lite'); setWalletBalance(0); setScreen('walletActive'); }, 1500);
                }} disabled={pin.length !== 4 || confirmPin.length !== 4 || loading}
                    style={{ opacity: pin.length === 4 && confirmPin.length === 4 && !loading ? 1 : 0.5, padding: '12px', fontSize: 14, fontWeight: 700 }}>
                    {loading ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>⏳</motion.span>
                            Activating...
                        </span>
                    ) : 'Activate Lite Wallet 🎉'}
                </button>
            </div>
        </div>
    );
}
