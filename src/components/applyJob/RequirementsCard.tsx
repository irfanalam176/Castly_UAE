import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import InfoIcon from '../../assets/svg/Home/InfoIcon';
import CheckIcon from '../../assets/svg/Home/CheckIcon';
import { requirementsList } from '../../utils/array';
import { correctSize } from '../../utils';

const RequirementsCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <InfoIcon />
        <Text style={styles.title}>Important Requirements</Text>
      </View>

      {requirementsList.map(item => (
        <View style={styles.roleRow} key={item.id}>
          <CheckIcon />
          <Text style={styles.value}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default React.memo(RequirementsCard);

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 16,
    padding: correctSize(21),
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  value: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 14,
    color: colors.darkgray,
    lineHeight: 20,
    marginLeft: 10,
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
