import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../../utils/colors'
import { correctSize } from '../../../utils'
import { Fonts } from '../../fonts'
import CameraIcon from '../applications/CameraIcon'

interface UploadCardProps {
    title?:string;
    description?:string;
    icon?:React.ReactNode;
    buttonText?:string;
    onPress?:()=>void;
}
const UploadCard = ({title, description, icon, buttonText, onPress}:UploadCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon}
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onPress}>
        <CameraIcon width={16} height={14} color={colors.white}/>
        <Text style={styles.buttonText}>{buttonText || "Upload Photo"}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UploadCard
const styles= StyleSheet.create({
    container:{
        borderWidth:2,
        borderColor:colors.gray_5,
        borderStyle:'dashed',
        borderRadius:16,
        backgroundColor:colors.white,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:correctSize(46),
    },
    iconContainer:{
        width:correctSize(64),
        height:correctSize(64),
        borderRadius:12,
        backgroundColor:colors.darkgray,
        alignItems:'center',
        justifyContent:'center',
        marginTop:correctSize(-10),
    },
    title:{
        fontSize:18,
        fontFamily:Fonts.Inter_SemiBold,
        color:colors.darkgray_1,
        marginBottom:correctSize(16)
    },
    description:{
        fontSize:14,
        fontFamily:Fonts.Inter_Regular,
        color:colors.gray_4,
        lineHeight:27,
        textAlign:'center',
        marginBottom:correctSize(20)
    },
    button:{
        backgroundColor:colors.darkgray,
        height:correctSize(48),
        borderRadius:12,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:correctSize(8),
        paddingHorizontal:correctSize(24),
        marginBottom:correctSize(-24)
    },
    buttonText:{
        fontSize:14,
        fontFamily:Fonts.Inter_SemiBold,
        color:colors.white
    }
})