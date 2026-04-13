import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import Icons from '../vectorIcons/Icons';
import { colors } from '../../utils/colors';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/userSlice';
import { CommonActions, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { RootState } from '../../redux/stores/store';
import { images } from '../../assets/images';

interface LogoHeaderProps {
  showClose?: boolean;
  onGoback?: () => void;
}
export default function LogoHeader({
  showClose = true,
  onGoback,
}: LogoHeaderProps) {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [canGoBack, setCanGoBack] = useState(false);

  useLayoutEffect(() => {
    setCanGoBack(navigation.canGoBack());
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FastImage
        source={images.logo}
        style={styles.imgStyle}
        resizeMode={FastImage.resizeMode.contain}
      />

      {showClose && (
        <TouchableOpacity
          onPress={async () => {
            if (onGoback) {
              onGoback();
              return;
            }
            if (canGoBack) {
              navigation.goBack();
            } else if (accessToken) {
              dispatch(logout());
              await GoogleSignin.signOut();
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Auth' }],
                }),
              );
            }
          }}
        >
          <Icons
            family={'MaterialDesignIcons'}
            name={canGoBack ? 'keyboard-backspace' : 'close'}
            color={colors.black_1}
            size={25}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imgStyle: {
    height: 50,
    width: 120,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
