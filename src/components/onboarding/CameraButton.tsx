import { TouchableOpacity, StyleSheet, Image, Text } from 'react-native'
import React from 'react'
import CameraIcon from '../../assets/svg/common/CameraIcon'
import { Fonts } from '../../assets/fonts'
import { colors } from '../../utils/colors'
import { correctSize } from '../../utils'

interface CameraButtonProps {
  uri?: string | null
  onPress?: () => void
}

const CameraButton = ({ uri, onPress }: CameraButtonProps) => {
  
  return (
  <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onPress}>
    {uri ? (
      <Image source={{ uri }} style={styles.image} />
    ) : (
      <>
        <CameraIcon />
        <Text style={styles.text}>Tap to add</Text>
      </>
    )}
  </TouchableOpacity>
)
}

export default CameraButton

const styles = StyleSheet.create({
  button: {
    width: correctSize(80),
    height: correctSize(80),
    borderRadius: 16,
    borderWidth: 1.4,
    borderColor: colors.gray_5,
    backgroundColor: colors.white_1,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  image: {
    width: correctSize(80),
    height: correctSize(80),
    borderRadius: 16,
  },
  text: {
    fontSize: 9,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    marginTop: correctSize(12),
  },
})