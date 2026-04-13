import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { correctSize } from '../../utils'
import { colors } from '../../utils/colors'
import { Fonts } from '../../assets/fonts'
import CheveronRight from '../../assets/svg/kyc/CheveronRight'

const PAYOUT_ROWS = [
  { label: 'Payout Trigger', value: 'After shoot confirmation', tappable: true },
  { label: 'Release Timeline', value: '14 business days', tappable: false },
  { label: 'Currency', value: 'AED (Dirham)', tappable: true },
  { label: 'Tax Invoice', value: 'Auto-generated', tappable: false },
]

const PayoutPreferences = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payout Preferences</Text>
      <View style={styles.divider} />

      {PAYOUT_ROWS.map((row, index) => (
        <View key={row.label}>
          <View style={styles.prefRow}>
            <Text style={styles.prefLabel}>{row.label}</Text>
            <TouchableOpacity disabled={!row.tappable} style={styles.prefValueRow}>
              <Text style={styles.prefValue}>{row.value}</Text>
              {row.tappable && <CheveronRight/>}
            </TouchableOpacity>
          </View>
          {index < PAYOUT_ROWS.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </View>
  )
}

export default PayoutPreferences
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
  prefRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: correctSize(16),
    paddingVertical: correctSize(14),
  },
  prefLabel: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray_1,
  },
  prefValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:correctSize(12)
  },
  prefValue: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  chevron: {
    fontSize: 13,
    color: colors.gray_3,
  },
})