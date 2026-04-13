import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import LogoHeader from '../components/common/LogoHeader';
import { correctSize } from '../utils';
import LockIcon from '../assets/svg/applications/LockIcon';
import { colors } from '../utils/colors';
import { Fonts } from '../assets/fonts';
import CustomInput from '../components/common/CustomInput';
import CheckIcon from '../assets/svg/applications/CheckIcon';
import CrossIcon from '../components/vectorIcons/CrossIcon';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import CustomButton from '../components/common/CustomButton';
import NoticeCard from '../components/auth/NoticeCard';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { stackRoutes } from '../navigation/screenIds';
import Toast from 'react-native-toast-message';
import { RootState } from '../redux/stores/store';
import { NavProp } from '../navigation/navigationTypes';
import { useResetPasswordMutation } from '../services/authApi';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigation = useNavigation<NavProp>();

  const { email,resetToken } = useSelector((state: RootState) => state.forgotPassword);
  console.log("reset token", resetToken);
  
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
 
  const passwordChecks = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    number: /\d/.test(newPassword),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const validationChecks = [
    { id: 1, label: 'At least 8 characters', valid: passwordChecks.length },
    { id: 2, label: 'One uppercase letter', valid: passwordChecks.uppercase },
    { id: 3, label: 'One number', valid: passwordChecks.number },
    { id: 4, label: 'One special character', valid: passwordChecks.special },
  ];

  const validatePassword = () => {
    let valid = true;
    setPasswordError('');
    setConfirmPasswordError('');

    if (!newPassword) {
      setPasswordError('Password is required');
      valid = false;
    } else if (!passwordChecks.length) {
      setPasswordError('Must be at least 8 characters');
      valid = false;
    } else if (!passwordChecks.uppercase) {
      setPasswordError('Must contain one uppercase letter');
      valid = false;
    } else if (!passwordChecks.number) {
      setPasswordError('Must contain one number');
      valid = false;
    } else if (!passwordChecks.special) {
      setPasswordError('Must contain one special character');
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      valid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    return valid;
  };

  const updatePassword = async () => {
    if (!validatePassword()) return;

    try {
      await resetPassword({
        email,
        resetToken,      
        newPassword,
      }).unwrap();

      navigation.navigate(stackRoutes.PasswordReset);
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: e?.data?.message ?? 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
      >
        <ScrollView
          contentContainerStyle={styles.contents}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LogoHeader />

          <View style={styles.iconContainer}>
            <LockIcon width={17.5} height={20} color={colors.purple} />
          </View>

          <Text style={styles.title}>{'Create New\nPassword'}</Text>
          <Text style={styles.subtitle}>
            Enter a new password for your account. Make sure it's strong and secure.
          </Text>

          {/* New Password */}
          <CustomInput
            label="Password"
            leftSvgIcon={
              <LockIcon width={12.25} height={14} color={colors.gray_3} />
            }
            labelStyle={styles.inputLabel}
            inputContainerStyle={[
              styles.inputFieldContainer,
              !!passwordError && styles.inputError,
            ]}
            inputStyle={styles.inputField}
            value={newPassword}
            onChangeText={val => {
              setNewPassword(val);
              setPasswordError('');
            }}
            secureTextEntry
            placeholder="Enter new password"
            placeholderTextColor={colors.gray_2}
          />
          {/* fixed: conditionally render instead of always reserving space */}
          {!!passwordError && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}

          {/* Confirm Password */}
          <CustomInput
            label="Confirm Password"
            leftSvgIcon={
              <LockIcon width={12.25} height={14} color={colors.gray_3} />
            }
            labelStyle={styles.inputLabel}
            inputContainerStyle={[
              styles.inputFieldContainer,
              !!confirmPasswordError && styles.inputError,
            ]}
            inputStyle={styles.inputField}
            value={confirmPassword}
            onChangeText={val => {
              setConfirmPassword(val);
              setConfirmPasswordError('');
            }}
            secureTextEntry
            placeholder="Confirm new password"
            placeholderTextColor={colors.gray_2}
          />
          {!!confirmPasswordError && (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          )}

          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementText}>Password Requirements:</Text>
            {validationChecks.map(item => (
              <View key={item.id} style={styles.row}>
                {item.valid ? (
                  <CheckIcon color={colors.darkGreen3} width={10.5} height={12} />
                ) : (
                  <CrossIcon width={9} height={12} fillColor={colors.gray_5} />
                )}
                <Text style={styles.checkLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          <CustomButton
            title="Update Password"
            onPress={updatePassword}
            loading={isLoading}  
            disabled={isLoading}
          />

          <NoticeCard />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  contents: {
    padding: correctSize(24),
    flexGrow: 1,
  },
  iconContainer: {
    width: correctSize(48),
    height: correctSize(48),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightBlue_2, // fixed: was colors.primary, clashed with white lock icon
    marginTop: correctSize(30),
    marginBottom: correctSize(12),
  },
  title: {
    fontSize: 36,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.black_1,
    marginBottom: correctSize(12),
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
    marginBottom: correctSize(32),
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    marginBottom: correctSize(4),
    color: colors.black,
  },
  inputFieldContainer: {
    height: correctSize(56),
    borderColor: colors.gray,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 2,
    paddingHorizontal: correctSize(16),
    marginBottom: correctSize(4),
  },
  inputError: {
    borderColor: colors.red,
  },
  inputField: {
    fontSize: 16,
    color: colors.black,
  },
  errorText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.red,
    marginBottom: correctSize(12),
    marginTop: correctSize(2),
  },
  requirementsContainer: {
    backgroundColor: colors.lightBlue_5,
    padding: correctSize(17),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray,
    marginBottom: correctSize(23),
    marginTop: correctSize(8),
  },
  requirementText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray,
    marginBottom: correctSize(13),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginBottom: correctSize(8),
  },
  checkLabel: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
  },
});