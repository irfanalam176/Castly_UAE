import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import BriefCaseIcon from '../../assets/svg/Home/BriefCaseIcon';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';

interface RoleCardProps {
  position?: string;
  category?: string;
  duration?: string;
  experience?: string;
}

const RoleCard = ({
  position,
  category,
  duration,
  experience,
}: RoleCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <BriefCaseIcon />
        <Text style={styles.title}>Role Details</Text>
      </View>

      <View style={styles.roleRow}>
        <Text style={styles.lable}>Position</Text>
        <Text style={styles.value}>{position || 'N/A'}</Text>
      </View>
      <View style={styles.roleRow}>
        <Text style={styles.lable}>Category</Text>
        <Text style={styles.value}>{category || 'N/A'}</Text>
      </View>
      <View style={styles.roleRow}>
        <Text style={styles.lable}>Duration</Text>
        <Text style={styles.value}>Full Day ({duration || 'N/A'} hours)</Text>
      </View>

      {/* <View style={styles.roleRow}>
        <Text style={styles.lable}>Experience</Text>
        <Text style={styles.value}>{experience || "N/A"}</Text>
        </View> */}
    </View>
  );
};

export default RoleCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 16,
    padding: correctSize(21),
    marginTop: correctSize(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginBottom: correctSize(16),
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  lable: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
  },
  value: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 14,
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: correctSize(12),
  },
});
