import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import BankIcon from '../../assets/svg/kyc/BankIcon';
import { Fonts } from '../../assets/fonts';
import CheckCircleIcon from '../../assets/svg/applications/CheckCircleIcon';

interface BankRadioProps {
  bankName?: string;
  accountNumber?: string;
  selected?: boolean;
  onPress?: () => void;
}
const BankRadio = ({
  bankName,
  accountNumber,
  selected,
  onPress
}: BankRadioProps) => {
  const maskAccountNumber = (value?: string) => {
    if (!value) return '';
    const last4 = value.slice(-4);
    return '•••• •••• •••• ' + last4;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          borderColor: selected ? colors.gray_1 : colors.gray,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <BankIcon width={18} height={18} />
      </View>

      <View style={styles.row}>
        <Text style={styles.bankName}>{bankName}</Text>
        <Text style={styles.accountNumber}>
          {maskAccountNumber(accountNumber)}
        </Text>
      </View>

      {selected ? (
        <View>
          <CheckCircleIcon
            width={correctSize(27)}
            height={correctSize(24)}
            color={colors.gray_1}
          />
        </View>
      ) : (
        <View style={styles.circle} />
      )}
    </TouchableOpacity>
  );
};

export default BankRadio;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: correctSize(18),
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(12),
  },
  iconContainer: {
    width: correctSize(48),
    height: correctSize(48),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray_1,
    marginRight: correctSize(14),
  },
  row: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
    lineHeight: 24,
    marginBottom: correctSize(4),
  },
  accountNumber: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
  },
  circle: {
    width: correctSize(24),
    height: correctSize(24),
    borderRadius: 99,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray_5,
  },
});
