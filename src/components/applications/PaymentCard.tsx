import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ShieldIcon from '../../assets/svg/applications/ShieldIcon';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import InfoIcon from '../../assets/svg/Home/InfoIcon';

interface PaymentCardProps {
  title?: string;
  description?: string;
  basePayment?: string | number;
  tax?: string | number;
  totalRecieve?: string | number;
  info?: string;
}
interface Payment {
  item: PaymentCardProps;
}

const PaymentCard = ({ item }: Payment) => {
  return (
    <LinearGradient
      colors={[colors.green_1, colors.green_3]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <ShieldIcon color={colors.white} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>{item?.title}</Text>
          <Text style={styles.description}>{item?.description}</Text>
        </View>
      </View>

      {/* table */}
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.label}>Base Payment</Text>
          <Text style={styles.value}>AED {item.basePayment}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Platform Fee (5%)</Text>
          <Text style={styles.value}>AED {item.tax}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.labelTotal}>You'll Receive</Text>
          <Text style={styles.valueTotal}>AED {item.totalRecieve}</Text>
        </View>
      </View>
      {/* table */}

      <View style={styles.footer}>
        <InfoIcon />
        <Text style={styles.infoText}>{item.info}</Text>
      </View>
    </LinearGradient>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    padding: correctSize(22),
    marginBottom: correctSize(16),
    borderRadius: 16,
    borderColor: colors.green_4,
  },
  header: {
    flexDirection: 'row',
  },
  heading: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    marginBottom: correctSize(5),
    color: colors.darkgray_1,
    flex: 1,
  },
  table: {
    backgroundColor: colors.white_4,
    padding: correctSize(12),
    borderRadius: 16,
    marginVertical: correctSize(16),
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray,
    lineHeight: 23,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: correctSize(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.white_1,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
  },
  value: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
  },
  labelTotal: {
    fontSize: 14,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  valueTotal: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.green,
  },
  iconContainer: {
    width: correctSize(48),
    height: correctSize(48),
    marginRight: correctSize(16),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkGreen3,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: Fonts.Inter_Regular,
    paddingLeft: 8,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    gap: correctSize(8),
  },
});
