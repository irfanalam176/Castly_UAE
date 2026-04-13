import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import BackIcon from '../../assets/svg/Home/BackIcon'
import { correctSize } from '../../utils'
import { Fonts } from '../../assets/fonts'
import { colors } from '../../utils/colors'

interface FilterHeaderProps {
    onBackPress?: () => void;
    onResetPress?: () => void;
}
const FilterHeader = ({ onBackPress, onResetPress }: FilterHeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <BackIcon/>
      </TouchableOpacity>

      <Text style={styles.title}>Filters</Text>

      <TouchableOpacity onPress={onResetPress}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FilterHeader
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: correctSize(24),
    paddingVertical: correctSize(16),
    borderBottomWidth:1,
    borderBottomColor:colors.gray
  },
  title:{
    fontSize:18,
    fontFamily:Fonts.Inter_Bold,
    color:colors.darkgray_1
  },
  resetText:{
    fontSize:14,
    fontFamily:Fonts.Inter_SemiBold,
    color:colors.gray_1
  },
  backButton:{
    width:correctSize(40),
    height:correctSize(40),
    borderRadius:correctSize(12),
    backgroundColor:colors.white_1,
    alignItems:'center',
    justifyContent:'center'
  }
})
