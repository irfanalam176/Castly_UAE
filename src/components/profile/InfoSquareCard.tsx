import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { correctSize } from '../../utils'
import { colors } from '../../utils/colors'
import { Fonts } from '../../assets/fonts'



interface InfoSquareCardProps {
    icon?: string
    value?: string
    label?: string
    bgColor?: string
}

const InfoSquareCard = ({ icon, label, value, bgColor }: InfoSquareCardProps) => {
  return (
    <View style={[style.card, { backgroundColor: bgColor || colors.lightBlue_2 }]}>
      <Text style={style.icon}>{icon}</Text>
      <Text style={style.value}>{value}</Text>
      <Text style={style.label}>{label}</Text>
    </View>
  )
}

export default InfoSquareCard

const style = StyleSheet.create({
    card:{
        height: correctSize(90.478),
        borderRadius: 16,
        backgroundColor: colors.lightBlue_2,
        justifyContent: "center",
        flex:1
    },
    icon:{ textAlign: "center" },
    value:{
        fontSize: 15,
        fontFamily: Fonts.Inter_Bold,
        color: colors.darkgray_1,
        textAlign: "center",
        marginVertical: correctSize(7)
    },
    label:{
        fontFamily: Fonts.Inter_Regular,
        fontSize: 10,
        color: colors.gray_4,
        textAlign: "center"
    }
})