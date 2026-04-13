import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnboardingState {
  isComplete: boolean;
  // Resume tracking
  currentStep: number;

  // Step 1
  fullName: string;
  email: string;
  phoneNumber: string;
  phoneNumberPrefix: string;
  password: string;

  // Step 2
  talent: string | null;

  // Step 3
  location: string;
  bio: string;
  specialities: string[];

  // Step 4
  height: string;
  weight: string;
  bust: string;
  waist: string;
  hips: string;
  shoeSize: string;
  clothingSize: string | null;

  // Step 5
  availability: string[];
  shootDurationPreference: string | null;
  noticeRequired: string | null;

  // Step 6
  imageUrl: string | null;
  portfolioImages: string[];

  // Step 7
  referralCode: string;
  idVerified: boolean;
  termsAgreed: boolean;
 emiratesId: string | null;
}

const initialState: OnboardingState = {
  isComplete: false,
  currentStep: 1,
  fullName: '',
  email: '',
  phoneNumber: '',
  phoneNumberPrefix: '+971',
  password: '',
  talent: null,
  location: '',
  bio: '',
  specialities: [],
  height: '',
  weight: '',
  bust: '',
  waist: '',
  hips: '',
  shoeSize: '',
  clothingSize: null,
  availability: [],
  shootDurationPreference: null,
  noticeRequired: null,
  imageUrl: null,
  portfolioImages: [],
  referralCode: '',
  idVerified: false,
  termsAgreed: false,
  emiratesId: null,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<Partial<OnboardingState>>) => {
      return { ...state, ...action.payload };
    },
    setSignupStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    toggleAvailabilityDay: (state, action: PayloadAction<string>) => {
      const day = action.payload;
      state.availability = state.availability.includes(day)
        ? state.availability.filter(d => d !== day)
        : [...state.availability, day];
    },
    toggleSpeciality: (state, action: PayloadAction<string>) => {
      const item = action.payload;
      state.specialities = state.specialities.includes(item)
        ? state.specialities.filter(s => s !== item)
        : [...state.specialities, item];
    },
    resetOnboarding: () => initialState,

    completeOnboarding: (state,action) => {
  state.isComplete = action.payload;
},
  },
});

export const { setField, setSignupStep, toggleAvailabilityDay, toggleSpeciality, resetOnboarding,completeOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;