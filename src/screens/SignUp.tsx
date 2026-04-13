import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import Header from '../components/onboarding/Header';
import CreateAccount from './onboarding/CreateAccount';
import { correctSize } from '../utils';
import CustomButton from '../components/common/CustomButton';
import { Fonts } from '../assets/fonts';
import { colors } from '../utils/colors';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Talent from './onboarding/Talent';
import YourStory from './onboarding/YourStory';
import Measurements from './onboarding/Measurements';
import Availability from './onboarding/Availability';
import Portfolio from './onboarding/Portfolio';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Verify from './onboarding/Verify';
import { NavProp } from '../navigation/navigationTypes';
import { stackRoutes } from '../navigation/screenIds';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/stores/store';
import {
  resetOnboarding,
  setSignupStep,
} from '../redux/reducers/onboardingSlice';
import Toast from 'react-native-toast-message';
import {
  useSignUpStep1Mutation,
  useSignUpStep2Mutation,
  useSignUpStep3Mutation,
  useSignUpStep4Mutation,
  useSignUpStep5Mutation,
  useSignUpStep6Mutation,
  useSignUpStep7Mutation,
} from '../services/signupApi';
import { measurementValidation } from '../validations/measurementValidation';

const STEPS = [
  { title: 'Your Info' },
  { title: 'Category' },
  { title: 'Your Story' },
  { title: 'Measurements' },
  { title: 'Availability' },
  { title: 'Portfolio' },
  { title: 'Verify' },
];

const renderStep = (step: number) => {
  switch (step) {
    case 1:
      return <CreateAccount />;
    case 2:
      return <Talent />;
    case 3:
      return <YourStory />;
    case 4:
      return <Measurements />;
    case 5:
      return <Availability />;
    case 6:
      return <Portfolio />;
    case 7:
      return <Verify />;
    default:
      return null;
  }
};

const SignUp = () => {
  const navigation = useNavigation<NavProp>();
  const dispatch = useDispatch();
  const o = useSelector((state: RootState) => state.onboarding);
  const currentStep = o.currentStep;
  const totalSteps = STEPS.length;

  const [signUpStep1, { isLoading: loading1 }] = useSignUpStep1Mutation();
  const [signUpStep2, { isLoading: loading2 }] = useSignUpStep2Mutation();
  const [signUpStep3, { isLoading: loading3 }] = useSignUpStep3Mutation();
  const [signUpStep4, { isLoading: loading4 }] = useSignUpStep4Mutation();
  const [signUpStep5, { isLoading: loading5 }] = useSignUpStep5Mutation();
  const [signUpStep6, { isLoading: loading6 }] = useSignUpStep6Mutation();
  const [signUpStep7, { isLoading: loading7 }] = useSignUpStep7Mutation();

  const isLoading =
    loading1 ||
    loading2 ||
    loading3 ||
    loading4 ||
    loading5 ||
    loading6 ||
    loading7;

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1: {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{7,15}$/;
        return (
          o.fullName.trim().length >= 2 &&
          emailRegex.test(o.email.trim()) &&
          phoneRegex.test(o.phoneNumber.trim()) &&
          o.password.length >= 8 &&
          /[A-Z]/.test(o.password) &&
          /[0-9]/.test(o.password)
        );
      }
      case 2:
        return o.talent !== null;
      case 3:
        return (
          o.location.trim().length > 0 &&
          o.bio.trim().length > 0 &&
          o.specialities.length > 0
        );
      case 4:
        return (
          o.height.trim().length > 0 &&
          o.weight.trim().length > 0 &&
          o.bust.trim().length > 0 &&
          o.waist.trim().length > 0 &&
          o.hips.trim().length > 0 &&
          o.shoeSize.trim().length > 0 &&
          o.clothingSize !== null
        );
      case 5:
        return (
          o.availability.length > 0 &&
          o.shootDurationPreference !== null &&
          o.noticeRequired !== null
        );
      case 6:
        return o.imageUrl !== null && o.portfolioImages.length > 0;
      case 7:
        return o.idVerified && o.termsAgreed;
      default:
        return true;
    }
  };

  // Builds the payload and calls the correct endpoint for the current step
  const submitCurrentStep = async (): Promise<boolean> => {
    try {
      switch (currentStep) {
        case 1:
          const step1Res = await signUpStep1({
            stepNo: 1,
            fullName: o.fullName,
            email: o.email,
            phoneNumber: o.phoneNumber,
            phoneNumberPrefix: o.phoneNumberPrefix,
            password: o.password,
          }).unwrap();

          break;

        case 2:
          await signUpStep2({ stepNo: 2, talent: o.talent! }).unwrap();
          break;

        case 3:
          await signUpStep3({
            stepNo: 3,
            location: o.location,
            bio: o.bio,
            specialities: o.specialities,
          }).unwrap();
          break;

        case 4:
          await signUpStep4({
            stepNo: 4,
            height: Number(o.height),
            weight: Number(o.weight),
            bust: Number(o.bust),
            waist: Number(o.waist),
            hips: Number(o.hips),
            shoeSize: Number(o.shoeSize),
            clothingSize: o.clothingSize!,
          }).unwrap();
          break;

        case 5:
          const res = await signUpStep5({
            stepNo: 5,
            availability: o.availability,
            shootDurationPreference: o.shootDurationPreference!,
            noticeRequired: o.noticeRequired!,
          }).unwrap();
          break;

        case 6:
          await signUpStep6({
            stepNo: 6,
            imageUrl: o.imageUrl!,
            portfolioImages: o.portfolioImages,
          }).unwrap();
          break;

        case 7:
          await signUpStep7({
            stepNo: 7,
            referralCode: o.referralCode || undefined,
            emiratesId: o.emiratesId || undefined,
            idVerified: o.idVerified,
            termsAgreed: o.termsAgreed,
          }).unwrap();
          break;
      }
      return true;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error?.data?.message?.toString() ?? 'Please try again.',
      });
      return false;
    }
  };

  const handleContinue = async () => {
    if (currentStep === 4) {
      const isValid = measurementValidation({
        height: o.height,
        weight: o.weight,
        bust: o.bust,
        waist: o.waist,
        hips: o.hips,
        shoeSize: o.shoeSize,
        clothingSize: o.clothingSize,
      });

      if (!isValid) return;
    }
    const success = await submitCurrentStep();
    if (!success) return;

    if (currentStep < totalSteps) {
      dispatch(setSignupStep(currentStep + 1));
    } else {
      // Step 7 was the last — sign up complete
      dispatch(resetOnboarding());
      Toast.show({
        type: 'success',
        text1: 'Welcome to Castly! 🎉',
        text2: 'Your profile has been created successfully.',
      });
      navigation.navigate(stackRoutes.StartBrowsing);
    }
  };

  console.log(currentStep);
  
  const handleBack = () => {
    if (currentStep > 1 && currentStep!=2) {
      dispatch(setSignupStep(currentStep - 1));
    } else if (currentStep == 1 || currentStep == 2) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: stackRoutes.WelcomeScreen }],
        }),
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScreenWrapper>
      <Header
        step={currentStep}
        title={STEPS[currentStep - 1].title}
        onBack={handleBack}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.body}>{renderStep(currentStep)}</View>

          <View style={styles.footer}>
            <CustomButton
              title={
                currentStep === totalSteps ? 'Create My Profile' : 'Continue'
              }
              arrow={currentStep < totalSteps}
              onPress={handleContinue}
              disabled={!isStepValid() || isLoading}
              loading={isLoading}
            />
            {/* {currentStep !== totalSteps && currentStep !== 1 && (
              <TouchableOpacity onPress={handleContinue}>
                <Text style={styles.skipText}>Skip for now →</Text>
              </TouchableOpacity>
            )} */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  body: { padding: correctSize(20) },
  skipText: {
    fontFamily: Fonts.Inter_Medium,
    fontSize: 12,
    color: colors.gray_3,
    textAlign: 'center',
    marginTop: correctSize(13),
  },
  footer: {
    paddingVertical: correctSize(16.7),
    paddingHorizontal: correctSize(20),
    borderTopColor: colors.white_1,
    borderTopWidth: 1,
  },
});
