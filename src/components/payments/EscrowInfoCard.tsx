import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import ShieldIcon from '../../assets/svg/common/ShieldIcon';

const ESCROW_STEPS = [
  { step: 1, label: 'Booked' },
  { step: 2, label: 'Funded' },
  { step: 3, label: 'Shoot' },
  { step: 4, label: 'Confirmed' },
  { step: 5, label: 'Paid ✓' },
];

const ACTIVE_STEPS = [1, 2];

const EscrowInfoCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconBox}>
          <ShieldIcon width={18} height={18} color={colors.primary} />
        </View>

        <View style={styles.text}>
          <Text style={styles.title}>How Castly Escrow Works</Text>
          <Text style={styles.description}>
            When a brand books you, they deposit your full fee into Castly
            Escrow. Funds are held securely until the shoot completes and both
            parties confirm. You receive net pay (minus 10% Castly fee) within
            14 business days.
          </Text>
        </View>
      </View>

      <View style={styles.stepsRow}>
        {ESCROW_STEPS.map((item, index) => {
          const isActive = ACTIVE_STEPS.includes(item.step);
          const isLast = index === ESCROW_STEPS.length - 1;
          return (
            <View key={item.step} style={styles.stepWrapper}>
              <View style={styles.stepItem}>
                <View
                  style={[
                    styles.stepCircle,
                    isActive && styles.stepCircleActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.stepNumber,
                      isActive && styles.stepNumberActive,
                    ]}
                  >
                    {item.step}
                  </Text>
                </View>
                <Text
                  style={[styles.stepLabel, isActive && styles.stepLabelActive]}
                >
                  {item.label}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default EscrowInfoCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkgray_1,
    borderRadius: correctSize(16),
    padding: correctSize(16),
    marginBottom:correctSize(16)
  },
  text: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    gap: correctSize(12),
  },
  header: {
    flexDirection: 'row',
    gap: correctSize(10),
    marginBottom: correctSize(10),
  },
  iconBox: {
    width: correctSize(40),
    height: correctSize(40),
    borderRadius: correctSize(10),
    backgroundColor: colors.darkBrown_3,
    borderWidth: 1,
    borderColor: colors.darkBrown_4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.primary,
    flex: 1,
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    lineHeight: correctSize(18),
    marginBottom: correctSize(16),
    flexShrink: 1,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepItem: {
    alignItems: 'center',
    gap: correctSize(4),
    flex:1,
  },
  stepCircle: {
    width: correctSize(26),
    height: correctSize(26),
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: colors.primary,
  },
  stepNumber: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Bold,
    color: colors.gray_3,
  },
  stepNumberActive: {
    color: colors.darkgray_1,
  },
  stepLabel: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  stepLabelActive: {
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.white,
  },
});
