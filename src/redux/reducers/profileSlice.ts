import { createSlice } from '@reduxjs/toolkit';
import { profileApi } from '../../services/profileAPI';
import { logout } from './userSlice';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProfileMedia {
  id: string;
  url: string;
  fileType: 'IMAGE' | 'VIDEO';
  type: string;
  userId: string;
  createdAt: string;
}

export interface ProfileMeasurements {
  id: string;
  height: number;
  heightUnit: string;
  weight: number;
  weightUnit: string;
  shoeSize: number;
  shoeSizeUnit: string;
  shirtTopSize: string;
  shirtTopSizeUnit: string;
  pantsSize: number;
  pantsSizeUnit: string;
  dressSize: number;
  dressSizeUnit: string;
  userId: string;
  createdAt: string;
}

export interface ProfileSkill {
  id: string;
  skill: string;
  skillCategory: string;
  userId: string;
  createdAt: string;
}

export interface ProfileBankAccount {
  id: string;
  accountHolderName: string;
  iban: string;
  bankName: string;
  swiftCode: string;
  isPrimary: boolean;
  isVerified: boolean;
}

export interface ProfileWallet {
  totalEarned: number;
  availableBalance: number;
  pendingEscrow: number;
  thisMonthEarned: number;
}

export interface MyStates {
  totalJobsDone: number;
  rating: number;
  reviewCount: number;
  totalEarned: number;
}

export interface TalentProfile {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string | null;
  coverUrl: string | null;
  bio: string | null;
  category: string | null;
  location: string | null;
  country: string | null;
  height: number | null;
  weight: number | null;
  bust: number | null;
  waist: number | null;
  hips: number | null;
  shoeSize: number | null;
  clothingSize: string | null;
  shootDurationPreference: string | null;
  noticeRequired: string | null;
  instagramHandle: string | null;
  instagramFollowers: number | null;
  tiktokHandle: string | null;
  tiktokFollowers: number | null;
  verifiedId: boolean;
  castlyVerified: boolean;
  rating: number;
  reviewCount: number;
  totalBookings: number;
  dailyRate: number;
  portfolioImages: ProfileMedia[];
  bankAccounts: ProfileBankAccount[];
  specialties: string[];
  languages: string[];
  availability: string[];
  wallet: ProfileWallet;
  // Legacy fields from old API shape (auth/profile, portfolio endpoints)
  email?: string;
  gender?: string;
  dob?: string;
  nationality?: string;
  description?: string;
  media?: ProfileMedia[];
  skills?: ProfileSkill[];
  measurements?: ProfileMeasurements;
  userBankAccounts?: ProfileBankAccount[];
  experience?: string | null;
  myStats?: MyStates;
  totalJobsDone?: number;
  phoneNumberPrefix: string | undefined;
  phoneNumber?: string | null;

  pinterestHandle: string | null;
  twitterHandle: string | null;
  redditHandle: string | null;
}

interface ProfileState {
  data: TalentProfile | null;
}

const initialState: ProfileState = {
  data: null,
};

// ─── Slice ───────────────────────────────────────────────────────────────────

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: () => initialState,
  },
  extraReducers: builder => {
    // addCase must come before addMatcher
    builder.addCase(logout, () => initialState);

    builder.addMatcher(
      profileApi.endpoints.getProfile.matchFulfilled,
      (state, { payload }) => {
        state.data = payload.data ?? payload;
      },
    );

    builder.addMatcher(
      profileApi.endpoints.updateProfile.matchFulfilled,
      (state, { payload }) => {
        state.data = payload.data ?? payload;
      },
    );
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;

// ─── Selectors ───────────────────────────────────────────────────────────────

export const selectProfile = (state: { profile: ProfileState }) =>
  state.profile.data;

/** Derives profile-completion flags from the persisted profile data. */
export const selectProfileCompletion = (state: { profile: ProfileState }) => {
  const p = state.profile.data;
  if (!p) {
    return {
      profile: false,
      headShot: false,
      fullBody: false,
      casual: false,
      shortVideo: false,
      skills: false,
      measurements: false,
      portfolio: false,
      bankDetails: false,
    };
  }

  const mediaTypes = (p.media ?? p.portfolioImages ?? []).map(m => m.type);

  return {
    profile: !!(
      p.name &&
      p.email &&
      p.gender &&
      p.dob &&
      p.nationality &&
      (p.description || p.bio)
    ),
    headShot: mediaTypes.includes('HEADSHOT'),
    fullBody: mediaTypes.includes('FULL_BODY'),
    casual: mediaTypes.includes('CASUAL'),
    shortVideo: mediaTypes.includes('FULL_VIDEO'),
    skills: (p.skills?.length ?? p.specialties?.length ?? 0) > 0,
    measurements: !!p.measurements,
    portfolio: mediaTypes.includes('PORTFOLIO'),
    bankDetails:
      (p.userBankAccounts?.length ?? p.bankAccounts?.length ?? 0) > 0,
  };
};
