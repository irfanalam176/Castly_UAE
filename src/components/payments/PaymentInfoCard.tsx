import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';

interface PaymentInfoCardProps{
    icon?:string;
    title?:string
    lable?:string;
    bgColor?:string
}
const PaymentInfoCard = ({title,icon,lable,bgColor}:PaymentInfoCardProps) => {
  return (
    <View style={[styles.card,{backgroundColor:bgColor}]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.amount}>{title}</Text>
      <Text style={styles.label}>{lable}</Text>
    </View>
  )
}

export default PaymentInfoCard
const styles= StyleSheet.create({
    card:{
        borderRadius:correctSize(16),
        padding:correctSize(16),
        width:"48%"
    },
    icon:{
        fontSize:20
    },
    amount:{
        fontSize:16,
        fontFamily:Fonts.Inter_Bold,
        color:colors.darkgray_1,
        marginVertical:correctSize(10)
    },
    label:{
        fontSize:11,
        fontFamily:Fonts.Inter_Regular,
        color:colors.gray_4
    }
})