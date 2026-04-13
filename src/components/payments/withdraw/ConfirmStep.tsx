import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';
import CustomButton from '../../common/CustomButton';
import { BankAccount } from './types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckIcon from '../../../assets/svg/applications/CheckIcon';
import InfoIcon from '../../../assets/svg/common/InfoIcon';

const TIMELINE_STEPS = [
  { label: 'Withdrawal requested', sub: 'Today', done: true },
  { label: 'Castly processes transfer', sub: '1 business day', done: false },
  { label: 'Bank receives funds', sub: '2–3 business days', done: false },
  { label: 'Funds in your account', sub: '16 Apr 2026', done: false },
];

type Props = {
  amount: string;
  account?: BankAccount;
  onConfirm: () => void;
};

const ConfirmStep = ({ amount, account, onConfirm }: Props) => {
  const insets = useSafeAreaInsets();
  const bottomInset =
    Platform.OS === 'android' ? correctSize(48) : insets.bottom;
  return (
    <View
      style={[
        styles.container,
        { paddingBottom: correctSize(20) + bottomInset },
      ]}
    >
      <Text style={styles.withdrawingLabel}>Withdrawing</Text>
      <Text style={styles.amount}>AED {Number(amount).toLocaleString()}</Text>
      <Text style={styles.noFees}>✓ No fees · You receive the full amount</Text>

      <View style={styles.breakdownCard}>
        {[
          {
            label: 'Amount',
            value: `AED ${Number(amount).toLocaleString()}`,
            color: colors.white,
          },
          { label: 'Withdrawal Fee', value: 'AED 0', color: colors.white },
          {
            label: 'You Receive',
            value: `AED ${Number(amount).toLocaleString()}`,
            color: colors.darkGreen_6,
          },
          {
            label: 'To Account',
            value: `${account?.bankName} ···· ${account?.maskedNumber}`,
            color: colors.white,
          },
          { label: 'Estimated by', value: '16 Apr 2026', color: colors.white },
        ].map((row, i, arr) => (
          <View key={row.label}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={[styles.rowValue, { color: row.color }]}>
                {row.value}
              </Text>
            </View>
            {i < arr.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>

      <View style={styles.timelineCard}>
        <Text style={styles.timelineHeading}>TRANSFER TIMELINE</Text>
        {TIMELINE_STEPS.map((step, index) => {
          const isLast = index === TIMELINE_STEPS.length - 1;
          return (
            <View key={step.label} style={styles.timelineRow}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.timelineDot,
                    step.done && styles.timelineDotDone,
                  ]}
                >
                  {step.done && <CheckIcon color={colors.darkgray_1}/>}
                </View>
                {!isLast && (
                  <View
                    style={[
                      styles.timelineLine,
                      step.done && styles.timelineLineDone,
                    ]}
                  />
                )}
              </View>
              <View style={styles.timelineInfo}>
                <Text
                  style={[
                    styles.timelineLabel,
                  ]}
                >
                  {step.label}
                </Text>
                <Text style={styles.timelineSub}>{step.sub}</Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.warning}>
        <InfoIcon color={colors.orange_4}/>
        <Text style={styles.warningText}>
          Once submitted, withdrawals cannot be reversed. Ensure your bank
          details are correct before confirming.
        </Text>
      </View>

      <CustomButton
        title="Confirm Withdrawal"
        style={styles.btn}
        textStyle={styles.btnText}
        onPress={onConfirm}
      />
    </View>
  );
};

export default ConfirmStep;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: correctSize(20),
    paddingBottom: correctSize(20),
  },
  withdrawingLabel: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    textAlign: 'center',
    marginBottom: 6,
  },
  amount: {
    fontSize: 52,
    fontFamily: Fonts.Inter_Bold,
    color: colors.primary,
    textAlign: 'center',
  },
  noFees: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkGreen_6,
    textAlign: 'center',
    marginBottom: correctSize(20),
  },
  breakdownCard: {
    backgroundColor: colors.gray_11,
    borderRadius: correctSize(14),
    paddingVertical: correctSize(14),
    marginBottom: correctSize(16),
    borderWidth: 1,
    borderColor: colors.gray_10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: correctSize(10),
    paddingHorizontal: correctSize(16),
  },
  rowLabel: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  rowValue: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
  },
  divider: {
    height: 0.5,
    backgroundColor: colors.gray_10,
  },
  timelineHeading: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Bold,
    color: colors.gray_3,
    letterSpacing: 1,
    marginBottom: correctSize(16),
  },
  timelineCard: {
    backgroundColor: colors.gray_11,
    borderRadius: correctSize(14),
    padding: correctSize(14),
    marginBottom: correctSize(14),
    borderWidth: 1,
    borderColor: colors.gray_10,
  },
  timelineRow: { flexDirection: 'row', gap: correctSize(12) },
  timelineLeft: { alignItems: 'center', width: 20 },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.white_rgb11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotDone: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timelineLine: {
    width: 1.5,
    flex: 1,
    minHeight: correctSize(20),
    backgroundColor: colors.white_rgb9,
    marginVertical: 2,
  },
  timelineLineDone: { backgroundColor: colors.primary },
  timelineInfo: { flex: 1, paddingBottom: correctSize(16) },
  timelineLabel: {
    fontSize: 12,
    color: colors.white,
    fontFamily: Fonts.Inter_SemiBold,
  },
  timelineSub: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray,
    marginTop: 2,
  },
  warning: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.lightYellow3,
    borderWidth:1,
    borderColor:colors.orange_5,
    borderRadius: correctSize(10),
    padding: correctSize(12),
    marginBottom: correctSize(16),
  },
  warningText: {
    flex: 1,
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.orange_4,
    lineHeight: 16,
  },
  btn: { backgroundColor: colors.primary, borderRadius: correctSize(14) },
  btnText: {
    color: colors.darkgray_1,
    fontSize: 15,
    fontFamily: Fonts.Inter_Bold,
  },
});
