import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';

interface FileCardProps {
  name?: string;
  size?: string | number;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  borderWidth?: number;
  iconBg?: string;
  padding?: number;
  cardBg?:string;
   rightIconSize?:number;
  rightIconRadius?:number;
  elevation?:number;
  rightIconBg?:string
}

const FileCard = ({
  name,
  size,
  icon,
  rightIcon,
  borderWidth = 0,
  padding,
  iconBg = colors.pink_3,
  cardBg,
  rightIconSize=32,
  rightIconRadius=100,
  elevation,
  rightIconBg
}: FileCardProps) => {
  return (
    <View style={[styles.row,{
       padding: padding ?? correctSize(17),
       backgroundColor:cardBg??colors.lightBlue_5,
    }]}>
      <View
        style={[
          styles.iconContainer,
          {
            borderWidth: borderWidth,
            borderColor: colors.gray,
            backgroundColor: iconBg,
          },
        ]}
      >
        {icon}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.size}>{size} MB</Text>
      </View>

      <TouchableOpacity
      style={[
        styles.rightIcon,
        {
        borderRadius:rightIconRadius,
        backgroundColor:rightIconBg,
        width:rightIconSize,
        height:rightIconSize
      }
      ]}
      >{rightIcon}</TouchableOpacity>
    </View>
  );
};

export default FileCard;

const styles = StyleSheet.create({
  rightIcon:{
    alignItems:"center",
    justifyContent:"center"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    
  },
  name: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray_1,
  },
  size: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
  },
  iconContainer: {
    width: correctSize(40),
    height: correctSize(40),
    marginRight: correctSize(12),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
