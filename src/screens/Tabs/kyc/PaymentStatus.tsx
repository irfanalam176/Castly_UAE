import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import NavBar from '../../../components/common/NavBar';
import VerticalDots from '../../../assets/svg/applications/VerticalDots';
import { colors } from '../../../utils/colors';
import { correctSize } from '../../../utils';
import ActivePaymentCard from '../../../components/kyc/ActivePaymentCard';
import PendingPaymentCard from '../../../components/kyc/PendingPaymentCard';
import ReleasedPaymentCard from '../../../components/kyc/ReleasedPaymentCard';
import PaymentTimeLineCard from '../../../components/kyc/PaymentTimeLineCard';
import { paymentTimelineList } from '../../../utils/array';
import CustomButton from '../../../components/common/CustomButton';
import { Fonts } from '../../../assets/fonts';
import HeadPhoneIcon from '../../../assets/svg/kyc/HeadPhoneIcon';
import { AnimatedWrapper } from '../../../components/Animation';

const PaymentStatus = () => {
  return (
    <ScreenWrapper>
      <NavBar
        title="Payment Status"
        hideLeftIcon={false}
        showRightIcon={true}
        svgIcon={<VerticalDots />}
        rightIconColor={colors.black}
        rightButtonColor={colors.white_1}
        leftButtonColor={colors.white_1}
        leftIconColor={colors.darkgray_1}
        border={false}
        bgColor={colors.white}
        titleColor={colors.darkgray_1}
        onRightPress={() => {}}
      />

      <ScrollView contentContainerStyle={styles.body}>
        <AnimatedWrapper>
          <View style={styles.container}>
            <ActivePaymentCard
              amount="2,500"
              JobReference="#CAS-2847"
              brand="Luxury Fashion Co."
              date="Dec 10, 2024"
              expectedRelease="Dec 15, 2024"
            />

            <PendingPaymentCard
              amount="1,800"
              JobReference="#CAS-2891"
              brand="Tech Startup UAE"
              date="Dec 18, 2024"
              paymentDue="Dec 12, 2024"
            />

            <ReleasedPaymentCard
              amount="3200"
              JobReference="#CAS-2756"
              brand="Emirates Retail Group"
              date="Dec 8, 2024"
              bankAccount="****4892"
              platformFee="0"
            />

            <PaymentTimeLineCard timeLine={paymentTimelineList} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              All payments are processed securely through Castly's escrow
              system. Funds are protected until job completion.
            </Text>

            <CustomButton
              title="Need Help? Contact Support"
              icon={<HeadPhoneIcon />}
              style={styles.footerBtnStyle}
              textStyle={styles.footerBtnText}
            />
          </View>
        </AnimatedWrapper>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default PaymentStatus;
const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    backgroundColor: colors.lightBlue_5,
  },
  container: {
    padding: correctSize(24),
  },
  footer: {
    padding: correctSize(24),
    paddingBottom: correctSize(50),
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.white_1,
  },
  footerText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    lineHeight: 20,
    textAlign: 'center',
  },
  footerBtnStyle: {
    backgroundColor: colors.white_1,
    borderWidth: 2,
    borderColor: colors.white_1,
    borderRadius: 12,
    marginTop: correctSize(12),
    paddingVertical: correctSize(12),
    paddingHorizontal: correctSize(16),
  },
  footerBtnText: {
    color: colors.darkgray,
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    textTransform: 'capitalize',
  },
});
