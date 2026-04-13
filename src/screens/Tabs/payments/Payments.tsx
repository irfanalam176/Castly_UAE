import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import PaymentsHero from '../../../components/payments/PaymentsHero';
import { colors } from '../../../utils/colors';
import PaymentFilter from '../../../components/payments/PaymentFilter';
import { correctSize } from '../../../utils';
import PaymentOverview from './PaymentOverview';
import PaymentEscrow from './PaymentEscrow';
import PaymentHistory from './PaymentHistory';
import PaymentPayout from './PaymentPayout';
import PaymentSettings from '../../../components/payments/actionSheets/PaymentSettings';
import { ActionSheetRef } from 'react-native-actions-sheet';
import WithdrawSheet from '../../../components/payments/withdraw/WithdrawSheet';

const filters = ['Overview', 'Escrow', 'History', 'Payout'];

const paymentInfoList = [
  {
    id: 1,
    icon: '💼',
    title: 'AED 4,109',
    label: 'Avg Per Job',
    color: colors.lightBlue_2,
  },
  {
    id: 2,
    icon: '✅',
    title: '23',
    label: 'Jobs Completed',
    color: colors.green_1,
  },
  {
    id: 3,
    icon: '📊',
    title: 'AED 9,450',
    label: 'Castly Fees Paid',
    color: colors.purple_7,
  },
  {
    id: 4,
    icon: '🔒',
    title: 'AED 6,000',
    label: 'Pending Release',
    color: colors.yellow_4,
  },
];

const renderContent = (selectedFilter: string) => {
  switch (selectedFilter) {
    case 'Overview':
      return <PaymentOverview items={paymentInfoList} />;
    case 'Escrow':
      return <PaymentEscrow />;
    case 'History':
      return <PaymentHistory />;
    case 'Payout':
      return <PaymentPayout />;
    default:
      return null;
  }
};

const Payments = () => {
  const [selectedFilter, setSelectedFilter] = useState('Overview');
  const settingModalRef = useRef<ActionSheetRef>(null);
  const withdrawRef = useRef<ActionSheetRef>(null);
  function handleSettingPress() {
    settingModalRef.current?.show();
  }
  function handleWithdarw() {
    withdrawRef.current?.show();
  }
  return (
    <ScreenWrapper backgroundColor={colors.lightBlue_5}>
      <PaymentSettings settingModalRef={settingModalRef} />
      <WithdrawSheet
        sheetRef={withdrawRef}
        availableBalance={8750}
        accounts={[
          {
            id: '1',
            bankName: 'Emirates NBD',
            accountType: 'Savings',
            maskedNumber: '0821',
            iban: 'AE07 0331 2345 6789 0123 821',
            isDefault: true,
          },
          {
            id: '2',
            bankName: 'ADCB',
            accountType: 'Current',
            maskedNumber: '1456',
            iban: 'AE56 0030 0109 9765 4321 456',
            isDefault: false,
          },
        ]}
      />
      <ScrollView contentContainerStyle={styles.body}>
        <PaymentsHero onSettingPress={handleSettingPress} onWithdrawPress={handleWithdarw}/>

        <View style={styles.filters}>
          {filters.map(filter => (
            <PaymentFilter
              key={filter}
              label={filter}
              selected={selectedFilter === filter}
              onPress={() => setSelectedFilter(filter)}
            />
          ))}
        </View>

        {renderContent(selectedFilter)}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Payments;

const styles = StyleSheet.create({
  body: {
    paddingBottom: correctSize(30),
  },
  filters: {
    marginBottom: correctSize(16),
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: correctSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(6),
    borderBottomWidth: 1,
    borderBottomColor: colors.white_1,
    paddingHorizontal: correctSize(16),
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: correctSize(40),
  },
  placeholderText: {
    fontSize: 18,
    color: colors.gray_3,
  },
});
