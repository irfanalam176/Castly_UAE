import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import { Fonts } from '../assets/fonts';
import { colors } from '../utils/colors';
import { correctSize } from '../utils';
import { useDispatch } from 'react-redux';
import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { stackRoutes } from '../navigation/screenIds';
import Toast from 'react-native-toast-message';
import { NavProp } from '../navigation/navigationTypes';
import {
  useVerifyEmailMutation,
  useVerifyEmailOtpMutation,
} from '../services/authApi';
import RecycleIcon from '../assets/svg/common/RecycleIcon';
import ShieldIcon from '../assets/svg/common/ShieldIcon';
import BackIcon from '../assets/svg/Home/BackIcon';
import {
  completeOnboarding,
  resetOnboarding,
} from '../redux/reducers/onboardingSlice';
import { setLogin } from '../redux/reducers/userSlice';

const VerificationOTP = () => {
  const navigation = useNavigation<NavProp>();
  const Route = useRoute();
  const { email } = Route.params as { email: string };
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isInvalid, setIsInvalid] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const dispatch = useDispatch();
  const [VerifyEmail, { isLoading: resendOtpLoading }] =
    useVerifyEmailMutation();
  const [verifyEmailOtp, { isLoading }] = useVerifyEmailOtpMutation();
  const isOtpComplete = otp.every(digit => digit.trim() !== '');

  const resetOtp = () => {
    setOtp(['', '', '', '']);
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  };

  const handleChangeText = (text: string, index: number) => {
    if (text.length > 1) text = text.charAt(text.length - 1);
    setIsInvalid(false);
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < otp.length - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (isOtpComplete) handleVerifyCode();
  }, [otp]);

  const handleVerifyCode = async () => {
    if (!isOtpComplete) return;
    const code = otp.join('');
    try {
      Keyboard.dismiss()
      const resp = await verifyEmailOtp({ otpCode: code }).unwrap();
      dispatch(resetOnboarding());
      dispatch(completeOnboarding(true));
      dispatch(setLogin(true));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: stackRoutes.TabNavigator }],
        }),
      );
    } catch (e: any) {
      setIsInvalid(true);
      resetOtp();
      Toast.show({
        type: 'error',
        text1: e?.data?.message ?? 'Invalid OTP. Please try again.',
      });
    }
  };

  const resendEmail = async () => {
    try {
      await VerifyEmail(undefined).unwrap();
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Email Verification Failed',
        text2: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.mainBody}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <BackIcon color={colors.white_rgb7} height={15} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Check Your Email</Text>
          <Text style={styles.subtitle}>
            We've sent a 4-digit code to{'\n'}
            <Text style={styles.emailText}>{email}</Text>
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpInput,
                  digit && !isInvalid && styles.otpInputFilled,
                  isInvalid && styles.otpInputError,
                ]}
                value={digit}
                onChangeText={text => handleChangeText(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          {isLoading && (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color={colors.white_rgb7} />
              <Text style={styles.loaderText}>Verifying...</Text>
            </View>
          )}

          <View style={styles.resendContainer}>
            <Text style={styles.resendLabel}>Didn't receive the code?</Text>
            <TouchableOpacity
              onPress={resendEmail}
              disabled={resendOtpLoading}
              style={styles.resendBtn}
            >
              <RecycleIcon />
              <Text
                style={[
                  styles.resendButton,
                  resendOtpLoading && styles.resendButtonDisabled,
                ]}
              >
                {resendOtpLoading ? 'Resending...' : 'Resend Code'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.securityContainer}>
            <ShieldIcon color={colors.primary} />
            <Text style={styles.securityDescription}>
              For your security, this code expires in 10 minutes. Never share
              this code with anyone.
            </Text>
          </View>
        </View>

        <Text style={styles.support}>
          Having trouble? <Text style={styles.highlight}>Contact Support</Text>
        </Text>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: correctSize(24),
    paddingBottom: correctSize(10),
    backgroundColor: colors.darkgray_1,
  },
  mainBody: { flex: 1 },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginTop: correctSize(16),
  },
  backText: {
    color: colors.white_rgb7,
    fontSize: 13,
    fontFamily: Fonts.Inter_Medium,
  },
  title: {
    fontSize: 36,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.white,
    marginBottom: correctSize(12),
    marginTop: correctSize(70),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    textAlign: 'center',
    marginBottom: correctSize(32),
  },
  emailText: {
    color: colors.primary,
    fontFamily: Fonts.Inter_SemiBold,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: correctSize(24),
    gap: 12,
  },
  otpInput: {
    width: correctSize(56),
    height: correctSize(64),
    borderWidth: 2,
    borderColor: colors.gray_8,
    borderRadius: 12,
    fontSize: 24,
    fontFamily: Fonts.Inter_SemiBold,
    textAlign: 'center',
    color: colors.white,
    backgroundColor: colors.white_rgb6,
  },
  otpInputFilled: {
    borderColor: colors.primary,
  },
  otpInputError: {
    borderColor: colors.red,
  },
  loader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: correctSize(5),
    marginBottom: correctSize(12),
  },
  loaderText: {
    color: colors.white_rgb7,
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: correctSize(32),
  },
  resendLabel: {
    fontSize: 14,
    color: colors.white_rgb7,
    fontFamily: Fonts.Inter_Regular,
    marginBottom: correctSize(4),
  },
  resendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
  },
  resendButton: {
    fontSize: 16,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.primary,
  },
  resendButtonDisabled: {
    color: colors.gray,
  },
  securityContainer: {
    flexDirection: 'row',
    gap: correctSize(12),
    padding: correctSize(21),
    borderRadius: 16,
    marginBottom: correctSize(32),
    borderWidth: 1,
    borderColor: colors.lightBlue_3,
  },
  securityDescription: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.white_rgb7,
    lineHeight: 20,
    flexShrink: 1,
  },
  support: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.white_rgb7,
    textAlign: 'center',
  },
  highlight: { color: colors.primary },
});

export default VerificationOTP;
