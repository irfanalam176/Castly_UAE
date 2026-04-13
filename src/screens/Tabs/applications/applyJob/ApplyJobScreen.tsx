import { View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../../../../components/layout/ScreenWrapper';
import { colors } from '../../../../utils/colors';
import ApplyJobHeader from '../../../../components/applications/applyJob/ApplyJobHeader';
import FooterStep from '../../../../components/applications/applyJob/FooterStep';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import ConfirmProfile from './ConfirmProfile';
import { correctSize } from '../../../../utils';
import Availability from './Availability';
import Portfolio from './Portfolio';
import Message from './Message';
import Review from './Review';
import { stackRoutes } from '../../../../navigation/screenIds';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavProp } from '../../../../navigation/navigationTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/stores/store';
import { useProfile } from '../../../../hooks/useProfile';
import { setConfirmProfileField } from '../../../../redux/reducers/confirmProfileSlice';
import Toast from 'react-native-toast-message';
import {
  useSaveApplicationProfileMutation,
  useSaveApplicationAvailabilityMutation,
  useSaveApplicationPortfolioMutation,
  useSaveApplicationMessageMutation,
  useSubmitApplicationMutation,
  useLazyGetApplyProgressQuery,
} from '../../../../services/applicationApi';
import { setApplyJobProgress } from '../../../../redux/reducers/applyJobProgressSlice';
import { Fonts } from '../../../../assets/fonts';
import { jobIdCreator } from '../../../../utils/jobIdCreator';
import { validateConfirmProfile } from './applyJobStepsValidation';

const STEPS = [
  { title: 'Profile' },
  { title: 'Availability' },
  { title: 'Portfolio' },
  { title: 'Message' },
  { title: 'Review' },
];

const showSuccess = (message: string) =>
  Toast.show({ type: 'success', text1: 'Success', text2: message });

const showError = (message: string) =>
  Toast.show({ type: 'error', text1: 'Error', text2: message });

const ApplyJobScreen = () => {
  const route = useRoute<any>();
  const { id, matchPercent,createdAt } = route.params || {};
  const navigation = useNavigation<NavProp>();
  const dispatch = useDispatch();
  const { profile } = useProfile();
  const [currentStep, setCurrentStep] = useState(0);

  const confirmProfile = useSelector(
    (state: RootState) => state.confirmProfile,
  );
  const { days } = useSelector((state: RootState) => state.availability);
  const { selections } = useSelector((state: RootState) => state.portfolio);
  const message = useSelector((state: RootState) => state.message.message);

  const [saveApplicationProfile, { isLoading: profileLoading }] =
    useSaveApplicationProfileMutation();
  const [saveApplicationAvailability, { isLoading: availabilityLoading }] =
    useSaveApplicationAvailabilityMutation();
  const [saveApplicationPortfolio, { isLoading: portfolioLoading }] =
    useSaveApplicationPortfolioMutation();
  const [saveApplicationMessage, { isLoading: messageLoading }] =
    useSaveApplicationMessageMutation();
  const [submitApplication, { isLoading: submitLoading }] =
    useSubmitApplicationMutation();
  const [getApplyProgress, { data, error }] = useLazyGetApplyProgressQuery();
  
  const refreshProgress = async () => {
    try {
      const response = await getApplyProgress(id).unwrap();
      if (response) {
        dispatch(setApplyJobProgress(response));
      }
    } catch (error: any) {
      const statusCode = error?.data?.statusCode ?? error?.status;
      if (statusCode !== 404) {
        showError('Failed to refresh progress.');
      }
    }
  };

  useEffect(() => {
    async function getDraft() {
      if (!id) return; // guard against missing id

      try {
        const response = await getApplyProgress(id).unwrap();
        if (response) {
          dispatch(setApplyJobProgress(response));
          if (response?.data?.profileSnapshot?.avatarUrl) {
            dispatch(
              setConfirmProfileField({
                avatarUrl: response?.data?.profileSnapshot.avatarUrl,
              }),
            );
          }
        }
      } catch (error: any) {
        const statusCode = error?.data?.statusCode ?? error?.status;
        // 404 just means no draft yet — silent fail, that's fine
        if (statusCode !== 404) {
          showError('Failed to load application progress. Please try again.');
        }
      }
    }

    getDraft();
  }, [id]);
  const isLoading =
    profileLoading ||
    availabilityLoading ||
    portfolioLoading ||
    messageLoading ||
    submitLoading;

  useEffect(() => {
    
    if (!profile) return;
    dispatch(
      setConfirmProfileField({
        fullName: profile.name ?? '',
        handle: profile.handle ?? '',
        location: profile.location ?? '',
        experience: profile.experience ?? '',
        bio: profile.bio ?? '',
        phoneNumberPrefix: profile.phoneNumberPrefix ?? '',
      }),
    );
  }, [profile]);

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return <ConfirmProfile />;
      case 1:
        return <Availability />;
      case 2:
        return <Portfolio />;
      case 3:
        return <Message />;
      case 4:
        return <Review id={id} />;
      default:
        return null;
    }
  };



  
  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        if (!validateConfirmProfile(confirmProfile)) return;
        const res = await saveApplicationProfile({
          jobId: id,
          payload: confirmProfile,
        }).unwrap();
        await refreshProgress();
        showSuccess('Profile saved successfully.');
      }

      if (currentStep === 1) {
        const payload = days.map(d => ({
          dayNumber: d.dayNumber,
          confirmed: d.confirmed,
        }));
        const res = await saveApplicationAvailability({
          jobId: id,
          payload: { days: payload },
        }).unwrap();
        await refreshProgress();
        showSuccess('Availability saved successfully.');
      }

      if (currentStep === 2) {
        const res = await saveApplicationPortfolio({
          jobId: id,
          payload: { selections },
        }).unwrap();
        await refreshProgress();
        showSuccess('Portfolio saved successfully.');
      }

      if (currentStep === 3) {
        const res = await saveApplicationMessage({
          jobId: id,
          payload: { message },
        }).unwrap();
        await refreshProgress();
        showSuccess('Message saved successfully.');
      }

      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        const res = await submitApplication(id).unwrap();
        showSuccess('Application submitted successfully!');
        navigation.navigate(stackRoutes.ApplicationSubmit);
      }
    } catch (error: any) {
      const errMsg =
        error?.data?.message ?? 'Something went wrong. Please try again.';
      showError(errMsg);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => (prev > 0 ? prev - 1 : prev));
    if (currentStep === 0) {
      navigation.goBack();
    }
  };

  
  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 0:
        return !!(
          confirmProfile.fullName?.trim() &&
          confirmProfile.handle?.trim() &&
          confirmProfile.location?.trim() &&
          // confirmProfile.experience?.trim() &&
          confirmProfile.bio?.trim() &&
          confirmProfile.phoneNumber?.trim() &&
          confirmProfile.email?.trim() &&
          confirmProfile.clothingSize?.trim() &&
          confirmProfile.avatarUrl?.trim() &&
          Number(confirmProfile.height) > 0 &&
          Number(confirmProfile.weight) > 0 &&
          Number(confirmProfile.bust) > 0 &&
          Number(confirmProfile.waist) > 0 &&
          Number(confirmProfile.hips) > 0 &&
          Number(confirmProfile.shoeSize) > 0
        );

      case 1:
        return days.length > 0 && days.every(d => d.confirmed);

      case 2:
        return selections.length > 0;

      case 3:
        return message.trim().length > 0;

      default:
        return true;
    }
  };


  return (
    <ScreenWrapper backgroundColor={colors.lightBlue_5}>
      <ApplyJobHeader
        title={STEPS[currentStep]?.title}
        step={currentStep + 1}
        onBack={handleBack}
        jobId={jobIdCreator(id,createdAt)}
        matchPercent={matchPercent}
      />

      <KeyboardAwareScrollView contentContainerStyle={styles.body}>
        {renderStep(currentStep)}
      </KeyboardAwareScrollView>

      <FooterStep
        totalSteps={STEPS.length}
        currentStep={currentStep}
        onPress={handleNext}
        loading={isLoading}
        disabled={isLoading || !isStepValid()}
      />
      {currentStep == 1 && !days.every(d => d.confirmed) && (
        <Text style={styles.requiredDays}>
          ⚠ All {days.length} days are required for this job
        </Text>
      )}
    </ScreenWrapper>
  );
};

export default ApplyJobScreen;

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    padding: correctSize(16),
    paddingBottom: correctSize(50),
  },
  requiredDays: {
    textAlign: 'center',
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.red,
  },
});
