import { combineReducers } from 'redux';
import userSlice from './reducers/userSlice';
import forgotPasswordSlice from './reducers/forgotPasswordSlice';
import applicationSlice from './reducers/applicationSlice';
import profileSlice from './reducers/profileSlice';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '../services/authApi';
import { profileApi } from '../services/profileAPI';
import { applicationApi } from '../services/applicationApi';
import { notificationsApi } from '../services/notificationsApi';
import onboardingSlice from './reducers/onboardingSlice';
import confirmProfileSlice from './reducers/confirmProfileSlice';
import availabilitySlice from './reducers/availabilitySlice';
import portfolioSlice from './reducers/portfolioSlice';
import messageSlice from './reducers/messageSlice';
import applyJobProgressSlice from './reducers/applyJobProgressSlice';
import JobDataSlice from './reducers/JobDataSlice';
import profileRefreshSlice from './reducers/profileRefreshSlice';
import { signupApi } from '../services/signupApi';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    signupApi.reducerPath,
    authApi.reducerPath,
    profileApi.reducerPath,
    applicationApi.reducerPath,
    'confirmProfile',
    'availability',
    'portfolio',
    'message',
    'applyJobProgress',
    'JobData',
    'profileRefresh',
  ],
};

const rootReducer = combineReducers({
  user: userSlice,
  forgotPassword: forgotPasswordSlice,
  application: applicationSlice,
  profile: profileSlice,
  onboarding: onboardingSlice,
  confirmProfile: confirmProfileSlice,
  availability: availabilitySlice,
  portfolio: portfolioSlice,
  message: messageSlice,
  applyJobProgress:applyJobProgressSlice,
  JobData:JobDataSlice,
  profileRefresh:profileRefreshSlice,
  [signupApi.reducerPath]: signupApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [applicationApi.reducerPath]: applicationApi.reducer,
  [notificationsApi.reducerPath]: notificationsApi.reducer,
});

export default persistReducer(persistConfig, rootReducer);
