import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, persistor, RootState } from './src/redux/stores/store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_CLIENT_ID } from '@env';
import SplashScreen from 'react-native-splash-screen';
import { setTokens, logout } from './src/redux/reducers/userSlice';
import { useRefreshTokenMutation } from './src/services/authApi';
import { stackRoutes } from './src/navigation/screenIds';
import { StatsCard } from './src/components/StatsCard';
const hasDraft = (onboarding: RootState['onboarding']): boolean => {
  // Step is past 1, or any meaningful field has been filled in
  if (onboarding.currentStep > 1) return true;
  return (
    onboarding.fullName.trim().length > 0 ||
    onboarding.email.trim().length > 0 ||
    onboarding.phoneNumber.trim().length > 0
  );
};

const AppContent = () => {
  const [isReady, setIsReady] = React.useState(false);
  const dispatch = useDispatch();
  const [refreshTokenMutation] = useRefreshTokenMutation();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const storedRefreshToken = useSelector((state: RootState) => state.user.refreshToken);
  const onboarding = useSelector((state: RootState) => state.onboarding);


  useEffect(() => {
    const bootstrap = async () => {
      try {
        if (!storedRefreshToken) return;

        const res = await refreshTokenMutation({ refreshToken: storedRefreshToken }).unwrap();
        dispatch(setTokens({ accessToken: res.tokens.accessToken, refreshToken: res.tokens.refreshToken }));
      } catch (err) {
        dispatch(logout());
      }
    };

    bootstrap();
  }, []);

const initialRouteName = React.useMemo(() => {

  
  if (accessToken && isLogin) return stackRoutes.TabNavigator;
  // Has token AND completed onboarding — go to app
  if (accessToken && onboarding.isComplete) return stackRoutes.TabNavigator;

  // Has token but onboarding incomplete — resume signup
  if (accessToken && !onboarding.isComplete && hasDraft(onboarding)) return stackRoutes.SignUp;

  // No token but has a draft — resume signup
  if (isReady && hasDraft(onboarding)) return stackRoutes.SignUp;

  // Fresh start
  return stackRoutes.WelcomeScreen;
}, [accessToken, isReady, onboarding]);



  return (
    <PersistGate persistor={persistor} onBeforeLift={() => setIsReady(true)}>
      {isReady && (
        <RootNavigator
          onReady={() => SplashScreen.hide()}
          initialRouteName={initialRouteName}
        />
      )}
    </PersistGate>
  );
};

const App = () => {

  return (
     <KeyboardProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
            <StatsCard />
          <AppContent />
        </Provider>
        <Toast />
      </GestureHandlerRootView>
    </KeyboardProvider>

  );
};

export default App;