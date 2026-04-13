import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { correctSize } from '../../utils'
import { colors } from '../../utils/colors'
import { Fonts } from '../../assets/fonts'
import CalendarIcon from '../../assets/svg/common/CalendarIcon'

type Hold = {
  jobTitle: string
  brandName: string
  startDate: string
  endDate: string
  grossEscrow: number
  castlyFee: number
  netPay: number
  expectedDate: string
}

type Props = {
  holds: Hold[]
}

const formatDateRange = (start: string, end: string) => {
  const s = new Date(start)
  const e = new Date(end)
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  return `${s.toLocaleDateString('en-US', opts)}–${e.toLocaleDateString('en-US', { ...opts, year: 'numeric' })}`
}

const formatExpected = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const ActiveHolds = ({ holds }: Props) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Active Holds ({holds.length})</Text>

      {holds.map((hold, index) => {
        const feePercent = hold.grossEscrow > 0
          ? Math.round((hold.castlyFee / hold.grossEscrow) * 100)
          : 10

        return (
          <View key={index} style={styles.card}>
            {/* Job Header */}
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <Text style={styles.jobTitle}>{hold.jobTitle}</Text>
                <Text style={styles.jobMeta}>
                  {hold.brandName} · {formatDateRange(hold.startDate, hold.endDate)}
                </Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Funds Locked 🔒</Text>
              </View>
            </View>

            {/* Breakdown */}
            <View style={styles.breakdown}>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Gross Escrow</Text>
                <Text style={styles.breakdownValue}>
                  AED {hold.grossEscrow.toLocaleString()}
                </Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Castly Fee ({feePercent}%)</Text>
                <Text style={[styles.breakdownValue, styles.feeText]}>
                  -AED {hold.castlyFee.toLocaleString()}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.breakdownRow}>
                <Text style={styles.netLabel}>You'll Receive</Text>
                <Text style={styles.netValue}>
                  AED {hold.netPay.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Expected Date */}
            <View style={styles.expectedRow}>
              <CalendarIcon width={13} height={13} color={colors.green_5} />
              <Text style={styles.expectedText}>
                Expected: {formatExpected(hold.expectedDate)}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

export default ActiveHolds

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(12),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: correctSize(16),
    padding: correctSize(16),
    marginBottom: correctSize(12),
    borderWidth:1,
    borderColor:colors.white_1
  },

  // Card Header
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: correctSize(14),
    gap: correctSize(8),
  },
  cardHeaderLeft: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
    lineHeight: correctSize(20),
    marginBottom: correctSize(3),
  },
  jobMeta: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  badge: {
    backgroundColor: colors.green_1,
    borderRadius: 20,
    paddingHorizontal: correctSize(10),
    paddingVertical: correctSize(4),
  },
  badgeText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Medium,
    color: colors.green_5,
  },

  // Breakdown
  breakdown: {
    backgroundColor: colors.lightBlue_5,
    borderRadius: correctSize(10),
    padding: correctSize(12),
    marginBottom: correctSize(12),
    gap: correctSize(6),
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  breakdownValue: {
    fontSize: 13,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
  },
  feeText: {
    color: colors.red,
    fontFamily:Fonts.Inter_Regular
  },
  divider: {
    height: 0.5,
    backgroundColor: colors.gray,
    marginVertical: correctSize(4),
  },
  netLabel: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  netValue: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.green_5,
  },

  // Expected
  expectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(6),
    backgroundColor: colors.green_1,
    borderRadius: correctSize(10),
    paddingHorizontal: correctSize(12),
    paddingVertical: correctSize(10),
  },
  expectedText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.green_5,
  },
})