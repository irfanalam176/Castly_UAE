import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';

interface PaymentFilterProps {
  label?: string;
  selected?: boolean;
  onPress?: () => void;
}

const PaymentFilter = ({ label, selected = false, onPress }: PaymentFilterProps) => {
  return (
    <TouchableOpacity
      style={[styles.filter, selected && styles.filterSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.filterText, selected && styles.filterTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default PaymentFilter;

const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    flex:1,
    gap: correctSize(5),
    backgroundColor: colors.white_1,
    paddingHorizontal: correctSize(12),
    paddingVertical: correctSize(10),
    borderRadius: 14,
  },
  filterSelected: {
    backgroundColor: colors.darkgray_1, // selected background
  },
  filterText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray,
  },
  filterTextSelected: {
    color: colors.white, 
  }

});