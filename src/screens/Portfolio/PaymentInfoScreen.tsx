import {
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { stackRoutes } from '../../navigation/screenIds';
import LogoHeader from '../../components/common/LogoHeader';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import CustomInput from '../../components/common/CustomInput';
import InfoBanner from '../../components/common/InfoBanner';
import CustomButton from '../../components/common/CustomButton';
import { btmContainer } from '../../utils/layout';
import { Dropdown } from 'react-native-element-dropdown';
import Icons from '../../components/vectorIcons/Icons';
import { BANK_LIST } from '../../utils/array';
import { inputIcons } from '../../utils/iconConfig';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import {
  useAddUserBankDetailsMutation,
  useUpdateBankAccountMutation,
} from '../../services/profileAPI';
import { useProfile } from '../../hooks/useProfile';
import { correctSize } from '../../utils';
import InfoIcon from '../../assets/svg/portfolio/InfoIcon';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavProp } from '../../navigation/navigationTypes';

export default function PaymentInfoScreen() {
  const navigation = useNavigation<NavProp>()
  const route = useRoute<any>()
  const { profile, fetchProfile } = useProfile();

  // ── Safe fallbacks so nothing crashes when data is loading/empty ─────────
  const bankDetailsList: any[] = profile?.userBankAccounts ?? profile?.bankAccounts ?? [];
  const bankDetails =
    bankDetailsList.length > 0
      ? bankDetailsList[bankDetailsList.length - 1]
      : null;

  const [accountHolderName, setAccountHolderName] = useState<string>(
    bankDetails?.accountHolderName ?? '',
  );
  const [iban, setIban] = useState<string>(bankDetails?.iban ?? '');
  const [bankName, setBankName] = useState<string>(bankDetails?.bankName ?? '');
  const [swiftCode, setSwiftCode] = useState<string>(
    bankDetails?.swiftCode ?? '',
  );
  const [isConfirmed, setIsConfirmed] = useState<boolean>(
    bankDetails?.isVerified ?? false,
  );

  // Sync state when profile data loads (initial load is async)
  useEffect(() => {
    if (bankDetails) {
      setAccountHolderName(bankDetails.accountHolderName ?? '');
      setIban(bankDetails.iban ?? '');
      setBankName(bankDetails.bankName ?? '');
      setSwiftCode(bankDetails.swiftCode ?? '');
      setIsConfirmed(bankDetails.isVerified ?? false);
    }
  }, [profile]);

  // ── Error states ─────────────────────────────────────────────────────────
  const [nameError, setNameError] = useState('');
  const [ibanError, setIbanError] = useState('');
  const [swiftError, setSwiftError] = useState('');

  const [addUserBankDetails, { isLoading }] = useAddUserBankDetailsMutation();
  const [updateBankAccount, { isLoading: updateLoading }] =
    useUpdateBankAccountMutation();

  const isEdit = route?.params?.status === 'EDIT';

  // ── Validation ───────────────────────────────────────────────────────────
  const validateName = (value: string): boolean => {
    if (!value) {
      setNameError('');
      return true;
    }
    if (value.length < 3) {
      setNameError('Name must be at least 3 characters');
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      setNameError('Name can only contain letters and spaces');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateIban = (value: string): boolean => {
    const clean = value.replace(/\s/g, '');
    if (!value) {
      setIbanError('');
      return true;
    }
    if (!clean.startsWith('AE')) {
      setIbanError('UAE IBAN must start with AE');
      return false;
    }
    if (clean.length !== 23) {
      setIbanError('UAE IBAN must be 23 characters (AE + 21 digits)');
      return false;
    }
    setIbanError('');
    return true;
  };

  const validateSwift = (value: string): boolean => {
    if (!value) {
      setSwiftError('');
      return true;
    }
    if (value.length < 8 || value.length > 11) {
      setSwiftError('SWIFT code must be 8 or 11 characters');
      return false;
    }
    if (!/^[A-Z0-9]+$/.test(value)) {
      setSwiftError(
        'SWIFT code can only contain uppercase letters and numbers',
      );
      return false;
    }
    setSwiftError('');
    return true;
  };

  // ── Input handlers ───────────────────────────────────────────────────────
  const handleNameChange = (value: string) => {
    setAccountHolderName(value);
    validateName(value);
  };

  const handleIbanChange = (text: string) => {
    const clean = text.replace(/[^A-Za-z0-9]/g, '');
    const formatted = clean.replace(/(.{4})/g, '$1 ').trim();
    setIban(formatted);
  };

  const handleSwiftChange = (text: string) => {
    setSwiftCode(text.replace(/[^A-Za-z0-9]/g, ''));
  };

  const isFormValid = (): boolean =>
    !!(
      accountHolderName &&
      iban &&
      bankName &&
      swiftCode &&
      isConfirmed &&
      !nameError &&
      !ibanError &&
      !swiftError
    );

  // ── Submit ───────────────────────────────────────────────────────────────
  const addUserPaymentDetails = async () => {
    const isNameValid = validateName(accountHolderName);
    const isIbanValid = validateIban(iban);
    const isSwiftValid = validateSwift(swiftCode);
    if (!isNameValid || !isIbanValid || !isSwiftValid) return;

    const payload = {
      accountHolderName,
      iban,
      bankName,
      swiftCode,
      isPrimary: true,
    };

    try {
      if (isEdit) {
        await updateBankAccount({ id: bankDetails?.id, payload }).unwrap();
        fetchProfile();
        navigation.goBack();
        return;
      }

      const res: any = await addUserBankDetails(payload).unwrap();
      fetchProfile();
      if (res?.data?.bankName) {
        navigation.navigate(stackRoutes.VerificationKyc);
      }
    } catch (err: any) {
      console.log('API Error:', err);
      Alert.alert(
        'Error',
        err?.data?.message ?? 'Something went wrong. Please try again.',
      );
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
      >
        <ScrollView
          style={styles.logoHeaderContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.body}>
            {isEdit ? (
              <LogoHeader />
            ) : (
              <LogoHeader
                onGoback={() =>
                  navigation.navigate(stackRoutes.PortfolioScreen)
                }
              />
            )}
            <Text style={styles.titleText}>Payment Details</Text>
            <Text style={styles.subtitleText}>
              Add your bank details to receive payments securely. Your
              information is encrypted and protected.
            </Text>

            <InfoBanner
              containerbgColor={colors.lightBlue_2}
              containerborderColor={colors.green_2}
              gradient={true}
              gradientColor={[colors.green_3, colors.green_1]}
              containerMarginBottom={correctSize(13)}
              headingFamily={Fonts.Inter_Bold}
              descriptionFamily={Fonts.Inter_Regular}
              iconPadding={10}
              icon={'lock'}
              iconBg={colors.darkGreen_2}
              heading={'Bank-Level Security'}
              headingColor={colors.darkGreen}
              description={
                'Your banking information is encrypted with 256-bit SSL and never shared with brands. Payments are processed through secure escrow.'
              }
              descriptionColor={colors.darkGreen_1}
            />

            {/* Account Holder Name */}
            <CustomInput
              label="Account Holder Name"
              leftIcon={inputIcons.userProfile}
              containerStyle={styles.inputContainer}
              labelStyle={styles.inputLabel}
              inputContainerStyle={[
                styles.inputFieldContainer,
                nameError ? styles.inputFieldError : null,
              ]}
              inputStyle={styles.inputField}
              value={accountHolderName}
              onChangeText={handleNameChange}
              placeholder="Enter full name as per Emirates ID"
              placeholderTextColor={colors.gray_2}
            />
            {nameError ? (
              <Text style={styles.errorText}>{nameError}</Text>
            ) : (
              <Text style={styles.hintText}>
                Must match the name on your bank account
              </Text>
            )}

            {/* IBAN */}
            <CustomInput
              label="IBAN Number"
              leftIcon={inputIcons.bank}
              containerStyle={styles.inputContainer}
              labelStyle={styles.inputLabel}
              inputContainerStyle={[
                styles.inputFieldContainer,
                ibanError ? styles.inputFieldError : null,
              ]}
              inputStyle={styles.inputField}
              value={iban}
              onChangeText={handleIbanChange}
              placeholder="AE07 0331 2345 6789 0123 456"
              placeholderTextColor={colors.gray_2}
              autoCapitalize="characters"
            />
            {ibanError ? (
              <Text style={styles.errorText}>{ibanError}</Text>
            ) : (
              <Text style={styles.hintText}>
                UAE IBAN starts with AE followed by 21 digits
              </Text>
            )}

            {/* Bank Name Dropdown */}
            <Text style={styles.labelText}>Bank Name</Text>
            <Dropdown
              containerStyle={{
                backgroundColor: colors.white,
                borderColor: colors.gray,
                borderWidth: 1,
                borderRadius: 12,
              }}
              itemTextStyle={{
                color: colors.darkgray_1,
                textTransform: 'capitalize',
              }}
              selectedTextStyle={{ color: colors.darkgray_1 }}
              style={styles.dropdown}
              data={BANK_LIST}
              labelField="label"
              valueField="value"
              placeholder="Select your bank"
              placeholderStyle={{ color: colors.darkgray_1 }}
              value={bankName}
              onChange={i => setBankName(i?.value)}
              iconColor={colors.black}
              activeColor={colors.gray}
            />

            {/* SWIFT Code */}
            <CustomInput
              label="SWIFT/BIC Code"
              leftIcon={inputIcons.globe}
              containerStyle={styles.inputContainer}
              labelStyle={styles.inputLabel}
              inputContainerStyle={[
                styles.inputFieldContainer,
                swiftError ? styles.inputFieldError : null,
              ]}
              inputStyle={styles.inputField}
              value={swiftCode}
              onChangeText={handleSwiftChange}
              placeholder="e.g., EBILAEAD"
              placeholderTextColor={colors.gray_2}
              autoCapitalize="characters"
            />
            {swiftError ? (
              <Text style={styles.errorText}>{swiftError}</Text>
            ) : (
              <Text style={styles.hintText}>
                Required for international transfer
              </Text>
            )}

            <InfoBanner
              containerbgColor={colors.lightBlue_7}
              containerborderColor={colors.lightBlue_6}
              containerMarginBottom={correctSize(13)}
              headingFamily={Fonts.Inter_SemiBold}
              descriptionFamily={Fonts.Inter_Regular}
              iconPadding={10}
              showIcon={true}
              svgIcon={<InfoIcon width={7} height={15} />}
              iconBg={colors.blue_1}
              heading={'How Payments Work'}
              headingColor={colors.blue_2}
              description={
                "Brands pay upfront into secure escrow. Once you complete the job and it's confirmed, funds are released to your account within 2-3 business days."
              }
              descriptionColor={colors.blue_3}
            />
            <InfoBanner
              containerbgColor={colors.lightYellow}
              containerborderColor={colors.yellow}
              containerMarginBottom={correctSize(13)}
              headingFamily={Fonts.Inter_SemiBold}
              descriptionFamily={Fonts.Inter_Regular}
              iconPadding={10}
              icon={'shield-halved'}
              iconBg={colors.orange}
              heading={'Your Money is Protected'}
              headingColor={colors.darkBrown}
              description={
                'We never share your bank details with brands. All transactions are processed through our licensed payment partner with full PCI-DSS compliance.'
              }
              descriptionColor={colors.darkBrown_1}
            />
            <InfoBanner
              containerbgColor={colors.lightBlue_5}
              containerborderColor={colors.gray_5}
              containerMarginBottom={correctSize(13)}
              headingFamily={Fonts.Inter_SemiBold}
              descriptionFamily={Fonts.Inter_Regular}
              iconPadding={10}
              icon={'shield-halved'}
              heading={'Verification Required'}
              headingColor={colors.darkgray_1}
              description={
                "We'll verify your bank details with a small test deposit (AED 1) that will be refunded immediately. This ensures your account is active and ready."
              }
              descriptionColor={colors.gray_1}
            />

            {/* Confirmation checkbox */}
            <View style={styles.termContainer}>
              <TouchableOpacity
                style={styles.leftContainer}
                onPress={() => setIsConfirmed(prev => !prev)}
              >
                <Icons
                  family={'MaterialIcons'}
                  name={isConfirmed ? 'check-box' : 'check-box-outline-blank'}
                  color={isConfirmed ? colors.darkGreen_2 : colors.black}
                  size={20}
                />
              </TouchableOpacity>
              <View style={styles.rightContainer}>
                <Text style={styles.confirmationText}>
                  I confirm that the bank account details provided are accurate
                  and belong to me. I understand that incorrect information may
                  delay payments.
                </Text>
              </View>
            </View>
          </View>

          <View style={btmContainer.bottomContainer}>
            <CustomButton
              title="Continue to Verification"
              onPress={addUserPaymentDetails}
              loading={isLoading || updateLoading}
              disabled={isLoading || updateLoading || !isConfirmed}
              style={styles.button}
              textStyle={styles.buttonText}
            />
            <Text style={styles.footerText}>
              You can update these details anytime in Settings
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: correctSize(24),
  },
  logoHeaderContainer: {
    marginTop: correctSize(20),
  },
  titleText: {
    fontSize: 30,
    color: colors.black,
    marginTop: correctSize(48),
    marginBottom: correctSize(4),
    fontFamily: Fonts.InriaSerif_Bold,
    lineHeight: 40,
    textTransform: 'capitalize',
  },
  subtitleText: {
    fontSize: 16,
    color: colors.gray_1,
    fontFamily: Fonts.Inter_Regular,
    marginBottom: correctSize(40),
  },
  hintText: {
    fontSize: 12,
    color: colors.gray_4,
    fontFamily: Fonts.Inter_Regular,
    marginBottom: correctSize(24),
  },
  errorText: {
    fontSize: 12,
    color: colors.red,
    fontFamily: Fonts.Inter_Medium,
    marginBottom: correctSize(24),
  },
  labelText: {
    fontSize: 14,
    color: colors.darkgray_1,
    fontFamily: Fonts.InriaSerif_Bold,
    marginBottom: correctSize(11),
  },
  dropdown: {
    height: 56,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 12,
    paddingRight: correctSize(20),
    paddingLeft: correctSize(12),
    paddingVertical: correctSize(12),
    backgroundColor: colors.white,
    marginBottom: correctSize(24),
  },
  termContainer: {
    flexDirection: 'row',
    marginBottom: correctSize(10),
  },
  rightContainer: {
    width: '95%',
  },
  leftContainer: {
    width: '6%',
  },
  confirmationText: {
    fontSize: 12,
    color: colors.gray_1,
    fontFamily: Fonts.Inter_Regular,
    marginLeft: correctSize(10),
  },
  footerText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    alignSelf: 'center',
    marginTop: correctSize(12),
  },
  inputContainer: {
    marginBottom: correctSize(8),
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: Fonts.InriaSerif_Bold,
    marginBottom: correctSize(7),
    color: colors.black,
  },
  inputFieldContainer: {
    height: 56,
    borderColor: colors.gray,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 2,
    paddingHorizontal: 16,
  },
  inputFieldError: {
    borderColor: colors.red,
  },
  inputField: {
    fontSize: 16,
    color: colors.black,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.Inter_SemiBold,
    textTransform: 'none',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
});
