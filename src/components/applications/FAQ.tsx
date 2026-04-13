import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { memo, useCallback } from 'react'
import ChevronDownIcon from '../../assets/svg/common/ChevronDownIcon'
import { colors } from '../../utils/colors'
import { Fonts } from '../../assets/fonts'
import { correctSize } from '../../utils'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'

interface FAQProps {
  question: string
  answer: string
}

const FAQ = ({ question, answer }: FAQProps) => {
  const open = useSharedValue(false)

  const toggle = useCallback(() => {
    open.value = !open.value
  }, [])

const ANSWER_HEIGHT = correctSize(60)

const animatedStyle = useAnimatedStyle(() => {
  return {
    height: withTiming(open.value ? ANSWER_HEIGHT : 0, {
      duration: 300,
    }),
    opacity: withTiming(open.value ? 1 : 0),
  }
})

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(open.value ? '180deg' : '0deg'),
        },
      ],
    }
  })

  return (
    <View>
      <TouchableOpacity style={styles.faqBtn} onPress={toggle} activeOpacity={0.7}>
        <Text style={styles.question}>{question}</Text>

        <Animated.View style={rotateStyle}>
          <ChevronDownIcon
            width={15}
            height={15}
            color={colors.gray_4}
          />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[styles.answerContainer, animatedStyle]}>
        <Text style={styles.answer}>{answer}</Text>
      </Animated.View>
    </View>
  )
}

export default memo(FAQ)

const styles = StyleSheet.create({
  faqBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.white_1,
    paddingVertical: correctSize(12),
  },

  question: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray_1,
  },

  answerContainer: {
    overflow: "hidden",
  },

  answer: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray,
    paddingVertical: correctSize(12),
  },
})