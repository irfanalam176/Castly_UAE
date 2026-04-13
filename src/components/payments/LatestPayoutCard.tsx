import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import CrossDownArrowIcon from '../../assets/svg/payments/CrossDownArrowIcon';

type Props = {
  jobTitle: string;
  brandName: string;
  date: string;
  amount: number;
  fee: number;
  maskedAccount: string;
};

const LatestPayoutCard = ({
  jobTitle,
  brandName,
  date,
  amount,
  fee,
  maskedAccount,
}: Props) => {
  const feePercent = Math.round((fee / (amount + fee)) * 100);

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Latest Payout</Text>

      <View style={styles.row}>
        {/* Icon */}
        <View style={styles.iconBox}>
          <CrossDownArrowIcon />
        </View>

        {/* Job Info */}
        <View style={styles.info}>
          <Text style={styles.jobTitle}>{jobTitle}</Text>
          <Text style={styles.meta}>
            {brandName} · {formattedDate}
          </Text>
          <Text style={styles.meta}>Paid to ···· {maskedAccount}</Text>
        </View>

        {/* Amount */}
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>+AED {amount.toLocaleString()}</Text>
          <Text style={styles.feeLabel}>after {feePercent}% fee</Text>
        </View>
      </View>
    </View>
  );
};

export default LatestPayoutCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: correctSize(16),
    paddingVertical: correctSize(16),
    marginTop: correctSize(16),
  },
  heading: {
    fontSize: 16,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(16),
    borderBottomWidth:1,
    borderBottomColor:colors.lightBlue_5,
    paddingBottom:correctSize(14),
    paddingHorizontal:correctSize(16)
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: correctSize(12),
    paddingHorizontal:correctSize(16)
  },
  iconBox: {
    width: correctSize(48),
    height: correctSize(48),
    borderRadius: correctSize(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green_1,
  },
  info: {
    flex: 1,
    gap: correctSize(3),
  },
  jobTitle: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
    lineHeight: correctSize(20),
  },
  meta: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontFamily: Fonts.Inter_Bold,
    color: colors.green_5,
  },
  feeLabel: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginTop: correctSize(2),
  },
});
