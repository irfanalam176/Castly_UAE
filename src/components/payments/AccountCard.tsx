import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import CheveronRight from '../../assets/svg/kyc/CheveronRight';

type AccountItem = {
  key: string
  icon: React.ReactNode
  label: string
  description: string
  onPress: () => void
}

type Props = {
  items?: AccountItem[]
}


const AccountCard = ({ items }: Props) => {
  return (
    <View>
      <Text style={styles.sectionLabel}>ACCOUNT</Text>
      <View style={styles.card}>
        {items?.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <View key={item.key}>
              <TouchableOpacity style={styles.row} onPress={item.onPress} activeOpacity={0.6}>
                <View style={styles.iconBox}>
                  <Text style={styles.icon}>{item.icon}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <Text style={styles.chevron}><CheveronRight/></Text>
              </TouchableOpacity>
              {!isLast && <View style={styles.divider} />}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default AccountCard

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Bold,
    color: colors.gray_3,
    letterSpacing: 1,
    marginBottom: correctSize(10),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: correctSize(16),
    borderWidth: 1,
    borderColor: colors.white_1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: correctSize(16),
    paddingVertical: correctSize(14),
    gap: correctSize(12),
  },
  iconBox: {
    width: correctSize(40),
    height: correctSize(40),
    borderRadius: 99,
    backgroundColor: colors.lightBlue_5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 16,
  },
  info: {
    flex: 1,
    gap: correctSize(3),
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  chevron: {
    fontSize: 14,
    color: colors.gray_3,
  },
  divider: {
    height: 1,
    backgroundColor: colors.white_1,
  },
})