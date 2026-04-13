import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icons from '../vectorIcons/Icons'
import { colors } from '../../utils/colors'
import { Fonts } from '../../assets/fonts'
import { correctSize } from '../../utils'
import { maskIBAN } from '../../utils/maskIBAN'

type BankDetailsCardProps={
  title?:string,
  description?:string
}

const BankDetailsCard = ({title,description}:BankDetailsCardProps) => {
  return (
     <View style={styles.bankDetailCard}>
              <View style={styles.rowCenter}>
              <View style={styles.iconContainer}>
                <Icons
                  name={'landmark'}
                  size={20}
                  family={'FontAwesome6'}
                  color={colors.darkgray}
                />
              </View>
              <View>
                <Text style={styles.bankName}>{title}</Text>
                <Text style={styles.accountNumber}>{maskIBAN(description)}</Text>
                </View>
              </View>

              <View style={styles.check}>
                <Icons
                  name={'check'}
                  size={18}
                  family={'FontAwesome6'}
                  color={colors.darkGreen3}
                />
              </View>
            </View>
  )
}

export default BankDetailsCard

const styles = StyleSheet.create({
      bankDetailCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.lightBlue_5,
        padding: correctSize(16),
        borderRadius: 12,
        marginBottom: correctSize(12),
      },
      bankName: {
        color: colors.darkgray_1,
        fontSize: 14,
        fontFamily: Fonts.Inter_Bold
      },
      accountNumber: {
        color: colors.gray_4,
        fontSize: 12,
        fontFamily:Fonts.Inter_Regular

      },
      check: {
        width: 25,
        height: 25,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightGreen_1,
      },
      iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        elevation: 2,
        marginRight: correctSize(12),
      },
      rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
      },
})