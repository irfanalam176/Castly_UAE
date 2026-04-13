import React, { useMemo } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { MotiView, MotiProps } from 'moti';

// Define animation presets
export const ANIMATION_PRESETS = {
    slideRightFade: {
        from: { opacity: 0, translateX: -30 },
        animate: { opacity: 1, translateX: 0 },
        exit: { opacity: 0, translateX: -30 },
    },
    slideLeftFade: {
        from: { opacity: 0, translateX: 30 },
        animate: { opacity: 1, translateX: 0 },
        exit: { opacity: 0, translateX: 30 },
    },
    slideUpFade: {
        from: { opacity: 0, translateY: 30 },
        animate: { opacity: 1, translateY: 0 },
        exit: { opacity: 0, translateY: 30 },
    },
    slideDownFade: {
        from: { opacity: 0, translateY: -30 },
        animate: { opacity: 1, translateY: 0 },
        exit: { opacity: 0, translateY: -30 },
    },
    fade: {
        from: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
    scaleFade: {
        from: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
    },
};

export type AnimationPreset = keyof typeof ANIMATION_PRESETS;

export interface AnimatedWrapperProps extends Omit<MotiProps, 'from' | 'animate' | 'exit' | 'transition'> {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    preset?: AnimationPreset;
    duration?: number;
    delay?: number;
    // Allow manual overrides
    from?: MotiProps['from'];
    animate?: MotiProps['animate'];
    exit?: MotiProps['exit'];
    transition?: MotiProps['transition'];
}

export const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
    children,
    style,
    preset = 'slideRightFade',
    from,
    animate,
    exit,
    transition,
    duration = 1000,
    delay = 0,
    ...rest
}) => {

    const presetConfig = useMemo(() => {
        return ANIMATION_PRESETS[preset] || ANIMATION_PRESETS.slideRightFade;
    }, [preset]);

    // Props override preset
    const finalFrom = from || presetConfig.from;
    const finalAnimate = animate || presetConfig.animate;
    const finalExit = exit || presetConfig.exit;

    // Construct transition
    const finalTransition = useMemo(() => {
        if (transition) return transition;
        return {
            type: 'timing',
            duration: duration,
        } as const;
    }, [transition, duration]);

    return (
        <MotiView
            from={finalFrom as any}
            animate={finalAnimate as any}
            exit={finalExit as any}
            transition={finalTransition as any}
            delay={delay}
            style={style as any}
            {...(rest as any)}
        >
            {children}
        </MotiView>
    );
};

// Convenience components
export const SlideRightFade = (props: AnimatedWrapperProps) => (
    <AnimatedWrapper preset="slideRightFade" {...props} />
);

export const SlideLeftFade = (props: AnimatedWrapperProps) => (
    <AnimatedWrapper preset="slideLeftFade" {...props} />
);

export const SlideUpFade = (props: AnimatedWrapperProps) => (
    <AnimatedWrapper preset="slideUpFade" {...props} />
);

export const SlideDownFade = (props: AnimatedWrapperProps) => (
    <AnimatedWrapper preset="slideDownFade" {...props} />
);

export const FadeIn = (props: AnimatedWrapperProps) => (
    <AnimatedWrapper preset="fade" {...props} />
);
