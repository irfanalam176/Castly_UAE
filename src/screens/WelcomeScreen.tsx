/**
 * WelcomeScreen
 */
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import { images } from '../assets/images';
import RightArrowIcon from '../assets/svg/common/RightArrowIcon';
import { Fonts } from '../assets/fonts';
import { colors } from '../utils/colors';
import { correctSize } from '../utils';
import { stackRoutes } from '../navigation/screenIds';
import { useNavigation } from '@react-navigation/native';
import { SlideUpFade } from '../components/Animation';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const STAGGER = 150;

export default function WelcomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={images.welcomeBg}
        style={styles.bg}
        imageStyle={styles.bgImage}
        resizeMode="cover"
      >
        <ScrollView
          contentContainerStyle={[styles.scroll]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.heroSpacer} />

          {/* 1 — Headline */}
          <SlideUpFade delay={STAGGER * 1}>
            <Text style={styles.headline}>
              Your next shoot {'\n'}
              <Text style={styles.headlineAccent}>starts here.</Text>
            </Text>
          </SlideUpFade>

          {/* 2 — Body */}
          <SlideUpFade delay={STAGGER * 2}>
            <Text style={styles.body}>
              Join 12,000+ verified talent across the UAE & GCC booking premium
              brand campaigns.
            </Text>
          </SlideUpFade>

          {/* 3 — CTA Button */}
          <SlideUpFade delay={STAGGER * 3}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.cta}
              onPress={() => navigation.navigate(stackRoutes.SignUp)}
            >
              <View style={styles.ctaTextWrap}>
                <Text style={styles.ctaTitle}>Create a Talent Account</Text>
                <Text style={styles.ctaSub}>Join as talent, get booked</Text>
              </View>
              <View style={styles.ctaIconPlaceholder}>
                <RightArrowIcon />
              </View>
            </TouchableOpacity>
          </SlideUpFade>

          {/* 4 — Sign In Row */}
          <SlideUpFade delay={STAGGER * 4}>
            <View style={styles.signInRow}>
              <Text style={styles.signInPrompt}>Already have an account? </Text>
              <Pressable
                style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                hitSlop={8}
                onPress={() => navigation.navigate(stackRoutes.Login)}
              >
                <Text style={styles.signInLink}>Sign In</Text>
              </Pressable>
            </View>
          </SlideUpFade>

          {/* 5 — Legal */}
          <SlideUpFade delay={STAGGER * 5}>
            <Text style={styles.legal}>
              By continuing, you agree to Castly's{' '}
              <Text style={styles.terms}>Terms of Service </Text> and{' '}
              <Text style={styles.terms}>Privacy Policy</Text>
            </Text>
          </SlideUpFade>

        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:colors.darkgray_1
  },
  bg: {
    flex: 1,
    padding: correctSize(24),
  },
  bgImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    resizeMode: 'cover',
    top: 0,
    left: 0,
  },
  heroSpacer: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  headline: {
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.white,
    fontSize: 30,
  },
  headlineAccent: {
    color: colors.primary,
  },
  body: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    lineHeight: correctSize(22.75),
    marginTop: correctSize(8),
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    padding: correctSize(20),
    borderRadius: 16,
    marginTop: correctSize(66.28),
    marginBottom: correctSize(21.44),
  },
  ctaTextWrap: {
    flex: 1,
  },
  ctaTitle: {
    fontFamily: Fonts.Inter_Black,
    fontSize: 15,
    color: colors.darkgray_1,
    lineHeight: correctSize(22),
  },
  ctaSub: {
    color: 'rgba(0, 0, 0, 0.50)',
    fontFamily: Fonts.Inter_Medium,
  },
  ctaIconPlaceholder: {
    width: correctSize(36),
    height: correctSize(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: colors.darkgray_1,
  },
  signInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInPrompt: {
    fontSize: 14,
    color: colors.gray_3,
    fontFamily: Fonts.Inter_Medium,
    textAlign: 'center',
  },
  signInLink: {
    color: colors.primary,
  },
  legal: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
    textAlign: 'center',
  },
  terms: {
    color: colors.gray_4,
  },
});