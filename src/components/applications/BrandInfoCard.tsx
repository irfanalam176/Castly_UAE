import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import StarIcon from '../../assets/svg/applications/StarIcon';
import CustomButton from '../common/CustomButton';

interface BrandInfoCardProps {
  brand?: string;
  rating?: number;
  bookings?: number;
  onPress?: () => void;
}

const BrandInfoCard = ({
  brand,
  rating,
  bookings,
  onPress,
}: BrandInfoCardProps) => {
  const initials =
    brand
      ?.trim()
      .split(' ')
      .filter(Boolean)
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || '';

  return (
    <View>
      <Text style={styles.heading}>Brand Information</Text>

      <View style={styles.header}>
        <View style={styles.initialsContainer}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
        <View>
          <Text style={styles.brand}>{brand}</Text>
          <View style={styles.row}>
            <View style={styles.rating}>
              <StarIcon color={colors.orange} />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
            <View style={styles.dot} />
            <Text style={styles.locationText}>{bookings} bookings</Text>
          </View>
        </View>
      </View>
      <CustomButton
        title="View Brand Profile"
        onPress={onPress}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

export default BrandInfoCard;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  initialsContainer: {
    width: correctSize(64),
    height: correctSize(64),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray_1,
    marginRight: correctSize(16),
    marginBottom: correctSize(16),
  },
  initials: {
    color: colors.white,
    fontSize: 20,
    fontFamily: Fonts.Inter_Bold,
  },
  brand: {},
  heading: {
    fontSize: 14,
    marginBottom: correctSize(16),
    fontFamily: Fonts.InriaSerif_Bold,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: correctSize(12),
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
    marginHorizontal: correctSize(8),
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
  button: {
    backgroundColor: colors.lightBlue_5,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: correctSize(13),
    marginBottom: correctSize(16),
  },
  buttonText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 14,
    textTransform: 'capitalize',
    color: colors.darkgray,
  },
});
