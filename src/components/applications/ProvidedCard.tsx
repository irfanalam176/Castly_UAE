import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';

interface ProvidedCardProps{
    icon?:React.ReactNode;
    text?:string;
    bgColor?:string
}
const ProvidedCard = ({icon,text,bgColor}:ProvidedCardProps) => {
  return (
    <View style={[styles.container,{backgroundColor:bgColor}]}>
      {icon}
      <Text style={styles.text}>
            {text}
      </Text>

    </View>
  )
}

export default ProvidedCard
const styles = StyleSheet.create({
    container:{
        padding:correctSize(11),
        borderRadius:14,
        flexDirection:"row",
        gap:correctSize(8),
        width:"48%"
    },
    text:{
        fontSize:12,
        fontFamily:Fonts.Inter_Regular,
        color:colors.darkgray,
        flex:1,
        lineHeight:correctSize(16)
    }
})