import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import WalletIcon from '../vectorIcons/WalletIcon';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import ArrowUp from '../../assets/svg/kyc/ArrowUp';

interface BalanceCardProps {
  amount?: string;
  jobCount?: string;
}
const BalanceCard = ({ jobCount, amount }: BalanceCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Available Balance</Text>
        
        <View style={styles.iconContainer}>
            <WalletIcon fillColor={colors.white} width={14} height={14}/>
        </View>

      </View>
      <View>
        <Text style={styles.amount}>AED {amount}</Text>
      </View>
      <Text style={styles.footerText}>From {jobCount} completed jobs</Text>
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    borderRadius: 24,
    padding: correctSize(25),
    marginBottom:correctSize(32),
    borderWidth: 1,
    borderColor: colors.white_5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.1,
    shadowRadius: 18,

    elevation: 12,
  },
  iconContainer:{
    width:correctSize(32),
    height:correctSize(32),
    borderRadius:99,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.white_6
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(16),
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    color: colors.lightBlue_3,
    opacity: 0.8,
  },
  amount: {
    fontSize: 36,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.white,
    marginBottom: correctSize(6),
  },
  footerText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.lightBlue_3,
  },
});
