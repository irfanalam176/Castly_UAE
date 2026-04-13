import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../../utils/colors'
import { correctSize } from '../../../utils'
import { Fonts } from '../../../assets/fonts'

const BookingStatCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Statistics</Text>

      <View style={styles.row}>
            <Text style={styles.label}>Total Jobs Applied</Text>
            <Text style={styles.value}>0</Text>
      </View>
      <View style={styles.row}>
            <Text style={styles.label}>Jobs Completed</Text>
            <Text style={styles.value}>0</Text>
      </View>
      <View style={styles.row}>
            <Text style={styles.label}>Application Rate</Text>
            <Text style={styles.value}>0%</Text>
      </View>
      <View style={styles.row}>
            <Text style={styles.label}>Avg Match Score</Text>
            <Text style={styles.value}>0%</Text>
      </View>
      <View style={styles.row}>
            <Text style={styles.label}>Rehire Rate</Text>
            <Text style={styles.value}>0%</Text>
      </View>
      <View style={styles.row}>
            <Text style={styles.label}>Avg Day Rate</Text>
            <Text style={styles.value}>AED 0</Text>
      </View>
    </View>
  )
}

export default BookingStatCard
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 0.7,
    borderColor: colors.white_1,
    backgroundColor: colors.white,
    marginBottom:correctSize(16)
  },
  title:{
    fontSize:14,
    fontFamily:Fonts.Inter_Bold,
    color:colors.darkgray_1,
    padding:correctSize(16)
  },
  row:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    padding:correctSize(16),
    borderTopColor:colors.lightBlue_5,
    borderTopWidth:0.7
  },
  label:{
    fontFamily:Fonts.Inter_Regular,
    fontSize:13,
    color:colors.gray_4
  },
  value:{
    fontSize:13,
    fontFamily:Fonts.Inter_Bold,
    color:colors.darkgray_1
  }
})