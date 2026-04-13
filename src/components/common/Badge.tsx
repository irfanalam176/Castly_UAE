import { StyleSheet, Text, View, StyleProp, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import { Fonts } from '../../assets/fonts'
import { colors } from '../../utils/colors'
import { correctSize } from '../../utils';

export interface BadgeProps {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?:React.ReactNode
  rightIcon?:React.ReactNode
}

export default function Badge({ title, containerStyle, textStyle,leftIcon,rightIcon }: BadgeProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon}
      <Text style={[styles.text, textStyle]}>
        {title}
      </Text>
      {rightIcon}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: "center",
    paddingHorizontal: correctSize(10),
    paddingVertical: correctSize(5),
    borderRadius: 20,
    backgroundColor: colors.gray_2,
    flexDirection:"row",
    gap:correctSize(5)
  },
  text: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    alignSelf: 'center',
  }
})