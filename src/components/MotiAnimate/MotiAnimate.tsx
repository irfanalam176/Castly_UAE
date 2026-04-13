/**
 * Legacy MotiAnimate Components
 * 
 * @deprecated Use the new Animation system instead:
 * 
 * import { AnimatedWrapper, SlideRightFade } from '@components/Animation';
 * 
 * // Using preset wrapper:
 * <SlideRightFade>{children}</SlideRightFade>
 * 
 * // Using AnimatedWrapper:
 * <AnimatedWrapper preset="slideRightFade">{children}</AnimatedWrapper>
 * 
 * // Custom animation:
 * <AnimatedWrapper 
 *   from={{ opacity: 0, translateX: -100 }} 
 *   animate={{ opacity: 1, translateX: 0 }}
 * >
 *   {children}
 * </AnimatedWrapper>
 */

import React from 'react';
import { ViewStyle } from 'react-native';

import { AnimatedWrapper } from '../Animation';

interface LegacyAnimateProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * @deprecated Use <AnimatedWrapper preset="slideRightFade"> or <SlideRightFade>
 */
export const MotiAnimateRight: React.FC<LegacyAnimateProps> = ({ children, style }) => {
  return (
    <AnimatedWrapper
      from={{ opacity: 0, translateX: -100 }}
      animate={{ opacity: 1, translateX: 0 }}
      duration={1000}
      style={style}
    >
      {children}
    </AnimatedWrapper>
  );
};

/**
 * @deprecated Use <AnimatedWrapper preset="slideLeftFade"> or <SlideLeftFade>
 */
export const MotiAnimateLeft: React.FC<LegacyAnimateProps> = ({ children, style }) => {
  return (
    <AnimatedWrapper
      from={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      duration={1000}
      style={style}
    >
      {children}
    </AnimatedWrapper>
  );
};

/**
 * @deprecated Use <AnimatedWrapper preset="slideUpFade"> or <SlideUpFade>
 */
export const MotiAnimateUpwards: React.FC<LegacyAnimateProps> = ({ children, style }) => {
  return (
    <AnimatedWrapper
      from={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      duration={1000}
      style={style}
    >
      {children}
    </AnimatedWrapper>
  );
};

/**
 * @deprecated Use <AnimatedWrapper preset="slideDownFade"> or <SlideDownFade>
 */
export const MotiAnimateDownwards: React.FC<LegacyAnimateProps> = ({ children, style }) => {
  return (
    <AnimatedWrapper
      from={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      duration={1000}
      style={style}
    >
      {children}
    </AnimatedWrapper>
  );
};
