import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import CheckIcon from '../../assets/svg/applications/CheckIcon';
import EyeIcon from '../../assets/svg/applications/EyeIcon';
import SendIcon from '../../assets/svg/applications/SendIcon';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';

interface TimelineCardProps {
  status?: string;
}

const TimelineCard = ({ status }: TimelineCardProps) => {
  const isApplied     = status === 'APPLIED';
  const isReviewed    = status === 'REVIEW';
  const isShortlisted = status === 'SHORTLISTED';

  // Each step is active based on which statuses should highlight it
  const step3Active = isApplied || isReviewed || isShortlisted; // Application Submitted
  const step2Active = isReviewed || isApplied;                  // Profile Reviewed
  const step1Active = isApplied;                                // Shortlisted by Brand

  const getBg    = (active: boolean) => active ? colors.gray_1  : colors.gray;
  const getColor = (active: boolean) => active ? colors.white   : colors.gray_1;

  return (
    <View>
      {/* Item 1 - Shortlisted by Brand */}
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={[styles.iconContainer, { backgroundColor: getBg(step3Active) }]}>
            <CheckIcon color={getColor(step3Active)} />
          </View>
          <View style={[styles.line, { backgroundColor: colors.gray }]} />
        </View>
        <View style={styles.details}>
          <Text style={styles.mainHeading}>Shortlisted by Brand</Text>
          <Text style={styles.description}>Your profile matched their requirements perfectly</Text>
          <Text style={[styles.description, styles.time]}>Today at 10:45 AM</Text>
        </View>
      </View>

      {/* Item 2 - Profile Reviewed */}
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={[styles.iconContainer, { backgroundColor: getBg(step2Active) }]}>
            <EyeIcon color={getColor(step2Active)} />
          </View>
          <View style={[styles.line, { backgroundColor: colors.gray }]} />
        </View>
        <View style={styles.details}>
          <Text style={styles.mainHeading}>Profile Reviewed</Text>
          <Text style={styles.description}>The brand viewed your portfolio</Text>
          <Text style={[styles.description, styles.time]}>Mar 15 at 2:30 PM</Text>
        </View>
      </View>

      {/* Item 3 - Application Submitted (no line) */}
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={[styles.iconContainer, { backgroundColor: getBg(step1Active) }]}>
            <SendIcon color={getColor(step1Active)} />
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.mainHeading}>Application Submitted</Text>
          <Text style={styles.description}>You applied for this role</Text>
          <Text style={[styles.description, styles.time]}>Mar 15 at 2:30 PM</Text>
        </View>
      </View>
    </View>
  );
};

export default TimelineCard;

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
    marginBottom: correctSize(5),
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
    lineHeight: 16,
  },
  time: {
    color: colors.gray_4,
    marginTop: correctSize(14),
  },
  container: {
    flexDirection: 'row',
    marginTop: correctSize(16),
  },
  details: {
    width: '80%',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: 2,
    flexGrow: 1,
    marginTop: correctSize(8),
  },
  leftContainer: {
    alignItems: 'center',
    marginRight: correctSize(16),
  },
});