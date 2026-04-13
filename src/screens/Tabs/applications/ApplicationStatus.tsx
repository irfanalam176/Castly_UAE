import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import NavBar from '../../../components/common/NavBar';
import { colors } from '../../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import ApplicationStatusBanner from '../../../components/applications/ApplicationStatusBanner';
import MessageCard from '../../../components/applications/MessageCard';
import JobHeader from '../../../components/applications/JobHeader';
import UserIcon from '../../../assets/svg/applications/UserIcon';
import Tags from '../../../components/common/Tags';
import {
  eventDetailList,
  stepsList,
  whatsRequired,
} from '../../../utils/array';
import EventDetail from '../../../components/applications/EventDetail';
import { correctSize } from '../../../utils';
import { Fonts } from '../../../assets/fonts';
import RequirementsCard from '../../../components/common/RequirementsCard';
import StepsCard from '../../../components/applications/StepsCard';
import QuestionCard from '../../../components/applications/QuestionCard';
import CustomButton from '../../../components/common/CustomButton';
import CheckIcon from '../../../assets/svg/applications/CheckIcon';
import CheckCircleIcon from '../../../assets/svg/applications/CheckCircleIcon';
import { useNavigation } from '@react-navigation/native';
import screenIds from '../../../navigation/screenIds';
import { AnimatedWrapper } from '../../../components/Animation';

const ApplicationStatus = () => {
  const navigation = useNavigation<any>();

  return (
    <ScreenWrapper>
      <NavBar
        title="Application Status"
        hideLeftIcon={false}
        showRightIcon={true}
        rightIconName="ellipsis-vertical"
        rightIconFamily="FontAwesome6"
        rightIconColor={colors.black}
        rightButtonColor={colors.white_1}
        border={true}
        onRightPress={() => {}}
      />
      <LinearGradient
        colors={[colors.green_1, colors.white]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <AnimatedWrapper>
            <View style={styles.wrapper}>
              <ApplicationStatusBanner />

              <View style={styles.container}>
                <MessageCard
                  message="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel,
                      molestias! Corporis, deserunt doloremque? Maxime provident cupiditate
                      sit. Alias atque harum explicabo officia nam dicta dolor perspiciatis
                      magnam, impedit pariatur ducimus!"
                />
              </View>

              <Text style={styles.mainHeading}>Job Details</Text>

              <View style={[styles.container, styles.jobDetailContainer]}>
                <View style={styles.jobHeader}>
                  <JobHeader
                    title="Runway Model"
                    brand="Fashion Show - Dubai Mall"
                    withGradient
                    gradientColors={[colors.purple_2, colors.pink_1]}
                    icon={<UserIcon />}
                  >
                    <View style={styles.tags}>
                      <Tags
                        items={{
                          label: 'Shortlisted',
                          color: colors.green_5,
                          bgColor: colors.lightGreen_1,
                        }}
                      />
                      <Tags
                        items={{
                          label: 'Premium Event',
                          color: colors.gray_1,
                          bgColor: colors.lightBlue_7,
                        }}
                      />
                    </View>
                  </JobHeader>
                </View>

                <View style={styles.eventDatail}>
                  {eventDetailList.map(item => (
                    <EventDetail
                      label={item.label}
                      detail={item.detail}
                      time={item.time}
                      id={item.id}
                      key={item.id}
                    />
                  ))}
                </View>
              </View>

              <Text style={styles.mainHeading}>What's Required</Text>

              <RequirementsCard
                data={whatsRequired}
                iconBg={colors.lightGreen_1}
                iconColor={colors.green}
                bgColor={colors.white}
                borderColor={colors.gray}
                borderWidth={1}
                elevation={1}
              />

              <Text style={styles.mainHeading}>Next Steps</Text>

              <StepsCard data={stepsList} />

              <View style={[styles.container, styles.questionContainer]}>
                <QuestionCard />
              </View>
            </View>

            <View style={styles.footer}>
              {/* Confirm Availability */}
              <CustomButton
                title="Confirm Availability"
                onPress={() => navigation.navigate(screenIds.stack.JobStart)}
                icon={
                  <CheckCircleIcon
                    width={23}
                    height={20}
                    color={colors.black}
                  />
                }
                style={styles.confirmButton}
                textStyle={styles.confirmButtonText}
              />

              {/* Not Available */}
              <CustomButton
                title="Not Available"
                style={styles.notAvailableButton}
                textStyle={styles.notAvailableButtonText}
                onPress={() => console.log('Not Available')}
              />

              <Text style={styles.footerText}>
                By confirming, you commit to being available for all event dates
              </Text>
            </View>
          </AnimatedWrapper>
        </ScrollView>
      </LinearGradient>
    </ScreenWrapper>
  );
};

export default ApplicationStatus;

const styles = StyleSheet.create({
  wrapper: {
    padding: correctSize(24),
    paddingBottom: 0,
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: correctSize(150),
  },
  container: {
    padding: correctSize(21),
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.white_1,

    elevation: 1,

    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  questionContainer: {
    marginTop: 24,
    marginBottom: 34,
  },
  jobHeader: { padding: correctSize(21) },
  jobDetailContainer: { padding: 0 },
  tags: {
    flexDirection: 'row',
    gap: correctSize(7),
  },
  eventDatail: {
    padding: correctSize(21),
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
  mainHeading: {
    fontSize: 18,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginTop: correctSize(24),
    marginBottom: correctSize(16),
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    padding: correctSize(24),
  },
  footerText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    textAlign: 'center',
    marginTop: correctSize(12),
  },
  confirmButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: correctSize(12),
    paddingHorizontal: 16,
    marginBottom: correctSize(12),
    flexDirection: 'row', // ensures icon + text align horizontally
  },
  confirmButtonText: {
    fontSize: 16,
    color: colors.black,
    textTransform: 'capitalize',
    textAlign: 'center',
    fontFamily: Fonts.Inter_Bold,
  },
  notAvailableButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: correctSize(12),
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  notAvailableButtonText: {
    fontSize: 16,
    color: colors.black,
    textTransform: 'capitalize',
    textAlign: 'center',
    fontFamily: Fonts.Inter_SemiBold,
  },
});
