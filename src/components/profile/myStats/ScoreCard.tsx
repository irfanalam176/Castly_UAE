import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import FlashIcon from '../../../assets/svg/Profile/FlashIcon';
import { correctSize } from '../../../utils';
import { Fonts } from '../../../assets/fonts';
import { colors } from '../../../utils/colors';
import HikeArrowIcon from '../../../assets/svg/Profile/HikeArrowIcon';

const ScoreCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FlashIcon color={colors.primary} />
        <Text style={styles.title}>Castly Talent Score</Text>
      </View>

      <View style={styles.scoreRow}>
        <Text style={styles.score}>0</Text>
        <View>
          <Text style={styles.muteText}>out of 100</Text>
          <View style={styles.row}>
            <HikeArrowIcon />
            <Text style={styles.hikeText}>Top 0% of models</Text>
          </View>
        </View>
      </View>

      <View style={styles.rateBar}>
        <View style={styles.indicatorRow}>
          <Text style={styles.indicatorTitle}>Response Rate</Text>
          <Text style={styles.indicatorResult}>0%</Text>
        </View>
        <View style={styles.indicator}>
          <View style={[styles.progress, { width: '0%' }]} />
        </View>
      </View>

      <View style={styles.rateBar}>
        <View style={styles.indicatorRow}>
          <Text style={styles.indicatorTitle}>Completion Rate</Text>
          <Text style={[styles.indicatorResult, { color: colors.darkGreen_6 }]}>
            0%
          </Text>
        </View>
        <View style={styles.indicator}>
          <View
            style={[
              styles.progress,
              { width: '0%', backgroundColor: colors.darkGreen_6 },
            ]}
          />
        </View>
      </View>

      <View style={styles.rateBar}>
        <View style={styles.indicatorRow}>
          <Text style={styles.indicatorTitle}>Profile Quality</Text>
          <Text style={[styles.indicatorResult,{color:colors.blue_9}]}>0%</Text>
        </View>
        <View style={styles.indicator}>
          <View style={[styles.progress, { width: '0%',backgroundColor:colors.blue_9 }]} />
        </View>
      </View>

      <View style={styles.rateBar}>
        <View style={styles.indicatorRow}>
          <Text style={styles.indicatorTitle}>Brand Ratings</Text>
          <Text style={[styles.indicatorResult,{color:colors.purple_6}]}>0%</Text>
        </View>
        <View style={styles.indicator}>
          <View style={[styles.progress, { width: '0%',backgroundColor:colors.purple_6 }]} />
        </View>
      </View>
    </View>
  );
};

export default ScoreCard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkgray_1,
    borderRadius: 16,
    padding: correctSize(16),
    marginBottom:correctSize(16)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
  },
  title: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 13,
    color: colors.primary,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(14),
    marginBottom: correctSize(10),
  },
  score: {
    fontSize: 48,
    fontFamily: Fonts.Inter_Bold,
    color: colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(4),
  },
  muteText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    lineHeight: correctSize(18),
  },
  hikeText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Medium,
    color: colors.primary,
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(5),
  },
  indicatorTitle: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  indicatorResult: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Bold,
    color: colors.primary,
  },
  indicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 100,
    height: correctSize(6),
  },
  progress: {
    borderRadius: 100,
    backgroundColor: colors.primary,
    height: correctSize(6),
  },
  rateBar: {
    marginBottom: correctSize(12),
  },
  completion: {
    backgroundColor: colors.green_6,
  },
});
