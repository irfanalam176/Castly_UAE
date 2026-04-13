import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const profileRefreshSlice = createSlice({
  name: "profileRefresh",
  initialState: {
    isRefreshing: false,
  },
  reducers: {
    setRefresh: (state, action: PayloadAction<boolean>) => {
      state.isRefreshing = action.payload;
    },
  },
});

export const { setRefresh } = profileRefreshSlice.actions;
export default profileRefreshSlice.reducer;