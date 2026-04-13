import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import BackIcon from '../../assets/svg/Home/BackIcon'
import { images } from '../../assets/images'
import VerticalDots from '../../assets/svg/applications/VerticalDots'
import { colors } from '../../utils/colors'
import { Fonts } from '../../assets/fonts'
import { correctSize } from '../../utils'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

interface ChatHeaderProps {
    name?: string;
    status?: boolean;
}

const ChatHeader = ({ name, status = false }: ChatHeaderProps) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackIcon />
            </TouchableOpacity>

            <View style={styles.row}>
                <View style={styles.imageContainer}>
                    <FastImage source={images.user} style={styles.image} />
                    <View style={[styles.statusDot, { backgroundColor: status ? colors.green : colors.gray_2 }]} />
                </View>
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={[styles.status, { color: status ? colors.green : colors.red_1 }]}>{status ? "Online" : "Offline"}</Text>
                </View>
            </View>

            <TouchableOpacity>
                <VerticalDots />
            </TouchableOpacity>
        </View>
    )
}

export default ChatHeader
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        paddingHorizontal: correctSize(24),
        paddingVertical: correctSize(12)

    },
    name: {
        fontSize: 16,
        fontFamily: Fonts.InriaSerif_Bold,
        color: colors.darkgray_1
    },
    status: {
        fontSize: 12,
        fontFamily: Fonts.Inter_Medium
    },
    imageContainer: {
        width: correctSize(44),
        height: correctSize(44),
        borderRadius: 100,
        position: "relative",
        marginHorizontal: correctSize(12)
    },
    image: {
        borderRadius: 100,
        resizeMode: "cover",
        width: "100%",
        height: "100%"
    },
    statusDot: {
        width: correctSize(10),
        height: correctSize(10),
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.white,
        position: "absolute",
        right: 0,
        bottom: 0
    }
})