import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import BackIcon from '../../assets/svg/Home/BackIcon';
import FastImage from 'react-native-fast-image';
import { images } from '../../assets/images';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  step?: number;
  title?: string;
  onBack?: () => void;
}

const Header = ({ step = 1, title, onBack }: HeaderProps) => {
  const indicators = [1, 2, 3, 4, 5, 6, 7];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <BackIcon />
          </TouchableOpacity>
        <FastImage
          source={images.logo}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.logo}
        />
        <Text style={styles.title}>Create Account</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.stepCount}>
          Step {step} of {indicators.length}
        </Text>
        <Text style={styles.nextStep}>{title}</Text>
      </View>

      <View style={styles.indicatorsRow}>
        {indicators.map(item => (
          <View
            key={item}
            style={[styles.indicator, item <= step && styles.indicatorActive]}
          />
        ))}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: correctSize(20),
    paddingBottom: correctSize(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  logo: {
    width: correctSize(145),
    height: correctSize(33),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(16),
    marginBottom: correctSize(20),
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.Inter_Bold,
  },
  backBtn: {
    width: correctSize(36),
    height: correctSize(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: colors.white_1,
  },
  stepCount: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  nextStep: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 12,
    color: colors.darkgray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indicator: {
    height: correctSize(5),
    flex: 1,
    borderRadius: 10,
    backgroundColor: colors.gray,
  },
  indicatorActive: {
    backgroundColor: colors.primary,
  },
  indicatorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
    marginTop: correctSize(10),
  },
});
