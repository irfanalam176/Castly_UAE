import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { correctSize } from '../../utils'
import { colors } from '../../utils/colors'
import { Fonts } from '../../assets/fonts'

interface ApplicationInfoCardProps {
    heading: string;
    children: ReactNode
}

const ApplicationInfoCard = ({ heading, children }: ApplicationInfoCardProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>{heading}</Text>
            <View>{children}</View>
        </View>
    )
}

export default ApplicationInfoCard

const styles = StyleSheet.create({
    container: {
        marginBottom: correctSize(12),
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: correctSize(16)
    },
    headingText: {
        fontFamily: Fonts.InriaSerif_Bold,
        fontSize: 16,
        color: colors.darkgray_1,
        marginBottom: correctSize(12)
    }
})