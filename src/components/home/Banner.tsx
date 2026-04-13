import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import Icons from '../vectorIcons/Icons';
import CustomButton from '../common/CustomButton';
import HelpDotted from '../vectorIcons/HelpDotted';
import { correctSize } from '../../utils';
import JobMatchIcon from '../../assets/svg/Home/JobMatchIcon';

interface BannerProps{
  totalMatchingJobs?:number | string
}
const Banner = ({totalMatchingJobs}:BannerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <JobMatchIcon />
      </View>

      <View style={styles.badge}>
        <Text style={styles.title}>{totalMatchingJobs || 0} jobs match your profile</Text>
        <Text style={styles.descripton}>
          Based on your skills, experience & past bookings
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="View All"
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkgray_1,
    borderRadius: 16,
    padding: correctSize(16),
    overflow: "hidden",
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 14,
    color: colors.white,
    marginBottom: correctSize(2),
    lineHeight: 21
  },
  descripton: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 11,
    color: colors.gray_4,
    lineHeight: 17
  },
  iconContainer: {
    backgroundColor: colors.white_rgb2,
    borderWidth: 1,
    borderColor: colors.white_rgb3,
    padding: correctSize(11),
    borderRadius: 12,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: correctSize(12)
  },
  badgeText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 12,
    color: colors.white,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: correctSize(12),
    paddingVertical: correctSize(6),
    backgroundColor: colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Bold,
    color: colors.black,
    textAlign: 'center',
  },
});
