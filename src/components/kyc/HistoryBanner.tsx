import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import WalletIcon from '../vectorIcons/WalletIcon';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import ArrowUp from '../../assets/svg/kyc/ArrowUp';
import CustomButton from '../common/CustomButton';
import ArrowDown from '../../assets/svg/kyc/ArrowDown';
import FileIcon from '../../assets/svg/kyc/FileIcon';
import EyeIcon from '../../assets/svg/applications/EyeIcon';

interface BalanceCardProps {
  amount?: string;
  time?: string;
}
const HistoryBanner = ({ time, amount }: BalanceCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Available Balance</Text>

        <View style={styles.iconContainer}>
          <EyeIcon color={colors.white} width={15} height={15} />
        </View>
      </View>
      <View>
        <Text style={styles.amount}>AED {amount}</Text>
      </View>
      <Text style={styles.footerText}>Last updated: {time}</Text>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <CustomButton
            title="Withdraw"
            style={styles.withdrawButton}
            textStyle={styles.withdrawButtonText}
            icon={
              <ArrowDown color={colors.darkgray_1} width={10.5} height={14} />
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomButton
            title="Statement"
            style={styles.statementButton}
            textStyle={styles.statementButtonText}
            icon={<FileIcon color={colors.white} width={10.5} height={14} />}
          />
        </View>
      </View>
    </View>
  );
};

export default HistoryBanner;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: correctSize(12),
    marginTop: correctSize(24),
  },
  container: {
    backgroundColor: colors.darkgray,
    borderRadius: 24,
    padding: correctSize(25),
    borderWidth: 1,
    borderColor: colors.white_5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.1,
    shadowRadius: 18,

    elevation: 12,
  },
  iconContainer: {
    width: correctSize(32),
    height: correctSize(32),
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white_6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(16),
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    color: colors.lightBlue_3,
    opacity: 0.8,
  },
  amount: {
    fontSize: 36,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.white,
    marginBottom: correctSize(6),
  },
  footerText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.lightBlue_3,
  },
  withdrawButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    height: correctSize(44),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: correctSize(10),
    paddingHorizontal: correctSize(12),
  },
  withdrawButtonText: {
    fontSize: 16,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  statementButton: {
    backgroundColor: colors.white_6,
    borderRadius: 12,
    height: correctSize(44),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: correctSize(10),
    paddingHorizontal: correctSize(12),
  },
  statementButtonText: {
    fontSize: 16,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.white,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
