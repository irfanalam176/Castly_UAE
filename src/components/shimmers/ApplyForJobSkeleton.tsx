import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// ─── Shimmer Base ──────────────────────────────────────────────────────────────
const ShimmerBox = ({
  width: w,
  height: h,
  borderRadius = 8,
  style,
}: {
  width?: number | string;
  height: number;
  borderRadius?: number;
  style?: any;
}) => {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 1], [0.4, 0.85]),
  }));

  return (
    <Animated.View
      style={[
        {
          width: w,
          height: h,
          borderRadius,
          backgroundColor: '#E2E8F0',
        },
        animatedStyle,
        style,
      ]}
    />
  );
};

// ─── Section Header ────────────────────────────────────────────────────────────
const SectionHeader = () => (
  <View style={styles.titleHeader}>
    <ShimmerBox width={24} height={24} borderRadius={100} />
    <ShimmerBox width={160} height={20} borderRadius={6} />
  </View>
);

// ─── Job Header Block ──────────────────────────────────────────────────────────
const JobHeaderSkeleton = () => (
  <View style={[styles.container, styles.card]}>
    {/* Company logo + title */}
    <View style={styles.row}>
      <ShimmerBox width={48} height={48} borderRadius={12} />
      <View style={{ marginLeft: 12, gap: 8 }}>
        <ShimmerBox width={180} height={18} borderRadius={6} />
        <ShimmerBox width={120} height={14} borderRadius={6} />
      </View>
    </View>

    {/* Rating row */}
    <View style={[styles.row, { marginTop: 12, gap: 8 }]}>
      <ShimmerBox width={60} height={14} borderRadius={6} />
      <ShimmerBox width={100} height={14} borderRadius={6} />
    </View>

    {/* Badges */}
    <View style={[styles.row, { marginTop: 16, gap: 8 }]}>
      <ShimmerBox width={90} height={28} borderRadius={8} />
      <ShimmerBox width={80} height={28} borderRadius={8} />
    </View>

    {/* Info rows */}
    {[1, 2, 3].map(i => (
      <View key={i} style={[styles.row, { marginTop: 12, gap: 10 }]}>
        <ShimmerBox width={16} height={16} borderRadius={4} />
        <ShimmerBox width={180} height={14} borderRadius={6} />
      </View>
    ))}
  </View>
);

// ─── Requirements Block ────────────────────────────────────────────────────────
const RequirementsSkeleton = () => (
  <View style={[styles.container, styles.card]}>
    <ShimmerBox width={130} height={20} borderRadius={6} style={{ marginBottom: 16 }} />
    {[1, 2, 3, 4].map(i => (
      <View key={i} style={[styles.row, { marginBottom: 12, gap: 10 }]}>
        <ShimmerBox width={18} height={18} borderRadius={100} />
        <ShimmerBox width={width * 0.6} height={14} borderRadius={6} />
      </View>
    ))}
  </View>
);

// ─── Match Score Card ──────────────────────────────────────────────────────────
const MatchScoreSkeleton = () => (
  <View style={styles.matchCard}>
    <ShimmerBox width={60} height={60} borderRadius={100} />
    <View style={{ marginLeft: 16, gap: 8 }}>
      <ShimmerBox width={140} height={18} borderRadius={6} />
      <ShimmerBox width={200} height={13} borderRadius={6} />
    </View>
  </View>
);

// ─── Text Area ─────────────────────────────────────────────────────────────────
const TextAreaSkeleton = () => (
  <View style={styles.textAreaSkeleton}>
    {[1, 2, 3, 4].map(i => (
      <ShimmerBox
        key={i}
        width={i === 4 ? '60%' : '100%'}
        height={13}
        borderRadius={6}
        style={{ marginBottom: 10 }}
      />
    ))}
  </View>
);

// ─── Input Field ───────────────────────────────────────────────────────────────
const InputSkeleton = () => (
  <ShimmerBox
    width="100%"
    height={52}
    borderRadius={12}
    style={{ marginBottom: 16 }}
  />
);

// ─── Date Picker Row ───────────────────────────────────────────────────────────
const DateRowSkeleton = () => (
  <View style={[styles.row, { gap: 10, marginBottom: 16 }]}>
    <ShimmerBox height={58} borderRadius={14} style={{ flex: 1 }} />
    <ShimmerBox width={58} height={58} borderRadius={14} />
  </View>
);

// ─── Level Radio Row ───────────────────────────────────────────────────────────
const LevelRowSkeleton = () => (
  <View style={[styles.row, { gap: 10, marginBottom: 16 }]}>
    {[1, 2, 3].map(i => (
      <ShimmerBox key={i} height={44} borderRadius={10} style={{ flex: 1 }} />
    ))}
  </View>
);

// ─── Options Card ──────────────────────────────────────────────────────────────
const OptionsCardSkeleton = () => (
  <View style={styles.optionsCard}>
    <ShimmerBox width={180} height={18} borderRadius={6} style={{ marginBottom: 16 }} />
    {[1, 2, 3].map(i => (
      <View
        key={i}
        style={[styles.row, { justifyContent: 'space-between', marginBottom: 14 }]}
      >
        <ShimmerBox width={160} height={14} borderRadius={6} />
        <ShimmerBox width={44} height={24} borderRadius={12} />
      </View>
    ))}
  </View>
);

// ─── Buttons ───────────────────────────────────────────────────────────────────
const ButtonsSkeleton = () => (
  <View style={{ gap: 12, marginTop: 8 }}>
    <ShimmerBox width="100%" height={50} borderRadius={12} />
    <ShimmerBox width="100%" height={50} borderRadius={12} />
    <ShimmerBox width={220} height={12} borderRadius={6} style={{ alignSelf: 'center' }} />
  </View>
);

// ─── Main Skeleton ─────────────────────────────────────────────────────────────
const ApplyForJobSkeleton = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.mainBody}
      showsVerticalScrollIndicator={false}
    >
      {/* Job Header */}
      <JobHeaderSkeleton />

      {/* Requirements */}
      <RequirementsSkeleton />

      {/* Body */}
      <View style={styles.body}>
        {/* Match Score */}
        <MatchScoreSkeleton />

        {/* Apply for Position header */}
        <SectionHeader />

        {/* Tips card placeholder */}
        <View style={styles.tipsCard}>
          <ShimmerBox width={120} height={16} borderRadius={6} style={{ marginBottom: 12 }} />
          {[1, 2, 3].map(i => (
            <View key={i} style={[styles.row, { gap: 8, marginBottom: 10 }]}>
              <ShimmerBox width={8} height={8} borderRadius={100} />
              <ShimmerBox width={width * 0.55} height={13} borderRadius={6} />
            </View>
          ))}
        </View>

        {/* Cover Letter */}
        <ShimmerBox width={120} height={16} borderRadius={6} style={{ marginVertical: 16 }} />
        <TextAreaSkeleton />

        {/* Portfolio Link */}
        <ShimmerBox width={160} height={16} borderRadius={6} style={{ marginVertical: 16 }} />
        <InputSkeleton />

        {/* Upload Resume */}
        <ShimmerBox width={130} height={16} borderRadius={6} style={{ marginVertical: 16 }} />
        <View style={styles.uploadSkeleton}>
          <ShimmerBox width={40} height={40} borderRadius={10} />
          <ShimmerBox width={100} height={13} borderRadius={6} style={{ marginTop: 10 }} />
          <ShimmerBox width={140} height={11} borderRadius={6} style={{ marginTop: 6 }} />
        </View>

        {/* Availability */}
        <SectionHeader />
        <ShimmerBox width={80} height={14} borderRadius={6} style={{ marginBottom: 8 }} />
        <DateRowSkeleton />
        <ShimmerBox width={80} height={14} borderRadius={6} style={{ marginBottom: 8 }} />
        <DateRowSkeleton />

        {/* Expected Rate */}
        <SectionHeader />
        <InputSkeleton />
        <ShimmerBox width={180} height={13} borderRadius={6} style={{ marginTop: -8, marginBottom: 16 }} />

        {/* Experience Level */}
        <SectionHeader />
        <LevelRowSkeleton />

        {/* Additional Information */}
        <OptionsCardSkeleton />

        {/* Buttons */}
        <ButtonsSkeleton />
      </View>
    </ScrollView>
  );
};

export default ApplyForJobSkeleton;

const styles = StyleSheet.create({
  mainBody: {
    paddingBottom: 50,
    backgroundColor: '#F0F4F8',
  },
  body: {
    padding: 24,
  },
  container: {
    padding: 24,
  },
  card: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 28,
    marginBottom: 12,
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
  textAreaSkeleton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    height: 128,
    justifyContent: 'center',
  },
  uploadSkeleton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    borderStyle: 'dotted',
    marginBottom: 16,
  },
  tipsCard: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  optionsCard: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
  },
});