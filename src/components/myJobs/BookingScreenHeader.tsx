import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import BackIcon from '../../assets/svg/Home/BackIcon';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import Badge from '../common/Badge';
import { correctSize } from '../../utils';
import DotIcon from '../../assets/svg/common/DotIcon';

interface HeaderProps {
  title?: string;
  status?: string;
  onBack?: () => void;
}

const getStatusBadgeStyle = (status?: string) => {
  switch (status?.toUpperCase()) {
    case 'APPLIED':
      return {
        container: { backgroundColor: colors.lightBlue_7 },
        text: { color: colors.blue_7 },
        dotColor: colors.blue_7,
      };
    case 'SHORTLISTED':
      return {
        container: { backgroundColor: colors.yellow_4 },
        text: { color: colors.orange_4 },
        dotColor: colors.orange_4,
      };
    case 'BOOKED':
      return {
        container: { backgroundColor: colors.green_1 },
        text: { color: colors.green_5 },
        dotColor: colors.green_5,
      };
    default:
      return {
        container: { backgroundColor: colors.primary },
        text: { color: colors.black },
        dotColor: colors.red,
      };
  }
};

const BookingScreenHeader = ({
  onBack,
  status,
}: HeaderProps) => {
  const badgeStyle = getStatusBadgeStyle(status);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <BackIcon />
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <Text style={styles.title}>Booking Details</Text>
          </View>
        </View>

        {status && (
          <Badge
            leftIcon={<DotIcon width={6} height={6} color={badgeStyle.dotColor} />}
            title={status}
            containerStyle={[styles.badge, badgeStyle.container]}
            textStyle={[styles.badgeText, badgeStyle.text]}
          />
        )}
      </View>
    </View>
  );
};

export default BookingScreenHeader;

const styles = StyleSheet.create({
  container: {
    padding: correctSize(20),
    paddingBottom: correctSize(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(20),
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
  },
  backBtn: {
    width: correctSize(36),
    height: correctSize(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: colors.white_1,
  },
  jobId: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  badge: {
    backgroundColor: colors.primary,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.black,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(16),
    flex: 1,
  },
  textContainer: {
    flexShrink: 1,
  },
});