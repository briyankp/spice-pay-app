import { create } from 'zustand';

export type Screen =
  | 'splash'
  | 'welcome'
  | 'permissions'
  | 'mobile'
  | 'otp'
  | 'profile'
  | 'home'
  | 'pay'
  | 'gold'
  | 'fd'
  | 'wallet'
  | 'walletSetup'
  | 'walletActive'
  | 'kycUpgrade'
  | 'fullKyc'
  | 'form60'
  | 'kycSuccess'
  | 'adhikari'
  | 'profilePage'
  | 'walletChoice';

export type WalletTier = 'none' | 'lite' | 'prime';

export type KYCStep =
  | 'pan_input'
  | 'ckyc_check'
  | 'ckyc_success'
  | 'digilocker'
  | 'aadhaar_ekyc'
  | 'vcip'
  | 'adhikari_fallback';

interface UserProfile {
  name: string;
  mobile: string;
  gender: string;
  dob: string;
  pin: string;
}

interface AppState {
  currentScreen: Screen;
  previousScreen: Screen | null;
  user: UserProfile;
  walletTier: WalletTier;
  walletBalance: number;
  kycStep: KYCStep;
  onboardingComplete: boolean;
  simBound: boolean;
  otpVerified: boolean;
  idType: string;
  idNumber: string;
  panNumber: string;
  cooldownActive: boolean;

  setScreen: (screen: Screen) => void;
  setUser: (user: Partial<UserProfile>) => void;
  setWalletTier: (tier: WalletTier) => void;
  setWalletBalance: (balance: number) => void;
  setKycStep: (step: KYCStep) => void;
  setOnboardingComplete: (complete: boolean) => void;
  setSimBound: (bound: boolean) => void;
  setOtpVerified: (verified: boolean) => void;
  setIdType: (type: string) => void;
  setIdNumber: (number: string) => void;
  setPanNumber: (pan: string) => void;
  setCooldownActive: (active: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentScreen: 'splash',
  previousScreen: null,
  user: { name: '', mobile: '', gender: '', dob: '', pin: '' },
  walletTier: 'none',
  walletBalance: 0,
  kycStep: 'pan_input',
  onboardingComplete: false,
  simBound: false,
  otpVerified: false,
  idType: '',
  idNumber: '',
  panNumber: '',
  cooldownActive: true,

  setScreen: (screen) =>
    set((state) => ({ currentScreen: screen, previousScreen: state.currentScreen })),
  setUser: (user) =>
    set((state) => ({ user: { ...state.user, ...user } })),
  setWalletTier: (tier) => set({ walletTier: tier }),
  setWalletBalance: (balance) => set({ walletBalance: balance }),
  setKycStep: (step) => set({ kycStep: step }),
  setOnboardingComplete: (complete) => set({ onboardingComplete: complete }),
  setSimBound: (bound) => set({ simBound: bound }),
  setOtpVerified: (verified) => set({ otpVerified: verified }),
  setIdType: (type) => set({ idType: type }),
  setIdNumber: (number) => set({ idNumber: number }),
  setPanNumber: (pan) => set({ panNumber: pan }),
  setCooldownActive: (active) => set({ cooldownActive: active }),
}));
