import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React from 'react';
import { correctSize, fontSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import NavBar from '../../../components/common/NavBar';
import JobHeader from '../../../components/applications/JobHeader';
import BriefCaseIcon from '../../../components/vectorIcons/BriefCaseIcon';
import Tags from '../../../components/common/Tags';
import DotIcon from '../../../assets/svg/applications/DotIcon';
import DateCard from '../../../components/applications/DateCard';
import { Fonts } from '../../../assets/fonts';
import CustomButton from '../../../components/common/CustomButton';
import PinIcon from '../../../assets/svg/applications/PinIcon';
import {
  eventInfoList,
  timeList,
  verificationsInfoList,
} from '../../../utils/array';
import EventInfoRow from '../../../components/applications/EventInfoRow';
import LockIcon from '../../../assets/svg/applications/LockIcon';
import CheckCircleIcon from '../../../assets/svg/applications/CheckCircleIcon';
import InfoBanner from '../../../components/common/InfoBanner';
import HourGlassIcon from '../../../assets/svg/applications/HourGlassIcon';
import EarningCard from '../../../components/applications/EarningCard';
import ChatIconFill from '../../../assets/svg/applications/ChatIconFill';
import PhoneIcon from '../../../assets/svg/applications/PhoneIcon';
import ClockFill from '../../../assets/svg/applications/ClockFill';
import TimeCard from '../../../components/applications/TimeCard';
import InfoIcon from '../../../assets/svg/Home/InfoIcon';
import MapPinIcon from '../../../assets/svg/applications/MapPinIcon';
import { images } from '../../../assets/images';
import { useNavigation } from '@react-navigation/native';
import screenIds from '../../../navigation/screenIds';
import { AnimatedWrapper } from '../../../components/Animation';
import FastImage from 'react-native-fast-image';

const JobStart = () => {
  const navigation = useNavigation<any>();
  return (
    <ScreenWrapper>
      <NavBar
        title=""
        hideLeftIcon={false}
        showRightIcon={true}
        rightIconName="ellipsis-vertical"
        rightIconFamily="FontAwesome6"
        rightIconColor={colors.black}
        rightButtonColor={colors.white_1}
        border={false}
        onRightPress={() => {}}
      />

      <View style={styles.wrapper}>
        <ScrollView>
          <AnimatedWrapper>
            <View style={styles.container}>
              <JobHeader
                title="Fashion Model for Summer Campaign"
                brand="Dubai Mall Event"
                icon={<BriefCaseIcon fillColor={colors.white} />}
              >
                <View
                  style={{ flexDirection: 'row', marginTop: correctSize(8) }}
                >
                  <Tags
                    items={{
                      label: 'Confirmed',
                      color: colors.green_5,
                      bgColor: colors.green_1,
                      icon: (
                        <DotIcon width={6} height={6} color={colors.green_5} />
                      ),
                    }}
                  />
                </View>
              </JobHeader>

              <DateCard />
            </View>

            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.heading}>Time Until Start</Text>
                <Tags
                  items={{
                    label: 'Starting Soon',
                    color: colors.darkBrown_1,
                    bgColor: colors.lightYellow,
                    icon: <ClockFill />,
                  }}
                />
              </View>

              <View style={styles.timeContainer}>
                {timeList.map(item => (
                  <TimeCard label={item.label} unit={item.unit} key={item.id} />
                ))}
              </View>

              <InfoBanner
                containerborderColor={colors.white}
                containerMarginBottom={correctSize(13)}
                containerbgColor={colors.lightBlue_2}
                headingFamily={Fonts.Inter_SemiBold}
                descriptionFamily={Fonts.Inter_Regular}
                showIcon
                svgIcon={
                  <InfoIcon width={18} height={18} color={colors.blue} />
                }
                iconBg={'transparent'}
                headingSize={14}
                heading={`Check-in Window`}
                headingColor={colors.darkgray_1}
                description={
                  'You can check in 30 minutes before the event starts. Please arrive on time to avoid penalties.'
                }
                descriptionColor={colors.gray_1}
              />
            </View>

            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.heading}>Check-In</Text>
                <Text style={styles.disableText}>Not Checked In</Text>
              </View>

              <CustomButton
                title="Check In Now"
                onPress={() =>
                  navigation.navigate(screenIds.stack.BookingRequest)
                }
                icon={<PinIcon width={15} height={20} color={colors.black} />}
                style={styles.primaryButton}
                textStyle={styles.primaryButtonText}
              />

              <View style={styles.verificationCard}>
                {verificationsInfoList.map(item => (
                  <View style={{ marginBottom: correctSize(12) }} key={item.id}>
                    <EventInfoRow
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                      iconBg={item.iconBg}
                    />
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.heading}>Event Location</Text>
                <Text style={styles.directionLabel}>Get Directions</Text>
              </View>

              <FastImage
                source={images.map}
                style={{ marginBottom: correctSize(16) }}
              />

              <View style={styles.locationRow}>
                <PinIcon width={16} height={30} />
                <View>
                  <Text
                    style={[
                      styles.locationTitle,
                      {
                        color: colors.darkgray_1,
                        fontFamily: Fonts.Inter_SemiBold,
                      },
                    ]}
                  >
                    Dubai Mall
                  </Text>
                  <Text style={styles.locationDescription}>
                    Financial Center Road, Downtown Dubai
                  </Text>
                </View>
              </View>
              <View style={styles.locationRow}>
                <MapPinIcon />
                <Text style={styles.locationTitle}>
                  Meeting Point: Main Entrance, Level 1
                </Text>
              </View>
              <View style={styles.locationRow}>
                <PhoneIcon color={colors.gray_3} />
                <Text style={styles.locationTitle}>
                  Contact: +971 50 123 4567
                </Text>
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.heading}>Event Details</Text>
              </View>

              {eventInfoList.map(item => (
                <View style={styles.eventDetails} key={item.id}>
                  <EventInfoRow
                    title={item.title}
                    description={item.description}
                    iconBg={item.iconBg}
                    icon={item.icon}
                    icongBgSize={40}
                    iconborderRadius={12}
                    titleStyle={{
                      fontSize: 12,
                      fontFamily: Fonts.Inter_Regular,
                      color: colors.gray_4,
                    }}
                    descriptionStyle={{
                      fontSize: 14,
                      fontFamily: Fonts.Inter_SemiBold,
                      color: colors.darkgray_1,
                    }}
                  />
                </View>
              ))}
            </View>

            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.heading}>Job Completion</Text>

                <Tags
                  items={{
                    label: 'Locked',
                    icon: <LockIcon />,
                    bgColor: colors.white_1,
                    color: colors.gray_1,
                  }}
                />
              </View>

              <CustomButton
                title="Mark as Completed"
                disabled
                icon={
                  <CheckCircleIcon
                    width={23}
                    height={20}
                    color={colors.gray_2}
                  />
                }
                style={styles.primaryButton}
                textStyle={styles.disabledButtonText}
              />

              <InfoBanner
                containerborderColor={colors.white}
                containerMarginBottom={correctSize(13)}
                containerbgColor={colors.lightYellow}
                headingFamily={Fonts.Inter_SemiBold}
                descriptionFamily={Fonts.Inter_Regular}
                showIcon
                svgIcon={<HourGlassIcon />}
                iconBg={'transparent'}
                headingSize={14}
                heading={`Available After Event`}
                headingColor={colors.darkgray_1}
                description={
                  'You can mark the job as completed after the event ends. Your payment will be processed within 24 hours.'
                }
                descriptionColor={colors.gray_1}
              />
            </View>

            <View style={[styles.container, styles.earningCardContainer]}>
              <EarningCard />
            </View>

            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.heading}>Need Help?</Text>
              </View>

              <View style={styles.footerBtnRow}>
                <View style={styles.btnContainer}>
                  <CustomButton
                    title="Chat Support"
                    icon={<ChatIconFill />}
                    style={styles.secondaryButton}
                    textStyle={styles.secondaryButtonText}
                    onPress={() => console.log('Chat Support')}
                  />
                </View>
                <View style={styles.btnContainer}>
                  <CustomButton
                    title="Call Brand"
                    icon={<PhoneIcon />}
                    style={styles.secondaryButton}
                    textStyle={styles.secondaryButtonText}
                    onPress={() => console.log('Call Brand')}
                  />
                </View>
              </View>
            </View>
          </AnimatedWrapper>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default JobStart;

const styles = StyleSheet.create({
  eventDetails: {
    marginBottom: correctSize(16),
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.lightBlue_5,
    // paddingBottom: 50,
  },
  container: {
    padding: correctSize(24),
    backgroundColor: colors.white,
    marginBottom: correctSize(16),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    // Android
    elevation: 1,
  },
  earningCardContainer: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(16),
  },
  heading: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  disableText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.gray_4,
  },
  directionLabel: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.purple,
  },
  verificationCard: {
    borderRadius: 12,
    backgroundColor: colors.lightBlue_5,
    padding: correctSize(16),
  },
  footerBtnRow: {
    flexDirection: 'row',
    gap: correctSize(12),
  },
  btnContainer: {
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: correctSize(12),
    marginBottom: correctSize(16),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(12),
    marginBottom: 12,
  },
  locationTitle: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray,
    alignSelf: 'flex-start',
    flexShrink: 1,
  },
  locationDescription: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 12,
    color: colors.gray_1,
    marginTop: 5,
    alignSelf: 'flex-start',
    flexShrink: 1,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // icon + text
    paddingVertical: correctSize(12),
    paddingHorizontal: 16,
    marginBottom: correctSize(12),
  },
  primaryButtonText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    textTransform: 'capitalize',
    color: colors.black,
    textAlign: 'center',
  },
  disabledButtonText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    textTransform: 'capitalize',
    color: colors.gray_2, // for disabled
    textAlign: 'center',
  },

  // Secondary buttons (light blue background)
  secondaryButton: {
    backgroundColor: colors.lightBlue_5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: correctSize(12),
    paddingHorizontal: 16,
    marginBottom: correctSize(16),
  },
  secondaryButtonText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 14,
    textTransform: 'capitalize',
    color: colors.black,
    textAlign: 'center',
  },
});
