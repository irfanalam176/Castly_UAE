import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { Switch } from 'react-native-switch';

interface OptionsProps {
  id?: number;
  label?: string;
}
interface OptionsCardProps {
  title?: string;
  options?: OptionsProps[];
  values?: Record<string, boolean>; // Add this
  onValueChange?: (id: string, value: boolean) => void;
}
const OptionsCard = ({
  title,
  options,
  values = {},
  onValueChange,
}: OptionsCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleHeader}>
        <Text style={styles.heading}>{title}</Text>
      </View>

      {options?.map(item => (
        <View style={styles.row} key={item.id}>
          <Text style={styles.label}>{item.label}</Text>

          <Switch
            value={!!values[item.id!]}
            onValueChange={val => onValueChange?.(item.id!.toString(), val)}
            activeText={''}
            inActiveText={''}
            circleSize={20}
            barHeight={24}
            circleBorderWidth={1}
            circleBorderInactiveColor={colors.gray}
            circleBorderActiveColor={colors.primary}
            backgroundActive={colors.primary}
            backgroundInactive={colors.gray}
            circleActiveColor={colors.white}
            circleInActiveColor={colors.white}
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={2}
            switchRightPx={2}
            switchWidthMultiplier={2.3}
          />
        </View>
      ))}
    </View>
  );
};

export default OptionsCard;
const styles = StyleSheet.create({
  container: {
    padding: correctSize(21),
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.white_1,

    elevation: 1,

    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    marginVertical: correctSize(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(14),
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray,
  },
  heading: {
    fontSize: 18,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
    // marginTop: correctSize(30),
    marginBottom: correctSize(12),
  },
});
