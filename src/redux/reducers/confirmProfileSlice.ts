// redux/reducers/confirmProfileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ClothingSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ConfirmProfileState {
  fullName: string;
  handle: string;
  avatarUrl: string;        // ← S3 key
  email: string;
  phoneNumberPrefix: string;
  phoneNumber: string;
  location: string;
  height: number;
  weight: number;
  bust: number;
  waist: number;
  hips: number;
  shoeSize: number;
  clothingSize: ClothingSize;
  experience: string;
  bio: string;
}

const initialState: ConfirmProfileState = {
  fullName: '',
  handle: '',
  avatarUrl: '',
  email: '',
  phoneNumberPrefix: '',
  phoneNumber: '',
  location: '',
  height: 0,
  weight: 0,
  bust: 0,
  waist: 0,
  hips: 0,
  shoeSize: 0,
  clothingSize: 'S',
  experience: '',
  bio: '',
};

const confirmProfileSlice = createSlice({
  name: 'confirmProfile',
  initialState,
  reducers: {
    setConfirmProfileField: (state, action: PayloadAction<Partial<ConfirmProfileState>>) => {
      return { ...state, ...action.payload };
    },
    resetConfirmProfile: () => initialState,
  },
});

export const { setConfirmProfileField, resetConfirmProfile } = confirmProfileSlice.actions;
export default confirmProfileSlice.reducer;