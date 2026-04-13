import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/stores/store';

const ProfileSummaryTable = () => {
  const o = useSelector((state: RootState) => state.onboarding);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Summary</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{o.fullName || '—'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>{o.talent || '—'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{o.location || '—'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Height</Text>
        <Text style={styles.value}>{o.height ? `${o.height} cm` : '—'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Photos</Text>
        <Text style={styles.value}>
          {o.portfolioImages.length} portfolio, {o.imageUrl ? 1 : 0} avatar
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Avail</Text>
        <Text style={styles.value}>
          {o.availability.length > 0 ? `${o.availability.length} days/week` : '—'}
        </Text>
      </View>
    </View>
  );
};

export default ProfileSummaryTable;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.white_1,
    padding: correctSize(16.7),
  },
  title: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: correctSize(12.6),
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  value: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray,
  },
});