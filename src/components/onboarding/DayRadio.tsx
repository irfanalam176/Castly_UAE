import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { correctSize } from '../../utils'
import { colors } from '../../utils/colors'
import { Fonts } from '../../assets/fonts'

interface DayRadioProps {
  style?: StyleProp<ViewStyle>;
  day?: string;
  onPress?: () => void;
  isActive?: boolean;
}

const DayRadio = ({ style, day, onPress, isActive }: DayRadioProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.radio, isActive && styles.radioActive, style]}
      onPress={onPress}
    >
      <Text style={isActive ? [styles.day, styles.dayActive] : styles.day}>{day}</Text>
      <View style={isActive ? [styles.dot, styles.dotActive] : styles.dot} />
    </TouchableOpacity>
  )
}

export default DayRadio

const styles = StyleSheet.create({
  radio: {
    borderRadius: 14,
    borderWidth: 1.4,
    borderColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: correctSize(14),
    flex:1
  },
  radioActive: {
    backgroundColor: colors.darkgray_1,
    borderColor: colors.darkgray_1,
  },
  dot: {
    width: correctSize(6),
    height: correctSize(6),
    borderRadius: 100,
    backgroundColor: colors.gray_4,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  day: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray,
    marginBottom: correctSize(6),
  },
  dayActive: {
    color: colors.primary,
  },
})