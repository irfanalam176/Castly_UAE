import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import NavBar from '../../../components/common/NavBar';
import { colors } from '../../../utils/colors';
import VerticalDots from '../../../assets/svg/applications/VerticalDots';
import WalletBanner from '../../../components/kyc/WalletBanner';
import { correctSize } from '../../../utils';
import EarningCard from '../../../components/kyc/EarningCard';
import ChartIcon from '../../../assets/svg/kyc/ChartIcon';
import ClockFill from '../../../assets/svg/applications/ClockFill';
import QuickActions from '../../../components/kyc/QuickActions';
import BankCard from '../../../components/kyc/BankCard';
import { Fonts } from '../../../assets/fonts';
import RecentTransactionCard from '../../../components/kyc/RecentTransactionCard';
import { dummyTransactions } from '../../../utils/array';
import { AnimatedWrapper } from '../../../components/Animation';
import { useNavigation } from '@react-navigation/native';
import { stackRoutes } from '../../../navigation/screenIds';
import OverviewChart from '../../../components/kyc/OverviewChart';

const Wallet = () => {
  const navigation = useNavigation<any>()
  return (
    <ScreenWrapper>
      <NavBar
        title="My Wallet"
        hideLeftIcon={true}
        showRightIcon={true}
        svgIcon={<VerticalDots color={colors.white} />}
        rightIconFamily="FontAwesome6"
        rightIconColor={colors.black}
        rightButtonColor={colors.white_5}
        leftButtonColor={colors.white_5}
        leftIconColor={colors.white}
        border={false}
        bgColor={colors.gray_1}
        titleColor={colors.white}
        onRightPress={() => { }}
      />

      <ScrollView contentContainerStyle={styles.body}>

        <AnimatedWrapper>
          <View style={styles.header}>
            <WalletBanner
              amount='12,450'
              points='.00'
              statusData='+18.5%'
            />
          </View>

          <View style={styles.container}>
            <View style={styles.earningContainer}>
              <EarningCard
                icon={<ChartIcon />}
                title="Total Earnings"
                amount="24,890"
                unit="AED"
              />
              <EarningCard
                icon={<ClockFill width={18} height={18} color={colors.gray_1} />}
                title="Pending Escrow"
                amount="3,200"
                unit="AED"
                onPress={() => navigation.navigate(stackRoutes.PaymentStatus)}
              />
            </View>

            <QuickActions />

            <OverviewChart />


            <BankCard
              bankName="Emirates NBD"
              acountEnding="4829"
              isVerified={true}
            />

            <View style={styles.mainHeading}>
              <Text style={styles.heading}>Recent Transactions</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>

            {
              dummyTransactions.map((item) => (
                <RecentTransactionCard
                  title={item.title}
                  detail={item.detail}
                  date={item.date}
                  status={item.status}
                  amount={item.amount}

                  key={item.id}
                />
              ))
            }
          </View>
        </AnimatedWrapper>

      </ScrollView>
    </ScreenWrapper>
  );
};

export default Wallet;
const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.gray_1,
    paddingVertical: correctSize(32),
    paddingHorizontal: correctSize(24),
  },
  body: {
    // flex: 1,
    flexGrow: 1,
    backgroundColor: colors.lightBlue_5,
    paddingBottom: correctSize(50)
  },
  container: {
    paddingHorizontal: correctSize(24),
  },
  earningContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: correctSize(12),
    marginTop: correctSize(-24),
  },
  mainHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: correctSize(24),
  },
  viewAll: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.purple,
  },
  heading: {
    fontSize: 16,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
});
