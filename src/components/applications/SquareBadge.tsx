import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';

export interface BadgeProps {
  bgColor?: string;
  title: string;
  titleColor?: string;
  titleFamily?: string;
  titleSize?: number;
  icon?: React.ReactNode;
}

export default function SquareBadge({
  bgColor,
  title,
  titleColor,
  titleFamily,
  titleSize,
  icon,
}: BadgeProps) {
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {icon}
      <Text
        style={{
          fontSize: titleSize || 12,
          fontFamily: titleFamily || Fonts.Inter_Regular,
          color: titleColor || colors.gray_4,
          alignSelf: 'center',
        }}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: correctSize(10),
    paddingVertical: correctSize(10),
    borderRadius: 8,
    gap: correctSize(4),
  },
});
