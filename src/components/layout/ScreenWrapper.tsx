import React, { ReactNode, useEffect } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, StyleProp, ViewStyle, Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets, SafeAreaView, Edge } from 'react-native-safe-area-context';
import { colors } from '../../utils/colors';

interface containerProps {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
    scrollable?: boolean;
    statusBarColor?: string;
    statusBarStyle?: 'default' | 'light-content' | 'dark-content';
    backgroundColor?: string;
    edges?: Edge[];
}


const ScreenWrapper: React.FC<containerProps> = ({
    children,
    style,
    scrollable = false,
    statusBarColor = colors.white,
    statusBarStyle = 'dark-content',
    backgroundColor = 'white',
    edges = ['top'],
}) => {
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            StatusBar.setBarStyle(statusBarStyle, true);
            if (Platform.OS === 'android') {
                StatusBar.setBackgroundColor(statusBarColor);
                StatusBar.setTranslucent(true);
            }
        }
    }, [isFocused, statusBarStyle, statusBarColor]);

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: backgroundColor }]} edges={edges}>
            <StatusBar
                backgroundColor={statusBarColor}
                barStyle={statusBarStyle}
                translucent={true}
            />
            {scrollable ? (
                <ScrollView contentContainerStyle={[styles.container, style]} showsVerticalScrollIndicator={false}>
                    {children}
                </ScrollView>
            ) : (
                <View style={[styles.container, style]}>
                    {children}
                </View>
            )}
        </SafeAreaView>
    );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
});