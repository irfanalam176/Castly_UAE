// components/home/JobCardSkeleton.tsx

import React, { useEffect } from 'react';
import { StyleSheet, View, DimensionValue } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';

const box = (width: DimensionValue, height: number, radius = 6) => ({
  width,
  height: correctSize(height),
  borderRadius: correctSize(radius),
  backgroundColor: colors.gray,
});

const JobCardSkeleton = () => {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 900 }),
        withTiming(0.4, { duration: 900 }),
      ),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {/* Header Image */}
      <View style={styles.image} />

      {/* Content Area */}
      <View style={styles.content}>

        {/* Logo + Title */}
        <View style={styles.headerRow}>
          <View style={styles.logo} />

          <View style={styles.titleContainer}>
            <View style={styles.company} />
            <View style={styles.title} />
          </View>
        </View>

        {/* Location + Date */}
        <View style={styles.locationRow}>
          <View style={styles.infoShort} />
          <View style={styles.infoShort} />
        </View>

        {/* Spots */}
        <View style={styles.spots} />

        {/* Fee + Time left */}
        <View style={styles.feeRow}>
          <View>
            <View style={styles.price} />
            <View style={styles.perDay} />
          </View>

          <View>
            <View style={styles.smallInfo} />
            <View style={styles.smallInfo} />
          </View>
        </View>

        {/* Facilities */}
        <View style={styles.facilitiesRow}>
          <View style={styles.facility} />
          <View style={styles.facility} />
          <View style={styles.facility} />
        </View>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <View style={styles.applyBtn} />
          <View style={styles.shareBtn} />
        </View>

      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: correctSize(26),
    marginBottom: correctSize(16),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gray_2,
  },

  image: {
    ...box('100%', 160, 0),
  },

  content: {
    padding: correctSize(16),
    gap: correctSize(12),
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    ...box(24, 24, 8),
    marginRight: correctSize(12),
  },

  titleContainer: {
    flex: 1,
    gap: correctSize(6),
  },

  company: {
    ...box('40%', 10),
  },

  title: {
    ...box('70%', 14),
  },

  locationRow: {
    flexDirection: 'row',
    gap: correctSize(12),
  },

  infoShort: {
    ...box('40%', 10),
  },

  spots: {
    ...box('45%', 10),
  },

  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: correctSize(4),
  },

  price: {
    ...box(90, 16),
  },

  perDay: {
    ...box(120, 10),
    marginTop: correctSize(6),
  },

  smallInfo: {
    ...box(80, 10),
    marginBottom: correctSize(6),
  },

  facilitiesRow: {
    flexDirection: 'row',
    gap: correctSize(8),
  },

  facility: {
    ...box(60, 20, 10),
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginTop: correctSize(4),
  },

  applyBtn: {
    flex: 1,
    ...box('100%', 44, 12),
  },

  shareBtn: {
    ...box(44, 44, 12),
  },
});

export default JobCardSkeleton;