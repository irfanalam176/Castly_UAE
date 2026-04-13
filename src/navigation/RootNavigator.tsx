import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import Toast from 'react-native-toast-message';
import { linkingConfig } from './linkingConfig';

const RootNavigator = ({ onReady, initialRouteName }: { onReady?: () => void; initialRouteName?: string }) => {
  const navigationRef = useNavigationContainerRef();
  const [lastBackPress, setLastBackPress] = useState(0);

  useEffect(() => {
    const backAction = () => {
      if (Platform.OS !== 'android') return false;

      const canGoBack = navigationRef.isReady() && navigationRef.canGoBack();

      if (canGoBack) {
        return false;
      }

      const now = Date.now();
      if (lastBackPress && now - lastBackPress < 2000) {
        BackHandler.exitApp();
        return true;
      }

      setLastBackPress(now);
      Toast.show({
        type: 'info',
        text1: 'Press back again to quit',
        position: 'top',
        visibilityTime: 2000,
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [lastBackPress, navigationRef]);

  return (
    <NavigationContainer ref={navigationRef} onReady={onReady} linking={linkingConfig}>
      <MainNavigator initialRouteName={initialRouteName} />
    </NavigationContainer>
  );
};

export default RootNavigator;