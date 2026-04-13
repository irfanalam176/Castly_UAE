import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CalendarIcon from '../../assets/svg/applications/CalendarIcon';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import ClockOutlineIcon from '../../assets/svg/applications/ClockOutlineIcon';

interface ShootScheduleCardProps {
    item: any;
}

const ShootScheduleCard = ({ item }: ShootScheduleCardProps) => {
    const itemsLength = item?.shootsDay?.length;
    const renderItem = ({ item, index }: any) => {
        return (
            <View style={styles.container}>
                <View style={styles.iconLineContainer}>
                    <View style={styles.iconContainer}>
                        <CalendarIcon />
                    </View>
                    {index !== itemsLength - 1 && (
                        <View style={styles.line} />
                    )}
                </View>
                <View style={styles.scheduleContainer}>
                    <Text style={styles.shootDate}>Day {item?.day} - {item?.Date}</Text>
                    <View style={styles.direction}>
                        <ClockOutlineIcon />
                        <Text style={styles.shootTime}>{item?.startTime} AM - {item?.endTime} PM</Text>
                    </View>
                    <View style={styles.shootTypeContainer}>
                        <Text style={styles.shootType}>{item?.shootType}</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View>
            <FlatList
                data={item?.shootsDay}
                keyExtractor={item?.shootsDay?.index}
                renderItem={renderItem}
                scrollEnabled={false}
            />
        </View>
    )
}

export default ShootScheduleCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: correctSize(12)
    },
    iconLineContainer: {
        alignItems: 'center'
    },
    iconContainer: {
        width: correctSize(28),
        height: correctSize(28),
        backgroundColor: colors.primary,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    line: {
        width: correctSize(2),
        height: correctSize(24),
        backgroundColor: colors.gray,
        marginTop: correctSize(4)
    },
    scheduleContainer: {
        marginStart: correctSize(12)
    },
    shootDate: {
        fontFamily: Fonts.Inter_SemiBold,
        fontSize: 13,
        color: colors.darkgray_1,
        lineHeight: 20,
        marginBottom: correctSize(3),
    },
    shootTime: {
        fontFamily: Fonts.Inter_Regular,
        fontSize: 12,
        color: colors.gray_4,
        marginStart: correctSize(4),
        lineHeight: 18,
    },
    shootType: {
        fontFamily: Fonts.Inter_Medium,
        fontSize: 11,
        color: colors.blue_5,
    },
    shootTypeContainer: {
        paddingHorizontal: correctSize(8),
        paddingVertical: correctSize(2),
        backgroundColor: colors.lightBlue_2,
        borderRadius: 50,
        marginTop: correctSize(3)
    },
    direction: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})