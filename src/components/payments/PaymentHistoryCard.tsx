import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { correctSize } from '../../utils'
import { colors } from '../../utils/colors'
import { Fonts } from '../../assets/fonts'
import CrossArrowIcon from '../../assets/svg/payments/CrossArrowIcon'
import CrossDownArrowIcon from '../../assets/svg/payments/CrossDownArrowIcon'

type PaymentItem = {
  id: string
  jobTitle: string
  brandName: string
  startDate: string
  endDate: string
  paidDate: string
  netPay: number
  fee: number
  maskedAccount: string
}

type Props = {
  payments: PaymentItem[]
  total: number
}

const formatDateRange = (start: string, end: string) => {
  const s = new Date(start)
  const e = new Date(end)
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  return `${s.toLocaleDateString('en-US', opts)}–${e.toLocaleDateString('en-US', { day: 'numeric' })}`
}

const formatPaidDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const PaymentHistoryCard = ({ payments, total }: Props) => {
  return (
    <View>
      {/* Section Header */}

      <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Payment History</Text>
        <Text style={styles.totalText}>AED {total.toLocaleString()} total</Text>
      </View>
       
         {payments.map((item, index) => {
          const isLast = index === payments.length - 1
          return (
            <View key={item.id} style={[styles.track,isLast&&{borderBottomWidth:0}]}>
              <View style={styles.row}>
                {/* Icon */}
                <View style={styles.iconBox}>
                  <CrossDownArrowIcon width={16} height={16} color={colors.green_5} />
                </View>

                {/* Info */}
                <View style={styles.info}>
                  <Text style={styles.jobTitle} numberOfLines={1}>
                    {item.jobTitle}
                  </Text>
                  <Text style={styles.meta}>
                    {item.brandName} · {formatDateRange(item.startDate, item.endDate)}
                  </Text>
                  <View style={styles.paidRow}>
                    <Text style={styles.paidText}>
                      ✓ Paid {formatPaidDate(item.paidDate)}
                    </Text>
                    <Text style={styles.metaDot}>····</Text>
                    <Text style={styles.meta}>{item.maskedAccount}</Text>
                  </View>
                </View>

                {/* Amount */}
                <View style={styles.amountContainer}>
                  <Text style={styles.amount}>+AED {item.netPay.toLocaleString()}</Text>
                  <Text style={styles.feeText}>-AED {item.fee} fee</Text>
                </View>
              </View>

            </View>
          )
        })}
       </View>
    </View>
  )
}

export default PaymentHistoryCard

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   padding:correctSize(16),
   borderBottomWidth:1,
   borderBottomColor:colors.white_1
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  totalText: {
    fontSize: 13,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.green_5,
  },
  track:{
    paddingHorizontal:correctSize(16),
    borderBottomWidth:1,
    borderBottomColor:colors.white_1
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: correctSize(16),
    borderWidth:1,
    borderColor:colors.white_1
    
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: correctSize(14),
    gap: correctSize(10),
    
  },
  iconBox: {
    width: correctSize(36),
    height: correctSize(36),
    borderRadius: correctSize(10),
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green_1,
    marginTop: correctSize(2),
  },
  info: {
    flex: 1,
    gap: correctSize(3),
  },
  jobTitle: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  meta: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  paidRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(4),
  },
  paidText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.green_5,
    backgroundColor:colors.green_1,
    paddingHorizontal:correctSize(10),
    borderRadius:100
  },
  metaDot: {
    fontSize: 11,
    color: colors.gray_3,
    letterSpacing: -1,
  },
  amountContainer: {
    alignItems: 'flex-end',
    gap: correctSize(3),
  },
  amount: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.green_5,
  },
  feeText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
})