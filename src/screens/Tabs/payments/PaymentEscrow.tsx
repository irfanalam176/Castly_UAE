import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import { correctSize } from '../../../utils';
import EscrowInfoCard from '../../../components/payments/EscrowInfoCard';
import ActiveHolds from '../../../components/payments/ActiveHolds';
import DisputeCard from '../../../components/payments/DisputeCard';
import { SlideLeftFade } from '../../../components/Animation';

const dummyHolds = [
  {
    jobTitle: 'Brand Ambassador — Summer Lookbook',
    brandName: 'Zara UAE',
    startDate: '2024-12-22T00:00:00.000Z',
    endDate: '2024-12-23T00:00:00.000Z',
    grossEscrow: 6000,
    castlyFee: 600,
    netPay: 5400,
    expectedDate: '2025-01-03T00:00:00.000Z',
  },
];
const PaymentEscrow = () => {
  const STAGGER = 150;
  return (
    <View style={styles.body}>
      <SlideLeftFade delay={STAGGER * 1}>
        <EscrowInfoCard />
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 2}>
        <ActiveHolds holds={dummyHolds} />
      </SlideLeftFade>
      
      <SlideLeftFade delay={STAGGER * 3}>
        <DisputeCard onOpenDispute={() => console.log('Open dispute')} />
      </SlideLeftFade>
    </View>
  );
};

export default PaymentEscrow;
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: correctSize(16),
  },
});
