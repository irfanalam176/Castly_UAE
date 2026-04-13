import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Fonts } from '../../assets/fonts'
import { colors } from '../../utils/colors'
import StarIcon from '../../assets/svg/applications/StarIcon'
import { correctSize } from '../../utils'
import LinearGradient from 'react-native-linear-gradient'

interface MatchScoreCardProps{
    percentage?:number|string
}

const MatchScoreCard = ({percentage}:MatchScoreCardProps) => {
  return (
    <LinearGradient
  colors={[colors.lightBlue_2, colors.lightBlue_4]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
 style={styles.container}>
    <View style={styles.iconContainer}>
        <StarIcon color={colors.black}/>
    </View>
      <View>
        <Text style={styles.title}>{percentage}% Match Score</Text>
      <Text style={styles.description}>Your profile is perfect for this role!</Text>
      </View>
    </LinearGradient>
  )
}

export default MatchScoreCard

const styles=StyleSheet.create({
    title:{
        fontSize:14,
        fontFamily:Fonts.Inter_Bold,
        color:colors.darkgray_1,
        marginBottom:correctSize(4)
    },
    description:{
        fontSize:12,
        fontFamily:Fonts.Inter_Regular,
        color:colors.gray_1
    },
    iconContainer:{
        width:correctSize(40),
        height:correctSize(40),
        borderRadius:12,
        backgroundColor:colors.primary,
        alignItems:"center",
        justifyContent:"center",
        marginRight:correctSize(12)
    },
    container:{
        flexDirection:"row",
        alignItems:"center",
        borderRadius:16,
        padding:correctSize(16),
    }
})