import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors'
import { correctSize } from '../../utils'
import { Fonts } from '../../assets/fonts'


interface BookingDateTableProps{
    date?:string,
    time?:string,
    duration?:string
}

const BookingDateTable = ({date,time,duration}:BookingDateTableProps) => {
  return (
    <View>

      <View style={styles.row}>
        <Text style={styles.label}>Shoot Date</Text>
        <Text style={styles.value}>{date}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Time Slot</Text>
        <Text style={styles.value}>{time}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Duration</Text>
        <Text style={styles.value}>{duration}</Text>
      </View>

    </View>
  )
}

export default BookingDateTable

const styles = StyleSheet.create({
    row:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingVertical:correctSize(12),
        borderBottomWidth:1,
        borderBottomColor:colors.white_1
    },
    label:{
        fontSize:14,
        fontFamily:Fonts.Inter_Regular,
        color:colors.gray_1
    },
    value:{
        fontSize:14,
        fontFamily:Fonts.Inter_SemiBold,
        color:colors.darkgray_1

    }
})