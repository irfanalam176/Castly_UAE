import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import CoinsIcon from '../../assets/svg/applications/CoinsIcon';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import ShieldIcon from '../../assets/svg/applications/ShieldIcon';
import { correctSize } from '../../utils';

const EarningCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>Your Earnings</Text>
          <Text style={styles.description}>AED 800</Text>
        </View>
        <View style={styles.iconContainer}>
          <CoinsIcon />
        </View>
      </View>

      <View style={styles.footer}>
        <ShieldIcon color={colors.white} />
        <Text style={styles.footerText}>
          Secured in escrow • Released after completion
        </Text>
      </View>
    </View>
  );
};

export default EarningCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    borderRadius: 16,
    paddingVertical: correctSize(26),
    paddingHorizontal: correctSize(24),
    // iOS
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,

    // Android
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: correctSize(16),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white_3,
    borderRadius: 16,
    width: 56,
    height: 56,
  },
  heading: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.lightBlue_3,
    marginBottom: correctSize(6),
  },
  description: {
    fontSize: 30,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.white,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
  },
  footerText: {
    fontSize: 14,
    color: colors.lightBlue_3,
    fontFamily: Fonts.Inter_Regular,
  },
});
