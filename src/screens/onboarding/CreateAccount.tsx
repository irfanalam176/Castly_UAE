import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import CustomInput from '../../components/common/CustomInput';
import { correctSize } from '../../utils';
import { SlideLeftFade } from '../../components/Animation';
import { useDispatch, useSelector } from 'react-redux';
import { setField } from '../../redux/reducers/onboardingSlice';
import { RootState } from '../../redux/stores/store';

const COUNTRY_CODES = [
  { code: '+971', flag: '🇦🇪', country: 'UAE' },
  { code: '+1', flag: '🇺🇸', country: 'US' },
  { code: '+44', flag: '🇬🇧', country: 'UK' },
  { code: '+966', flag: '🇸🇦', country: 'SA' },
  { code: '+91', flag: '🇮🇳', country: 'IN' },
  { code: '+92', flag: '🇵🇰', country: 'PK' },
  { code: '+20', flag: '🇪🇬', country: 'EG' },
  { code: '+33', flag: '🇫🇷', country: 'FR' },
  { code: '+49', flag: '🇩🇪', country: 'DE' },
  { code: '+81', flag: '🇯🇵', country: 'JP' },
];

const STAGGER = 150;

const CreateAccount = () => {
  const dispatch = useDispatch();
  const { fullName, email, phoneNumber, phoneNumberPrefix, password } = useSelector(
    (state: RootState) => state.onboarding,
  );

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const selectedCountry =
    COUNTRY_CODES.find(c => c.code === phoneNumberPrefix) ?? COUNTRY_CODES[0];

  const rules = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  return (
    <View>
      <SlideLeftFade delay={STAGGER * 1}>
        <Text style={styles.title}>Let's start with you</Text>
        <Text style={styles.subHeading}>Create your Castly talent profile.</Text>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 2}>
        <CustomInput
          label="Full Name *"
          placeholder="Sarah Al-Mansouri"
          placeholderTextColor={colors.gray_3}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          labelStyle={styles.inputLabel}
          value={fullName}
          onChangeText={v => dispatch(setField({ fullName: v }))}
        />
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 3}>
        <CustomInput
          label="Email Address *"
          placeholder="sarah@example.com"
          placeholderTextColor={colors.gray_3}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          labelStyle={styles.inputLabel}
          value={email}
          onChangeText={v => dispatch(setField({ email: v }))}
        />
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 4}>
        <Text style={[styles.inputLabel,{marginBottom:correctSize(5)}]}>Phone Number *</Text>
        <View style={styles.phoneWrapper}>
          <TouchableOpacity
            style={styles.countrySelector}
            onPress={() => setShowCountryModal(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.flagText}>{selectedCountry.flag}</Text>
            <Text style={styles.codeText}>{selectedCountry.code}</Text>
            <Text style={styles.chevron}>▾</Text>
          </TouchableOpacity>

          <View style={styles.phoneInputWrapper}>
            <CustomInput
              placeholder="50 123 4567"
              placeholderTextColor={colors.gray_3}
              inputContainerStyle={styles.phoneInputContainer}
              inputStyle={styles.inputStyle}
              value={phoneNumber}
              onChangeText={v => dispatch(setField({ phoneNumber: v }))}
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 5}>
        <CustomInput
          label="Password *"
          placeholder="Enter password"
          placeholderTextColor={colors.gray_3}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          labelStyle={styles.inputLabel}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={v => dispatch(setField({ password: v }))}
        />
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 6}>
        <View style={styles.validationRow}>
          <View style={styles.indicator}>
            <View style={[styles.bar, rules.minLength && styles.barMet]} />
            <Text style={[styles.validationText, rules.minLength && styles.validationTextMet]}>
              8+ chars
            </Text>
          </View>
          <View style={styles.indicator}>
            <View style={[styles.bar, rules.hasUppercase && styles.barMet]} />
            <Text style={[styles.validationText, rules.hasUppercase && styles.validationTextMet]}>
              Uppercase
            </Text>
          </View>
          <View style={styles.indicator}>
            <View style={[styles.bar, rules.hasNumber && styles.barMet]} />
            <Text style={[styles.validationText, rules.hasNumber && styles.validationTextMet]}>
              Number
            </Text>
          </View>
        </View>
      </SlideLeftFade>

      <Modal visible={showCountryModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCountryModal(false)}
        >
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Select Country Code</Text>
            <FlatList
              data={COUNTRY_CODES}
              keyExtractor={item => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.countryItem,
                    item.code === phoneNumberPrefix && styles.countryItemActive,
                  ]}
                  onPress={() => {
                    dispatch(setField({ phoneNumberPrefix: item.code }));
                    setShowCountryModal(false);
                  }}
                >
                  <Text style={styles.flagText}>{item.flag}</Text>
                  <Text style={styles.countryName}>{item.country}</Text>
                  <Text style={styles.countryCode}>{item.code}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 20,
    color: colors.darkgray_1,
  },
  subHeading: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginBottom: correctSize(16),
  },
  inputStyle: { fontSize: 13, fontFamily: Fonts.Inter_Regular },
  inputContainer: {
    height: correctSize(45),
    backgroundColor: colors.lightBlue_5,
    marginBottom: correctSize(16),
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray,
  },
  phoneWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginBottom: correctSize(16),
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(4),
    paddingHorizontal: correctSize(10),
    height: correctSize(45),
    backgroundColor: colors.lightBlue_5,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 14,
    width: correctSize(90),
  },
  phoneInputWrapper: { flex: 1, minWidth: 0 },
  phoneInputContainer: {
    height: correctSize(45),
    backgroundColor: colors.lightBlue_5,
    marginBottom: 0,
  },
  flagText: { fontSize: 16 },
  codeText: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray_1,
  },
  chevron: { fontSize: 10, color: colors.gray_3 },
  validationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: correctSize(8),
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(4),
  },
  bar: {
    height: correctSize(16),
    width: correctSize(4),
    backgroundColor: colors.gray,
    borderRadius: 20,
  },
  barMet: { backgroundColor: '#22C55E' },
  validationText: {
    fontSize: 9,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  validationTextMet: { color: '#22C55E' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: correctSize(20),
    borderTopRightRadius: correctSize(20),
    padding: correctSize(20),
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 15,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
    marginBottom: correctSize(12),
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: correctSize(10),
    paddingHorizontal: correctSize(8),
    borderRadius: correctSize(8),
    gap: correctSize(10),
  },
  countryItemActive: { backgroundColor: colors.lightBlue_5 },
  countryName: {
    flex: 1,
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray_1,
  },
  countryCode: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
});