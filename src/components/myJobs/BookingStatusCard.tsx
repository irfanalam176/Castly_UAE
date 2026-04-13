import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ShieldIcon from '../../assets/svg/common/ShieldIcon';
import { colors } from '../../utils/colors';
import Badge from '../common/Badge';
import CalendarIcon from '../../assets/svg/common/CalendarIcon';
import CheckCircleIcon from '../../assets/svg/common/CheckCircleIcon';
import { Fonts } from '../../assets/fonts';
import { correctSize } from '../../utils';
import CastlyLogoIcon from '../../assets/svg/common/CastlyLogoIcon';

type PaymentBreakdown = {
  grossPay: number;
  castlyFee: number;
  netPay: number;
};

type BookingStatusCardProps = {
  paymentBreakdown: PaymentBreakdown;
  expectedReleaseDate?: string;
  status: string;
};

const STATUS_ORDER = [
  'APPLIED',
  'SHORTLISTED',
  'BOOKED',
  'SHOOT_COMPLETE',
  'PAYMENT_RELEASED',
];

const JOURNEY_STEPS = [
  { label: 'Applied' },
  { label: 'Shortlisted' },
  { label: 'Booked & Funded' },
  { label: 'Shoot Complete' },
  { label: 'Payment Released' },
];

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const BookingStatusCard = ({
  paymentBreakdown,
  expectedReleaseDate,
  status,
}: BookingStatusCardProps) => {
  const { grossPay, castlyFee, netPay } = paymentBreakdown;
  const feePercent =
    grossPay > 0 ? Math.round((castlyFee / grossPay) * 100) : 0;
  const currentIndex = STATUS_ORDER.indexOf(status?.toUpperCase());

  const steps = JOURNEY_STEPS.map((step, index) => ({
    ...step,
    completed: index <= currentIndex,
    active: index === currentIndex,
  }));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <CastlyLogoIcon width={15} height={15} color={colors.primary} />
          <Text style={styles.headerTitle}>Castly Escrow</Text>
        </View>
        <Badge
          title="Funds Locked 🔒"
          containerStyle={styles.badge}
          textStyle={styles.badgeText}
        />
      </View>

      

      {/* Amount Card */}
      <View style={styles.amountCard}>
        <Text style={styles.securedLabel}>Secured in Escrow</Text>
        <Text style={styles.amountText}>AED {grossPay.toLocaleString()}</Text>
        <Text style={styles.amountSubtext}>AED held securely by Castly</Text>
      </View>

      {/* Pay Breakdown */}
      <View style={styles.breakdown}>
        <View style={styles.row}>
          <Text style={styles.td}>Gross Pay</Text>
          <Text style={styles.tdValue}>AED {grossPay.toLocaleString()}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.td}>Castly Fee ({feePercent}%)</Text>
          <Text style={[styles.tdValue, styles.feeText]}>
            -AED {castlyFee.toLocaleString()}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.td}>Your Net Pay</Text>
          <Text style={[styles.tdValue, styles.netPayText]}>
            AED {netPay.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Expected Release */}
      {expectedReleaseDate && (
        <View style={styles.dateContainer}>
          <CalendarIcon width={12} height={12} color={colors.darkGreen_6} />
          <Text style={styles.date}>
            Expected release:{' '}
            <Text style={styles.dateBold}>
              {formatDate(expectedReleaseDate)}
            </Text>
          </Text>
        </View>
      )}

      {/* Escrow Journey */}
      <Text style={styles.heading}>ESCROW JOURNEY</Text>

      <View style={styles.timeline}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <View key={step.label} style={styles.timelineRow}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    step.completed
                      ? styles.iconCompleted
                      : styles.iconIncomplete,
                  ]}
                >
                  {step.completed ? (
                    <CheckCircleIcon
                      width={11}
                      height={11}
                      color={colors.white}
                    />
                  ) : (
                    <View style={styles.innerDot} />
                  )}
                </View>
                {!isLast && (
                  <View
                    style={[
                      styles.line,
                      step.completed
                        ? styles.lineCompleted
                        : styles.lineIncomplete,
                    ]}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  step.active && styles.activeStepLabel,
                  !step.completed && styles.inactiveStepLabel,
                ]}
              >
                {step.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default BookingStatusCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkgray_1,
    borderRadius: correctSize(20),
    padding: correctSize(16),
    marginBottom: correctSize(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(16),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(6),
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.primary,
  },
  badge: {
    backgroundColor: colors.green_1,
    borderRadius: 20,
    paddingHorizontal: correctSize(10),
    paddingVertical: correctSize(4),
    borderWidth: 0.5,
    borderColor: '#374151',
  },
  badgeText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Medium,
    color: colors.green_5,
  },
  amountCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: correctSize(12),
    padding: correctSize(14),
    marginBottom: correctSize(16),
  },
  securedLabel: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginBottom: correctSize(4),
  },
  amountText: {
    fontSize: 28,
    fontFamily: Fonts.Inter_Bold,
    color: colors.primary,
    lineHeight: correctSize(36),
  },
  amountSubtext: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginTop: correctSize(2),
  },
  breakdown: {
    marginBottom: correctSize(12),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: correctSize(10),
  },
  divider: {
    height: 0.5,
    backgroundColor: '#1F2937',
  },
  td: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  tdValue: {
    fontSize: 13,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.white,
  },
  feeText: {
    color: colors.red,
  },
  netPayText: {
    color: colors.darkGreen_6,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(6),
    backgroundColor: 'rgba(52, 211, 153, 0.10)',
    borderRadius: correctSize(14),
    paddingHorizontal: correctSize(12),
    paddingVertical: correctSize(10),
    marginBottom: correctSize(20),
    borderWidth: 1,
    borderColor: colors.darkGreen_6,
  },
  date: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkGreen_6,
  },
  dateBold: {
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkGreen_6,
  },
  heading: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Bold,
    color: colors.gray_3,
    letterSpacing: 1,
    marginBottom: correctSize(12),
  },
  timeline: {
    paddingLeft: correctSize(4),
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: correctSize(12),
  },
  timelineLeft: {
    alignItems: 'center',
    width: correctSize(20),
  },
  iconContainer: {
    width: correctSize(20),
    height: correctSize(20),
    borderRadius: correctSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCompleted: {
    backgroundColor: colors.darkGreen_6,
  },
  iconIncomplete: {
    borderWidth: 1.5,
    borderColor: '#374151',
    backgroundColor: 'transparent',
  },
  innerDot: {
    width: correctSize(6),
    height: correctSize(6),
    borderRadius: correctSize(3),
    backgroundColor: '#374151',
  },
  line: {
    width: 1.5,
    flex: 1,
    minHeight: correctSize(24),
  },
  lineCompleted: {
    backgroundColor: colors.darkGreen_6,
  },
  lineIncomplete: {
    backgroundColor: '#374151',
  },
  stepLabel: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Medium,
    color: colors.white,
    paddingTop: correctSize(2),
    paddingBottom: correctSize(20),
  },
  activeStepLabel: {
    fontFamily: Fonts.Inter_Bold,
    color: colors.white,
  },
  inactiveStepLabel: {
    color: colors.gray_4,
  },
});
