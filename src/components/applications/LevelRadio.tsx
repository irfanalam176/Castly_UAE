import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';

interface LevelRadioProps {
  label?: string;
  onPress?: () => void;
  isActive?: boolean;
}

const LevelRadio = ({ label, onPress, isActive }: LevelRadioProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.radio,
        { backgroundColor: isActive ? colors.primary : colors.white_1 },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.radioText,
          { color: isActive ? colors.black : colors.darkgray },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default LevelRadio;
const styles = StyleSheet.create({
  radio: {
    borderRadius: 14,
    height: correctSize(54),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  radioText: {
    fontSize: 15,
    fontFamily: Fonts.Inter_SemiBold,
  },
});
