import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';
import CustomButton from '../../common/CustomButton';
import { BankAccount } from './types';
import BankIcon from '../../../assets/svg/common/BankIcon';
import CheckCircleIcon from '../../../assets/svg/common/CheckCircleIcon';
import ClockIcon from '../../../assets/svg/Home/ClockIcon';
import ShieldIcon from '../../../assets/svg/common/ShieldIcon';
import MoneyIcon from '../../../assets/svg/common/MoneyIcon';

type Props = {
  amount: string;
  accounts: BankAccount[];
  selectedId: string;
  setSelectedId: (id: string) => void;
  onContinue: () => void;
};

const AccountStep = ({
  amount,
  accounts,
  selectedId,
  setSelectedId,
  onContinue,
}: Props) => {
  const infoCardList = [
    {
      icon: <ClockIcon width={14} height={14} color={colors.blue_9} />,
      label: 'Processing time',
      value: '2–3 business days',
    },
    {
      icon: <ShieldIcon width={14} height={14} color={colors.darkGreen_6} />,
      label: 'Withdrawal fee',
      value: 'None (AED 0)',
    },
    {
      icon: <MoneyIcon />,
      label: 'You receive',
      value: `AED ${Number(amount).toLocaleString()}`,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sending}>
        Sending{' '}
        <Text style={styles.sendingAmount}>
          AED {Number(amount).toLocaleString()}
        </Text>{' '}
        to:
      </Text>

      {accounts.map(acc => {
        const isSelected = selectedId === acc.id;
        return (
          <TouchableOpacity
            key={acc.id}
            style={[styles.accountCard, isSelected && styles.accountCardActive]}
            onPress={() => setSelectedId(acc.id)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.bankIcon,
                isSelected && { backgroundColor: colors.white_rgb2 },
              ]}
            >
              <BankIcon color={isSelected ? colors.primary : ''} />
            </View>
            <View style={styles.accountInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.bankName}>{acc.bankName}</Text>
                {acc.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
                <CheckCircleIcon
                  fill={colors.darkGreen3}
                  color={colors.white}
                />
              </View>
              <Text style={styles.accountSub}>
                {acc.accountType} · ···· {acc.maskedNumber}
              </Text>
              <Text style={styles.iban}>{acc.iban}</Text>
            </View>
            <View style={[styles.radio, isSelected && styles.radioActive]}>
              {isSelected && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.addCard}>
        <View style={styles.addIcon}>
          <Text style={styles.addPlus}>+</Text>
        </View>
        <View>
          <Text style={styles.addLabel}>Add New Bank Account</Text>
          <Text style={styles.addSub}>UAE IBAN · Verified in 1–2 days</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.infoCard}>
        {infoCardList?.map(row => (
          <View key={row.label} style={styles.infoRow}>
            <Text style={styles.infoIcon}>{row.icon}</Text>
            <Text style={styles.infoLabel}>{row.label}</Text>
            <Text style={[styles.infoValue]}>
              {row.value}
            </Text>
          </View>
        ))}
      </View>

      <CustomButton
        title="Review Withdrawal"
        arrow
        style={styles.btn}
        textStyle={styles.btnText}
        onPress={onContinue}
      />
    </View>
  );
};

export default AccountStep;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: correctSize(20),
    paddingBottom: correctSize(20),
  },
  sending: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: correctSize(14),
  },
  sendingAmount: {
    fontFamily: Fonts.Inter_Bold,
    color: colors.primary,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(12),
    backgroundColor: colors.white_rgb10,
    borderRadius: correctSize(16),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: correctSize(14),
    marginBottom: correctSize(10),
  },
  accountCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.lightYellow2,
  },
  bankIcon: {
    width: correctSize(40),
    height: correctSize(40),
    borderRadius: correctSize(10),
    backgroundColor: colors.gray_10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountInfo: { flex: 1, gap: 3 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  bankName: { fontSize: 13, fontFamily: Fonts.Inter_Bold, color: colors.white },
  defaultBadge: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  defaultText: {
    fontSize: 9,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  verifiedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.darkGreen_6,
  },
  accountSub: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  iban: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: { borderColor: colors.primary },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(12),
    borderRadius: correctSize(16),
    borderWidth: 1,
    borderColor: colors.gray_8,
    borderStyle: 'dashed',
    padding: correctSize(14),
    marginBottom: correctSize(14),
  },
  addIcon: {
    width: correctSize(40),
    height: correctSize(40),
    borderRadius: correctSize(10),
    backgroundColor: colors.gray_10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPlus: { fontSize: 20, color: colors.white },
  addLabel: {
    fontSize: 13,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.white,
  },
  addSub: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: 'rgba(255,255,255,0.4)',
  },
  infoCard: {
    backgroundColor: colors.gray_11,
    borderRadius: correctSize(16),
    padding: correctSize(12),
    gap: correctSize(8),
    marginBottom: correctSize(16),
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoIcon: { fontSize: 14, width: 20 },
  infoLabel: {
    flex: 1,
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: 'rgba(255,255,255,0.5)',
  },
  infoValue: { 
    fontSize: 12, 
    fontFamily: Fonts.Inter_SemiBold,
    color:colors.white
 },
  btn: { 
    backgroundColor: colors.primary, 
    borderRadius: correctSize(14) 
},
  btnText: {
    color: colors.darkgray_1,
    fontSize: 15,
    fontFamily: Fonts.Inter_Bold,
  },
});
