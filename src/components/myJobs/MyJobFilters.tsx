import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';

interface MyJobFiltersProps {
  label?: string;
  count?: string;
  selected?: boolean;
  onPress?: () => void;
}

const MyJobFilters = ({ label, count, selected = false, onPress }: MyJobFiltersProps) => {
  return (
    <TouchableOpacity
      style={[styles.filter, selected && styles.filterSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.filterText, selected && styles.filterTextSelected]}>
        {label}
      </Text>
      <View style={[styles.filterCount, selected && styles.filterCountSelected]}>
        <Text style={[styles.filterCountText, selected && styles.filterCountTextSelected]}>
          {count}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyJobFilters;

const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
    backgroundColor: colors.white_1,
    paddingHorizontal: correctSize(12),
    paddingVertical: correctSize(6),
    borderRadius: 100,
  },
  filterSelected: {
    backgroundColor: colors.darkgray_1, // selected background
  },
  filterText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray,
  },
  filterTextSelected: {
    color: colors.white, // selected text
  },
  filterCount: {
    width: correctSize(19),
    height: correctSize(19),
    borderRadius: 100,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterCountSelected: {
    backgroundColor: colors.gray_8,
  },
  filterCountText: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  filterCountTextSelected: {
    color: colors.white,
  },
});