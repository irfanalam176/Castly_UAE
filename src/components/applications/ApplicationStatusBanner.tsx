import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import CheckIcon from '../../assets/svg/applications/CheckIcon';
import { correctSize } from '../../utils';

const ApplicationStatusBanner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <CheckIcon color={colors.green} width={21} height={24} />
      </View>

      <Text style={styles.title}>You're Shortlisted! 🎉</Text>
      <Text style={styles.descripton}>
        Great news! The brand loved your profile and wants to move forward with
        you for this role.
      </Text>

      <View style={styles.circleRight} />
      <View style={styles.circleLeft} />
    </View>
  );
};

export default ApplicationStatusBanner;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkgray_1,
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    marginBottom:correctSize(32)
  },
  circleRight: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 200,
    backgroundColor: colors.white_3,
    top: -64,
    right: -64,
  },
  circleLeft: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 200,
    backgroundColor: colors.white_3,
    bottom: -48,
    left: -48,
  },
  title: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 24,
    color: colors.white,
    marginTop: correctSize(16),
    marginBottom: correctSize(8),
  },
  descripton: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 16,
    color: colors.green_1,
    marginBottom: correctSize(24),
    lineHeight:21
  },
  iconContainer: {
    backgroundColor: colors.white,
    padding: 11,
    borderRadius: 100,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
