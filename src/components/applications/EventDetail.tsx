import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import CalendarIcon from '../../assets/svg/applications/CalendarIcon';
import PinIcon from '../../assets/svg/applications/PinIcon';
import CashIcon from '../../assets/svg/applications/CashIcon';
import ClockIcon from '../../assets/svg/Home/ClockIcon';
import HelpDotted from '../vectorIcons/HelpDotted';
import ClockOutlineIcon from '../../assets/svg/applications/ClockOutlineIcon';
import { correctSize } from '../../utils';

interface EventDetailProps {
  label?: string;
  detail?: string;
  time?: string;
  icon?: React.ReactNode;
  id?: number;
}

const EventDetail = ({ label, detail, time, id }: EventDetailProps) => {
  let Icon;
  let iconBg;
  switch (id) {
    case 1:
      Icon = <CalendarIcon width={15.75} height={18} />;
      iconBg = colors.lightBlue_2;
      break;
    case 2:
      Icon = <PinIcon width={22} height={22} color={colors.gray_1} />;
      iconBg = colors.lightBlue_4;
      break;
    case 3:
      Icon = <CashIcon width={20.25} height={18} color={colors.green} />;
      iconBg = colors.green_1;
      break;
    case 4:
      Icon = <ClockOutlineIcon width={18} height={18} color={colors.orange} />;
      iconBg = colors.lightYellow;
      break;
    default:
      Icon = <HelpDotted />;
      break;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer,{backgroundColor:iconBg}]}>{Icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.detail}>{detail}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

export default EventDetail;

const styles = StyleSheet.create({
  container: {
    marginBottom: correctSize(16),
    flexDirection: 'row',
     alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:correctSize(18)
  },
  textContainer:{
    flex:1,
    flexShrink:1
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.gray_4,
  },
  detail: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginVertical: correctSize(5),
  },
  time: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
  },
});
