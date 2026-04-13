import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ShieldIcon from '../../assets/svg/applications/ShieldIcon';
import DotIcon from '../../assets/svg/applications/DotIcon';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';
import AmountCard from './AmountCard';
import CustomButton from '../common/CustomButton';
import HourGlassIcon from '../../assets/svg/applications/HourGlassIcon';
import ClockFill from '../../assets/svg/applications/ClockFill';

interface PendingPaymentCardProps {
  amount?: string;

  JobReference?: string;
  brand?: string;
  date?: string;
  paymentDue?: string;
}

const PendingPaymentCard = ({
  amount,
  JobReference,
  brand,
  date,
  paymentDue,
}: PendingPaymentCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <LinearGradient
            colors={[colors.orange, colors.orange_2]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            locations={[0, 0.7071]}
            style={styles.iconContainer}
          >
            <ClockFill width={18} height={18} color={colors.white} />
          </LinearGradient>

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Payment Pending</Text>
            <Text style={styles.description}>Awaiting brand action</Text>
          </View>

          <View style={styles.status}>
            <DotIcon width={8} height={8} color={colors.orange} />
            <Text style={styles.statusLabel}>Pending</Text>
          </View>
        </View>

        <AmountCard
          gradientColors={[colors.lightYellow, colors.light_red2]}
          title={'Pending Amount'}
          amount={amount}
          description="Waiting for brand payment"
          icon={<HourGlassIcon width={9} height={12} />}
          descriptionColor={colors.darkBrown_1}
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
            <Text style={styles.label}>Job Date</Text>
            <Text style={styles.value}>{date}</Text>
          </View>

          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <Text style={styles.label}>Payment Due</Text>
            <Text style={[styles.value, { color: colors.orange_1 }]}>
              {paymentDue}
            </Text>
          </View>
        </View>

        <View style={styles.progressRow}>
          <Text style={styles.progressText}>Payment Progress</Text>
          <Text style={[styles.progressText, { color: colors.orange_1 }]}>
            Awaiting
          </Text>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressThumb, { width: '30%' }]} />
        </View>

        <Text style={styles.footerText}>
          Brand has been notified. Payment typically processed within 48 hours.
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.btn}>
          <CustomButton
            title="Send Reminder"
            style={styles.whiteButton}
            textStyle={styles.whiteButtonText}
          />
        </View>

        <View style={styles.btn}>
          <CustomButton
            title="Message Brand"
            style={styles.primaryButton}
            textStyle={styles.primaryButtonText}
          />
        </View>
      </View>
    </View>
  );
};

export default PendingPaymentCard;
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
    backgroundColor: colors.lightYellow,
    borderRadius: 99,
    paddingVertical: correctSize(10),
    paddingHorizontal: correctSize(12),
  },
  statusLabel: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkBrown_1,
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
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: correctSize(16),
    marginBottom: correctSize(8),
  },
  progressText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray,
  },
  progressTrack: {
    height: correctSize(8),
    backgroundColor: colors.gray,
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressThumb: {
    height: correctSize(8),
    backgroundColor: colors.orange_1,
  },
  footerText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    lineHeight: 16,
    marginTop: correctSize(8),
  },

  whiteButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 12,
    height: correctSize(48),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: correctSize(10),
    paddingHorizontal: correctSize(16),
  },
  whiteButtonText: {
    color: colors.darkgray,
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    lineHeight: 20, // prevents text cutting
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    height: correctSize(48),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: correctSize(10),
    paddingHorizontal: correctSize(16),
  },
  primaryButtonText: {
    color: colors.black,
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    lineHeight: 20, // prevents text cutting
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
