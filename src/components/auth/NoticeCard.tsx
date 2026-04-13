import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ShieldIcon from '../../assets/svg/applications/ShieldIcon';
import { Fonts } from '../../assets/fonts';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';

const NoticeCard = () => {
  return (
    <View style={styles.notice}>
      <View style={styles.row}>
        <ShieldIcon color={colors.blue_3} />
        <Text style={styles.title}>Security Notice</Text>
      </View>
      <Text style={styles.description}>
        After updating your password, you'll be logged out of all other devices
        for security.
      </Text>
    </View>
  );
};

export default NoticeCard;
const styles = StyleSheet.create({
  notice: {
    backgroundColor: colors.lightBlue_7,
    borderWidth: 1,
    borderColor: colors.lightBlue_6,
    borderRadius: 12,
    padding: correctSize(17),
    marginTop: correctSize(24),
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.blue_3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginBottom: correctSize(18),
  },
  description: {
    lineHeight: correctSize(20),
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.blue_7,
  },
});
