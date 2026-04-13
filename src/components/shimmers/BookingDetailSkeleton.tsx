import { View, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors'
import { correctSize } from '../../utils'
import ScreenWrapper from '../layout/ScreenWrapper'

const SkeletonBox = ({ width, height, borderRadius = 8, style }: {
  width?: number | string
  height: number
  borderRadius?: number
  style?: object
}) => (
  <View style={[{ width, height, borderRadius, backgroundColor: colors.white_1 }, style]} />
)

const BookingDetailSkeleton = () => {
  return (
    <ScreenWrapper backgroundColor={colors.lightBlue_5}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <SkeletonBox width={36} height={36} borderRadius={18} />
          <View style={{ gap: 6 }}>
            <SkeletonBox width={120} height={14} />
            <SkeletonBox width={80} height={10} />
          </View>
        </View>
        <SkeletonBox width={70} height={26} borderRadius={20} />
      </View>

      <View style={styles.body}>
        {/* Booking Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={{ gap: 8, flex: 1 }}>
              <SkeletonBox width="80%" height={14} />
              <SkeletonBox width="50%" height={11} />
            </View>
            <View style={{ gap: 6, alignItems: 'flex-end' }}>
              <SkeletonBox width={70} height={14} />
              <SkeletonBox width={40} height={10} />
            </View>
          </View>
          <View style={{ gap: 10, marginTop: correctSize(12) }}>
            <View style={styles.row}>
              <SkeletonBox width={12} height={12} borderRadius={6} />
              <SkeletonBox width="50%" height={11} />
            </View>
            <View style={styles.row}>
              <SkeletonBox width={12} height={12} borderRadius={6} />
              <SkeletonBox width="60%" height={11} />
            </View>
            <View style={styles.row}>
              <SkeletonBox width={12} height={12} borderRadius={6} />
              <SkeletonBox width="35%" height={11} />
            </View>
          </View>
        </View>

        {/* Perks Card */}
        <View style={[styles.card, { marginTop: correctSize(12) }]}>
          <SkeletonBox width={80} height={12} style={{ marginBottom: correctSize(12) }} />
          <View style={styles.perksRow}>
            <SkeletonBox width={100} height={28} borderRadius={20} />
            <SkeletonBox width={90} height={28} borderRadius={20} />
            <SkeletonBox width={80} height={28} borderRadius={20} />
            <SkeletonBox width={95} height={28} borderRadius={20} />
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.row}>
          <SkeletonBox height={44} borderRadius={12} style={{ flex: 1 }} />
          <SkeletonBox height={44} borderRadius={12} style={{ flex: 1 }} />
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default BookingDetailSkeleton

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: correctSize(20),
    paddingBottom: correctSize(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    backgroundColor: colors.white,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(12),
  },
  body: {
    padding: correctSize(16),
    flex: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: correctSize(16),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: correctSize(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
  },
  perksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: correctSize(8),
  },
  footer: {
    padding: correctSize(16),
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.white_1,
  },
})