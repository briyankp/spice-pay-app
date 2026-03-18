'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, Screen } from '@/store/appStore';

// All Screens
import SplashScreen from '@/screens/SplashScreen';
import WelcomeCarousel from '@/screens/WelcomeCarousel';
import PermissionsScreen from '@/screens/PermissionsScreen';
import MobileNumberScreen from '@/screens/MobileNumberScreen';
import OTPScreen from '@/screens/OTPScreen';
import ProfileCreationScreen from '@/screens/ProfileCreationScreen';
import HomeScreen from '@/screens/HomeScreen';
import HomeScreenVariantA from '@/screens/HomeScreenVariantA';
import HomeScreenVariantB from '@/screens/HomeScreenVariantB';
import HomeScreenVariantC from '@/screens/HomeScreenVariantC';
import WalletSetupScreen from '@/screens/WalletSetupScreen';
import WalletActiveScreen from '@/screens/WalletActiveScreen';
import KYCUpgradeLauncher from '@/screens/KYCUpgradeLauncher';
import FullKYCFlow from '@/screens/FullKYCFlow';
import Form60Screen from '@/screens/Form60Screen';
import KYCSuccessScreen from '@/screens/KYCSuccessScreen';
import AdhikariLocatorScreen from '@/screens/AdhikariLocatorScreen';
import GoldScreen from '@/screens/GoldScreen';
import FDScreen from '@/screens/FDScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import PayScreen from '@/screens/PayScreen';
import WalletChoiceScreen from '@/screens/WalletChoiceScreen';
import BottomNav from '@/components/BottomNav';

const screenComponents: Record<Screen, React.ComponentType> = {
  splash: SplashScreen,
  welcome: WelcomeCarousel,
  permissions: PermissionsScreen,
  mobile: MobileNumberScreen,
  otp: OTPScreen,
  profile: ProfileCreationScreen,
  home: HomeScreen,      // will be overridden by variant
  pay: PayScreen,
  gold: GoldScreen,
  fd: FDScreen,
  wallet: WalletSetupScreen,
  walletSetup: WalletSetupScreen,
  walletActive: WalletActiveScreen,
  kycUpgrade: KYCUpgradeLauncher,
  fullKyc: FullKYCFlow,
  form60: Form60Screen,
  kycSuccess: KYCSuccessScreen,
  adhikari: AdhikariLocatorScreen,
  profilePage: ProfileScreen,
  walletChoice: WalletChoiceScreen,
};

const screensWithNav: Screen[] = ['home', 'pay', 'gold', 'fd', 'wallet', 'walletActive', 'profilePage'];

type HomeVariant = 'A' | 'B' | 'C' | 'original';

const variantLabels: Record<HomeVariant, { label: string; desc: string }> = {
  A: { label: 'A', desc: 'दुकान – Transaction First' },
  B: { label: 'B', desc: 'बचत – Savings Forward' },
  C: { label: 'C', desc: 'खाता – Hybrid Split' },
  original: { label: 'O', desc: 'Original' },
};

const variantComponents: Record<HomeVariant, React.ComponentType> = {
  A: HomeScreenVariantA,
  B: HomeScreenVariantB,
  C: HomeScreenVariantC,
  original: HomeScreen,
};

export default function SpicePayApp() {
  const currentScreen = useAppStore((s) => s.currentScreen);
  const [homeVariant, setHomeVariant] = useState<HomeVariant>('A');
  const [showVariantPicker, setShowVariantPicker] = useState(false);

  // Override home screen with selected variant
  const ScreenComponent = currentScreen === 'home'
    ? variantComponents[homeVariant]
    : screenComponents[currentScreen];

  const showNav = screensWithNav.includes(currentScreen);
  const isHomeScreen = currentScreen === 'home';

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentScreen}-${currentScreen === 'home' ? homeVariant : ''}`}
          className="screen"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          style={{ paddingBottom: showNav ? '80px' : '0' }}
        >
          <ScreenComponent />
        </motion.div>
      </AnimatePresence>

      {showNav && <BottomNav />}

      {/* -------- VARIANT SWITCHER (only visible on Home screen) -------- */}
      {isHomeScreen && (
        <>
          {/* Floating toggle button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowVariantPicker(!showVariantPicker)}
            style={{
              position: 'fixed',
              bottom: 90,
              right: 16,
              width: 48,
              height: 48,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #1a1a2e, #2d2d44)',
              border: '2px solid rgba(255,255,255,0.15)',
              color: 'white',
              fontSize: 18,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              zIndex: 100,
            }}
          >
            {homeVariant}
          </motion.button>

          {/* Variant picker dropdown */}
          <AnimatePresence>
            {showVariantPicker && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                style={{
                  position: 'fixed',
                  bottom: 150,
                  right: 16,
                  background: '#1a1a2e',
                  borderRadius: 18,
                  padding: '8px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  zIndex: 100,
                  minWidth: 220,
                }}
              >
                <p style={{
                  color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 600,
                  padding: '6px 10px 4px', textTransform: 'uppercase', letterSpacing: 1,
                }}>
                  Home Variants
                </p>
                {(Object.keys(variantLabels) as HomeVariant[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => { setHomeVariant(v); setShowVariantPicker(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 12,
                      border: 'none',
                      background: homeVariant === v ? 'rgba(255,107,53,0.15)' : 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{
                      width: 32, height: 32, borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 14,
                      background: homeVariant === v
                        ? 'linear-gradient(135deg, #FF6B35, #F7931E)'
                        : 'rgba(255,255,255,0.08)',
                      color: homeVariant === v ? 'white' : 'rgba(255,255,255,0.5)',
                    }}>
                      {variantLabels[v].label}
                    </span>
                    <span style={{
                      fontSize: 13,
                      fontWeight: homeVariant === v ? 700 : 500,
                      color: homeVariant === v ? '#FF6B35' : 'rgba(255,255,255,0.6)',
                    }}>
                      {variantLabels[v].desc}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
