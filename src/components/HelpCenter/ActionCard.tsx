import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { correctSize } from '../../utils'
import { Fonts } from '../../assets/fonts'
import { colors } from '../../utils/colors'
import CheveronRight from '../../assets/svg/kyc/CheveronRight'

interface ActionCardProps{
    icon?:React.ReactNode
    title?:string
    description?:string
    iconBg?:string
    onPress?:()=>void
}

const ActionCard = ({icon,title,description,iconBg,onPress}:ActionCardProps) => {
  return (
    <TouchableOpacity style={styles.container}  activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.iconContainer,{backgroundColor:iconBg}]}>
            {icon}
      </View>

      <View style={{flex:1}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <CheveronRight/>
    </TouchableOpacity>
  )
}

export default ActionCard
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderRadius:12,
        backgroundColor:colors.white,
        padding:correctSize(18),
        borderWidth:correctSize(2),
        borderColor:colors.gray,
        marginBottom:correctSize(12)
    },
    iconContainer:{
        width:correctSize(40),
        height:correctSize(40),
        marginRight:correctSize(16),
        borderRadius:8,
        alignItems:"center",
        justifyContent:"center"
    },
    title:{
        fontSize:14,
        fontFamily:Fonts.InriaSerif_Bold,
        color:colors.darkgray_1,
        lineHeight:correctSize(20)
    },
    description:{
        fontSize:12,
        fontFamily:Fonts.Inter_Regular,
        color:colors.gray_4,
    }
})