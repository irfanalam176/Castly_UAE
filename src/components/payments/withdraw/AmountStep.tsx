import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Platform} from 'react-native';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';
import CustomButton from '../../common/CustomButton';
import ShieldIcon from '../../../assets/svg/common/ShieldIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const QUICK_AMOUNTS = ['500', '1K', '2.5K', '5K', 'All'];

const parseQuickAmount = (val: string, balance: number): string => {
  if (val === 'All') return String(balance);
  if (val.endsWith('K')) return String(parseFloat(val) * 1000);
  return val;
};

type Props = {
  balance: number;
  amount: string;
  setAmount: (v: string) => void;
  onContinue: () => void;
};

const AmountStep = ({ balance, amount, setAmount, onContinue }: Props) => {
      const insets = useSafeAreaInsets()
  const bottomInset = Platform.OS === 'android' ? correctSize(48) : insets.bottom
  const isConfirmed = Number(amount) >= 500 && Number(amount) <= balance;

  const handleKey = (key: string) => {
    if (key === '⌫') setAmount(amount.slice(0, -1));
    else setAmount(amount === '0' ? key : amount + key);
  };

  return (
    <View style={[styles.container, { paddingBottom: correctSize(20) + bottomInset }]}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available to Withdraw</Text>
        <Text style={styles.balanceAmount}>AED {balance.toLocaleString()}</Text>
        <Text style={styles.balanceSub}>Released from completed jobs</Text>
      </View>

      <View style={styles.amountRow}>
        <Text style={styles.aedLabel}>AED</Text>
        <Text style={styles.amountText}>{amount || '0'}</Text>
      </View>
      {isConfirmed && <Text style={styles.confirmed}>✓ Amount confirmed</Text>}

      <View style={styles.quickRow}>
        {QUICK_AMOUNTS.map(q => {
          const isActive = parseQuickAmount(q, balance) === amount;
          return (
            <TouchableOpacity
              key={q}
              style={[styles.quickBtn, isActive && styles.quickBtnActive]}
              onPress={() => setAmount(parseQuickAmount(q, balance))}
            >
              <Text
                style={[styles.quickText, isActive && styles.quickTextActive]}
              >
                {q}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.numpad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map(
          (k, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.numKey, k === '' && styles.numKeyEmpty]}
              onPress={() => k && handleKey(k)}
              disabled={k === ''}
            >
              <Text style={styles.numKeyText}>{k}</Text>
            </TouchableOpacity>
          ),
        )}
      </View>

      <View style={styles.feeRow}>
        <ShieldIcon color={colors.darkGreen_6} width={13} height={13} />
        <Text style={styles.feeText}>
          <Text style={styles.feeBold}>No withdrawal fee.</Text> Castly charges
          0% on fund withdrawals. Your bank may apply standard IBAN transfer
          fees.
        </Text>
      </View>

      <CustomButton
        title="Continue ›"
        style={[styles.btn, !isConfirmed && styles.btnDisabled]}
        textStyle={styles.btnText}
        disabled={!isConfirmed}
        onPress={onContinue}
      />
    </View>
  );
};

export default AmountStep;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: correctSize(20),
    paddingBottom: correctSize(20),
  },
  balanceCard: {
    backgroundColor: colors.white_rgb8,
    borderWidth: 1,
    borderColor: colors.white_rgb9,
    borderRadius: correctSize(14),
    padding: correctSize(14),
    alignItems: 'center',
    marginBottom: correctSize(20),
  },
  balanceLabel: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 22,
    fontFamily: Fonts.Inter_Bold,
    color: colors.primary,
  },
  balanceSub: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 2,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 6,
  },
  aedLabel: {
    fontSize: 18,
    fontFamily: Fonts.Inter_Bold,
    color: colors.white,
    marginBottom: 6,
    marginRight: 4,
  },
  amountText: {
    fontSize: 56,
    fontFamily: Fonts.Inter_Bold,
    color: colors.primary,
    lineHeight: 64,
  },
  confirmed: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkGreen_6,
    textAlign: 'center',
    marginBottom: 12,
  },
  quickRow: {
    flexDirection: 'row',
    gap: correctSize(8),
    marginBottom: correctSize(16),
    justifyContent: 'center',
  },
  quickBtn: {
    paddingHorizontal: correctSize(14),
    paddingVertical: correctSize(8),
    borderRadius: correctSize(14),
    backgroundColor: colors.white_rgb8,
    borderWidth: 1,
    borderColor: colors.white_rgb9,
  },
  quickBtnActive: { backgroundColor: colors.primary },
  quickText: {
    fontSize: 13,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.white,
  },
  quickTextActive: { color: colors.darkgray_1 },
  numpad: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: correctSize(8),
    marginBottom: correctSize(16),
  },
  numKey: {
    width: '30%',
    paddingVertical: correctSize(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray_10,
    borderRadius: correctSize(16),
  },
  numKeyEmpty: { opacity: 0 },
  numKeyText: {
    fontSize: 22,
    fontFamily: Fonts.Inter_Bold,
    color: colors.white,
  },
  feeRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: correctSize(16),
    alignItems: 'flex-start',
    backgroundColor: colors.gray_11,
    padding: correctSize(12),
    borderRadius: correctSize(14),
  },
  feeText: {
    flex: 1,
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    lineHeight: 16,
  },
  feeBold: { fontFamily: Fonts.Inter_Bold, color: colors.white },
  btn: { backgroundColor: colors.primary, borderRadius: correctSize(14) },
  btnDisabled: { opacity: 0.4 },
  btnText: {
    color: colors.darkgray_1,
    fontSize: 15,
    fontFamily: Fonts.Inter_Bold,
  },
});
