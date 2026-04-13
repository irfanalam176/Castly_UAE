import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors'
import { correctSize } from '../../utils'
import { Fonts } from '../../assets/fonts'
import ArrowOutIcon from '../../assets/svg/kyc/ArrowOutIcon'

interface ResourceCardProps{
    icon?:React.ReactNode
    title?:string
    onPress?:()=>void
}

const ResourceCard = ({icon,title,onPress}:ResourceCardProps) => {
  return (
    <TouchableOpacity style={styles.container}  activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.iconContainer]}>
            {icon}
      </View>

      <View style={{flex:1}}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <ArrowOutIcon/>
    </TouchableOpacity>
  )
}

export default ResourceCard
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
        marginRight:correctSize(12),
    },
    title:{
        fontSize:14,
        fontFamily:Fonts.Inter_Medium,
        color:colors.darkgray_1,
    },
    description:{
        fontSize:12,
        fontFamily:Fonts.Inter_Regular,
        color:colors.gray_4,
    }
})