import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';
import CustomButton from '../../common/CustomButton';
import { BankAccount } from './types';
import CheckIcon from '../../../assets/svg/applications/CheckIcon';
import CopyIcon from '../../../assets/svg/common/CopyIcon';
import ClockIcon from '../../../assets/svg/Home/ClockIcon';
import BankIcon from '../../../assets/svg/common/BankIcon';
import ShieldIcon from '../../../assets/svg/common/ShieldIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  amount: string;
  account?: BankAccount;
  transactionId: string;
  remainingBalance: number;
  onDone: () => void;
};

const SuccessStep = ({
  amount,
  account,
  transactionId,
  remainingBalance,
  onDone,
}: Props) => {
  const insets = useSafeAreaInsets();
  const bottomInset =
    Platform.OS === 'android' ? correctSize(48) : insets.bottom;

  const handleCopy = () => {
    Clipboard.setString(transactionId);
    if (Platform.OS === 'android')
      ToastAndroid.show('Transaction ID copied', ToastAndroid.SHORT);
    else Alert.alert('', 'Transaction ID copied');
  };

  const infoList = [
    {
      icon: <ClockIcon width={13} height={13} color={colors.blue_9} />,
      label: 'Expected arrival',
      value: '16 Apr 2026',
    },
    {
      icon: <BankIcon width={13} height={13} />,
      label: 'Destination bank',
      value: `${account?.bankName} · ${account?.accountType}`,
    },
    {
      icon: <ShieldIcon width={13} height={13} color={colors.darkGreen_6} />,
      label: 'Status',
      value: 'Processing',
    },
  ];
  return (
    <View
      style={[
        styles.container,
        { paddingBottom: correctSize(20) + bottomInset },
      ]}
    >
      <View style={styles.successCircle}>
        <CheckIcon width={30} height={30} />
      </View>
      <Text style={styles.title}>Withdrawal Submitted!</Text>
      <Text style={styles.amount}>AED {Number(amount).toLocaleString()}</Text>
      <Text style={styles.destination}>
        → {account?.bankName} ···· {account?.maskedNumber}
      </Text>

      <View style={styles.txRow}>
        <View>
          <Text style={styles.txLabel}>Transaction ID</Text>
          <Text style={styles.txId}>{transactionId}</Text>
        </View>
        <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
          <CopyIcon />
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.txCard}>
        {infoList?.map((row, index) => (
          <View
            key={row.label}
            style={[
              styles.infoRow,
              index != infoList.length - 1 && styles.divider,
            ]}
          >
            <View style={styles.infoIcon}>{row.icon}</View>
            <Text style={styles.infoLabel}>{row.label}</Text>
            <Text style={styles.infoValue}>{row.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.balanceRow}>
        <Text style={styles.balanceLabel}>Remaining balance</Text>
        <Text style={styles.balanceValue}>
          AED {remainingBalance.toLocaleString()}
        </Text>
      </View>

      <CustomButton
        title="Done"
        style={styles.btn}
        textStyle={styles.btnText}
        onPress={onDone}
      />
    </View>
  );
};

export default SuccessStep;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: correctSize(20),
    paddingBottom: correctSize(20),
    alignItems: 'center',
  },
  successCircle: {
    width: correctSize(74),
    height: correctSize(74),
    borderRadius: 99,
    backgroundColor: colors.green_rgb,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: correctSize(16),
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.Inter_Bold,
    color: colors.white,
    marginBottom: 6,
  },
  amount: {
    fontSize: 32,
    fontFamily: Fonts.Inter_Bold,
    color: colors.primary,
  },
  destination: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginBottom: correctSize(20),
  },
  txCard: {
    width: '100%',
    backgroundColor: colors.white_rgb8,
    borderRadius: correctSize(16),
    marginBottom: correctSize(12),
    borderWidth: 1,
    borderColor: colors.gray_9,
  },
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.white_rgb8,
    borderRadius: correctSize(16),
    padding: correctSize(16),
    borderWidth: 1,
    borderColor: colors.gray_9,
    marginBottom: correctSize(13),
  },
  txLabel: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginBottom: 3,
  },
  txId: {
    fontSize: 15,
    fontFamily: Fonts.Inter_Bold,
    color: colors.white,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
    backgroundColor: colors.gray_10,
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  copyText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.gray_3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: correctSize(16),
    paddingVertical: correctSize(12),
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_10,
  },
  infoIcon: {
    width: correctSize(28),
    height: correctSize(28),
    borderRadius: correctSize(10),
    backgroundColor: colors.gray_10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: {
    flex: 1,
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  infoValue: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.white,
  },
  balanceRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightYellow2,
    borderRadius: correctSize(16),
    paddingHorizontal: correctSize(14),
    paddingVertical: correctSize(12),
    marginBottom: correctSize(16),
    borderWidth: 1,
    borderColor: colors.darkBrown_4,
  },
  balanceLabel: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  balanceValue: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.primary,
  },
  btn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: correctSize(14),
    width: '100%',
  },
  btnText: { color: colors.white, fontSize: 15, fontFamily: Fonts.Inter_Bold },
});
