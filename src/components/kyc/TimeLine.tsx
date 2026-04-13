import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import CheckIcon from '../../assets/svg/applications/CheckIcon';
import { colors } from '../../utils/colors';
import LoadingIcon from '../../assets/svg/kyc/LoadingIcon';
import ShieldIcon from '../../assets/svg/applications/ShieldIcon';

const TimeLine = () => {
  return (
    <View>
      {/* Step 1: Documents Submitted */}
      <View style={styles.row}>
        <View style={styles.leftContainer}>
          <View style={[styles.iconContainer, { backgroundColor: colors.green }]}>
            <CheckIcon width={12.25} height={14} color={colors.white} />
          </View>
          <View style={[styles.line, { backgroundColor: colors.green }]} />
        </View>
        <View>
          <Text style={styles.title}>Documents Submitted</Text>
          <Text style={styles.time}>Today at 2:45 PM</Text>
        </View>
      </View>

      {/* Step 2: Under Review */}
      <View style={styles.row}>
        <View style={styles.leftContainer}>
          <View style={[styles.iconContainer, { backgroundColor: colors.orange_3 }]}>
            <LoadingIcon />
          </View>
          <View style={[styles.line, { backgroundColor: colors.gray }]} />
        </View>
        <View>
          <Text style={styles.title}>Under Review</Text>
          <Text style={styles.time}>In progress (24-48 hours)</Text>
        </View>
      </View>

      {/* Step 3: Verification Complete */}
      <View style={[styles.row,{marginBottom:0}]}>
        <View style={styles.leftContainer}>
          <View style={[styles.iconContainer, { backgroundColor: colors.gray }]} >
            <ShieldIcon width={14} height={14} color={colors.gray_3}/>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Verification Complete</Text>
          <Text style={styles.time}>Pending approval</Text>
        </View>
      </View>
    </View>
  );
};

export default TimeLine;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: correctSize(40),
    height: correctSize(40),
    borderRadius: 99,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    marginBottom: correctSize(5),
  },
  time: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
  },
  row: {
    flexDirection: 'row',
    gap: correctSize(16),
    height: correctSize(88),
    marginBottom: correctSize(16),
  },
  leftContainer: {
    alignItems: 'center',
  },
  line: {
    width: 2,
    flexGrow: 1,
  },
});
