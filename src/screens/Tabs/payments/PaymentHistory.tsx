import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../../utils';
import PaymentHistoryCard from '../../../components/payments/PaymentHistoryCard';
import HistoryInfoCard from '../../../components/payments/HistoryInfoCard';
import { SlideLeftFade } from '../../../components/Animation';

const PaymentHistory = () => {
  const STAGGER = 150;
  return (
    <View style={styles.body}>
      <SlideLeftFade delay={STAGGER * 1}>
        <PaymentHistoryCard
          total={22500}
          payments={[
            {
              id: '1',
              jobTitle: 'Luxury Fashion — Evening Wear',
              brandName: 'LVMH MENA',
              startDate: '2024-11-28T00:00:00.000Z',
              endDate: '2024-11-29T00:00:00.000Z',
              paidDate: '2024-12-03T00:00:00.000Z',
              netPay: 5400,
              fee: 600,
              maskedAccount: '4821',
            },
            {
              id: '2',
              jobTitle: 'Activewear Campaign',
              brandName: 'H&M ME',
              startDate: '2024-11-08T00:00:00.000Z',
              endDate: '2024-11-09T00:00:00.000Z',
              paidDate: '2024-11-15T00:00:00.000Z',
              netPay: 3600,
              fee: 400,
              maskedAccount: '4821',
            },
          ]}
        />
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 2}>
        <HistoryInfoCard />
      </SlideLeftFade>
    </View>
  );
};

export default PaymentHistory;
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: correctSize(16),
  },
});
