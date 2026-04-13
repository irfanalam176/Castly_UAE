import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../../../components/layout/ScreenWrapper';
import { colors } from '../../../../utils/colors';
import CheckCircleIcon from '../../../../assets/svg/common/CheckCircleIcon';
import ShineIcon from '../../../../assets/svg/Profile/ShineIcon';
import { correctSize } from '../../../../utils';
import { Fonts } from '../../../../assets/fonts';
import ApplicationStatusCard from '../../../../components/applications/applyJob/ApplicationStatusCard';
import CustomButton from '../../../../components/common/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NavProp } from '../../../../navigation/navigationTypes';
import { stackRoutes } from '../../../../navigation/screenIds';
import { SlideLeftFade } from '../../../../components/Animation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/stores/store';

type StatusStep = {
  label: string;
  time?: string;
  completed: boolean;
};

const getStatusSteps = (status: string): StatusStep[] => {
  const isAtLeast = (levels: string[]) => levels.includes(status);

  return [
    {
      label: 'Submitted',
      time: 'Just now',
      completed: true,
    },
    {
      label: 'Under Review by Brand',
      time: 'Within 24–48h',
      completed: isAtLeast(['REVIEW', 'SHORTLISTED', 'REJECTED', 'CONFIRMED']),
    },
    {
      label: 'Shortlisted / Rejected',
      time: 'By Dec 15',
      completed: isAtLeast(['SHORTLISTED', 'REJECTED', 'CONFIRMED']),
    },
    {
      label: 'Booking Confirmed',
      time: 'By Dec 16',
      completed: isAtLeast(['CONFIRMED']),
    },
  ];
};

const ApplicationSubmit = () => {
  const navigation = useNavigation<NavProp>();
  const { data: jobData }: any = useSelector((state: RootState) => state.JobData);

  const steps = getStatusSteps('ACTIVE');

  const handleBackToJobs = () => {
    navigation.navigate(stackRoutes.TabNavigator, { screen: stackRoutes.Home });
  };

  const STAGGER = 150;

  return (
    <ScreenWrapper backgroundColor={colors.lightBlue_5}>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.container}>
          <SlideLeftFade delay={STAGGER * 1}>
            <View style={styles.chkIconContainer}>
              <CheckCircleIcon width={37} height={37} color={colors.darkgray_1} />
              <View style={styles.smIconContainer}>
                <ShineIcon width={14} height={14} color={colors.primary} />
              </View>
            </View>
          </SlideLeftFade>
          <SlideLeftFade delay={STAGGER * 2}>
            <Text style={styles.title}>Application Submitted!</Text>
            <Text style={styles.description}>
              Your application to{' '}
              <Text style={styles.companyName}>{jobData?.brand?.brandName}</Text> has been
              sent to the casting team.
            </Text>
          </SlideLeftFade>
        </View>
        <SlideLeftFade delay={STAGGER * 3}>
          <ApplicationStatusCard steps={steps} />
        </SlideLeftFade>
        <SlideLeftFade delay={STAGGER * 4}>
          <CustomButton
            title="Back to Jobs"
            style={styles.backButton}
            onPress={handleBackToJobs}
          />
        </SlideLeftFade>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ApplicationSubmit;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: correctSize(24),
    paddingBottom: correctSize(40),
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: correctSize(40),
  },
  chkIconContainer: {
    width: correctSize(100),
    height: correctSize(100),
    borderRadius: correctSize(50),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: correctSize(135),
    marginBottom: correctSize(25),
    position: 'relative',
  },
  smIconContainer: {
    width: correctSize(32),
    height: correctSize(32),
    borderRadius: correctSize(20),
    backgroundColor: colors.darkgray_1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: correctSize(-4),
    right: correctSize(-4),
  },
  title: {
    color: colors.darkgray_1,
    textAlign: 'center',
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: correctSize(22),
    lineHeight: correctSize(33),
    marginBottom: correctSize(12),
  },
  description: {
    color: colors.gray_4,
    textAlign: 'center',
    fontFamily: Fonts.Inter_Regular,
    fontSize: correctSize(14),
    lineHeight: correctSize(23),
  },
  companyName: {
    fontFamily: Fonts.Inter_Bold,
  },
  backButton: {
    backgroundColor: colors.primary,
    marginTop: correctSize(20),
    marginBottom: correctSize(12),
  },
});