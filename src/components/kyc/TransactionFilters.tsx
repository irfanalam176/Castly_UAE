import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';

interface TransactionFiltersProps {
  setFilterId: (id: number) => void;
  filterId?: number;
}
const TransactionFilters = ({ setFilterId,filterId }: TransactionFiltersProps) => {
  const filterList = [
    { id: 1, label: 'All' },
    { id: 2, label: 'Earnings' },
    { id: 3, label: 'Escrow' },
    { id: 4, label: 'Withdrawals' },
  ];
  return (
    <View style={styles.container}>
      {filterList.map(item => (
        <TouchableOpacity
          style={[styles.filter,{backgroundColor:filterId==item.id?colors.gray_1:colors.white}]}
          key={item.id}
          onPress={() => setFilterId(item.id)}
        >
          <Text style={[styles.label,{
            color:filterId==item.id?colors.white:colors.gray_1,
            fontFamily:filterId==item.id?Fonts.Inter_SemiBold:Fonts.Inter_Regular
          }]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TransactionFilters;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: correctSize(6),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: correctSize(32),
    marginBottom:correctSize(22)
  },
  filter: {
    borderRadius: 8,
    height: correctSize(40),
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    flexGrow:1
  },
  label: {
    fontSize: 14,
  },
});
