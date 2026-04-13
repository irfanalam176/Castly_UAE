import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import NavBar from '../../../components/common/NavBar';
import { colors } from '../../../utils/colors';
import { correctSize } from '../../../utils';
import BookingRequestBanner from '../../../components/applications/BookingRequestBanner';
import JobHeader from '../../../components/applications/JobHeader';
import BriefCaseIcon from '../../../components/vectorIcons/BriefCaseIcon';
import SquareBadge from '../../../components/applications/SquareBadge';
import BookingCardHeaders from '../../../components/applications/BookingCardHeaders';
import CalendarIcon from '../../../assets/svg/applications/CalendarIcon';
import BookingDateTable from '../../../components/applications/BookingDateTable';
import PinIcon from '../../../assets/svg/applications/PinIcon';
import LocationCard from '../../../components/applications/LocationCard';
import RequirementsCard from '../../../components/common/RequirementsCard';
import { whatToBringList } from '../../../utils/array';
import CheckListIcon from '../../../assets/svg/applications/CheckListIcon';
import InfoBanner from '../../../components/common/InfoBanner';
import { Fonts } from '../../../assets/fonts';
import WarningIcon from '../../../assets/svg/applications/WarningIcon';
import CustomButton from '../../../components/common/CustomButton';
import CrossIcon from '../../../components/vectorIcons/CrossIcon';
import CheckIcon from '../../../assets/svg/applications/CheckIcon';
import IDcardIcon from '../../../assets/svg/applications/IDcardIcon';
import ContactPersonCard from '../../../components/applications/ContactPersonCard';
import BrandInfoCard from '../../../components/applications/BrandInfoCard';
import PaymentCard from '../../../components/applications/PaymentCard';
import FeedBack from './FeedBack';
import { AnimatedWrapper } from '../../../components/Animation';

const BookingRequest = () => {
  const [showFeedBack, setShowFeedBack] = useState<boolean>(false);
  function handleFeedback() {
    setShowFeedBack(!showFeedBack);
  }
  return (
    <ScreenWrapper>
      <FeedBack visible={showFeedBack} onClose={handleFeedback} />
      <NavBar
        title="Booking Request"
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
            <BookingRequestBanner />

            <View style={styles.body}>
              <View style={styles.container}>
                <JobHeader
                  title="Fashion Model - Summer Campaign"
                  brand="Dubai Mall - Outdoor Shoot"
                  icon={<BriefCaseIcon fillColor={colors.white} />}
                />

                <View style={styles.badgeContainer}>
                  <SquareBadge
                    title="Commercial"
                    bgColor={colors.lightBlue_2}
                    titleColor={colors.gray_1}
                  />
                  <SquareBadge
                    title="AED 3,500"
                    bgColor={colors.green_1}
                    titleColor={colors.green_5}
                  />
                </View>
              </View>

              <View style={styles.container}>
                <BookingCardHeaders
                  title="Date & Time"
                  icon={<CalendarIcon />}
                />

                <BookingDateTable
                  date="Sunday, May 15, 2024"
                  time="10:00 AM - 4:00 PM"
                  duration="6 hours"
                />
              </View>

              <View style={styles.container}>
                <BookingCardHeaders
                  title="Location"
                  icon={
                    <PinIcon width={10} height={20} color={colors.darkgray} />
                  }
                />

                <LocationCard
                  location="Dubai Mall Fashion District"
                  locationDetail="Financial Centre Road, Downtown Dubai, Dubai, UAE"
                  onPress={() => {}}
                />
              </View>

              <View style={styles.container}>
                <BookingCardHeaders
                  icon={<IDcardIcon />}
                  title="Contact Person"
                />

                <ContactPersonCard
                  image=""
                  name="Sarah Al Mansoori"
                  role="Casting Director"
                  onCall={() => {}}
                  onMessage={() => {}}
                />
              </View>

              <PaymentCard
                item={{
                  title: 'Payment Secured in Escrow',
                  description:
                    'AED 3,500 is safely held and will be released to you after job completion',
                  basePayment: '3,500',
                  tax: 175,
                  totalRecieve: '3,325',
                  info: 'Funds are protected and will be transferred to your bank account within 2-3 business days after completion',
                }}
              />

              <View style={styles.container}>
                <BookingCardHeaders
                  title="What to Bring"
                  icon={<CheckListIcon />}
                />
                <RequirementsCard
                  data={whatToBringList}
                  iconBg={colors.lightBlue_2}
                  iconColor={colors.purple}
                  bgColor={colors.white}
                  borderColor={colors.gray}
                  borderWidth={0}
                  padding={0}
                  marginTop={0}
                  marginBottom={correctSize(12)}
                />
              </View>

              <View style={styles.container}>
                <BrandInfoCard
                  brand="Luxe Fashion House"
                  bookings={127}
                  rating={4.8}
                  onPress={() => {}}
                />
              </View>

              <InfoBanner
                containerborderColor={colors.yellow}
                containerMarginBottom={correctSize(13)}
                containerbgColor={colors.lightYellow}
                headingFamily={Fonts.InriaSerif_Bold}
                descriptionFamily={Fonts.Inter_Regular}
                showIcon
                svgIcon={<WarningIcon />}
                iconBg={'transparent'}
                headingSize={14}
                heading={`Cancellation Policy`}
                headingColor={colors.darkgray_1}
                description={
                  'If you cancel within 48 hours of the shoot date, you may receive a penalty. Free cancellation available up to 72 hours before.'
                }
                descriptionColor={colors.gray_1}
              />
            </View>

            <View style={styles.footer}>
              <View style={styles.footerBtnRow}>
                <View style={styles.btnContainer}>
                  <CustomButton
                    title="Decline"
                    icon={
                      <CrossIcon
                        width={12}
                        height={16}
                        fillColor={colors.black}
                      />
                    }
                    style={styles.declineButton}
                    textStyle={styles.declineButtonText}
                    onPress={() => console.log('Decline pressed')}
                  />
                </View>
                <View style={styles.btnContainer}>
                  <CustomButton
                    title="Accept Booking"
                    icon={
                      <CheckIcon color={colors.black} width={14} height={20} />
                    }
                    style={styles.acceptButton}
                    textStyle={styles.acceptButtonText}
                    onPress={handleFeedback}
                  />
                </View>
              </View>
              <Text style={styles.footerText}>
                Respond by May 12, 2024 at 11:59 PM
              </Text>
            </View>
          </AnimatedWrapper>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default BookingRequest;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.lightBlue_5,
    // paddingBottom: correctSize(50),
  },
  body: {
    backgroundColor: colors.lightBlue_5,
    padding: correctSize(24),
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
    marginBottom: correctSize(16),
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: correctSize(8),
    marginTop: correctSize(16),
  },
  footer: {
    backgroundColor: colors.white,
    paddingVertical: correctSize(22),
    paddingHorizontal: correctSize(24),
  },
  footerBtnRow: {
    flexDirection: 'row',
    gap: correctSize(12),
  },
  btnContainer: {
    flex: 1,
  },
  footerText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    textAlign: 'center',
    marginTop: correctSize(12),
  },
  declineButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // icon + text
    paddingVertical: correctSize(12),
    paddingHorizontal: 16,
    marginBottom: correctSize(16),
  },
  declineButtonText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 14,
    textTransform: 'capitalize',
    color: colors.black,
    textAlign: 'center',
  },

  // Accept Booking Button (Primary background)
  acceptButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // icon + text
    paddingVertical: correctSize(12),
    paddingHorizontal: 16,
    marginBottom: correctSize(16),
  },
  acceptButtonText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 14,
    textTransform: 'capitalize',
    color: colors.black,
    textAlign: 'center',
  },
});
