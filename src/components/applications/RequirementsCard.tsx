import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CheckIcon from '../../assets/svg/Home/CheckIcon';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import { correctSize } from '../../utils';
import ShieldIcon from '../../assets/svg/Home/ShieldIcon';

interface RequirementsCardProps {
    item: any;
}

const RequirementsCard = ({ item }: RequirementsCardProps) => {
    const renderPhysicalItem = ({ item }: any) => {
        return (
            <View style={styles.physicalContainer}>
                <View style={[styles.physicalIconContainer, { backgroundColor: colors.primary }]}>
                    <CheckIcon color={colors.darkgray_1} />
                </View>
                <Text style={styles.physicalotherRequirements}>{item}</Text>
            </View>
        )
    }

    const renderExperienceItem = ({ item }: any) => {
        return (
            <View style={styles.physicalContainer}>
                <View style={[styles.physicalIconContainer, { backgroundColor: colors.lightBlue_2 }]}>
                    <CheckIcon color={colors.blue_5} />
                </View>
                <Text style={styles.physicalotherRequirements}>{item}</Text>
            </View>
        )
    }

    const renderDocumentItem = ({ item }: any) => {
        return (
            <View style={styles.physicalContainer}>
                <View style={[styles.physicalIconContainer, { backgroundColor: colors.green_1 }]}>
                    <ShieldIcon />
                </View>
                <Text style={styles.physicalotherRequirements}>{item}</Text>
            </View>
        )
    }
    return (
        <View>
            <Text style={styles.headingText}>Physical</Text>
            <View style={styles.physicalContainer}>
                <View style={[styles.physicalIconContainer, { backgroundColor: colors.primary }]}>
                    <CheckIcon color={colors.darkgray_1} />
                </View>
                <Text style={styles.physicalotherRequirements}>Height: {item?.requirements?.height} cm</Text>
            </View>
            <View style={styles.physicalContainer}>
                <View style={[styles.physicalIconContainer, { backgroundColor: colors.primary }]}>
                    <CheckIcon color={colors.darkgray_1} />
                </View>
                <Text style={styles.physicalotherRequirements}>Clothing Size: {item?.requirements?.clothingSize}</Text>
            </View>
            <View style={styles.physicalContainer}>
                <View style={[styles.physicalIconContainer, { backgroundColor: colors.primary }]}>
                    <CheckIcon color={colors.darkgray_1} />
                </View>
                <Text style={styles.physicalotherRequirements}>Shoe Size: {item?.requirements?.shoeSize}</Text>
            </View>
            <FlatList
                data={item?.requirements?.other}
                keyExtractor={item?.requirements?.other?.index}
                renderItem={renderPhysicalItem}
                style={styles.list}
            />
            <Text style={styles.headingText}>Experience</Text>
            <FlatList
                data={item?.requirements?.experience}
                keyExtractor={item?.requirements?.experience?.index}
                renderItem={renderExperienceItem}
                style={styles.list}
            />
            <Text style={styles.headingText}>Documents</Text>
            <FlatList
                data={item?.requirements?.documents}
                keyExtractor={item?.requirements?.documents?.index}
                renderItem={renderDocumentItem}
            />
        </View>
    )
}

export default RequirementsCard

const styles = StyleSheet.create({
    headingText: {
        fontFamily: Fonts.Inter_SemiBold,
        fontSize: 11,
        color: colors.gray_4,
        textTransform: 'uppercase',
        marginBottom: correctSize(8)
    },
    physicalContainer: {
        flexDirection: 'row',
        marginBottom: correctSize(12),
    },
    physicalIconContainer: {
        width: correctSize(16),
        height: correctSize(16),
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginEnd: correctSize(8)
    },
    physicalotherRequirements: {
        fontFamily: Fonts.Inter_Regular,
        fontSize: 13,
        color: colors.darkgray,
        width: '80%',
        flexWrap: 'wrap',
        textAlign: 'left',
        lineHeight: 20
    },
    list: {
        marginBottom: correctSize(16),
    }
})