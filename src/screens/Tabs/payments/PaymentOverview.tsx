import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../../utils';
import PaymentInfoCard from '../../../components/payments/PaymentInfoCard';
import ColumnChart from '../../../components/payments/ColumnChart';
import LatestPayoutCard from '../../../components/payments/LatestPayoutCard';
import { SlideLeftFade } from '../../../components/Animation';
interface PaymentOverviewProps {
  items: any[];
}
const PaymentOverview = ({ items }: PaymentOverviewProps) => {
  const STAGGER  = 150
  return (
    <View style={styles.body}>
     <SlideLeftFade delay={STAGGER * 1}>
       <ColumnChart />
     </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 2}>
        <View style={styles.infoRow}>
        {items.map(item => (
          <PaymentInfoCard
            bgColor={item.color}
            icon={item.icon}
            lable={item.label}
            title={item.title}
            key={item.id}
          />
        ))}
      </View>
      </SlideLeftFade>

     <SlideLeftFade delay={STAGGER * 3}>
       <LatestPayoutCard
        jobTitle="Luxury Fashion — Evening Wear"
        brandName="LVMH MENA"
        date="2024-12-03T00:00:00.000Z"
        amount={5400}
        fee={600}
        maskedAccount="4821"
      />
     </SlideLeftFade>
    </View>
  );
};

export default PaymentOverview;
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: correctSize(16),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: correctSize(10),
  },
});
