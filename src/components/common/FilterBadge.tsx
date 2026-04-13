import { Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle, StyleProp } from 'react-native';
import React from 'react';
import { View } from 'moti';
import { correctSize } from '../../utils';

type Items = {
  id?: number;
  label?: string;
  icon?: React.ReactNode;
};

type FilterBadgeProps = {
  style?:StyleProp<ViewStyle>;
  item?: Items;
  onPress?: () => void;
  labelStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
};

const FilterBadge = ({
  item,
  onPress,
  labelStyle,
  icon,
  style
}: FilterBadgeProps) => {
  return (
    <TouchableOpacity
    activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.badge,
       style
      ]}
    >
      <View style={styles.badgeContainer}>
        {item?.icon || icon}
        <Text
          style={labelStyle}
        >
          {item?.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FilterBadge;

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    paddingVertical: correctSize(8),
    paddingHorizontal: correctSize(13),
    borderRadius: 50,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: correctSize(6),
  },
});
