import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import CustomButton from '../../components/common/CustomButton';

type Props = {
  onDownload: () => void;
};

const TaxVat = ({ onDownload }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tax & VAT</Text>
      <Text style={styles.description}>
        Castly handles VAT compliance on your behalf for UAE shoots. Tax
        invoices are auto-generated after each payment.
      </Text>
      <CustomButton
        title="Download Tax Invoices"
        style={styles.downloadBtn}
        textStyle={styles.downloadBtnText}
        onPress={onDownload}
      />
    </View>
  );
};

export default TaxVat;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: correctSize(16),
    borderWidth: 1,
    borderColor: colors.white_1,
    padding: correctSize(16),
  },
  heading: {
    fontSize: 15,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(8),
  },
  description: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    lineHeight: correctSize(20),
    marginBottom: correctSize(14),
  },
  downloadBtn: {
    backgroundColor: colors.lightBlue_5,
    borderRadius: correctSize(12),
  },
  downloadBtnText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
  },
});
