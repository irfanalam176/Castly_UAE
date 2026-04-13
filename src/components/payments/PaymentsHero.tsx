import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { correctSize } from '../../utils'
import { colors } from '../../utils/colors'
import GearIcon from '../../assets/svg/payments/GearIcon'
import CrossArrowIcon from '../../assets/svg/payments/CrossArrowIcon'
import { Fonts } from '../../assets/fonts'

const PAYMENT_STATS = [
  { amount: 'AED 6,000', label: 'In Escrow 🔒', amountColor: colors.primary },
  { amount: 'AED 7,500', label: 'This Month', amountColor: colors.darkGreen_6 },
  { amount: 'AED 95K', label: 'All Time', amountColor: '#60A5FA' },
]

interface PaymentsHeroProps{
  onSettingPress?:()=>void;
  onWithdrawPress?:()=>void
}

const PaymentsHero = ({onSettingPress,onWithdrawPress}:PaymentsHeroProps) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Your Castly Wallet</Text>
          <Text style={styles.title}>Payments & Escrow</Text>
        </View>
        <TouchableOpacity style={styles.iconContainer} onPress={onSettingPress}>
          <GearIcon />
        </TouchableOpacity>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {PAYMENT_STATS.map((stat, index) => (
          <View
            key={stat.label}
            style={styles.statCard}
          >
            <Text style={[styles.statAmount, { color: stat.amountColor }]}>
              {stat.amount}
            </Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Withdraw Card */}
      <View style={styles.withdrawCard}>
        <View>
          <Text style={styles.withdrawLabel}>Available to Withdraw</Text>
          <Text style={styles.withdrawAmount}>AED 8,750</Text>
          <Text style={styles.withdrawSub}>Released from completed jobs</Text>
        </View>

        <TouchableOpacity style={styles.withdrawBtn} onPress={onWithdrawPress}>
          <CrossArrowIcon width={16} height={16} color={colors.darkgray_1} />
          <Text style={styles.withdrawBtnText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PaymentsHero

const styles = StyleSheet.create({
  container: {
    padding: correctSize(16),
    backgroundColor: colors.darkgray_1,
    paddingBottom: correctSize(24),
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: correctSize(20),
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginBottom: correctSize(4),
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.white,
  },
  iconContainer: {
    width: correctSize(36),
    height: correctSize(36),
    borderRadius: 99,
    backgroundColor: colors.gray_9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    borderRadius: correctSize(14),
    marginBottom: correctSize(16),
    gap:correctSize(8)
  },
  statCard: {
    flex: 1,
    paddingVertical: correctSize(14),
    paddingHorizontal: correctSize(10),
    backgroundColor:colors.gray_10,
    alignItems: 'center',
    borderWidth:1,
    borderColor:colors.gray_9,
    borderRadius:14
  },
  statAmount: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    marginBottom: correctSize(4),
  },
  statLabel: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },

  // Withdraw Card
  withdrawCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.gray_10,
    borderRadius: correctSize(16),
    padding: correctSize(16),
    borderWidth: 1,
    borderColor: colors.primary,
  },
  withdrawLabel: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginBottom: correctSize(4),
  },
  withdrawAmount: {
    fontSize: 24,
    fontFamily: Fonts.Inter_Bold,
    color: colors.white,
    marginBottom: correctSize(4),
  },
  withdrawSub: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  withdrawBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(6),
    backgroundColor: colors.primary,
    paddingHorizontal: correctSize(16),
    paddingVertical: correctSize(10),
    borderRadius: correctSize(14),
  },
  withdrawBtnText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
})