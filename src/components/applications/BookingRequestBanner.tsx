import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ClockFill from '../../assets/svg/applications/ClockFill';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';

const BookingRequestBanner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ClockFill width={20} height={20} color={colors.white}/>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>New Booking Request</Text>
        <Text style={styles.description}>Review the details below and respond within 24 hours</Text>
      </View>
    </View>
  );
};

export default BookingRequestBanner;
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.darkGreen3,
        paddingVertical:20,
        paddingHorizontal:24,
        flexDirection:"row",
    },
    iconContainer:{
        width:48,
        height:48,
        borderRadius:100,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.white_4,
        marginRight:correctSize(16)
    },
    heading:{
        fontSize:16,
        fontFamily:Fonts.InriaSerif_Bold,
        color:colors.white,
        lineHeight:24,
        marginBottom:5
    },
    description:{
        fontSize:14,
        fontFamily:Fonts.Inter_Regular,
        color:colors.white,
        lineHeight:23,
        flexShrink:1
    },
    textContainer:{
        flex:1
    }
})