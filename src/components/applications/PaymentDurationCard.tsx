import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import UserIcon from '../../assets/svg/applications/UserIcon';
import AlertIcon from '../../assets/svg/applications/AlertIcon';
import ClockOutlineIcon from '../../assets/svg/applications/ClockOutlineIcon';
import { formatDate } from '../../utils/formatDate';
import { formatTime } from '../../utils/formatTime';

interface PaymentDurationCardProps {
  item: any;
}

const PaymentDurationCard = ({ item }: PaymentDurationCardProps) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View
          style={[styles.subContainer, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.title}>Total Pay</Text>
          <Text style={[styles.detailText, { color: colors.darkgray_1 }]}>
            AED {item?.totalBudget}
          </Text>
          <Text style={styles.bottomText}>
            {' '}
            {item?.rateType == 'HOURLY'
              ? item?.hourlyRate
              : item?.dailyRate} / {item?.rateType == 'HOURLY' ? 'hour' : 'day'}
          </Text>
        </View>
        <View
          style={[styles.subContainer, { backgroundColor: colors.lightBlue_2 }]}
        >
          <Text style={styles.title}>Duration</Text>
          <Text style={[styles.detailText, { color: colors.blue_5 }]}>
            {item?.shootDays} Days
          </Text>
          <Text style={styles.bottomText} numberOfLines={1}>
            {formatDate(item?.endDate)}
          </Text>
        </View>
        <View
          style={[styles.subContainer, { backgroundColor: colors.green_1 }]}
        >
          <Text style={styles.title}>Spots Left</Text>
          <Text style={[styles.detailText, { color: colors.green_5 }]}>
            {item?.availableSpots} of {item?.totalSpots}
          </Text>
          <Text style={styles.bottomText}>{item?.bookedSpots} taken</Text>
        </View>
      </View>
      <View style={styles.applicantAndDeadline}>
        <View style={styles.applicantAndDeadlineSub}>
          <UserIcon />
          <Text style={styles.applicationText}>
            {item?._count?.applications} applicants
          </Text>
        </View>
        <View style={styles.applicantAndDeadlineSub}>
          <View style={styles.line} />
          <AlertIcon />
          <Text style={styles.applicationText}>
            Deadline: {formatDate(item?.deadline)}
          </Text>
        </View>
        <View style={styles.applicantAndDeadlineSub}>
          <View style={styles.line} />
          <ClockOutlineIcon />
          <Text style={styles.applicationText}>
            {formatTime(item?.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentDurationCard;

const styles = StyleSheet.create({
  mainContainer: {},
  container: {
    marginVertical: correctSize(8),
    flexDirection: 'row',
    gap: correctSize(8),
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.Inter_Medium,
    fontSize: 10,
    color: colors.gray_4,
  },
  subContainer: {
    flex: 1,
    padding: correctSize(12),
    borderRadius: 14,
  },
  detailText: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 13,
  },
  bottomText: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 10,
    color: colors.gray_3,
  },
  applicantAndDeadline: {
    marginVertical: correctSize(8),
    padding: correctSize(16),
    borderRadius: 14,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applicantAndDeadlineSub: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  applicationText: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 12,
    color: colors.darkgray,
    marginStart: correctSize(6),
    flexShrink: 1,
  },
  line: {
    height: correctSize(13),
    width: correctSize(1),
    backgroundColor: colors.gray,
  },
});
