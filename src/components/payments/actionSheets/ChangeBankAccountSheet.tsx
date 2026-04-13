import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { Dropdown } from 'react-native-element-dropdown';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';
import CrossIcon from '../../vectorIcons/CrossIcon';
import CustomButton from '../../common/CustomButton';
import BankIcon from '../../../assets/svg/common/BankIcon';
import CreditCardIcon from '../../../assets/svg/payments/CreditCardIcon';
import CustomInput from '../../common/CustomInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

const BANK_OPTIONS = [
  { label: 'Emirates NBD', value: 'emirates_nbd' },
  { label: 'ADCB', value: 'adcb' },
  { label: 'FAB', value: 'fab' },
  { label: 'Dubai Islamic Bank', value: 'dib' },
  { label: 'Mashreq Bank', value: 'mashreq' },
];

const ACCOUNT_TYPE_OPTIONS = [
  { label: 'Savings', value: 'savings' },
  { label: 'Current', value: 'current' },
];

type Props = {
  sheetRef: React.RefObject<ActionSheetRef | null>;
  onSave?: (data: {
    bankName: string;
    accountType: string;
    accountHolderName: string;
    iban: string;
  }) => void;
};

const ChangeBankAccountSheet = ({ sheetRef, onSave }: Props) => {
  const insets = useSafeAreaInsets();
  const bottomInset =
    Platform.OS === 'android' ? correctSize(60) : insets.bottom;

  const [bankName, setBankName] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [holderName, setHolderName] = useState('');
  const [iban, setIban] = useState('');

  const isValid =
    bankName && accountType && holderName.trim() && iban.trim().length >= 23;

  const handleSave = () => {
    if (!isValid) return;
    onSave?.({
      bankName: BANK_OPTIONS.find(b => b.value === bankName)?.label ?? bankName,
      accountType:
        ACCOUNT_TYPE_OPTIONS.find(a => a.value === accountType)?.label ??
        accountType,
      accountHolderName: holderName,
      iban,
    });
    sheetRef.current?.hide();
  };

  const renderDropdownItem = (item: { label: string; value: string }) => (
    <View style={styles.dropdownItem}>
      <Text style={styles.dropdownItemText}>{item.label}</Text>
    </View>
  );

  return (
    <ActionSheet
      ref={sheetRef}
      gestureEnabled={false}
      keyboardHandlerEnabled={false}
      containerStyle={[
        styles.sheet,
        { height: correctSize(600) + bottomInset },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Change Bank Account</Text>
          <Text style={styles.subtitle}>UAE IBAN required for payouts</Text>
        </View>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => sheetRef.current?.hide()}
        >
          <CrossIcon fillColor={colors.darkgray_1} width={12} height={12} />
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={20}
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(bottomInset, correctSize(20)) },
        ]}
      >
        {/* Bank Name */}
        <Text style={styles.label}>Bank Name</Text>
        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
          selectedTextStyle={styles.dropdownSelectedText}
          placeholderStyle={styles.dropdownPlaceholder}
          itemTextStyle={styles.dropdownItemText}
          data={BANK_OPTIONS}
          labelField="label"
          valueField="value"
          placeholder="Select bank"
          value={bankName}
          onChange={item => setBankName(item.value)}
          renderLeftIcon={() => (
            <View style={styles.dropdownIcon}>
              <BankIcon width={16} height={16} color={colors.darkgray_1} />
            </View>
          )}
          renderItem={renderDropdownItem}
        />

        {/* Account Type */}
        <Text style={styles.label}>Account Type</Text>
        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
          selectedTextStyle={styles.dropdownSelectedText}
          placeholderStyle={styles.dropdownPlaceholder}
          itemTextStyle={styles.dropdownItemText}
          data={ACCOUNT_TYPE_OPTIONS}
          labelField="label"
          valueField="value"
          placeholder="Select account type"
          value={accountType}
          onChange={item => setAccountType(item.value)}
          renderItem={renderDropdownItem}
        />

        {/* Account Holder Name */}
        <Text style={styles.label}>Account Holder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Sarah Al Mansoori"
          placeholderTextColor={colors.gray_3}
          value={holderName}
          onChangeText={setHolderName}
          autoCapitalize="words"
        />

        {/* IBAN */}
        <Text style={styles.label}>IBAN</Text>
        <CustomInput
          leftSvgIcon={
            <CreditCardIcon width={16} height={16} color={colors.darkgray_1} />
          }
          inputContainerStyle={styles.input}
          placeholder="AE  xx  xxxx  xxxx  xxxx  x821"
          placeholderTextColor={colors.gray_3}
          value={iban}
          onChangeText={setIban}
          autoCapitalize="characters"
          maxLength={29}
        />
        <Text style={styles.ibanHint}>
          23-character UAE IBAN starting with AE
        </Text>

        {/* Security Note */}
        <View style={styles.securityNote}>
          <Text style={styles.securityIcon}>🔒</Text>
          <Text style={styles.securityText}>
            Your bank details are encrypted and only used for MamoPay payouts.
            Castly never stores your full IBAN in plaintext.
          </Text>
        </View>

        {/* Save Button */}
        <CustomButton
          title="Save Changes"
          style={[styles.saveBtn, !isValid && styles.saveBtnDisabled]}
          textStyle={[
            styles.saveBtnText,
            !isValid && styles.saveBtnTextDisabled,
          ]}
          disabled={!isValid}
          onPress={handleSave}
        />
      </KeyboardAwareScrollView>
    </ActionSheet>
  );
};

export default ChangeBankAccountSheet;

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: correctSize(24),
    borderTopRightRadius: correctSize(24),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: correctSize(20),
    paddingVertical: correctSize(18),
    borderBottomWidth: 1,
    borderBottomColor: colors.white_1,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    lineHeight: correctSize(24),
  },
  subtitle: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginTop: correctSize(2),
  },
  closeBtn: {
    width: correctSize(36),
    height: correctSize(36),
    borderRadius: 99,
    backgroundColor: colors.white_1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: correctSize(20),
    gap: correctSize(4),
  },

  // Label
  label: {
    fontSize: 13,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
    marginBottom: correctSize(8),
    marginTop: correctSize(12),
  },

  // Dropdown
  dropdown: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: correctSize(12),
    paddingHorizontal: correctSize(14),
    paddingVertical: correctSize(14),
    backgroundColor: colors.lightBlue_5,
  },
  dropdownContainer: {
    borderRadius: correctSize(12),
    borderWidth: 1,
    borderColor: colors.white_1,
    marginTop: -correctSize(20),
    overflow: 'hidden',
  },
  dropdownSelectedText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray_1,
  },
  dropdownPlaceholder: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  dropdownItem: {
    paddingHorizontal: correctSize(14),
    paddingVertical: correctSize(14),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.white_1,
  },
  dropdownItemText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray_1,
  },
  dropdownIcon: {
    marginRight: correctSize(10),
  },

  // Input

  inputIconLeft: {
    paddingLeft: correctSize(14),
  },
  input: {
    borderRadius: correctSize(14),
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray_1,
    paddingHorizontal: correctSize(14),
    paddingVertical: correctSize(14),
    backgroundColor: colors.lightBlue_5,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  inputWithIcon: {
    paddingLeft: correctSize(8),
  },
  ibanHint: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginTop: correctSize(6),
  },

  // Security note
  securityNote: {
    flexDirection: 'row',
    gap: correctSize(8),
    backgroundColor: colors.green_1,
    borderRadius: correctSize(12),
    padding: correctSize(12),
    marginTop: correctSize(16),
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: colors.green_4,
  },
  securityIcon: { fontSize: 14 },
  securityText: {
    flex: 1,
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.green_5,
    lineHeight: correctSize(18),
  },

  // Button
  saveBtn: {
    backgroundColor: colors.darkgray_1,
    borderRadius: correctSize(14),
    marginTop: correctSize(20),
  },
  saveBtnDisabled: { opacity: 0.4 },
  saveBtnText: {
    color: colors.primary,
    fontSize: 15,
    fontFamily: Fonts.Inter_Bold,
  },
  saveBtnTextDisabled: {
    color: colors.white,
  },
});
