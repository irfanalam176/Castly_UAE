import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { correctSize } from '../../utils'
import CheckIcon from '../../assets/svg/applications/CheckIcon'
import { colors } from '../../utils/colors'
import { Fonts } from '../../assets/fonts'

interface TalentCardProps {
  title?: string
  image?: string
  selected?: boolean
  onPress?: () => void
}

const TalentCard = ({ title, image, selected, onPress }: TalentCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >

      <Text style={styles.emoji}>{image}</Text>
      <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>

      {selected && (
        <View style={styles.iconContainer}>
          <CheckIcon color={colors.darkgray_1} />
        </View>
      )}
    </TouchableOpacity>
  )
}

export default TalentCard

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1.4,
    borderColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: correctSize(16),
    flex: 1,
    position: 'relative',
    height: correctSize(110),
  },
  containerSelected: {
    borderColor: colors.darkgray_1,
    backgroundColor: colors.darkgray_1,
  },
  iconContainer: {
    width: correctSize(20),
    height: correctSize(20),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  emoji: {
    fontSize: 28,
  },
  title: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray,
    marginTop: correctSize(8),
  },
  titleSelected: {
    color: colors.primary,
  },
})