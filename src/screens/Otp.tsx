import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LogoHeader from '../components/common/LogoHeader';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import { Fonts } from '../assets/fonts';
import { colors } from '../utils/colors';
import { correctSize } from '../utils';
import ClockOutlineIcon from '../assets/svg/applications/ClockOutlineIcon';
import LockIcon from '../assets/svg/applications/LockIcon';
import CustomButton from '../components/common/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import {
  setOtopReducer,
  setResetTokenReducer,
} from '../redux/reducers/forgotPasswordSlice';
import { useNavigation } from '@react-navigation/native';
import { stackRoutes } from '../navigation/screenIds';
import Toast from 'react-native-toast-message';
import { RootState } from '../redux/stores/store';
import { NavProp } from '../navigation/navigationTypes';
import { useSendOtpMutation, useVerifyOtpMutation } from '../services/authApi';

const Otp = () => {
  const navigation = useNavigation<NavProp>();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(90);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [sendOtp, { isLoading: isResending }] = useSendOtpMutation();

  const email = useSelector((state: RootState) => state?.forgotPassword?.email);

  const isOtpComplete = otp.every(digit => digit.trim() !== '');
  const isResendDisabled = timer > 0; // disabled while countdown is running
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleChangeText = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.charAt(text.length - 1);
    }
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async () => {
    if (!isOtpComplete) return;

    const code = otp.join('');
    try {
      const resp = await verifyOtp({ email, otpCode: code }).unwrap();
      dispatch(setOtopReducer(code));
      dispatch(setResetTokenReducer(resp.resetToken));
      navigation.navigate(stackRoutes.NewPassword);
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: e?.data?.message ?? 'Invalid OTP. Please try again.',
      });
    }
  };

  const resendEmail = async () => {
    if (isResendDisabled || isResending) return;

    setOtp(['', '', '', '']); 
    inputRefs.current[0]?.focus();

    try {
      await sendOtp({ email }).unwrap();
      setTimer(90);
      Toast.show({ type: 'success', text1: 'Code resent successfully!' });
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: e?.data?.message ?? 'Failed to resend code. Please try again.',
      });
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <LogoHeader />

        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          We've sent a 4-digit code to{'\n'} {/* fixed: was "6-digit" */}
          <Text style={styles.phoneNumber}>{email}</Text>
        </Text>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              style={[
                styles.otpInput,
                digit ? styles.otpInputFilled : {},
                index === 0 ? styles.otpInputActive : {},
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

        {/* Timer */}
        <View style={styles.timerContainer}>
          <View style={styles.timerIcon}>
            <ClockOutlineIcon color={colors.purple} />
          </View>
          <Text style={styles.timerText}>
            Code expires in {formatTime(timer)}
          </Text>
        </View>

        {/* Resend Code */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendLabel}>Didn't receive the code?</Text>
          <TouchableOpacity
            onPress={resendEmail}
            disabled={isResendDisabled || isResending}
          >
            <Text
              style={[
                styles.resendButton,
                isResendDisabled && styles.resendButtonDisabled, // gray when timer running
              ]}
            >
              {isResending ? 'Resending...' : 'Resend Code'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Security Info */}
        <LinearGradient
          colors={[colors.lightBlue_2, colors.lightBlue_4]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.7071]}
          style={styles.securityContainer}
        >
          <View style={styles.lockIcon}>
            <LockIcon width={15.75} height={18} color={colors.purple} />
          </View>
          <View style={styles.securityTextContainer}>
            <Text style={styles.securityTitle}>Secure Verification</Text>
            <Text style={styles.securityDescription}>
              This code helps us verify your identity and keep your account
              safe. Never share this code with anyone.
            </Text>
          </View>
        </LinearGradient>

        <CustomButton
          title="Reset Password"
          onPress={handleVerifyCode}
          loading={isLoading}
          disabled={!isOtpComplete || isLoading}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: correctSize(24),
    paddingBottom: correctSize(10),
  },
  title: {
    fontSize: 36,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.black_1,
    marginBottom: correctSize(12),
    marginTop: correctSize(70),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
    textAlign: 'center',
    marginBottom: correctSize(32),
  },
  phoneNumber: {
    color: colors.darkgray_1,
    fontFamily: Fonts.Inter_SemiBold,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 12,
  },
  otpInput: {
    width: correctSize(56),
    height: correctSize(64),
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 12,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2D3142',
    backgroundColor: '#FFFFFF',
  },
  otpInputFilled: {
    borderColor: colors.purple,
    backgroundColor: '#F9FAFB',
  },
  otpInputActive: {
    borderColor: colors.purple,
    backgroundColor: '#FFFFFF',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightBlue_2,
    paddingVertical: correctSize(12),
    paddingHorizontal: correctSize(12),
    borderRadius: 999,
    alignSelf: 'center',
    marginBottom: correctSize(24),
  },
  timerIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.purple,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  resendLabel: {
    fontSize: 14,
    color: colors.gray_1,
    fontFamily: Fonts.Inter_Regular,
    marginBottom: correctSize(4),
  },
  resendButton: {
    fontSize: 16,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.purple,
  },
  resendButtonDisabled: {
    color: colors.gray, // grayed out while timer is running
  },
  securityContainer: {
    flexDirection: 'row',
    padding: correctSize(21),
    borderRadius: 16,
    marginBottom: correctSize(32),
    borderWidth: 1,
    borderColor: colors.lightBlue_3,
  },
  lockIcon: {
    width: correctSize(40),
    height: correctSize(40),
    marginRight: correctSize(12),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  securityTextContainer: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
    marginBottom: correctSize(4),
  },
  securityDescription: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
    lineHeight: 20,
    flexShrink: 1,
  },
});

export default Otp;
