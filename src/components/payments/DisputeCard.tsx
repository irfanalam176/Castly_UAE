import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { correctSize } from '../../utils'
import { colors } from '../../utils/colors'
import { Fonts } from '../../assets/fonts'
import InfoIcon from '../../assets/svg/common/InfoIcon'
import CustomButton from '../common/CustomButton'

type Props = {
  onOpenDispute: () => void
}

const DisputeCard = ({ onOpenDispute }: Props) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <InfoIcon color={colors.red_3} width={14} height={14}/>
        <Text style={styles.title}>Issue with a Booking?</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
       If the brand cancels, doesn't pay, or something goes wrong, Castly's dispute team will investigate and protect your funds.
      </Text>

      {/* Button */}
     <CustomButton title='Open a Dispute' style={styles.button} textStyle={styles.buttonText}/>
    </View>
  )
}

export default DisputeCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light_red,
    borderRadius: correctSize(16),
    borderWidth: 0.7,
    borderColor: colors.pink_2,
    padding: correctSize(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(6),
    marginBottom: correctSize(10),
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.red_3,
  },
  description: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.red_1,
    lineHeight: correctSize(20),
    marginBottom: correctSize(14),
  },
  button: {
    backgroundColor: colors.white,
    borderRadius: correctSize(14),
    paddingVertical: correctSize(14),
    borderWidth:1,
    borderColor:colors.pink_2,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.red,
  },
})