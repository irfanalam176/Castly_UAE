import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import ArrowRight from '../../assets/svg/applications/ArrowRight';
import StarIcon from '../../assets/svg/applications/StarIcon';
import { correctSize } from '../../utils';


interface AboutBrandCardProps{
    title?:string;
    rating?:number,
    jobCount?:number
}

const AboutBrandCard = ({title,rating,jobCount}:AboutBrandCardProps) => {
  return (
    <View style={styles.aboutBrand}>
      <View style={styles.mainRow}>
        <Text style={styles.initials}>LF</Text>

        <View>
          <Text style={styles.brandName}>{title}</Text>
          <View style={styles.row}>
            <View style={styles.rating}>
              <StarIcon color={colors.orange} />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
            <View style={styles.dot} />
            <Text style={styles.locationText}>{jobCount} jobs posted</Text>
          </View>
        </View>
      </View>

      <View style={styles.arrowContainer}>
        <ArrowRight />
      </View>
    </View>
  );
};

export default AboutBrandCard;

const styles = StyleSheet.create({
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(4),
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 50,
    backgroundColor: colors.gray_5,
    marginHorizontal: 8,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  locationText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
  },

  initials: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.gray_1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: Fonts.Inter_Bold,
    color: colors.white,
    marginRight: 16,
  },
  brandName: {
    fontSize: 14,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    width:183
  },
  aboutBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.lightBlue_5,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
