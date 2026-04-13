import { View, Text, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import { correctSize } from '../../../utils';
import LinkedBankAccount from '../../../components/payments/LinkedBankAccount';
import PayoutPreferences from '../../../components/payments/PayoutPreferences';
import TaxVat from '../../../components/payments/TaxVat';
import { SlideLeftFade } from '../../../components/Animation';
import { ActionSheetRef } from 'react-native-actions-sheet';
import ChangeBankAccountSheet from '../../../components/payments/actionSheets/ChangeBankAccountSheet';
import AddAnotherAccountSheet from '../../../components/payments/actionSheets/AddAnotherAccountSheet';

const PaymentPayout = ({ onChange }: { onChange: () => void }) => {
  const changeSheetRef = useRef<ActionSheetRef>(null);
  const addsheetRef = useRef<ActionSheetRef>(null);
  const STAGGER = 150;

  function handleChangeSheet(){
    changeSheetRef.current?.show()
  }
  return (
    <View style={styles.body}>
      <ChangeBankAccountSheet
        sheetRef={changeSheetRef}
        onSave={data => {
          console.log('Saved:', data);
          onChange();
        }}
      />
      <AddAnotherAccountSheet
        addsheetRef={addsheetRef}
        onSave={data => { 
          console.log('Saved:', data);
          onChange();
        }}
      />

      <SlideLeftFade delay={STAGGER * 1}>
        <LinkedBankAccount onChange={handleChangeSheet} onAddAccount={() => addsheetRef.current?.show()}/>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 2}>
        <PayoutPreferences />
      </SlideLeftFade>
      <SlideLeftFade delay={STAGGER * 3}>
        <TaxVat onDownload={() => console.log('Download tax invoices')} />
      </SlideLeftFade>
    </View>
  );
};

export default PaymentPayout;
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: correctSize(16),
  },
});
