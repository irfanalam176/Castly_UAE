import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ShieldIcon from '../../assets/svg/applications/ShieldIcon';
import DotIcon from '../../assets/svg/applications/DotIcon';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';
import AmountCard from './AmountCard';
import InfoBanner from '../common/InfoBanner';
import InfoCard from './InfoCard';
import InfoIcon from '../../assets/svg/portfolio/InfoIcon';
import CustomButton from '../common/CustomButton';
import LockIcon from '../../assets/svg/applications/LockIcon';

interface ActivePaymentCardProps {
  title?: string;
  amount?: string;

  JobReference?: string;
  brand?: string;
  date?: string;
  expectedRelease?: string;
}

const ActivePaymentCard = ({
  title,
  amount,
  JobReference,
  brand,
  date,
  expectedRelease,
}: ActivePaymentCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <LinearGradient
            colors={[colors.darkGreen_2, colors.darkGreen_4]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            locations={[0, 0.7071]}
            style={styles.iconContainer}
          >
            <ShieldIcon color={colors.white} width={18} height={18} />
          </LinearGradient>

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Payment in Escrow</Text>
            <Text style={styles.description}>Funds secured safely</Text>
          </View>

          <View style={styles.status}>
            <DotIcon width={8} height={8} color={colors.darkGreen_2} />
            <Text style={styles.statusLabel}>Active</Text>
          </View>
        </View>

        <AmountCard
          gradientColors={[colors.green_3, colors.green_6]}
          title={'Escrow Amount'}
          amount={amount}
          description="Protected by Castly Escrow"
          icon={<LockIcon color={colors.darkGreen_1} />}
          descriptionColor={colors.darkGreen_1}
        />

        <View>
          <View style={styles.row}>
            <Text style={styles.label}>Job Reference</Text>
            <Text style={styles.value}>{JobReference}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Brand</Text>
            <Text style={styles.value}>{brand}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Escrow Date</Text>
            <Text style={styles.value}>{date}</Text>
          </View>

          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <Text style={styles.label}>Expected Release</Text>
            <Text style={[styles.value, { color: colors.purple }]}>
              {expectedRelease}
            </Text>
          </View>
        </View>

        <InfoCard
          description={`Funds are held securely until job completion is confirmed by the brand. You'll receive payment within 24 hours of release.`}
          icon={<InfoIcon color={colors.blue_7} />}
          bgColor={colors.lightBlue_7}
          iconBg={colors.lightBlue_8}
          descriptionColor={colors.blue_2}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.btn}>
          <CustomButton
            title="View Details"
            style={styles.whiteButton}
            textStyle={styles.whiteButtonText}
          />
        </View>

        <View style={styles.btn}>
          <CustomButton
            title="Contact Support"
            style={styles.primaryButton}
            textStyle={styles.primaryButtonText}
          />
        </View>
      </View>
    </View>
  );
};

export default ActivePaymentCard;
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.white_1,

    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    // Android
    elevation: 2,
    backgroundColor: colors.lightBlue_5,
    overflow: 'hidden',
    marginBottom: correctSize(17),
  },
  innerContainer: {
    padding: correctSize(24),
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    marginTop: correctSize(4),
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    backgroundColor: colors.green_3,
    borderRadius: 99,
    paddingVertical: correctSize(10),
    paddingHorizontal: correctSize(12),
  },
  statusLabel: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.green,
  },
  iconContainer: {
    width: correctSize(40),
    height: correctSize(40),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: correctSize(8),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: correctSize(20),
    borderBottomWidth: 1,
    borderBottomColor: colors.white_1,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
  },
  value: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 14,
    color: colors.darkgray_1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(7),
    padding: correctSize(17),
    paddingHorizontal: correctSize(24),
  },
  btn: {
    flex: 1,
  },
  whiteButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 12,
    height: correctSize(48),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: correctSize(10),
    paddingHorizontal: correctSize(16),
  },
  whiteButtonText: {
    color: colors.darkgray,
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    lineHeight: 20, // ensures text is not cut
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    height: correctSize(48),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: correctSize(10),
    paddingHorizontal: correctSize(16),
  },
  primaryButtonText: {
    color: colors.black,
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    lineHeight: 20, // ensures text is not cut
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
