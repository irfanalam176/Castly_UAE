import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';


interface BookingCardHeadersProps{
    title?:string,
    icon?:React.ReactNode,
    color?:string
}

const BookingCardHeaders = ({title,icon,color}:BookingCardHeadersProps) => {
  return (
    <View style={styles.header}>
        <View style={styles.iconContainer}>
            {icon}
        </View>
      <Text style={[styles.heading,{color:color??colors.darkgray_1}]}>{title}</Text>
    </View>
  );
};

export default BookingCardHeaders;
const styles = StyleSheet.create({
    header:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:correctSize(16)
    },
    heading:{
        fontSize:14,
        fontFamily:Fonts.InriaSerif_Bold
    },
    iconContainer:{
        marginRight:8
    }
})
