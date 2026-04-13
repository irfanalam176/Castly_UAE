import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { stackRoutes } from '../../navigation/screenIds';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import LogoHeader from '../../components/common/LogoHeader';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import CustomInput from '../../components/common/CustomInput';
import InfoBanner from '../../components/common/InfoBanner';
import CustomButton from '../../components/common/CustomButton';
import { btmContainer } from '../../utils/layout';
import Icons from '../../components/vectorIcons/Icons';
import { Dropdown } from 'react-native-element-dropdown';
import { countries, PANTS_SIZES } from '../../utils/array';
import DatePicker from 'react-native-date-picker';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/userSlice';
import { inputIcons } from '../../utils/iconConfig';
import { GlobalStyles } from '../../utils/globalStyles';
import { useAddUserDataMutation } from '../../services/profileAPI';
import { useProfile } from '../../hooks/useProfile';
import Toast from 'react-native-toast-message';
import { correctSize } from '../../utils';
import InfoIcon from '../../assets/svg/portfolio/InfoIcon';
import { TextInput } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NavProp } from '../../navigation/navigationTypes';

export default function Profile() {
  const navigation = useNavigation<NavProp>()
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [nationality, setNationality] = useState('');
  const [biography, setBiography] = useState('');
  const [ageError, setAgeError] = useState(false);
  const [biographyError, setBiographyError] = useState(false);

  const dispatch = useDispatch();
  const [addUserData, { isLoading, isError: addError, data }] =
    useAddUserDataMutation();
  const { profile, isError } = useProfile();

  useEffect(() => {
    if (profile) {
      setFullName(profile.name || '');
      setGender(profile.gender || '');
      setDateOfBirth(profile.dob ? new Date(profile.dob) : null);
      setNationality(profile.nationality || '');
      setBiography(profile.description || '');
    }
  }, [profile]);

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load profile',
      });
    }
  }, [isError]);

  // Function to check if user is 18 or older
  const isUserAdult = (dob: Date | null): boolean => {
    if (!dob) return false;

    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 18;
  };

  const BIO_REGEX = /^(?=(?:.*\S)){1,1000}(?:\s*\S+){5,}.*$/;

  const validateBiography = (text: string) => {
    if (!text.trim()) return false; // only spaces
    if (text?.length > 1000) return false;
    return BIO_REGEX.test(text.trim());
  };

  const handleBiographyChange = (text: string) => {
    setBiography(text);
    setBiographyError(!validateBiography(text));
  };

  const handleUserData = async () => {
    const dob = dateOfBirth?.toISOString().split('T')[0];
    try {
      const payload = {
        name: fullName,
        gender: gender,
        dob: dob,
        nationality: nationality,
        description: biography,
      };
      await addUserData(payload).unwrap();

      if (addError) {
        Toast.show({
          type: 'error',
          text1: 'Failed to add profile',
        });
      }

      navigation.navigate(stackRoutes.UploadPhoto);
      // dispatch(setProfile(false));
      // }
    } catch (err: any) {
      console.log('API Error:', err);
      Toast.show({
        type: 'error',
        text1: 'Profile Creation Failed',
        text2: err?.data?.message || err?.error || err.message,
      });
    }
  };

  const handleGenderSelection = (selectedItem: any) => {
    setGender(selectedItem);
  };

  const handleDateConfirm = (date: Date) => {
    setShowDatePicker(false);
    setDateOfBirth(date);

    // Check if user is under 18
    if (!isUserAdult(date)) {
      setAgeError(true);
    } else {
      setAgeError(false);
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ flexGrow: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
      >
        <ScrollView
          style={styles.logoHeaderContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.body}>
            <LogoHeader
              onGoback={async () => {
                dispatch(logout());
                await GoogleSignin.signOut();
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Auth' }],
                  }),
                );
              }}
            />
            <Text style={styles.mainHeading}>Tell Us About You</Text>
            <Text style={styles.subHeading}>
              Help brands find the perfect match. Your basic information helps
              us recommend the right opportunities.
            </Text>

            {/* Full Name Input */}
            <CustomInput
              label="Full Name *"
              leftIcon={inputIcons.user}
              containerStyle={styles.inputContainer}
              labelStyle={styles.inputLabel}
              inputContainerStyle={styles.inputFieldContainer}
              inputStyle={styles.inputField}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor={colors.gray_2}
            />

            <Text style={styles.helperText}>
              As it appears on your Emirates ID
            </Text>

            <Text style={styles.labelText}>
              Gender <Text style={GlobalStyles.asteric}>*</Text>
            </Text>

            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.IconContainer,
                  styles.genderOption,
                  gender === 'male' && styles.selectedGender,
                ]}
                onPress={() => handleGenderSelection('male')}
              >
                <Icons
                  style={styles.genderIcon}
                  family={'MaterialIcons'}
                  name={'male'}
                  color={colors.blue_1}
                  size={20}
                />
                <Text style={styles.genderText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.IconContainer,
                  styles.genderOption,
                  gender === 'female' && styles.selectedGender,
                ]}
                onPress={() => handleGenderSelection('female')}
              >
                <Icons
                  style={styles.genderIcon}
                  family={'MaterialIcons'}
                  name={'female'}
                  color={colors.pink}
                  size={20}
                />
                <Text style={styles.genderText}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.IconContainer,
                  gender === 'other' && styles.selectedGender,
                ]}
                onPress={() => handleGenderSelection('other')}
              >
                <Icons
                  style={styles.genderIcon}
                  family={'FontAwesome'}
                  name={'circle-o'}
                  color={colors.purple_1}
                  size={12}
                />
                <Text style={styles.genderText}>Other</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.labelTextWithMargin}>
              Date of Birth <Text style={GlobalStyles.asteric}>*</Text>
            </Text>

            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={[
                styles.IconContainer,
                styles.datePickerContainer,
                ageError && styles.datePickerError,
              ]}
            >
              <View style={styles.dateContainer}>
                <Icons
                  family={'FontAwesome'}
                  name={'calendar-o'}
                  color={colors.gray_2}
                  size={18}
                  style={styles.dateIcon}
                />
                <Text
                  style={[
                    styles.dateText,
                    !dateOfBirth && styles.datePlaceholder,
                  ]}
                >
                  {dateOfBirth
                    ? dateOfBirth.toLocaleDateString()
                    : 'mm/dd/yyyy'}
                </Text>
              </View>
              <Icons
                family={'FontAwesome'}
                name={'calendar-o'}
                color={colors.black}
                size={18}
                style={styles.dateIcon}
              />
            </TouchableOpacity>

            {showDatePicker && (
              <DatePicker
                modal
                mode="date"
                open={showDatePicker}
                date={dateOfBirth || new Date()}
                maximumDate={new Date()}
                onConfirm={handleDateConfirm}
                onCancel={() => setShowDatePicker(false)}
              />
            )}

            {ageError ? (
              <Text style={styles.errorText}>
                You must be 18 years or older to join
              </Text>
            ) : (
              <Text style={styles.ageRequirementText}>
                You must be 18 years or older to join
              </Text>
            )}

            <Text style={styles.labelTextWithMargin}>
              Biography <Text style={GlobalStyles.asteric}>*</Text>
            </Text>

            <TextInput
              style={styles.textArea}
              multiline
              placeholder="Add your biography"
              placeholderTextColor={colors.gray_2}
              value={biography}
              maxLength={1000}
              onChangeText={handleBiographyChange}
            />

            {biographyError && (
              <Text style={styles.errorText}>
                Biography must contain at least 5 words (max 1000 chars).
              </Text>
            )}

            <Text style={styles.ageRequirementText}>
              {biography?.length}/1000 characters
            </Text>
            <Text style={styles.labelTextWithMargin}>
              Nationality <Text style={GlobalStyles.asteric}>*</Text>
            </Text>

            <Dropdown
              containerStyle={styles.dropdownContainer}
              itemTextStyle={styles.dropdownItemText}
              selectedTextStyle={styles.dropdownSelectedText}
              style={styles.dropdown}
              data={countries}
              labelField="label"
              valueField="value"
              placeholder="Select your nationality"
              placeholderStyle={styles.dropdownPlaceholder}
              value={nationality}
              onChange={item => setNationality(item?.value)}
              iconColor={colors.black}
              activeColor={colors.gray}
              dropdownPosition="top"
              maxHeight={220}
            />

            <InfoBanner
              containerbgColor={colors.lightBlue_2}
              containerborderColor={colors.lightBlue_3}
              containerMarginBottom={correctSize(13)}
              headingFamily={Fonts.Inter_Medium}
              descriptionFamily={Fonts.Inter_Regular}
              showIcon={true}
              svgIcon={<InfoIcon />}
              iconPadding={10}
              heading={'Why do we need this?'}
              description={
                'Brands filter talent by age, gender, and nationality for role requirements. Accurate info increases your chances of being discovered.'
              }
            />
          </View>

          <View style={btmContainer.bottomContainer}>
            <CustomButton
              title="Continue"
              onPress={handleUserData}
              loading={isLoading}
              disabled={
                !fullName ||
                !gender ||
                !dateOfBirth ||
                !nationality ||
                ageError ||
                biographyError ||
                !biography
              }
              style={[styles.primaryButton]}
              textStyle={[styles.primaryButtonText]}
            />

            <Text style={styles.requiredFieldsText}>
              All fields marked with <Text style={GlobalStyles.asteric}>*</Text>{' '}
              are required
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
  mainHeading: {
    fontSize: 30,
    color: colors.black,
    marginTop: correctSize(48),
    marginBottom: correctSize(4),
    fontFamily: Fonts.InriaSerif_Bold,
    lineHeight: 40,
    textTransform: 'capitalize',
  },
  subHeading: {
    fontSize: 16,
    color: colors.gray_1,
    fontFamily: Fonts.Inter_Regular,
    marginBottom: correctSize(40),
  },
  // Input Styles
  inputContainer: {
    marginBottom: correctSize(8),
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    marginBottom: correctSize(4),
    color: colors.black,
  },
  inputFieldContainer: {
    height: 56,
    borderColor: colors.gray,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 2,
    paddingHorizontal: correctSize(16),
  },
  inputField: {
    fontSize: 16,
    color: colors.black,
  },

  // Other Styles
  helperText: {
    fontSize: 12,
    color: colors.gray_4,
    fontFamily: Fonts.Inter_Regular,
    marginBottom: correctSize(25),
    lineHeight: 16,
  },
  labelText: {
    fontSize: 14,
    color: colors.darkgray_1,
    fontFamily: Fonts.InriaSerif_Bold,
    marginBottom: correctSize(11),
  },
  labelTextWithMargin: {
    fontSize: 14,
    color: colors.darkgray_1,
    fontFamily: Fonts.InriaSerif_Bold,
    marginTop: correctSize(25),
    marginBottom: correctSize(7),
  },
  genderContainer: {
    flexDirection: 'row',
  },
  IconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: correctSize(20),
    paddingVertical: correctSize(16),
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 12,
  },
  genderOption: {
    marginEnd: correctSize(12),
  },
  selectedGender: {
    backgroundColor: colors.primary,
  },
  genderIcon: {
    marginRight: correctSize(5),
  },
  genderText: {
    fontSize: 16,
    color: colors.darkgray,
    fontFamily: Fonts.Inter_Medium,
  },
  datePickerContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: correctSize(16),
    backgroundColor: colors.white,
  },
  datePickerError: {
    borderColor: colors.red || '#FF0000',
  },
  dateContainer: {
    flexDirection: 'row',
  },
  dateIcon: {
    marginRight: correctSize(5),
  },
  dateText: {
    fontSize: 14,
    color: colors.darkgray_1,
    marginLeft: correctSize(20),
  },
  datePlaceholder: {
    color: colors.gray_2,
  },
  ageRequirementText: {
    fontSize: 12,
    color: colors.gray_4,
    fontFamily: Fonts.Inter_Regular,
    marginTop: correctSize(8),
  },
  errorText: {
    fontSize: 12,
    color: colors.red || '#FF0000',
    fontFamily: Fonts.Inter_Medium,
    marginTop: correctSize(8),
  },
  dropdown: {
    height: correctSize(56),
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 12,
    paddingRight: correctSize(20),
    paddingLeft: correctSize(12),
    paddingVertical: correctSize(12),
    backgroundColor: colors.white,
    marginBottom: correctSize(16),
  },
  dropdownContainer: {
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 6,
    overflow: 'hidden',
  },
  dropdownItemText: {
    color: colors.darkgray_1,
  },
  dropdownSelectedText: {
    color: colors.darkgray_1,
  },
  dropdownPlaceholder: {
    color: colors.darkgray_1,
  },
  bottomContainer: {
    backgroundColor: colors.lightBlue_1,
  },
  requiredFieldsText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    alignSelf: 'center',
    marginTop: correctSize(12),
  },

  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: correctSize(14),
    marginBottom: correctSize(16),
  },
  primaryButtonText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    color: colors.black,
    textTransform: 'none',
    textAlign: 'center',
  },
  textArea: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: colors.gray,
    padding: correctSize(12),
    fontSize: 16,
    fontFamily: Fonts.Inter_Regular,
    textAlignVertical: 'top',
    color: colors.black,
    height: correctSize(181),
  },
});
