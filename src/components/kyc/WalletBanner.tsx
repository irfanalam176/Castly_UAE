import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import WalletIcon from '../vectorIcons/WalletIcon';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import ArrowUp from '../../assets/svg/kyc/ArrowUp';

interface WalletBannerProps {
  amount?: string;
  points?: string;
  status?: string;
  statusData?: string;
}
const WalletBanner = ({
  status,
  statusData,
  amount,
  points,
}: WalletBannerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Available Balance</Text>
        <WalletIcon />
      </View>
      <View style={styles.row}>
        <Text style={styles.amount}>AED {amount}</Text>
        <Text style={styles.points}>{points}</Text>
      </View>
      <View style={[styles.row, styles.tagRow]}>
        <View style={styles.tag}>
          <ArrowUp />
          <Text style={styles.tagText}>{statusData}</Text>
        </View>
        <Text style={styles.smText}>vs last month</Text>
      </View>
    </View>
  );
};

export default WalletBanner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_6,
    borderRadius: 24,
    padding: correctSize(25),
    borderWidth: 1,
    borderColor: colors.white_5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(12),
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    color: colors.white,
    opacity: 0.8,
  },
  amount: {
    fontSize: 36,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.white,
  },
  points: {
    fontSize: 18,
    fontFamily: Fonts.Inter_Medium,
    color: colors.white,
    opacity: 0.6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(20),
  },
  tag: {
    paddingHorizontal: correctSize(12),
    paddingVertical: correctSize(8),
    borderRadius: 99,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lighGreen_4,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.primary,
    marginLeft: correctSize(6),
  },
  smText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.white,
    opacity: 0.8,
  },
  tagRow: {
    gap: correctSize(8),
    marginTop: correctSize(24),
  },
});
