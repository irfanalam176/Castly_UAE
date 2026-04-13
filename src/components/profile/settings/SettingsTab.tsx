import { View, Text, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import NotificationsCard from './NotificationsCard';
import JobPrefrences from './JobPrefrences';
import AccountCard from './AccountCard';
import CustomButton from '../../common/CustomButton';
import LogoutIcon from '../../../assets/svg/Profile/LogoutIcon';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';
import { correctSize } from '../../../utils';
import { SlideLeftFade } from '../../Animation';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/userSlice';
import { completeOnboarding, resetOnboarding } from '../../../redux/reducers/onboardingSlice';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NavProp } from '../../../navigation/navigationTypes';
import { stackRoutes } from '../../../navigation/screenIds';
import { ActionSheetRef } from 'react-native-actions-sheet';
import EditActionSheet from '../EditProfile/EditActionSheet';
import { useProfile } from '../../../hooks/useProfile';

const STAGGER = 150;
const SettingsTab = () => {
  const sheetRef = useRef<ActionSheetRef>(null);
  const {profile} = useProfile()
  const navigation = useNavigation<NavProp>()
  const dispatch = useDispatch()
  function signOut() {
    dispatch(logout());
    dispatch(resetOnboarding());
    dispatch(completeOnboarding(false))
    navigation.dispatch( 
      CommonActions.reset({
        index: 0,
        routes: [{ name: stackRoutes.WelcomeScreen }],
      }),
    );
  }
    function handleEdit() {
    sheetRef.current?.show();
  }
  return (
    <View>
      <EditActionSheet actionSheetRef={sheetRef} />
      <SlideLeftFade delay={STAGGER * 1}>
        <NotificationsCard />
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 2}>
        <JobPrefrences />
      </SlideLeftFade>
      <SlideLeftFade delay={STAGGER * 3}>
        <AccountCard onEdit={handleEdit}/>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 4}>
        <CustomButton
          icon={<LogoutIcon />}
          title="Sign Out"
          style={styles.logoutBtn}
          textStyle={styles.logoutBtnText}
          onPress={signOut}
        />

        <Text style={styles.footerText}>
          Castly Talent v2.4.1
        </Text>
      </SlideLeftFade>
    </View>
  );
};

export default SettingsTab;
const styles = StyleSheet.create({
  logoutBtn: {
    backgroundColor: colors.light_red,
  },
  logoutBtnText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.red_3,
  },
  footerText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    textAlign: 'center',
    marginTop: correctSize(16),
  },
});
