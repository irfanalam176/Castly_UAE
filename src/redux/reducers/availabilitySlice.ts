import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DayAvailability {
  dayNumber: number;
  date: string;
  startTimeLabel: any;
  endTimeLabel: any;
  durationHours: any;
  label: any;
  location: any;
  confirmed: boolean;
}

export interface AvailabilityState {
  days: DayAvailability[];
}

const initialState: AvailabilityState = {
  days: [],
};

const availabilitySlice = createSlice({
  name: 'availability',
  initialState,
  reducers: {
    setDays: (state, action: PayloadAction<DayAvailability[]>) => {
      state.days = action.payload;
    },

    updateDayConfirmation: (
      state,
      action: PayloadAction<{ dayNumber: number; confirmed: boolean }>
    ) => {
      const day = state.days.find(d => d.dayNumber === action.payload.dayNumber);
      if (day) {
        day.confirmed = action.payload.confirmed;
      }
    },

    addDay: (state, action: PayloadAction<DayAvailability>) => {
      state.days.push(action.payload);
    },

    resetAvailability: () => initialState,
  },
});

export const {
  setDays,
  updateDayConfirmation,
  addDay,
  resetAvailability,
} = availabilitySlice.actions;

export default availabilitySlice.reducer;