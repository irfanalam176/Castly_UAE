import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import { correctSize } from '../../utils';
import CheckIcon from '../../assets/svg/applications/CheckIcon';
import DotIcon from '../../assets/svg/applications/DotIcon';
import CheckCircleIcon from '../../assets/svg/applications/CheckCircleIcon';
import CalendarCheckIcon from '../vectorIcons/CalendarCheckIcon';

interface TimelineRowProps {
  status?: string;
}

const TimelineRow = ({ status }: TimelineRowProps) => {
  // Each step is active if current status has reached or passed it
  const isApplied     = ['APPLIED', 'SHORTLISTED', 'INTERVIEWED', 'HIRED'].includes(status ?? '');
  const isShortlisted = ['SHORTLISTED', 'INTERVIEWED', 'HIRED'].includes(status ?? '');
  const isInterviewed = ['INTERVIEWED', 'HIRED'].includes(status ?? '');
  const isHired       = status === 'HIRED';

  const getBg       = (active: boolean) => active ? colors.primary : colors.gray;
  const getColor    = (active: boolean) => active ? colors.darkgray_1   : colors.gray_4;
  const getFont     = (active: boolean) => active ? Fonts.Inter_SemiBold : Fonts.Inter_Medium;
  const getTxtColor = (active: boolean) => active ? colors.darkgray : colors.gray_3;

  return (
    <View style={styles.container}>
      {/* Step 1 - Applied */}
      <View>
        <View style={[styles.iconContainer, { backgroundColor: getBg(isApplied) }]}>
          <CheckIcon width={12.25} height={14} color={getColor(isApplied)} />
        </View>
        <Text style={[styles.title, { fontFamily: getFont(isApplied), color: getTxtColor(isApplied) }]}>
          Applied
        </Text>
        <Text style={[styles.time, { color: getTxtColor(isApplied) }]}>
          {isApplied ? 'Mar 15' : 'Pending'}
        </Text>
      </View>

      {/* Step 2 - Shortlisted */}
      <View>
        <View style={[styles.iconContainer, { backgroundColor: getBg(isShortlisted) }]}>
          <DotIcon color={getColor(isShortlisted)} />
        </View>
        <Text style={[styles.title, { fontFamily: getFont(isShortlisted), color: getTxtColor(isShortlisted) }]}>
          Shortlisted
        </Text>
        <Text style={[styles.time, { color: getTxtColor(isShortlisted) }]}>
          {isShortlisted ? 'Today' : 'Pending'}
        </Text>
      </View>

      {/* Step 3 - Booked (INTERVIEWED) */}
      <View>
        <View style={[styles.iconContainer, { backgroundColor: getBg(isInterviewed) }]}>
          <CalendarCheckIcon width={12.25} height={14} fillColor={getColor(isInterviewed)} />
        </View>
        <Text style={[styles.title, { fontFamily: getFont(isInterviewed), color: getTxtColor(isInterviewed) }]}>
          Booked
        </Text>
        <Text style={[styles.time, { color: getTxtColor(isInterviewed) }]}>
          {isInterviewed ? 'Today' : 'Pending'}
        </Text>
      </View>

      {/* Step 4 - Completed (HIRED) */}
      <View>
        <View style={[styles.iconContainer, { backgroundColor: getBg(isHired) }]}>
          <CheckCircleIcon width={18} height={14} color={getColor(isHired)} />
        </View>
        <Text style={[styles.title, { fontFamily: getFont(isHired), color: getTxtColor(isHired) }]}>
          Completed
        </Text>
        <Text style={[styles.time, { color: getTxtColor(isHired) }]}>
          {isHired ? 'Today' : 'Pending'}
        </Text>
      </View>

      <View style={styles.line} />
    </View>
  );
};

export default TimelineRow;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(24),
  },
  line: {
    height: 4,
    backgroundColor: colors.gray,
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 18,
  },
  iconContainer: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    position: 'relative',
    zIndex: 99,
    marginBottom: correctSize(8),
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
  },
  time: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    textAlign: 'center',
  },
});