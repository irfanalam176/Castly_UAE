import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';

const DateCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>Today, Dec 15</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.label}>Date</Text>
        <Text style={[styles.value]}>2:00 PM - 6:00 PM</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.label}>Payment</Text>
        <Text style={[styles.value, styles.amount]}>AED 800</Text>
      </View>
    </View>
  );
};

export default DateCard;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.white_1,
    paddingTop: correctSize(17),
    marginTop: correctSize(16),
    gap: correctSize(16),
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
  },
  value: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
  },
  amount: {
    color: colors.purple,
  },
  column: {
    flex: 1,
  },
});
