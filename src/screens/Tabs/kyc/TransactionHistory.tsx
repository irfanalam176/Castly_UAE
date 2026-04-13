import { View, StyleSheet, FlatList } from 'react-native';
import React, { useState, useMemo } from 'react';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import NavBar from '../../../components/common/NavBar';
import { colors } from '../../../utils/colors';
import VerticalDots from '../../../assets/svg/applications/VerticalDots';
import { correctSize } from '../../../utils';
import { AnimatedWrapper } from '../../../components/Animation';
import HistoryBanner from '../../../components/kyc/HistoryBanner';
import { dummyTransactions } from '../../../utils/array';
import TransactionHistoryCard from '../../../components/kyc/TransactionHistoryCard';
import CustomButton from '../../../components/common/CustomButton';
import { Fonts } from '../../../assets/fonts';
import TransactionFilters from '../../../components/kyc/TransactionFilters';

/* ---------------- Banner (animates only once) ---------------- */
const AnimatedBanner = React.memo(() => {
  return (
    <AnimatedWrapper>
      <HistoryBanner amount="12,450.00" time="Today, 2:45 PM" />
    </AnimatedWrapper>
  );
});

const TransactionHistory = () => {
  const [filterId, setFilterId] = useState(1);
  const [transactions, setTransactions] = useState(dummyTransactions);

  const loadMoreTransactions = () => {};

  /* ---------------- Header ---------------- */
  const headerComponent = useMemo(() => {
    return (
      <View>
        <AnimatedBanner />
        <TransactionFilters
          filterId={filterId}
          setFilterId={setFilterId}
        />
      </View>
    );
  }, [filterId]);

  /* ---------------- Footer ---------------- */
  const footerComponent = () => (
    <AnimatedWrapper>
      <CustomButton
        title="Load More Transactions"
        onPress={loadMoreTransactions}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </AnimatedWrapper>
  );

  return (
    <ScreenWrapper>
      <NavBar
        title="Transaction History"
        hideLeftIcon={false}
        showRightIcon={true}
        svgIcon={<VerticalDots />}
        rightIconColor={colors.black}
        rightButtonColor={colors.white_1}
        leftButtonColor={colors.white_1}
        leftIconColor={colors.darkgray_1}
        border={false}
        bgColor={colors.white}
        titleColor={colors.darkgray_1}
        onRightPress={() => {}}
      />

      <FlatList
        data={transactions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <AnimatedWrapper delay={item.id * 100}>
            <TransactionHistoryCard
              amount={item.amount}
              date={item.date}
              detail={item.detail}
              status={item.status}
              title={item.title}
            />
          </AnimatedWrapper>
        )}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={footerComponent}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </ScreenWrapper>
  );
};

export default TransactionHistory;

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  body: {
    padding: correctSize(24),
    paddingBottom: correctSize(30),
    backgroundColor: colors.lightBlue_5,
  },
  button: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: correctSize(40),
  },
  buttonText: {
    color: colors.darkgray,
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
