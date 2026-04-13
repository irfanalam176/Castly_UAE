import { View, Text, StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { Fonts } from '../../assets/fonts';
import { SvgProps } from 'react-native-svg';
import { correctSize } from '../../utils';

type Items = {
  label?: string;
  color?: string;
  bgColor?: string;
  fontFamily?: string;
  icon?: React.ReactNode;
};

type TagProps = {
  items?: Items;
};

const Tags = ({ items }: TagProps) => {
  return (
    <View style={[styles.tag, { backgroundColor: items?.bgColor }]}>
      {items?.icon}
      <Text
        style={[
          styles.tagText,
          { color: items?.color, marginLeft: items?.icon ? correctSize(6) : 0,fontFamily:items?.fontFamily??Fonts.Inter_SemiBold },
        ]}
      >
        {items?.label}
      </Text>
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: correctSize(8),
    paddingVertical: correctSize(4),
    borderRadius: 13,
  },
  tagText: {
    fontSize: 12,
  },
});
