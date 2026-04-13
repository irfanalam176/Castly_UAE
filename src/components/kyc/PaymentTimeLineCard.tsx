import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import CheckIcon from '../../assets/svg/applications/CheckIcon';
import { Fonts } from '../../assets/fonts';

type TimeLineItem = {
  id?: string | number;
  title?: string;
  time?: string;
};

interface PaymentTimeLineCardProps {
  timeLine?: TimeLineItem[];
}
const PaymentTimeLineCard = ({ timeLine }: PaymentTimeLineCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment Timeline</Text>

      {timeLine?.map(item => (
        <View style={styles.row} key={item.id}>
          <View style={styles.iconContainer}>
            <CheckIcon width={10.5} height={12} color={colors.white} />
          </View>

          <View>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.time}>{item?.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PaymentTimeLineCard;
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.white_1,
    padding: correctSize(24),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    // Android
    elevation: 2,
    backgroundColor: colors.lightBlue_5,
    overflow: 'hidden',
    marginBottom: correctSize(48),
  },
  heading: {
    fontSize: 16,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(16),
  },
  row: {
    flexDirection: 'row',
    marginBottom:correctSize(24)
  },
  iconContainer: {
    width: correctSize(32),
    height: correctSize(32),
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: correctSize(16),
    backgroundColor: colors.gray_1,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
    marginBottom: correctSize(5),
  },
  time: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
  },
});
