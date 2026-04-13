import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';

interface CompensationCardProps {
  item: any;
}

const CompensationCard = ({ item }: CompensationCardProps) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.compensationTypeText}>
          {item?.rateType == 'HOURLY' ? 'Hourly' : 'Daily'} Rate
        </Text>
        <Text
          style={[
            styles.dailyRateText,
            {
              fontFamily: Fonts.Inter_Bold,
              fontSize: 14,
              color: colors.darkgray_1,
            },
          ]}
        >
          {item?.rateType == 'HOURLY' ? item?.hourlyRate : item?.dailyRate} /{' '}
          {item?.rateType == 'HOURLY' ? 'hour' : 'day'}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.compensationTypeText}>Total Days</Text>
        <Text
          style={[
            styles.dailyRateText,
            {
              fontFamily: Fonts.Inter_SemiBold,
              fontSize: 14,
              color: colors.darkgray_1,
            },
          ]}
        >
          {item?.shootDays} Days
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.compensationTypeText}>Base Pay</Text>
        <Text
          style={[
            styles.dailyRateText,
            {
              fontFamily: Fonts.Inter_Bold,
              fontSize: 15,
              color: colors.green_7,
            },
          ]}
        >
          AED {item?.totalBudget}
        </Text>
      </View>
      {/* <View style={styles.container}>
                <Text style={styles.compensationTypeText}>Bonus</Text>
                <Text style={[styles.dailyRateText, { fontFamily: Fonts.Inter_Medium, fontSize: 13, color: colors.darkgray_1 }]}>{item?.bonus || 0}</Text>
            </View> */}
      <View style={styles.container}>
        <Text style={styles.compensationTypeText}>Payment Terms</Text>
        <Text
          style={[
            styles.dailyRateText,
            {
              fontFamily: Fonts.Inter_Regular,
              fontSize: 12,
              color: colors.darkgray,
            },
          ]}
        >
          {item?.paymentTerms}
        </Text>
      </View>
    </View>
  );
};

export default CompensationCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: correctSize(12),
  },
  compensationTypeText: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 13,
    color: colors.gray_4,
    lineHeight: 20,
    width: '45%',
  },
  dailyRateText: {
    width: '55%',
    flexWrap: 'wrap',
    textAlign: 'right',
  },
});
