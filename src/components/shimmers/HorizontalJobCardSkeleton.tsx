// components/home/HorizontalJobCardSkeleton.tsx

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

const HorizontalJobCardSkeleton = () => {
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
      {/* Image */}
      <View style={styles.image} />

      {/* Tag row */}
      <View style={styles.tagRow}>
        <View style={styles.tag} />
        <View style={styles.tagShort} />
        <View style={styles.bookmark} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Logo + company */}
        <View style={styles.headerRow}>
          <View style={styles.logo} />
          <View style={styles.company} />
        </View>

        {/* Title */}
        <View style={styles.title} />

        {/* Bottom row */}
        <View style={styles.bottomRow}>
          <View>
            <View style={styles.price} />
            <View style={styles.perDay} />
          </View>

          <View style={styles.applyBtn} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: correctSize(198),
    backgroundColor: colors.white,
    borderRadius: correctSize(26),
    borderWidth: 1,
    borderColor: colors.gray_2,
    overflow: 'hidden',
  },

  image: {
    ...box('100%', 109, 0),
  },

  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: correctSize(12),
    marginTop: correctSize(8),
  },

  tag: {
    ...box(60, 18, 8),
  },

  tagShort: {
    ...box(40, 18, 8),
  },

  bookmark: {
    ...box(24, 24, 12),
  },

  content: {
    padding: correctSize(16),
    gap: correctSize(8),
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(6),
  },

  logo: {
    ...box(20, 20, 8),
  },

  company: {
    ...box('40%', 8),
  },

  title: {
    ...box('80%', 12),
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: correctSize(6),
  },

  price: {
    ...box(60, 12),
  },

  perDay: {
    ...box(80, 8),
    marginTop: correctSize(4),
  },

  applyBtn: {
    ...box(50, 28, 14),
  },
});

export default HorizontalJobCardSkeleton;