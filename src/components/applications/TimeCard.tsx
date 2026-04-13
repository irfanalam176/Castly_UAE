import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';

interface TimeCardProps{
    label?:number | string;
    unit?:string
}

const TimeCard = ({label,unit}:TimeCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.unit}>{unit}</Text>
    </View>
  );
};

export default TimeCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    borderRadius: 16,
    padding: correctSize(16),
    // iOS
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,

    // Android
    elevation: 7,
    flex:1
  },
  label: {
    fontSize: 30,
    fontFamily: Fonts.Inter_Bold,
    lineHeight: 36,
    marginBottom: correctSize(4),
    textAlign: 'center',
    color:colors.white
  },
  unit: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Medium,
    color: colors.lightBlue_3,
    textAlign:"center"
  },
});
