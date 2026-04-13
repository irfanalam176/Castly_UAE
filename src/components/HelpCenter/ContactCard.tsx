import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { correctSize } from '../../utils'
import { colors } from '../../utils/colors'
import { Fonts } from '../../assets/fonts'

interface ContactCardProps{
    icon?:React.ReactNode
    iconBg?:string
    label?:string
    contact?:string
}
const ContactCard = ({icon,iconBg,label,contact}:ContactCardProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer,{backgroundColor:iconBg}]}>
        {icon}
      </View>

      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.contact}>{contact}</Text>
      </View>
    </View>
  )
}

export default ContactCard
const styles = StyleSheet.create({
    container:{
        padding:correctSize(16),
        borderRadius:16,
        backgroundColor:colors.white,
        flexDirection:"row",
        alignItems:"center"
    },
    iconContainer:{
        width:correctSize(40),
        height:correctSize(40),
        marginRight:correctSize(12),
        borderRadius:8,
        alignItems:"center",
        justifyContent:"center"
    },
    label:{
        fontSize:12,
        fontFamily:Fonts.Inter_Medium,
        color:colors.gray_4
    },
    contact:{
        fontSize:14,
        fontFamily:Fonts.Inter_SemiBold,
        color:colors.darkgray_1
    }
})