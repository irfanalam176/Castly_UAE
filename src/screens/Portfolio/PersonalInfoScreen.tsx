import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { stackRoutes } from '../../navigation/screenIds';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import InfoBanner from '../../components/common/InfoBanner';
import CustomButton from '../../components/common/CustomButton';
import { btmContainer } from '../../utils/layout';
import { Dropdown } from 'react-native-element-dropdown';
import { PANTS_SIZES, SHIRT_SIZES } from '../../utils/array';
// import { fetchUserProfile } from '../../redux/reducers/userSlice';
import { inputIcons } from '../../utils/iconConfig';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import LogoHeader from '../../components/common/LogoHeader';
import CustomInput from '../../components/common/CustomInput';
import Icons from '../../components/vectorIcons/Icons';
import FrameIcon from '../../assets/svg/Profile/FrameIcon';
import { useUpdateMeasurementsMutation } from '../../services/profileAPI';
import { useProfile } from '../../hooks/useProfile';
import Toast from 'react-native-toast-message';
import { correctSize } from '../../utils';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavProp } from '../../navigation/navigationTypes';

export default function PersonalInfoScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<any>();
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [shoeSize, setShoeSize] = useState<number>(0);
  const [shirtSize, setShirtSize] = useState('');
  const [pantsSize, setPantsSize] = useState('');
  const [dressSize, setDressSize] = useState<number>(0);

  // Error states
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');
  const [shoeSizeError, setShoeSizeError] = useState('');
  const [dressSizeError, setDressSizeError] = useState('');

  const [updateMeasurements, { isLoading }] = useUpdateMeasurementsMutation();
  const { profile, fetchProfile, isError } = useProfile();

  const isEdit = route?.params?.status === 'EDIT';

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load profile',
      });
    }
  }, [isError]);

  useEffect(() => {
    const m = profile?.measurements;
    if (m) {
      setHeight(m.height);
      setWeight(m.weight);
      setShoeSize(m.shoeSize);
      const shirtOption = SHIRT_SIZES.find(
        item =>
          item.label.toUpperCase() === (m.shirtTopSize || '').toUpperCase(),
      );
      setShirtSize(shirtOption ? shirtOption.label : '');

      const pantsOption = PANTS_SIZES.find(
        item =>
          item.label.toString().toUpperCase() ===
          (m.pantsSize?.toString() || '').toUpperCase(),
      );
      setPantsSize(pantsOption ? pantsOption.label : '');

      setDressSize(m.dressSize);
    }
  }, [profile]);

  // Validation functions
  const validateHeight = (value: number): boolean => {
    const heightNum = Number(value);
    if (!value || value === 0) {
      setHeightError('');
      return true;
    }
    if (isNaN(heightNum)) {
      setHeightError('Please enter a valid number');
      return false;
    }
    if (heightNum < 50 || heightNum > 250) {
      setHeightError('Height must be between 50-250 cm');
      return false;
    }
    setHeightError('');
    return true;
  };

  const validateWeight = (value: number): boolean => {
    const weightNum = Number(value);
    if (!value || value === 0) {
      setWeightError('');
      return true;
    }
    if (isNaN(weightNum)) {
      setWeightError('Please enter a valid number');
      return false;
    }
    if (weightNum < 20 || weightNum > 300) {
      setWeightError('Weight must be between 20-300 kg');
      return false;
    }
    setWeightError('');
    return true;
  };

  const validateShoeSize = (value: number): boolean => {
    const shoeSizeNum = Number(value);
    if (!value || value === 0) {
      setShoeSizeError('');
      return true;
    }
    if (isNaN(shoeSizeNum)) {
      setShoeSizeError('Please enter a valid number');
      return false;
    }
    if (shoeSizeNum < 15 || shoeSizeNum > 60) {
      setShoeSizeError('Shoe size must be between 15-60 EU');
      return false;
    }
    setShoeSizeError('');
    return true;
  };

  const validateDressSize = (value: number): boolean => {
    const dressSizeNum = Number(value);
    if (!value || value === 0) {
      setDressSizeError('');
      return true;
    }
    if (isNaN(dressSizeNum)) {
      setDressSizeError('Please enter a valid number');
      return false;
    }
    if (dressSizeNum < 30 || dressSizeNum > 60) {
      setDressSizeError('Dress size must be between 30-60');
      return false;
    }
    setDressSizeError('');
    return true;
  };

  // Handle input changes with validation
  const handleHeightChange = (value: any) => {
    setHeight(value);
    validateHeight(value);
  };

  const handleWeightChange = (value: any) => {
    setWeight(value);
    validateWeight(value);
  };

  const handleShoeSizeChange = (value: any) => {
    setShoeSize(value);
    validateShoeSize(value);
  };

  const handleDressSizeChange = (value: any) => {
    setDressSize(value);
    validateDressSize(value);
  };

  // Check if form is valid
  const isFormValid = (): any => {
    return (
      height &&
      weight &&
      shoeSize &&
      shirtSize &&
      pantsSize &&
      dressSize &&
      !heightError &&
      !weightError &&
      !shoeSizeError &&
      !dressSizeError
    );
  };

  const updateUserInfo = async () => {
    // Final validation before submission
    const isHeightValid = validateHeight(height);
    const isWeightValid = validateWeight(weight);
    const isShoeSizeValid = validateShoeSize(shoeSize);
    const isDressSizeValid = validateDressSize(dressSize);

    if (
      !isHeightValid ||
      !isWeightValid ||
      !isShoeSizeValid ||
      !isDressSizeValid
    ) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Measurements',
        text2: 'Please check all fields for valid values',
      });
      return;
    }

    const payload = {
      height: Number(height),
      heightUnit: 'cm',
      weight: Number(weight),
      weightUnit: 'kg',
      shoeSize: Number(shoeSize),
      shoeSizeUnit: 'EU',
      shirtTopSize: shirtSize,
      shirtTopSizeUnit: 'US',
      pantsSize: Number(pantsSize),
      pantsSizeUnit: 'US',
      dressSize: Number(dressSize),
      dressSizeUnit: 'inch',
    };
    try {
      await updateMeasurements(payload).unwrap();
      fetchProfile();
      if (isEdit) {
        navigation.goBack();
      } else {
        navigation.navigate(stackRoutes.PortfolioScreen);
      }
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'API Failed',
        text2: err?.data?.message || err?.error || err.message,
      });
    }
  };

  const handleNavigation = () => {
    if (isEdit) {
      navigation.goBack();
    } else {
      navigation.navigate(stackRoutes.PortfolioScreen);
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.logoHeaderContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          {isEdit ? (
            <LogoHeader />
          ) : (
            <LogoHeader
              onGoback={() => navigation.navigate(stackRoutes.SkillsScreen)}
            />
          )}
          <Text style={styles.titleText}>Your Measurements</Text>
          <Text style={styles.subtitleText}>
            Help brands find the perfect fit. These details increase your
            chances of getting booked.
          </Text>
          <View style={styles.recommendedTextContainer}>
            <View style={styles.recommendedIconContainer}>
              <FrameIcon height={14} width={14} />
            </View>
            <Text style={styles.recommendedText}>Optional but recommended</Text>
          </View>

          {/* Height Input */}
          <View style={styles.inputContainer}>
            <CustomInput
              label="Height"
              leftIcon={inputIcons.rulerVertical}
              containerStyle={styles.inputWidth}
              labelStyle={styles.inputLabel}
              inputContainerStyle={[
                styles.inputFieldContainer,
                heightError && styles.inputFieldError,
              ]}
              inputStyle={styles.inputField}
              value={height ? height.toString() : ''}
              onChangeText={handleHeightChange}
              placeholder={'170'}
              placeholderTextColor={colors.gray_2}
              keyboardType={'numeric'}
            />
            <View style={styles.unitContainer}>
              <Text style={styles.unitText}>cm</Text>
            </View>
          </View>
          {heightError ? (
            <Text style={styles.errorText}>{heightError}</Text>
          ) : null}

          {/* Weight Input */}
          <View
            style={[
              styles.inputContainer,
              heightError && { marginTop: correctSize(8) },
            ]}
          >
            <CustomInput
              label="Weight"
              leftIcon={inputIcons.weightScale}
              containerStyle={styles.inputWidth}
              labelStyle={styles.inputLabel}
              inputContainerStyle={[
                styles.inputFieldContainer,
                weightError && styles.inputFieldError,
              ]}
              inputStyle={styles.inputField}
              value={weight ? weight.toString() : ''}
              onChangeText={handleWeightChange}
              placeholder={'65'}
              placeholderTextColor={colors.gray_2}
              keyboardType={'numeric'}
            />
            <View style={styles.unitContainer}>
              <Text style={styles.unitText}>kg</Text>
            </View>
          </View>
          {weightError ? (
            <Text style={styles.errorText}>{weightError}</Text>
          ) : null}

          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>

          {/* Shoe Size Input */}
          <View style={styles.shoeSizeContainer}>
            <View style={[styles.inputContainer]}>
              <CustomInput
                label="Shoe Size"
                leftIcon={inputIcons.shoePrints}
                containerStyle={styles.inputWidth}
                labelStyle={styles.inputLabel}
                inputContainerStyle={[
                  styles.inputFieldContainer,
                  shoeSizeError && styles.inputFieldError,
                ]}
                inputStyle={styles.inputField}
                value={shoeSize ? shoeSize.toString() : ''}
                onChangeText={handleShoeSizeChange}
                placeholder={'42'}
                placeholderTextColor={colors.gray_2}
                keyboardType={'numeric'}
              />
              <View style={styles.unitContainer}>
                <Text style={styles.unitText}>EU</Text>
              </View>
            </View>
            {shoeSizeError ? (
              <Text style={styles.errorText}>{shoeSizeError}</Text>
            ) : (
              <Text style={styles.hintText}>European sizing standard</Text>
            )}
          </View>

          <Text style={styles.labelText}>Shirt / Top Size</Text>

          <Dropdown
            containerStyle={styles.dropdownContainer}
            itemTextStyle={styles.dropdownItemText}
            selectedTextStyle={styles.dropdownSelectedText}
            style={styles.dropdown}
            data={SHIRT_SIZES}
            labelField="label"
            valueField="label"
            placeholder="Select Size"
            placeholderStyle={styles.dropdownPlaceholder}
            value={shirtSize}
            onChange={i => setShirtSize(i?.value)}
            iconColor={colors.black}
            activeColor={colors.gray}
          />

          <Text style={styles.labelTextWithMargin}>Pants / Bottom Size</Text>

          <Dropdown
            containerStyle={styles.dropdownContainer}
            itemTextStyle={styles.dropdownItemText}
            selectedTextStyle={styles.dropdownSelectedText}
            style={[styles.dropdown, { marginBottom: correctSize(20) }]}
            data={PANTS_SIZES}
            labelField="label"
            valueField="label"
            placeholder="Select Size"
            placeholderStyle={styles.dropdownPlaceholder}
            value={pantsSize}
            onChange={i => setPantsSize(i?.value)}
            iconColor={colors.black}
            activeColor={colors.gray}
          />

          {/* Dress Size Input */}
          <View style={styles.dressInputContainer}>
            <CustomInput
              label="Dress Size"
              leftIcon={inputIcons.personDress}
              containerStyle={styles.fullWidthContainer}
              labelStyle={styles.inputLabel}
              inputContainerStyle={[
                styles.inputFieldContainer,
                dressSizeError && styles.inputFieldError,
              ]}
              inputStyle={styles.inputField}
              value={dressSize ? dressSize.toString() : ''}
              onChangeText={handleDressSizeChange}
              placeholder={'38'}
              placeholderTextColor={colors.gray_2}
              keyboardType={'numeric'}
            />
          </View>

          {dressSizeError ? (
            <Text style={styles.errorText}>{dressSizeError}</Text>
          ) : (
            <Text style={styles.dressSizeHint}>
              European sizing (e.g., 36, 38, 40)
            </Text>
          )}

          <InfoBanner
            containerbgColor={colors.lightBlue_2}
            containerborderColor={colors.lightBlue_3}
            containerMarginBottom={correctSize(13)}
            headingFamily={Fonts.InriaSerif_Bold}
            descriptionFamily={Fonts.Inter_Regular}
            iconPadding={10}
            iconColor={colors.gray_1}
            iconBg={colors.lightBlue_3}
            heading={'Why we ask'}
            description={
              'Brands often need specific measurements for wardrobe fitting. Adding these details helps you match with more opportunities.'
            }
          />
        </View>

        <View style={btmContainer.bottomContainer}>
          <CustomButton
            title={'Next'}
            onPress={() => updateUserInfo()}
            disabled={!isFormValid()}
            loading={isLoading}
          />

          <TouchableOpacity onPress={() => handleNavigation()}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginBottom: correctSize(16),
  },
  recommendedText: {
    fontSize: 16,
    color: colors.darkBrown_1,
    fontFamily: Fonts.Inter_Regular,
    marginLeft: 8,
    // lineHeight: 20
  },
  // Input Styles
  inputContainer: {
    flexDirection: 'row',
    // marginBottom: correctSize(20),
  },
  inputWidth: {
    width: '80%',
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
    paddingHorizontal: correctSize(16),
  },
  inputFieldError: {
    borderColor: colors.red || '#FF0000',
  },
  inputField: {
    fontSize: 16,
    color: colors.black,
  },
  errorText: {
    fontSize: 12,
    color: colors.red || '#FF0000',
    fontFamily: Fonts.Inter_Medium,
    marginTop: correctSize(12),
    marginBottom: correctSize(8),
  },

  // Unit Container
  unitContainer: {
    height: 56,
    width: '18%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: colors.white_1,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 12,
    marginLeft: correctSize(10),
  },
  unitText: {
    fontSize: 16,
    color: colors.darkgray,
    fontFamily: Fonts.Inter_Medium,
    alignSelf: 'center',
  },
  // Dropdown Styles
  dropdown: {
    height: 56,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 12,
    padding: correctSize(20),
    paddingLeft: correctSize(12),
    paddingVertical: correctSize(12),
    backgroundColor: colors.white,
  },
  dropdownContainer: {
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 12,
  },
  dropdownItemText: {
    color: colors.darkgray_1,
    textTransform: 'capitalize',
  },
  dropdownSelectedText: {
    color: colors.darkgray_1,
  },
  dropdownPlaceholder: {
    color: colors.darkgray_1,
  },
  // Other Styles
  shoeSizeContainer: {
    marginVertical: correctSize(20),
  },
  lineContainer: {
    paddingVertical: correctSize(10),
  },
  line: {
    height: 1,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  hintText: {
    fontSize: 12,
    color: colors.gray_4,
    fontFamily: Fonts.Inter_Regular,
  },
  labelText: {
    fontSize: 14,
    color: colors.darkgray_1,
    fontFamily: Fonts.InriaSerif_Bold,
    marginBottom: correctSize(7),
  },
  labelTextWithMargin: {
    fontSize: 14,
    color: colors.darkgray_1,
    fontFamily: Fonts.InriaSerif_Bold,
    marginTop: correctSize(20),
    marginBottom: correctSize(7),
  },
  dressSizeHint: {
    fontSize: 12,
    color: colors.gray_4,
    fontFamily: Fonts.Inter_Regular,
    marginBottom: correctSize(20),
  },
  skipText: {
    fontSize: 16,
    fontFamily: Fonts.Inter_Medium,
    color: colors.gray_1,
    alignSelf: 'center',
    marginTop: correctSize(26),
  },
  dressInputContainer: {
    marginBottom: correctSize(8),
  },
  fullWidthContainer: {
    width: '100%',
  },
  recommendedTextContainer: {
    backgroundColor: colors.lightYellow,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.yellow,
    borderRadius: 50,
    paddingHorizontal: correctSize(17),
    paddingVertical: correctSize(9),
    // marginTop: 16,
    marginBottom: 33,
  },
  recommendedIconContainer: {
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: colors.orange_1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
