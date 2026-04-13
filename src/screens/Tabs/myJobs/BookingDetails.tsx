import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useRef } from 'react';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import { colors } from '../../../utils/colors';
import CommonBookingCard from '../../../components/myJobs/CommonBookingCard';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useGetMySpecificJobQuery } from '../../../services/applicationApi';
import { correctSize } from '../../../utils';
import BookingScreenHeader from '../../../components/myJobs/BookingScreenHeader';
import PerksCard from '../../../components/myJobs/PerksCard';
import { Fonts } from '../../../assets/fonts';
import CustomButton from '../../../components/common/CustomButton';
import ChatIcon from '../../../assets/svg/tabs/ChatIcon';
import CrossIcon from '../../../components/vectorIcons/CrossIcon';
import WarningIcons from '../../../assets/svg/common/WarningIcons';
import BookingStatusCard from '../../../components/myJobs/BookingStatusCard';
import BookingDetailSkeleton from '../../../components/shimmers/BookingDetailSkeleton';
import ReportIssueSheet from './ReportIssueSheet';
import { ActionSheetRef } from 'react-native-actions-sheet';

type RouteType = {
  BookingDetails: {
    id: string;
  };
};

const BookingDetails = () => {
  const route = useRoute<RouteProp<RouteType, 'BookingDetails'>>();
  const navigation = useNavigation();
  const reportIssueRef = useRef<ActionSheetRef>(null);
  const { id } = route.params;

  const { data, isLoading } = useGetMySpecificJobQuery(id);

  if (isLoading) {
    return <BookingDetailSkeleton />;
  }

  if (!data) {
    return (
      <ScreenWrapper backgroundColor={colors.lightBlue_5}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Unable to load booking details.</Text>
        </View>
      </ScreenWrapper>
    );
  }

  const status = data.status?.toUpperCase();
  const isApplied = status === 'APPLIED';
  const isShortlisted = status === 'SHORTLISTED';
  const isBooked = status === 'BOOKED';

  return (
    <ScreenWrapper backgroundColor={colors.lightBlue_5}>
      <BookingScreenHeader
        status={data?.status}
        onBack={() => navigation.goBack()}
      />

      <ReportIssueSheet
        actionSheetRef={reportIssueRef}
        jobTitle={data?.job.title}
        brandName={data?.brand.brandName}
        escrowAmount={data?.paymentBreakdown.grossPay}
        applicationId={data?.applicationId}
      />

      <ScrollView contentContainerStyle={styles.body}>
        {isBooked && data.paymentBreakdown && (
          <BookingStatusCard
            paymentBreakdown={data.paymentBreakdown}
            expectedReleaseDate={data.escrow?.expectedReleaseDate}
            status={data.status}
          />
        )}

        <CommonBookingCard
          title={data.job.title}
          brandName={data.brand.brandName}
          rateLabel={data.rateLabel}
          startDate={data.job.startDate}
          endDate={data.job.endDate}
          location={data.job.location}
          shootDays={data.job.shootDays}
          totalPay={data.totalPay}
          netPay={data.netPay}
        />

        <PerksCard perks={data?.includedPerks?.label} />

        {isShortlisted && (
          <View style={styles.shortlistCard}>
            <Text style={styles.shortlistTitle}>📌 Note</Text>
            <Text style={styles.shortlistDescription}>
              Brand shortlisted you! Check your messages.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {isShortlisted && (
          <>
            <Text style={styles.shortlistedFooterText}>
              ⭐ Brand is considering you! Check your messages.
            </Text>
            <CustomButton
              icon={<ChatIcon color={colors.darkgray_1} />}
              title="Message Brand"
            />
          </>
        )}

        {isApplied && (
          <View style={styles.appliedFooterRow}>
            <CustomButton
              title="Message Brand"
              icon={
                <ChatIcon color={colors.darkgray_1} width={14} height={14} />
              }
              style={[styles.footerBtn]}
              textStyle={styles.footerBtnText}
            />
            <CustomButton
              title="Withdraw"
              icon={<CrossIcon fillColor={colors.red} width={10} height={10} />}
              style={[styles.footerBtn, styles.withdraw]}
              textStyle={[styles.withdrawBtnText, styles.footerBtnText]}
            />
          </View>
        )}

        {isBooked && (
          <View style={styles.appliedFooterRow}>
            <CustomButton
              onPress={() => reportIssueRef.current?.show()}
              title="Report Issue"
              icon={<WarningIcons />}
              style={[styles.footerBtn, styles.withdraw]}
              textStyle={[styles.withdrawBtnText, styles.footerBtnText]}
            />
            <CustomButton
              title="Message"
              icon={
                <ChatIcon color={colors.darkgray_1} width={14} height={14} />
              }
              style={[styles.footerBtn]}
              textStyle={styles.footerBtnText}
            />
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({
  body: {
    padding: correctSize(16),
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.gray_3,
    fontSize: 14,
  },
  shortlistCard: {
    borderRadius: 16,
    borderWidth: 0.7,
    borderColor: colors.yellow_5,
    backgroundColor: colors.yellow_4,
    padding: correctSize(16),
    marginTop: correctSize(16),
  },
  shortlistTitle: {
    color: colors.darkBrown_2,
    fontSize: 12,
    fontFamily: Fonts.Inter_Bold,
    lineHeight: correctSize(18),
  },
  shortlistDescription: {
    color: colors.darkBrown,
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
  },
  footer: {
    padding: correctSize(16),
    backgroundColor: colors.white,
    borderTopColor: colors.white_1,
    borderTopWidth: 1,
  },
  shortlistedFooterText: {
    marginBottom: correctSize(8),
    borderRadius: 16,
    borderWidth: 0.7,
    borderColor: colors.yellow_5,
    backgroundColor: colors.yellow_4,
    paddingHorizontal: correctSize(16),
    paddingVertical: correctSize(8),
    color: colors.darkBrown,
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
  },
  appliedFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
  },
  footerBtn: {
    backgroundColor: colors.white_1,
    flex: 1,
  },
  withdrawBtnText: {
    color: colors.red,
    fontFamily: Fonts.Inter_SemiBold,
  },
  withdraw: {
    backgroundColor: colors.light_red,
  },
  footerBtnText: {
    fontSize: 13,
    fontFamily: Fonts.Inter_SemiBold,
  },
});
