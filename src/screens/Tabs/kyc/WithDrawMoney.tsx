import React, { useState } from 'react';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import NavBar from '../../../components/common/NavBar';
import { colors } from '../../../utils/colors';
import HistoryIcon from '../../../assets/svg/kyc/HistoryIcon';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { correctSize } from '../../../utils';
import BalanceCard from '../../../components/kyc/BalanceCard';
import { Fonts } from '../../../assets/fonts';
import BankRadio from '../../../components/kyc/BankRadio';
import PlusIcon from '../../../assets/svg/common/PlusIcon';
import WithDrawInput from '../../../components/kyc/WithDrawInput';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import FilterBage from '../../../components/kyc/FilterBage';
import InfoBanner from '../../../components/common/InfoBanner';
import InfoIcon from '../../../assets/svg/Home/InfoIcon';
import TransactionSummaryTable from '../../../components/kyc/TransactionSummaryTable';
import CustomButton from '../../../components/common/CustomButton';
import { AnimatedWrapper } from '../../../components/Animation';
import { useNavigation } from '@react-navigation/native';
import { stackRoutes } from '../../../navigation/screenIds';

const WithDrawMoney = () => {
  const navigation = useNavigation<any>();
  const [selectedId, setSelectedId] = useState(1);
  const [selectedFilterId, setSelectedFilterId] = useState(1);

  const [amount, setAmount] = useState('0');

  function toggleBank(id: number) {
    setSelectedId(id);
  }

  const bankOptionList = [
    { id: 1, bankName: 'Emirates NBD', accountNumber: '4000123456789012' },
    { id: 2, bankName: 'Emirates NBD', accountNumber: '4000123456789012' },
  ];

  const filterList = [
    { id: 1, label: 'AED 1,000' },
    { id: 2, label: 'AED 5,000' },
    { id: 3, label: 'All' },
  ];

  return (
    <ScreenWrapper>
      <NavBar
        title="Withdraw Money"
        hideLeftIcon={false}
        showRightIcon={true}
        svgIcon={<HistoryIcon />}
        rightIconColor={colors.black}
        rightButtonColor={colors.white_1}
        leftButtonColor={colors.white_1}
        leftIconColor={colors.darkgray_1}
        border={false}
        bgColor={colors.white}
        titleColor={colors.darkgray_1}
        onRightPress={() => {
          navigation.navigate(stackRoutes.TransactionHistory);
        }}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={[colors.lightBlue_2, colors.white]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <AnimatedWrapper>
              <View style={styles.container}>
                <BalanceCard amount=" 12,450.00" jobCount="8" />

                <Text style={styles.mainHeading}>Select Bank Account</Text>

                {bankOptionList.map(item => (
                  <BankRadio
                    bankName={item.bankName}
                    accountNumber={item.accountNumber}
                    key={item.id}
                    selected={selectedId === item.id}
                    onPress={() => toggleBank(item.id)}
                  />
                ))}

                <TouchableOpacity style={styles.addBankBtn} activeOpacity={0.8}>
                  <PlusIcon
                    width={14.63}
                    height={14.63}
                    color={colors.gray_1}
                  />
                  <Text style={styles.addBankText}>Add New Bank Account</Text>
                </TouchableOpacity>

                <Text style={styles.mainHeading}>Withdrawal Amount</Text>

                <WithDrawInput onChangeText={e => setAmount(e)} />

                <View style={styles.badgeRow}>
                  {filterList.map(item => (
                    <View key={item.id} style={styles.badgeWrapper}>
                      <FilterBage
                        label={item.label}
                        selected={item.id === selectedFilterId}
                        onPress={() => setSelectedFilterId(item.id)}
                      />
                    </View>
                  ))}
                </View>

                <InfoBanner
                  containerborderColor={colors.yellow}
                  containerbgColor={colors.lightYellow}
                  headingFamily={Fonts.Inter_SemiBold}
                  descriptionFamily={Fonts.Inter_Regular}
                  showIcon
                  svgIcon={<InfoIcon width={18} height={18} />}
                  iconBg={'transparent'}
                  headingSize={14}
                  heading={`Processing Time`}
                  headingColor={colors.darkBrown}
                  description={
                    'Withdrawals typically take 1-2 business days to reflect in your bank account.'
                  }
                  descriptionColor={colors.darkBrown_1}
                />

                <TransactionSummaryTable
                  amount={`${amount}.00`}
                  status="FREE"
                />
              </View>

              <View style={styles.footer}>
                <CustomButton
                  title={`Withdraw AED ${amount}`}
                  style={[styles.button]}
                  textStyle={styles.buttonText}
                  disabled={!Number(amount) || Number(amount) <= 0}
                />
              </View>
            </AnimatedWrapper>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default WithDrawMoney;
const styles = StyleSheet.create({
  body: {
    paddingBottom: correctSize(30),
  },
  container: {
    padding: correctSize(24),
  },
  mainHeading: {
    fontSize: 14,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(12),
  },
  addBankBtn: {
    backgroundColor: colors.lightBlue_5,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.gray_5,
    padding: correctSize(19),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: correctSize(24),
    marginBottom: correctSize(24),
  },
  addBankText: {
    fontSize: 16,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.gray_1,
    marginLeft: correctSize(8),
  },
  badgeRow: {
    flexDirection: 'row',
    gap: correctSize(12),
  },

  badgeWrapper: {
    flex: 1,
    marginVertical: correctSize(16),
  },
  footer: {
    paddingHorizontal: correctSize(24),
    paddingTop: correctSize(21),
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: correctSize(48),
    paddingVertical: correctSize(10),
    paddingHorizontal: correctSize(16),
  },
  buttonText: {
    color: colors.black,
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    lineHeight: 20,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
