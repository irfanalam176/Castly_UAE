import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import ShineIcon from '../../../assets/svg/Profile/ShineIcon';
import { Fonts } from '../../../assets/fonts';

interface ApplicationSummaryCardProps {
  jobTitle?: string;
  companyInfo?: string;
  price?: string;
  daysConfirmed?: string;
  samples?: string;
}
const ApplicationSummaryCard = ({
  jobTitle = '',
  companyInfo = '',
  price = '',
  daysConfirmed = '',
  samples = '',
}: ApplicationSummaryCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ShineIcon width={13} height={13} color={colors.primary} />
        <Text style={styles.title}>Application Summary</Text>
      </View>

      {jobTitle ? <Text style={styles.jobTitle}>{jobTitle}</Text> : null}
      {companyInfo ? <Text style={styles.companyInfo}>{companyInfo}</Text> : null}

      <View style={styles.footer}>
        {price ? <Text style={styles.price}>{price}</Text> : null}
        {daysConfirmed ? (
          <>
            <Text style={styles.footerText}>·</Text>
            <Text style={styles.footerText}>{daysConfirmed}</Text>
          </>
        ) : null}
        {samples ? (
          <>
            <Text style={styles.footerText}>·</Text>
            <Text style={styles.footerText}>{samples}</Text>
          </>
        ) : null}
      </View>
    </View>
  );
};

export default ApplicationSummaryCard;
const styles = StyleSheet.create({
  container: {
    padding: correctSize(16),
    borderRadius: correctSize(16),
    backgroundColor: colors.darkgray_1,
    marginBottom: correctSize(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginBottom: correctSize(8),
  },
  title: {
    color: colors.primary,
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: correctSize(12),
  },
  jobTitle: {
    color: colors.white,
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: correctSize(15),
    lineHeight: correctSize(21),
  },
  companyInfo: {
    color: colors.gray_3,
    fontFamily: Fonts.Inter_Regular,
    fontSize: correctSize(12),
    lineHeight: correctSize(18),
    marginTop:correctSize(5)
  },
  footer: {
      flexDirection: 'row',
  alignItems: 'center',
  justifyContent:"space-between",
  borderTopWidth:1,
  borderTopColor:colors.white_rgb6,
  paddingTop:correctSize(8),
  marginTop:correctSize(12)
  },

  price: {
    color: colors.primary,
    fontFamily: Fonts.Inter_Bold,
    fontSize: correctSize(14),
    lineHeight: correctSize(21),
  },
  footerText: {
    color: colors.gray_3,
    fontFamily: Fonts.Inter_Regular,
    fontSize: correctSize(12),
    lineHeight: correctSize(18),
  },
});
