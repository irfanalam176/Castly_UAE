import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { correctSize } from '../../utils'
import { colors } from '../../utils/colors'
import { Fonts } from '../../assets/fonts'
import CreditCardIcon from '../../assets/svg/payments/CreditCardIcon'

interface LinkedBankAccountProps{
  onChange?:()=>void;
  onAddAccount?:()=>void
}
const LinkedBankAccount = ({onChange,onAddAccount}:LinkedBankAccountProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Linked Bank Account</Text>
      <View style={styles.divider} />

      {/* Account Row */}
      <View style={styles.accountRow}>
        <View style={styles.bankIconBox}>
          <CreditCardIcon/>
        </View>

        <View style={styles.accountInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.bankName}>Emirates NBD · Savings</Text>
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>DEFAULT</Text>
            </View>
          </View>
          <Text style={styles.iban}>IBAN: AE xx xxxx xxxx xxxx x821</Text>
          <Text style={styles.added}>Added Nov 3, 2023 · Verified ✓</Text>
        </View>

        <TouchableOpacity onPress={onChange}>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Add Another */}
      <TouchableOpacity style={styles.addRow} onPress={onAddAccount}>
        <Text style={styles.addText}>+ Add Another Account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LinkedBankAccount
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: correctSize(16),
    borderWidth: 1,
    borderColor: colors.white_1,
    overflow: 'hidden',
    marginBottom:correctSize(16)
  },
  heading: {
    fontSize: 15,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
    paddingHorizontal: correctSize(16),
    paddingTop: correctSize(16),
    paddingBottom: correctSize(12),
  },
  divider: {
    height: 1,
    backgroundColor: colors.white_1,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: correctSize(10),
    padding: correctSize(16),
  },
  bankIconBox: {
    width: correctSize(44),
    height: correctSize(44),
    borderRadius: correctSize(10),
    backgroundColor: colors.lightBlue_2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankIcon: {
    fontSize: 16,
  },
  accountInfo: {
    flex: 1,
    gap: correctSize(3),
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    flexWrap: 'wrap',
  },
  bankName: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  defaultBadge: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: correctSize(6),
    paddingVertical: correctSize(2),
  },
  defaultText: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
    letterSpacing: 0.5,
  },
  iban: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  added: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  changeText: {
    fontSize: 13,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.blue_7,
  },
  addRow: {
    paddingHorizontal: correctSize(16),
    paddingVertical: correctSize(14),
    alignItems: 'center',
  },
  addText: {
    fontSize: 13,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
  },
})