import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import { correctSize } from '../../utils';
import TalentInfoTable from '../../components/onboarding/TalentInfoTable';
import CustomButton from '../../components/common/CustomButton';
import { SlideLeftFade } from '../../components/Animation';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NavProp } from '../../navigation/navigationTypes';
import { stackRoutes } from '../../navigation/screenIds';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/stores/store';
import {
  completeOnboarding,
  resetOnboarding,
} from '../../redux/reducers/onboardingSlice';
import { useProfile } from '../../hooks/useProfile';
import Profile from '../Portfolio/Profile';
import Toast from 'react-native-toast-message';
import { useVerifyEmailMutation } from '../../services/authApi';
const STAGGER = 150;

const StartBrowsing = () => {
  const navigation = useNavigation<NavProp>();
  const [VerifyEmail, { isLoading }] = useVerifyEmailMutation();
  const { profile } = useProfile();
  async function handleAction() {
    // dispatch(resetOnboarding());
    // dispatch(completeOnboarding(true));
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: stackRoutes.TabNavigator }],
    //   }),
    // );

    // send otp here than navigate

    try {
      await VerifyEmail(undefined).unwrap();
      Toast.show({
        type: 'success',
        text1: 'OTP Sent',
        text2: 'OTP has been sent to your mailbox.',
      });
      navigation.navigate(stackRoutes.VerificationOTP,{email:profile?.email});
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Email Verification Failed',
        text2: 'Something went wrong. Please try again.',
      });
    }

    // navigation.navigate(stackRoutes.VerificationOTP,{email:profile?.email})
  }

  return (
    <View style={styles.body}>
      {/* 1 — Title */}
      <SlideLeftFade delay={STAGGER * 1}>
        <Text style={styles.title}>You're In! 🎉</Text>
      </SlideLeftFade>

      {/* 2 — Welcome Text */}
      <SlideLeftFade delay={STAGGER * 2}>
        <Text style={styles.mainText}>
          Welcome to Castly,{' '}
          <Text style={styles.bold}>{profile?.name.split(' ')[0]}</Text>. Your
          profile is live and you're already being matched to campaigns.
        </Text>
      </SlideLeftFade>

      {/* 3 — Talent Info Table */}
      <SlideLeftFade delay={STAGGER * 3} style={styles.widthWrapper}>
        <TalentInfoTable />
      </SlideLeftFade>

      {/* 4 — CTA Button */}
      <SlideLeftFade delay={STAGGER * 4} style={styles.widthWrapper}>
        <CustomButton
          title="Verify Your Email →"
          onPress={handleAction}
          loading={isLoading}
          disabled={isLoading}
        />
      </SlideLeftFade>

      {/* 5 — Footer */}
      <SlideLeftFade delay={STAGGER * 5}>
        <Text style={styles.footerText}>
          Complete your ID verification to unlock premium listings
        </Text>
      </SlideLeftFade>
    </View>
  );
};

export default StartBrowsing;

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.darkgray_1,
    flex: 1,
    padding: correctSize(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.white,
    marginBottom: correctSize(10),
  },
  mainText: {
    color: colors.gray_3,
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    lineHeight: correctSize(22.75),
    textAlign: 'center',
  },
  bold: {
    color: colors.white,
    fontFamily: Fonts.Inter_Bold,
  },
  footerText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    marginTop: correctSize(14),
  },
  widthWrapper: {
    width: '100%',
  },
});
