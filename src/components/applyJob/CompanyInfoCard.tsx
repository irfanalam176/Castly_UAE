import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import BuildingIcon from '../vectorIcons/BuildingIcon';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import CalendarFillIcon from '../../assets/svg/Home/CalendarFillIcon';
import ClockIcon from '../../assets/svg/Home/ClockIcon';
import LocationPin from '../../assets/svg/Home/LocationPin';
import LinearGradient from 'react-native-linear-gradient';
import { correctSize } from '../../utils';
import { formatDate } from '../../utils/formatDate';

interface CompanyInfoCardProps {
  title?: string;
  location?: string;
  jobDate?: string;
  companyName?: string;
}
const CompanyInfoCard = ({
  title,
  location,
  jobDate,
  companyName,
}: CompanyInfoCardProps) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.lightBlue_2, colors.lightBlue_4]}
        style={styles.gradient}
      >
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <BuildingIcon />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{title || 'N/A'}</Text>
            <Text style={styles.description}>{companyName || 'N/A'}</Text>
            <View style={styles.locationRow}>
              <LocationPin />
              <Text style={styles.locationText}>{location || 'N/A'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.dateContainer}>
          <View style={styles.dateRow}>
            <CalendarFillIcon />
            <Text style={styles.dateStyle}>{formatDate(jobDate) || 'N/A'}</Text>
          </View>

          {/* <View style={styles.dateRow}>
        <ClockIcon/>
        <Text style={styles.dateStyle}>9:00 AM - 5:00 PM</Text>
       </View> */}
        </View>
      </LinearGradient>
    </View>
  );
};

export default React.memo(CompanyInfoCard);

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.lightBlue_3,
    backgroundColor: 'transparent',
    overflow: 'hidden', // 👈 ADD THIS - clips the gradient to border radius
  },
  gradient: {
    borderRadius: 16,
    padding: correctSize(21),
  },
  row: {
    flexDirection: 'row',
    gap: correctSize(16),
    justifyContent: 'flex-start',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(6),
  },
  locationText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.InriaSerif_Bold,
    lineHeight: 28,
    color: colors.darkgray_1,
    flexShrink: 1,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
  },
  dateStyle: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(6),
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    marginVertical: correctSize(16),
    height: 1,
    backgroundColor: colors.lightBlue_3,
  },
});
