import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';
import CrossIcon from '../../vectorIcons/CrossIcon';
import { Step, BankAccount } from './types';
import AmountStep from './AmountStep';
import AccountStep from './AccountStep';
import ConfirmStep from './ConfirmStep';
import SuccessStep from './SuccessStep';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackIcon from '../../../assets/svg/Home/BackIcon';

type Props = {
  sheetRef: React.RefObject<ActionSheetRef | null>;
  availableBalance: number;
  accounts: BankAccount[];
};

const STEP_TITLES: Record<Step, string> = {
  amount: 'Withdraw Funds',
  account: 'Select Account',
  confirm: 'Confirm Withdrawal',
  success: '',
};

const StepDots = ({ step }: { step: Step }) => {
  const steps: Step[] = ['amount', 'account', 'confirm', 'success'];
  return (
    <View style={dotStyles.row}>
      {steps.map(s => (
        <View
          key={s}
          style={[dotStyles.dot, step === s && dotStyles.dotActive]}
        />
      ))}
    </View>
  );
};

const dotStyles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 4, alignItems: 'center' },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dotActive: { backgroundColor: colors.primary, width: 16, borderRadius: 3 },
});

const WithdrawSheet = ({ sheetRef, availableBalance, accounts }: Props) => {
  const insets = useSafeAreaInsets();
  const bottomInset =
    Platform.OS === 'android' ? correctSize(48) : insets.bottom;
  const [step, setStep] = useState<Step>('amount');
  const [amount, setAmount] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find(a => a.isDefault)?.id ?? accounts[0]?.id ?? '',
  );

  const selectedAccount = accounts.find(a => a.id === selectedAccountId);
  const remainingBalance = availableBalance - Number(amount);

  const handleClose = () => {
    sheetRef.current?.hide();
    setTimeout(() => {
      setStep('amount');
      setAmount('');
    }, 400);
  };

  const handleBack = () => {
    if (step === 'account') setStep('amount');
    else if (step === 'confirm') setStep('account');
  };

  const showBack = step === 'account' || step === 'confirm';

  return (
    <ActionSheet
      ref={sheetRef}
      gestureEnabled={false}
      keyboardHandlerEnabled={false}
      containerStyle={[
        styles.sheet,
        { height: correctSize(600) + bottomInset },
      ]}
    >
      
        <View style={styles.header}>
          {showBack ? (
            <TouchableOpacity style={styles.sideBtn} onPress={handleBack}>
              <BackIcon color={colors.white}/>
            </TouchableOpacity>
          ) : (
            <View />
           
          )}
        {step!="success"&&<View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>{STEP_TITLES[step]}</Text>
            <StepDots step={step} />
          </View>}
          <TouchableOpacity style={styles.sideBtn} onPress={handleClose}>
            <CrossIcon fillColor={colors.white} width={12} height={12} />
          </TouchableOpacity>
        </View>
  

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {step === 'amount' && (
          <AmountStep
            balance={availableBalance}
            amount={amount}
            setAmount={setAmount}
            onContinue={() => setStep('account')}
          />
        )}
        {step === 'account' && (
          <AccountStep
            amount={amount}
            accounts={accounts}
            selectedId={selectedAccountId}
            setSelectedId={setSelectedAccountId}
            onContinue={() => setStep('confirm')}
          />
        )}
        {step === 'confirm' && (
          <ConfirmStep
            amount={amount}
            account={selectedAccount}
            onConfirm={() => setStep('success')}
          />
        )}
        {step === 'success' && (
          <SuccessStep
            amount={amount}
            account={selectedAccount}
            transactionId="CW-65174582"
            remainingBalance={remainingBalance}
            onDone={handleClose}
          />
        )}
      </ScrollView>
    </ActionSheet>
  );
};

export default WithdrawSheet;

const styles = StyleSheet.create({
  sheet: { 
    backgroundColor: colors.darkgray_1 ,
      borderTopLeftRadius: correctSize(24),
  borderTopRightRadius: correctSize(24),
  overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: correctSize(20),
    paddingVertical: correctSize(16),
  },
  headerCenter: { alignItems: 'center', gap: 4 },
  headerTitle: {
    fontSize: 15,
    fontFamily: Fonts.Inter_Bold,
    color: colors.white,
  },
  sideBtn: {
    width: correctSize(32),
    height: correctSize(32),
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: { fontSize: 16, color: colors.white },
});
