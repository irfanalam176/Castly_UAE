import { View, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';

const MyJobCardSkeleton = () => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.initial} />
        <View style={styles.jobInfo}>
          <View style={styles.titleLine} />
          <View style={styles.titleLineShort} />
          <View style={styles.brandLine} />
        </View>
        <View style={styles.badge} />
      </View>

      {/* Date & Location */}
      <View style={styles.jobTime}>
        <View style={styles.infoChip} />
        <View style={styles.infoChipWide} />
      </View>

      {/* Middle Row */}
      <View style={styles.middleRow}>
        <View style={styles.badgeRow}>
          <View style={styles.matchBadge} />
        </View>
        <View style={styles.amountBlock}>
          <View style={styles.amountLine} />
          <View style={styles.netPayLine} />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footerLine} />
    </View>
  );
};

export const MyJobsSkeletonList = ({ count = 3 }: { count?: number }) =>
  Array.from({ length: count }).map((_, i) => (
    <View key={i} style={styles.cardWrapper}>
      <MyJobCardSkeleton />
    </View>
  ));

export default MyJobCardSkeleton;

const bone = {
  backgroundColor: colors.gray,
  borderRadius: 6,
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: correctSize(12),
  },
  card: {
    borderRadius: 14,
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    padding: correctSize(16),
    borderTopWidth: correctSize(4),
    borderTopColor: colors.gray,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  initial: {
    ...bone,
    width: correctSize(36),
    height: correctSize(36),
    borderRadius: 14,
    marginRight: correctSize(8),
  },
  jobInfo: {
    flex: 1,
    gap: correctSize(5),
  },
  titleLine: {
    ...bone,
    height: correctSize(12),
    width: '85%',
  },
  titleLineShort: {
    ...bone,
    height: correctSize(12),
    width: '55%',
  },
  brandLine: {
    ...bone,
    height: correctSize(10),
    width: '40%',
    marginTop: correctSize(2),
  },
  badge: {
    ...bone,
    width: correctSize(72),
    height: correctSize(26),
    borderRadius: 999,
  },

  // Date & Location
  jobTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(10),
    marginTop: correctSize(14),
    marginBottom: correctSize(18),
  },
  infoChip: {
    ...bone,
    height: correctSize(10),
    width: correctSize(90),
    borderRadius: 6,
  },
  infoChipWide: {
    ...bone,
    height: correctSize(10),
    width: correctSize(120),
    borderRadius: 6,
  },

  // Middle Row
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: correctSize(6),
  },
  matchBadge: {
    ...bone,
    height: correctSize(26),
    width: correctSize(54),
    borderRadius: 999,
  },
  amountBlock: {
    alignItems: 'flex-end',
    gap: correctSize(4),
  },
  amountLine: {
    ...bone,
    height: correctSize(13),
    width: correctSize(72),
  },
  netPayLine: {
    ...bone,
    height: correctSize(10),
    width: correctSize(40),
  },

  // Footer
  footerLine: {
    ...bone,
    height: correctSize(10),
    width: '60%',
    marginTop: correctSize(16),
  },
});