import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserDataState {
    profile: boolean;
    headShot: boolean;
    fullBody: boolean;
    casual: boolean;
    shortVideo: boolean;
    skills: boolean;
    measurements: boolean;
    portfolio: boolean;
    bankDetails: boolean;
}

const initialState: UserDataState = {
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

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        // ✅ Called on LOGIN with raw API user object
        setUserProfileDataFromApi: (state, action: PayloadAction<any>) => {
            const user = action.payload;
            const mediaTypes = user.media?.map((m: any) => m.type) ?? [];

            state.profile = !!(user.name && user.email && user.gender && user.dob && user.nationality && user.description);
            state.headShot = mediaTypes.includes("HEADSHOT");
            state.fullBody = mediaTypes.includes("FULL_BODY");
            state.casual = mediaTypes.includes("CASUAL");
            state.shortVideo = mediaTypes.includes("FULL_VIDEO");
            state.skills = (user.skills?.length ?? 0) > 0;
            state.measurements = !!user.measurements;
            state.portfolio = mediaTypes.includes("PORTFOLIO");
            state.bankDetails = (user.userBankAccounts?.length ?? 0) > 0;
        },

        setUserProfileData: (state, action: PayloadAction<Partial<UserDataState>>) => {
            return { ...state, ...action.payload };
        },

        resetUserProfileData: () => initialState,
    },
});

export const { setUserProfileData, setUserProfileDataFromApi, resetUserProfileData } = userDataSlice.actions;
export default userDataSlice.reducer;