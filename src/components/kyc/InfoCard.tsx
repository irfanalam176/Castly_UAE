import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { correctSize } from '../../utils'
import { Fonts } from '../../assets/fonts'

interface InfoCardProps{
    icon?:React.ReactNode;
    title?:string;
    description?:string;
    iconBg?:string;
    bgColor?:string;
    titleColor?:string;
    descriptionColor?:string;
}
const InfoCard = ({icon,title,description,iconBg,bgColor,titleColor,descriptionColor}:InfoCardProps) => {
  return (
    <View style={[styles.container,{backgroundColor:bgColor}]}>
      <View style={[styles.iconContainer,{backgroundColor:iconBg}]}>
        {icon}
      </View>
      <View style={{flex:1}}>
        {title&&<Text style={[styles.title,{color:titleColor}]}>{title}</Text> }
        <Text style={[styles.description,{color:descriptionColor}]}>{description}</Text> 
      </View>
    </View>
  )
}

export default InfoCard
const styles = StyleSheet.create({
    container:{
        borderRadius:12,
        padding:correctSize(16),
        flexDirection:"row"
    },
    iconContainer:{
        width:correctSize(32),
        height:correctSize(32),
        borderRadius:8,
        alignItems:"center",
        justifyContent:"center",
        marginRight:correctSize(12)
    },
    title:{
        fontSize:12,
        fontFamily:Fonts.Inter_SemiBold,
        marginBottom:correctSize(5)
    },
    description:{
        fontSize:12,
        fontFamily:Fonts.Inter_Regular,
        lineHeight:20,
        flexShrink:1
    }

})