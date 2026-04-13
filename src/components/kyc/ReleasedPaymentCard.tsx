import { View, Text, StyleSheet, Platform } from 'react-native';
import React from 'react';
import ShieldIcon from '../../assets/svg/applications/ShieldIcon';
import DotIcon from '../../assets/svg/applications/DotIcon';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';
import AmountCard from './AmountCard';
import InfoBanner from '../common/InfoBanner';
import InfoCard from './InfoCard';
import InfoIcon from '../../assets/svg/portfolio/InfoIcon';
import CustomButton from '../common/CustomButton';
import LockIcon from '../../assets/svg/applications/LockIcon';
import CheckCircleIcon from '../../assets/svg/applications/CheckCircleIcon';
import CheckIcon from '../../assets/svg/applications/CheckIcon';
import DownloadIcon from '../../assets/svg/chat/DownloadIcon';
import CheveronDown from '../../assets/svg/kyc/CheveronDown';

interface ReleasedPaymentCardProps {
  title?: string;
  amount?: string;

  JobReference?: string;
  brand?: string;
  date?: string;
  bankAccount?: string;
  platformFee?: string;
}

const ReleasedPaymentCard = ({
  amount,
  JobReference,
  brand,
  date,
  bankAccount,
  platformFee,
}: ReleasedPaymentCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <LinearGradient
            colors={[colors.gray_1, colors.gray_1]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            locations={[0, 0.7071]}
            style={styles.iconContainer}
          >
            <CheckCircleIcon color={colors.white} width={18} height={18} />
          </LinearGradient>

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Payment Released</Text>
            <Text style={styles.description}>Transferred to your account</Text>
          </View>

          <View style={styles.status}>
            <CheckIcon color={colors.gray_1} />
            <Text style={styles.statusLabel}>Completed</Text>
          </View>
        </View>

        <AmountCard
          gradientColors={[colors.lightBlue_2, colors.lightBlue_4]}
          title={'Released Amount'}
          amount={amount}
          description="Successfully transferred"
          icon={<CheckCircleIcon color={colors.gray_1} />}
          descriptionColor={colors.gray_1}
        />

        <View>
          <View style={styles.row}>
            <Text style={styles.label}>Job Reference</Text>
            <Text style={styles.value}>{JobReference}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Brand</Text>
            <Text style={styles.value}>{brand}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Release Date</Text>
            <Text style={styles.value}>{date}</Text>
          </View>

          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <Text style={styles.label}>Bank Account</Text>
            <Text style={[styles.value]}>{bankAccount}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableTitle}>Payment Breakdown</Text>
            <CheveronDown />
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Job Payment</Text>
            <Text style={styles.tableValue}>AED {amount}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Platform Fee</Text>
            <Text style={styles.tableValue}>{platformFee}</Text>
          </View>

          <View style={[styles.tableRow, styles.tableFooter]}>
            <Text style={styles.footerLabel}>Total Received</Text>
            <Text style={styles.footerValue}>
              AED {Number(amount) - Number(platformFee)}
            </Text>
          </View>
        </View>

        <InfoCard
          title="Payment Successfully Transferred"
          titleColor={colors.darkGreen_5}
          description={`Funds have been deposited to your registered bank account. Please allow 1-2 business days for it to reflect.`}
          icon={<CheckCircleIcon color={colors.green} />}
          bgColor={colors.green_1}
          iconBg={colors.lightGreen_1}
          descriptionColor={colors.green_5}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.btn}>
          <CustomButton
            title="Receipt"
            icon={<DownloadIcon color={colors.darkgray} />}
            style={styles.receiptButton}
            textStyle={styles.receiptButtonText}
          />
        </View>

        <View style={[styles.btn, styles.btnShadow]}>
          <CustomButton
            title="Rate Brand"
            style={styles.rateButton}
            textStyle={styles.rateButtonText}
          />
        </View>
      </View>
    </View>
  );
};

export default ReleasedPaymentCard;
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.white_1,

    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    // Android
    elevation: 2,
    backgroundColor: colors.lightBlue_5,
    overflow: 'hidden',
    marginBottom: correctSize(17),
  },
  innerContainer: {
    padding: correctSize(24),
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    marginTop: correctSize(4),
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    backgroundColor: colors.lightBlue_2,
    borderRadius: 99,
    height: correctSize(28),
    paddingHorizontal: correctSize(10),
  },
  statusLabel: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.gray_1,
  },
  iconContainer: {
    width: correctSize(40),
    height: correctSize(40),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: correctSize(8),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: correctSize(20),
    borderBottomWidth: 1,
    borderBottomColor: colors.white_1,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
  },
  value: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 14,
    color: colors.darkgray_1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(7),
    padding: correctSize(17),
    paddingHorizontal: correctSize(24),
  },
  btn: {
    flex: 1,
    borderRadius: 12,
  },
  btnShadow: {
    shadowColor: Platform.OS === 'ios' ? colors.lightBlue_10 : colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    // Android
    elevation: 5,
  },
  table: {
    backgroundColor: colors.lightBlue_2,
    borderRadius: 12,
    padding: correctSize(16),
    marginBottom: correctSize(16),
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: correctSize(12),
  },
  tableTitle: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: correctSize(10),
  },
  tableLabel: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
  },
  tableValue: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
  },
  tableFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.lightBlue_3,
    paddingTop: correctSize(10),
  },
  footerLabel: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  footerValue: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.gray_1,
  },
  receiptButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 12,
    // height: correctSize(48),
    paddingVertical: correctSize(12),
    paddingHorizontal: correctSize(16),
  },
  receiptButtonText: {
    color: colors.darkgray,
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  rateButton: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    // height: correctSize(48),
    paddingVertical: correctSize(12),
    paddingHorizontal: correctSize(16),
  },
  rateButtonText: {
    color: colors.black,
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    textTransform: 'capitalize',
  },
});
