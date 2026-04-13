import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import BackIcon from '../../../assets/svg/Home/BackIcon';
import { correctSize } from '../../../utils';
import { Fonts } from '../../../assets/fonts';
import { colors } from '../../../utils/colors';
import Badge from '../../common/Badge';
import FlashIconFill from '../../../assets/svg/Profile/FlashIconFill';

interface HeaderProps {
  step?: number;
  title?: string;
  onBack?: () => void;
  jobId?:string;
  matchPercent?:string | number
}

const ApplyJobHeader = ({ step = 1, title, onBack,jobId,matchPercent }: HeaderProps) => {
  const indicators = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
     <View style={styles.headerLeft}>
  <TouchableOpacity style={styles.backBtn} onPress={onBack}>
    <BackIcon />
  </TouchableOpacity>

  <View style={styles.textContainer}>
    <Text style={styles.title}>Apply for Job</Text>
    <Text style={styles.jobId} numberOfLines={1} ellipsizeMode='tail'>Job ID: {jobId}</Text>
  </View>
</View>

        <Badge
          leftIcon={
            <FlashIconFill color={colors.darkgray_1} width={11} height={11} />
          }
          title={`${matchPercent || 0}% Match`}
          containerStyle={styles.badge}
          textStyle={styles.badgeText}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.stepCount}>
          Step {step} of {indicators.length}
        </Text>
        <Text style={styles.nextStep}>{title}</Text>
      </View>

      <View style={styles.indicatorsRow}>
        {indicators.map(item => (
          <View
            key={item}
            style={[styles.indicator, item <= step && styles.indicatorActive]}
          />
        ))}
      </View>
    </View>
  );
};

export default ApplyJobHeader;

const styles = StyleSheet.create({
  container: {
    padding: correctSize(20),
    paddingBottom: correctSize(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    backgroundColor:colors.white
  },
  logo: {
    width: correctSize(145),
    height: correctSize(33),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-between",
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
  stepCount: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  nextStep: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 12,
    color: colors.darkgray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indicator: {
    height: correctSize(5),
    flex: 1,
    borderRadius: 10,
    backgroundColor: colors.gray,
  },
  indicatorActive: {
    backgroundColor: colors.primary,
  },
  indicatorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
    marginTop: correctSize(10),
  },
  jobId: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    
  },
  badge:{
    backgroundColor:colors.primary
  },
  badgeText:{
    fontSize:11,
    fontFamily:Fonts.Inter_Bold,
    color:colors.black
  },
  headerLeft:{
    flexDirection:"row",
    alignItems:"center",
    gap:correctSize(16),
    flex:1
  },
  textContainer: {
  flexShrink: 1,
}
});
