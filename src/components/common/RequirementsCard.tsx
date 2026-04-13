import { View, Text, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import InfoIcon from '../../assets/svg/Home/InfoIcon';
import CheckIcon from '../../assets/svg/Home/CheckIcon';
import { correctSize } from '../../utils';

interface RequirementItem {
  id?: string | number;
  label?: string;
}

interface RequirementsCardProps {
  data?: RequirementItem[];
  title?: string;
  iconColor?: string;
  iconBg?: string;
  borderColor?: string;
  bgColor?: string;
  elevation?: number;
  borderWidth?:number;
  padding?:number;
  marginTop?:number;
  marginBottom?:number;
  listIcon?:React.ReactNode;
}

const RequirementsCard = ({
  data,
  title,
  iconColor,
  iconBg,
  borderColor,
  bgColor,
  elevation,
  borderWidth,
  padding,
  marginTop,
  marginBottom=0,
  listIcon
}: RequirementsCardProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderWidth:borderWidth??2,
          borderColor: borderColor ?? colors.gray,
          backgroundColor: bgColor ?? colors.white,
          elevation: elevation ?? 0, // android shadow
          padding:padding?? correctSize(21),
          ...Platform.select({
            ios: elevation
              ? {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: elevation },
                  shadowOpacity: 0.1,
                  shadowRadius: elevation * 1.5,
                }
              : {},
          }),
        },
      ]}
    >
      {title && (
        <View style={styles.row}>
          <InfoIcon color={iconColor} />
          <Text style={styles.title}>{title}</Text>
        </View>
      )}

      {data?.map(item => (
        <View style={[styles.roleRow,{marginTop:marginTop??correctSize(10), marginBottom:marginBottom}]} key={item?.id ?? Math.random().toString()}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: iconBg, marginRight: iconBg ? correctSize(8) : 0 },
            ]}
          >
            {listIcon??<CheckIcon color={iconColor} />}
          </View>
          <Text style={styles.value}>{item?.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default RequirementsCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
   
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: correctSize(10),
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginLeft: correctSize(8),
  },
  value: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 14,
    color: colors.darkgray,
    lineHeight: 20,
    flex: 1,
    flexShrink: 1,
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
