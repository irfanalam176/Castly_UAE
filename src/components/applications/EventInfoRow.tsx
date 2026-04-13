import { View, Text, StyleSheet, TextProps, TextStyle } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';

interface VerificationCardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  icongBgSize?: number;
  iconborderRadius?: number;
  titleStyle?:TextStyle,
  descriptionStyle?:TextStyle
}

const EventInfoRow = ({
  title,
  description,
  icon,
  iconBg,
  icongBgSize = 32,
  iconborderRadius = 100,
  titleStyle,
  descriptionStyle
}: VerificationCardProps) => {
  return (
    <View style={styles.row}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: iconBg ?? colors.lightGreen_1,
            width: icongBgSize,
            height: icongBgSize,
            borderRadius: iconborderRadius,
          },
        ]}
      >
        {icon}
      </View>
      <View style={{flex:1}}>
        <Text style={[styles.title,titleStyle]}>{title}</Text>
        <Text style={[styles.description,descriptionStyle]}>{description}</Text>
      </View>
    </View>
  );
};

export default EventInfoRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems:"flex-start"
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
    lineHeight: 16,
    width:"90%",
    flexShrink:1
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
});
