import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import { correctSize } from '../../utils';

interface WithdrawInputProps {
  onChangeText?: (text: string) => void;
}
const WithDrawInput = ({onChangeText}:WithdrawInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.currency}>AED</Text>
      <TextInput
        placeholder="5000"
        placeholderTextColor={colors.gray}
        style={styles.input}
        onChangeText={onChangeText}

        keyboardType='numeric'
      />
    </View>
  );
};

export default WithDrawInput;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 16,
    padding: correctSize(24),
    paddingVertical: correctSize(5),
  },
  currency: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 24,
    color: colors.gray_3,
    marginRight: correctSize(7),
  },
  input: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 30,
    color: colors.darkgray_1,
    flex: 1,
  },
});
