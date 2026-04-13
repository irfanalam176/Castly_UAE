import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { useSelector } from 'react-redux';
import { selectProfile } from '../../redux/reducers/profileSlice';


const TalentInfoTable = () => {
  const profile = useSelector(selectProfile);
  return (
    <View style={styles.container}>

      <View style={styles.row}>
        <Text style={styles.label}>Talent Name</Text>
        <Text style={styles.value}>{profile?.name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>{profile?.category}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{profile?.location}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Profile Status</Text>
        <Text style={styles.value}>{profile?.castlyVerified ? 'Live · Being matched now ⚡' : 'Not verified'}</Text>
      </View>

    </View>
  );
};

export default TalentInfoTable;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.10)',
    borderWidth: 1,
    borderRadius: 16,
    padding: correctSize(16.7),
    paddingBottom: correctSize(8),
    marginTop: correctSize(26),
    marginBottom: correctSize(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(8)
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  value: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.white,
  },
});
