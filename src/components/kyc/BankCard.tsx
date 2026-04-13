import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import BankIcon from '../../assets/svg/kyc/BankIcon';
import DotIcon from '../../assets/svg/applications/DotIcon';
import LinearGradient from 'react-native-linear-gradient';

interface BankCardProps {
  bankName?: string;
  acountEnding?: string;
  isVerified?: boolean;
}
const BankCard = ({bankName,acountEnding,isVerified}: BankCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bank Account</Text>
        <TouchableOpacity>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <LinearGradient
          colors={[colors.darkgray_2, colors.darkgray_1]}
          locations={[0, 0.7071]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.iconContainer}
        >
          <BankIcon />
        </LinearGradient>

        <View>
          <Text style={styles.bankName}>{bankName}</Text>
          <Text style={styles.accountNumber}>Account ending in {acountEnding}</Text>

         {isVerified && <View style={styles.verificationRow}>
            <DotIcon width={8} height={8} color={colors.darkGreen3}/>
            <Text style={styles.verified}>Verified</Text>
          </View>}

        </View>
      </View>
    </View>
  );
};

export default BankCard;
const styles = StyleSheet.create({
  container: {
        borderRadius: 16,
    backgroundColor: colors.white,
    padding: correctSize(21),
    flex: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginTop: correctSize(24),
     borderWidth:1,
    borderColor:colors.white_1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: correctSize(16),
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  edit: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.purple,
  },
  row: {
    flexDirection: 'row',
  },
  iconContainer: {
    borderRadius:12,
    width:correctSize(48),
    height:correctSize(48),
    justifyContent:'center',
    alignItems:'center',
    marginRight:correctSize(16)
  },
  bankName:{
    fontSize:14,
    fontFamily:Fonts.InriaSerif_Bold,
    color:colors.darkgray_1,
    marginBottom:correctSize(5)
  },
  accountNumber:{
    fontSize:12,
    fontFamily:Fonts.Inter_Regular,
    color:colors.gray_4,
    marginBottom:correctSize(8)
},
verificationRow:{
    flexDirection:'row',
    alignItems:'center',
    gap:correctSize(8)
},
verified:{
    fontSize:12,
    fontFamily:Fonts.Inter_Medium,
    color:colors.green
}
});
