import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { correctSize } from '../../utils';
import LockIcon from '../../assets/svg/applications/LockIcon';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';

interface AmountCardProps {
  title?: string;
  amount?: string;
  description?: string;
  descriptionColor?: string;
  icon?: React.ReactNode;
  gradientColors: [string, string];
}
const AmountCard = ({
  title,
  amount,
  description,
  icon,
  gradientColors,
  descriptionColor,
}: AmountCardProps) => {
  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      locations={[0, 0.7071]}
      style={styles.container}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>AED {amount}</Text>
      <View style={styles.row}>
        {icon}
        <Text style={[styles.description, { color: descriptionColor }]}>
          {description}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default AmountCard;
const styles = StyleSheet.create({
  container: {
    padding: correctSize(16),
    borderRadius: 12,
    marginVertical: correctSize(16),
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    color: colors.gray_1,
    textAlign: 'center',
  },
  amount: {
    fontSize: 30,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginTop: correctSize(6),
    marginBottom: correctSize(12),
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: correctSize(8),
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Medium,
  },
});
