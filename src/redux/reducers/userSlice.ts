import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../services/authApi';
import { signupApi } from '../../services/signupApi';

interface UserState {
  isLogin:boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  isLogin:false,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null; 
      state.isLogin=false
    },
    setLogin:(state,action)=>{
      state.isLogin=action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
        state.accessToken = payload.tokens.accessToken;
        state.refreshToken = payload.tokens.refreshToken;
      })
      // ✅ tokens only come back on step 1
      .addMatcher(signupApi.endpoints.signUpStep1.matchFulfilled, (state, { payload }) => {
        
        state.accessToken = payload.tokens.accessToken;
        state.refreshToken = payload.tokens?.refreshToken ?? state.refreshToken;
      });
  },
});

export const { setTokens, setAccessToken, logout,setLogin } = userSlice.actions;
export default userSlice.reducer;