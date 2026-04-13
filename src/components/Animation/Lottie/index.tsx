import LottieView from 'lottie-react-native';
import React, {FC} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

type LottieProps = {
  customStyle?: StyleProp<ViewStyle>;
  lottiePath: string;
};

const LottieAnimate: FC<LottieProps> = ({
  customStyle,
  lottiePath,
}: LottieProps) => {
  return (
    <LottieView
      source={lottiePath}
      autoPlay
      loop
      style={[styles.lottie, customStyle]}
    />
  );
};

const styles = StyleSheet.create({
  lottie: {width: '100%', height: '100%'},
});

export default LottieAnimate;
