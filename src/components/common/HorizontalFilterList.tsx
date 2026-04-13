import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
FilterBadge
import { colors } from '../../utils/colors';
import FilterBadge from './FilterBadge';
import { Fonts } from '../../assets/fonts';
import { correctSize } from '../../utils';

interface FilterItem {
  id: number;
  label: string;
  icon?: React.ReactNode;
}

interface HorizontalFilterListProps {
  items: FilterItem[];
  selectedId: number | null;
  onSelectItem: (id: number) => void;
  containerStyle?: ViewStyle;
}

export const HorizontalFilterList: React.FC<HorizontalFilterListProps> = ({
  items,
  selectedId,
  onSelectItem,
  containerStyle,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {items.map((item) => (
        <FilterBadge
          key={item.id}
          item={item}
          labelStyle={{ color: selectedId === item.id ? colors.primary : colors.darkgray, fontSize: 14, fontFamily: Fonts.Inter_SemiBold }}
          style={{ backgroundColor: selectedId === item.id ? colors.darkgray_1 : colors.white_1, marginRight: correctSize(10),borderWidth:0 }}
          onPress={() => onSelectItem(item.id)}
        />
      ))}
    </ScrollView>
  );
};

