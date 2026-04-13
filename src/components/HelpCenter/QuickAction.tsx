import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';

interface QuickActionProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  iconBg?: string;
  containerBg?: string;
  borderColor?: string;
   titleColor?:string
  descriptionColor?:string;
  onPress?: () => void;
}
const QuickAction = ({
  title,
  description,
  titleColor,
  descriptionColor,
  icon,
  iconBg,
  containerBg,
  borderColor,
  onPress,
}: QuickActionProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: containerBg, borderColor: borderColor },
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
        {icon}
      </View>
      <Text style={[styles.title,{color:titleColor}]}>{title}</Text>
      <Text style={[styles.description,{color:descriptionColor}]}>{description}</Text>
    </TouchableOpacity>
  );
};

export default QuickAction;
const styles = StyleSheet.create({
  container: {
    borderWidth: correctSize(2),
    borderRadius: 16,
    padding: correctSize(20),
    flex:1,
    justifyContent:"center"
  },
  iconContainer: {
    width: correctSize(48),
    height: correctSize(48),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    lineHeight: correctSize(24),
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    lineHeight: correctSize(16),
  },
});
