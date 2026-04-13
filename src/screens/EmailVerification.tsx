import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import LogoHeader from '../components/common/LogoHeader';
import { correctSize } from '../utils';
import { Fonts } from '../assets/fonts';
import { colors } from '../utils/colors';
import CustomInput from '../components/common/CustomInput';
import EmailOutlineIcon from '../assets/svg/Profile/EmailOutlineIcon';
import CustomButton from '../components/common/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { stackRoutes } from '../navigation/screenIds';
import { useDispatch } from 'react-redux';
import { setEmailReducer } from '../redux/reducers/forgotPasswordSlice';
import { NavProp } from '../navigation/navigationTypes';
import { useSendOtpMutation } from '../services/authApi';

const EmailVerification = () => {
  const navigation = useNavigation<NavProp>();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const dispatch = useDispatch<any>();
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (value: string) => {
    if (!value.trim()) return 'Email address is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return '';
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (isEmailTouched) {
      setEmailError(validateEmail(text));
    }
  };

  const handleSendVerificationCode = async () => {
    setIsEmailTouched(true);
    const error = validateEmail(email);
    setEmailError(error);

    // Block API call if validation fails
    if (error) return;

    try {
     const res =  await sendOtp({ email }).unwrap();
      
      dispatch(setEmailReducer(email)); 
      navigation.navigate(stackRoutes.Otp);
    } catch (e: any) {
      console.log('Send verification error:', e);
      setEmailError(
        e?.data?.message ?? 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView>
        <View style={styles.content}>
          <LogoHeader />

          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            No worries! Enter your email address and we'll send you 4 digit
            verification code.
          </Text>

          <CustomInput
            label="Email Address"
            inputContainerStyle={[
              styles.input,
              emailError && isEmailTouched ? styles.inputError : {},
            ]}
            placeholder="you@example.com"
            placeholderTextColor={colors.gray}
            leftSvgIcon={<EmailOutlineIcon />}
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {emailError && isEmailTouched ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <CustomButton
            title="Send Verification Code"
            style={styles.button}
            onPress={handleSendVerificationCode}
            loading={isLoading} 
            disabled={isLoading}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Remember your password?</Text>
          <Text style={styles.backBtn} onPress={() => navigation.goBack()}>
            Back to Login
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default EmailVerification;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: correctSize(24),
  },
  title: {
    fontSize: 36,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.black_1,
    marginBottom: correctSize(12),
    marginTop: correctSize(70),
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
    marginBottom: correctSize(32),
  },
  input: {
    borderColor: colors.gray,
    borderWidth: 2,
    marginBottom: correctSize(16),
  },
  inputError: {
    borderColor: colors.red,
    marginBottom: correctSize(8),
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.red,
    marginBottom: correctSize(16),
    marginTop: correctSize(-8),
  },
  button: {
    backgroundColor: colors.primary,
    height: correctSize(56),
    ...Platform.select({
      ios: {
        shadowColor: colors.lightBlue_10,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
        shadowColor: colors.black,
      },
    }),
  },
  footerText: {
    fontSize: 14,
    color: colors.gray_1,
    fontFamily: Fonts.Inter_Regular,
    marginBottom: correctSize(4),
    textAlign: 'center',
  },
  backBtn: {
    fontSize: 16,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.purple,
    textAlign: 'center',
  },
  footer: {
    borderTopColor: colors.gray,
    borderTopWidth: 1,
    paddingTop: correctSize(22),
    marginTop: correctSize(100),
  },
});