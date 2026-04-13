import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';

interface EarningCardProps {
  icon?: React.ReactNode;
  title?: string;
  amount?: string;
  unit?: string;
  onPress?: () => void;
}
const EarningCard = ({ icon,title,amount,unit,onPress }: EarningCardProps) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>{amount}</Text>
      <Text style={styles.unit}>{unit}</Text>
    </TouchableOpacity>
  );
};

export default EarningCard;
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: correctSize(21),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    flex: 1,
    alignSelf:"flex-start",
    borderWidth:1,
    borderColor:colors.white_1
  },
  iconContainer: {
    backgroundColor: colors.gray_6,
    borderRadius: 14,
    width: correctSize(40),
    height: correctSize(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Medium,
    color: colors.gray_4,
    marginVertical: correctSize(12),
  },
  amount: {
    fontSize: 24,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(4),
  },
  unit: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
});
