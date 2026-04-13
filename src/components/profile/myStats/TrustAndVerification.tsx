import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../../../utils/colors';
import { correctSize } from '../../../utils';
import { Fonts } from '../../../assets/fonts';
import ShieldIcon from '../../../assets/svg/common/ShieldIcon';
import BlueTick from '../../../assets/svg/Profile/BlueTick';
import Badge from '../../common/Badge';

const TrustAndVerification = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ShieldIcon />
        <Text style={styles.title}>Trust & Verification</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Emirates ID</Text>
        <View style={styles.verified}>
          <BlueTick width={12} height={12} color={colors.green_5} />
          <Text style={styles.verifyText}>Verified</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>UAE Phone Number</Text>
           <View style={styles.verified}>
          <BlueTick width={12} height={12} color={colors.green_5} />
          <Text style={styles.verifyText}>Verified</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Castly Identity Check</Text>
           <View style={styles.verified}>
          <BlueTick width={12} height={12} color={colors.green_5} />
          <Text style={styles.verifyText}>Verified</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Instagram Verified</Text>
           <View style={styles.verified}>
          <BlueTick width={12} height={12} color={colors.green_5} />
          <Text style={styles.verifyText}>Verified</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>TikTok Connected</Text>
        <Badge title='Connect' containerStyle={styles.badge} textStyle={styles.badgeText}/>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Bank Account Linked</Text>
           <View style={styles.verified}>
          <BlueTick width={12} height={12} color={colors.green_5} />
          <Text style={styles.verifyText}>Verified</Text>
        </View>
      </View>
    </View>
  );
};

export default TrustAndVerification;
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 0.7,
    borderColor: colors.white_1,
    backgroundColor: colors.white,
    marginBottom: correctSize(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    padding: correctSize(16),
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: correctSize(16),
    borderTopColor: colors.lightBlue_5,
    borderTopWidth: 0.7,
  },
  label: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 13,
    color: colors.gray_4,
  },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
  },
  verifyText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.green_5,
  },
  badge:{
    backgroundColor:colors.lightBlue_2
  },
  badgeText:{
    fontSize:11,
    color:colors.blue_5,
    fontFamily:Fonts.Inter_SemiBold
  }
});
