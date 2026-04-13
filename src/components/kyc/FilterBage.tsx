import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors'
import { correctSize } from '../../utils'
import { Fonts } from '../../assets/fonts'

interface FilterBageProps{
    label?:string;
    selected?:boolean;
    onPress?:()=>void;
}
const FilterBage = ({label,selected,onPress}:FilterBageProps) => {
  return (
    <TouchableOpacity style={[styles.container,{
        borderColor:selected?colors.gray_1:colors.white_1
    }]} onPress={onPress} activeOpacity={0.8}>
      <Text style={[styles.label,{
        color:selected?colors.gray_1:colors.darkgray
      }]}>{label}</Text>
    </TouchableOpacity>
  )
}

export default FilterBage
const styles = StyleSheet.create({
    container:{
        borderRadius:12,
        backgroundColor:colors.white_1,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:2,
        height:correctSize(48)
    },
    label:{
        fontSize:16,
        fontFamily:Fonts.Inter_SemiBold
    }
})