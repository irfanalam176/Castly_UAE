import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../utils/colors'
import QuestionMark from '../../assets/svg/helpCenter/QuestionMark'
import { correctSize } from '../../utils'
import { Fonts } from '../../assets/fonts'
import ContactCard from './ContactCard'
import EmailIcon from '../../assets/svg/helpCenter/EmailIcon'
import WhatsappIcon from '../../assets/svg/helpCenter/WhatsappIcon'

const HelpCard = () => {
    return (
        <LinearGradient
            colors={[colors.lightBlue_2, colors.lightBlue_4]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >


            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <QuestionMark />
                </View>
            </View>

            <Text style={styles.title}>Still Need Help?</Text>
            <Text style={styles.description}>Our support team is here for you 24/7</Text>

            <View style={styles.contacts}>
                <ContactCard
                    icon={<EmailIcon />}
                    iconBg={colors.lightBlue_2}
                    label='Email Us'
                    contact='support@castly.ae'
                />
                <ContactCard
                    icon={<WhatsappIcon />}
                    iconBg={colors.green_1}
                    label='WhatsApp'
                    contact='+971 50 123 4567'
                />
            </View>
        </LinearGradient>
    )
}

export default HelpCard
const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: correctSize(26),
        borderWidth: 2,
        borderColor: colors.lightBlue_3,
        marginTop: correctSize(20)

    },
    header: {
        alignItems: "center"
    },
    iconContainer: {
        width: correctSize(56),
        height: correctSize(56),
        borderRadius: 99,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",

        // Android
        elevation: 4,

        // iOS
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.InriaSerif_Bold,
        color: colors.darkgray_1,
        marginTop: correctSize(16),
        marginBottom: correctSize(8),
        textAlign: "center"
    },
    description: {
        fontSize: 14,
        fontFamily: Fonts.Inter_Regular,
        color: colors.gray_1,
        marginBottom: correctSize(20),
        textAlign: "center"
    },
    contacts: {
        gap: correctSize(12)
    }
})