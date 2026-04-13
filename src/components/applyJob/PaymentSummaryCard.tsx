import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import CashIcon from '../../assets/svg/Home/CashIcon';
import LinearGradient from 'react-native-linear-gradient';
import InfoBanner from '../common/InfoBanner';
import { correctSize } from '../../utils';

interface PaymentSummaryCardProps {
  baseRate?: string | number;
  platformFee?: string | number;
  currencyType?: string;
}
const PaymentSummaryCard = ({
  baseRate,
  platformFee,
  currencyType,
}: PaymentSummaryCardProps) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.green_1, colors.green_3]}
        style={styles.gradient}
      >
        <View style={styles.row}>
          <CashIcon />
          <Text style={styles.title}>Payment Summary</Text>
        </View>

        <View style={styles.roleRow}>
          <Text style={styles.lable}>Base Rate</Text>
          <Text style={styles.value}>
            {currencyType || 'N/A'} {baseRate || 'N/A'}
          </Text>
        </View>
        <View style={styles.roleRow}>
          <Text style={styles.lable}>Platform Fee</Text>
          <Text style={styles.value}>
            {currencyType || 'N/A'} {platformFee || 'N/A'}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.roleRow}>
          <Text style={styles.footerLable}>You'll Receive</Text>
          <Text style={styles.footerValue}>
            {currencyType} {Number(baseRate ?? 0) - Number(platformFee ?? 0)}
          </Text>
        </View>

        <InfoBanner
          gradient={false}
          containerbgColor={colors.white_4}
          containerborderColor={'transparent'}
          headingFamily={Fonts.Inter_Medium}
          descriptionFamily={Fonts.Inter_Regular}
          descriptionColor={colors.darkgray}
          iconColor={colors.green}
          icon="shield-halved"
          showIcon={false}
          iconBg={'transparent'}
          iconHeight={20}
          iconWidth={20}
          description={
            'Payment is held securely in escrow and released after job completion'
          }
          containerMarginTop={correctSize(16)}
        />
      </LinearGradient>
    </View>
  );
};

export default React.memo(PaymentSummaryCard);

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 16,
    padding: correctSize(21),
  },
  container: {
    borderWidth: 2,
    borderColor: colors.green_4,
    borderRadius: 16,
    marginVertical: correctSize(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginBottom: correctSize(12),
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
    color: colors.darkgray_1,
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: correctSize(12),
  },
  divider: {
    marginVertical: correctSize(12),
    height: 1,
    backgroundColor: colors.green_4,
  },
  footerLable: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  footerValue: {
    fontSize: 20,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.green,
  },
});
