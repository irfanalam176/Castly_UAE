import { View, Text, StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import BriefCaseIcon from '../vectorIcons/BriefCaseIcon';
import LinearGradient from 'react-native-linear-gradient';
import { correctSize } from '../../utils';

interface JobHeaderProps {
  title?: string;
  brand?: string;
  withGradient?: boolean;
  gradientColors?: [string,string];
  icon?: React.ReactNode;
}

const JobHeader = ({
  title,
  brand,
  icon,
  children,
  withGradient = false,
  gradientColors = ['#6A11CB', '#2575FC'],
}: PropsWithChildren<JobHeaderProps>) => {
  return (
    <View style={styles.jobHeader}>
      {withGradient ? (
        <LinearGradient
          colors={gradientColors}
          style={styles.jobIconContainer}
        >
          {icon??brand?<Text style={styles.initials}>{brand?.trim()[0]}</Text>:""}
        </LinearGradient>
      ) : (
        <View style={styles.jobIconContainer}>
          {icon??brand?<Text style={styles.initials}>{brand?.trim()[0]}</Text>:""}
        </View>
      )}

      <View style={{flex:1}}>
        <Text style={styles.jobHeading}>{title}</Text>
        <Text style={styles.industryText}>{brand}</Text>
        {children}
      </View>
    </View>
  );
};

export default JobHeader

const styles = StyleSheet.create({
  initials:{
    fontFamily:Fonts.Inter_Bold,
    fontSize:24,
    color:colors.white
  },
  jobIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: colors.gray_1,
    borderRadius: 12,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: correctSize(16),
  },
  jobHeader: {
    flexDirection: 'row',
  },
  jobHeading: {
    fontSize: 18,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    lineHeight: 28,
    width: '80%',
  },
  industryText: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 14,
    color: colors.gray_1,
    marginTop: correctSize(5),
  },
});
