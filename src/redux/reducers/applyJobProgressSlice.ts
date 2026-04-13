import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Brand {
  id: string;
  brandName: any;
  brandLogoUrl: any;
}

interface Job {
  id: string;
  title: string;
  category: string;
  location: string;
  rateLabel: string;
  totalBudget: number;
  shootDays: number;
  startDate: string;
  endDate: string;
  brand: Brand;
}

interface Talent {
  id: string;
  fullName: any;
  handle: any;
  avatarUrl: any;
  email: any;
  phoneNumber: any;
  phoneNumberPrefix: any;
}

interface ProfileSnapshot {
  fullName: any;
  handle: any;
  avatarUrl: any;
  email: any;
  phoneNumberPrefix: any;
  phoneNumber: any;
  location: any;
  height: any;
  weight: any;
  bust: any;
  waist: any;
  hips: any;
  shoeSize: any;
  clothingSize: any;
  experience: any;
  bio: any;
  completionPercent: number;
  matchSummary: any;
}

interface AvailabilitySelection {
  dayNumber: number;
  date: string;
  startTimeLabel: any;
  endTimeLabel: any;
  durationHours: any;
  label: any;
  location: any;
  confirmed: boolean;
}

interface PortfolioSelection {
  id: string;
  sourcePortfolioImageId: any;
  assetUrl: string;
  title: any;
  category: any;
  isUploaded: boolean;
  isSelected: boolean;
  sortOrder: number;
}

interface ShootDay {
  id: string;
  dayNumber: number;
  date: string;
  checkedIn: boolean;
  checkedInAt: string;
  selfieUrl: any;
  latitude: any;
  longitude: any;
}

interface Escrow {
  id: string;
  status: string;
  amount: number;
  depositedAt: string;
  shootDoneAt: string;
  releasedAt: string;
  expectedReleaseAt: string;
  disputeReason: any;
  disputeDetails: any;
}

interface Rating {
  id: string;
  rating: number;
  review: any;
  createdAt: string;
}

export interface ApplyJobProgress {
  id: string;
  status: string;
  isSubmitted: boolean;
  currentStep: number;
  matchScore: number;
  coverNote: any;
  brandNote: any;
  totalPay: number;
  castlyFee: number;
  netPay: number;
  appliedAt: string;
  submittedAt: string;
  reviewedAt: string;
  completedAt: string;
  job: Job | null;
  talent: Talent | null;
  profileSnapshot: ProfileSnapshot | null;
  availabilitySelections: AvailabilitySelection[];
  portfolioSelections: PortfolioSelection[];
  messageDraft: any;
  shootDays: ShootDay[];
  escrow: Escrow | null;
  rating: Rating | null;
}

interface ApplyJobProgressState {
  message: string;
  data: ApplyJobProgress | null;
}

const initialState: ApplyJobProgressState = {
  message: '',
  data: null,
};

const applyJobProgressSlice = createSlice({
  name: 'applyJobProgress',
  initialState,
  reducers: {
    setApplyJobProgress: (
      _state,
      action: PayloadAction<ApplyJobProgressState>
    ) => action.payload,

    resetApplyJobProgress: () => initialState,
  },
});

export const { setApplyJobProgress, resetApplyJobProgress } =
  applyJobProgressSlice.actions;

export default applyJobProgressSlice.reducer;