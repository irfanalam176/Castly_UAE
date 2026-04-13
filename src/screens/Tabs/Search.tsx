import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import LottieAnimate from '../../components/Animation/Lottie';
import { workInProgressLottie } from '../../assets/lottieFiles';
import { font } from '../../utils/font';

const Search = () => {
    return (
        <ScreenWrapper>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieAnimate
                    customStyle={{ width: '80%', height: '80%' }}
                    lottiePath={workInProgressLottie}
                />
                <Text style={{ ...font(16, 700), color: colors.gray_1 }}>
                    Work in progress, Stay tuned
                </Text>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black,
    },
});

export default Search;
