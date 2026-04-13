import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import { font } from '../../utils/font';
import { correctSize } from '../../utils';

interface ActionBoxProps {
    label: string;
    icon: React.ReactNode;
    backgroundColor?: string;
    gradientColors?: string[];
    onPress?: () => void;
    badge?: number | string;
    index?: number;
    delay?: number;
}

const ActionBox = ({
    label,
    icon,
    backgroundColor,
    gradientColors,
    onPress,
    badge,
    index = 0,
    delay = 100,
}: ActionBoxProps) => {
    return (
        <MotiView
            from={{ opacity: 0, translateY: 20, scale: 0.9 }}
            animate={{ opacity: 1, translateY: 0, scale: 1 }}
            transition={{
                duration: 450,
                delay: index * delay,
            }}
            style={styles.container}
        >
            <TouchableOpacity style={styles.touchable} onPress={onPress}>
                {gradientColors ? (
                    <LinearGradient
                        colors={gradientColors}
                        style={styles.iconContainer}
                    >
                        {icon}
                        {badge ? (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{badge.toString()}</Text>
                            </View>
                        ) : null}
                    </LinearGradient>
                ) : (
                    <View style={[styles.iconContainer, { backgroundColor }]}>
                        {icon}
                        {badge ? (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{badge.toString()}</Text>
                            </View>
                        ) : null}
                    </View>
                )}
                <Text style={styles.label}>{label}</Text>
            </TouchableOpacity>
        </MotiView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: correctSize(4),
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: colors.red,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: colors.white,
        paddingHorizontal: correctSize(4),
    },
    badgeText: {
        fontSize: 10,
        fontFamily: Fonts.Inter_Bold,
        color: colors.white,
    },
    label: {
        fontFamily:Fonts.InriaSerif_Regular,
        color: colors.black_1,
        fontSize: 12,
        marginTop: correctSize(8),
        textAlign: 'center',
    },
});

export default ActionBox;