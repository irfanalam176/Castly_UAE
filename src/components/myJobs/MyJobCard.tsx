import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import CalendarIcon from '../../assets/svg/Home/CalendarIcon';
import MapPin from '../../assets/svg/common/MapPin';
import Badge from '../common/Badge';
import DotIcon from '../../assets/svg/common/DotIcon';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import FlashIconFill from '../../assets/svg/Profile/FlashIconFill';
import ShieldIcon from '../../assets/svg/common/ShieldIcon';

// ─── Types ────────────────────────────────────────────────────────────────────

type ApiStatus = 'APPLIED' | 'SHORTLISTED' | 'BOOKED' | 'DONE' | 'PASSED' | 'ALL';

interface Job {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  shootDays: number;
}

interface Brand {
  id: string;
  brandName: string;
  brandLogoUrl: string | null;
}

interface Escrow {
  status: string;
  amount: number;
  expectedReleaseAt: string | null;
}

export interface ApplicationItem {
  applicationId: string;
  boardStatus: ApiStatus;
  status: ApiStatus;
  matchScore: number;
  totalPay: number;
  netPay: number;
  appliedAt: string;
  updatedAt: string;
  statusLabel: string;
  statusMessage: string;
  job: Job;
  brand: Brand;
  escrow: Escrow | null;
}

interface MyJobCardProps {
  item: ApplicationItem;
  onPress?: () => void;
}

// ─── Status Config ─────────────────────────────────────────────────────────────

const statusConfig: Record<ApiStatus, { dotColor: string; textColor: string; badgeBg: string; label: string }> = {
  SHORTLISTED: {
    dotColor: colors.orange_3,
    textColor: colors.orange_4,
    badgeBg: colors.yellow_4,
    label: 'Shortlisted ⭐',
  },
  BOOKED: {
    dotColor: colors.darkGreen3,
    textColor: colors.green_5,
    badgeBg: colors.green_1,
    label: 'Booked ✓',
  },
  APPLIED: {
    dotColor: colors.blue_1,
    textColor: colors.blue_7,
    badgeBg: colors.lightBlue_7,
    label: 'Applied',
  },
  DONE: {
    dotColor: colors.blue_1,
    textColor: colors.blue_7,
    badgeBg: colors.lightBlue_7,
    label: 'Completed',
  },
  PASSED: {
    dotColor: colors.gray_3,
    textColor: colors.gray_3,
    badgeBg: colors.gray,
    label: 'Not Selected',
  },
  ALL: {
    dotColor: colors.blue_1,
    textColor: colors.blue_7,
    badgeBg: colors.lightBlue_7,
    label: 'Applied',
  },
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

const formatDateRange = (start: string, end: string) => {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${s.toLocaleDateString('en-US', opts)} – ${e.toLocaleDateString('en-US', { ...opts, year: 'numeric' })}`;
};

const formatAppliedAt = (appliedAt: string, updatedAt: string) => {
  const applied = new Date(appliedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const diffMs = Date.now() - new Date(updatedAt).getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  const updated =
    diffHrs >= 24
      ? `${Math.floor(diffHrs / 24)}d ago`
      : diffHrs >= 1
      ? `${diffHrs}h ago`
      : `${diffMins}m ago`;

  return `Applied ${applied} · Updated ${updated}`;
};

const getBrandInitial = (brandName: string) =>
  brandName?.trim()?.[0]?.toUpperCase() ?? '?';

const formatCurrency = (amount: number) =>
  `AED ${amount.toLocaleString()}`;

// ─── Component ─────────────────────────────────────────────────────────────────

const MyJobCard = ({ item, onPress }: MyJobCardProps) => {
  const { status, matchScore, netPay, appliedAt, updatedAt, job, brand, escrow } = item;

  const config = statusConfig[status] ?? statusConfig.APPLIED;

  const isShortlisted = status === 'SHORTLISTED';
  const isBooked = status === 'BOOKED';
  const showBanner = isShortlisted || isBooked;
  const fundsLocked = isBooked && escrow?.status === 'PENDING_DEPOSIT';

  const bannerBg = isBooked ? colors.green_1 : colors.yellow_4;
  const bannerTextColor = isBooked ? colors.green_5 : colors.darkBrown_2;
  const bannerMessage = isBooked
    ? 'Your booking is confirmed! Funds are securely locked.'
    : "You've been shortlisted! Check your messages to proceed.";

  const borderColor = isBooked
    ? colors.green_5
    : isShortlisted
    ? colors.primary
    : colors.gray_3;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.card, { borderTopColor: borderColor }]}
      onPress={onPress}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.initial}>{getBrandInitial(brand.brandName)}</Text>
        <View style={styles.jobInfo}>
          <Text style={styles.title} numberOfLines={2}>{job.title}</Text>
          <Text style={styles.brand}>{brand.brandName}</Text>
        </View>
        <Badge
          leftIcon={<DotIcon width={6} height={6} color={config.dotColor} />}
          title={config.label}
          containerStyle={[styles.badge, { backgroundColor: config.badgeBg }]}
          textStyle={[styles.badgeText, { color: config.textColor }]}
        />
      </View>

      {/* Date & Location */}
      <View style={styles.jobTime}>
        <View style={styles.row}>
          <CalendarIcon />
          <Text style={styles.infoText}>{formatDateRange(job.startDate, job.endDate)}</Text>
        </View>
        <View style={styles.row}>
          <MapPin />
          <Text style={styles.infoText}>{job.location}</Text>
        </View>
      </View>

      {/* Middle Row: badges + amount */}
      <View style={styles.middleRow}>
        <View style={styles.badgeRow}>
          <Badge
            title={`⚡ ${matchScore}%`}
            containerStyle={styles.matchBadge}
            textStyle={styles.matchBadgeText}
          />
          {fundsLocked && (
            <Badge
              title="Funds Locked 🔒"
              containerStyle={[styles.matchBadge, styles.bookedBadge]}
              textStyle={[styles.matchBadgeText, styles.bookedBadgeText]}
              leftIcon={<ShieldIcon width={8} height={8} color={colors.green_5} />}
            />
          )}
        </View>

        <View>
          <Text style={styles.amount}>{formatCurrency(netPay)}</Text>
          <Text style={styles.smText}>net pay</Text>
        </View>
      </View>

      {/* Banner — only for Shortlisted & Booked */}
      {showBanner && (
        <View style={[styles.banner, { backgroundColor: bannerBg }]}>
          <FlashIconFill />
          <Text style={[styles.bannerText, { color: bannerTextColor }]}>
            {bannerMessage}
          </Text>
        </View>
      )}

      <Text style={styles.smText}>{formatAppliedAt(appliedAt, updatedAt)}</Text>
    </TouchableOpacity>
  );
};

export default MyJobCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: correctSize(16),
    borderTopWidth: correctSize(4),
  },
  header: {
    flexDirection: 'row',
  },
  jobInfo: {
    flex: 1,
  },
  initial: {
    width: correctSize(36),
    height: correctSize(36),
    borderRadius: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    fontFamily: Fonts.Inter_Bold,
    color: colors.white,
    backgroundColor: colors.darkgray_1,
    marginRight: correctSize(8),
  },
  title: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 13,
    color: colors.darkgray_1,
    lineHeight: correctSize(20),
  },
  brand: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  jobTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(10),
    marginTop: correctSize(12),
    marginBottom: correctSize(18),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
  },
  infoText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
  },
  badge: {
    paddingVertical: correctSize(7),
    paddingHorizontal: correctSize(12),
  },
  badgeText: {
    fontSize: 10,
    fontFamily: Fonts.Inter_SemiBold,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: correctSize(6),
  },
  matchBadge: {
    backgroundColor: colors.yellow_4,
  },
  bookedBadge: {
    backgroundColor: colors.green_1,
  },
  matchBadgeText: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Bold,
    color: colors.orange_4,
  },
  bookedBadgeText: {
    color: colors.green_5,
  },
  amount: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
    lineHeight: correctSize(20),
  },
  smText: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    borderRadius: 14,
    padding: correctSize(12),
    marginTop: correctSize(20),
    marginBottom: correctSize(10),
  },
  bannerText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Medium,
    lineHeight: correctSize(16.5),
    flex: 1,
  },
});