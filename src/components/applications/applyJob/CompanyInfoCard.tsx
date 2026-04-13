import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';

interface CompanyInfoCardProps {
  initial?: string;
  jobTitle?: string;
  companyName?: string;
  salary?: string;
  time?: string;
}
const CompanyInfoCard = ({
  initial = '',
  jobTitle = '',
  companyName = '',
  salary = '',
  time = '',
}: CompanyInfoCardProps) => {
  return (
    <View style={styles.companyInfoCard}>
      <View style={styles.leftSide}>
        <View style={styles.initialContainer}>
          <Text style={styles.initial}>{initial}</Text>
        </View>
        <View style={styles.textContainer}>
          {jobTitle ? <Text style={styles.jobTitle}>{jobTitle}</Text> : null}
          {companyName ? <Text style={styles.companyName}>{companyName}</Text> : null}
        </View>
      </View>
      <View>
        {salary ? <Text style={styles.salary}>{salary}</Text> : null}
        {time ? <Text style={styles.time}>{time}</Text> : null}
      </View>
    </View>
  );
};

export default CompanyInfoCard;
const styles = StyleSheet.create({
  companyInfoCard: {
    padding: correctSize(16),
    borderRadius: correctSize(16),
    backgroundColor: colors.darkgray_1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: correctSize(16),
  },
  leftSide:{
    flexDirection: 'row',
    alignItems: 'center',
     flex: 1,
  },
  initialContainer: {
    backgroundColor: colors.white_rgb6,
    borderRadius: 14,
    width: correctSize(40),
    height: correctSize(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: correctSize(12),
  },
  initial: {
    color: colors.white,
    fontFamily: Fonts.Inter_Bold,
    fontSize: 15,
    lineHeight: correctSize(22.5),
  },
  jobTitle: {
    color: colors.white,
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 13,
    lineHeight: correctSize(19.5),
    width: '90%',
  },
  companyName: {
    color: colors.gray_3,
  fontFamily: Fonts.Inter_Regular,
  fontSize: 11,
  lineHeight: correctSize(16.5),
  },
  salary: {
      color: colors.primary,
  fontFamily: Fonts.Inter_Bold,
  fontSize: correctSize(13),
  lineHeight: correctSize(20),
  },
  time: {
    color: colors.gray_4,
  fontFamily: Fonts.Inter_Regular,
  fontSize: correctSize(10),
  lineHeight: correctSize(15),
  },
  textContainer:{
    flex: 1,
  }
});
