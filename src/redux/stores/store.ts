import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../rootReducers';
import { persistStore } from 'redux-persist';
import { authApi } from '../../services/authApi';
import { profileApi } from '../../services/profileAPI';
import { applicationApi } from '../../services/applicationApi';
import { notificationsApi } from '../../services/notificationsApi';
import { signupApi } from '../../services/signupApi';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(

      signupApi.middleware,

      authApi.middleware,
      profileApi.middleware,
      applicationApi.middleware,
      notificationsApi.middleware
    )
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;